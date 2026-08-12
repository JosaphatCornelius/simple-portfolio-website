import { Anton, Geist, Geist_Mono } from "next/font/google";
import { PageFlight } from "./_components/page-flight";
import { SoundToggle } from "./_components/sound";
import { SITE_URL } from "./_lib/site";
import { PaletteToggle } from "./_components/palette-toggle";
import "./globals.css";

// Applies the stored palette before first paint so a hard refresh never
// flashes the default blue theme.
const paletteInitScript = `try {
  var palette = localStorage.getItem("palette");
  if (palette === "p4" || palette === "p5")
    document.documentElement.dataset.theme = palette;
} catch (error) {}`;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const anton = Anton({
  weight: "400",
  variable: "--font-anton",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Josaphat Cornelius — Full Stack Developer",
  description:
    "Portfolio of Josaphat Cornelius, a full-stack developer in Jakarta building seamless, user-friendly web, Android, and game experiences.",
  openGraph: {
    siteName: "Josaphat Cornelius — Portfolio",
    type: "website",
    locale: "en_US",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${anton.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col">
        <script dangerouslySetInnerHTML={{ __html: paletteInitScript }} />
        <PageFlight>{children}</PageFlight>
        <SoundToggle />
        <PaletteToggle />
      </body>
    </html>
  );
}
