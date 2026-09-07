import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { ThemeScript } from "@/components/layout/ThemeScript";
import { company } from "@/data/company";
import { en } from "@/data/dictionaries/en";
import "./globals.css";

/**
 * Root shell.
 *
 * Deliberately thin: it owns <html>, the fonts and the pre-paint theme script,
 * and nothing else. Locale-specific chrome — navbar, footer, `lang`, metadata —
 * lives in `app/[locale]/layout.tsx`, because those all depend on which
 * language the reader asked for.
 */

export const metadata: Metadata = {
  metadataBase: new URL(company.site.url),
  title: {
    default: en.meta.home.title,
    template: `%s | ${company.shortName}`,
  },
  description: en.meta.home.description,
  applicationName: company.shortName,
  authors: [{ name: company.legalName }],
  creator: company.legalName,
  publisher: company.legalName,
  category: "technology",
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  /* Matched to `--color-canvas` in each theme, so the browser chrome on mobile
     tracks the page instead of framing it in the wrong colour. */
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a1020" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    /* `lang` is a placeholder here and overwritten per locale by the inner
       layout; `no-js` is stripped by ThemeScript before first paint. */
    <html
      lang="en"
      className={`no-js ${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
