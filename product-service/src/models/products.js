import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const productSchema = new Schema(
  {
    id: { type: Number, unique: true },
    name: { type: String },
    price: { type: mongoose.Schema.Types.Decimal128, required: true },
    stock: { type: Number, required: true },
  },
  { timestamps: true },
);

// Auto-increment id before saving
productSchema.pre('save', async function() {
  if (!this.id) {
    const maxProduct = await this.constructor.findOne({}, { id: 1 }).sort({ id: -1 }).limit(1);
    this.id = maxProduct ? maxProduct.id + 1 : 1;
  }
});

const productModel =
  models.productModel || new model("productModel", productSchema);

export default productModel;
