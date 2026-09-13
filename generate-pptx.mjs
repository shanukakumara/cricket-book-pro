import PptxGenJS from "pptxgenjs";

const pptx = new PptxGenJS();

const BG = "0F172A";
const GREEN = "10B981";
const CARD = "1E293B";
const TEXT = "CBD5E1";
const WHITE = "FFFFFF";

function addSlide(title, subtitle) {
  const slide = pptx.addSlide();
  slide.background = { fill: BG };
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 10, h: 0.05, fill: { color: GREEN } });
  slide.addText(subtitle || "", { x: 0.6, y: 0.3, w: 8.8, h: 0.4, fontSize: 14, color: GREEN, fontFace: "Arial", bold: true });
  slide.addText(title, { x: 0.6, y: 0.7, w: 8.8, h: 0.6, fontSize: 28, color: WHITE, fontFace: "Arial", bold: true });
  return slide;
}

function addCard(slide, x, y, w, h, title, body) {
  slide.addShape(pptx.ShapeType.roundRect, { x, y, w, h, fill: { color: CARD }, line: { color: "334155", width: 0.5 } });
  slide.addText(title, { x: x + 0.15, y: y + 0.1, w: w - 0.3, h: 0.35, fontSize: 14, color: WHITE, fontFace: "Arial", bold: true });
  slide.addText(body, { x: x + 0.15, y: y + 0.45, w: w - 0.3, h: h - 0.55, fontSize: 11, color: TEXT, fontFace: "Arial" });
}

function addTable(slide, headers, rows, startY, colWidths) {
  let x = 0.6;
  headers.forEach((h, i) => {
    slide.addShape(pptx.ShapeType.rect, { x, y: startY, w: colWidths[i], h: 0.35, fill: { color: CARD } });
    slide.addText(h, { x, y: startY, w: colWidths[i], h: 0.35, fontSize: 11, color: GREEN, fontFace: "Arial", bold: true, valign: "middle" });
    x += colWidths[i];
  });
  rows.forEach((row, ri) => {
    x = 0.6;
    row.forEach((cell, ci) => {
      slide.addShape(pptx.ShapeType.rect, { x, y: startY + 0.35 + ri * 0.35, w: colWidths[ci], h: 0.35, line: { color: "1E293B", width: 0.5 } });
      slide.addText(cell, { x, y: startY + 0.35 + ri * 0.35, w: colWidths[ci], h: 0.35, fontSize: 10, color: TEXT, fontFace: "Arial", valign: "middle" });
      x += colWidths[ci];
    });
  });
}

// --- SLIDE 1: Intro ---
const s1 = pptx.addSlide();
s1.background = { fill: BG };
s1.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 10, h: 0.05, fill: { color: GREEN } });
s1.addShape(pptx.ShapeType.roundRect, { x: 0.6, y: 1.2, w: 0.9, h: 0.9, fill: { color: GREEN } });
s1.addText("CB", { x: 0.6, y: 1.2, w: 0.9, h: 0.9, fontSize: 24, color: WHITE, fontFace: "Arial", bold: true, align: "center", valign: "middle" });
s1.addText("CricketBook", { x: 1.8, y: 1.1, w: 7.6, h: 0.7, fontSize: 40, color: WHITE, fontFace: "Arial", bold: true });
s1.addText("Online Cricket Ground Booking System", { x: 1.8, y: 1.8, w: 7.6, h: 0.5, fontSize: 18, color: GREEN, fontFace: "Arial" });
s1.addText("Find, book, and play anywhere in Sri Lanka", { x: 0.6, y: 3.0, w: 8.8, h: 0.5, fontSize: 14, color: TEXT, fontFace: "Arial" });

const techs = ["React + TanStack", "Node.js + Express", "MongoDB", "JWT Auth", "Tailwind CSS"];
techs.forEach((t, i) => {
  const x = 0.6 + i * 1.85;
  s1.addShape(pptx.ShapeType.roundRect, { x, y: 4.0, w: 1.7, h: 0.45, fill: { color: CARD } });
  s1.addText(t, { x, y: 4.0, w: 1.7, h: 0.45, fontSize: 11, color: "94A3B8", fontFace: "Arial", align: "center", valign: "middle" });
});
s1.addText("Presentation by CricketBook Team", { x: 0.6, y: 5.5, w: 8.8, h: 0.4, fontSize: 11, color: "64748B", fontFace: "Arial" });

// --- SLIDE 2: Objectives ---
const s2 = addSlide("Objectives", "What We Built And Why");
const objs = [
  { t: "Easy Booking", b: "Book a ground in under 2 minutes. No phone calls or spreadsheets." },
  { t: "Real-Time Slots", b: "See booked, free, and blocked slots instantly. No double bookings." },
  { t: "Admin Dashboard", b: "Manage grounds, bookings, users, and slot blocking from one place." },
  { t: "Payment Ready", b: "Card payment flow with order summary and confirmation page." },
  { t: "User Accounts", b: "Login, profile, booking history, and self-cancellation." },
];
objs.forEach((o, i) => {
  const col = i % 3;
  const row = Math.floor(i / 3);
  addCard(s2, 0.6 + col * 3.05, 1.6 + row * 2.0, 2.85, 1.7, o.t, o.b);
});

// --- SLIDE 3: Requirements ---
const s3 = addSlide("Requirements", "Technology Stack And System Needs");
addTable(s3,
  ["Layer", "Technology", "Purpose"],
  [
    ["Frontend", "React + TypeScript + TanStack Router", "Single-page app with file-based routing"],
    ["Styling", "Tailwind CSS + shadcn/ui", "Responsive dark/light theme"],
    ["Charts", "Recharts", "Admin dashboard graphs"],
    ["Backend", "Node.js + Express.js", "REST API on port 5000"],
    ["Database", "MongoDB + Mongoose", "4 collections for data storage"],
    ["Auth", "JWT + bcryptjs", "Token-based login with hashed passwords"],
    ["Maps", "OpenStreetMap embed", "Show ground locations"],
  ],
  1.6,
  [1.8, 3.5, 3.5]
);
addCard(s3, 0.6, 4.4, 4.2, 0.9, "Software", "Node.js v18+, npm, MongoDB, modern web browser");
addCard(s3, 5.2, 4.4, 4.2, 0.9, "Database", "MongoDB with Mongoose - 4 collections");

// --- SLIDE 4: Challenges ---
const s4 = addSlide("Challenges", "Problems Faced And Solutions");
addTable(s4,
  ["Challenge", "Solution"],
  [
    ["Double bookings", "Server-side availability check + BlockedSlot model"],
    ["Password security", "bcrypt hashing in Mongoose pre-save hook"],
    ["Auth on page refresh", "localStorage + React Context with SSR guards"],
    ["Route nesting", "Layout routes with Outlet component"],
    ["Admin buttons broken", "Added onClick handlers for Confirm, Cancel, Block"],
    ["Real-time slot grid", "Weekly calendar fetching data from API"],
    ["TypeScript in JS file", "Removed type annotation causing syntax error"],
  ],
  1.6,
  [3.0, 5.8]
);

// --- SLIDE 5: Future ---
const s5 = addSlide("Future Improvements", "Whats Next For CricketBook");
const futures = [
  { t: "Live Payment Gateway", b: "Integrate Stripe or PayHere" },
  { t: "Email and SMS Alerts", b: "Confirmations, reminders, and notices" },
  { t: "Mobile App", b: "React Native for iOS and Android" },
  { t: "Multi-Language", b: "Sinhala, Tamil, and English support" },
  { t: "Ratings and Reviews", b: "Users can rate grounds after playing" },
  { t: "Recurring Bookings", b: "Weekly/monthly slots for clubs" },
];
futures.forEach((f, i) => {
  const col = i % 3;
  const row = Math.floor(i / 3);
  const x = 0.6 + col * 3.05;
  const y = 1.6 + row * 1.8;
  s5.addShape(pptx.ShapeType.roundRect, { x, y, w: 2.85, h: 1.5, fill: { color: CARD }, line: { color: "334155", width: 0.5 } });
  s5.addShape(pptx.ShapeType.roundRect, { x: x + 0.1, y: y + 0.1, w: 0.65, h: 0.22, fill: { color: GREEN } });
  s5.addText("Coming Soon", { x: x + 0.1, y: y + 0.1, w: 0.65, h: 0.22, fontSize: 7, color: WHITE, fontFace: "Arial", bold: true, align: "center", valign: "middle" });
  s5.addText(f.t, { x: x + 0.12, y: y + 0.45, w: 2.6, h: 0.35, fontSize: 14, color: WHITE, fontFace: "Arial", bold: true });
  s5.addText(f.b, { x: x + 0.12, y: y + 0.8, w: 2.6, h: 0.6, fontSize: 11, color: TEXT, fontFace: "Arial" });
});

await pptx.writeFile({ fileName: "CricketBook_Slides.pptx" });
console.log("Done! Created CricketBook_Presentation.pptx");
