import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  ground: { type: String, required: true },
  groundId: { type: mongoose.Schema.Types.ObjectId, ref: "Ground", required: true },
  date: { type: String, required: true },
  slot: { type: String, required: true },
  duration: { type: String, default: "2 hrs" },
  status: { type: String, enum: ["Confirmed", "Pending", "Cancelled"], default: "Pending" },
  total: { type: Number, required: true },
  user: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

export default mongoose.model("Booking", bookingSchema);
