import mongoose from "mongoose";

const { models, model, Schema } = mongoose;
const stockLogSchema = new Schema(
  {
    productId: { type: Number, ref: "products", required: true },
    stockBefore: { type: Number, required: true },
    stockAfter: { type: Number, required: true },
    changeAmount: { type: Number },
  },
  { timestamps: true },
);

const stockLogModel =
  models.stockLogModel || new model("stockLogModel", stockLogSchema);

export default stockLogModel;
