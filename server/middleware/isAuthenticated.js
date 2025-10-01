const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  try {
    const authToken = req.cookies?.token; // optional chaining in case cookies are undefined
    if (!authToken) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET);
    if (!decodedToken) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    // Attach decoded info to request
    req.userId = decodedToken.userId; // you can access this in your controllers as req.user

    next(); // move to next middleware or route
  } catch (error) {
    console.error("Error in auth middleware:", error.message);
    res.status(401).json({ message: "Unauthorized: Token error" });
  }
};

module.exports = isAuthenticated;
