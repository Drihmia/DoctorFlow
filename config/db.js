import mongoose from 'mongoose';

const mongoUrl = process.env.MONGO_URI;

if (!mongoUrl) {
  throw new Error('MONGO_URL must be set');
}
console.log('mongoUrl', mongoUrl);
const DBConnection = async () => {
  try {
    await mongoose.connect(mongoUrl, {
      serverApi: { version: '1', strict: true, deprecationErrors: true },
    });
    console.log('MongoDB Connected:', mongoose.connection.name);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default DBConnection;
