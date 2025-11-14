"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { OrbitRing } from "../skills/OrbitRing";
import { skills } from "@/data/skills";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const rotationTween = useRef<gsap.core.Tween | null>(null);

  // Generate static starfield (doesn't re-randomize every render)
  const [stars] = useState(() =>
    Array.from({ length: 80 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 3}s`,
      opacity: Math.random() * 0.5 + 0.2,
    }))
  );

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (rect) {
        setMousePos({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    const ctx = gsap.context(() => {
      // Animate entrance
      gsap.from(".skills-title", {
        scrollTrigger: {
          trigger: ".skills-title",
          start: "top 85%",
        },
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: "power3.out",
      });

      gsap.from(".orbit-ring", {
        scrollTrigger: {
          trigger: ".orbit-container",
          start: "top 85%",
        },
        scale: 0,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
        stagger: 0.15,
      });

      gsap.from(".skill-node", {
        scrollTrigger: {
          trigger: ".orbit-container",
          start: "top 80%",
        },
        scale: 0,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(2)",
        stagger: 0.05,
      });

      // Continuous rotation
      if (orbitRef.current) {
        const duration = window.innerWidth < 768 ? 60 : 150;
        rotationTween.current = gsap.to(orbitRef.current, {
          rotation: 360,
          duration,
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
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black px-4 py-24"
    >
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center, var(--tw-gradient-stops))] from-cyan-900/20 via-black to-black" />
        <div className="absolute inset-0 opacity-30">
          {stars.map((star, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
              style={{
                left: star.left,
                top: star.top,
                animationDelay: star.delay,
                opacity: star.opacity,
              }}
            />
          ))}
        </div>
      </div>

      {/* Title */}
      <div className="relative z-10 text-center mb-8 md:mb-12">
        <h2
          className="skills-title text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-3"
          style={{
            textShadow: `
              ${mousePos.x * 0.02}px ${
              mousePos.y * 0.02
            }px 0 rgba(6, 182, 212, 0.6),
              ${-mousePos.x * 0.02}px ${
              -mousePos.y * 0.02
            }px 0 rgba(14, 165, 233, 0.6)
            `,
          }}
        >
          <span className="text-cyan-400 font-mono text-3xl md:text-4xl mr-4">
            {"<10>"}
          </span>
          TECH <span className="text-cyan-400">UNIVERSE</span>
        </h2>
      </div>

      {/* Orbital System */}
      <div className="orbit-container relative z-10 w-full max-w-[280px] sm:max-w-md md:max-w-2xl lg:max-w-4xl aspect-square flex items-center justify-center">
        <div ref={orbitRef} className="relative w-full h-full">
          {/* Center Core */}
          <div className="center-skill absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 group cursor-pointer">
              <div className="absolute inset-0 bg-linear-to-br from-yellow-400 via-yellow-500 to-orange-500 rounded-full animate-pulse" />
              <div className="absolute inset-1 sm:inset-2 bg-black rounded-full flex items-center justify-center border-2 border-yellow-400/50">
                <Image
                  src="https://skillicons.dev/icons?i=js"
                  alt="JavaScript icon"
                  className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16"
                  width={40}
                  height={40}
                  unoptimized
                />
              </div>
              <div className="absolute inset-0 bg-yellow-400/30 rounded-full blur-xl" />
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-xs md:text-sm text-yellow-400 font-bold whitespace-nowrap">
                  JAVASCRIPT
                </span>
              </div>
            </div>
          </div>

          {/* Orbit Rings */}
          <OrbitRing
            skills={skills.filter((s) => s.orbit === 1)}
            radius={210}
            ringColor="rgba(6,182,212,0.3)"
            glowColor="rgba(6,182,212,0.6)"
            textColor="#22d3ee"
          />
          <OrbitRing
            skills={skills.filter((s) => s.orbit === 2)}
            radius={300}
            ringColor="rgba(14,165,233,0.25)"
            glowColor="rgba(59,130,246,0.6)"
            textColor="#3b82f6"
            offset={36}
          />
          <OrbitRing
            skills={skills.filter((s) => s.orbit === 3)}
            radius={390}
            ringColor="rgba(168,85,247,0.2)"
            glowColor="rgba(168,85,247,0.6)"
            textColor="#a855f7"
            offset={60}
            dash="12,12"
          />
        </div>
      </div>

      {/* Legend */}
      <div className="relative z-10 mt-12 md:mt-16 flex flex-wrap gap-4 md:gap-6 justify-center text-xs md:text-sm">
        <Legend color="bg-cyan-400" label="Frontend" />
        <Legend color="bg-blue-400" label="Backend" />
        <Legend color="bg-purple-400" label="DevOps" />
      </div>

      {/* Corners */}
      <div className="absolute top-6 left-6 md:top-8 md:left-8 w-12 h-12 md:w-20 md:h-20 border-l-2 border-t-2 border-cyan-400/20" />
      <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 w-12 h-12 md:w-20 md:h-20 border-r-2 border-b-2 border-cyan-400/20" />
    </section>
  );
}

const Legend = ({ color, label }: { color: string; label: string }) => (
  <div className="flex items-center gap-2">
    <div
      className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full ${color} shadow-[0_0_8px_rgba(255,255,255,0.4)]`}
    />
    <span className="text-gray-400 font-medium">{label}</span>
  </div>
);
