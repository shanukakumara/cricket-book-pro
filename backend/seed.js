import "dotenv/config";
import { connectDB } from "./config/db.js";
import User from "./models/User.js";
import Ground from "./models/Ground.js";
import Booking from "./models/Booking.js";

const grounds = [
  { name: "Asgiriya International Ground", location: "Kandy", price: 2500, rating: 4.8, reviews: 124,
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1200&q=80",
    facilities: ["Floodlights","Pavilion","Parking","Scoreboard","Canteen"],
    description: "A premier international-standard cricket ground nestled in the heart of Kandy, featuring full floodlights and modern amenities." },
  { name: "Pallekele Cricket Arena", location: "Kandy", price: 3000, rating: 4.9, reviews: 203,
    image: "https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=1200&q=80",
    facilities: ["Floodlights","Pavilion","Parking","Scoreboard","Changing Rooms"],
    description: "World-class cricket facility with a capacity for 35,000 spectators and top-tier playing surface maintained year-round." },
  { name: "Galle Fort Cricket Club", location: "Galle", price: 1500, rating: 4.6, reviews: 87,
    image: "https://images.unsplash.com/photo-1593341646782-e0b495cff86d?w=1200&q=80",
    facilities: ["Pavilion","Parking","Scoreboard"],
    description: "Historic ground overlooking the Galle Fort, offering a unique cricketing experience with a breathtaking ocean backdrop." },
  { name: "Colts Cricket Ground", location: "Colombo", price: 2000, rating: 4.5, reviews: 156,
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=1200&q=80",
    facilities: ["Floodlights","Canteen","Changing Rooms","Parking"],
    description: "A well-maintained urban cricket ground in Colombo, perfect for club matches and corporate cricket events." },
  { name: "Moors Sports Club", location: "Colombo", price: 1800, rating: 4.3, reviews: 72,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80",
    facilities: ["Pavilion","Floodlights","Scoreboard"],
    description: "Centrally located in Colombo with excellent transport links and a reputation for well-prepared pitches." },
  { name: "Matara Cricket Ground", location: "Matara", price: 1200, rating: 4.2, reviews: 45,
    image: "https://images.unsplash.com/photo-1593341646782-e0b495cff86d?w=1200&q=80",
    facilities: ["Parking","Canteen"],
    description: "Affordable and accessible cricket ground in the southern province, ideal for local league matches." },
  { name: "Kurunegala Welagedara Stadium", location: "Kurunegala", price: 1700, rating: 4.4, reviews: 61,
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=1200&q=80",
    facilities: ["Floodlights","Pavilion","Parking"],
    description: "A vibrant venue in the northwestern province known for friendly hospitality and well-kept turf wickets." },
  { name: "SSC Maitland Place", location: "Colombo", price: 2800, rating: 4.7, reviews: 188,
    image: "https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?w=1200&q=80",
    facilities: ["Floodlights","Pavilion","Parking","Scoreboard","Canteen","Changing Rooms"],
    description: "The iconic Sinhalese Sports Club ground — a national treasure with a rich Test cricket heritage." },
];

const usersData = [
  { name: "Admin User", email: "admin@cricket.lk", phone: "+94 70 000 0001", password: "admin123", status: "Active", role: "Admin" },
  { name: "Kamal Perera", email: "kamal@gmail.com", phone: "+94 71 234 5678", password: "pass123", status: "Active", role: "User" },
  { name: "Saman Silva", email: "saman@gmail.com", phone: "+94 77 345 6789", password: "pass123", status: "Active", role: "User" },
  { name: "Nimal Fernando", email: "nimal@gmail.com", phone: "+94 76 456 7890", password: "pass123", status: "Suspended", role: "User" },
  { name: "Anura Bandara", email: "anura@gmail.com", phone: "+94 71 555 1122", password: "pass123", status: "Active", role: "User" },
  { name: "Ruwan Jayasuriya", email: "ruwan@gmail.com", phone: "+94 77 998 4433", password: "pass123", status: "Active", role: "User" },
  { name: "Dilshan Mendis", email: "dilshan@gmail.com", phone: "+94 76 221 9988", password: "pass123", status: "Active", role: "User" },
  { name: "Chaminda Vaas", email: "chaminda@gmail.com", phone: "+94 71 444 5566", password: "pass123", status: "Active", role: "User" },
];

async function seed() {
  await connectDB();

  await User.deleteMany({});
  await Ground.deleteMany({});
  await Booking.deleteMany({});

  const createdGrounds = await Ground.insertMany(grounds);

  const createdUsers = [];
  for (const u of usersData) {
    createdUsers.push(await User.create(u));
  }

  const admin = createdUsers.find(u => u.role === "Admin");
  const user1 = createdUsers.find(u => u.name === "Kamal Perera");
  const user2 = createdUsers.find(u => u.name === "Saman Silva");
  const user4 = createdUsers.find(u => u.name === "Anura Bandara");
  const user5 = createdUsers.find(u => u.name === "Ruwan Jayasuriya");
  const user6 = createdUsers.find(u => u.name === "Dilshan Mendis");
  const user8 = createdUsers.find(u => u.name === "Chaminda Vaas");

  const g1 = createdGrounds.find(g => g.name.includes("Asgiriya"));
  const g2 = createdGrounds.find(g => g.name.includes("Pallekele"));
  const g3 = createdGrounds.find(g => g.name.includes("Galle"));
  const g4 = createdGrounds.find(g => g.name.includes("Colts"));
  const g5 = createdGrounds.find(g => g.name.includes("Moors"));
  const g6 = createdGrounds.find(g => g.name.includes("Matara"));
  const g7 = createdGrounds.find(g => g.name.includes("Kurunegala"));
  const g8 = createdGrounds.find(g => g.name.includes("SSC"));

  const bookingsData = [
    { ground: g1.name, groundId: g1._id, date: "2026-06-15", slot: "08:00–10:00", duration: "2 hrs", status: "Confirmed", total: 5100, user: user1.name, userId: user1._id },
    { ground: g2.name, groundId: g2._id, date: "2026-06-20", slot: "14:00–16:00", duration: "2 hrs", status: "Pending", total: 6100, user: user2.name, userId: user2._id },
    { ground: g8.name, groundId: g8._id, date: "2026-06-28", slot: "16:00–18:00", duration: "2 hrs", status: "Confirmed", total: 5700, user: user4.name, userId: user4._id },
    { ground: g4.name, groundId: g4._id, date: "2026-04-02", slot: "10:00–12:00", duration: "2 hrs", status: "Confirmed", total: 4100, user: user5.name, userId: user5._id },
    { ground: g3.name, groundId: g3._id, date: "2026-03-22", slot: "06:00–08:00", duration: "2 hrs", status: "Confirmed", total: 3100, user: user6.name, userId: user6._id },
    { ground: g3.name, groundId: g3._id, date: "2026-05-10", slot: "06:00–08:00", duration: "2 hrs", status: "Cancelled", total: 3100, user: "Nimal Fernando", userId: createdUsers.find(u => u.name === "Nimal Fernando")._id },
    { ground: g5.name, groundId: g5._id, date: "2026-05-18", slot: "18:00–20:00", duration: "2 hrs", status: "Cancelled", total: 3700, user: user8.name, userId: user8._id },
    { ground: g7.name, groundId: g7._id, date: "2026-06-30", slot: "12:00–14:00", duration: "2 hrs", status: "Pending", total: 3500, user: user2.name, userId: user2._id },
    { ground: g2.name, groundId: g2._id, date: "2026-06-25", slot: "20:00–22:00", duration: "2 hrs", status: "Confirmed", total: 6100, user: user1.name, userId: user1._id },
    { ground: g6.name, groundId: g6._id, date: "2026-07-02", slot: "10:00–12:00", duration: "2 hrs", status: "Pending", total: 2500, user: user4.name, userId: user4._id },
  ];

  await Booking.insertMany(bookingsData);

  console.log("Seed complete!");
  process.exit(0);
}

seed();
