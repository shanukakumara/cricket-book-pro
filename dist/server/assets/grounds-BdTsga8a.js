import { jsxs, jsx } from "react/jsx-runtime";
import { Outlet } from "@tanstack/react-router";
import { N as Navbar, F as Footer } from "./Footer-C1vCG-1z.js";
import "lucide-react";
import "react";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "./router-DynjYsUx.js";
import "@tanstack/react-query";
import "sonner";
function GroundsLayout() {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx(Outlet, {}),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
export {
  GroundsLayout as component
};
