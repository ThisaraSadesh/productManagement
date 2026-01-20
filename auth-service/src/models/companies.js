import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  name: { type: String, required: true },
}, { timestamps: true });

// Auto-increment id before saving
companySchema.pre('save', async function() {
  if (!this.id) {
    const maxCompany = await this.constructor.findOne({}, { id: 1 }).sort({ id: -1 }).limit(1);
    this.id = maxCompany ? maxCompany.id + 1 : 1;
  }
});
const companiesModel = mongoose.model("companies", companySchema);
export default companiesModel;