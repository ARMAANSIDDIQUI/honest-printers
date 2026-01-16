import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ReduxProvider } from "@/lib/redux/provider";

export const metadata = {
  title: "Honest Graphics & Printers | Premium Design Templates",
  description: "Professional graphic design templates for creative professionals. Download premium business cards, brochures, flyers, and social media templates in Photoshop, Illustrator, CorelDRAW, and InDesign formats.",
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
