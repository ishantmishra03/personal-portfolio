"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { OrbitRing } from "../skills/OrbitRing"; // Assuming this path is correct based on your snippet
import { skills } from "@/data/skills"; // Assuming this path is correct
import Image from "next/image";
import { Cpu, Database, Globe, Zap, Server } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    };

    const ctx = gsap.context(() => {
      // 1. Title Entrance
      gsap.from(".skills-header", {
        scrollTrigger: { trigger: ".skills-header", start: "top 90%" },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // 2. Orbit System Expand
      gsap.from(".orbit-system", {
        scrollTrigger: { trigger: ".orbit-wrapper", start: "top 75%" },
        scale: 0.5,
        opacity: 0,
        duration: 1.5,
        ease: "elastic.out(1, 0.75)",
      });

      // 3. Continuous Rotation
      if (orbitRef.current) {
        gsap.to(orbitRef.current, {
          rotation: 360,
          duration: 120, // Slow, majestic rotation
          ease: "none",
          repeat: -1,
        });
      }
    }, sectionRef);

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-neutral-950 py-24 px-4"
    >
      {/* --- Background FX (Matched to Hero/About) --- */}

      {/* 1. Dynamic Radial Gradients */}
      <div
        className="absolute inset-0 opacity-30 transition-all duration-500 ease-out"
        style={{
          background: `
            radial-gradient(circle at ${mousePos.x}% ${
            mousePos.y
          }%, rgba(6, 182, 212, 0.15) 0%, transparent 60%),
            radial-gradient(circle at ${100 - mousePos.x}% ${
            100 - mousePos.y
          }%, rgba(168, 85, 247, 0.1) 0%, transparent 60%)
          `,
        }}
      />

      {/* 2. CRT Scanline & Noise Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-soft-light" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-cyan-500/[0.03] to-transparent bg-[length:100%_4px]" />

      {/* 3. Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #06b6d4 1px, transparent 1px), linear-gradient(to bottom, #06b6d4 1px, transparent 1px)`,
          backgroundSize: "4rem 4rem",
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center">
        {/* --- Header --- */}
        <div className="skills-header text-center mb-12 md:mb-20">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-cyan-950/30 border border-cyan-500/30 backdrop-blur-md">
            <Server size={12} className="text-cyan-400" />
            <span className="text-xs font-mono text-cyan-300">
              SYSTEM.modules_loaded
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-2 group">
            <span className="text-cyan-500 font-mono text-2xl md:text-4xl absolute -left-6 -top-4 md:-left-12 md:-top-2 opacity-50">
              02
            </span>
            TECH
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              .STACK
            </span>
          </h2>

          <div className="h-1 w-24 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto mt-4" />
        </div>

        {/* --- Main Orbit Visualization --- */}
        {/* We use scale-50 on mobile to fit the large orbits without complex JS math */}
        <div className="orbit-wrapper w-full flex justify-center scale-[0.6] sm:scale-75 md:scale-90 lg:scale-100 transition-transform duration-500">
          <div className="orbit-system relative w-[800px] h-[800px] flex items-center justify-center">
            {/* Background Glow behind the system */}
            <div className="absolute inset-0 bg-cyan-500/5 blur-3xl rounded-full" />

            <div
              ref={orbitRef}
              className="relative w-full h-full flex items-center justify-center"
            >
              {/* Center Core (The Sun/Reactor) */}
              <div
                className="absolute z-30"
                style={{ transform: `rotate(${-mousePos.x * 0.5}deg)` }} // Subtle counter-rotation
              >
                <div className="relative w-28 h-28 flex items-center justify-center group cursor-pointer">
                  {/* Reactor Glow */}
                  <div className="absolute inset-0 rounded-full bg-yellow-500/20 blur-xl group-hover:bg-yellow-400/40 transition-all duration-500" />
                  <div className="absolute inset-0 rounded-full border-2 border-yellow-500/30 animate-[spin_10s_linear_infinite]" />
                  <div className="absolute inset-2 rounded-full border border-yellow-500/50 border-dashed animate-[spin_15s_linear_infinite_reverse]" />

                  {/* Core Icon */}
                  <div className="relative z-10 w-20 h-20 bg-black/90 rounded-full flex items-center justify-center border border-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.3)]">
                    <Image
                      src="https://skillicons.dev/icons?i=js"
                      alt="JavaScript"
                      width={48}
                      height={48}
                      className="w-12 h-12 grayscale group-hover:grayscale-0 transition-all duration-300"
                      unoptimized
                    />
                  </div>

                  <span className="absolute -bottom-10 text-xs font-mono text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    CORE_ENGINE
                  </span>
                </div>
              </div>

              {/* Rings */}
              {/* Note: Adjust radius values if your OrbitRing component expects specific spacing */}

              {/* Ring 1: Frontend (Cyan) */}
              <OrbitRing
                skills={skills.filter((s) => s.orbit === 1)}
                radius={180}
                ringColor="rgba(6, 182, 212, 0.15)"
                glowColor="rgba(6, 182, 212, 0.5)"
                textColor="#22d3ee"
              />

              {/* Ring 2: Backend (Blue) */}
              <OrbitRing
                skills={skills.filter((s) => s.orbit === 2)}
                radius={280}
                ringColor="rgba(59, 130, 246, 0.15)"
                glowColor="rgba(59, 130, 246, 0.5)"
                textColor="#60a5fa"
                offset={45} // Start rotation at different angle
              />

              {/* Ring 3: Tools/DevOps (Purple) */}
              <OrbitRing
                skills={skills.filter((s) => s.orbit === 3)}
                radius={380}
                ringColor="rgba(168, 85, 247, 0.15)"
                glowColor="rgba(168, 85, 247, 0.5)"
                textColor="#c084fc"
                offset={90}
                dash="4,4" // Dashed line for outer ring
              />
            </div>
          </div>
        </div>

        {/* --- Interactive Legend / HUD --- */}
        <div className="mt-8 md:mt-0 relative z-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 bg-black/50 p-6 rounded-2xl border border-white/5 backdrop-blur-sm">
          <LegendItem
            icon={Globe}
            color="text-cyan-400"
            label="Frontend"
            value="95%"
          />
          <LegendItem
            icon={Database}
            color="text-blue-400"
            label="Backend"
            value="88%"
          />
          <LegendItem
            icon={Cpu}
            color="text-purple-400"
            label="DevOps"
            value="75%"
          />
          <LegendItem
            icon={Zap}
            color="text-yellow-400"
            label="Tools"
            value="100%"
          />
        </div>
      </div>

      {/* --- Decoration: Side HUD Elements --- */}
      <div className="absolute top-1/2 left-6 -translate-y-1/2 hidden lg:flex flex-col gap-4 opacity-30">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-1 h-8 bg-cyan-500/50 rounded-full" />
        ))}
      </div>
      <div className="absolute top-1/2 right-6 -translate-y-1/2 hidden lg:flex flex-col gap-4 opacity-30">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-1 h-8 bg-purple-500/50 rounded-full" />
        ))}
      </div>

      {/* Decorative Corners */}
      <div className="absolute top-8 left-8 w-24 h-24 border-l-2 border-t-2 border-cyan-500/20 rounded-tl-3xl pointer-events-none" />
      <div className="absolute bottom-8 right-8 w-24 h-24 border-r-2 border-b-2 border-purple-500/20 rounded-br-3xl pointer-events-none" />
    </section>
  );
}

// Sub-component for Legend Items
function LegendItem({
  icon: Icon,
  color,
  label,
  value,
}: {
  icon: any;
  color: string;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 group">
      <div
        className={`p-2 rounded-lg bg-white/5 border border-white/5 group-hover:border-white/20 transition-colors`}
      >
        <Icon className={`w-5 h-5 ${color}`} />
      </div>
      <div className="flex flex-col">
        <span className="text-xs text-gray-400 font-mono uppercase tracking-wider">
          {label}
        </span>
        <div className="h-1 w-16 bg-gray-800 rounded-full mt-1 overflow-hidden">
          <div
            className={`h-full ${color.replace("text-", "bg-")} w-[${value}]`}
            style={{ width: value }}
          />
        </div>
      </div>
    </div>
  );
}
