import mongoose from "mongoose";

const blockedSlotSchema = new mongoose.Schema({
  groundId: { type: mongoose.Schema.Types.ObjectId, ref: "Ground", required: true },
  date: { type: String, required: true },
  slot: { type: String, required: true },
}, { timestamps: true });

blockedSlotSchema.index({ groundId: 1, date: 1, slot: 1 }, { unique: true });

export default mongoose.model("BlockedSlot", blockedSlotSchema);
