import express from "express";
import dotenv from "dotenv";
import path from "path";

import authRouter from "./routes/auth.routes.js";

dotenv.config({
  path: path.resolve(process.cwd(), "auth-service/.env")
});

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Auth Service is running on port ${PORT}`);
});
