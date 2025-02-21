import Navbar from "../components/Navbar";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
