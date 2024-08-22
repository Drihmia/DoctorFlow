import dotenv from 'dotenv';
import devService from './services/DevService';
import DBConnection from './config/db.js';

dotenv.config();
DBConnection();

(async () => {
  const password = process.env.PASSWORD;
  const email = process.env.EMAIL;
  if (!email || !password) {
    console.log('Please provide email and password');
    process.exit(0);
  }
  const devFromDb = await devService._getDevByEmail(email);
  if (devFromDb) {
    console.log(`${devFromDb.email} already exists`);
    process.exit(0);
  }
  const dev = await devService._createDev({ email, password });
  console.log('Dev created:\n', dev);
})();
