import React from "react";
import { Skill } from "@/data/skills";
import { SkillNode } from "./SkillNode";

interface OrbitRingProps {
  skills: Skill[];
  radius: number;
  ringColor: string;
  glowColor: string;
  textColor: string;
  offset?: number;
  dash?: string;
}

export const OrbitRing: React.FC<OrbitRingProps> = ({
  skills,
  radius,
  ringColor,
  glowColor,
  textColor,
  offset = 0,
  dash = "8,8",
}) => {
  return (
    <div
      className="orbit-ring absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{
        width: `${radius * 2}px`,
        height: `${radius * 2}px`,
      }}
    >
      {/* Orbit circle */}
      <svg className="w-full h-full" viewBox={`0 0 ${radius * 2} ${radius * 2}`}>
        <circle
          cx={radius}
          cy={radius}
          r={radius - 40}
          fill="none"
          stroke={ringColor}
          strokeWidth="1.5"
          strokeDasharray={dash}
        />
      </svg>

      {/* Skill nodes */}
      {skills.map((skill, i, arr) => {
        const angle = (i / arr.length) * 360 + offset;
        const x = Math.cos((angle * Math.PI) / 180) * (radius - 40);
        const y = Math.sin((angle * Math.PI) / 180) * (radius - 40);
        return (
          <SkillNode
            key={skill.name}
            skill={skill}
            x={x}
            y={y}
            glowColor={glowColor}
            textColor={textColor}
          />
        );
      })}
    </div>
  );
};
