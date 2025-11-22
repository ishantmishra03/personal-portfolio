"use client";

import { useEffect, useRef, useState } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ArrowRight,
  Terminal,
} from "lucide-react";

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Trigger entrance animations
    setIsLoaded(true);

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Calculate percentage for parallax
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-neutral-950"
    >
      {/* --- Background FX (Matched to About Section) --- */}

      {/* 1. Dynamic Radial Gradients */}
      <div
        className="absolute inset-0 opacity-40 transition-all duration-500 ease-out"
        style={{
          background: `
            radial-gradient(circle at ${mousePos.x}% ${
            mousePos.y
          }%, rgba(6, 182, 212, 0.15) 0%, transparent 50%),
            radial-gradient(circle at ${100 - mousePos.x}% ${
            100 - mousePos.y
          }%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)
          `,
        }}
      />

      {/* 2. CRT Scanline & Noise Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-soft-light" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-cyan-500/[0.03] to-transparent bg-[length:100%_4px]" />

      {/* 3. Animated Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #06b6d4 1px, transparent 1px), linear-gradient(to bottom, #06b6d4 1px, transparent 1px)`,
          backgroundSize: "4rem 4rem",
          transform: `translate(${mousePos.x * 0.05}px, ${
            mousePos.y * 0.05
          }px)`,
        }}
      />

      {/* --- Main Content --- */}
      <div className="relative z-10 px-6 max-w-7xl mx-auto w-full">
        <div
          className={`flex flex-col items-center text-center transition-all duration-1000 ease-out ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Top Badge */}
          <div className="mb-8 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/30 border border-cyan-500/30 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="text-xs font-mono text-cyan-300">
              SYSTEM_ONLINE
            </span>
          </div>

          {/* Name / Title with Glitch Effect */}
          <div className="relative mb-6 group">
            <h1
              className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-400 select-none"
              style={{
                textShadow: `0 0 40px rgba(6, 182, 212, 0.3)`,
                transform: `perspective(1000px) rotateX(${
                  (mousePos.y - 50) * 0.02
                }deg) rotateY(${(mousePos.x - 50) * 0.02}deg)`,
              }}
            >
              ISHANT
            </h1>

            {/* Decorative decorative marks */}
            <span className="absolute -top-4 -right-8 md:-top-2 md:-right-12 text-cyan-500/40 font-mono text-sm md:text-xl">
              v2.0
            </span>
          </div>

          {/* Subtitle / Role */}
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6 mb-10 text-lg md:text-2xl font-light text-gray-300">
            <span className="hidden md:inline-block w-8 h-[1px] bg-cyan-500/50"></span>
            <p className="font-mono text-cyan-400">{`<FullStack />`}</p>
            <span className="hidden md:inline-block w-1 h-1 rounded-full bg-gray-600"></span>
            <p>Developer & Backend Engineer</p>
            <span className="hidden md:inline-block w-8 h-[1px] bg-cyan-500/50"></span>
          </div>

          <p className="max-w-xl text-gray-400 mb-12 leading-relaxed text-sm md:text-base">
            Crafting scalable applications with modern architecture. Merging
            technical complexity with visual elegance.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-5 mb-16 w-full sm:w-auto">
            <button
              onClick={scrollToProjects}
              className="group relative px-8 py-4 bg-cyan-500 text-black font-bold text-sm tracking-wider overflow-hidden hover:bg-cyan-400 transition-colors"
              style={{
                clipPath:
                  "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
              }}
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative flex items-center gap-2">
                EXPLORE WORK <ArrowRight size={16} />
              </span>
            </button>

            <button
              onClick={scrollToContact}
              className="group relative px-8 py-4 bg-transparent border border-cyan-500/30 text-cyan-400 font-bold text-sm tracking-wider overflow-hidden hover:border-cyan-400 transition-colors"
              style={{
                clipPath:
                  "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
              }}
            >
              <div className="absolute inset-0 bg-cyan-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative flex items-center gap-2">
                CONTACT_ME <Terminal size={16} />
              </span>
            </button>
          </div>

          {/* Social Dock */}
          <div className="flex items-center gap-6 px-8 py-4 bg-white/5 border border-white/5 rounded-2xl backdrop-blur-sm hover:border-cyan-500/30 transition-colors duration-300">
            {[
              {
                Icon: Github,
                href: "https://github.com/ishantmishra03",
                label: "GitHub",
              },
              {
                Icon: Linkedin,
                href: "https://linkedin.com/in/ishantmishra03",
                label: "LinkedIn",
              },
              {
                Icon: Mail,
                href: "mailto:ishantmishra03@gmail.com",
                label: "Email",
              },
            ].map(({ Icon, href, label }, i) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-2 transition-transform hover:-translate-y-1"
                title={label}
              >
                <Icon className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400 whitespace-nowrap">
                  {label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Corners (HUD Style) */}
      <div className="absolute top-0 left-0 p-8 opacity-50">
        <div className="w-32 h-32 border-l-2 border-t-2 border-cyan-500/30 rounded-tl-3xl"></div>
      </div>
      <div className="absolute bottom-0 right-0 p-8 opacity-50">
        <div className="w-32 h-32 border-r-2 border-b-2 border-cyan-500/30 rounded-br-3xl"></div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="text-[10px] font-mono text-cyan-500 animate-pulse">
          SCROLL_DOWN
        </span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-cyan-500 to-transparent"></div>
      </div>

      <style jsx>{`
        @keyframes glitch {
          0% {
            clip-path: inset(80% 0 0 0);
            transform: translate(-2px, 1px);
          }
          20% {
            clip-path: inset(10% 0 60% 0);
            transform: translate(2px, -1px);
          }
          40% {
            clip-path: inset(50% 0 30% 0);
            transform: translate(-2px, 2px);
          }
          60% {
            clip-path: inset(20% 0 70% 0);
            transform: translate(2px, -2px);
          }
          80% {
            clip-path: inset(60% 0 10% 0);
            transform: translate(1px, 2px);
          }
          100% {
            clip-path: inset(0 0 0 0);
            transform: translate(0);
          }
        }
      `}</style>
    </section>
  );
}
