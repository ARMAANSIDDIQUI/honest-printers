import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ReduxProvider } from "@/lib/redux/provider";

export const metadata = {
  title: "Honest Printers | Digital, Screen & Offset Printing Services",
  description: "Honest Printers - Leading service provider of digital printing, screen printing, and offset printing in Moradabad, Uttar Pradesh. Manufacturer of office stationery, visiting cards, stickers, and more. GST: 09AGKPA5713C1ZT.",
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
        <ReduxProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
