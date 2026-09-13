import mongoose from "mongoose";

const groundSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, default: 4.0 },
  reviews: { type: Number, default: 0 },
  image: { type: String, default: "" },
  facilities: [String],
  description: { type: String, default: "" },
  active: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model("Ground", groundSchema);
