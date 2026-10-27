import dynamic from 'next/dynamic';
import { Anton, Geist, Geist_Mono } from "next/font/google";
import { SITE_URL } from "./_lib/site";
import { PaletteToggle } from "./_components/palette-toggle";
import "./globals.css";

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

const PageFlight = dynamic(() => import('./_components/page-flight').then(mod => mod.PageFlight));
const SoundToggle = dynamic(() => import('./_components/sound').then(mod => mod.SoundToggle));

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Josaphat Cornelius — Full Stack Software Engineer", 
  description:
    "Portfolio of Josaphat Cornelius, a full-stack developer in Jakarta building seamless web, Android, and game experiences.",
  openGraph: {
    siteName: "Josaphat Cornelius — Portfolio",
    type: "website",
    locale: "en_US",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Josaphat Cornelius",
    jobTitle: "Full Stack Developer",
    url: SITE_URL,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Jakarta",
      addressCountry: "ID",
    },
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${anton.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <script dangerouslySetInnerHTML={{ __html: paletteInitScript }} />
        <PageFlight>{children}</PageFlight>
        <SoundToggle />
        <PaletteToggle />
      </body>
    </html>
  );
}
