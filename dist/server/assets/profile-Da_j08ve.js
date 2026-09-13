import { jsxs, jsx } from "react/jsx-runtime";
import { useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { N as Navbar, F as Footer } from "./Footer-C1vCG-1z.js";
import { a as authApi } from "./api-DLdzAhMZ.js";
import { u as useAuth } from "./router-DynjYsUx.js";
import { ArrowLeft, User, Mail, Phone, Lock, Save } from "lucide-react";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "@tanstack/react-query";
import "sonner";
function Profile() {
  const {
    user,
    login,
    isAuthenticated
  } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate({
        to: "/login"
      });
      return;
    }
    if (user) {
      setName(user.name);
    }
  }, [user, isAuthenticated]);
  useEffect(() => {
    authApi.me().then((u) => {
      setName(u.name);
      setPhone(u.phone || "");
    }).catch(() => {
    });
  }, []);
  const handleSave = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setSaving(true);
    try {
      const updated = await fetch("http://localhost:5000/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          name,
          phone,
          ...newPassword ? {
            currentPassword,
            newPassword
          } : {}
        })
      }).then((r) => r.json());
      if (updated.message) {
        setError(updated.message);
        return;
      }
      login(localStorage.getItem("token"), updated);
      setMessage("Profile updated successfully");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };
  if (!user) return null;
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-2xl px-4 py-10 sm:px-6", children: [
      /* @__PURE__ */ jsxs("button", { onClick: () => navigate(-1), className: "flex items-center gap-1.5 text-sm text-emerald-600 hover:text-emerald-700", children: [
        /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }),
        " Back"
      ] }),
      /* @__PURE__ */ jsx("h1", { className: "mt-2 text-3xl font-bold text-slate-800", children: "My Profile" }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-slate-500", children: "Manage your account details and login credentials." }),
      /* @__PURE__ */ jsxs("div", { className: "mt-8 rounded-2xl bg-white p-6 shadow-md sm:p-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-6 flex items-center gap-4 border-b border-slate-100 pb-6", children: [
          /* @__PURE__ */ jsx("div", { className: "flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600", children: /* @__PURE__ */ jsx(User, { className: "h-8 w-8" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-lg font-bold text-slate-800", children: user.name }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500", children: user.email }),
            /* @__PURE__ */ jsx("span", { className: "mt-1 inline-block rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700", children: user.role })
          ] })
        ] }),
        message && /* @__PURE__ */ jsx("p", { className: "mb-4 rounded-xl bg-green-50 p-3 text-sm text-green-700", children: message }),
        error && /* @__PURE__ */ jsx("p", { className: "mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-600", children: error }),
        /* @__PURE__ */ jsxs("form", { onSubmit: handleSave, className: "space-y-5", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "mb-1 block text-sm font-medium text-slate-700", children: "Full Name" }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(User, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" }),
              /* @__PURE__ */ jsx("input", { value: name, onChange: (e) => setName(e.target.value), className: "w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-3 text-sm focus:border-emerald-500 focus:outline-none" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "mb-1 block text-sm font-medium text-slate-700", children: "Email" }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(Mail, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" }),
              /* @__PURE__ */ jsx("input", { value: user.email, disabled: true, className: "w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm text-slate-500" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "mb-1 block text-sm font-medium text-slate-700", children: "Phone" }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(Phone, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" }),
              /* @__PURE__ */ jsx("input", { value: phone, onChange: (e) => setPhone(e.target.value), placeholder: "+94 71 234 5678", className: "w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-3 text-sm focus:border-emerald-500 focus:outline-none" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "border-t border-slate-100 pt-5", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold text-slate-800", children: "Change Password" }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-slate-500", children: "Leave blank if you don't want to change it." }),
            /* @__PURE__ */ jsxs("div", { className: "mt-4 space-y-4", children: [
              newPassword && /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "mb-1 block text-sm font-medium text-slate-700", children: "Current Password" }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx(Lock, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" }),
                  /* @__PURE__ */ jsx("input", { value: currentPassword, onChange: (e) => setCurrentPassword(e.target.value), type: "password", placeholder: "••••••••", className: "w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-3 text-sm focus:border-emerald-500 focus:outline-none" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "mb-1 block text-sm font-medium text-slate-700", children: "New Password" }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx(Lock, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" }),
                  /* @__PURE__ */ jsx("input", { value: newPassword, onChange: (e) => setNewPassword(e.target.value), type: "password", placeholder: "Leave blank to keep current", className: "w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-3 text-sm focus:border-emerald-500 focus:outline-none" })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("button", { disabled: saving, className: "flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50", children: [
            /* @__PURE__ */ jsx(Save, { className: "h-4 w-4" }),
            " ",
            saving ? "Saving..." : "Save Changes"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
export {
  Profile as component
};
