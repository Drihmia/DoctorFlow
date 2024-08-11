import mongoose from 'mongoose';
import validator from 'validator';

const doctorSchema = new mongoose.Schema({
  // Required fields
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    toUpperCase: true,
    required: true
  },
  email: {
    type: String,
    required: true,
    // email should be unique and immutable
    unique: true,
    ummutable: true,
    validate: {
      validator: validator.isEmail,
      message: 'Email is not valid'
    }
  },
  password: {
    type: String,
    minlength: 8,
    required: true
  },
  gender: {
    type: String,
    enum: {
      values: ['M', 'F'],
      message: '{VALUE} is not a valid, must be M or F'
    },
    required: true
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
      toLowerCase: true
    },
    city: {
      type: String,
      trim: true,
      toLowerCase: true
    },
    state: {
      type: String,
      trim: true,
      toLowerCase: true
    }
  },
  dob: {
    type: Date
  }
});
export default doctorSchema;
