"use client";
import { useUser } from "@/app/context/UserContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user && pathname !== "/auth") {
      router.push("/auth"); // Redirect to login/register page if not logged in
    }
  }, [user, loading, router, pathname]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!user && pathname !== "/auth") {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
