import mongoose from 'mongoose';
import sessionSchema from '../models/sessionModel';

sessionSchema.pre('save', function preSave(next) {
  if (this.isModified()) {
    this.updatedAt = Date.now();
  }

  // Set next appointment to next week if not set
  if (!this.nextAppointment) {
    const nextweek = new Date();
    nextweek.setDate(nextweek.getDate() + 7);
    this.nextAppointment = nextweek;
  }

  for (const key in this.toObject()) {
    if (this[key] instanceof Date) {
      // Checking if the Date object is valid
      if (Number.isNaN(this[key].getTime())) {
        return next(new Error(`Invalid date for field: ${key}`));
      }
    }
  }

  return next();
});

sessionSchema.pre('validate', function preValidate(next) {
  if (this.isModified('type')) {
    this.type = this.type.charAt(0).toUpperCase() + this.type.slice(1);
  }
  return next();
});

const Session = mongoose.model('Session', sessionSchema);

export default Session;
