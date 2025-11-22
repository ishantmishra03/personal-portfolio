"use client";

import { useEffect, useRef, useState } from "react";
import { ExternalLink, Github, Folder, ArrowUpRight } from "lucide-react";
import { Project, projects } from "@/data/projects";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
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

    const ctx = gsap.context(() => {
      // Header Animation
      gsap.from(".projects-header", {
        scrollTrigger: { trigger: ".projects-header", start: "top 85%" },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Project Cards Animation
      gsap.utils.toArray<HTMLElement>(".project-card").forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          y: 100,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          delay: i * 0.1, // Stagger effect
        });
      });
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
      id="projects"
      className="relative min-h-screen py-24 px-4 md:px-6 bg-neutral-950 overflow-hidden"
    >
      {/* --- Background FX --- */}

      {/* 1. Dynamic Radial Gradients */}
      <div
        className="absolute inset-0 opacity-30 transition-all duration-500 ease-out pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at ${mousePos.x}% ${
            mousePos.y
          }%, rgba(6, 182, 212, 0.1) 0%, transparent 60%),
            radial-gradient(circle at ${100 - mousePos.x}% ${
            100 - mousePos.y
          }%, rgba(59, 130, 246, 0.1) 0%, transparent 60%)
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

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* --- Header --- */}
        <div className="projects-header mb-20 md:mb-32">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px bg-cyan-500 w-12 md:w-20" />
            <span className="text-cyan-400 text-sm md:text-base font-mono tracking-widest">
              ./SELECTED_WORKS
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 group relative inline-block">
            PROJECTS
            <span className="absolute -top-4 -right-8 md:-top-2 md:-right-12 text-cyan-500/40 font-mono text-sm md:text-xl">
              [log]
            </span>
          </h2>

          <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed border-l-2 border-cyan-500/20 pl-6">
            A curated directory of digital solutions. <br />
            Bridging <span className="text-cyan-400">creativity</span> with{" "}
            <span className="text-blue-400">functionality</span>.
          </p>
        </div>

        {/* --- Projects Grid --- */}
        <div className="space-y-24 md:space-y-32">
          {projects.map((project: Project, index) => {
            const isEven = index % 2 === 0;

            return (
              <div key={project.id} className="project-card group relative">
                <div
                  className={`flex flex-col ${
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  } gap-8 md:gap-16 items-center`}
                >
                  {/* 1. Project Visual (Monitor Style) */}
                  <div className="w-full lg:w-3/5 relative perspective-1000">
                    <div
                      className="relative aspect-video rounded-xl overflow-hidden border border-white/10 bg-neutral-900 group-hover:border-cyan-500/50 transition-all duration-500 shadow-2xl"
                      style={{
                        transform: `rotateY(${
                          isEven ? "5deg" : "-5deg"
                        }) rotateX(5deg)`,
                      }}
                    >
                      {/* Image */}
                      <Image
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        fill
                      />

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-neutral-950/60 group-hover:bg-neutral-950/30 transition-colors duration-500" />

                      {/* Hover Actions (Centered) */}
                      <div className="absolute inset-0 flex items-center justify-center gap-6 opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-[2px]">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-4 rounded-full bg-neutral-950 border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500 hover:text-black hover:scale-110 transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                          title="View Source"
                        >
                          <Github size={24} />
                        </a>
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-4 rounded-full bg-white text-black border border-white hover:scale-110 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                          title="Live Demo"
                        >
                          <ArrowUpRight size={24} />
                        </a>
                      </div>

                      {/* Window Controls Decoration */}
                      <div className="absolute top-3 left-4 flex gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                      </div>
                    </div>

                    {/* Background Glow */}
                    <div
                      className={`absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 blur-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[30%] ${
                        isEven ? "-rotate-3" : "rotate-3"
                      }`}
                    />
                  </div>

                  {/* 2. Project Info */}
                  <div className="w-full lg:w-2/5 space-y-6 md:space-y-8">
                    <div>
                      <div className="flex items-center gap-3 text-cyan-500 mb-3">
                        <Folder size={16} />
                        <span className="text-xs md:text-sm font-mono tracking-wider">
                          /project_0{index + 1}
                        </span>
                      </div>

                      <h3 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight group-hover:text-cyan-400 transition-colors duration-300">
                        {project.title}
                      </h3>

                      <p className="text-gray-400 text-sm md:text-base leading-relaxed border-l-2 border-white/5 pl-4 py-1">
                        {project.description}
                      </p>
                    </div>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-white/5 border border-white/5 rounded text-xs text-gray-300 font-mono hover:border-cyan-500/50 hover:text-cyan-400 transition-colors cursor-default"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Mobile Only Actions (Desktop has hover on image) */}
                    <div className="flex lg:hidden gap-4 pt-2">
                      <a
                        href={project.github}
                        className="text-sm font-bold text-cyan-400 border-b border-cyan-400 pb-1"
                      >
                        CODE
                      </a>
                      <a
                        href={project.demo}
                        className="text-sm font-bold text-white border-b border-white pb-1"
                      >
                        DEMO
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* --- Footer CTA --- */}
        <div className="mt-24 md:mt-40 text-center relative">
          <div className="absolute left-1/2 -translate-x-1/2 -top-12 h-12 w-px bg-gradient-to-t from-cyan-500/50 to-transparent" />

          <div className="inline-block p-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm">
            <a
              href="https://github.com/ishantmishra03"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 bg-neutral-900 hover:bg-neutral-800 rounded-full border border-white/10 transition-all duration-300 group"
            >
              <span className="text-gray-300 font-mono text-sm">
                ishant@github:~$
              </span>
              <span className="text-white font-bold">
                view_all_repositories
              </span>
              <ArrowUpRight
                size={18}
                className="text-cyan-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
              />
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </section>
  );
}
