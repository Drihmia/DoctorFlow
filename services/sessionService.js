import Session from '../middlewares/sessionMiddleware';
import DoctorService from './doctorService';
import PatientService from './patientService';

class SessionService {
  getSessions (page = 0, limit = 10) {
    return Session.find().skip(limit * page).limit(limit);
  }

  getSessionById (id) {
    return Session.findById(id);
  }

  async createSession (query) {
    const { doctorId, patientId } = query;

    let doctor;
    let patient;

    try {
      doctor = await DoctorService.getDoctorById(doctorId);
      if (!doctor) {
        return 'Doctor not found';
      }
    } catch (error) {
      return 'Doctor not found';
    }

    try {
      patient = await PatientService.getPatientById(patientId);
      if (!patient) {
        return 'Patient not found';
      }
    } catch (error) {
      return 'Patient not found';
    }

    delete query.doctorId;
    delete query.patientId;

    query.doctor = doctor._id;
    query.patient = patient._id;

    const session = await Session.create(query);

    // Linking the session to the doctor and patient and vice versa
    patient.sessions.push(session._id);
    doctor.sessions.push(session._id);

    // Saving the changes
    await doctor.save();
    await patient.save();

    return session;
  }

  async updateSession (session, query) {
    Object.assign(session, query);

    const savedSession = await session.save();
    return savedSession;
  }

  async deleteSession (id) {
    const session = await this.getSessionById(id).populate('doctor patient');
    if (!session) return false;

    // Removing the session from the doctor and patient
    session.doctor.sessions = session.doctor.sessions.filter((s) => s._id.toString() !== id);
    session.patient.sessions = session.patient.sessions.filter((s) => s._id.toString() !== id);
    await session.doctor.save();
    await session.patient.save();

    return Session.findByIdAndDelete(id);
  }
}

export default new SessionService();
