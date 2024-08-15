import mongoose from 'mongoose';
import Patient from '../middlewares/patientMiddleware';
// import Doctor from '../middlewares/doctorMiddleware';
import DoctorService from './doctorService';

class PatientService {
  getPatients(page = 0, size = 10) {
    return Patient.find().skip(page * size).limit(size);
  }

  async getPatientById(id) {
    return Patient.findById(id);
  }

  async getPatientByEmail(email) {
    return Patient.findOne({ email });
  }

  async createPatient(query) {
    if (query.doctorId) {
      query.doctor = new mongoose.Types.ObjectId(query.doctorId);
      delete query.doctorId;
    }

    const doctor = await DoctorService.getDoctorById(query.doctor);
    if (!doctor) {
      return 1;
    }

    // Create a new patient
    const patient = await Patient.create(query);

    // Add the patient to the doctor's list of patients
    doctor.patients.push(patient._id);
    doctor.save();

    return patient;
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

  async deleteAPatient(id, doctorId) {

    try {
      const query = {};
      if (id) {
        const doctor = await DoctorService.getDoctorById(doctorId);
        if (doctor) {
          query.patients = doctor.patients.filter(patientId => !patientId.equals(id));
          await DoctorService.updateADoctor(doctor, query);
        }
        return Patient.findByIdAndDelete(id);
      }
    } catch (error) {
      console.error('Error deleting patient:', error);
      throw new Error('Failed to delete the patient.');
    }
  }
}

export default new PatientService();
