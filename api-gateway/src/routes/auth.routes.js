import express from "express";
import axios from "axios";

const router = express.Router();
const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || "http://localhost:3001";

router.post("/register", async (req, res) => {
  try {
    const response = await axios.post(`${AUTH_SERVICE_URL}/auth/register`, req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(
      error.response?.data || { message: "Auth service error" }
    );
  }
});

router.post("/login", async (req, res) => {
  try {
    const response = await axios.post(`${AUTH_SERVICE_URL}/auth/login`, req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(
      error.response?.data || { message: "Auth service error" }
    );
  }
});

export default router;
