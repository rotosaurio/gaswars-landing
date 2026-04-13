import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "GasWars — Competitive Code Optimization";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
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
          backgroundColor: "#0E0E0E",
          position: "relative",
        }}
      >
        {/* Grid pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle, rgba(0,255,65,0.08) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            display: "flex",
          }}
        />

        {/* Top bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #00FF41, #7701D0, #C40015)",
            display: "flex",
          }}
        />

        {/* 0x logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "120px",
            height: "120px",
            border: "2px solid rgba(0,255,65,0.3)",
            marginBottom: "32px",
          }}
        >
          <span
            style={{
              fontSize: "72px",
              fontWeight: 900,
              color: "rgba(0,255,65,0.5)",
              letterSpacing: "-4px",
              fontFamily: "monospace",
            }}
          >
            0x
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span
            style={{
              fontSize: "64px",
              fontWeight: 900,
              color: "#FFFFFF",
              letterSpacing: "-2px",
              fontFamily: "monospace",
            }}
          >
            GASWARS
          </span>
          <span
            style={{
              fontSize: "20px",
              color: "#00FF41",
              letterSpacing: "8px",
              fontFamily: "monospace",
            }}
          >
            SHIP TIGHT. GET PAID.
          </span>
        </div>

        {/* Subtitle */}
        <div
          style={{
            display: "flex",
            marginTop: "32px",
            gap: "24px",
          }}
        >
          <span
            style={{
              fontSize: "14px",
              color: "rgba(255,255,255,0.4)",
              letterSpacing: "4px",
              fontFamily: "monospace",
            }}
          >
            STAKE
          </span>
          <span
            style={{
              fontSize: "14px",
              color: "rgba(0,255,65,0.4)",
              fontFamily: "monospace",
            }}
          >
            //
          </span>
          <span
            style={{
              fontSize: "14px",
              color: "rgba(255,255,255,0.4)",
              letterSpacing: "4px",
              fontFamily: "monospace",
            }}
          >
            OPTIMIZE
          </span>
          <span
            style={{
              fontSize: "14px",
              color: "rgba(0,255,65,0.4)",
              fontFamily: "monospace",
            }}
          >
            //
          </span>
          <span
            style={{
              fontSize: "14px",
              color: "rgba(255,255,255,0.4)",
              letterSpacing: "4px",
              fontFamily: "monospace",
            }}
          >
            DRAIN THE POOL
          </span>
        </div>

        {/* Bottom stats */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            display: "flex",
            gap: "48px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
            <span style={{ fontSize: "11px", color: "rgba(0,255,65,0.6)", fontFamily: "monospace", letterSpacing: "2px" }}>MAX_PLAYERS</span>
            <span style={{ fontSize: "24px", color: "#FFFFFF", fontWeight: 700, fontFamily: "monospace" }}>1,000</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
            <span style={{ fontSize: "11px", color: "rgba(0,255,65,0.6)", fontFamily: "monospace", letterSpacing: "2px" }}>PROTOCOL_FEE</span>
            <span style={{ fontSize: "24px", color: "#FFFFFF", fontWeight: 700, fontFamily: "monospace" }}>5%</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
            <span style={{ fontSize: "11px", color: "rgba(0,255,65,0.6)", fontFamily: "monospace", letterSpacing: "2px" }}>NETWORK</span>
            <span style={{ fontSize: "24px", color: "#FFFFFF", fontWeight: 700, fontFamily: "monospace" }}>BSC</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
            <span style={{ fontSize: "11px", color: "rgba(0,255,65,0.6)", fontFamily: "monospace", letterSpacing: "2px" }}>SETTLEMENT</span>
            <span style={{ fontSize: "24px", color: "#FFFFFF", fontWeight: 700, fontFamily: "monospace" }}>ATOMIC</span>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #C40015, #7701D0, #00FF41)",
            display: "flex",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
