import DoctorService from '../services/DoctorService';
import { checkPwd } from '../utils/validations';

class DoctorController {
  static async getAllDoctors (req, res) {
    try {
      const allDoctors = await DoctorService.getDoctors();
      if (allDoctors.length > 0) {
        return res.status(200).json(allDoctors);
      }
      return res.status(404).json({ error: 'No doctor found' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async addDoctor (req, res) {
    const {
      firstName, lastName, email, password, confirmPassword, gender
    } = req.body;
    if (!firstName || !lastName || !email || !password || !confirmPassword || !gender) {
      return res.status(400).json({ error: 'firstName, lastName, email, password, confirmPassword are required' });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Password does not match' });
    }

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
      const e = error.message;
      return res.status(500).json({
        error: e.split(': ')[2] === 'email_1 dup key' ? 'Email already exist' : e
      });
    }
  }

  static async getDoctor (req, res) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'id is required' });
    }
    try {
      const doctor = await DoctorService.getDoctorById(id);
      if (doctor) {
        return res.status(200).json(doctor);
      }
      return res.status(404).json({ error: 'Doctor not found' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async updateDoctor (req, res) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'id is required' });
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
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  }

  static async deleteDoctor (req, res) {
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
      return res.status(500).json({ error: error.message });
    }
  }
}

export default DoctorController;
