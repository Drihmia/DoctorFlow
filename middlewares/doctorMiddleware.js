import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import doctorSchema from '../models/doctorModel';

// Middleware to update the 'updatedAt' field before saving the document
doctorSchema.pre('save', async function preSave(next) {
  // Hash the password before saving the document
  if (this.isModified('password')) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    } catch (err) {
      return next(err);
    }
  }

  // Update the 'updatedAt' field before saving the document
  if (this.isModified() || this.isNew) {
    this.updatedAt = Date.now();
  }

  // Remove the confirm password field before saving the document
  if (this.confirmPassword) {
    this.confirmPassword = undefined;
  }
  return next();
});

doctorSchema.pre('validate', async function preValidate(next) {
  for (const key in this.toObject()) {
    if (key) {
      const value = this[key];
      if (typeof value === 'string' && !['password', 'confirmPassword', 'gender'].includes(key)) {
        this[key] = value.trim();
      }

      if (value instanceof Date) {
        // Checking if the Date object is valid
        if (Number.isNaN(value.getTime())) {
          return next(new Error(`Invalid date for field: ${key}`));
        }
      }
    }
  }

  // Gender accept 2 values: M or F, If user input lowercase,
  // it will be converted to uppercase
  if (this.gender) {
    this.gender = this.gender.toUpperCase();
  }
  return next();
});

const Doctor = mongoose.model('Doctor', doctorSchema);

Doctor.init().catch((err) => console.error('Index creation failed:', err));

export default Doctor;
