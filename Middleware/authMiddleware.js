import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
  try {
    let token;
    
    // Check cookies or authorization header
    if (req.cookies && req.cookies.jwt) {
      token = req.cookies.jwt;
    } else if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ success: false, message: "Not authorized to access this route" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // Important: controllers use req.userId
    req.user = decoded;
    
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    return res.status(401).json({ success: false, message: "Not authorized, token failed" });
  }
};
