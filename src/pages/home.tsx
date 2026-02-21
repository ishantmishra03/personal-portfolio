import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/useTheme";
import { ArrowRight } from "lucide-react";

const PROFILE_IMAGE_SRC =
  "https://avatars.githubusercontent.com/u/212742111?v=4";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  const fg = isDark ? "#f5f5f3" : "#111111";
  const muted = isDark ? "rgba(245,245,243,0.65)" : "rgba(17,17,17,0.55)";
  const orbitBorder = isDark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.16)";
  const accent = isDark ? "#a8c5ff" : "#2563eb";
  const solidBtn = isDark
    ? { bg: "#f5f5f3", text: "#111111" }
    : { bg: "#111111", text: "#f5f5f3" };
  const ghostBtn = isDark
    ? { border: "rgba(255,255,255,0.22)", hover: "rgba(255,255,255,0.08)" }
    : { border: "rgba(0,0,0,0.22)", hover: "rgba(0,0,0,0.05)" };

  return (
    <>
      <style>{`
        /* ── Grain overlay ── */
        .hero-grain::after {
          content: '';
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          opacity: ${isDark ? 0.035 : 0.028};
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-repeat: repeat;
          background-size: 160px;
        }

        /* ── Orbit ring spin ── */
        @keyframes orbit-spin {
          to { transform: rotate(360deg); }
        }
        .orbit-ring {
          animation: orbit-spin 22s linear infinite;
        }

        /* ── Entrance animations ── */
        .hero-item {
          transition: opacity 700ms ease, transform 700ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        .hero-item.hidden-state {
          opacity: 0;
          transform: translateY(22px);
        }
        .hero-item.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .delay-1 { transition-delay:  80ms; }
        .delay-2 { transition-delay: 180ms; }
        .delay-3 { transition-delay: 280ms; }
        .delay-4 { transition-delay: 380ms; }
        .delay-5 { transition-delay: 460ms; }

        
        .profile-wrap:hover .profile-img {
          transform: scale(1.04);
        }
        .profile-img {
          transition: transform 500ms cubic-bezier(0.4, 0, 0.2, 1);
        }

       
        .btn-ghost:hover {
          background: ${ghostBtn.hover};
        }

        
        .btn-solid:hover {
          opacity: 0.88;
          transform: translateY(-1px);
        }
        .btn-solid {
          transition: opacity 200ms ease, transform 200ms ease;
        }

        /* ── Stat divider ── */
        .stat-divider {
          width: 1px;
          height: 32px;
          background: ${orbitBorder};
          flex-shrink: 0;
        }
      `}</style>

      <section
        className={[
          "hero-grain relative min-h-screen flex items-center justify-center",
          "px-6 sm:px-10 lg:px-16",
          "transition-colors duration-400",
          isDark ? "bg-[#0e0e0e]" : "bg-[#f0f0ee]",
        ].join(" ")}
      >
        <div className="relative z-10 w-full max-w-5xl mx-auto pt-24 pb-16">
          {/* Main grid */}
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-16 lg:gap-20">
            {/* LEFT -> Profile Photo*/}
            <div
              className={[
                "hero-item shrink-0",
                mounted ? "visible" : "hidden-state",
                "delay-1",
              ].join(" ")}
            >
              <div className="relative profile-wrap w-47.5 h-47.5 sm:w-55 sm:h-55">
                {/* Border Rings  */}
                <div
                  className="orbit-ring absolute -inset-5 rounded-full"
                  style={{ border: `1px dashed ${orbitBorder}` }}
                />

                <div
                  className="absolute -inset-2.5 rounded-full"
                  style={{ border: `1px solid ${orbitBorder}` }}
                />

                <div
                  className="w-full h-full rounded-full overflow-hidden"
                  style={{
                    boxShadow: isDark
                      ? "0 0 0 1px rgba(255,255,255,0.1)"
                      : "0 0 0 1px rgba(0,0,0,0.1)",
                  }}
                >
                  <img
                    src={PROFILE_IMAGE_SRC}
                    alt="Ishant Mishra"
                    className="profile-img w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT —> content */}
            <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
              <div
                className={[
                  "hero-item font-ui text-[11px] font-semibold tracking-[0.14em] uppercase mb-5",
                  "flex items-center gap-3",
                  mounted ? "visible" : "hidden-state",
                  "delay-2",
                ].join(" ")}
                style={{ color: accent }}
              >
                {/* Horizontal rule — only on desktop */}
                <div
                  className="hidden lg:block shrink-0"
                  style={{
                    width: 32,
                    height: 1,
                    background: accent,
                    opacity: 0.5,
                  }}
                />
                Software Engineer · Full Stack
              </div>

              <h1
                className={[
                  "hero-item font-ui font-normal leading-[1.05] tracking-[-0.03em] mb-6",
                  mounted ? "visible" : "hidden-state",
                  "delay-3",
                ].join(" ")}
                style={{
                  fontSize: "clamp(52px, 8.5vw, 92px)",
                  color: fg,
                }}
              >
                Ishant
                <br />
                Mishra
              </h1>

              <p
                className={[
                  "hero-item font-ui font-light leading-relaxed max-w-md mb-10",
                  mounted ? "visible" : "hidden-state",
                  "delay-4",
                ].join(" ")}
                style={{ color: muted, fontSize: "16px" }}
              >
                Specializing in JavaScript and TypeScript — building
                high-performance, scalable web applications with obsessive
                attention to detail.
              </p>

              {/* CTA */}
              <div
                className={[
                  "hero-item flex flex-col sm:flex-row items-center lg:items-start gap-3",
                  mounted ? "visible" : "hidden-state",
                  "delay-5",
                ].join(" ")}
              >
                <button
                  onClick={() => navigate("/projects")}
                  className="btn-solid font-ui text-[13px] font-medium tracking-[0.05em] uppercase rounded-full px-7 py-3 flex items-center gap-2.5 shrink-0"
                  style={{ background: solidBtn.bg, color: solidBtn.text }}
                >
                  View Projects
                  <ArrowRight />
                </button>

                <button
                  onClick={() => navigate("/contact")}
                  className="btn-ghost font-ui text-[13px] font-medium tracking-[0.05em] uppercase rounded-full px-7 py-3 border transition-colors duration-200 shrink-0"
                  style={{
                    borderColor: ghostBtn.border,
                    color: fg,
                    background: "transparent",
                  }}
                >
                  Get in Touch
                </button>
              </div>

              {/* Stats */}
              <div
                className={[
                  "hero-item mt-14 flex items-center gap-8 lg:gap-10",
                  mounted ? "visible" : "hidden-state",
                  "delay-5",
                ].join(" ")}
                style={{ transitionDelay: "540ms" }}
              >
                {[{ value: "TS", label: "Specialist" }].map((stat, i) => (
                  <React.Fragment key={stat.label}>
                    {i > 0 && <div className="stat-divider" />}
                    <div className="flex flex-col items-center lg:items-start gap-1">
                      <span
                        className="font-ui leading-none tracking-[-0.02em]"
                        style={{ color: fg, fontSize: "26px" }}
                      >
                        {stat.value}
                      </span>
                      <span
                        className="font-ui font-semibold tracking-widest uppercase"
                        style={{ color: muted, fontSize: "10px" }}
                      >
                        {stat.label}
                      </span>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
