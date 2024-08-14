import { Buffer } from 'buffer';

import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

import redisUtils from '../utils/redisUtils';
import DoctorService from '../services/DoctorService';

class AuthenticationController {
  static async connectDoctor(req, res) {
    try {
      // auth header
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Basic ')) {
        return res.status(401).json({ error: 'Unauthorized: Missing or invalid Authorization header' });
      }

      // decoding and extracting email and password
      const base64Credentials = authHeader.replace('Basic ', '');
      const decodedCredentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
      const credentials = decodedCredentials.split(':');
      const email = credentials[0];
      const password = credentials[1];

      // missing email or password
      if (!email || !password) {
        return res.status(400).json({ error: 'Bad Request: Missing email or password' });
      }

      // get doctor data
      const doctor = await DoctorService.getDoctorByEmail(email);

      if (!doctor) {
        // doctor email not in db, not registered
        return res.status(404).json({ error: 'Doctor not found' });
      }

      // check password
      const match = await bcrypt.compare(password, doctor.password);
      if (!match) {
        return res.status(401).json({ error: 'Unauthorized: Wrong password' });
      }

      // create a token
      const token = uuidv4();
      const redisKey = `auth:auth_doctor_${token}`;
      await redisUtils.set(redisKey, doctor._id.toString(), (24 * 60 * 60));

      return res.status(200).json({ token });

    } catch (error) {
      // Handle unexpected errors
      console.error('Error during connectDoctor:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async disconnectDoctor(req, res) {
    try {
      // check token passed in header
      const token = req.headers['x-token'];
      if (!token) {
        return res.status(400).json({ error: 'Bad Request: Missing token' });
      }

      // check token exists in redis
      const id = await redisUtils.get(`auth:auth_doctor_${token}`);
      if (!id) {
        return res.status(401).json({ error: 'Unauthorized: Invalid or expired token' });
      }

      // delete token
      const deleted = await redisUtils.del(`auth:auth_doctor_${token}`);
      if (!deleted) {
        return res.status(500).json({ error: 'Internal Server Error: Failed to delete token' });
      }
      return res.status(200).json({ message: 'Successfully disconnected' });

    } catch (error) {
      // Handle unexpected errors
      console.error('Error during disconnectDoctor:', error);
      return res.status(500).json({ error: 'Internal Server Error: Unexpected error' });
    }
  }
}

module.exports = AuthenticationController;
