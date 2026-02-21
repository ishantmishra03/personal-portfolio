import React, { useEffect, useState } from "react";
import { useTheme } from "../contexts/useTheme";
import { PROJECTS } from "../store";
import { ArrowRight, Github } from "lucide-react";
import ProjectCard from "../components/projects/ProjectCard";

const Projects: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  const fg = isDark ? "#f5f5f3" : "#111111";
  const muted = isDark ? "rgba(245,245,243,0.55)" : "rgba(17,17,17,0.50)";
  const fgSub = isDark ? "rgba(245,245,243,0.75)" : "rgba(17,17,17,0.75)";
  const accent = isDark ? "#a8c5ff" : "#2563eb";
  const orbitBorder = isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)";
  const cardBg = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)";
  const cardBorder = isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.09)";
  const cardHoverBorder = isDark
    ? "rgba(255,255,255,0.22)"
    : "rgba(0,0,0,0.22)";
  const tagBg = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)";
  const solidBtn = isDark
    ? { bg: "#f5f5f3", text: "#111111" }
    : { bg: "#111111", text: "#f5f5f3" };

  const featured = PROJECTS.filter((p) => p.featured);
  const rest = PROJECTS.filter((p) => !p.featured);

  const sharedStyles = {
    fg,
    muted,
    fgSub,
    tagBg,
    cardBg,
    cardBorder,
    cardHoverBorder,
    solidBtn,
    accent,
  };

  return (
    <>
      <style>{`
          
          .projects-grain::after {
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

          /* Entrance */
          .p-item {
            transition: opacity 700ms ease, transform 700ms cubic-bezier(0.4,0,0.2,1);
          }
          .p-item.hidden-state { opacity: 0; transform: translateY(22px); }
          .p-item.visible      { opacity: 1; transform: translateY(0); }
          .pd-1 { transition-delay:  60ms; }
          .pd-2 { transition-delay: 140ms; }
          .pd-3 { transition-delay: 220ms; }
          .pd-4 { transition-delay: 300ms; }
          .pd-5 { transition-delay: 380ms; }
          .pd-6 { transition-delay: 460ms; }
          .pd-7 { transition-delay: 540ms; }

         
          .proj-card {
            transition:
              border-color 280ms ease,
              box-shadow 280ms ease,
              transform 280ms cubic-bezier(0.4,0,0.2,1);
            will-change: transform;
          }
          .proj-card:hover {
            transform: translateY(-4px);
          }

          
          .proj-cover img {
            transition: transform 600ms cubic-bezier(0.4,0,0.2,1);
          }
          .proj-card:hover .proj-cover img {
            transform: scale(1.06);
          }

          
          .cover-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(
              to top,
              ${isDark ? "rgba(14,14,14,0.72)" : "rgba(240,240,238,0.55)"} 0%,
              transparent 55%
            );
            pointer-events: none;
          }

          
          .icon-btn {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 7px 14px;
            border-radius: 999px;
            font-size: 11px;
            font-weight: 600;
            letter-spacing: 0.07em;
            text-transform: uppercase;
            transition: opacity 200ms ease, background 200ms ease, transform 200ms ease;
            cursor: pointer;
            text-decoration: none;
            white-space: nowrap;
          }
          .icon-btn:hover { opacity: 0.8; transform: translateY(-1px); }

          /* Tag pill */
          .tag-pill {
            font-size: 10px;
            font-weight: 600;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            padding: 4px 10px;
            border-radius: 999px;
          }

          /* Divider */
          .section-divider {
            width: 100%;
            height: 1px;
            background: ${orbitBorder};
            margin: 56px 0;
          }

          /* Featured badge */
          .featured-badge {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            font-size: 10px;
            font-weight: 700;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: ${accent};
          }
          @keyframes pulse-dot {
            0%, 100% { opacity: 1; transform: scale(1); }
            50%       { opacity: 0.4; transform: scale(0.75); }
          }
          .feat-dot {
            width: 6px; height: 6px;
            border-radius: 50%;
            background: ${accent};
            animation: pulse-dot 2.2s ease-in-out infinite;
            flex-shrink: 0;
          }
        `}</style>

      <section
        className={[
          "projects-grain relative min-h-screen",
          "px-6 sm:px-10 lg:px-16",
          "transition-colors duration-400",
          isDark ? "bg-[#0e0e0e]" : "bg-[#f0f0ee]",
        ].join(" ")}
      >
        <div className="relative z-10 w-full max-w-5xl mx-auto pt-28 pb-24">
          <div className="mb-16">
            <div
              className={[
                "p-item flex items-center gap-3 mb-5",
                mounted ? "visible" : "hidden-state",
                "pd-1",
              ].join(" ")}
              style={{ color: accent }}
            >
              <div
                style={{
                  width: 32,
                  height: 1,
                  background: accent,
                  opacity: 0.5,
                }}
              />
              <span className="font-ui text-[11px] font-semibold tracking-[0.14em] uppercase">
                Selected Work
              </span>
            </div>

            <h1
              className={[
                "p-item font-ui font-normal tracking-[-0.03em] leading-[1.05]",
                mounted ? "visible" : "hidden-state",
                "pd-2",
              ].join(" ")}
              style={{ fontSize: "clamp(42px, 7vw, 78px)", color: fg }}
            >
              Projects
            </h1>

            <p
              className={[
                "p-item font-ui font-light max-w-md mt-5 leading-relaxed",
                mounted ? "visible" : "hidden-state",
                "pd-3",
              ].join(" ")}
              style={{ color: muted, fontSize: "15px" }}
            >
              A curated collection of things I've built — from developer tools
              to full-stack products.
            </p>
          </div>

          {/* Projects Grid -> 2 */}
          <div
            className={[
              "p-item",
              mounted ? "visible" : "hidden-state",
              "pd-4",
            ].join(" ")}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {featured.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  isDark={isDark}
                  hovered={hovered}
                  setHovered={setHovered}
                  variant="featured"
                  styles={sharedStyles}
                />
              ))}
            </div>
          </div>

          <div className="section-divider" />

          {/* Projects Grid -> 3 */}
          <div
            className={[
              "p-item",
              mounted ? "visible" : "hidden-state",
              "pd-5",
            ].join(" ")}
          >
            <p
              className="font-ui text-[11px] font-semibold tracking-[0.14em] uppercase mb-8"
              style={{ color: muted }}
            >
              Other Projects
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {rest.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  isDark={isDark}
                  hovered={hovered}
                  setHovered={setHovered}
                  styles={sharedStyles}
                />
              ))}
            </div>
          </div>

          <div
            className={[
              "p-item mt-20 flex flex-col sm:flex-row items-center justify-between gap-6",
              "pt-10",
              mounted ? "visible" : "hidden-state",
              "pd-7",
            ].join(" ")}
            style={{ borderTop: `1px solid ${orbitBorder}` }}
          >
            <p
              className="font-ui font-light"
              style={{ color: muted, fontSize: "14px" }}
            >
              Want to see more? Check out my GitHub for experiments & OSS.
            </p>
            <a
              href="https://github.com/ishantmishra03"
              target="_blank"
              rel="noopener noreferrer"
              className="icon-btn shrink-0"
              style={{
                background: solidBtn.bg,
                color: solidBtn.text,
                fontSize: "12px",
                padding: "10px 22px",
              }}
            >
              <Github />
              View GitHub
              <ArrowRight />
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Projects;
