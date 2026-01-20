import express from "express";
import { addProduct, fetchProduct, updateProduct } from "../controllers/products.controller.js";

const router = express.Router();

router.get("/", fetchProduct);
router.post("/", addProduct);
router.post("/update", updateProduct);

export default router;
