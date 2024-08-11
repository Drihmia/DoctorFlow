import mongoose from 'mongoose';
import Doctor from '../middlewares/doctorMiddleware';


class DoctorService {
  async getDoctors(page, size) {
    return Doctor.find().skip(page * size).limit(size);
  }

  async getDoctorById(id) {
    return Doctor.findById(id);
  }

  async getDoctorByEmail(email) {
    return Doctor.findOne({ email });
  }

  async createDoctor(doctor) {
    return await Doctor.create(doctor);
  }

  async updateADoctor(id, doctor) {
    return Doctor.findByIdAndUpdate(id, doctor, { new: true });
  }

  async deleteADoctor(id) {
    return Doctor.findByIdAndDelete(id);
  }
}

export default new DoctorService();
