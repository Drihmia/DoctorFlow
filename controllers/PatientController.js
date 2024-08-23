import PatientService from '../services/patientService';
import { prettifyError } from '../utils/errors';

class PatientController {
  static async getAllPatients(req, res) {
    const { page, limit } = req.query;
    try {
      const allPatients = await PatientService.getPatients(page, limit);
      return res.status(200).json(allPatients);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async addPatient(req, res) {
    const PatientInfo = {};
    for (const [key, value] of Object.entries(req.body)) {
      if (value) {
        if (['address', 'city', 'state', 'phone', 'emergencyContact'].includes(key)) {
          if (!('contact' in PatientInfo)) {
            PatientInfo.contact = {};
          }
          PatientInfo.contact[key] = value;
        } else {
          PatientInfo[key] = value;
        }
      }
    }
    try {
      const patient = await PatientService.createPatient(PatientInfo);
      if (patient === 1) {
        return res.status(400).json({ error: 'Doctor not found' });
      }
      if (patient === 2) {
        // This normally means the docotrId is not a valid ObjectId
        return res.status(400).json({ error: 'docotrId is not a valid ObjectId' });
      }
      return res.status(201).json(patient);
    } catch (error) {
      const prettifiedError = prettifyError(error);
      if (prettifiedError instanceof Error) {
        return res.status(500).json({ error: prettifiedError });
      } else {
        // If the error related to mongoose validation, prettifyError will return an object
        return res.status(400).json({ error: prettifiedError });
      }
    }
  }

  static async getPatient(req, res) {
    const { id } = req.params;
    try {
      const patient = await PatientService.getPatientById(id);
      if (patient) {
        return res.status(200).json(patient);
      }
      return res.status(404).json({ error: 'Patient not found' });
    } catch (error) {
      // If user provides an invalid id, ObjectId will throw an error
      if (error.kind === 'ObjectId') {
        return res.status(404).json({ error: 'Patient not found' });
      }
      return res.status(500).json({ error: error.message });
    }
  }

  static async updatePatient(req, res) {
    const { id } = req.params;

    const { password, confirmPassword } = req.body;
    if (!password) return res.status(400).json({ error: 'Password is required' });

    try {
      const patient = await PatientService.getPatientById(id);
      if (patient) {
        const updatedpatient = await PatientService.updateAPatient(patient, { password, confirmPassword });
        return res.status(200).json(updatedpatient);
      }
      return res.status(404).json({ error: 'Patient not found' });
    } catch (error) {
      // If user provides an invalid id, ObjectId will throw an error
      if (error.kind === 'ObjectId') {
        return res.status(404).json({ error: 'Patient not found' });
      }
      const prettifiedError = prettifyError(error);
      if (prettifiedError instanceof Error) {
        return res.status(500).json({ error: prettifiedError });
      } else {
        // If the error related to mongoose validation, prettifyError will return an object
        return res.status(400).json({ error: prettifiedError });
      }
    }
  }

  static async deletePatient(req, res) {
    const { id } = req.params;

    try {
      const patient = await PatientService.getPatientById(id);
      if (!patient) {
        return res.status(404).json({ error: 'Patient not found' });
      }

      // to fully delete a patient, we need to delete the patient from the doctor's patient list
      const patientDocPopulated = await patient.populate('doctor');
      const doctorDoc = patientDocPopulated.doctor;
      if (!doctorDoc) {
        return res.status(404).json({ error: 'Doctor not found' });
      }

      await PatientService.deleteAPatient(id, doctorDoc);
      return res.status(200).json({ message: 'Patient deleted' });
    } catch (error) {
      // If user provides an invalid id, ObjectId will throw an error
      if (error.kind === 'ObjectId') {
        return res.status(404).json({ error: 'Patient not found' });
      }
      return res.status(500).json({ error: error.message });
    }
  }

  static async getPatientSession (req, res) {
    const { id, sessionId } = req.params;
    try {
      const patient = await PatientService.getPatientById(id);
      if (patient) {
        const session = await PatientService.getPatientSessionById(patient, sessionId, res);
        if (session) {
          if (session === 1) return;
          return res.status(200).json(session);
        }
        return res.status(404).json({ error: 'Session not found' });
      }
      return res.status(404).json({ error: 'Patient not found' });
    } catch (error) {
      // If user provides an invalid id, ObjectId will throw an error
      if (error.kind === 'ObjectId') {
        return res.status(404).json({ error: 'Patient not found' });
      }
      return res.status(500).json({ error: error.message });
    }
  }

  static async getPatientSessions (req, res) {
    const { id } = req.params;
    const { page, limit } = req.query;
    try {
      const patient = await PatientService.getPatientById(id);
      if (patient) {
        const sessions = await PatientService.getPatientSessions(patient, page, limit);
        return res.status(200).json(sessions);
      }
      return res.status(404).json({ error: 'Patient not found' });
    } catch (error) {
      // If user provides an invalid id, ObjectId will throw an error
      if (error.kind === 'ObjectId') {
        return res.status(404).json({ error: 'Patient not found' });
      }
      return res.status(500).json({ error: error.message });
    }
  }

  static async getPatientDoctor (req, res) {
    const { id } = req.params;
    try {
      const patient = await PatientService.getPatientById(id);
      if (patient) {
        const doctor = await PatientService.getPatientDoctor(patient);
        return res.status(200).json(doctor);
      }
      return res.status(404).json({ error: 'Patient not found' });
    } catch (error) {
      // If user provides an invalid id, ObjectId will throw an error
      if (error.kind === 'ObjectId') {
        return res.status(404).json({ error: 'Patient not found' });
      }
      return res.status(500).json({ error: error.message });
    }
  }
}

export default PatientController;
