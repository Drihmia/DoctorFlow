import mongoose from 'mongoose';
import validator from 'validator';
import { strongPassword, confirmPasswordShouldBeRequired } from '../utils/validations';

const doctorSchema = new mongoose.Schema({
  // Required fields
  firstName: {
    type: String,
    required: [true, 'First name is required']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required']
  },
  email: {
    type: String,
    // email should be unique and immutable
    unique: true,
    lowercase: true,
    ummutable: true,
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
  },
  gender: {
    type: String,
    enum: {
      values: ['M', 'F'],
      message: '{VALUE} is not a valid, must be M or F'
    },
    required: [true, 'Gender is required']
  },
  specialization: {
    type: String,
    default: 'Generalist'
  },
  // Optional fields
  patients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient'
    }
  ],
  sessions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Session'
    }
  ],
  bio: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  // Optional fields
  phone: {
    type: String,
    validate: {
      validator: validator.isMobilePhone,
      message: 'Contact phone is not valid'
    }
  },
  contact: {
    address: {
      type: String,
      trim: true,
      lowercase: true
    },
    city: {
      type: String,
      trim: true,
      lowercase: true
    },
    state: {
      type: String,
      trim: true,
      lowercase: true
    }
  },
  dob: {
    type: String,
    validate: {
      validator: validator.isDate,
      message: 'Date of birth is not valid'
    },
    required: [true, 'Date of birth is required']
  }
});

// enhance uniqueness of email field at schema level
doctorSchema.index({ email: 1 }, { unique: true });

export default doctorSchema;
