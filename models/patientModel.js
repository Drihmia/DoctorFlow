import mongoose from 'mongoose';
import validator from 'validator';
import {
  checkArrayObjects, strongPassword,
  confirmPasswordShouldBeRequired
} from '../utils/validations';

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
        return this.password === value;
      },
      message: 'Passwords do not match'
    },
    required: [confirmPasswordShouldBeRequired, 'Confirm password is required']
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
      trim: true,
      unique: true,
      validate: {
        validator: validator.isMobilePhone,
        message: 'Contact phone is not valid'
      },
      required: [true, 'Contact phone is required']
    },
    address: {
      type: String,
      trim: true
    },
    city: {
      type: String,
      trim: true
    },
    state: {
      type: String,
      trim: true
    },
    emergencyContact: {
      name: {
        type: String,
        trim: true
      },
      relationship: {
        type: String,
        trim: true
      },
      phone: {
        type: String,
        trim: true,
        validate: {
          validator: validator.isMobilePhone,
          message: 'Contact phone is not valid'
        }
      }
    }
  },
  dob: {
    type: String,
    validate: {
      validator: validator.isDate,
      message: 'Date of birth is not valid'
    },
    required: [true, 'Date of birth is required']
  },
  medicalHistory: {
    type: [String],
    trim: true,
    default: []
  },
  currentMedication: {
    type: [
      {
        name: {
          type: String,
          trim: true
        },
        startDate: {
          type: String,
          trim: true,
          validate: {
            validator: validator.isDate,
            message: 'Start date is not valid'
          }
        },
        duration: {
          type: String,
          trim: true,
          validate: {
            validator: validator.isNumeric,
            message: 'Duration must be a number'
          }
        },
        dosage: {
          type: String,
          trim: true
        },
        description: {
          type: String,
          trim: true
        },
        endDate: {
          type: Date,
          trim: true,
          validate: {
            validator: validator.isDate,
            message: 'End date is not valid'
          }
        }
      }
    ],
    default: [{}],
    validate: {
      validator: checkArrayObjects,
      message: 'Current medication must be an array of objects.'
    }
  },
  familyHistory: {
    type: [
      {
        medicalCondition: {
          type: String,
          trim: true,
          default: 'None'
        },
        relationship: {
          type: String,
          trim: true,
          default: ''
        },
        description: {
          type: String,
          trim: true,
          default: ''
        }
      }
    ],
    default: [{}],
    validate: {
      validator: checkArrayObjects,
      message: 'Family history must be an array of objects.'
    }
  },
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
