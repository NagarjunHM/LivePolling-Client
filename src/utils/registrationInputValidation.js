const validateInput = ({ name, email, password, repassword }) => {
  const error = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;

  //   name
  if (!name) {
    error.name = "Name is required";
  } else if (name.length < 2) {
    error.name = "Name should be at least 2 characters";
  }

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

  //   repassword
  if (!repassword) {
    error.repassword = "Re-enter password";
  } else if (repassword.trim() !== password.trim()) {
    error.repassword = "Passwords do not match";
  }

  return error;
};

export default validateInput;
