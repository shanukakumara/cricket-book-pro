import { jsx, jsxs } from "react/jsx-runtime";
import { useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CircleDot, ArrowLeft, User, Mail, Phone, Lock } from "lucide-react";
import { c as cn } from "./utils-H80jjgLf.js";
import { a as authApi } from "./api-DLdzAhMZ.js";
import { u as useAuth } from "./router-DynjYsUx.js";
import "clsx";
import "tailwind-merge";
import "@tanstack/react-query";
import "sonner";
function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pw, setPw] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    login
  } = useAuth();
  const navigate = useNavigate();
  const strength = pw.length === 0 ? 0 : pw.length < 6 ? 1 : pw.length < 10 ? 2 : 3;
  const labels = ["", "Weak", "Medium", "Strong"];
  const colors = ["bg-slate-200", "bg-red-400", "bg-amber-400", "bg-emerald-500"];
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (pw !== confirm) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const res = await authApi.register({
        name,
        email,
        password: pw,
        phone
      });
      login(res.token, res.user);
      navigate({
        to: "/"
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 via-gray-50 to-amber-50 px-4 py-10", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-md", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-6 flex flex-col items-center", children: [
      /* @__PURE__ */ jsx("div", { className: "flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-xl", children: /* @__PURE__ */ jsx(CircleDot, { className: "h-7 w-7" }) }),
      /* @__PURE__ */ jsx("h1", { className: "mt-4 text-2xl font-bold text-slate-800", children: "Create your account" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500", children: "Start booking cricket grounds in minutes" })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4 rounded-2xl bg-white p-7 shadow-xl", children: [
      /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => navigate({
        to: "/"
      }), className: "flex items-center gap-1.5 text-sm text-emerald-600 hover:text-emerald-700", children: [
        /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }),
        " Back"
      ] }),
      error && /* @__PURE__ */ jsx("p", { className: "rounded-xl bg-red-50 p-3 text-sm text-red-600", children: error }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "mb-1 block text-sm font-medium text-slate-700", children: "Full Name" }),
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx(User, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" }),
          /* @__PURE__ */ jsx("input", { value: name, onChange: (e) => setName(e.target.value), type: "text", placeholder: "Kamal Perera", className: "w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-3 text-sm focus:border-emerald-500 focus:outline-none" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "mb-1 block text-sm font-medium text-slate-700", children: "Email" }),
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx(Mail, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" }),
          /* @__PURE__ */ jsx("input", { value: email, onChange: (e) => setEmail(e.target.value), type: "email", placeholder: "you@cricket.lk", className: "w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-3 text-sm focus:border-emerald-500 focus:outline-none" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "mb-1 block text-sm font-medium text-slate-700", children: "Phone" }),
        /* @__PURE__ */ jsxs("div", { className: "flex", children: [
          /* @__PURE__ */ jsx("span", { className: "inline-flex items-center rounded-l-xl border border-r-0 border-slate-200 bg-slate-50 px-3 text-sm text-slate-600", children: "+94" }),
          /* @__PURE__ */ jsxs("div", { className: "relative flex-1", children: [
            /* @__PURE__ */ jsx(Phone, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" }),
            /* @__PURE__ */ jsx("input", { value: phone, onChange: (e) => setPhone(e.target.value), type: "tel", placeholder: "71 234 5678", className: "w-full rounded-r-xl border border-slate-200 py-2.5 pl-9 pr-3 text-sm focus:border-emerald-500 focus:outline-none" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "mb-1 block text-sm font-medium text-slate-700", children: "Password" }),
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx(Lock, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" }),
          /* @__PURE__ */ jsx("input", { value: pw, onChange: (e) => setPw(e.target.value), type: "password", placeholder: "••••••••", className: "w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-3 text-sm focus:border-emerald-500 focus:outline-none" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-2 flex gap-1", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsx("div", { className: cn("h-1.5 flex-1 rounded-full", i <= strength ? colors[strength] : "bg-slate-200") }, i)) }),
        strength > 0 && /* @__PURE__ */ jsxs("p", { className: "mt-1 text-xs text-slate-500", children: [
          labels[strength],
          " password"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "mb-1 block text-sm font-medium text-slate-700", children: "Confirm Password" }),
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx(Lock, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" }),
          /* @__PURE__ */ jsx("input", { value: confirm, onChange: (e) => setConfirm(e.target.value), type: "password", placeholder: "••••••••", className: "w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-3 text-sm focus:border-emerald-500 focus:outline-none" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("label", { className: "flex items-start gap-2 text-xs text-slate-600", children: [
        /* @__PURE__ */ jsx("input", { type: "checkbox", className: "mt-0.5 rounded" }),
        " I agree to the ",
        /* @__PURE__ */ jsx("a", { href: "#", className: "text-emerald-600 hover:underline", children: "Terms & Conditions" })
      ] }),
      /* @__PURE__ */ jsx("button", { disabled: loading, className: "w-full rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white shadow hover:bg-emerald-700 active:scale-95 disabled:opacity-50", children: loading ? "Creating..." : "Create Account" }),
      /* @__PURE__ */ jsxs("p", { className: "text-center text-sm text-slate-600", children: [
        "Already have an account? ",
        /* @__PURE__ */ jsx(Link, { to: "/login", className: "font-semibold text-emerald-600 hover:underline", children: "Log in" })
      ] })
    ] })
  ] }) });
}
export {
  Register as component
};
