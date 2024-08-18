import mongoose from 'mongoose';
import Doctor from '../middlewares/doctorMiddleware';

class DoctorService {
  getDoctors(page = 0, size = 10) {
    return Doctor.find().skip(page * size).limit(size);
  }

  async getDoctorById (id) {
    return Doctor.findById(id);
  }

  async getDoctorByEmail (Email) {
    const email = Email.toLowerCase();
    return Doctor.findOne({ email });
  }

  async createDoctor (query) {
    return await Doctor.create(query);
  }

  async updateADoctor (doctor, query) {
    // Make sure the email is unique, by checking if the email in the query
    // We override the email in the query with the email in the database
    // If not, the unique property in Doctor's schema will raise an error 'duplicate key'
    if (query.email) {
      query.email = doctor.email;
    }

    // make sure the age is automatically calculated from the date of birth
    if (query.age) {
      delete query.age;
    }

    Object.assign(doctor, query);

    // Methods such as findByIdAndUpdate will not trigger the pre-save middleware
    const updatedUser = await doctor.save();
    return updatedUser;
  }

  async deleteADoctor (id) {
    return Doctor.findByIdAndDelete(id);
  }

  async getDoctorSessionById (doctor, sessionId, res) {
    try {
      const populatedDoctorWithSessions = await doctor.populate('sessions');

      const populatedSessions = populatedDoctorWithSessions.sessions;

      const filtredSession = populatedSessions
        .filter(session => session._id.toString() === sessionId);

      if (filtredSession.length !== 0) {
        return filtredSession[0];
      }
    } catch (error) {
      res.status(404).send({ message: 'Session not found' });
      return 1;
    }
  }

  async getDoctorSessions (doctor) {
    const sessions = await doctor.populate('sessions');
    return sessions.sessions;
  }

  async getDoctorPatients (doctor) {
    const Doctor = await doctor.populate('patients');
    return Doctor.patients;
  }

  async getDoctorPatientById (doctor, patientId, res) {
    try {
      const populatedDoctorWithPatients = await doctor.populate('patients');

      const populatedPatients = populatedDoctorWithPatients.patients;

      const filtredPatient = populatedPatients
        .filter(patient => patient._id.toString() === patientId);

      if (filtredPatient.length !== 0) {
        return filtredPatient[0];
      }
    } catch (error) {
      res.status(404).send({ message: 'Patient not found' });
      return 1;
    }
  }

  async doctorUpdatePatientById(doctor, patientId, query) {
    const patient = await this.getDoctorPatientById(doctor, patientId);
    if (!patient) return 1;

    const updatedUser = await this.updateADoctor(patient, query);

    // remove confirmPassword from the response
    updatedUser.confirmPassword = undefined;
    return updatedUser;
  }
}

export default new DoctorService();
