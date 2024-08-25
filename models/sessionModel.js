import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: [true, 'Doctor is required'],
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: [true, 'Patient is required'],
  },
  type: {
    type: String,
    enum: {
      values: ['Consultation', 'Follow up', 'Routine'],
      message: '{VALUE} is not supported, please select from Consultation, follow up, Routine',
    },
    default: 'Consultation',
  },
  date: {
    type: Date,
    default: Date.now,
  },
  time: {
    type: String,
    default: `${new Date().getHours()}:${new Date().getMinutes()}`,
  },
  // If not set, nextAppointment will be set to 1 week after the current date
  // using pre save middleware.
  nextAppointment: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  // Can be share with patient
  notes: {
    type: String,
    default: '',
  },
  // Only visible to the doctor
  privateNotes: {
    type: String,
    default: '',
  },
  prescription: {
    type: String,
    default: '',
  },
  diagnosis: {
    type: String,
    default: '',
  },
  labTests: {
    type: String,
    default: '',
  },
  radOrders: {
    type: String,
    default: '',
  },
});

export default sessionSchema;
