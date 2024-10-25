import jwt from "jsonwebtoken";
import User from "../model/User.model.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.syk_token;
    if (!token) {
      return res.status(401).json({
        message: "401 Unauthorized - No token found or Token expired!",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res
        .status(401)
        .json({ message: "401 Unauthorized - Invalid Token" });
    }
    const userId = decoded?.userId;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ message: "No user found Or Deleted User Account" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

export default protectRoute;
