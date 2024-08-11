import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  type: {
    type: String,
    enum: {
      values: ['Consultation', 'follow up', 'Routine'],
      message: '{VALUE} is not supported, please select from Consultation, follow up, Routine'
    },
    default: 'Consultation'
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  nextAppointment: {
    type: Date,
    default: 'Consultation'
  },
  notes: {
    type: String
  }
});

export default mongoose.model('Session', sessionSchema);
