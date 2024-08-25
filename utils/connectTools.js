import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import redisUtils from './redisUtils';
import DoctorService from '../services/DoctorService';
import PatientService from '../services/PatientService';
import DevService from '../services/DevService';

const _GetUserByEmail = {
  Doctor: DoctorService.getDoctorByEmail,
  Patient: PatientService.getPatientByEmail,
  Dev: DevService._getDevByEmail,
};

const extractUserFromAuthHeader = async ({ authorization }, userType, res) => {
  // auth header
  if (!authorization || !authorization.startsWith('Basic ')) {
    res.status(401).json({ error: 'Unauthorized: Missing or invalid Authorization header' });
    return false;
  }

  // decoding and extracting email and password
  const base64Credentials = authorization.replace('Basic ', '');
  const decodedCredentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
  const credentials = decodedCredentials.split(':');
  const email = credentials[0];
  const password = credentials[1];

  // missing email or password
  if (!email || !password) {
    res.status(400).json({ error: 'Bad Request: Missing email or password' });
    return false;
  }

  // get user  data
  const user = await _GetUserByEmail[userType](email);

  if (!user) {
    // doctor email not in db, not registered
    res.status(404).json({ error: `${userType} not found` });
    return false;
  }

  // check password
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    res.status(401).json({ error: 'Unauthorized: Wrong password' });
    return false;
  }

  return user;
};

const generateAndSetToken = async (userType, user) => {
  // create a token
  const token = uuidv4();
  const redisKey = `auth_${token}`;
  const redisvalue = `${userType}_${user._id.toString()}`;
  await redisUtils.set(redisKey, redisvalue, (24 * 60 * 60));
  return token;
};

export { extractUserFromAuthHeader, generateAndSetToken };
