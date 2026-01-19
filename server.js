import express from "express";
import dotenv from "dotenv";
import {secureRequest} from './securityMiddleware.js';
import authRouter from './src/routes/auth.routes.js'

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();

app.use(secureRequest);
app.use('/auth',authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
