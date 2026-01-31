import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ReduxProvider } from "@/lib/redux/provider";
import { Toaster } from "sonner";
import ClientProtection from "@/components/ClientProtection";
import { StarryBackground } from "@/components/StarryBackground";
import MeteorBackground from "@/components/MeteorBackground";
import StructData from "@/components/StructData";

export const viewport = {
  themeColor: "#4f46e5",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // Often used in PWAs to feel native
};

export const metadata = {
  metadataBase: new URL('https://honestprinters.in'),
  title: {
    default: "Honest Graphics & Printers | Premium Printing Services in Moradabad",
    template: "%s | Honest Graphics & Printers"
  },
  description: "Honest Graphics & Printers offers premium printing services in Moradabad: Flex Banners, Visiting Cards, Flyers, Bill Books, and Custom Graphic Design.",
  keywords: ["Honest Graphics & Printers", "Moradabad printing", "Flex printing", "Business cards", "Flyers", "Posters", "Bill books", "Offset printing", "Digital printing", "Graphic design"],
  authors: [{ name: "Honest Graphics & Printers" }],
  creator: "Honest Graphics & Printers",
  publisher: "Honest Graphics & Printers",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Honest Graphics & Printers | Premium Printing Services",
    description: "Your go-to destination for high-quality printing and graphic design in Moradabad.",
    url: 'https://honestprinters.in',
    siteName: 'Honest Graphics & Printers',
    images: [
      {
        url: '/og-image.jpg', // Ensure this file exists or add a placeholder task
        width: 1200,
        height: 630,
        alt: 'Honest Graphics & Printers',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Honest Graphics & Printers",
    description: "Premium printing and graphic design services in Moradabad.",
    images: ['/og-image.jpg'], // Same image as OG
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/fav.png',
    shortcut: '/fav.png',
    apple: '/fav.png',
  },
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ClientProtection />
        <StructData />
        <ReduxProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <div className="hidden dark:block">
              <StarryBackground />
            </div>
            <div className="block dark:hidden">
              <MeteorBackground />
            </div>
            {children}
            <Toaster richColors closeButton position="top-center" />
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
