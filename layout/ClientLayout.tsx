"use client";
import { usePathname, useRouter } from "next/navigation";
import { Provider } from "react-redux";
import { store } from "@/Redux/app/store";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { getItemLocalStorage } from "@/Utils/browserServices";
import AdminHeader from "@/Container/AdminPages/AdminHeader";

function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const token = getItemLocalStorage("admin_token");
  const router = useRouter();

  useEffect(() => {
    const isAdminRoute = pathname.includes("/admin");
    const isLoginRoute = pathname.includes("/admin/login");

    if (isAdminRoute) {
      // If there's no token, redirect to login
      if (!token) {
        if (!isLoginRoute) router.push("/admin/login");
      } else {
        // If there's a token and the user is on login page, redirect to dashboard
        if (isLoginRoute) router.push("/admin/dashboard");
      }
    }
  }, [pathname, token, router]);

  // If no token and not on login, return null to avoid flashing unauthorized content
  if (
    !token &&
    pathname.includes("/admin") &&
    !pathname.includes("/admin/login")
  ) {
    return null;
  }

  return (
    <>
      {pathname.includes("/admin") ? (
        <Provider store={store}>
          {pathname.includes("/admin/login") ? (
            <>{children}</> // Show login page content
          ) : (
            <div className="relative flex">
              {/* Top Navigation */}
              <AdminHeader />

              {/* Main Content */}
              <div
                className="flex-grow mt-16 p-6 bg-gray-100 lg:ml-64"
                style={{
                  margin: "64px 0 0 256px",
                  minHeight: "calc(100vh - 64px)",
                }}
              >
                {children}
              </div>
            </div>
          )}
        </Provider>
      ) : null}
      <Toaster />
    </>
  );
}

export default ClientLayout;
