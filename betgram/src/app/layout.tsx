import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import "./globals.css"
import { UserProvider } from "./context/UserContext"
import ReduxProvider from './components/ReduxProvider';
import ErrorAlerts from "./components/ErrorAlerts";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <head>
        <title>Betgram</title>
      </head>
      <link href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet" />
      <body>
        <ReduxProvider>
          <ErrorAlerts /> {/* Added ErrorAlerts to the layout */}
          <UserProvider>
          <Navbar />
            <main>{children}</main>
          </UserProvider>
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  )
}
