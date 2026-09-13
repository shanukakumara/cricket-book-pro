import { jsx, jsxs } from "react/jsx-runtime";
import { useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CircleDot, ArrowLeft, Mail, Lock, EyeOff, Eye } from "lucide-react";
import { a as authApi } from "./api-DLdzAhMZ.js";
import { u as useAuth } from "./router-DynjYsUx.js";
import "@tanstack/react-query";
import "sonner";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    login
  } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await authApi.login(email, password);
      login(res.token, res.user);
      navigate({
        to: res.user.role === "Admin" ? "/admin/dashboard" : "/"
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
      /* @__PURE__ */ jsx("h1", { className: "mt-4 text-2xl font-bold text-slate-800", children: "Welcome back" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500", children: "Log in to manage your bookings" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-white p-7 shadow-xl", children: [
      /* @__PURE__ */ jsxs("button", { onClick: () => navigate({
        to: "/"
      }), className: "mb-4 flex items-center gap-1.5 text-sm text-emerald-600 hover:text-emerald-700", children: [
        /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }),
        " Back"
      ] }),
      error && /* @__PURE__ */ jsx("p", { className: "mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-600", children: error }),
      /* @__PURE__ */ jsxs("form", { className: "space-y-4", onSubmit: handleSubmit, children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "mb-1 block text-sm font-medium text-slate-700", children: "Email" }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(Mail, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" }),
            /* @__PURE__ */ jsx("input", { value: email, onChange: (e) => setEmail(e.target.value), type: "email", placeholder: "you@cricket.lk", className: "w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-3 text-sm focus:border-emerald-500 focus:outline-none" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "mb-1 block text-sm font-medium text-slate-700", children: "Password" }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(Lock, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" }),
            /* @__PURE__ */ jsx("input", { value: password, onChange: (e) => setPassword(e.target.value), type: show ? "text" : "password", placeholder: "••••••••", className: "w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-10 text-sm focus:border-emerald-500 focus:outline-none" }),
            /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setShow(!show), className: "absolute right-3 top-1/2 -translate-y-1/2 text-slate-400", children: show ? /* @__PURE__ */ jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(Eye, { className: "h-4 w-4" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-sm", children: [
          /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 text-slate-600", children: [
            /* @__PURE__ */ jsx("input", { type: "checkbox", className: "rounded" }),
            " Remember me"
          ] }),
          /* @__PURE__ */ jsx("a", { href: "#", className: "font-medium text-emerald-600 hover:underline", children: "Forgot password?" })
        ] }),
        /* @__PURE__ */ jsx("button", { disabled: loading, className: "w-full rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white shadow hover:bg-emerald-700 active:scale-95 disabled:opacity-50", children: loading ? "Logging in..." : "Log in" })
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "mt-5 text-center text-sm text-slate-600", children: [
        "Don't have an account? ",
        /* @__PURE__ */ jsx(Link, { to: "/register", className: "font-semibold text-emerald-600 hover:underline", children: "Register" })
      ] })
    ] })
  ] }) });
}
export {
  Login as component
};
