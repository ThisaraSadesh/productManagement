import jwt from "jsonwebtoken";
export const secureRequest = (req, res, next) => {
  if (req.path === "/auth/register" || req.path === "/auth/login") {
    return next();
  }

  let tokenHeaderKey = process.env.TOKEN_HEADER_KEY || "authorization";
  let jwtSecretKey = process.env.JWT_SECRET_KEY;

  try {
    const token = req.header(tokenHeaderKey);
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    const allowed = jwt.verify(token, jwtSecretKey);

    if (allowed) {
      req.user = allowed;
      next();
    } 
  } catch (error) {
        return res.status(401).json({ message: "Authentication Failed - Invalid Token" });

  }
};
