import Patient from '../models/patientModel';

class patientService {
  async createPatient(data) {
    const patient = new Patient(data);
    return patient.save();
  }

  async getPatients() {
    return Patient.find();
  }

  async getPatientById(id) {
    return Patient.findById(id);
  }

  async updatePatient(id, data) {
    return Patient.findByIdAndUpdate(id, data, { new: true });
  }

  async deletePatient(id) {
    return Patient.findByIdAndDelete(id);
  }
}

export default new patientService();
