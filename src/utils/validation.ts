export const isEmail = (value: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
};

export const isPhoneNumber = (value: string): boolean => {
  const phoneRegex = /^[0-9]+$/;
  return phoneRegex.test(value);
};
