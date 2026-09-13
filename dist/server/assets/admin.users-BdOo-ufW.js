import { jsxs, jsx } from "react/jsx-runtime";
import { useNavigate } from "@tanstack/react-router";
import * as React from "react";
import { useState, useEffect } from "react";
import { X, ArrowLeft, Search, Ban, CheckCircle2 } from "lucide-react";
import { u as usersApi, b as bookingsApi } from "./api-DLdzAhMZ.js";
import { S as Select, c as SelectTrigger, d as SelectValue, a as SelectContent, b as SelectItem } from "./select-NX1S2Qd-.js";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { c as cn } from "./utils-H80jjgLf.js";
import "@radix-ui/react-select";
import "clsx";
import "tailwind-merge";
const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxs(
    DialogPrimitive.Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxs(DialogPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = DialogPrimitive.Content.displayName;
const DialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsx("div", { className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className), ...props });
DialogHeader.displayName = "DialogHeader";
const DialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Title,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;
const DialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;
function AdminUsers() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [role, setRole] = useState("All");
  const load = () => {
    setLoading(true);
    Promise.all([usersApi.getAll(), bookingsApi.getAll()]).then(([u, b]) => {
      setUsers(u);
      setBookings(b);
    }).catch(() => {
    }).finally(() => setLoading(false));
  };
  useEffect(() => {
    load();
  }, []);
  const userSpent = (userId) => bookings.filter((b) => String(b.userId) === String(userId) && b.status === "Confirmed").reduce((s, b) => s + b.total, 0);
  const handleToggleStatus = async (u) => {
    const next = u.status === "Active" ? "Suspended" : "Active";
    try {
      await usersApi.update(u._id, {
        status: next
      });
      load();
    } catch {
    }
  };
  const filtered = users.filter((u) => (role === "All" || u.role === role) && (u.name.toLowerCase().includes(q.toLowerCase()) || u.email.toLowerCase().includes(q.toLowerCase())));
  if (loading) return /* @__PURE__ */ jsx("p", { className: "text-slate-500", children: "Loading users..." });
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6 animate-fadeIn", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("button", { onClick: () => navigate("/admin/dashboard"), className: "mb-2 flex items-center gap-1.5 text-sm text-emerald-600 hover:text-emerald-700", children: [
        /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }),
        " Dashboard"
      ] }),
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-slate-800", children: "Manage Users" }),
      /* @__PURE__ */ jsxs("p", { className: "mt-1 text-sm text-slate-500", children: [
        users.length,
        " registered users"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-white p-4 shadow-md sm:p-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-5 flex flex-wrap gap-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative min-w-[200px] flex-1", children: [
          /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" }),
          /* @__PURE__ */ jsx("input", { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Search by name or email...", className: "w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-3 text-sm focus:border-emerald-500 focus:outline-none" })
        ] }),
        /* @__PURE__ */ jsxs(Select, { value: role, onValueChange: setRole, children: [
          /* @__PURE__ */ jsx(SelectTrigger, { className: "w-[150px]", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsx(SelectContent, { children: ["All", "User", "Admin"].map((r) => /* @__PURE__ */ jsx(SelectItem, { value: r, children: r }, r)) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsx("thead", { className: "text-left text-xs uppercase text-slate-500", children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { className: "py-3", children: "User" }),
          /* @__PURE__ */ jsx("th", { children: "Email" }),
          /* @__PURE__ */ jsx("th", { children: "Phone" }),
          /* @__PURE__ */ jsx("th", { children: "Joined" }),
          /* @__PURE__ */ jsx("th", { children: "Bookings" }),
          /* @__PURE__ */ jsx("th", { children: "Spent" }),
          /* @__PURE__ */ jsx("th", { children: "Status" }),
          /* @__PURE__ */ jsx("th", { children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: filtered.map((u) => /* @__PURE__ */ jsxs("tr", { className: "border-t border-slate-100 hover:bg-slate-50", children: [
          /* @__PURE__ */ jsx("td", { className: "py-3", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("img", { src: `https://api.dicebear.com/7.x/avataaars/svg?seed=${u.name}`, className: "h-10 w-10 rounded-full bg-slate-100", alt: u.name }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "font-medium text-slate-800", children: u.name }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500", children: u.role })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx("td", { className: "text-slate-600", children: u.email }),
          /* @__PURE__ */ jsx("td", { className: "text-slate-600", children: u.phone }),
          /* @__PURE__ */ jsx("td", { className: "text-slate-600", children: u.joined }),
          /* @__PURE__ */ jsx("td", { className: "text-slate-600", children: u.bookings }),
          /* @__PURE__ */ jsxs("td", { className: "font-semibold text-emerald-600", children: [
            "LKR ",
            userSpent(u._id).toLocaleString()
          ] }),
          /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("span", { className: cn("rounded-full px-2 py-0.5 text-[11px] font-semibold", u.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"), children: u.status }) }),
          /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsxs("div", { className: "flex gap-1", children: [
            /* @__PURE__ */ jsxs(Dialog, { children: [
              /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsx("button", { className: "rounded-lg border border-slate-200 px-2 py-1 text-xs hover:bg-slate-50", children: "View" }) }),
              /* @__PURE__ */ jsxs(DialogContent, { children: [
                /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { children: u.name }) }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-3 text-sm", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsx("img", { src: `https://api.dicebear.com/7.x/avataaars/svg?seed=${u.name}`, className: "h-16 w-16 rounded-full bg-slate-100", alt: "" }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("p", { className: "font-semibold text-slate-800", children: u.name }),
                      /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500", children: u.email }),
                      /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500", children: u.phone })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                    /* @__PURE__ */ jsx(Stat, { label: "Joined", value: u.joined }),
                    /* @__PURE__ */ jsx(Stat, { label: "Bookings", value: String(u.bookings) }),
                    /* @__PURE__ */ jsx(Stat, { label: "Total Spent", value: `LKR ${userSpent(u._id).toLocaleString()}` }),
                    /* @__PURE__ */ jsx(Stat, { label: "Status", value: u.status })
                  ] })
                ] })
              ] })
            ] }),
            u.role !== "Admin" && /* @__PURE__ */ jsx("button", { onClick: () => handleToggleStatus(u), className: cn("rounded-lg border p-1.5", u.status === "Active" ? "border-red-200 text-red-600 hover:bg-red-50" : "border-emerald-200 text-emerald-600 hover:bg-emerald-50"), title: u.status === "Active" ? "Suspend" : "Activate", children: u.status === "Active" ? /* @__PURE__ */ jsx(Ban, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsx(CheckCircle2, { className: "h-3.5 w-3.5" }) })
          ] }) })
        ] }, u._id)) })
      ] }) })
    ] })
  ] });
}
function Stat({
  label,
  value
}) {
  return /* @__PURE__ */ jsxs("div", { className: "rounded-xl bg-slate-50 p-3", children: [
    /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500", children: label }),
    /* @__PURE__ */ jsx("p", { className: "mt-0.5 font-semibold text-slate-800", children: value })
  ] });
}
export {
  AdminUsers as component
};
