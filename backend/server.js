import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import groundRoutes from "./routes/grounds.js";
import bookingRoutes from "./routes/bookings.js";
import userRoutes from "./routes/users.js";
import slotRoutes from "./routes/slots.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/grounds", groundRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/users", userRoutes);
app.use("/api/slots", slotRoutes);

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

await connectDB();
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
