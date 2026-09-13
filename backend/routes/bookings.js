import { Router } from "express";
import Booking from "../models/Booking.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = Router();

router.get("/", protect, async (req, res) => {
  try {
    const filter = req.user.role === "Admin" ? {} : { userId: req.user._id };
    const bookings = await Booking.find(filter).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/availability", async (req, res) => {
  try {
    const { groundId, date } = req.query;
    if (!groundId || !date) return res.status(400).json({ message: "groundId and date are required" });
    const booked = await Booking.find({ groundId, date, status: "Confirmed" }).select("slot");
    res.json(booked.map((b) => b.slot));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    if (req.user.role !== "Admin" && String(booking.userId) !== String(req.user._id)) {
      return res.status(403).json({ message: "Not authorized" });
    }
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", protect, async (req, res) => {
  try {
    const booking = await Booking.create({ ...req.body, userId: req.user._id, user: req.user.name });
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/:id", protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    if (req.user.role !== "Admin" && String(booking.userId) !== String(req.user._id)) {
      return res.status(403).json({ message: "Not authorized" });
    }
    Object.assign(booking, req.body);
    await booking.save();
    res.json(booking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/:id/cancel", protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    if (req.user.role !== "Admin" && String(booking.userId) !== String(req.user._id)) {
      return res.status(403).json({ message: "Not authorized" });
    }
    booking.status = "Cancelled";
    await booking.save();
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
