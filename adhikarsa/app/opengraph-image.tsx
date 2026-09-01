import { ImageResponse } from "next/og";
import { company } from "@/data/company";

export const alt =
  "PT Adhikarsa Mahatama Teknologi — intelligent hospital technology";
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
            "radial-gradient(1000px 620px at 70% -10%, #12283f 0%, #05070a 62%)",
          padding: 76,
          color: "#f8fafc",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: "#38bdf8",
            }}
          />
          <div
            style={{
              fontSize: 22,
              letterSpacing: 6,
              color: "#cbd5e1",
              fontWeight: 600,
            }}
          >
            {company.wordmark}
          </div>
          <div style={{ fontSize: 18, letterSpacing: 5, color: "#64748b" }}>
            {company.descriptor}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              fontSize: 82,
              lineHeight: 1.02,
              letterSpacing: -3,
              fontWeight: 600,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Engineering</span>
            <span>the intelligent hospital.</span>
          </div>
          <div style={{ fontSize: 26, color: "#94a3b8", maxWidth: 860 }}>
            Hospital automation, AI systems, and enterprise integration for
            modern healthcare institutions.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontSize: 20,
            letterSpacing: 3,
            color: "#64748b",
          }}
        >
          <div style={{ width: 56, height: 1, background: "#334155" }} />
          <span>HOSPITAL AUTOMATION</span>
          <span>·</span>
          <span>AI SYSTEMS</span>
          <span>·</span>
          <span>ENTERPRISE INTEGRATION</span>
        </div>
      </div>
    ),
    size,
  );
}
