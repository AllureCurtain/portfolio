import { ImageResponse } from "next/og";
import { siteConfig } from "../data/site";

export const alt = siteConfig.seo.title;
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
          {siteConfig.identity.name}
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#888",
            marginTop: 24,
            letterSpacing: "0.05em",
          }}
        >
          {siteConfig.identity.role}
        </div>
      </div>
    ),
    { ...size }
  );
}
