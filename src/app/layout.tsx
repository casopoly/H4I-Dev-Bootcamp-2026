import type { Metadata } from "next";
// Self-hosted fonts (bundled with the project, no download from Google at dev time)
import "@fontsource-variable/inter";
import "@fontsource-variable/playfair-display";
import "./globals.css";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "SLO Drip",
  description: "SLO Drip: a coffee house with two locations in San Luis Obispo, California",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* The page fills the screen (flex-1) so the footer sits at the bottom even on short pages */}
      <body className="flex min-h-screen flex-col">
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
