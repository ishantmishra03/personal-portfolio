import React from "react";
import { useTheme } from "../../contexts/useTheme";
import { useNavigate } from "react-router-dom";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
] as const;

const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/ishantmishra03",
    icon: (
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M7.5 1a6.5 6.5 0 00-2.056 12.67c.325.06.444-.141.444-.313 0-.154-.006-.563-.009-1.106-1.807.393-2.188-.872-2.188-.872-.295-.75-.721-.95-.721-.95-.59-.403.044-.395.044-.395.652.046 1.995.67 1.995.67C5.617 11.197 6.63 11 6.63 11c.046-.4.18-.643.328-.79-1.444-.165-2.962-.722-2.962-3.21 0-.71.254-1.29.67-1.744-.067-.164-.29-.825.064-1.72 0 0 .545-.174 1.786.666A6.22 6.22 0 017.5 4.08c.552.002 1.108.075 1.628.22 1.24-.84 1.784-.666 1.784-.666.355.895.132 1.556.065 1.72.417.453.67 1.034.67 1.744 0 2.495-1.52 3.043-2.968 3.204.233.202.44.598.44 1.205 0 .87-.008 1.573-.008 1.787 0 .174.117.377.447.313A6.5 6.5 0 007.5 1z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/ishantmishra03",
    icon: (
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M2 1a1 1 0 100 2 1 1 0 000-2zM1 4.5h2V14H1V4.5zm4 0h1.92v1.3h.027C7.24 5.02 8.2 4.35 9.5 4.35c2.1 0 2.5 1.38 2.5 3.18V14h-2V7.93c0-.83-.015-1.9-1.158-1.9-1.16 0-1.342.906-1.342 1.84V14H5.5V4.5z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href: "https://twitter.com/ishantmishra03",
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M11.07 1H13l-4.32 4.94L13.5 13h-3.98l-2.78-3.63L3.6 13H1.67l4.62-5.28L1 1h4.08l2.51 3.3L11.07 1zm-.7 10.8h1.1L3.68 2.13H2.5l7.87 9.67z"
          fill="currentColor"
        />
      </svg>
    ),
  },
] as const;

const Footer: React.FC = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const isDark = theme === "dark";
  const year = new Date().getFullYear();

  // ── Tokens mirroring About / Home / Contact ──
  const fg = isDark ? "#f5f5f3" : "#111111";
  const muted = isDark ? "rgba(245,245,243,0.55)" : "rgba(17,17,17,0.48)";
  const border = isDark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.14)";
  const hoverBg = isDark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.07)";
  const accent = isDark ? "#a8c5ff" : "#2563eb";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Outfit:wght@300;400;500;600&display=swap');

        .footer-social-btn {
          transition: color 200ms ease, background 200ms ease;
        }
        .footer-social-btn:hover {
          background: ${hoverBg};
          color: ${fg} !important;
        }

        .footer-nav-btn {
          transition: color 200ms ease;
        }
        .footer-nav-btn:hover {
          color: ${accent} !important;
        }

        .footer-wordmark {
          transition: opacity 200ms ease;
        }
        .footer-wordmark:hover {
          opacity: 0.6;
        }
      `}</style>

      <footer
        style={{
          borderTop: `1px solid ${border}`,
          background: isDark ? "#0e0e0e" : "#f0f0ee",
          transition: "background 400ms ease",
        }}
      >
        <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 py-10">
          {/* ── Top row ── */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Wordmark */}
            <button
              onClick={() => navigate("/")}
              className="footer-wordmark bg-transparent border-0 cursor-pointer p-0"
              style={{
                color: fg,
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontStyle: "italic",
                fontSize: "15px",
                letterSpacing: "-0.02em",
              }}
            >
              IM
            </button>

            {/* Nav links */}
            <nav aria-label="Footer navigation">
              <ul className="flex items-center gap-6 list-none m-0 p-0">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <button
                      onClick={() => navigate(item.href)}
                      className="footer-nav-btn bg-transparent border-0 cursor-pointer p-0"
                      style={{
                        color: muted,
                        fontFamily: "'Outfit', system-ui, sans-serif",
                        fontSize: "11px",
                        fontWeight: 600,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                      }}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Socials */}
            <div className="flex items-center gap-1">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="footer-social-btn flex items-center justify-center w-8 h-8 rounded-full"
                  style={{ color: muted }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* ── Bottom line ── */}
          <div
            className="mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2"
            style={{ borderTop: `1px solid ${border}` }}
          >
            <p
              style={{
                color: muted,
                fontFamily: "'Outfit', system-ui, sans-serif",
                fontSize: "11px",
                fontWeight: 400,
                letterSpacing: "0.06em",
              }}
            >
              © {year} IM. All rights reserved.
            </p>
            <p
              style={{
                color: muted,
                fontFamily: "'Outfit', system-ui, sans-serif",
                fontSize: "11px",
                fontWeight: 400,
                letterSpacing: "0.06em",
              }}
            >
              Built with React · TypeScript
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
