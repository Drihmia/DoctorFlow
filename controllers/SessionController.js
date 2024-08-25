import SessionService from '../services/sessionService';
import { prettifyError } from '../utils/errors';

class SessionController {
  static async getAllSessions(req, res) {
    const { page, limit } = req.query;

    try {
      const allSessions = await SessionService.getSessions(page, limit);
      return res.status(200).json(allSessions);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  static async addSession(req, res) {
    const { doctorId, patientId } = req.body;

    if (!doctorId) {
      return res.status(400).json({ error: 'DoctorId is required' });
    }

    if (!patientId) {
      return res.status(400).json({ error: 'PatientId is required' });
    }

    try {
      const createdSession = await SessionService.createSession(req.body);
      if (typeof createdSession === 'string') {
        return res.status(400).json({ error: createdSession });
      }
      return res.status(201).json(createdSession);
    } catch (error) {
      // If user provides an invalid id, ObjectId will throw an error
      if (error.kind === 'ObjectId') {
        return res.status(404).json({ error });
      }
      const prettifiedError = prettifyError(error);
      if (prettifiedError instanceof Error) {
        return res.status(500).json({ error: prettifiedError });
      }
      // If the error related to mongoose validation, prettifyError will return an object
      return res.status(400).json({ error: prettifiedError });
    }
  }

  // Not active
  static async getSession(req, res) {
    const { id } = req.params;

    try {
      const session = await SessionService.getSessionById(id);
      return res.status(200).json(session);
    } catch (error) {
      if (error.kind === 'ObjectId') {
        return res.status(404).json({ error: 'Session not found' });
      }
      return res.status(400).json({ error: error.message });
    }
  }

  static async deleteSession(req, res) {
    const { id } = req.params;

    try {
      const session = await SessionService.deleteSession(id);
      if (session) {
        return res.status(200).json({ message: 'Session deleted' });
      }

      return res.status(404).json({ error: 'Session not found' });
    } catch (error) {
      // If user provides an invalid id, ObjectId will throw an error
      if (error.kind === 'ObjectId') {
        return res.status(404).json({ error: 'Session not found' });
      }
      return res.status(400).json({ error: error.message });
    }
  }
}

export default SessionController;
