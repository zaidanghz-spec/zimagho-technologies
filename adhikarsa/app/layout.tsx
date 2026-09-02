import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { MotionProvider } from "@/components/layout/MotionProvider";
import { Navbar } from "@/components/layout/Navbar";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { GradientDefs } from "@/components/visualizations/GradientDefs";
import { company } from "@/data/company";
import "./globals.css";

const TITLE = "Adhikarsa Mahatama Teknologi | Healthcare Technology & Automation";
const DESCRIPTION =
  "PT Adhikarsa Mahatama Teknologi develops healthcare technology, hospital automation, artificial intelligence, system integration, and custom digital solutions for modern institutions.";

export const metadata: Metadata = {
  metadataBase: new URL(company.site.url),
  title: {
    default: TITLE,
    template: `%s | ${company.shortName}`,
  },
  description: DESCRIPTION,
  applicationName: company.shortName,
  keywords: [
    "healthcare technology",
    "hospital automation",
    "artificial intelligence",
    "enterprise software development",
    "systems integration",
    "workflow automation",
    "technology company Indonesia",
    "digital transformation healthcare",
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
  themeColor: "#ffffff",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`no-js ${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className="antialiased">
        {/* Runs before first paint. If it never runs, `.no-js` stays and the
            stylesheet reveals every `data-reveal` element unconditionally. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.remove('no-js')`,
          }}
        />
        <MotionProvider>
          <GradientDefs />
          <ScrollProgress />
          <Navbar />
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
