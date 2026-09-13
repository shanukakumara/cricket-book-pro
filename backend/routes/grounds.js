import { Router } from "express";
import Ground from "../models/Ground.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const grounds = await Ground.find({ active: true });
    res.json(grounds);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const ground = await Ground.findById(req.params.id);
    if (!ground) return res.status(404).json({ message: "Ground not found" });
    res.json(ground);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const ground = await Ground.create(req.body);
    res.status(201).json(ground);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/:id", protect, adminOnly, async (req, res) => {
  try {
    const ground = await Ground.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!ground) return res.status(404).json({ message: "Ground not found" });
    res.json(ground);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const ground = await Ground.findByIdAndDelete(req.params.id);
    if (!ground) return res.status(404).json({ message: "Ground not found" });
    res.json({ message: "Ground deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
