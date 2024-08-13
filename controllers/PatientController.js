import PatientService from '../services/PatientService';
import { checkPwd } from '../utils/validations';
import { prettifyError } from '../utils/errors';

class PatientController {
  static async getAllPatients (req, res) {
    try {
      const allPatients = await PatientService.getPatients();
      if (allPatients.length > 0) {
        return res.status(200).json(allPatients);
      }
      return res.status(404).json({ error: 'No patient found' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async addPatient (req, res) {
    const { password, confirmPassword } = req.body;

    // If password is provided, confirmPassword must be provided
    if (!checkPwd({ password, confirmPassword }, res)) return;
    const PatientInfo = {};
    for (const [key, value] of Object.entries(req.body)) {
      if (value) {
        if (['address', 'city', 'state', 'phone'].includes(key)) {
          if (!('contact' in PatientInfo)) {
            PatientInfo.contact = {};
          }
          PatientInfo.contact[key] = value;
        } else if (['firstName', 'lastName', 'email', 'password', 'gender',
          'dob', 'age', 'doctorId'].includes(key)) {
          PatientInfo[key] = value;
        }
      }
    }
    try {
      const patient = await PatientService.createPatient(PatientInfo);
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

  static async getPatient (req, res) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'id is required' });
    }
    try {
      const patient = await PatientService.getPatientById(id);
      if (patient) {
        return res.status(200).json(patient);
      }
      return res.status(404).json({ error: 'Patient not found' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async updatePatient (req, res) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'id is required' });
    }

    const { password, confirmPassword } = req.body;

    // If password is provided, confirmPassword must be provided
    if (!checkPwd({ password, confirmPassword }, res)) return;

    try {
      const patient = await PatientService.getPatientById(id);
      if (patient) {
        const updatedpatient = await PatientService.updateAPatient(patient, req.body);
        return res.status(200).json(updatedpatient);
      }
      return res.status(404).json({ error: 'Patient not found' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async deletePatient (req, res) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'id is required' });
    }
    try {
      const patient = await PatientService.getPatientById(id);
      if (patient) {
        await PatientService.deleteAPatient(id);
        return res.status(200).json({ message: 'Patient deleted' });
      }
      return res.status(404).json({ error: 'Patient not found' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export default PatientController;
