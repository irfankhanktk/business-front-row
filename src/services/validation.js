//phone number regex
const validatePhoneNumber = (phoneNumber) => {
  var patt = new RegExp(/^(03)[0-9]{2}[0-9]{7}$/);
  return patt.test(phoneNumber);
};
//email regex
const validateEmail = (mail) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(mail).toLowerCase());
};
//float number validation
const floatValidation = (number) => {
  var patt = new RegExp(/^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/);
  return patt.test(number);
};
//int number validation
const intValidation = (number) => {
  var patt = new RegExp(/^[0-9]+$/);
  return patt.test(number);
};
// to count occurence
const getOccurrence = (str, substr) => {
  return str.match(/o/g) || [];
};
//to match password
const isPasswordsMatched = (password, cpassword) => password == cpassword;
//possible messages to be displayed
const getEmptyFieldMessage = (fieldName) => ({
  message: `Oops! you have forgot to enter ${fieldName}`,
  status: false,
});
const getLessThenZeroMessage = (fieldName) => ({
  message: `Oops! your ${fieldName} must be grater then 1`,
  status: false,
});
const getInvalidFieldMessage = (fieldName) => ({
  message: `Oops! you have entered invalid ${fieldName}`,
  status: false,
});
const getPasswordMessage = (fieldName) => ({
  message: `Oops! your ${fieldName} length must be greater or equal to 6 characters`,
  status: false,
});
const getNotMatched = () => ({
  message: `Oops! Password and confirm password did not match`,
  status: false,
});
const getOkMessage = () => ({ message: `OK`, status: true });
//signin fields validation
const signinValidation = (fields = {}) => {
  if (!fields?.email?.trim()) {
    // console.log("getEmptyFieldMessage", getEmptyFieldMessage("email"));
    return getEmptyFieldMessage("email");
  } else if (!validateEmail(fields?.email)) {
    return getInvalidFieldMessage("email");
  } else if (!fields?.password?.trim()) {
    return getEmptyFieldMessage("password");
  }
  return getOkMessage();
};
const passwordValidation = (fields = {}) => {
  if (!fields?.old_password?.trim()) {
    return getEmptyFieldMessage("old password");
  } else if (fields?.old_password?.trim()?.length < 6) {
    return getPasswordMessage("old password");
  } else if (!fields?.new_password?.trim()) {
    return getEmptyFieldMessage("new_password");
  } else if (fields?.new_password?.trim()?.length < 6) {
    return getPasswordMessage("new_password");
  } else if (!fields?.confirm_password?.trim()) {
    return getEmptyFieldMessage("confirm password");
  } else if (
    !isPasswordsMatched(fields.new_password, fields.confirm_password)
  ) {
    return getNotMatched();
  }
  return getOkMessage();
};
//reset field validation
const createGroupValidation = (fields = {}) => {
  if (!fields?.image?.uri) {
    return getEmptyFieldMessage("image");
  } else if (!fields?.name?.trim()) {
    return getEmptyFieldMessage("name");
  }
  return getOkMessage();
};

//sign up validation
const signupValidation = (fields = {}) => {
  if (!fields?.first_name?.trim()) {
    //  console.log("getEmptyFieldMessage", getEmptyFieldMessage("first_name"));
    return getEmptyFieldMessage("first_name");
  } else if (!fields?.last_name?.trim()) {
    return getEmptyFieldMessage("last_name");
  } else if (!fields?.email?.trim()) {
    return getEmptyFieldMessage("email");
  } else if (!validateEmail(fields?.email)) {
    return getInvalidFieldMessage("email");
  }
  // else if (!fields?.phone?.trim()) {
  //   return getEmptyFieldMessage("phone");
  // }
  // else if (!validatePhoneNumber(fields?.phone)) {
  //   return getInvalidFieldMessage("phone");
  // }
  else if (!fields?.password?.trim()) {
    return getEmptyFieldMessage("password");
  } else if (fields?.password?.trim()?.length < 6) {
    return getPasswordMessage("password");
  } else if (!fields?.confirmPassword?.trim()) {
    return getEmptyFieldMessage("confirm password");
  } else if (!isPasswordsMatched(fields.password, fields.confirmPassword)) {
    return getNotMatched();
  }
  return getOkMessage();
};

//sign up validation
const personalInfoValidation = (fields = {}) => {
  if (!fields?.first_name?.trim()) {
    return getEmptyFieldMessage("first_name");
  } else if (!fields?.last_name?.trim()) {
    return getEmptyFieldMessage("last_name");
  }
  return getOkMessage();
};

export default {
  signinValidation,
  signupValidation,
  personalInfoValidation,
  createGroupValidation,
  passwordValidation,
};
