"use client";
import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";
import { UserProvider } from "./context/UserContext";
import ReduxProvider from "./components/ReduxProvider";
import ErrorAlerts from "./components/ErrorAlerts";
import ProtectedRoute from "@/app/auth/ProtectedRoute";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isAuthPage = pathname === "/auth";

  return (
    <html lang="it">
      <head>
        <title>Betgram</title>
      </head>
      <link
        href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap"
        rel="stylesheet"
      />
      <body className="bg-custom-dark text-white">
        <UserProvider>
          <ReduxProvider>
            <ErrorAlerts />
            <ProtectedRoute>
              {!isAuthPage && <Navbar />}
              <main>{children}</main>
              {!isAuthPage && (
                <Footer />
              )}
            </ProtectedRoute>
          </ReduxProvider>
        </UserProvider>
      </body>
    </html>
  );
}
