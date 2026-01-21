import express from "express";
import axios from "axios";

const router = express.Router();
const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL || "http://localhost:3002";

router.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${PRODUCT_SERVICE_URL}/products`, {
      data: req.body,
      headers: {
        authorization: req.header("Authorization")
      }
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(
      error.response?.data || { message: "Product service error" }
    );
  }
});

router.post("/", async (req, res) => {
  try {
    const response = await axios.post(`${PRODUCT_SERVICE_URL}/products`, req.body, {
      headers: {
        authorization: req.header("Authorization")
      }
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(
      error.response?.data || { message: "Product service error" }
    );
  }
});

router.post("/update", async (req, res) => {
  try {
    const response = await axios.post(`${PRODUCT_SERVICE_URL}/products/update`, req.body, {
      headers: {
        authorization: req.header("Authorization")
      }
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(
      error.response?.data || { message: "Product service error" }
    );
  }
});


router.delete("/delete", async (req, res) => {
  try {
    const response = await axios.delete(`${PRODUCT_SERVICE_URL}/products/delete`, {
      data: req.body,
      headers: {
        authorization: req.header("Authorization")
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
