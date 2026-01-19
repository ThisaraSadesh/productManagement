import jwt from "jsonwebtoken";
export const secureRequest = (req, res) => {
  let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
  let jwtSecretKey = process.env.JWT_SECRET_KEY;

  const token = req.header(tokenHeaderKey);
  const allowed = jwt.verify(token, jwtSecretKey);

  if (allowed) {
    res.send("Authenticated Successfully");
  } else {
    res.send("Authentication Failed- Protected Route");
  }
};
