import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
  if (req.path === "/auth/login" || req.path === "/auth/register") {
    return next();
  }

  const tokenHeaderKey = process.env.TOKEN_HEADER_KEY || "authorization";
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
        .json({ message: "Authentication Failed - Invalid Token" });
    }
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Authentication Failed - Invalid Token" });
  }
};

export default authenticate;
