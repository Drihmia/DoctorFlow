import mongoose from 'mongoose';
import Patient from '../middlewares/patientMiddleware';
// import Doctor from '../middlewares/doctorMiddleware';
import DoctorService from './doctorService';
import { filtredSessions } from '../utils/tools';

class PatientService {
  static getPatients(page = 0, size = 10) {
    return Patient.find().skip(page * size).limit(size);
  }

  static async getPatientById(id) {
    return Patient.findById(id);
  }

  static async getPatientByEmail(Email) {
    const email = Email.toLowerCase();
    return Patient.findOne({ email });
  }

  static async createPatient(quer) {
    const query = quer;
    if (query.doctorId) {
      try {
        query.doctor = new mongoose.Types.ObjectId(query.doctorId);
        delete query.doctorId;
      } catch (error) {
        return 2;
      }
    }

    const doctor = await DoctorService.getDoctorById(query.doctor);
    if (!doctor) {
      return 1;
    }
    delete query.doctorId;
    query.doctor = doctor._id;
    if (query.age) {
      delete query.age;
    }

    // Create a new patient
    const patient = await Patient.create(query);

    // Add the patient to the doctor's list of patients
    doctor.patients.push(patient._id);
    doctor.save();

    return patient;
  }

  static async updateAPatient(patient, quer) {
    const query = quer;
    // Make sure the email is unique, by checking if the email in the query
    // We override the email in the query with the email in the database
    // If not, the unique property in Patient's schema will raise an error 'duplicate key'
    if (query.email) {
      query.email = patient.email;
    }
    if (query.age) {
      delete query.age;
    }

    Object.assign(patient, query);

    // Methods such as findByIdAndUpdate will not trigger the pre-save middleware
    const updatedUser = await patient.save();
    return updatedUser;
  }

  static async deleteAPatient(id, doctor) {
    try {
      const query = {};
      query.patients = doctor.patients.filter((patientId) => !patientId.equals(id));
      await DoctorService.updateADoctor(doctor, query);
      return Patient.findByIdAndDelete(id);
    } catch (error) {
      throw new Error('Failed to delete the patient.');
    }
  }

  static async getPatientSessionById(patient, sessionId, res) {
    try {
      const populatedPatientWithSessions = await patient.populate('sessions');

      const populatedSessions = populatedPatientWithSessions.sessions;

      const filtredSession = populatedSessions
        .filter((session) => session._id.toString() === sessionId);

      if (filtredSession.length === 1) {
        const sessions = await filtredSessions(this, patient, filtredSession);
        return sessions[0];
      }
      return 0;
    } catch (error) {
      res.status(404).send({ message: 'Session not found' });
      return 1;
    }
  }

  static async getPatientSessions(patient, page = 0, size = 10) {
    const populatedSessions = await patient.populate({
      path: 'sessions',
      skip: page * size,
      limit: size,
    });
    const { sessions } = populatedSessions;

    return filtredSessions(this, patient, sessions);
  }

  static async getPatientDoctor(patient) {
    const patients = await patient.populate('doctor');
    const { doctor } = patients;

    const sharedDoctor = {};
    const authFieldsToShare = [
      '_id', 'email', 'firstName', 'lastName', 'phone', 'specialization',
      'contact', 'createdAt', 'gender', 'bio',
    ];

    for (const key of authFieldsToShare) {
      if (doctor[key]) {
        sharedDoctor[key] = doctor[key];
      }
    }

    return sharedDoctor;
  }
}

export default new PatientService();
