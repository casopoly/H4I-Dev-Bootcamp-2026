import type { Metadata } from "next";
// Self-hosted fonts (bundled with the project, no download from Google at dev time)
import "@fontsource-variable/inter";
import "@fontsource-variable/playfair-display";
import "./globals.css";

export const metadata: Metadata = {
  title: "SLO Drip",
  description: "SLO Drip: a coffee house with two locations in San Luis Obispo, California",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
