import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const Route = createFileRoute("/grounds")({
  head: () => ({ meta: [{ title: "Browse Grounds — CricketBook" }] }),
  component: GroundsLayout,
});

function GroundsLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
