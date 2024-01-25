const validateInput = ({ email, password }) => {
  const error = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;

  //   email
  if (!email) {
    error.email = "Email is required";
  } else if (!emailRegex.test(email)) {
    error.email = "Invalid email format";
  }

  //   password
  if (!password) {
    error.password = "Password is required";
  } else if (!passwordRegex.test(password)) {
    error.password =
      "At least 1 digit, 1 lowercase letter, 1 uppercase letter, 1 special character, at least 8 characters long.";
  }

  return error;
};

export default validateInput;
