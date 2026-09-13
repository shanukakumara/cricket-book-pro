import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft, CreditCard, Lock, CheckCircle2 } from "lucide-react";
import { bookingsApi } from "@/lib/api";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/payment")({
  head: () => ({ meta: [{ title: "Payment — CricketBook" }] }),
  component: PaymentPage,
});

function PaymentPage() {
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const raw = sessionStorage.getItem("pendingBooking");
    if (!raw) { navigate({ to: "/grounds" }); return; }
    setData(JSON.parse(raw));
  }, []);

  const formatCard = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 16);
    return d.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiry = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    if (d.length > 2) return `${d.slice(0, 2)}/${d.slice(2)}`;
    return d;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!cardNumber || !cardName || !expiry || !cvv) { setError("Please fill in all fields"); return; }
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 1500));
    try {
      for (const s of data.slots) {
        await bookingsApi.create({
          ground: data.groundName,
          groundId: data.groundId,
          date: data.date,
          slot: s,
          duration: "2 hrs",
          status: "Confirmed",
          total: data.price + 100,
        });
      }
      sessionStorage.removeItem("pendingBooking");
      setDone(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setProcessing(false);
    }
  };

  if (!data) return null;

  if (done) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="mx-auto flex max-w-lg flex-col items-center justify-center px-4 py-20 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
            <CheckCircle2 className="h-10 w-10 text-emerald-600" />
          </div>
          <h2 className="mt-4 text-2xl font-bold text-slate-800">Payment Successful!</h2>
          <p className="mt-1 text-sm text-slate-500">Your booking{data.slots.length > 1 ? "s have" : " has"} been confirmed.</p>
          <div className="mt-6 w-full rounded-2xl bg-white p-5 text-left shadow-md">
            <p className="text-sm font-semibold text-slate-800">{data.groundName}</p>
            <p className="mt-1 text-sm text-slate-600">{data.date} • {data.slots.join(", ")}</p>
            <p className="mt-1 text-sm font-semibold text-emerald-600">LKR {data.total.toLocaleString()}</p>
          </div>
          <button onClick={() => navigate({ to: "/bookings" })} className="mt-6 w-full rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700">
            View My Bookings
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm text-emerald-600 hover:text-emerald-700">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <h1 className="mt-4 text-3xl font-bold text-slate-800">Complete Payment</h1>
        <p className="mt-1 text-slate-500">Secure checkout for your booking.</p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="rounded-2xl bg-white p-6 shadow-md sm:p-8">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                <CreditCard className="h-5 w-5 text-emerald-600" />
              </div>
              <h2 className="text-lg font-bold text-slate-800">Card Payment</h2>
            </div>

            {error && <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-600">{error}</p>}

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Cardholder Name</label>
                <input value={cardName} onChange={(e) => setCardName(e.target.value)} placeholder="John Doe" className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:border-emerald-500 focus:outline-none" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Card Number</label>
                <div className="relative">
                  <input value={cardNumber} onChange={(e) => setCardNumber(formatCard(e.target.value))} placeholder="4242 4242 4242 4242" maxLength={19} className="w-full rounded-xl border border-slate-200 py-2.5 pl-3 pr-10 text-sm tracking-widest focus:border-emerald-500 focus:outline-none" />
                  <CreditCard className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Expiry Date</label>
                  <input value={expiry} onChange={(e) => setExpiry(formatExpiry(e.target.value))} placeholder="MM/YY" maxLength={5} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:border-emerald-500 focus:outline-none" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">CVV</label>
                  <input value={cvv} onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))} placeholder="123" maxLength={3} type="password" className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:border-emerald-500 focus:outline-none" />
                </div>
              </div>

              <button
                disabled={processing}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white shadow hover:bg-emerald-700 disabled:opacity-50"
              >
                <Lock className="h-4 w-4" /> {processing ? "Processing Payment..." : `Pay LKR ${data.total.toLocaleString()}`}
              </button>
              <p className="text-center text-xs text-slate-400">Your payment is secure and encrypted.</p>
            </form>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-md sm:p-8">
            <h3 className="text-lg font-bold text-slate-800">Order Summary</h3>
            <div className="mt-4 space-y-3 text-sm">
              <div>
                <p className="text-xs text-slate-500">Ground</p>
                <p className="font-medium text-slate-800">{data.groundName}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Date</p>
                <p className="font-medium text-slate-800">{data.date}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Slots ({data.slots.length})</p>
                <p className="font-medium text-slate-800">{data.slots.join(", ")}</p>
              </div>
              <div className="border-t border-slate-100 pt-3">
                <div className="flex justify-between"><span className="text-slate-600">Subtotal</span><span>LKR {(data.price * data.slots.length).toLocaleString()}</span></div>
                <div className="mt-1 flex justify-between"><span className="text-slate-600">Service fee</span><span>LKR 100</span></div>
                <div className="mt-2 flex justify-between border-t border-slate-200 pt-2 text-base font-bold text-slate-900">
                  <span>Total</span><span className="text-emerald-600">LKR {data.total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
