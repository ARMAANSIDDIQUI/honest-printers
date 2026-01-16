import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ReduxProvider } from "@/lib/redux/provider";
import { Toaster } from "sonner";
import ClientProtection from "@/components/ClientProtection";

export const metadata = {
  title: "Honest Printers | Digital, Screen & Offset Printing Services",
  description: "Honest Printers in Moradabad offers premium printing services: Flex Banners, Flyers, Posters, Visiting Cards, Envelopes, Calendars, Stickers, Bill Books, and Custom Graphic Design. Manufacturer of high-quality office stationery and marketing materials.",
  keywords: "Honest Printers, Moradabad printing, Flex printing, Vinyl printing, Visiting cards, Business cards, Flyers, Posters, Envelopes, Calendars, Bill books, Letterheads, Sticker printing, Offset printing, Screen printing, Digital printing, Custom graphic design, Wedding cards",
  icons: {
    icon: '/favicon.jpg',
  },
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ClientProtection />
        <ReduxProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster richColors closeButton position="top-center" />
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
