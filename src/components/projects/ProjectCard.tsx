import React from "react";
import { ExternalLinkIcon, Github } from "lucide-react";
import type { Project } from "../../types";

type Props = {
  project: Project;
  isDark: boolean;
  hovered: number | null;
  setHovered: (id: number | null) => void;
  variant?: "featured" | "default";
  styles: {
    fg: string;
    muted: string;
    fgSub: string;
    tagBg: string;
    cardBg: string;
    cardBorder: string;
    cardHoverBorder: string;
    solidBtn: { bg: string; text: string };
    accent: string;
  };
};

const ProjectCard: React.FC<Props> = ({
  project,
  isDark,
  hovered,
  setHovered,
  variant = "default",
  styles,
}) => {
  const {
    fg,
    muted,
    fgSub,
    tagBg,
    cardBg,
    cardBorder,
    cardHoverBorder,
    solidBtn,
    accent,
  } = styles;

  const isFeatured = variant === "featured";

  return (
    <div
      className="proj-card rounded-2xl overflow-hidden cursor-default flex flex-col"
      style={{
        background: cardBg,
        border: `1px solid ${
          hovered === project.id ? cardHoverBorder : cardBorder
        }`,
        boxShadow:
          hovered === project.id
            ? isDark
              ? "0 20px 60px rgba(0,0,0,0.5)"
              : "0 20px 60px rgba(0,0,0,0.12)"
            : "none",
      }}
      onMouseEnter={() => setHovered(project.id)}
      onMouseLeave={() => setHovered(null)}
    >
      <div
        className="proj-cover relative overflow-hidden"
        style={{ height: isFeatured ? 220 : 150 }}
      >
        <img
          src={project.coverImage}
          alt={project.title}
          className="w-full h-full object-cover"
        />

        <div className="cover-overlay" />

        {isFeatured && (
          <div className="absolute top-4 left-4">
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: accent,
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: accent,
                }}
              />
              Featured
            </div>
          </div>
        )}
      </div>

      <div
        className={`${
          isFeatured ? "p-6 gap-4" : "p-5 gap-3"
        } flex flex-col flex-1`}
      >
        <div className="flex items-start justify-between gap-4">
          <h2
            className="font-ui font-normal tracking-[-0.02em]"
            style={{
              color: fg,
              fontSize: isFeatured ? "20px" : "17px",
            }}
          >
            {project.title}
          </h2>

          <div className="flex items-center gap-2 shrink-0 mt-0.5">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="icon-btn"
                style={{
                  background: tagBg,
                  color: fgSub,
                  border: `1px solid ${cardBorder}`,
                }}
              >
                <Github />
                Code
              </a>
            )}

            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="icon-btn"
                style={{
                  background: solidBtn.bg,
                  color: solidBtn.text,
                }}
              >
                Live <ExternalLinkIcon />
              </a>
            )}
          </div>
        </div>

        <p
          className="font-ui font-light leading-relaxed flex-1"
          style={{
            color: muted,
            fontSize: isFeatured ? "14px" : "13px",
          }}
        >
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {(isFeatured ? project.tags : project.tags.slice(0, 3)).map((tag) => (
            <span
              key={tag}
              className="tag-pill font-ui"
              style={{ background: tagBg, color: fgSub }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
