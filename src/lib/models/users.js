import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const usersSchema = new Schema({
  name: { type: String },
  price: { type: mongoose.Schema.Types.Decimal128, required: true },
  stock: { type: Number, required: true },
});

const usersModel =
  models.usersModel || new model("usersModel", usersSchema);

export default usersModel;
