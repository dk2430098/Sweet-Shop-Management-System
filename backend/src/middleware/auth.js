const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const header = req.header("Authorization");

  if (!header) {
    return res.status(401).json({ msg: "No token provided" });
  }

  const token = header.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    return next();
  } catch (error) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ msg: "Admin access required" });
  }
  next();
};

module.exports = { authenticate, isAdmin };
