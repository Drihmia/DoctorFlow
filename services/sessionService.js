import Session from '../models/session';

class SessionService {
  async createSession(session) {
    return Session.create(session);
  }

  async getSessionById(id) {
    return Session.findById(id);
  }

  async updateSession(id, session) {
    return Session.findByIdAndUpdate(id, session, { new: true });
  }

  async deleteSession(id) {
    return Session.findByIdAndDelete(id);
  }
}

export default new SessionService();
