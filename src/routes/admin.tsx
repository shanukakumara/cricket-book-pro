import { createFileRoute, Outlet, redirect, useRouter } from "@tanstack/react-router";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { useAuth } from "@/lib/auth";
import { useEffect } from "react";

export const Route = createFileRoute("/admin")({
  beforeLoad: ({ location }) => {
    if (location.pathname === "/admin") throw redirect({ to: "/admin/dashboard" });
  },
  component: AdminLayout,
});

function AdminGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && !isAuthenticated) {
      router.navigate({ to: "/login" });
    } else if (typeof window !== "undefined" && !isAdmin) {
      router.navigate({ to: "/" });
    }
  }, [isAuthenticated, isAdmin]);

  if (!isAuthenticated || !isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-slate-500">Redirecting...</p>
      </div>
    );
  }

  return <>{children}</>;
}

function AdminLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminGuard>
        <AdminSidebar />
        <main className="md:ml-64">
          <div className="px-4 py-8 sm:px-6 lg:px-10">
            <Outlet />
          </div>
        </main>
      </AdminGuard>
    </div>
  );
}
