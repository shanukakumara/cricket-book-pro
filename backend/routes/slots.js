import { Router } from "express";
import BlockedSlot from "../models/BlockedSlot.js";
import Booking from "../models/Booking.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = Router();

router.get("/availability", async (req, res) => {
  try {
    const { groundId, date } = req.query;
    if (!groundId || !date) return res.status(400).json({ message: "groundId and date are required" });
    const [booked, blocked] = await Promise.all([
      Booking.find({ groundId, date, status: "Confirmed" }).select("slot"),
      BlockedSlot.find({ groundId, date }).select("slot"),
    ]);
    const bookedSlots = booked.map((b) => b.slot);
    const blockedSlots = blocked.map((b) => b.slot);
    res.json({ booked: bookedSlots, blocked: blockedSlots });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:groundId", protect, adminOnly, async (req, res) => {
  try {
    const { date } = req.query;
    const filter = { groundId: req.params.groundId };
    if (date) filter.date = date;
    const slots = await BlockedSlot.find(filter).sort({ date: 1 });
    res.json(slots);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const { groundId, date, slot } = req.body;
    if (!groundId || !date || !slot) return res.status(400).json({ message: "groundId, date, and slot are required" });
    const existing = await BlockedSlot.findOne({ groundId, date, slot });
    if (existing) return res.status(409).json({ message: "Slot already blocked" });
    const blocked = await BlockedSlot.create({ groundId, date, slot });
    res.status(201).json(blocked);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const blocked = await BlockedSlot.findByIdAndDelete(req.params.id);
    if (!blocked) return res.status(404).json({ message: "Blocked slot not found" });
    res.json({ message: "Slot unblocked" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
