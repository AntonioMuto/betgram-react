import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import "./globals.css"
import { UserProvider } from "./context/UserContext"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body>
        <Navbar />
        <UserProvider>
          <main>{children}</main>
        </UserProvider>
        <Footer />
      </body>
    </html>
  )
}
