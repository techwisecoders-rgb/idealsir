import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chakra Universe | HAI SuperHero",
  description: "Education, startup services, technology and collaboration — one universal portal.",
  applicationName: "HAI SuperHero",
  manifest: "/manifest.webmanifest"
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050508"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><head><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" /></head><body>{children}</body></html>;
}
