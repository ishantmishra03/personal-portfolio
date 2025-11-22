"use client";

import { useEffect, useRef, useState } from "react";
import { Terminal, Cpu, Code, Zap, Activity, Server } from "lucide-react";

export default function About() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [typedText, setTypedText] = useState("");
  const fullText = "loaded successfully...";

  const sectionRef = useRef<HTMLElement>(null);

  // Typewriter effect for the terminal header
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setTypedText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) clearInterval(timer);
    }, 100);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      // Calculate percentage position for parallax
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePos({ x, y });
    };

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const progress = Math.max(
        0,
        Math.min(1, (window.innerHeight - rect.top) / window.innerHeight)
      );
      setScrollProgress(progress);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-neutral-950 py-24 px-4 sm:px-6"
    >
      {/* --- Background FX --- */}

      {/* 1. Dynamic Radial Gradients */}
      <div
        className="absolute inset-0 opacity-40 transition-all duration-500 ease-out"
        style={{
          background: `
            radial-gradient(circle at ${mousePos.x}% ${
            mousePos.y
          }%, rgba(6, 182, 212, 0.15) 0%, transparent 50%),
            radial-gradient(circle at ${100 - mousePos.x}% ${
            100 - mousePos.y
          }%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)
          `,
        }}
      />

      {/* 2. Animated Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #06b6d4 1px, transparent 1px), linear-gradient(to bottom, #06b6d4 1px, transparent 1px)`,
          backgroundSize: "4rem 4rem",
          transform: `translate(${mousePos.x * 0.05}px, ${
            mousePos.y * 0.05
          }px)`,
        }}
      />

      <div className="max-w-7xl w-full mx-auto relative z-10">
        {/* --- Header Section --- */}
        <div
          className="text-center mb-16 lg:mb-24"
          style={{
            opacity: Math.min(1, scrollProgress * 1.5),
            transform: `translateY(${(1 - scrollProgress) * 50}px)`,
          }}
        >
          <div className="relative inline-block group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
            <h2 className="relative text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-2">
              <span className="text-cyan-500 font-mono text-2xl md:text-4xl absolute -left-8 -top-4 md:-left-12 md:-top-2 opacity-50">
                01
              </span>
              ABOUT
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                .ME
              </span>
            </h2>
          </div>

          <div className="flex justify-center gap-4 mt-4 text-cyan-400/60 font-mono text-sm">
            <span>[ SYSTEM_READY ]</span>
            <span>•</span>
            <span>[ DEPLOYED ]</span>
          </div>
        </div>

        {/* --- Terminal Container --- */}
        <div
          className="max-w-6xl mx-auto"
          style={{
            opacity: Math.min(1, scrollProgress * 1.5),
            transform: `translateY(${(1 - scrollProgress) * 30}px)`,
            transition: "transform 0.1s", // Smooth out the scroll parallax slightly
          }}
        >
          {/* Outer Glow */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/30 to-blue-600/30 rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-500" />

            {/* Terminal Window */}
            <div className="relative bg-black/80 backdrop-blur-xl rounded-xl border border-cyan-500/20 overflow-hidden shadow-2xl">
              {/* CRT Scanline Overlay */}
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none" />
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-cyan-500/[0.03] to-transparent bg-[length:100%_4px]" />

              {/* Terminal Toolbar */}
              <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-cyan-500/20">
                <div className="flex items-center gap-3">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-sm" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-sm" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-sm" />
                  </div>
                  <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-white/10">
                    <Terminal size={12} className="text-cyan-400" />
                    <span className="text-xs text-gray-400 font-mono">
                      ishant@portfolio: ~
                    </span>
                  </div>
                </div>
                <div className="text-xs font-mono text-cyan-500/50">
                  bash --v.2.0
                </div>
              </div>

              {/* Terminal Body */}
              <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                {/* Col 1: Profile & Stats (4 cols) */}
                <div className="lg:col-span-4 space-y-8">
                  <div className="font-mono text-sm">
                    <p className="text-gray-500 mb-1">$ ./init_profile.sh</p>
                    <p className="text-green-400">
                      <span className="text-cyan-400">➜</span> Profile{" "}
                      {typedText}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <p className="text-gray-300 leading-relaxed text-sm">
                      Full Stack Developer passionate about building scalable,
                      user-centric applications. I bridge the gap between
                      complex backend logic and silky smooth frontend
                      interactions.
                    </p>

                    {/* Interactive Stats Box */}
                    <div className="bg-cyan-900/10 border border-cyan-500/20 rounded-lg p-4 space-y-3">
                      <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono mb-2 border-b border-cyan-500/20 pb-2">
                        <Activity size={14} /> SYSTEM_STATS
                      </div>

                      {[
                        { label: "Frontend", val: 92, color: "bg-cyan-400" },
                        { label: "Backend", val: 88, color: "bg-blue-500" },
                        {
                          label: "Creativity",
                          val: 100,
                          color: "bg-purple-400",
                        },
                      ].map((stat, i) => (
                        <div key={i} className="group/stat">
                          <div className="flex justify-between text-xs text-gray-400 mb-1">
                            <span>{stat.label}</span>
                            <span className="group-hover/stat:text-white transition-colors">
                              {stat.val}%
                            </span>
                          </div>
                          <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${stat.color} rounded-full transition-all duration-1000 ease-out group-hover/stat:shadow-[0_0_10px_currentColor]`}
                              style={{
                                width: `${
                                  scrollProgress > 0.2 ? stat.val : 0
                                }%`,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Col 2: Philosophy & Code (4 cols) */}
                <div className="lg:col-span-4 space-y-6 border-t lg:border-t-0 lg:border-l border-cyan-500/10 pt-8 lg:pt-0 lg:pl-8">
                  <div className="font-mono text-sm flex items-center gap-2 text-gray-500">
                    <Code size={16} className="text-blue-500" />
                    <span>current_focus.js</span>
                  </div>

                  {/* Code Block Decoration */}
                  <div className="relative bg-black/40 rounded-lg p-4 border border-white/5 font-mono text-xs overflow-x-auto group/code transition-colors hover:border-cyan-500/30">
                    <div className="absolute top-3 right-3 flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-white/10" />
                      <div className="w-2 h-2 rounded-full bg-white/10" />
                    </div>
                    <div className="space-y-1">
                      <p>
                        <span className="text-purple-400">const</span>{" "}
                        <span className="text-yellow-200">dev</span> ={" "}
                        <span className="text-purple-400">new</span>{" "}
                        <span className="text-blue-300">Developer</span>();
                      </p>
                      <p>&nbsp;</p>
                      <p>
                        <span className="text-purple-400">while</span> (
                        <span className="text-orange-300">true</span>) {"{"}
                      </p>
                      <p className="pl-4">
                        <span className="text-purple-400">await</span> dev.
                        <span className="text-blue-400">learn</span>();
                      </p>
                      <p className="pl-4">
                        <span className="text-purple-400">await</span> dev.
                        <span className="text-green-400">build</span>(
                        <span className="text-orange-300">
                          "Awesome Things"
                        </span>
                        );
                      </p>
                      <p className="pl-4">
                        <span className="text-gray-500">
                          // Coffee is essential
                        </span>
                      </p>
                      <p className="pl-4">
                        dev.<span className="text-blue-400">drinkCoffee</span>
                        ();
                      </p>
                      <p>{"}"}</p>
                    </div>
                  </div>

                  <p className="text-gray-400 text-sm italic border-l-2 border-cyan-500/30 pl-4">
                    "Clean code is not just about making it work, it's about
                    making it readable, maintainable, and efficient for the
                    future."
                  </p>
                </div>

                {/* Col 3: Tech Stack / Tags (4 cols) */}
                <div className="lg:col-span-4 space-y-6 border-t lg:border-t-0 lg:border-l border-cyan-500/10 pt-8 lg:pt-0 lg:pl-8">
                  {/* <div className="font-mono text-sm flex items-center gap-2 text-gray-500">
                    <Server size={16} className="text-purple-500" />
                    <span>tech_stack.json</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { name: "Next.js", icon: "⚡" },
                      { name: "React", icon: "⚛️" },
                      { name: "Node.js", icon: "🟢" },
                      { name: "TypeScript", icon: "📘" },
                      { name: "Tailwind", icon: "🎨" },
                      { name: "MongoDB", icon: "🍃" },
                    ].map((tech, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 p-2 rounded bg-white/5 border border-white/5 hover:bg-cyan-500/10 hover:border-cyan-500/30 transition-all cursor-default group/tech"
                      >
                        <span className="text-lg group-hover/tech:scale-110 transition-transform">
                          {tech.icon}
                        </span>
                        <span className="text-xs text-gray-300 font-mono">
                          {tech.name}
                        </span>
                      </div>
                    ))}
                  </div> */}

                  <div className="mt-6 p-4 bg-linear-to-br from-cyan-900/20 to-transparent rounded border border-cyan-500/20">
                    <div className="flex items-start gap-3">
                      <Zap className="w-5 h-5 text-yellow-400 mt-1 shrink-0" />
                      <div>
                        <h4 className="text-white text-sm font-bold mb-1">
                          Always Learning
                        </h4>
                        <p className="text-xs text-gray-400">
                          Currently experimenting with new frameworks.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Terminal Footer Status Bar */}
              <div className="bg-black/60 border-t border-cyan-500/20 px-4 py-2 flex justify-between items-center text-[10px] md:text-xs font-mono text-gray-500">
                <div className="flex gap-4">
                  <span>
                    CPU: <span className="text-green-400">NORMAL</span>
                  </span>
                  <span>
                    MEM: <span className="text-green-400">64GB</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-cyan-400">ONLINE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Corner Accents */}
      <div className="absolute top-10 left-4 md:left-10 w-32 h-32 border-l-2 border-t-2 border-cyan-500/20 rounded-tl-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-4 md:right-10 w-32 h-32 border-r-2 border-b-2 border-blue-500/20 rounded-br-3xl pointer-events-none" />

      <style jsx>{`
        @keyframes scanline {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }
      `}</style>
    </section>
  );
}
