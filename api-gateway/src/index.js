import express from "express";
import dotenv from "dotenv";
import authenticate from "./middleware/securityMiddleware.js";
import authRouter from "./routes/auth.routes.js";
import productRouter from "./routes/products.routes.js";
import stockRouter from "./routes/stock.routes.js";
import path from "path";

dotenv.config({
  path: path.resolve(process.cwd(), "api-gateway/.env")
});


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(authenticate);

app.use("/auth", authRouter);
app.use("/products", productRouter);
app.use("/stock", stockRouter);

app.listen(PORT, () => {
  console.log(`API Gateway is running on port ${PORT}`);
});
