"use client";

import { useEffect, useRef, useState } from "react";
import { Terminal } from "lucide-react";

export default function About() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

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
      const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / window.innerHeight));
      setScrollProgress(progress);
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
      id="about"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black py-20 px-6"
    >
      {/* Animated background layers */}
      <div
        className="absolute inset-0 opacity-30 transition-all duration-500"
        style={{
          background: `
            radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, 
              rgba(6, 182, 212, 0.1) 0%, 
              transparent 60%),
            radial-gradient(circle at ${100 - mousePos.x}% ${100 - mousePos.y}%, 
              rgba(14, 165, 233, 0.08) 0%, 
              transparent 60%)
          `,
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              left: `${(i * 7 + mousePos.x * 0.1) % 100}%`,
              top: `${(i * 11 + mousePos.y * 0.1) % 100}%`,
              animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      {/* Hexagonal grid pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='rgba(6,182,212,0.3)' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
          transform: `translate(${mousePos.x * 0.1}px, ${mousePos.y * 0.1}px)`,
          transition: 'transform 0.3s ease-out',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header with glitch effect */}
        <div 
          className="text-center mb-20"
          style={{
            opacity: scrollProgress,
            transform: `translateY(${(1 - scrollProgress) * 50}px)`,
          }}
        >
          <div className="relative inline-block mb-6">
            <div className="absolute -inset-4 bg-cyan-400/20 blur-xl rounded-full" />
            <h2
              className="relative text-6xl md:text-8xl font-black tracking-tighter text-white"
              style={{
                textShadow: `
                  ${mousePos.x * 0.02}px ${mousePos.y * 0.02}px 0 rgba(6, 182, 212, 0.6),
                  ${-mousePos.x * 0.02}px ${-mousePos.y * 0.02}px 0 rgba(14, 165, 233, 0.6)
                `,
              }}
            >
              <span className="text-cyan-400 font-mono text-3xl md:text-4xl mr-4">{"<01>"}</span>
              ABOUT
            </h2>
          </div>
          
          {/* Animated underline */}
          <div className="flex justify-center gap-2">
            <div 
              className="h-1 bg-cyan-400 transition-all duration-500"
              style={{ width: `${20 + mousePos.x * 0.3}px` }}
            />
            <div 
              className="h-1 w-1 bg-cyan-400 rounded-full animate-pulse"
            />
            <div 
              className="h-1 bg-cyan-400 transition-all duration-500"
              style={{ width: `${20 + (100 - mousePos.x) * 0.3}px` }}
            />
          </div>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Main terminal window - full width */}
          <div 
            ref={textRef}
            className="relative"
            style={{
              opacity: scrollProgress,
              transform: `translateY(${(1 - scrollProgress) * 30}px)`,
            }}
          >
            {/* Holographic glow container */}
            <div className="absolute -inset-6 bg-gradient-to-r from-cyan-400/10 via-blue-500/10 to-cyan-400/10 blur-3xl opacity-0 hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative border-2 border-cyan-400/30 bg-black/50 backdrop-blur-sm overflow-hidden">
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-cyan-400/5 to-transparent border-b border-cyan-400/30">
                <Terminal className="w-5 h-5 text-cyan-400" />
                <span className="text-cyan-400 font-mono text-sm flex-1">ishant@portfolio:~$ ./about.sh</span>
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/70 hover:bg-red-500 transition-colors cursor-pointer" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70 hover:bg-yellow-500 transition-colors cursor-pointer" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70 hover:bg-green-500 transition-colors cursor-pointer" />
                </div>
              </div>

              {/* Terminal content - 3 columns layout */}
              <div className="p-8 md:p-12">
                <div className="grid md:grid-cols-3 gap-8">
                  {/* Column 1 */}
                  <div className="space-y-4 font-mono text-sm">
                    <div className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-1">▸</span>
                      <div>
                        <p className="text-green-400 mb-2">./whoami.exe</p>
                        <p className="text-gray-400 leading-relaxed text-xs md:text-sm">
                          I{"'"}m a passionate MERN stack developer who transforms ideas into elegant digital solutions. Building scalable applications that marry cutting-edge technology with exceptional user experiences.
                        </p>
                      </div>
                    </div>

                    {/* System stats */}
                    <div className="mt-6 p-4 bg-cyan-400/5 border border-cyan-400/20">
                      <p className="text-cyan-400 text-xs mb-2">SYSTEM.STATUS:</p>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-500">creativity:</span>
                          <span className="text-green-400">99.9%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">innovation:</span>
                          <span className="text-green-400">100%</span>
                        </div>
                        {/* <div className="flex justify-between">
                          <span className="text-gray-500">coffee_level:</span>
                          <span className="text-yellow-400">optimal</span>
                        </div> */}
                      </div>
                    </div>
                  </div>

                  {/* Column 2 */}
                  <div className="space-y-4 font-mono text-sm">
                    <div className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-1">▸</span>
                      <div>
                        <p className="text-green-400 mb-2">cat philosophy.txt</p>
                        <p className="text-gray-400 leading-relaxed text-xs md:text-sm">
                          My journey in web development is driven by curiosity and a relentless pursuit of innovation. From crafting intuitive interfaces to architecting robust backend systems, I thrive on solving complex problems with clean, efficient code.
                        </p>
                      </div>
                    </div>

                    {/* Code snippet decoration */}
                    <div className="mt-6 p-4 bg-black/50 border border-cyan-400/20 font-mono text-xs">
                      <p className="text-gray-600">{"// Daily routine"}</p>
                      <p className="text-purple-400">while</p>
                      <p className="text-gray-400">(developer.<span className="text-cyan-400">isAwake</span>) {'{'}</p>
                      <p className="text-gray-400 pl-4">code();</p>
                      <p className="text-gray-400 pl-4">innovate();</p>
                      <p className="text-gray-400 pl-4">learn();</p>
                      <p className="text-gray-400">{'}'}</p>
                    </div>
                  </div>

                  {/* Column 3 */}
                  <div className="space-y-4 font-mono text-sm">
                    <div className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-1">▸</span>
                      <div>
                        <p className="text-green-400 mb-2">grep {"passion"} life.log</p>
                        <p className="text-gray-400 leading-relaxed text-xs md:text-sm">
                          When I{"'"}m not coding, you{"'"}ll find me exploring emerging technologies and continuously expanding my technical horizons.
                        </p>
                      </div>
                    </div>

                    {/* Activity log */}
                    <div className="mt-6 p-4 bg-cyan-400/5 border border-cyan-400/20">
                      <p className="text-cyan-400 text-xs mb-3">RECENT_ACTIVITY:</p>
                      <div className="space-y-2 text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse" />
                          <span className="text-gray-400">Learning new frameworks</span>
                        </div>
                        {/* <div className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse" />
                          <span className="text-gray-400">Open source contributions</span>
                        </div> */}
                        <div className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse" />
                          <span className="text-gray-400">Building cool stuff</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom terminal line */}
                <div className="mt-8 pt-6 border-t border-cyan-400/20">
                  <p className="text-cyan-400 font-mono text-sm flex items-center gap-2">
                    <span>ishant@portfolio:~$</span>
                    <span className="inline-block w-2 h-4 bg-cyan-400 animate-pulse" />
                  </p>
                </div>
              </div>

              {/* Scan line effect */}
              <div
                className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent h-2 pointer-events-none"
                style={{
                  top: `${mousePos.y}%`,
                  transition: "top 0.3s ease-out",
                }}
              />

              {/* Data stream effect on sides */}
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-cyan-400/50 to-transparent animate-pulse" />
              <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-cyan-400/50 to-transparent animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Corner decorations */}
      <div 
        className="absolute top-8 left-8 w-20 h-20 border-l-2 border-t-2 border-cyan-400/30 transition-all duration-300"
        style={{
          transform: `translate(${mousePos.x * 0.05}px, ${mousePos.y * 0.05}px)`,
        }}
      />
      <div 
        className="absolute bottom-8 right-8 w-20 h-20 border-r-2 border-b-2 border-cyan-400/30 transition-all duration-300"
        style={{
          transform: `translate(${-mousePos.x * 0.05}px, ${-mousePos.y * 0.05}px)`,
        }}
      />

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes glitch {
          0%, 100% {
            transform: translate(0);
          }
          25% {
            transform: translate(-2px, 2px);
          }
          50% {
            transform: translate(2px, -2px);
          }
          75% {
            transform: translate(-2px, -2px);
          }
        }
      `}</style>
    </section>
  );
}