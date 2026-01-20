import express from "express";
import dotenv from "dotenv";
import productRouter from "./routes/products.routes.js";
import stockRouter from "./routes/stock.routes.js";
import path from "path";

dotenv.config({
  path: path.resolve(process.cwd(), "product-service/.env")
});

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());

const authenticate = (req, res, next) => {
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
      return res.status(401).json({ message: "Authentication Failed - Invalid Token" });
    }
  } catch (error) {
    return res.status(401).json({ message: "Authentication Failed - Invalid Token" });
  }
};


app.use("/products",authenticate, productRouter);
app.use("/stock", authenticate, stockRouter);

app.listen(PORT, () => {
  console.log(`Product Service is running on port ${PORT}`);
});
