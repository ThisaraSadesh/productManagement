import express from "express";
import { updateProduct } from "../controllers/products.controller.js";

const router = express.Router();

router.post("/update", updateProduct);

export default router;
