import Dev from '../models/devModel';

class DevService {
  static async _createDev(dev) {
    const createdDev = await Dev.create(dev);
    return createdDev;
  }

  static async _getDevById(id) {
    const dev = await Dev.findById(id);
    return dev;
  }

  static async _getDevByEmail(Email) {
    const email = Email.toLowerCase();
    const dev = await Dev.findOne({ email });
    return dev;
  }
}

export default DevService;
