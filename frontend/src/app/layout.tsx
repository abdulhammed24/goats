import type { Metadata } from "next";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Book Wedding Photographers in Lagos, Nigeria - JoyRibbons",
    // default: "Vendors | JoyRibbons",
    template: "%s | JoyRibbons",
  },
  description: "Vendors List",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
