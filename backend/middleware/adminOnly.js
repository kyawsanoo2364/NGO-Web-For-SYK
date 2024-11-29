const adminOnly = async (req, res, next) => {
  try {
    if (req.user.role === "admin") {
      next();
    } else {
      res.status(401).json({ message: "401 - Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "500 - Internal Server Error" });
  }
};

export default adminOnly;
