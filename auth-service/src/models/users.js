import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const usersSchema = new Schema(
  {
    name: { type: String },
    company_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "companies"
    },
    gender: { type: String },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true },
);

const usersModel = models.usersModel || new model("usersModel", usersSchema);

export default usersModel;
