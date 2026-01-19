import { connectDB } from "../lib/mongoConfig.js";
import productModel from "../lib/models/products.js";

export const registerUser = async (req, res) => {
  connectDB();
  const body = req.body;
  console.log("req body", body);
  const result = productModel.insertOne({
    name: body.name,
    price: body.price,
    stock: body.stock,
  });

  if (result) {
    res
      .status(200)
      .json({ message: "Product Created Successfully", data: result });
  } else {
    res.status(401).json({ message: "Product Creation Failed" });
  }
};
