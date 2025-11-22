"use client";

import React from "react";
import { Skill } from "@/data/skills";
import Image from "next/image";

interface SkillNodeProps {
  skill: Skill;
  glowColor: string;
  textColor: string;
}

export const SkillNode: React.FC<SkillNodeProps> = ({
  skill,
  glowColor,
  textColor,
}) => {
  return (
    // Wrapper handles the counter-rotation to keep icons upright
    <div
      className="skill-node relative group z-10 flex items-center justify-center"
      style={{ animation: "counter-spin 120s linear infinite" }}
    >
      {/* 1. Outer Glow (Pulse effect on hover) */}
      <div
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
          transform: "scale(1.6)",
        }}
      />

      {/* 2. Rotating Dashed Ring (Decoration on hover) */}
      <div
        className="absolute -inset-1.5 rounded-full border border-dashed border-white/5 opacity-0 group-hover:opacity-40 transition-all duration-500 animate-[spin_4s_linear_infinite]"
        style={{ borderColor: glowColor }}
      />

      {/* 3. Main Node Container */}
      <div
        className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-black/90 backdrop-blur-sm border border-white/10 transition-all duration-300 group-hover:scale-110 cursor-pointer"
        style={{
          boxShadow: `0 0 0 0 transparent`,
        }}
      >
        {/* Hover Active Border & Glow */}
        <div
          className="absolute inset-0 rounded-full border border-transparent transition-all duration-300 opacity-0 group-hover:opacity-100"
          style={{
            borderColor: textColor,
            boxShadow: `0 0 15px ${glowColor}40`,
          }}
        />

        {/* Icon */}
        <div className="relative w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 z-10">
          <Image
            src={`https://skillicons.dev/icons?i=${skill.name}`}
            alt={skill.name}
            fill
            className="object-contain filter grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
            unoptimized
          />
        </div>
      </div>

      {/* 4. Tooltip / Label (HUD Style) */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-20">
        <div
          className="relative px-2 py-1 bg-neutral-900/90 border border-white/10 rounded text-[10px] font-mono uppercase tracking-wider shadow-xl backdrop-blur-md whitespace-nowrap"
          style={{ color: textColor, borderColor: `${glowColor}40` }}
        >
          {skill.name}
          {/* Triangle Pointer */}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-neutral-900 border-l border-t border-white/10 rotate-45 transform" />
        </div>
      </div>

      <style jsx>{`
        @keyframes counter-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }
      `}</style>
    </div>
  );
};
