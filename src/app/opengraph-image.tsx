import { ImageResponse } from "next/og";

export const alt = "In2Out Systems: organize o processo, automatize o que faz sentido";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraph() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#0E1628",
          color: "#F5F7FA",
        }}
      >
        <div style={{ fontSize: 34, fontWeight: 700, color: "#9CC0F5" }}>In2Out Systems</div>
        <div style={{ fontSize: 68, fontWeight: 800, marginTop: 24, lineHeight: 1.1 }}>
          Organize o processo. Automatize o que faz sentido.
        </div>
        <div style={{ fontSize: 36, marginTop: 28, color: "#C8D3E6" }}>Use IA onde ela ajuda de verdade.</div>
      </div>
    ),
    size,
  );
}
