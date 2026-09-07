import { ImageResponse } from "next/og";
import { company } from "@/data/company";

export const alt =
  "PT Adhikarsa Mahatama Teknologi — healthcare technology and automation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social card, generated at build time from the same tokens as the site so it
 * can never drift from the brand. No image asset to keep in sync.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "linear-gradient(135deg, #ffffff 0%, #f8fafc 58%, #eaf4ff 100%)",
          padding: 76,
          color: "#0f172a",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* The mark, inlined as raw geometry — Satori renders SVG paths but
              cannot reach a component from the app bundle. */}
          <svg width="46" height="46" viewBox="0 0 96 96" fill="#0f172a">
            <path d="M48 0 L81 33 L15 33 Z" />
            <path d="M8.5 39.5 L87.5 39.5 L96 48 L48 96 L0 48 Z" />
          </svg>
          <div style={{ width: 1, height: 48, background: "#cbd5e1" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ fontSize: 26, letterSpacing: 7, fontWeight: 600 }}>
              {company.wordmark}
            </div>
            <div style={{ fontSize: 14, letterSpacing: 9, color: "#64748b" }}>
              {company.descriptor}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 78,
              lineHeight: 1.04,
              letterSpacing: -3,
              fontWeight: 600,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Engineering intelligent</span>
            <span>systems for modern healthcare.</span>
          </div>
          <div style={{ fontSize: 26, color: "#475569", maxWidth: 900 }}>
            Healthcare technology, automation, artificial intelligence, and
            systems integration.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 20,
            color: "#64748b",
          }}
        >
          <div style={{ width: 56, height: 2, background: "#1046d6" }} />
          <span>{company.legalName}</span>
        </div>
      </div>
    ),
    size,
  );
}
