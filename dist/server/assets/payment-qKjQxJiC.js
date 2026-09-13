import { jsxs, jsx } from "react/jsx-runtime";
import { useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { N as Navbar, F as Footer } from "./Footer-C1vCG-1z.js";
import { CheckCircle2, ArrowLeft, CreditCard, Lock } from "lucide-react";
import { b as bookingsApi } from "./api-DLdzAhMZ.js";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "./router-DynjYsUx.js";
import "@tanstack/react-query";
import "sonner";
function PaymentPage() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const raw = sessionStorage.getItem("pendingBooking");
    if (!raw) {
      navigate({
        to: "/grounds"
      });
      return;
    }
    setData(JSON.parse(raw));
  }, []);
  const formatCard = (v) => {
    const d = v.replace(/\D/g, "").slice(0, 16);
    return d.replace(/(.{4})/g, "$1 ").trim();
  };
  const formatExpiry = (v) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    if (d.length > 2) return `${d.slice(0, 2)}/${d.slice(2)}`;
    return d;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!cardNumber || !cardName || !expiry || !cvv) {
      setError("Please fill in all fields");
      return;
    }
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
          total: data.price + 100
        });
      }
      sessionStorage.removeItem("pendingBooking");
      setDone(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setProcessing(false);
    }
  };
  if (!data) return null;
  if (done) {
    return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50", children: [
      /* @__PURE__ */ jsx(Navbar, {}),
      /* @__PURE__ */ jsxs("div", { className: "mx-auto flex max-w-lg flex-col items-center justify-center px-4 py-20 text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100", children: /* @__PURE__ */ jsx(CheckCircle2, { className: "h-10 w-10 text-emerald-600" }) }),
        /* @__PURE__ */ jsx("h2", { className: "mt-4 text-2xl font-bold text-slate-800", children: "Payment Successful!" }),
        /* @__PURE__ */ jsxs("p", { className: "mt-1 text-sm text-slate-500", children: [
          "Your booking",
          data.slots.length > 1 ? "s have" : " has",
          " been confirmed."
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 w-full rounded-2xl bg-white p-5 text-left shadow-md", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-slate-800", children: data.groundName }),
          /* @__PURE__ */ jsxs("p", { className: "mt-1 text-sm text-slate-600", children: [
            data.date,
            " • ",
            data.slots.join(", ")
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "mt-1 text-sm font-semibold text-emerald-600", children: [
            "LKR ",
            data.total.toLocaleString()
          ] })
        ] }),
        /* @__PURE__ */ jsx("button", { onClick: () => navigate({
          to: "/bookings"
        }), className: "mt-6 w-full rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700", children: "View My Bookings" })
      ] }),
      /* @__PURE__ */ jsx(Footer, {})
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-4xl px-4 py-10 sm:px-6", children: [
      /* @__PURE__ */ jsxs("button", { onClick: () => navigate(-1), className: "flex items-center gap-1.5 text-sm text-emerald-600 hover:text-emerald-700", children: [
        /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }),
        " Back"
      ] }),
      /* @__PURE__ */ jsx("h1", { className: "mt-4 text-3xl font-bold text-slate-800", children: "Complete Payment" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-slate-500", children: "Secure checkout for your booking." }),
      /* @__PURE__ */ jsxs("div", { className: "mt-8 grid gap-8 lg:grid-cols-[1fr_380px]", children: [
        /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-white p-6 shadow-md sm:p-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 border-b border-slate-100 pb-4", children: [
            /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100", children: /* @__PURE__ */ jsx(CreditCard, { className: "h-5 w-5 text-emerald-600" }) }),
            /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold text-slate-800", children: "Card Payment" })
          ] }),
          error && /* @__PURE__ */ jsx("p", { className: "mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-600", children: error }),
          /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "mt-5 space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "mb-1 block text-sm font-medium text-slate-700", children: "Cardholder Name" }),
              /* @__PURE__ */ jsx("input", { value: cardName, onChange: (e) => setCardName(e.target.value), placeholder: "John Doe", className: "w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:border-emerald-500 focus:outline-none" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "mb-1 block text-sm font-medium text-slate-700", children: "Card Number" }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx("input", { value: cardNumber, onChange: (e) => setCardNumber(formatCard(e.target.value)), placeholder: "4242 4242 4242 4242", maxLength: 19, className: "w-full rounded-xl border border-slate-200 py-2.5 pl-3 pr-10 text-sm tracking-widest focus:border-emerald-500 focus:outline-none" }),
                /* @__PURE__ */ jsx(CreditCard, { className: "absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "mb-1 block text-sm font-medium text-slate-700", children: "Expiry Date" }),
                /* @__PURE__ */ jsx("input", { value: expiry, onChange: (e) => setExpiry(formatExpiry(e.target.value)), placeholder: "MM/YY", maxLength: 5, className: "w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:border-emerald-500 focus:outline-none" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "mb-1 block text-sm font-medium text-slate-700", children: "CVV" }),
                /* @__PURE__ */ jsx("input", { value: cvv, onChange: (e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3)), placeholder: "123", maxLength: 3, type: "password", className: "w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:border-emerald-500 focus:outline-none" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("button", { disabled: processing, className: "flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white shadow hover:bg-emerald-700 disabled:opacity-50", children: [
              /* @__PURE__ */ jsx(Lock, { className: "h-4 w-4" }),
              " ",
              processing ? "Processing Payment..." : `Pay LKR ${data.total.toLocaleString()}`
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-center text-xs text-slate-400", children: "Your payment is secure and encrypted." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-white p-6 shadow-md sm:p-8", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-slate-800", children: "Order Summary" }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 space-y-3 text-sm", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500", children: "Ground" }),
              /* @__PURE__ */ jsx("p", { className: "font-medium text-slate-800", children: data.groundName })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500", children: "Date" }),
              /* @__PURE__ */ jsx("p", { className: "font-medium text-slate-800", children: data.date })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("p", { className: "text-xs text-slate-500", children: [
                "Slots (",
                data.slots.length,
                ")"
              ] }),
              /* @__PURE__ */ jsx("p", { className: "font-medium text-slate-800", children: data.slots.join(", ") })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "border-t border-slate-100 pt-3", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsx("span", { className: "text-slate-600", children: "Subtotal" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  "LKR ",
                  (data.price * data.slots.length).toLocaleString()
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mt-1 flex justify-between", children: [
                /* @__PURE__ */ jsx("span", { className: "text-slate-600", children: "Service fee" }),
                /* @__PURE__ */ jsx("span", { children: "LKR 100" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mt-2 flex justify-between border-t border-slate-200 pt-2 text-base font-bold text-slate-900", children: [
                /* @__PURE__ */ jsx("span", { children: "Total" }),
                /* @__PURE__ */ jsxs("span", { className: "text-emerald-600", children: [
                  "LKR ",
                  data.total.toLocaleString()
                ] })
              ] })
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
export {
  PaymentPage as component
};
