import mongoose from 'mongoose';
import validator from 'validator';
import {
  strongPassword,
  confirmPasswordShouldBeRequired
} from '../utils/validations';

const devSchema = new mongoose.Schema({
  email: {
    type: String,
    // email should be unique and immutable
    unique: true,
    lowercase: true,
    immutable: true,
    validate: {
      validator: validator.isEmail,
      message: 'Email is not valid'
    },
    required: [true, 'Email is required']
  },
  password: {
    type: String,
    validate: {
      validator: strongPassword(validator),
      message: 'Password is weak'
    },
    required: [true, 'Password is required']
  },
  confirmPassword: {
    type: String,
    validate: {
      validator: function (value) {
        if (!this.password) return true;
        return this.password === value;
      },
      message: 'Passwords do not match'
    },
    required: [confirmPasswordShouldBeRequired, 'Confirm password is required']
  }
});

// enhance uniqueness of email field at schema level
devSchema.index({ email: 1 }, { unique: true });

export default devSchema;
