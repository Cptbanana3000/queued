import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Queued — Your waitlist, live in 60 seconds";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          fontFamily: "sans-serif",
          padding: "60px",
        }}
      >
        <div
          style={{
            fontSize: 96,
            fontWeight: 800,
            color: "#ffffff",
            letterSpacing: "-4px",
            lineHeight: 1,
          }}
        >
          Queued
        </div>
        <div
          style={{
            fontSize: 32,
            color: "#888888",
            marginTop: 24,
            textAlign: "center",
            maxWidth: 680,
            lineHeight: 1.4,
          }}
        >
          Your waitlist, live in 60 seconds
        </div>
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginTop: 48,
          }}
        >
          {["No code", "Beautiful templates", "Free to start"].map((label) => (
            <div
              key={label}
              style={{
                padding: "8px 20px",
                borderRadius: "999px",
                border: "1px solid #333",
                color: "#aaa",
                fontSize: 20,
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
