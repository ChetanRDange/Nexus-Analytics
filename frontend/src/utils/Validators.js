// Email Validator
function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9](?!.*?[._%+-]{2})[a-zA-Z0-9._%+-]*[a-zA-Z0-9]@[a-zA-Z0-9](?!.*?[-]{2})[a-zA-Z0-9.-]*[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}



// Password Validator
const validatePassword = (pwd) => {
  const minLength = pwd.length >= 8;
  const hasUppercase = /[A-Z]/.test(pwd);
  const hasLowercase = /[a-z]/.test(pwd);
  const hasNumber = /[0-9]/.test(pwd);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);

  return (
    minLength && hasUppercase && hasLowercase && hasNumber && hasSpecialChar
  );
};
export { validateEmail, validatePassword };
