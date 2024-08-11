const prettifyError = (error) => {
  if (error instanceof Error) {
    let errMsg = error.message;
    if (errMsg.includes('email_1 dup key')) {
      errMsg = 'Email already exist';
    } else if (errMsg.includes('required')) {
      errMsg = `${errMsg.split('`')[1]} is required`;
    }
    return errMsg;
  }
};

export { prettifyError };
