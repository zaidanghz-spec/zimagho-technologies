import type { NextConfig } from "next";

/**
 * `STATIC_EXPORT=1 npm run build` emits a fully static `out/` folder with
 * relative asset paths, so the site can be opened straight from the file
 * system with no Node, no npm and no server. The normal build is untouched.
 */
const isStaticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error"] } : false,
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  ...(isStaticExport
    ? {
        output: "export" as const,
        trailingSlash: true,
        /* Rewrites /_next/... to ./_next/... so file:// resolves it. */
        assetPrefix: ".",
        images: { unoptimized: true },
      }
    : {}),
};

export default nextConfig;
