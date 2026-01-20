import express from "express";
import axios from "axios";

const router = express.Router();
const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL || "http://localhost:3002";

// Get products - forward to product service
router.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${PRODUCT_SERVICE_URL}/products`, {
      data: req.body,
      headers: {
        authorization: req.header("authorization")
      }
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(
      error.response?.data || { message: "Product service error" }
    );
  }
});

// Add product - forward to product service
router.post("/", async (req, res) => {
  try {
    const response = await axios.post(`${PRODUCT_SERVICE_URL}/products`, req.body, {
      headers: {
        authorization: req.header("authorization")
      }
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(
      error.response?.data || { message: "Product service error" }
    );
  }
});

// Update product - forward to product service
router.post("/update", async (req, res) => {
  try {
    const response = await axios.post(`${PRODUCT_SERVICE_URL}/products/update`, req.body, {
      headers: {
        authorization: req.header("authorization")
      }
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(
      error.response?.data || { message: "Product service error" }
    );
  }
});

export default router;
