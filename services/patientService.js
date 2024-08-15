import mongoose from 'mongoose';
import Patient from '../middlewares/patientMiddleware';
import DoctorService from './doctorService';

class PatientService {
  getPatients (page = 0, size = 10) {
    return Patient.find().skip(page * size).limit(size);
  }

  async getPatientById (id) {
    return Patient.findById(id);
  }

  async getPatientByEmail (email) {
    return Patient.findOne({ email });
  }

  async createPatient (query) {
    const doctor = await DoctorService.getDoctorById(query.doctorId);
    if (!doctor) {
      return 1;
    }
    delete query.doctorId;
    query.doctor = doctor._id;

    // Create a new patient
    const patient = await Patient.create(query);

    // Add the patient to the doctor's list of patients
    doctor.patients.push(patient._id);
    doctor.save();

    return patient;
  }

  async updateAPatient (patient, query) {
    // Make sure the email is unique, by checking if the email in the query
    // We override the email in the query with the email in the database
    // If not, the unique property in Patient's schema will raise an error 'duplicate key'
    if (query.email) {
      query.email = patient.email;
    }

    Object.assign(patient, query);

    // Methods such as findByIdAndUpdate will not trigger the pre-save middleware
    const updatedUser = await patient.save();
    return updatedUser;
  }

  async deleteAPatient (id) {
    return Patient.findByIdAndDelete(id);
  }

  async getPatientSessionById (patient, sessionId, res) {
    try {
      const populatedPatientWithSessions = await patient.populate('sessions');

      const populatedSessions = populatedPatientWithSessions.sessions;

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

  async getPatientSessions (patient) {
    const sessions = await patient.populate('sessions');
    return sessions.sessions;
  }

  async getPatientDoctor (patient) {
    const patients = await patient.populate('doctor');
    const doctor = patients.doctor;

    // Remove unnecessary fields for the patient
    doctor.patients = undefined;
    doctor.sessions = undefined;
    doctor.password = undefined;

    return doctor;
  }
}

export default new PatientService();
