import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { AmbientBackground } from "@/components/layout/AmbientBackground";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { MotionProvider } from "@/components/layout/MotionProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Preloader } from "@/components/layout/Preloader";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { GradientDefs } from "@/components/visualizations/GradientDefs";
import { company } from "@/data/company";
import "./globals.css";

const TITLE = "Adhikarsa Mahatama Teknologi | Intelligent Hospital Technology";
const DESCRIPTION =
  "PT Adhikarsa Mahatama Teknologi develops hospital automation, AI systems, enterprise integrations, and intelligent technology infrastructure for modern healthcare institutions.";

export const metadata: Metadata = {
  metadataBase: new URL(company.site.url),
  title: {
    default: TITLE,
    template: `%s | ${company.shortName}`,
  },
  description: DESCRIPTION,
  applicationName: company.shortName,
  keywords: [
    "hospital automation",
    "healthcare technology Indonesia",
    "hospital information system integration",
    "AI in healthcare operations",
    "enterprise software",
    "workflow automation",
    "systems integration",
    "healthcare data infrastructure",
  ],
  authors: [{ name: company.legalName }],
  creator: company.legalName,
  publisher: company.legalName,
  category: "technology",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: company.legalName,
    locale: company.site.locale,
    url: "/",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  themeColor: "#05070a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="antialiased">
        <MotionProvider>
          <GradientDefs />
          <AmbientBackground />
          <Preloader />
          <ScrollProgress />
          <CustomCursor />
          <Navbar />
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
