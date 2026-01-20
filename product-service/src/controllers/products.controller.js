import mongoose from "mongoose";
import productModel from "../models/products.js";
import stockLogModel from "../models/stock_logs.js";
import { connectDB } from "../mongoConfig.js";

export const addProduct = async (req, res) => {
  await connectDB();
  const body = req.body;

  const result = await productModel.create({
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

export const fetchProduct = async (req, res) => {
   await connectDB();
  try {
    const { _id, page = 1, limit = 10, search = "" } = req.query;
    console.log("PRINTING QUERY", req.query);

    if (_id) {
      const product = await productModel.findById(_id).lean();

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      return res.status(200).json({
        message: "Product found successfully",
        data: product,
      });
    }
  

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const skip = (pageNumber - 1) * limitNumber;

    const query = {
      name: { $regex: search, $options: "i" },
    };

    const products = await productModel
      .find(query)
      .skip(skip)
      .limit(limitNumber)
      .lean();

    const total = await productModel.countDocuments(query);

    res.status(200).json({
      message: "Products fetched successfully",
      pagination: {
        page: pageNumber,
        limit: limitNumber,
        total,
        totalPages: Math.ceil(total / limitNumber),
      },
      data: products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProduct = async (req, res) => {
  await connectDB();
  const body = req.body;

  const updateData = {};

  if (body.name !== undefined) updateData.name = body.name;
  if (body.price !== undefined) updateData.price = body.price;
  if (body.stock !== undefined) updateData.stock = body.stock;

  const result = await productModel.findOneAndUpdate(
    {
      _id: body._id,
    },
    updateData,
  );

  if (result) {
    if (body.stock !== undefined && body.stock !== result.stock) {
      const isRecorded = await stockLogModel.create({
        productId: result._id,
        stockBefore: result.stock,
        stockAfter: body.stock,
        changeAmount: Math.abs(body.stock - result.stock),
      });

      if (isRecorded) {
        res
          .status(200)
          .json({
            message: "Product Updated and Stock Log Recorded Successfully",
          });
      }
    } else {
      res.status(200).json({ message: "Product Updated Successfully" });
    }
  } else {
    res.status(401).json({ message: "Product Update Failed" });
  }
};
