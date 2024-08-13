const prettifyError = (error) => {
  if (error instanceof Error) {
    const errorsObject = {};

    if (error.code === 11000) {
      errorsObject[Object.keys(error.keyValue)[0]] = 'Email already exists';
    } else {
      Object.values(error.errors).forEach(({ properties }) => {
        const { message, path } = properties;
        errorsObject[path] = message;
      });
    }
    return errorsObject;
  }
  return error;
};

export { prettifyError };
