export const checkValidation = (email, password) => {
  if (!email && !password) {
    return 'email and password is required';
  } else if (!email && password) {
    return 'email is required';
  } else if (email && !password) {
    return 'password is required';
  } else if (
    !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) &&
    password
  ) {
    return 'Invalid Email';
  } else if (
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) &&
    password
  ) {
    return true;
  }

  return false;
};
