import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const productSchema = new Schema({
  name: { type: String },
  price: { type: mongoose.Schema.Types.Decimal128, required: true },
  stock: { type: Number, required: true },
});

const productModel =
  models.productModel || new model("productModel", productSchema);

export default productModel;
