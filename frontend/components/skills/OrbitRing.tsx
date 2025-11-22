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
  // We use radius - 1 to ensure the stroke stays within bounds
  const pathRadius = radius - 1;

  return (
    <div
      className="orbit-ring absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      style={{
        width: `${radius * 2}px`,
        height: `${radius * 2}px`,
      }}
    >
      {/* 1. SVG Track Layer */}
      <svg
        className="w-full h-full absolute inset-0 overflow-visible"
        viewBox={`0 0 ${radius * 2} ${radius * 2}`}
      >
        {/* Background Track (Faint solid line for structure) */}
        <circle
          cx={radius}
          cy={radius}
          r={pathRadius}
          fill="none"
          stroke={ringColor}
          strokeWidth="1"
          strokeOpacity="0.1"
        />

        {/* Active Track (Dashed glowing line) */}
        <circle
          cx={radius}
          cy={radius}
          r={pathRadius}
          fill="none"
          stroke={ringColor}
          strokeWidth="1.5"
          strokeDasharray={dash}
          strokeLinecap="round"
          style={{
            filter: `drop-shadow(0 0 3px ${glowColor})`,
            transition: "all 0.3s ease",
          }}
        />
      </svg>

      {/* 2. Skill Nodes Layer */}
      <div className="absolute inset-0">
        {skills.map((skill, i, arr) => {
          // Calculate precise position using Trigonometry
          const angleDeg = (i / arr.length) * 360 + offset;
          const angleRad = (angleDeg * Math.PI) / 180;

          const x = Math.cos(angleRad) * pathRadius;
          const y = Math.sin(angleRad) * pathRadius;

          return (
            <div
              key={skill.name}
              className="absolute top-1/2 left-1/2 pointer-events-auto"
              style={{
                // translate3d forces GPU acceleration for smoother rotation
                transform: `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`,
              }}
            >
              <SkillNode
                skill={skill}
                glowColor={glowColor}
                textColor={textColor}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
