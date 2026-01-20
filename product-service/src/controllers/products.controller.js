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
  const body = req.body;

  const result = body._id
    ? await productModel
        .findOne({
          _id: body._id,
        })
        .lean()
    : await productModel.find({}).lean();
  if (result !== null) {
    res
      .status(200)
      .json({ message: "Product Found Successfully", data: result });
  } else {
    res.status(401).json({ message: "Product Not Found" });
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
        changeAmount: Math.abs(body.stock - result.stock)
      });

      if (isRecorded) {
        res.status(200).json({ message: "Product Updated and Stock Log Recorded Successfully" });
      }
    } else {
      res.status(200).json({ message: "Product Updated Successfully" });
    }
  } else {
    res.status(401).json({ message: "Product Update Failed" });
  }
};
