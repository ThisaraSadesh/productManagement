import express from "express";
import axios from "axios";

const router = express.Router();
const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL || "http://localhost:3002";

router.post("/update", async (req, res) => {
  try {
    const response = await axios.post(`${PRODUCT_SERVICE_URL}/stock/update`, req.body, {
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
