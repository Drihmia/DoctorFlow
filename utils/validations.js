const checkPwd = (query, res) => {
  // If password is provided, confirmPassword must be provided
  if (query.password) {
    if (query.confirmPassword) {
      if (query.password !== query.confirmPassword) {
        res.status(400).json({ error: { password: 'Password does not match' } });
        return false;
      }
    } else {
      res.status(400).json({ error: { confirmPassword: 'ConfirmPassword is required' } });
      return false;
    }
  }
  return true;
};

// I'm using in the Patient's schema validation
const checkArrayObjects = function (v) {
  // Checking it's an array
  if (!Array.isArray(v)) return false;

  // Check each item in the array is an object
  for (const item of v) {
    if (typeof item !== 'object' || Array.isArray(item)) {
      return false;
    }
  }

  return true;
};

const strongPassword = function (validator) {
  return function (value) {
    return validator.isStrongPassword(value, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1
    });
  };
};

// This function insures that require validator will trigger only
// when password is modified or new user is created
const confirmPasswordShouldBeRequired = function (validator) {
  return this.isModified('password') || this.isNew;
};

export { checkPwd, checkArrayObjects, strongPassword, confirmPasswordShouldBeRequired };
