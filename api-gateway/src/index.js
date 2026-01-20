import express from "express";
import dotenv from "dotenv";
import authenticate from "./middleware/securityMiddleware.js";
import authRouter from "./routes/auth.routes.js";
import productRouter from "./routes/products.routes.js";
import stockRouter from "./routes/stock.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(authenticate);

// Route all requests to respective microservices
app.use("/auth", authRouter);
app.use("/products", productRouter);
app.use("/stock", stockRouter);

app.listen(PORT, () => {
  console.log(`API Gateway is running on port ${PORT}`);
});
