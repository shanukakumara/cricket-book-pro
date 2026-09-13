import { jsxs, jsx } from "react/jsx-runtime";
import { useNavigate } from "@tanstack/react-router";
import { N as Navbar, F as Footer } from "./Footer-C1vCG-1z.js";
import { Send, Mail, Phone, MapPin, Clock } from "lucide-react";
import { useState } from "react";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "./router-DynjYsUx.js";
import "@tanstack/react-query";
import "sonner";
function ContactPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-white", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx("section", { className: "relative overflow-hidden bg-gradient-to-br from-emerald-600 to-teal-700 px-4 py-20 text-white", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-3xl text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold sm:text-5xl", children: "Contact Us" }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-lg text-emerald-100", children: "Have a question, suggestion, or issue? We'd love to hear from you." })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "mx-auto grid max-w-5xl gap-10 px-4 py-16 lg:grid-cols-[1fr_380px]", children: [
      /* @__PURE__ */ jsx("div", { children: sent ? /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-emerald-50 p-8 text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100", children: /* @__PURE__ */ jsx(Send, { className: "h-6 w-6 text-emerald-600" }) }),
        /* @__PURE__ */ jsx("h3", { className: "mt-4 text-xl font-bold text-slate-800", children: "Message Sent!" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-slate-600", children: "Thank you for reaching out. We'll get back to you within 24 hours." }),
        /* @__PURE__ */ jsx("button", { onClick: () => navigate({
          to: "/"
        }), className: "mt-6 rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700", children: "Back to Home" })
      ] }) : /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "mb-1 block text-sm font-medium text-slate-700", children: "Your Name" }),
          /* @__PURE__ */ jsx("input", { value: name, onChange: (e) => setName(e.target.value), required: true, placeholder: "John Doe", className: "w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-emerald-500 focus:outline-none" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "mb-1 block text-sm font-medium text-slate-700", children: "Email Address" }),
          /* @__PURE__ */ jsx("input", { value: email, onChange: (e) => setEmail(e.target.value), required: true, type: "email", placeholder: "john@example.com", className: "w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-emerald-500 focus:outline-none" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "mb-1 block text-sm font-medium text-slate-700", children: "Message" }),
          /* @__PURE__ */ jsx("textarea", { value: message, onChange: (e) => setMessage(e.target.value), required: true, rows: 5, placeholder: "Tell us how we can help...", className: "w-full resize-none rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-emerald-500 focus:outline-none" })
        ] }),
        /* @__PURE__ */ jsxs("button", { className: "flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-emerald-700", children: [
          /* @__PURE__ */ jsx(Send, { className: "h-4 w-4" }),
          " Send Message"
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-slate-50 p-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold text-slate-800", children: "Get in Touch" }),
          /* @__PURE__ */ jsxs("ul", { className: "mt-4 space-y-4 text-sm text-slate-600", children: [
            /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsx(Mail, { className: "mt-0.5 h-4 w-4 text-emerald-600" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "font-medium text-slate-800", children: "Email" }),
                /* @__PURE__ */ jsx("p", { children: "hello@cricket.lk" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsx(Phone, { className: "mt-0.5 h-4 w-4 text-emerald-600" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "font-medium text-slate-800", children: "Phone" }),
                /* @__PURE__ */ jsx("p", { children: "+94 11 234 5678" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsx(MapPin, { className: "mt-0.5 h-4 w-4 text-emerald-600" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "font-medium text-slate-800", children: "Address" }),
                /* @__PURE__ */ jsx("p", { children: "42 Galle Road, Colombo 03, Sri Lanka" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsx(Clock, { className: "mt-0.5 h-4 w-4 text-emerald-600" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "font-medium text-slate-800", children: "Hours" }),
                /* @__PURE__ */ jsx("p", { children: "Mon – Sat, 9 AM – 6 PM" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-slate-50 p-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold text-slate-800", children: "Follow Us" }),
          /* @__PURE__ */ jsxs("div", { className: "mt-3 flex gap-3", children: [
            /* @__PURE__ */ jsx("a", { href: "#", className: "rounded-full bg-slate-200 p-2 hover:bg-emerald-200", children: /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-slate-600", children: "FB" }) }),
            /* @__PURE__ */ jsx("a", { href: "#", className: "rounded-full bg-slate-200 p-2 hover:bg-emerald-200", children: /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-slate-600", children: "IG" }) }),
            /* @__PURE__ */ jsx("a", { href: "#", className: "rounded-full bg-slate-200 p-2 hover:bg-emerald-200", children: /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-slate-600", children: "TW" }) })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
export {
  ContactPage as component
};
