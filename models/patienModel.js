import mongoose from 'mongoose';
import validator from 'validator';

const patientSchema = new mongoose.Schema({
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
  gender: {
    type: String,
    enum: {
      values: ['M', 'F'],
      message: '{VALUE} is not a valid, must be M or F'
    },
    required: true
  },
  age: {
    type: Number,
    validate(value) {
      if (value < 0) {
        throw new Error('Age must be a positive number');
      }
    },
    required: true
  },
  email: {
    type: String,
    toLowerCase: true,
    unique: true,
    immutable: true,
    validate: {
      validator: validator.isEmail,
      message: 'Email is not valid'
    },
    required: true
  },
  password: {
    type: String,
    required: true
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  appointment: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Appointment'
    }
  ],
  constact: {
    phone: {
      type: String,
      unique: true,
      required: true
    },
    address: {
      type: String
    },
    emergencyContact: {
      name: {
        type: String,
        trim: true,
        toLowerCase: true,
        required: true
      },
      relationship: {
        type: String,
        trim: true,
        toLowerCase: true,
        required: true
      },
      phone: {
        type: String,
        trim: true,
        required: true
      }
    }
  },
  dob: {
    type: Date,
  },
  medicalHistory: [
    {
      type: String,
      trim: true,
      toLowerCase: true,
      default: []
    }
  ],
  currentMedication: [
    {
      name: {
        type: String,
        trim: true,
        toLowerCase: true,
        required: true
      },
      startDate: {
        type: Date,
        required: true
      },
      duration: {
        type: String,
        trim: true,
        toLowerCase: true,
        required: true
      },
      dosage: {
        type: String,
        trim: true,
        toLowerCase: true,
        required: true
      },
      description: {
        type: String,
        trim: true,
        toLowerCase: true
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
        toLowerCase: true,
        required: true
      },
      relationship: {
        type: String,
        trim: true,
        toLowerCase: true,
        required: true
      },
      description: {
        type: String,
        trim: true,
        toLowerCase: true
      }
    }
  ],
  insurance: {
    type: String,
    trim: true,
    toLowerCase: true,
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

export default patientSchema;
