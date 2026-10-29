import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer "))
    return res.status(401).json({ success: false, message: "Not authorized, token missing" });

  try {
    req.user = jwt.verify(header.split(" ")[1], process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

export default protect;