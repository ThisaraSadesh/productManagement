import express from "express";
import {
  addProduct,
  fetchProduct,
  updateProduct,
  deleteProduct
} from "../controllers/products.controller.js";

const router = express.Router();

router.get("/", fetchProduct);
router.post("/", addProduct);
router.post("/update", updateProduct);
router.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "product-service",
    timestamp: new Date(),
  });
});

router.delete("/delete", deleteProduct); 
export default router;
