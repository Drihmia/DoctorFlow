import mongoose from 'mongoose';
import Patient from '../middlewares/patientMiddleware';

class PatientService {
  getPatients(page, size) {
    return Patient.find().skip(page * size).limit(size);
  }

  async getPatientById(id) {
    return Patient.findById(id);
  }

  async getPatientByEmail(email) {
    return Patient.findOne({ email });
  }

  async createPatient(query) {
    return await Patient.create(query);
  }

  async updateAPatient(patient, query) {
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

  async deleteAPatient(id) {
    return Patient.findByIdAndDelete(id);
  }
}

export default new PatientService();
