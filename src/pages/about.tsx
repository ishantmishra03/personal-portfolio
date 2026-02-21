import React from "react";
import { useTheme } from "../contexts/useTheme";
import { TECH } from "../store";
import { Reveal } from "../components/reveal";

const About: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const fg = isDark ? "#f5f5f3" : "#111111";
  const muted = isDark ? "rgba(245,245,243,0.65)" : "rgba(17,17,17,0.55)";
  const border = isDark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.14)";
  const tagBg = isDark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.06)";
  const tagBorder = isDark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.18)";
  const fadeBg = isDark ? "#0e0e0e" : "#f0f0ee";
  const accent = isDark ? "#a8c5ff" : "#2563eb";

  return (
    <>
      <style>{`
        

        /* ── Infinite marquee ── */
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 30s linear infinite;
        }
        .marquee-track:hover { animation-play-state: paused; }

        .marquee-wrap {
          overflow: hidden;
          position: relative;
          mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
        }

        
        .tech-icon-item {
          transition: opacity 250ms ease, transform 250ms ease;
        }
        .tech-icon-item:hover {
          opacity: 1 !important;
          transform: translateY(-4px);
        }

        
        .exp-card {
          border: 1px solid ${border};
          border-radius: 18px;
          padding: 36px;
          position: relative;
          overflow: hidden;
        }
        .exp-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: ${
            isDark
              ? "radial-gradient(ellipse at 15% 50%, rgba(168,197,255,0.04) 0%, transparent 70%)"
              : "radial-gradient(ellipse at 15% 50%, rgba(37,99,235,0.04) 0%, transparent 70%)"
          };
          pointer-events: none;
        }

        
        .section-label {
          font-family: 'Outfit', system-ui, sans-serif;
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          font-weight: 600;
        }

        
        .fact-card {
          border: 1px solid ${border};
          border-radius: 12px;
          padding: 16px 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;
          text-align: center;
          background: ${tagBg};
          transition: border-color 200ms ease, background 200ms ease;
        }
        .fact-card:hover {
          border-color: ${tagBorder};
          background: ${isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)"};
        }
      `}</style>

      <section
        className="min-h-screen px-6 sm:px-10 lg:px-16 pt-32 pb-28"
        style={{ background: fadeBg, transition: "background 400ms ease" }}
      >
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="mb-16 text-center">
              <p className="section-label mb-5" style={{ color: accent }}>
                About
              </p>
              <h2
                className="font-ui font-normal leading-[1.05] tracking-[-0.03em]"
                style={{ fontSize: "clamp(42px, 7vw, 78px)", color: fg }}
              >
                Crafting the web,
                <br />
                <span style={{ color: muted }}>one detail at a time.</span>
              </h2>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div
              className="space-y-5 pb-14 mb-14 text-center max-w-xl mx-auto"
              style={{ borderBottom: `1px solid ${border}` }}
            >
              <p
                className="font-ui font-normal leading-relaxed"
                style={{ color: fg, fontSize: "17px" }}
              >
                I'm a Software Engineer with a deep focus on the JavaScript
                ecosystem — building things that are fast, maintainable, and
                genuinely pleasant to use.
              </p>
              <p
                className="font-ui font-light leading-relaxed"
                style={{ color: muted, fontSize: "16px" }}
              >
                TypeScript-first, performance-obsessed, and always curious about
                what's next. I care equally about the architecture decisions no
                one sees and the micro-interactions everyone feels.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-14 mb-14"
              style={{ borderBottom: `1px solid ${border}` }}
            >
              {[
                { label: "Based in", value: "Nepal" },
                { label: "Focus", value: "TypeScript" },
                { label: "Experience", value: "Still learning" },
                { label: "Availability", value: "Open to work" },
              ].map((f) => (
                <div key={f.label} className="fact-card">
                  <span
                    className="font-ui font-semibold tracking-[0.09em] uppercase"
                    style={{ color: accent, fontSize: "10px" }}
                  >
                    {f.label}
                  </span>
                  <span
                    className="font-ui font-medium"
                    style={{ color: fg, fontSize: "15px" }}
                  >
                    {f.value}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div
              className="pb-14 mb-14"
              style={{ borderBottom: `1px solid ${border}` }}
            >
              <p
                className="section-label mb-8 text-center"
                style={{ color: accent }}
              >
                Stack
              </p>

              <div className="marquee-wrap py-3">
                <div className="marquee-track">
                  {[...TECH, ...TECH].map((tech, i) => (
                    <div
                      key={i}
                      className="tech-icon-item flex flex-col items-center gap-2.5 mx-5 shrink-0 cursor-default"
                      style={{ opacity: 0.85 }}
                      title={tech.name}
                    >
                      {/* Icon  */}
                      <div
                        className="w-12 h-12 flex items-center justify-center rounded-full border"
                        style={{ background: tagBg, borderColor: tagBorder }}
                      >
                        <img
                          src={tech.path}
                          alt={tech.name}
                          width="26"
                          height="26"
                          draggable={false}
                        />
                      </div>

                      <span
                        className="font-ui font-medium tracking-[0.04em]"
                        style={{ color: muted, fontSize: "11px" }}
                      >
                        {tech.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div>
              <p
                className="section-label mb-8 text-center"
                style={{ color: accent }}
              >
                Experience
              </p>

              <div className="exp-card">
                <span
                  className="font-display italic absolute right-7 top-4 leading-none select-none pointer-events-none"
                  style={{
                    fontSize: "100px",
                    color: isDark
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(0,0,0,0.06)",
                  }}
                  aria-hidden="true"
                >
                  0
                </span>

                <div className="relative z-10 flex flex-col sm:flex-row sm:items-start gap-5">
                  <div
                    className="flex items-center justify-center w-12 h-12 rounded-full shrink-0 border"
                    style={{ borderColor: tagBorder, background: tagBg }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 18 18"
                      fill="none"
                      aria-hidden="true"
                    >
                      <circle
                        cx="9"
                        cy="6"
                        r="3"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        style={{ color: muted }}
                      />
                      <path
                        d="M3 15c0-3.314 2.686-6 6-6s6 2.686 6 6"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        style={{ color: muted }}
                      />
                    </svg>
                  </div>

                  <div>
                    <h3
                      className="font-ui font-semibold mb-2"
                      style={{ color: fg, fontSize: "16px" }}
                    >
                      No professional experience — yet.
                    </h3>
                    <p
                      className="font-ui font-light leading-relaxed"
                      style={{ color: muted, fontSize: "15px" }}
                    >
                      I'm at the start of my professional journey. What I bring
                      instead is genuine curiosity, a strong self-taught
                      foundation, and a portfolio of real projects built with
                      production-quality standards. I'm actively looking for my
                      first role.
                    </p>
                  </div>
                </div>

                {/* Status tags */}
                <div
                  className="mt-6 pt-5 flex flex-wrap gap-2"
                  style={{ borderTop: `1px solid ${border}` }}
                >
                  {[
                    "Building side projects",
                    "Contributing to open source",
                    "Learning every day",
                    "Open to opportunities",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="font-ui font-medium tracking-[0.04em] px-3.5 py-1.5 rounded-full border"
                      style={{
                        background: tagBg,
                        borderColor: tagBorder,
                        color: muted,
                        fontSize: "12px",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default About;
