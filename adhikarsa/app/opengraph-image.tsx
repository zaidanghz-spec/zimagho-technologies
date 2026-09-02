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
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ fontSize: 22, letterSpacing: 6, fontWeight: 600 }}>
            {company.wordmark}
          </div>
          <div style={{ width: 8, height: 8, background: "#0b5cff", borderRadius: 2 }} />
          <div style={{ fontSize: 18, letterSpacing: 5, color: "#64748b", marginLeft: 6 }}>
            {company.descriptor}
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
          <div style={{ width: 56, height: 2, background: "#0b5cff" }} />
          <span>{company.legalName}</span>
        </div>
      </div>
    ),
    size,
  );
}
