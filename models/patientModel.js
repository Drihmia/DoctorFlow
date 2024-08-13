import mongoose from 'mongoose';
import validator from 'validator';

const patientSchema = new mongoose.Schema({
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
  gender: {
    type: String,
    enum: {
      values: ['M', 'F'],
      message: '{VALUE} is not a valid, must be M or F'
    },
    required: [true, 'Gender is required']
  },
  age: {
    type: Number,
    validate (value) {
      if (value < 0) {
        throw new Error('Age must be a positive number');
      }
    },
    required: [true, 'Age is required']
  },
  email: {
    type: String,
    // email should be unique and immutable
    unique: true,
    immutable: true,
    validate: {
      validator: validator.isEmail,
      message: 'Email is not valid'
    },
    required: [true, 'Email is required']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: [true, 'Doctor is required']
  },
  appointment: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Appointment'
    }
  ],
  contact: {
    phone: {
      type: String,
      unique: true,
      required: [true, 'Contact phone is required']
    },
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
    },
    emergencyContact: {
      name: {
        type: String,
        trim: true,
        lowercase: true
      },
      relationship: {
        type: String,
        trim: true,
        lowercase: true
      },
      phone: {
        type: String,
        trim: true
      }
    }
  },
  dob: {
    type: Date
  },
  medicalHistory: {
    type: [String],
    trim: true,
    lowercase: true,
    default: []
  },
  currentMedication: [
    {
      name: {
        type: String,
        trim: true,
        lowercase: true,
      },
      startDate: {
        type: Date
      },
      duration: {
        type: String,
        trim: true,
        lowercase: true
      },
      dosage: {
        type: String,
        trim: true,
        lowercase: true
      },
      description: {
        type: String,
        trim: true,
        lowercase: true
      },
      endDate: {
        type: Date
      }
    }
  ],
  familyHistory: [
    {
      medicalCondition: {
        type: String,
        trim: true,
        lowercase: true,
        default: 'None'
      },
      relationship: {
        type: String,
        trim: true,
        lowercase: true,
        default: ''
      },
      description: {
        type: String,
        trim: true,
        lowercase: true,
        default: ''
      }
    }
  ],
  insurance: {
    type: String,
    default: 'None'
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// enhance uniqueness of email field at schema level
patientSchema.index({ email: 1 }, { unique: true });

export default patientSchema;
