const prettifyError = (error) => {
  if (error instanceof Error) {
    const errorsObject = {};

    if (error.code === 11000) {
      errorsObject[Object.keys(error.keyValue)[0]] = `${Object.keys(error.keyValue)[0]} already exists`;
      return errorsObject;
    }
    if (error.errors) {
      if (Object.keys(error.errors).includes('currentMedication')) {
        errorsObject.currentMedication = 'CurrentMedication must be an array of objects';
      }
      if (Object.keys(error.errors).includes('familyHistory')) {
        errorsObject.familyHistory = 'FamilyHistory must be an array of objects';
      }

      Object.values(error.errors).forEach(({ properties }) => {
        if (properties && Object.keys(properties).includes('message') && Object.keys(properties).includes('path')) {
          const { message, path } = properties;
          errorsObject[path] = message;
        }
      });
      return errorsObject;
    }
    return error.message;
  }
  return error;
};

export { prettifyError };
