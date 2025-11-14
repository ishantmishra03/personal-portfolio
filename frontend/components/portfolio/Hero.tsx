"use client";

import { useEffect, useRef, useState } from "react";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Dynamic mesh gradient background */}
      <div
        className="absolute inset-0 opacity-40 transition-all duration-500"
        style={{
          background: `
            radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, 
              rgba(6, 182, 212, 0.15) 0%, 
              transparent 50%),
            radial-gradient(circle at ${100 - mousePos.x}% ${
            100 - mousePos.y
          }%, 
              rgba(14, 165, 233, 0.1) 0%, 
              transparent 50%)
          `,
        }}
      />

      {/* Animated grid that follows mouse */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
              patternTransform={`translate(${mousePos.x * 0.5} ${
                mousePos.y * 0.5
              })`}
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="rgba(6, 182, 212, 0.2)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 px-6 max-w-7xl mx-auto">
        <div
          ref={textRef}
          className={`transition-all duration-1500 ease-out ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Glitch effect name */}
          <div className="relative mb-4 overflow-hidden">
            <h1
              className="text-[20vw] md:text-[15vw] font-black leading-none tracking-tighter text-white"
              style={{
                textShadow: `
                  ${mousePos.x * 0.02}px ${
                  mousePos.y * 0.02
                }px 0 rgba(6, 182, 212, 0.7),
                  ${-mousePos.x * 0.02}px ${
                  -mousePos.y * 0.02
                }px 0 rgba(14, 165, 233, 0.7)
                `,
                transform: `perspective(1000px) rotateX(${
                  (mousePos.y - 50) * 0.05
                }deg) rotateY(${(mousePos.x - 50) * 0.05}deg)`,
                transition: "transform 0.1s ease-out",
              }}
            >
              ISHANT
            </h1>

            {/* Scan line effect */}
            <div
              className="absolute inset-0 bg-linear-to-b from-transparent via-cyan-400/20 to-transparent h-1"
              style={{
                top: `${mousePos.y}%`,
                transition: "top 0.3s ease-out",
              }}
            />
          </div>

          {/* Subtitle with tracking mouse */}
          <div className="flex items-center gap-4 mb-12">
            <div
              className="h-0.5 bg-linear-to-r from-cyan-400 to-transparent transition-all duration-300"
              style={{ width: `${20 + mousePos.x * 0.3}px` }}
            />
            <p
              className="text-2xl md:text-4xl font-light text-cyan-400 tracking-widest"
              style={{
                transform: `translateX(${(mousePos.x - 50) * 0.1}px)`,
                transition: "transform 0.2s ease-out",
              }}
            >
              FULL-STACK DEVELOPER
            </p>
          </div>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-12 font-light">
            Architecting digital experiences where innovation meets execution.
            <br />
            <span className="text-cyan-400/60">
              {">"} Code • Design • Impact
            </span>
          </p>

          {/* Interactive buttons */}
          <div className="flex flex-wrap gap-6 mb-16">
            <button
              onClick={scrollToProjects}
              className="group relative px-8 py-4 bg-transparent border-2 border-cyan-400 text-cyan-400 font-bold overflow-hidden transition-all duration-300 hover:text-black"
              onMouseEnter={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty(
                  "--mouse-x",
                  `${e.clientX - rect.left}px`
                );
                e.currentTarget.style.setProperty(
                  "--mouse-y",
                  `${e.clientY - rect.top}px`
                );
              }}
            >
              <span className="relative z-10">EXPLORE WORK</span>
              <div
                className="absolute inset-0 bg-cyan-400 scale-0 group-hover:scale-150 transition-transform duration-500 origin-center rounded-full"
                style={{
                  left: "var(--mouse-x, 50%)",
                  top: "var(--mouse-y, 50%)",
                  transform: "translate(-50%, -50%) scale(0)",
                }}
              />
            </button>

            <button
              onClick={scrollToContact}
              className="group relative px-8 py-4 bg-cyan-400 text-black font-bold overflow-hidden transition-all duration-300"
              onMouseEnter={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty(
                  "--mouse-x",
                  `${e.clientX - rect.left}px`
                );
                e.currentTarget.style.setProperty(
                  "--mouse-y",
                  `${e.clientY - rect.top}px`
                );
              }}
            >
              <span className="relative z-10">INITIALIZE CONTACT</span>
              <div
                className="absolute inset-0 bg-white scale-0 group-hover:scale-150 transition-transform duration-500 origin-center rounded-full"
                style={{
                  left: "var(--mouse-x, 50%)",
                  top: "var(--mouse-y, 50%)",
                  transform: "translate(-50%, -50%) scale(0)",
                }}
              />
            </button>
          </div>

          {/* Social links with magnetic effect */}
          <div className="flex gap-8">
            {[
              {
                Icon: Github,
                href: "https://github.com/ishantmishra03",
                label: "GITHUB",
              },
              {
                Icon: Linkedin,
                href: "https://linkedin.com/in/ishantmishra03",
                label: "LINKEDIN",
              },
              {
                Icon: Mail,
                href: "mailto:ishantmishra03@gmail.com",
                label: "EMAIL",
              },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={label !== "EMAIL" ? "_blank" : undefined}
                rel={label !== "EMAIL" ? "noopener noreferrer" : undefined}
                className="group flex flex-col items-center gap-2 transition-all duration-300 hover:scale-110"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "scale(1.1) translateY(-5px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1) translateY(0)";
                }}
              >
                <div className="relative p-4 border border-cyan-400/30 group-hover:border-cyan-400 transition-colors">
                  <Icon
                    className="text-cyan-400 group-hover:text-white transition-colors"
                    size={24}
                  />
                  <div className="absolute inset-0 bg-cyan-400 opacity-0 group-hover:opacity-10 transition-opacity" />
                </div>
                <span className="text-xs text-gray-600 group-hover:text-cyan-400 transition-colors font-mono">
                  {label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Corner accents */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-cyan-400/30" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-cyan-400/30" />

      {/* Animated cursor follower */}
      <div
        className="fixed w-4 h-4 border-2 border-cyan-400 rounded-full pointer-events-none mix-blend-difference z-50 transition-transform duration-200"
        style={{
          left: `${mousePos.x}%`,
          top: `${mousePos.y}%`,
          transform: `translate(-50%, -50%) scale(${isLoaded ? 1 : 0})`,
        }}
      />

      <style jsx>{`
        @keyframes glitch {
          0%,
          100% {
            transform: translate(0);
          }
          20% {
            transform: translate(-2px, 2px);
          }
          40% {
            transform: translate(-2px, -2px);
          }
          60% {
            transform: translate(2px, 2px);
          }
          80% {
            transform: translate(2px, -2px);
          }
        }

        button:hover {
          animation: glitch 0.3s infinite;
        }
      `}</style>
    </section>
  );
}
