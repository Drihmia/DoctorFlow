import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import patientSchema from '../models/patientModel';

// Middleware to update the 'updatedAt' field before saving the document
patientSchema.pre('save', async function (next) {
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

  // Remove confirmPassword field before saving the document
  if (this.confirmPassword) {
    this.confirmPassword = undefined;
  }
  next();
});

patientSchema.pre('validate', function (next) {
  // calculate the age of the patient based on the date of birth
  if (this.isModified('dob') || this.isNew) {
    const { dob } = this;
    const age = (new Date() - new Date(dob)) / (3600 * 24 * 365 * 1000);
    this.age = Math.floor(age);
  }

  // Gender accept 2 values: M or F, If user input lowercase,
  // it will be converted to uppercase
  if (this.gender) {
    this.gender = this.gender.toUpperCase();
  }

  // Trim and convert all string fields to lowercase before saving
  for (const key in this.toObject()) {
    const value = this[key];
    if (typeof value === 'string' && !['password', 'confirmPassword', 'gender'].includes(key)) {
      this[key] = value.trim().toLowerCase();
    }

    if (value instanceof Date) {
      // Checking if the Date object is valid
      if (isNaN(value.getTime())) {
        return next(new Error(`Invalid date for field: ${key}`));
      }
    }
  }
  next();
});

const Patient = mongoose.model('Patient', patientSchema);

Patient.init().catch(err => console.error('Index creation failed:', err));

export default Patient;
