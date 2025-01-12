// login Form Validation

export const LoginFormValidation = (userData) => {
  let errors = {};
  let valid = true;

  const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,4}$/i;
  var PasswordRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_-])(?=.{8,16})"
  );
  if (userData?.email !== undefined && !userData?.email) {
    errors.email = "Please enter email";
    valid = false;
  } else if (
    userData?.email !== undefined &&
    !emailregex.test(userData?.email)
  ) {
    errors.email = "Please enter valid email";
    valid = false;
  } else if (userData?.email) {
    errors.email = "";
  }

  if (userData.password !== undefined && !userData.password) {
    errors.password = "Please enter password";
    valid = false;
  } else if (
    userData.password !== undefined &&
    !PasswordRegex.test(userData.password)
  ) {
    errors.password =
      "Password must be 8 to 16 characters long alphanumeric, must contain at least 1 special character and upper case / lower case letters";
    valid = false;
  } else if (userData.password) {
    errors.password = "";
  }

  return { errors, valid };
};

// customer form validation

export const CustomerFormValidation = (userData) => {
  let errors = {};
  let valid = true;
  const phoneRegex = /^\d{10}$/;
  const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  const capitalRegex = /^[A-Za-z][A-Za-z\s]*$/;

  if (userData.name !== undefined && !userData.name) {
    errors.name = "Please enter name";
    valid = false;
  } else if (!capitalRegex.test(userData.name)) {
    errors.name = "Name cannot contain numbers and special characters";
    valid = false;
  } else if (userData.name) {
    errors.name = "";
  }

  if (userData.email !== undefined && !userData.email) {
    errors.email = "Please enter email";
    valid = false;
  } else if (userData.email !== undefined && !emailregex.test(userData.email)) {
    errors.email = "Please enter valid email";
    valid = false;
  } else if (userData.email) {
    errors.email = "";
  }

  if (userData.phone_no !== undefined && !userData.phone_no) {
    errors.phone_no = "Please enter phone number";
    valid = false;
  } else if (
    userData.phone_no !== undefined &&
    !phoneRegex.test(userData.phone_no)
  ) {
    errors.phone_no = "Please enter a valid 10-digit phone number";
    valid = false;
  } else if (userData.phone_no) {
    errors.phone_no = "";
  }

  if (userData.address !== undefined && !userData.address) {
    errors.address = "Please enter address";
    valid = false;
  } else if (userData.address) {
    errors.address = "";
  }

  return { errors, valid };
};
