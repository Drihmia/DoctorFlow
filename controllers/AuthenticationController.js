import { extractUserFromAuthHeader, generateAndSetToken } from '../utils/connectTools';
import redisUtils from '../utils/redisUtils';

class AuthenticationController {
  static async connectDoctor(req, res) {
    try {
      const doctor = await extractUserFromAuthHeader(req.headers, 'Doctor', res);
      if (!doctor) return;
      const token = await generateAndSetToken('doctor', doctor, res);
      res.status(200).json({ token });
    } catch (error) {
      console.log('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async connectPatient(req, res) {
    try {
      const patient = await extractUserFromAuthHeader(req.headers, 'Patient', res);
      if (!patient) return;
      const token = await generateAndSetToken('patient', patient, res);
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async connectDev(req, res) {
    try {
      const dev = await extractUserFromAuthHeader(req.headers, 'Dev', res);
      if (!dev) return;
      const token = await generateAndSetToken('dev', dev, res);
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async disconnect(req, res) {
    try {
      // delete token
      const deleted = await redisUtils.del(`auth_${req.token}`);
      if (!deleted) {
        return res.status(500).json({ error: 'Internal Server Error: Failed to delete token' });
      }
      return res.status(200).json({ message: 'Successfully disconnected' });
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error: Unexpected error' });
    }
  }
}

export default AuthenticationController;
