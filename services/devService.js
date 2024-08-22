import mongoose from 'mongoose';
import Dev from '../models/devModel';

class DevService {
  async _getDevById(id) {
    return Dev.findById(id);
  }
  async _getDevByEmail(Email) {
    const email = Email.toLowerCase();
    return Dev.findOne({ email });
  }
}
