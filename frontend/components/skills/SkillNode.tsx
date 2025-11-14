import React from "react";
import { Skill } from "@/data/skills";
import Image from "next/image";

interface SkillNodeProps {
  skill: Skill;
  x: number;
  y: number;
  glowColor: string;
  textColor: string;
}

export const SkillNode: React.FC<SkillNodeProps> = ({
  skill,
  x,
  y,
  glowColor,
  textColor,
}) => {
  return (
    <div
      className="skill-node absolute top-1/2 left-1/2 group"
      style={{
        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
      }}
    >
      <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 cursor-pointer">
        <div
          className="absolute inset-0 rounded-full group-hover:scale-125 transition-all duration-300"
          style={{
            background: `radial-gradient(circle, ${glowColor}40 0%, transparent 70%)`,
          }}
        />
        <div
          className={`absolute inset-0.5 sm:inset-1 bg-black rounded-full border border-white/20 group-hover:border-[${textColor}] flex items-center justify-center shadow-[0_0_15px_transparent] group-hover:shadow-[0_0_15px_${glowColor}] transition-all duration-300`}
        >
          <Image
            src={`https://skillicons.dev/icons?i=${skill.name}`}
            alt={skill.name}
            width={24}
            height={24}
            className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10"
            unoptimized
          />
        </div>
        <div className="absolute -bottom-6 md:-bottom-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <span
            className="text-[9px] md:text-[10px] font-bold uppercase whitespace-nowrap"
            style={{ color: textColor }}
          >
            {skill.name}
          </span>
        </div>
      </div>
    </div>
  );
};
