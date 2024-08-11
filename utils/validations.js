
const checkPwd = (query, res) => {
  // If password is provided, confirmPassword must be provided
  if (query.password) {
    if (query.confirmPassword) {
      if (query.password !== query.confirmPassword) {
        res.status(400).json({ error: 'Password does not match' });
        return false;
      }
    } else {
      res.status(400).json({ error: 'confirmPassword is required' });
      return false;
    }
  }
  return true;
};

export { checkPwd };
