"use client";

import { useEffect, useRef, useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import { Project, projects } from "@/data/projects";
import Image from "next/image";

export default function Projects() {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    };

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollProgress = Math.max(0, Math.min(1, -rect.top / rect.height));
      setScrollY(scrollProgress);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative min-h-screen py-20 md:py-32 px-4 md:px-6 bg-black overflow-hidden"
    >
      {/* Subtle background gradient */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: `
            radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, 
              rgba(6, 182, 212, 0.15) 0%, 
              transparent 50%)
          `,
        }}
      />

      {/* Grid background */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
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

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="mb-16 md:mb-24">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px bg-cyan-400 w-12 md:w-20" />
            <span className="text-cyan-400 text-sm md:text-base font-mono">
              SELECTED WORK
            </span>
          </div>
          <h2
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-2"
            style={{
              textShadow: `
                ${mousePos.x * 0.02}px ${
                mousePos.y * 0.02
              }px 0 rgba(6, 182, 212, 0.5),
                ${-mousePos.x * 0.02}px ${
                -mousePos.y * 0.02
              }px 0 rgba(14, 165, 233, 0.5)
              `,
            }}
          >
            PROJECTS
          </h2>
          <p className="text-gray-400 text-lg md:text-xl">
            A collection of things I{"'"}ve built
          </p>
        </div>

        {/* Projects Grid */}
        <div className="space-y-12 md:space-y-20">
          {projects.map((project: Project, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={project.id}
                className="group relative"
                style={{
                  transform: `translateY(${scrollY * (index * 30 - 30)}px)`,
                  transition: "transform 0.1s ease-out",
                }}
              >
                <div
                  className={`flex flex-col ${
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  } gap-6 md:gap-8 items-center`}
                >
                  {/* Project Image */}
                  <div className="w-full lg:w-3/5 relative overflow-hidden">
                    <div
                      className="relative aspect-video rounded-lg overflow-hidden border-2 border-cyan-400/20 group-hover:border-cyan-400 transition-all duration-500"
                      style={{
                        transform: `perspective(1000px) rotateY(${
                          isEven
                            ? (mousePos.x - 50) * 0.02
                            : (50 - mousePos.x) * 0.02
                        }deg) rotateX(${(mousePos.y - 50) * -0.02}deg)`,
                      }}
                    >
                      {/* Image */}
                      <Image
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        fill
                      />

                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                      {/* Hover overlay with links */}
                      <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-6">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-4 bg-cyan-400/10 border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all duration-300"
                        >
                          <Github size={24} />
                        </a>
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-4 bg-cyan-400 text-black hover:bg-white transition-all duration-300"
                        >
                          <ExternalLink size={24} />
                        </a>
                      </div>

                      {/* Corner accents */}
                      <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Floating number */}
                    <div className="absolute -top-6 md:-top-10 right-4 md:right-8 text-7xl md:text-9xl font-black text-cyan-400/5 group-hover:text-cyan-400/10 transition-colors duration-500 pointer-events-none">
                      0{index + 1}
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="w-full lg:w-2/5 space-y-4 md:space-y-6">
                    <div>
                      <div className="text-cyan-400 text-xs md:text-sm font-mono mb-2 tracking-wider">
                        PROJECT 0{index + 1}
                      </div>
                      <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4 leading-tight group-hover:text-cyan-400 transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 text-base md:text-lg leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 md:gap-3">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 md:px-4 py-1.5 md:py-2 bg-cyan-400/5 border border-cyan-400/30 text-cyan-400 text-xs md:text-sm font-mono hover:bg-cyan-400/10 hover:border-cyan-400 transition-all duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 md:gap-4 pt-2">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-transparent border-2 border-cyan-400 text-cyan-400 font-bold text-sm md:text-base hover:bg-cyan-400 hover:text-black transition-all duration-300"
                      >
                        <Github size={18} />
                        <span>CODE</span>
                      </a>
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-cyan-400 text-black font-bold text-sm md:text-base hover:bg-white transition-all duration-300"
                      >
                        <ExternalLink size={18} />
                        <span>DEMO</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 md:mt-32 text-center">
          <div className="inline-block">
            <p className="text-xl md:text-2xl text-gray-400 mb-2">
              Want to see more?
            </p>
            <a
              href="https://github.com/ishantmishra03"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl md:text-3xl font-bold text-cyan-400 hover:text-white transition-colors duration-300 inline-flex items-center gap-2 group"
            >
              Visit My GitHub
              <ExternalLink
                size={24}
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
              />
            </a>
            <div className="h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent mt-2" />
          </div>
        </div>
      </div>
    </section>
  );
}
