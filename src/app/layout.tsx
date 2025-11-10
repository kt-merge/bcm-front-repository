import Navigation from "@/components/common/navigation";
import "./globals.css";
import type { Metadata } from "next";
import { AuthProvider } from "@/hooks/useAuth";

export const metadata: Metadata = {
  title: "Blind Chicken Market",
  description: "Anonymous auction platform for second-hand goods",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        <AuthProvider>{children}</AuthProvider>
        <footer>
          <div>© 2025 Darius Team</div>
        </footer>
      </body>
    </html>
  );
}
