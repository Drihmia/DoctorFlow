import mongoose from 'mongoose';
import validator from 'validator';

const doctorSchema = new mongoose.Schema({
  // Required fields
  firstName: {
    type: String,
    required: [true, 'First name is required']
  },
  lastName: {
    type: String,
    uppercase: true,
    required: [true, 'Last name is required']
  },
  email: {
    type: String,
    // email should be unique and immutable
    unique: true,
    ummutable: true,
    validate: {
      validator: validator.isEmail,
      message: 'Email is not valid'
    },
    required: [true, 'Email is required']
  },
  password: {
    type: String,
    minlength: 8,
    required: [true, 'Password is required']
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
  appointments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Appointment'
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
    type: String
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
    type: Date
  }
});

export default doctorSchema;
