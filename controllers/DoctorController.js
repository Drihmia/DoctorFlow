import DoctorService from '../services/DoctorService';
import { checkPwd } from '../utils/validations';
import { prettifyError } from '../utils/errors';

class DoctorController {
  static async getAllDoctors(req, res) {
    const { page, limit } = req.query;
    try {
      const allDoctors = await DoctorService.getDoctors(page, limit);
      return res.status(200).json(allDoctors);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async addDoctor(req, res) {
    const { password, confirmPassword } = req.body;

    // If password is provided, confirmPassword must be provided
    if (!checkPwd({ password, confirmPassword }, res)) return;

    const DoctorInfo = {};
    for (const [key, value] of Object.entries(req.body)) {
      if (value) {
        if (value === 'address' || value === 'city' || value === 'state') {
          if (!('contact' in DoctorInfo)) {
            DoctorInfo.contact = {};
          }
          DoctorInfo.contact[key] = value;
        } else if (['firstName', 'lastName', 'email', 'password', 'gender',
          'phone', 'specialization', 'bio', 'dob'].includes(key)) {
          DoctorInfo[key] = value;
        }
      }
    }
    try {
      const doctor = await DoctorService.createDoctor(DoctorInfo);
      return res.status(201).json(doctor);
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

  static async getDoctor(req, res) {
    const { id } = req.params;
    try {
      const doctor = await DoctorService.getDoctorById(id);
      if (doctor) {
        return res.status(200).json(doctor);
      }
      return res.status(404).json({ error: 'Doctor not found' });
    } catch (error) {
      // If user provides an invalid id, ObjectId will throw an error
      if (error.kind === 'ObjectId') {
        return res.status(404).json({ error: 'Doctor not found' });
      }
      return res.status(500).json({ error: error.message });
    }
  }

  static async updateDoctor(req, res) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: { id: 'id is required' } });
    }

    const { password, confirmPassword } = req.body;

    // If password is provided, confirmPassword must be provided
    if (!checkPwd({ password, confirmPassword }, res)) return;

    try {
      const doctor = await DoctorService.getDoctorById(id);
      if (doctor) {
        const updateddoctor = await DoctorService.updateADoctor(doctor, req.body);
        return res.status(200).json(updateddoctor);
      }
      return res.status(404).json({ error: 'Doctor not found' });
    } catch (error) {
      // If user provides an invalid id, ObjectId will throw an error
      if (error.kind === 'ObjectId') {
        return res.status(404).json({ error: 'Doctor not found' });
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

  static async deleteDoctor(req, res) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'id is required' });
    }
    try {
      const doctor = await DoctorService.getDoctorById(id);
      if (doctor) {
        await DoctorService.deleteADoctor(id);
        return res.status(200).json({ message: 'Doctor deleted' });
      }
      return res.status(404).json({ error: 'Doctor not found' });
    } catch (error) {
      // If user provides an invalid id, ObjectId will throw an error
      if (error.kind === 'ObjectId') {
        return res.status(404).json({ error: 'Doctor not found' });
      }
      return res.status(500).json({ error });
    }
  }

  static async getDoctorSession(req, res) {
    const { id, sessionId } = req.params;
    try {
      const doctor = await DoctorService.getDoctorById(id);
      if (doctor) {
        const session = await DoctorService.getDoctorSessionById(doctor, sessionId, res);
        if (session) {
          if (session === 1) return;
          return res.status(200).json(session);
        }
        return res.status(404).json({ error: 'Session not found' });
      }
      return res.status(404).json({ error: 'Doctor not found' });
    } catch (error) {
      // If user provides an invalid id, ObjectId will throw an error
      if (error.kind === 'ObjectId') {
        return res.status(404).json({ error: 'Doctor not found' });
      }
      return res.status(500).json({ error: error.message });
    }
  }

  static async getDoctorSessions(req, res) {
    const { id } = req.params;
    try {
      const doctor = await DoctorService.getDoctorById(id);
      if (doctor) {
        const sessions = await DoctorService.getDoctorSessions(doctor);
        return res.status(200).json(sessions);
      }
      return res.status(404).json({ error: 'Doctor not found' });
    } catch (error) {
      // If user provides an invalid id, ObjectId will throw an error
      if (error.kind === 'ObjectId') {
        return res.status(404).json({ error: 'Doctor not found' });
      }
      return res.status(500).json({ error: error.message });
    }
  }

  static async deleteDoctorSession(req, res) {
    const { id, sessionId } = req.params;
    try {
      const doctor = await DoctorService.getDoctorById(id);
      if (doctor) {
        const session = await DoctorService.getDoctorSessionById(doctor, sessionId, res);
        if (session) {
          if (session.doctor.toString() === doctor._id.toString()) {
            return res.redirect(307, `/sessions/${sessionId}`);
          }
          await DoctorService.deleteDoctorSession(doctor, sessionId);
          return res.status(200).json({ message: 'Session deleted' });
        }
        return res.status(404).json({ error: 'Session not found' });
      }
      return res.status(404).json({ error: 'Doctor not found' });
    } catch (error) {
      // If user provides an invalid id, ObjectId will throw an error
      if (error.kind === 'ObjectId') {
        return res.status(404).json({ error: 'Doctor not found' });
      }
      return res.status(500).json({ error: error.message });
    }
  }

  static async getDoctorPatients(req, res) {
    const { id } = req.params;
    try {
      const doctor = await DoctorService.getDoctorById(id);
      if (doctor) {
        const patients = await DoctorService.getDoctorPatients(doctor);
        return res.status(200).json(patients);
      }
      return res.status(404).json({ error: 'Doctor not found' });
    } catch (error) {
      // If user provides an invalid id, ObjectId will throw an error
      if (error.kind === 'ObjectId') {
        return res.status(404).json({ error: 'Doctor not found' });
      }
      return res.status(500).json({ error: error.message });
    }
  }

  static async getDoctorPatient(req, res) {
    const { id, patientId } = req.params;
    try {
      const doctor = await DoctorService.getDoctorById(id);
      if (doctor) {
        const patient = await DoctorService.getDoctorPatientById(doctor, patientId, res);
        if (patient) {
          return res.status(200).json(patient);
        }
        return res.status(404).json({ error: 'Patient not found' });
      }
      return res.status(404).json({ error: 'Doctor not found' });
    } catch (error) {
      // If user provides an invalid id, ObjectId will throw an error
      if (error.kind === 'ObjectId') {
        return res.status(404).json({ error: 'Doctor not found' });
      }
      return res.status(500).json({ error: error.message });
    }
  }

  static async updateDoctorPatient(req, res) {
    const { id, patientId } = req.params;
    try {
      const doctor = await DoctorService.getDoctorById(id);
      if (doctor) {
        try {
          const reslt = await DoctorService.doctorUpdatePatientById(doctor, patientId, req.body);
          if (reslt === 1) return res.status(404).json({ error: 'Patient not found' });
          return res.status(200).json(reslt);
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
      return res.status(404).json({ error: 'Doctor not found' });
    } catch (error) {
      // If user provides an invalid id, ObjectId will throw an error
      if (error.kind === 'ObjectId') {
        return res.status(404).json({ error: 'Doctor not found' });
      }
      return res.status(500).json({ error: error.message });
    }
  }
}

export default DoctorController;
