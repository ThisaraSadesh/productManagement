import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
  if (req.path === "/auth/login" || req.path === "/auth/register" || req.path === "/auth/health") {
    return next();
  }

  const tokenHeaderKey = process.env.TOKEN_HEADER_KEY || "Authorization";
  const jwtSecretKey = process.env.JWT_SECRET_KEY;

  try {
    const token = req.header(tokenHeaderKey);
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    const allowed = jwt.verify(token, jwtSecretKey);

    if (allowed) {
      req.user = allowed;
      next();
    } else {
      return res
        .status(401)
        .json({ message: "Authentication Failed - Token verification returned false" });
    }
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    return res
      .status(401)
      .json({ 
        message: "Authentication Failed - Token is invalid or expired",
        error: error.message 
      });
  }
};

export default authenticate;