import dotenv from 'dotenv';
import devService from './services/devService';
import DBConnection from './config/db';

dotenv.config();
DBConnection();

(async () => {
  const password = process.env.PASSWORD;
  const email = process.env.EMAIL;
  if (!email || !password) {
    console.log('Please provide email and password');
    process.exit(1);
  }
  const devFromDb = await devService._getDevByEmail(email);
  if (devFromDb) {
    console.log(`${devFromDb.email} already exists`);
    process.exit(1);
  }
  const dev = await devService._createDev({ email, password });
  console.log('Dev created:\n', dev);
})();
