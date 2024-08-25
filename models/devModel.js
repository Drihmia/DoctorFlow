import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import validator from 'validator';
import { strongPassword } from '../utils/validations';

const devSchema = new mongoose.Schema({
  email: {
    type: String,
    // email should be unique and immutable
    unique: true,
    lowercase: true,
    immutable: true,
    validate: {
      validator: validator.isEmail,
      message: 'Email is not valid',
    },
    required: [true, 'Email is required'],
  },
  password: {
    type: String,
    validate: {
      validator: strongPassword(validator),
      message: 'Password is weak',
    },
    required: [true, 'Password is required'],
  },
});

devSchema.pre('save', async function preSave(next) {
  // Hash the password before saving the document
  if (this.isModified('password')) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    } catch (err) {
      return next(err);
    }
  }
  return next();
});

// enhance uniqueness of email field at schema level
devSchema.index({ email: 1 }, { unique: true });

const Dev = mongoose.model('Dev', devSchema);

Dev.init().catch((err) => console.error('Index creation failed:', err));

export default Dev;
