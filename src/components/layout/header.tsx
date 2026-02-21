import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../../contexts/useTheme";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * Add to index.html <head>:
 * <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Outfit:wght@300;400;500&display=swap" rel="stylesheet" />
 *
 * Add to tailwind.config.js → theme.extend:
 *   fontFamily: {
 *     serif: ['"Instrument Serif"', 'Georgia', 'serif'],
 *     sans:  ['Outfit', 'system-ui', 'sans-serif'],
 *   },
 */

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
] as const;

// ─── Sun Icon ────────────────────────────────────────────────────────────────
const SunIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    aria-hidden="true"
  >
    <circle
      cx="7.5"
      cy="7.5"
      r="2.8"
      stroke="currentColor"
      strokeWidth="1.25"
    />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
      <line
        key={i}
        x1="7.5"
        y1="1.2"
        x2="7.5"
        y2="2.8"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        transform={`rotate(${deg} 7.5 7.5)`}
      />
    ))}
  </svg>
);

// ─── Moon Icon ───────────────────────────────────────────────────────────────
const MoonIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M12.5 9A5 5 0 116 2.5a4.5 4.5 0 006.5 6.5z"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinejoin="round"
    />
  </svg>
);

// ─── Hamburger Icon ───────────────────────────────────────────────────────────
const HamburgerIcon = () => (
  <svg
    width="17"
    height="11"
    viewBox="0 0 17 11"
    fill="none"
    aria-hidden="true"
  >
    <line
      x1="0"
      y1="1"
      x2="17"
      y2="1"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
    />
    <line
      x1="4"
      y1="5.5"
      x2="17"
      y2="5.5"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
    />
    <line
      x1="8"
      y1="10"
      x2="17"
      y2="10"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
    />
  </svg>
);

// ─── Close Icon ───────────────────────────────────────────────────────────────
const CloseIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 13 13"
    fill="none"
    aria-hidden="true"
  >
    <line
      x1="1"
      y1="1"
      x2="12"
      y2="12"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
    />
    <line
      x1="12"
      y1="1"
      x2="1"
      y2="12"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
    />
  </svg>
);

// ─── Header ───────────────────────────────────────────────────────────────────
const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  const navRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const isDark = theme === "dark";
  const activePath = location.pathname;
  const isActive = (href: string) =>
    href === "/" ? activePath === "/" : activePath.startsWith(href);

  // Scroll detect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Sliding ghost indicator — needs pixel values, stays as inline style
  useEffect(() => {
    const target = hovered ?? NAV_ITEMS.find((i) => isActive(i.href))?.href;
    if (!target) return;
    const el = itemRefs.current[target];
    const container = navRef.current;
    if (!el || !container) return;
    const cRect = container.getBoundingClientRect();
    const eRect = el.getBoundingClientRect();
    setIndicatorStyle({ left: eRect.left - cRect.left, width: eRect.width });
  }, [hovered, activePath]);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleNav = (href: string) => {
    navigate(href);
    setMobileOpen(false);
  };

  const ghostVisible = !!(hovered || NAV_ITEMS.some((i) => isActive(i.href)));

  return (
    <>
      {/*
        Minimal style block — ONLY for things Tailwind genuinely can't express:
        1. Dynamic pixel values for the sliding ghost (left, width from JS)
        2. nth-child staggered animation delays for mobile menu items
        3. clamp() font-size for mobile nav items
        4. Font-family references (Instrument Serif / Outfit)
      */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Outfit:wght@300;400;500&display=swap');

        .font-display { font-family: 'Instrument Serif', Georgia, serif; }
        .font-ui      { font-family: 'Outfit', system-ui, sans-serif; }

        /* Ghost indicator — dynamic left/width set via inline style */
        .nav-ghost {
          transition:
            left  260ms cubic-bezier(0.4, 0, 0.2, 1),
            width 260ms cubic-bezier(0.4, 0, 0.2, 1),
            opacity 200ms ease;
        }

        /* Mobile nav items — clamp size + stagger delays */
        .mob-nav-item {
          font-size: clamp(38px, 10vw, 70px);
          transition: opacity 380ms ease, transform 380ms cubic-bezier(0.4,0,0.2,1), color 180ms ease;
        }
        .mob-open .mob-nav-item:nth-child(1) { transition-delay:  55ms; }
        .mob-open .mob-nav-item:nth-child(2) { transition-delay: 105ms; }
        .mob-open .mob-nav-item:nth-child(3) { transition-delay: 155ms; }
        .mob-open .mob-nav-item:nth-child(4) { transition-delay: 205ms; }
      `}</style>

      {/* ── Mobile fullscreen overlay ─────────────────────────────────────── */}
      <div
        aria-hidden={!mobileOpen}
        onClick={() => setMobileOpen(false)}
        className={[
          "fixed inset-0 z-[190]",
          mobileOpen ? "pointer-events-auto mob-open" : "pointer-events-none",
        ].join(" ")}
      >
        {/* Backdrop */}
        <div
          className={[
            "absolute inset-0 backdrop-blur-md transition-opacity duration-[380ms] ease-in-out",
            isDark ? "bg-black/75" : "bg-[#f5f5f3]/88",
            mobileOpen ? "opacity-100" : "opacity-0",
          ].join(" ")}
        />

        {/* Nav items */}
        <nav
          className="absolute inset-0 flex flex-col justify-center items-start gap-1 px-[10vw]"
          onClick={(e) => e.stopPropagation()}
        >
          {NAV_ITEMS.map((item, i) => (
            <button
              key={item.href}
              onClick={() => handleNav(item.href)}
              tabIndex={mobileOpen ? 0 : -1}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={[
                "mob-nav-item font-display italic font-normal leading-[1.15] tracking-[-0.03em]",
                "bg-transparent border-0 cursor-pointer p-0 relative",
                "transition-colors",
                mobileOpen
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-6",
                isDark
                  ? "text-[#f0f0ee] hover:text-[rgba(240,240,238,0.38)]"
                  : "text-[#0c0c0c] hover:text-[rgba(12,12,12,0.36)]",
              ].join(" ")}
            >
              {/* Index number */}
              <span
                className={[
                  "font-ui not-italic font-light text-[11px] tracking-[0.08em] mr-2.5 align-middle relative -top-1",
                  isDark
                    ? "text-[rgba(240,240,238,0.38)]"
                    : "text-[rgba(12,12,12,0.36)]",
                ].join(" ")}
              >
                0{i + 1}
              </span>

              {item.label}

              {/* Active dot */}
              {isActive(item.href) && (
                <span
                  className={[
                    "absolute -left-5 top-1/2 -translate-y-1/2",
                    "w-1.5 h-1.5 rounded-full opacity-50",
                    isDark ? "bg-[#f0f0ee]" : "bg-[#0c0c0c]",
                  ].join(" ")}
                  aria-hidden="true"
                />
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* ── Floating Pill ─────────────────────────────────────────────────── */}
      <header role="banner">
        <div
          className={[
            // Position — centered, floating
            "fixed left-1/2 -translate-x-1/2 z-[200]",
            "flex items-center whitespace-nowrap",
            // Shape
            "rounded-full border",
            // Backdrop blur
            "backdrop-blur-2xl backdrop-saturate-[1.8]",
            // Scroll-dependent: top + padding + shadow
            scrolled
              ? [
                  "top-3 px-1.5 py-1",
                  isDark
                    ? "shadow-[0_4px_24px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.04)]"
                    : "shadow-[0_4px_24px_rgba(0,0,0,0.07),inset_0_1px_0_rgba(255,255,255,1)]",
                ].join(" ")
              : [
                  "top-5 px-2 py-[5px]",
                  isDark
                    ? "shadow-[0_8px_40px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.05)]"
                    : "shadow-[0_8px_40px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,1)]",
                ].join(" "),
            // Theme colors
            isDark
              ? "bg-[rgba(18,18,18,0.9)] border-[rgba(255,255,255,0.09)]"
              : "bg-[rgba(250,250,248,0.9)] border-[rgba(0,0,0,0.09)]",
            // Transition (top + padding + shadow)
            "transition-all duration-[420ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
          ].join(" ")}
        >
          {/* ── Logo ── */}
          <button
            onClick={() => handleNav("/")}
            className={[
              "font-display italic text-[15px] tracking-[-0.02em]",
              "bg-transparent border-0 cursor-pointer shrink-0",
              "px-3 py-[5px] pr-3 pl-2.5",
              "transition-opacity duration-200 hover:opacity-55",
              isDark ? "text-[#f0f0ee]" : "text-[#0c0c0c]",
            ].join(" ")}
          >
            IM
          </button>

          {/* ── Divider ── */}
          <div
            aria-hidden="true"
            className={[
              "w-px h-3.5 shrink-0 mx-[3px]",
              isDark ? "bg-[rgba(255,255,255,0.09)]" : "bg-[rgba(0,0,0,0.09)]",
            ].join(" ")}
          />

          {/* ── Desktop Nav Links ── */}
          <div
            ref={navRef}
            role="navigation"
            aria-label="Primary"
            onMouseLeave={() => setHovered(null)}
            className="relative hidden sm:flex items-center"
          >
            {/* Sliding ghost pill */}
            <div
              aria-hidden="true"
              className={[
                "nav-ghost absolute top-0 bottom-0 rounded-full pointer-events-none",
                isDark
                  ? "bg-[rgba(255,255,255,0.07)]"
                  : "bg-[rgba(0,0,0,0.055)]",
              ].join(" ")}
              style={{
                left: indicatorStyle.left,
                width: indicatorStyle.width,
                opacity: ghostVisible ? 1 : 0,
              }}
            />

            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                ref={(el) => {
                  itemRefs.current[item.href] = el;
                }}
                onClick={() => handleNav(item.href)}
                onMouseEnter={() => setHovered(item.href)}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={[
                  "relative z-10 font-ui text-[12px] font-normal tracking-[0.05em] uppercase",
                  "bg-transparent border-0 cursor-pointer rounded-full",
                  "px-[13px] py-1.5",
                  "transition-colors duration-200",
                  isActive(item.href) || hovered === item.href
                    ? isDark
                      ? "text-[#f0f0ee]"
                      : "text-[#0c0c0c]"
                    : isDark
                      ? "text-[rgba(240,240,238,0.38)]"
                      : "text-[rgba(12,12,12,0.36)]",
                ].join(" ")}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* ── Controls ── */}
          <div className="flex items-center pl-1 gap-px">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label={
                isDark ? "Switch to light mode" : "Switch to dark mode"
              }
              className={[
                "flex items-center justify-center w-[30px] h-[30px] shrink-0",
                "bg-transparent border-0 cursor-pointer rounded-full",
                "transition-colors duration-200",
                isDark
                  ? "text-[rgba(240,240,238,0.38)] hover:text-[#f0f0ee] hover:bg-[rgba(255,255,255,0.07)]"
                  : "text-[rgba(12,12,12,0.36)] hover:text-[#0c0c0c] hover:bg-[rgba(0,0,0,0.055)]",
              ].join(" ")}
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>

            {/* Mobile hamburger / close — visible only below sm */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              className={[
                "flex sm:hidden items-center justify-center w-[30px] h-[30px] shrink-0",
                "bg-transparent border-0 cursor-pointer rounded-full",
                "transition-colors duration-200",
                isDark
                  ? "text-[rgba(240,240,238,0.38)] hover:text-[#f0f0ee] hover:bg-[rgba(255,255,255,0.07)]"
                  : "text-[rgba(12,12,12,0.36)] hover:text-[#0c0c0c] hover:bg-[rgba(0,0,0,0.055)]",
              ].join(" ")}
            >
              {mobileOpen ? <CloseIcon /> : <HamburgerIcon />}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
