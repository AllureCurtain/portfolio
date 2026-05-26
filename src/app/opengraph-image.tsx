import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Your Name — Designer & Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "80px",
        }}
      >
        <div
          style={{
            fontSize: 120,
            fontWeight: 300,
            color: "#fafafa",
            letterSpacing: "-0.04em",
            lineHeight: 0.9,
          }}
        >
          Your Name
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#888",
            marginTop: 24,
            letterSpacing: "0.05em",
          }}
        >
          Designer & Developer
        </div>
      </div>
    ),
    { ...size }
  );
}
