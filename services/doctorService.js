import mongoose from 'mongoose';
import Doctor from '../middlewares/doctorMiddleware';


class DoctorService {
  getDoctors(page, size) {
    return Doctor.find().skip(page * size).limit(size);
  }

  async getDoctorById(id) {
    return Doctor.findById(id);
  }

  async getDoctorByEmail(email) {
    return Doctor.findOne({ email });
  }

  async createDoctor(query) {
    return await Doctor.create(query);
  }

  async updateADoctor(doctor, query) {
    // Make sure the email is unique, by checking if the email in the query
    // We override the email in the query with the email in the database
    // If not, the unique property in Doctor's schema will raise an error 'duplicate key'
    if (query.email) {
      query.email = doctor.email;
    }

    Object.assign(doctor, query);

    // Methods such as findByIdAndUpdate will not trigger the pre-save middleware
    const updatedUser = await doctor.save();
    return updatedUser;
  }

  async deleteADoctor(id) {
    return Doctor.findByIdAndDelete(id);
  }
}

export default new DoctorService();
