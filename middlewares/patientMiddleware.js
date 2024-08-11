import mongoose from 'mongoose';
import patientSchema from '../models/patientModel';

// Middleware to update the 'updatedAt' field before saving the document
patientSchema.pre('save', function (next) {
  if (this.isModified() || this.isNew) {
    this.updatedAt = Date.now();
  }
  for (const key in this.toObject()) {
    const value = this[key];
    if (typeof value === 'string' && key !== 'password' && key !== 'gender') {
      this[key] = value.trim().toLowerCase();
    }
    if (value instanceof Date) {
      // Checking if the Date object is valid
      if (isNaN(value.getTime())) {
        return next(new Error(`Invalid date for field: ${key}`));
      }
    }
  }
  // Gender accept 2 values: M or F, If user input lowercase,
  // it will be converted to uppercase
  if (this.gender) {
    this.gender = this.gender.toUpperCase();
  }
  next();
});

export default mongoose.model('Patient', patientSchema);
