import regex from "../regex";

export const getInputsValidation = (email: string, password: string) => {
  const { emailRegex, passwordRegex } = regex;

  const isEmailValid = emailRegex.test(email);
  const isPasswordValid = passwordRegex.test(password);

  return {
    isEmailValid,
    isPasswordValid,
  };
};
