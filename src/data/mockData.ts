export type Ground = {
  id: number;
  name: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  facilities: string[];
  description: string;
};

export const grounds: Ground[] = [
  { id: 1, name: "Asgiriya International Ground", location: "Kandy", price: 2500, rating: 4.8, reviews: 124,
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1200&q=80",
    facilities: ["Floodlights","Pavilion","Parking","Scoreboard","Canteen"],
    description: "A premier international-standard cricket ground nestled in the heart of Kandy, featuring full floodlights and modern amenities." },
  { id: 2, name: "Pallekele Cricket Arena", location: "Kandy", price: 3000, rating: 4.9, reviews: 203,
    image: "https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=1200&q=80",
    facilities: ["Floodlights","Pavilion","Parking","Scoreboard","Changing Rooms"],
    description: "World-class cricket facility with a capacity for 35,000 spectators and top-tier playing surface maintained year-round." },
  { id: 3, name: "Galle Fort Cricket Club", location: "Galle", price: 1500, rating: 4.6, reviews: 87,
    image: "https://images.unsplash.com/photo-1593341646782-e0b495cff86d?w=1200&q=80",
    facilities: ["Pavilion","Parking","Scoreboard"],
    description: "Historic ground overlooking the Galle Fort, offering a unique cricketing experience with a breathtaking ocean backdrop." },
  { id: 4, name: "Colts Cricket Ground", location: "Colombo", price: 2000, rating: 4.5, reviews: 156,
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=1200&q=80",
    facilities: ["Floodlights","Canteen","Changing Rooms","Parking"],
    description: "A well-maintained urban cricket ground in Colombo, perfect for club matches and corporate cricket events." },
  { id: 5, name: "Moors Sports Club", location: "Colombo", price: 1800, rating: 4.3, reviews: 72,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80",
    facilities: ["Pavilion","Floodlights","Scoreboard"],
    description: "Centrally located in Colombo with excellent transport links and a reputation for well-prepared pitches." },
  { id: 6, name: "Matara Cricket Ground", location: "Matara", price: 1200, rating: 4.2, reviews: 45,
    image: "https://images.unsplash.com/photo-1599982061521-9e1d3df8ee2c?w=1200&q=80",
    facilities: ["Parking","Canteen"],
    description: "Affordable and accessible cricket ground in the southern province, ideal for local league matches." },
  { id: 7, name: "Kurunegala Welagedara Stadium", location: "Kurunegala", price: 1700, rating: 4.4, reviews: 61,
    image: "https://images.unsplash.com/photo-1607734834519-d8576ae60ea7?w=1200&q=80",
    facilities: ["Floodlights","Pavilion","Parking"],
    description: "A vibrant venue in the northwestern province known for friendly hospitality and well-kept turf wickets." },
  { id: 8, name: "SSC Maitland Place", location: "Colombo", price: 2800, rating: 4.7, reviews: 188,
    image: "https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?w=1200&q=80",
    facilities: ["Floodlights","Pavilion","Parking","Scoreboard","Canteen","Changing Rooms"],
    description: "The iconic Sinhalese Sports Club ground — a national treasure with a rich Test cricket heritage." },
];

export type Booking = {
  id: string;
  ground: string;
  groundId: number;
  date: string;
  slot: string;
  duration: string;
  status: "Confirmed" | "Pending" | "Cancelled";
  total: number;
  user: string;
};

export const bookings: Booking[] = [
  { id: "BK-2024-00847", ground: "Asgiriya International Ground", groundId: 1, date: "2026-06-15", slot: "08:00–10:00", duration: "2 hrs", status: "Confirmed", total: 5100, user: "Kamal Perera" },
  { id: "BK-2024-00831", ground: "Pallekele Cricket Arena", groundId: 2, date: "2026-06-20", slot: "14:00–16:00", duration: "2 hrs", status: "Pending", total: 6100, user: "Saman Silva" },
  { id: "BK-2024-00822", ground: "SSC Maitland Place", groundId: 8, date: "2026-06-28", slot: "16:00–18:00", duration: "2 hrs", status: "Confirmed", total: 5700, user: "Anura Bandara" },
  { id: "BK-2024-00811", ground: "Colts Cricket Ground", groundId: 4, date: "2026-04-02", slot: "10:00–12:00", duration: "2 hrs", status: "Confirmed", total: 4100, user: "Ruwan Jayasuriya" },
  { id: "BK-2024-00805", ground: "Galle Fort Cricket Club", groundId: 3, date: "2026-03-22", slot: "06:00–08:00", duration: "2 hrs", status: "Confirmed", total: 3100, user: "Dilshan Mendis" },
  { id: "BK-2024-00799", ground: "Galle Fort Cricket Club", groundId: 3, date: "2026-05-10", slot: "06:00–08:00", duration: "2 hrs", status: "Cancelled", total: 3100, user: "Nimal Fernando" },
  { id: "BK-2024-00788", ground: "Moors Sports Club", groundId: 5, date: "2026-05-18", slot: "18:00–20:00", duration: "2 hrs", status: "Cancelled", total: 3700, user: "Chaminda Vaas" },
  { id: "BK-2024-00772", ground: "Kurunegala Welagedara Stadium", groundId: 7, date: "2026-06-30", slot: "12:00–14:00", duration: "2 hrs", status: "Pending", total: 3500, user: "Roshan De Silva" },
  { id: "BK-2024-00765", ground: "Pallekele Cricket Arena", groundId: 2, date: "2026-06-25", slot: "20:00–22:00", duration: "2 hrs", status: "Confirmed", total: 6100, user: "Hashan Tillakaratne" },
  { id: "BK-2024-00759", ground: "Matara Cricket Ground", groundId: 6, date: "2026-07-02", slot: "10:00–12:00", duration: "2 hrs", status: "Pending", total: 2500, user: "Arjuna Ranatunga" },
];

export type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  joined: string;
  bookings: number;
  status: "Active" | "Suspended";
  role: "User" | "Admin";
};

export const users: User[] = [
  { id: 1, name: "Kamal Perera", email: "kamal@gmail.com", phone: "+94 71 234 5678", joined: "2025-03-12", bookings: 14, status: "Active", role: "User" },
  { id: 2, name: "Saman Silva", email: "saman@gmail.com", phone: "+94 77 345 6789", joined: "2025-05-01", bookings: 7, status: "Active", role: "User" },
  { id: 3, name: "Nimal Fernando", email: "nimal@gmail.com", phone: "+94 76 456 7890", joined: "2024-11-20", bookings: 3, status: "Suspended", role: "User" },
  { id: 4, name: "Anura Bandara", email: "anura@gmail.com", phone: "+94 71 555 1122", joined: "2025-01-08", bookings: 22, status: "Active", role: "User" },
  { id: 5, name: "Ruwan Jayasuriya", email: "ruwan@gmail.com", phone: "+94 77 998 4433", joined: "2025-02-14", bookings: 9, status: "Active", role: "User" },
  { id: 6, name: "Dilshan Mendis", email: "dilshan@gmail.com", phone: "+94 76 221 9988", joined: "2024-09-30", bookings: 5, status: "Active", role: "User" },
  { id: 7, name: "Admin User", email: "admin@cricket.lk", phone: "+94 70 000 0001", joined: "2024-01-01", bookings: 0, status: "Active", role: "Admin" },
  { id: 8, name: "Chaminda Vaas", email: "chaminda@gmail.com", phone: "+94 71 444 5566", joined: "2025-04-22", bookings: 11, status: "Active", role: "User" },
];

export const chartData = [
  { day: "Mon", bookings: 12 },
  { day: "Tue", bookings: 19 },
  { day: "Wed", bookings: 8 },
  { day: "Thu", bookings: 24 },
  { day: "Fri", bookings: 31 },
  { day: "Sat", bookings: 47 },
  { day: "Sun", bookings: 38 },
];

export const groundPieData = [
  { name: "Asgiriya", value: 187 },
  { name: "Pallekele", value: 234 },
  { name: "SSC", value: 156 },
  { name: "Colts", value: 121 },
  { name: "Others", value: 149 },
];

export const popularGrounds = [
  { name: "Pallekele Cricket Arena", bookings: 234 },
  { name: "Asgiriya International Ground", bookings: 187 },
  { name: "SSC Maitland Place", bookings: 156 },
  { name: "Colts Cricket Ground", bookings: 121 },
  { name: "Moors Sports Club", bookings: 98 },
];

export const timeSlots = [
  "06:00–08:00","08:00–10:00","10:00–12:00","12:00–14:00",
  "14:00–16:00","16:00–18:00","18:00–20:00","20:00–22:00",
];

export const facilityList = ["Floodlights","Pavilion","Parking","Scoreboard","Changing Rooms","Canteen"];
export const locationList = ["All","Kandy","Colombo","Galle","Matara","Kurunegala"];

export const testimonials = [
  { name: "Kamal Perera", location: "Kandy", quote: "Booked Asgiriya in two minutes — the whole process was seamless. Highly recommend to any cricket lover!" },
  { name: "Saman Silva", location: "Colombo", quote: "Great selection of grounds and clear pricing. The live availability feature saved me a lot of time." },
  { name: "Anura Bandara", location: "Galle", quote: "Played a tournament across three grounds, all booked here. Smooth experience from start to finish." },
];

export const reviews = [
  { name: "Kamal Perera", date: "2 weeks ago", rating: 5, comment: "Outstanding facilities and the pitch was in excellent condition. Will definitely book again." },
  { name: "Saman Silva", date: "1 month ago", rating: 4, comment: "Great ground, friendly staff. Parking was a bit tight on match day but otherwise perfect." },
  { name: "Anura Bandara", date: "2 months ago", rating: 5, comment: "World-class venue. The floodlights for our evening match were brilliant." },
];
