const GenerateVerifyCode = () => {
  const code = Math.floor(100000 + Math.random() * 90000);
  return code;
};

export default GenerateVerifyCode;
