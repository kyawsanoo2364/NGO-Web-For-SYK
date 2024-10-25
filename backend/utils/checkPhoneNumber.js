function validatePhoneNumberE164(phoneNumber) {
  const regex = /^\+?[1-9]\d{1,14}$/;
  return regex.test(phoneNumber);
}

export { validatePhoneNumberE164 };
