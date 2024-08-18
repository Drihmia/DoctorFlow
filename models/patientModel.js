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
    validate: {
      validator: (value) => value >= 0,
      message: 'Age must be a positive number'
    }
  },
  bloodGroup: {
    type: String,
    uppercase: true,
    enum: {
      values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      message: '{VALUE} is not a valid blood group, must be A+, A-, B+, B-, AB+, AB-, O+, O-'
    }
  },
  height: {
    type: String,
    max: [230, 'Height must be less than 300 cm'],
    validate: [
      {
        validator: validator.isNumeric,
        message: 'Height must be a number'
      },
      {
        validator: (value) => value > 30,
        message: 'Height must be greater than 30 cm'
      }
    ]
  },
  weight: {
    type: String,
    max: [300, 'Weight must be less than 300 kg'],
    validate: [
      {
        validator: validator.isNumeric,
        message: 'Weight must be a number'
      },
      {
        validator: (value) => value >= 2,
        message: 'Weight must be greater than 2 kg'
      }
    ]
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
    required: [true, 'Password is required']
  },
  confirmPassword: {
    type: String,
    required: [true, 'Confirm password is required'],
    validate: {
      validator: function (value) {
        return this.password === value;
      },
      message: 'Passwords do not match'
    }
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: [true, 'Doctor is required']
  },
  sessions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Session'
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
    type: Date,
    required: [true, 'Date of birth is required']
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
        lowercase: true
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
      },
      default: [{}]
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
      },
      default: [{}]
    },
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
