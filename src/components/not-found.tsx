import React, { useEffect, useState } from "react";
import { useTheme } from "../contexts/useTheme";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);


  const fg = isDark ? "#f5f5f3" : "#111111";
  const muted = isDark ? "rgba(245,245,243,0.55)" : "rgba(17,17,17,0.45)";
  const border = isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)";
  const fadeBg = isDark ? "#0e0e0e" : "#f0f0ee";
  const accent = isDark ? "#a8c5ff" : "#2563eb";
  const solidBtn = isDark
    ? { bg: "#f5f5f3", text: "#111111" }
    : { bg: "#111111", text: "#f5f5f3" };

  return (
    <>
      <style>{`
        .nf-root {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 600ms ease, transform 600ms cubic-bezier(0.4,0,0.2,1);
        }
        .nf-root.mounted {
          opacity: 1;
          transform: translateY(0);
        }

        .nf-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border-radius: 9999px;
          padding: 12px 26px;
          font-family: 'Outfit', system-ui, sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          text-decoration: none;
          background: ${solidBtn.bg};
          color: ${solidBtn.text};
          border: none;
          cursor: pointer;
          transition: opacity 200ms ease, transform 200ms ease;
        }
        .nf-btn:hover {
          opacity: 0.86;
          transform: translateY(-1px);
        }
      `}</style>

      <section
        style={{
          minHeight: "100vh",
          background: fadeBg,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 24px",
          transition: "background 400ms ease",
          fontFamily: "'Outfit', system-ui, sans-serif",
        }}
      >
        <div
          className={`nf-root${mounted ? " mounted" : ""}`}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "0",
          }}
        >
          
          <p
            style={{
              fontSize: "clamp(96px, 18vw, 180px)",
              fontWeight: 200,
              letterSpacing: "-0.05em",
              lineHeight: 1,
              color: fg,
              marginBottom: "24px",
            }}
          >
            404
          </p>

          
          <div
            style={{
              width: "40px",
              height: "1px",
              background: border,
              marginBottom: "28px",
            }}
          />

          
          <p
            style={{
              fontSize: "clamp(20px, 3vw, 26px)",
              fontWeight: 300,
              letterSpacing: "-0.02em",
              color: fg,
              marginBottom: "12px",
            }}
          >
            Page not found.
          </p>

          
          <p
            style={{
              fontSize: "15px",
              fontWeight: 300,
              color: muted,
              maxWidth: "300px",
              lineHeight: 1.65,
              marginBottom: "44px",
            }}
          >
            This page doesn't exist or has been moved. Let's get you back.
          </p>

          {/* ── CTA ── */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <Link to="/" className="nf-btn">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M11 7H3m0 0 3.5-3.5M3 7l3.5 3.5"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Back home
            </Link>

            <Link
              to="/contact"
              style={{
                fontFamily: "'Outfit', system-ui, sans-serif",
                fontSize: "13px",
                fontWeight: 500,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                textDecoration: "none",
                color: accent,
                transition: "opacity 150ms ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Contact →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
