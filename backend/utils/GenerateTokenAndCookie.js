import jwt from "jsonwebtoken";

const GenerateTokenAndCookie = (userId, res) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "15d",
    });

    if (token) {
      res.cookie("syk_token", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      return token;
    }
  } catch (error) {
    console.log(error.message);
  }
};

export default GenerateTokenAndCookie;
