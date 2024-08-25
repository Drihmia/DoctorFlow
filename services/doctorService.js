import Doctor from '../middlewares/doctorMiddleware';

class DoctorService {
  static getDoctors(page = 0, size = 10) {
    return Doctor.find().skip(page * size).limit(size);
  }

  static async getDoctorById(id) {
    return Doctor.findById(id);
  }

  static async getDoctorByEmail(Email) {
    const email = Email.toLowerCase();
    return Doctor.findOne({ email });
  }

  static async createDoctor(query) {
    const createdDoc = await Doctor.create(query);
    return createdDoc;
  }

  static async updateADoctor(doctor, query) {
    // Make sure the email is unique, by checking if the email in the query
    // We override the email in the query with the email in the database
    // If not, the unique property in Doctor's schema will raise an error 'duplicate key'
    // Age will be calculated from the date of birth
    const notAllowedFields = ['email', 'age'];
    const queryUpdate = {};
    for (const field in query) {
      if (field) {
        if (!notAllowedFields.includes(field)) {
          queryUpdate[field] = query[field];
        }
      }
    }

    Object.assign(doctor, queryUpdate);

    // Methods such as findByIdAndUpdate will not trigger the pre-save middleware
    const updatedUser = await doctor.save();
    return updatedUser;
  }

  static async deleteADoctor(id) {
    return Doctor.findByIdAndDelete(id);
  }

  static async getDoctorSessionById(doctor, sessionId, res) {
    try {
      const populatedDoctorWithSessions = await doctor.populate('sessions');

      const populatedSessions = populatedDoctorWithSessions.sessions;

      const filtredSession = populatedSessions
        .filter((session) => session._id.toString() === sessionId);

      return filtredSession.length ? filtredSession[0] : 0;
    } catch (error) {
      res.status(404).send({ message: 'Session not found' });
      return 1;
    }
  }

  static async getDoctorSessions(doctor, page = 0, size = 10) {
    const sessions = await doctor.populate({
      path: 'sessions',
      skip: page * size,
      limit: size,
    });
    return sessions.sessions;
  }

  static async getDoctorPatients(doctor, page = 0, size = 10) {
    const Doctor = await doctor.populate({
      path: 'patients',
      skip: page * size,
      limit: size,
    });
    return Doctor.patients;
  }

  static async getDoctorPatientById(doctor, patientId, res) {
    try {
      const populatedDoctorWithPatients = await doctor.populate('patients');

      const populatedPatients = populatedDoctorWithPatients.patients;

      const filtredPatient = populatedPatients
        .filter((patient) => patient._id.toString() === patientId);

      return filtredPatient.length ? filtredPatient[0] : 0;
    } catch (error) {
      res.status(404).send({ message: 'Patient not found' });
      return 1;
    }
  }

  async doctorUpdatePatientById(doctor, patientId, query) {
    const patient = await this.getDoctorPatientById(doctor, patientId);
    if (!patient) return 1;

    const NotAllowedFields = ['password', 'confirmPassword', 'doctor', 'sessions'];
    const queryUpdate = {};
    for (const field in query) {
      if (field) {
        if (!NotAllowedFields.includes(field)) {
          queryUpdate[field] = query[field];
        }
      }
    }

    const updatedUser = await this.updateADoctor(patient, queryUpdate);

    // remove confirmPassword from the response
    updatedUser.confirmPassword = undefined;
    return updatedUser;
  }

  async updateDoctorSessionById(doctor, sessionId, query) {
    const session = await this.getDoctorSessionById(doctor, sessionId);
    if (!session) return 1;

    const NotAllowedFields = ['password', 'confirmPassword', 'doctor', 'patient'];
    const queryUpdate = { ...query };
    for (const field in query) {
      if (NotAllowedFields.includes(field)) {
        delete queryUpdate[field];
      }
    }

    const updatedUser = await this.updateADoctor(session, queryUpdate);

    // remove confirmPassword from the response
    updatedUser.confirmPassword = undefined;
    return updatedUser;
  }
}

export default new DoctorService();
