import mongoose from "mongoose";

const { models, model, Schema } = mongoose;
const stockLogSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  productId: { type: Schema.Types.ObjectId, ref: products, required: true },
  stockBefore: { type: Number, required: true },
  stockAfter: { type: Number, required: true },
});

const stockLogModel =
  models.stockLogModel || new model("stockLogModel", stockLogSchema);

export default stockLogModel;
