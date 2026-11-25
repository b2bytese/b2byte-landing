import { ImageResponse } from "next/og";

export const alt =
  "B2byte Software Engineering — Desenvolvimento de Software Sob Medida";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "radial-gradient(circle at 80% 20%, #1E1B4B 0%, #0B0F1A 65%)",
          color: "#F5F7FF",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "14px",
              background: "#1E1B4B",
              border: "1px solid #8B7CF6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              fontWeight: 700,
              color: "#F5F7FF",
            }}
          >
            <span>B</span>
            <span style={{ color: "#8B7CF6" }}>2</span>
          </div>
          <span
            style={{
              fontSize: "26px",
              fontWeight: 600,
              letterSpacing: "-0.02em",
            }}
          >
            B2byte Software Engineering
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            maxWidth: "960px",
          }}
        >
          <div
            style={{
              fontSize: "64px",
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: "-0.04em",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Tecnologia que faz seu</span>
            <span style={{ color: "#8B7CF6" }}>negócio ir mais longe.</span>
          </div>
          <div
            style={{
              fontSize: "26px",
              color: "#A9B0C5",
              lineHeight: 1.45,
            }}
          >
            Sites, sistemas sob medida, automações e produtos SaaS desenvolvidos
            com engenharia de verdade.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255,255,255,0.12)",
            paddingTop: "24px",
            fontSize: "20px",
            color: "#C7C1FF",
          }}
        >
          <span>b2byte.com.br</span>
          <span>Brasília, Brasil</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
