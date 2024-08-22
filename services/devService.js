import mongoose from 'mongoose';
import Dev from '../models/devModel';

class DevService {
  async _createDev(dev) {
    return await Dev.create(dev);
  }

  async _getDevById(id) {
    return await Dev.findById(id);
  }

  async _getDevByEmail(Email) {
    const email = Email.toLowerCase();
    console.log(email);
    return await Dev.findOne({ email });
  }
}

const devService = new DevService();
export default devService;
