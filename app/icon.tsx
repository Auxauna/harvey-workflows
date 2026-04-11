import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 13,
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          fontWeight: 700,
          background: "#1F1D1A",
          color: "#F5F3F0",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          letterSpacing: "-0.04em",
        }}
      >
        GTM
      </div>
    ),
    { ...size },
  );
}
