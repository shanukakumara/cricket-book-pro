import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useNavigate } from "@tanstack/react-router";
import * as React from "react";
import { useState, useEffect } from "react";
import { X, ArrowLeft, Plus, Search, Pencil, Trash2 } from "lucide-react";
import { g as groundsApi } from "./api-DLdzAhMZ.js";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cva } from "class-variance-authority";
import { c as cn } from "./utils-H80jjgLf.js";
import { S as Switch } from "./switch-CQ4rbtn8.js";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-switch";
const Sheet = DialogPrimitive.Root;
const SheetClose = DialogPrimitive.Close;
const SheetPortal = DialogPrimitive.Portal;
const SheetOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Overlay,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
SheetOverlay.displayName = DialogPrimitive.Overlay.displayName;
const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
);
const SheetContent = React.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ jsxs(SheetPortal, { children: [
  /* @__PURE__ */ jsx(SheetOverlay, {}),
  /* @__PURE__ */ jsxs(DialogPrimitive.Content, { ref, className: cn(sheetVariants({ side }), className), ...props, children: [
    /* @__PURE__ */ jsxs(DialogPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary", children: [
      /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
    ] }),
    children
  ] })
] }));
SheetContent.displayName = DialogPrimitive.Content.displayName;
const SheetHeader = ({ className, ...props }) => /* @__PURE__ */ jsx("div", { className: cn("flex flex-col space-y-2 text-center sm:text-left", className), ...props });
SheetHeader.displayName = "SheetHeader";
const SheetTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Title,
  {
    ref,
    className: cn("text-lg font-semibold text-foreground", className),
    ...props
  }
));
SheetTitle.displayName = DialogPrimitive.Title.displayName;
const SheetDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
SheetDescription.displayName = DialogPrimitive.Description.displayName;
function AdminGrounds() {
  const navigate = useNavigate();
  const [grounds, setGrounds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [editing, setEditing] = useState(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const fetchGrounds = () => {
    setLoading(true);
    groundsApi.getAll().then(setGrounds).finally(() => setLoading(false));
  };
  useEffect(() => {
    fetchGrounds();
  }, []);
  const handleDelete = async (id) => {
    if (!confirm("Delete this ground?")) return;
    try {
      await groundsApi.delete(id);
      fetchGrounds();
    } catch {
    }
  };
  const handleToggleActive = async (g) => {
    try {
      await groundsApi.update(g._id, {
        active: !g.active
      });
      fetchGrounds();
    } catch {
    }
  };
  const openEdit = (g) => {
    setEditing(g);
    setSheetOpen(true);
  };
  const openAdd = () => {
    setEditing(null);
    setSheetOpen(true);
  };
  const filtered = grounds.filter((g) => g.name.toLowerCase().includes(q.toLowerCase()));
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6 animate-fadeIn", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("button", { onClick: () => navigate("/admin/dashboard"), className: "mb-2 flex items-center gap-1.5 text-sm text-emerald-600 hover:text-emerald-700", children: [
          /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }),
          " Dashboard"
        ] }),
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-slate-800", children: "Manage Grounds" }),
        /* @__PURE__ */ jsxs("p", { className: "mt-1 text-sm text-slate-500", children: [
          grounds.length,
          " grounds total"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("button", { onClick: openAdd, className: "flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-emerald-700", children: [
        /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }),
        " Add New Ground"
      ] })
    ] }),
    loading ? /* @__PURE__ */ jsx("p", { className: "text-slate-500", children: "Loading grounds..." }) : /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-white p-4 shadow-md sm:p-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative mb-4 max-w-sm", children: [
        /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" }),
        /* @__PURE__ */ jsx("input", { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Search grounds...", className: "w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-3 text-sm focus:border-emerald-500 focus:outline-none" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsx("thead", { className: "text-left text-xs uppercase text-slate-500", children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { className: "py-3", children: "Ground" }),
          /* @__PURE__ */ jsx("th", { children: "Location" }),
          /* @__PURE__ */ jsx("th", { children: "Price/hr" }),
          /* @__PURE__ */ jsx("th", { children: "Slots" }),
          /* @__PURE__ */ jsx("th", { children: "Active" }),
          /* @__PURE__ */ jsx("th", { children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: filtered.map((g) => /* @__PURE__ */ jsxs("tr", { className: "border-t border-slate-100 hover:bg-slate-50", children: [
          /* @__PURE__ */ jsx("td", { className: "py-3", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("img", { src: g.image, alt: "", className: "h-10 w-10 rounded-lg object-cover" }),
            /* @__PURE__ */ jsx("span", { className: "font-medium text-slate-800", children: g.name })
          ] }) }),
          /* @__PURE__ */ jsx("td", { className: "text-slate-600", children: g.location }),
          /* @__PURE__ */ jsxs("td", { className: "font-semibold text-emerald-600", children: [
            "LKR ",
            g.price.toLocaleString()
          ] }),
          /* @__PURE__ */ jsx("td", { className: "text-slate-600", children: "8" }),
          /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(Switch, { checked: g.active, onCheckedChange: () => handleToggleActive(g) }) }),
          /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsxs("div", { className: "flex gap-1", children: [
            /* @__PURE__ */ jsx("button", { onClick: () => openEdit(g), className: "rounded-lg p-2 text-slate-600 hover:bg-slate-100", children: /* @__PURE__ */ jsx(Pencil, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsx("button", { onClick: () => handleDelete(g._id), className: "rounded-lg p-2 text-red-600 hover:bg-red-50", children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" }) })
          ] }) })
        ] }, g._id)) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(Sheet, { open: sheetOpen, onOpenChange: setSheetOpen, children: /* @__PURE__ */ jsx(SheetContent, { className: "w-full overflow-y-auto sm:max-w-md", children: /* @__PURE__ */ jsx(GroundFormSheet, { editing, onSaved: () => {
      fetchGrounds();
      setSheetOpen(false);
    } }) }) })
  ] });
}
function GroundFormSheet({
  editing,
  onSaved
}) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    if (editing) {
      setName(editing.name);
      setLocation(editing.location);
      setDescription(editing.description || "");
      setPrice(String(editing.price));
      setImage(editing.image || "");
    } else {
      setName("");
      setLocation("");
      setDescription("");
      setPrice("");
      setImage("");
    }
  }, [editing]);
  const handleSave = async () => {
    setSaving(true);
    try {
      if (editing) {
        await groundsApi.update(editing._id, {
          name,
          location,
          description,
          price: Number(price),
          image
        });
      } else {
        await groundsApi.create({
          name,
          location,
          description,
          price: Number(price),
          image,
          facilities: [],
          rating: 4,
          reviews: 0
        });
      }
      onSaved();
    } catch {
    }
    setSaving(false);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(SheetHeader, { children: /* @__PURE__ */ jsx(SheetTitle, { children: editing ? "Edit Ground" : "Add New Ground" }) }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "mb-1 block text-sm font-medium text-slate-700", children: "Ground Name" }),
        /* @__PURE__ */ jsx("input", { value: name, onChange: (e) => setName(e.target.value), placeholder: "e.g. Pallekele Cricket Arena", className: "w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "mb-1 block text-sm font-medium text-slate-700", children: "Location" }),
        /* @__PURE__ */ jsx("input", { value: location, onChange: (e) => setLocation(e.target.value), placeholder: "e.g. Kandy", className: "w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "mb-1 block text-sm font-medium text-slate-700", children: "Description" }),
        /* @__PURE__ */ jsx("textarea", { value: description, onChange: (e) => setDescription(e.target.value), rows: 3, className: "w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "mb-1 block text-sm font-medium text-slate-700", children: "Price per Hour (LKR)" }),
        /* @__PURE__ */ jsx("input", { value: price, onChange: (e) => setPrice(e.target.value), type: "number", placeholder: "1500", className: "w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "mb-1 block text-sm font-medium text-slate-700", children: "Image URL" }),
        /* @__PURE__ */ jsx("input", { value: image, onChange: (e) => setImage(e.target.value), placeholder: "https://...", className: "w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none" })
      ] }),
      /* @__PURE__ */ jsx(SheetClose, { asChild: true, children: /* @__PURE__ */ jsx("button", { onClick: handleSave, disabled: saving, className: "w-full rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50", children: saving ? "Saving..." : editing ? "Update Ground" : "Save Ground" }) })
    ] })
  ] });
}
export {
  AdminGrounds as component
};
