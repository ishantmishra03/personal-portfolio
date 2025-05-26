import { useState } from "react";
import { useSelector } from "react-redux";
import {
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaReact,
  FaNodeJs,
  FaBootstrap,
  FaGitAlt,
  FaGithub,
} from "react-icons/fa";
import {
  SiRedux,
  SiTailwindcss,
  SiExpress,
  SiMongodb,
  SiTypescript,
  SiNextdotjs,
  SiCplusplus,
} from "react-icons/si";



const TechStack = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredTech, setHoveredTech] = useState(null);
  const isDark = useSelector((state) => state.theme.isDark);

  const techCategories = {
  All: [
    { icon: <FaHtml5 />, label: "HTML5", color: "text-orange-500" },
    { icon: <FaCss3Alt />, label: "CSS3", color: "text-blue-500" },
    { icon: <FaJsSquare />, label: "JavaScript", color: "text-yellow-400" },
    { icon: <FaReact />, label: "ReactJS", color: "text-cyan-400" },
    { icon: <SiRedux />, label: "Redux", color: "text-purple-500" },
    { icon: <SiTailwindcss />, label: "TailwindCSS", color: "text-sky-400" },
    { icon: <FaBootstrap />, label: "Bootstrap", color: "text-violet-600" },
    { icon: <FaNodeJs />, label: "Node.js", color: "text-green-600" },
    { icon: <SiExpress />, label: "Express.js", color: "text-gray-600" },
    { icon: <SiMongodb />, label: "MongoDB", color: "text-green-500" },
    { icon: <SiCplusplus />, label: "C Language", color: "text-blue-400" },
    { icon: <FaGitAlt />, label: "Git", color: "text-orange-600" },
    {
      icon: <FaGithub />,
      label: "Github",
      color: ` ${isDark ? "text-white" : "text-black"}`,
    },
  ],
  Frontend: [
    { icon: <FaHtml5 />, label: "HTML5", color: "text-orange-500" },
    { icon: <FaCss3Alt />, label: "CSS3", color: "text-blue-500" },
    { icon: <FaJsSquare />, label: "JavaScript", color: "text-yellow-400" },
    { icon: <FaReact />, label: "ReactJS", color: "text-cyan-400" },
    { icon: <SiRedux />, label: "Redux", color: "text-purple-500" },
    { icon: <SiTailwindcss />, label: "TailwindCSS", color: "text-sky-400" },
    { icon: <FaBootstrap />, label: "Bootstrap", color: "text-violet-600" },
  ],
  Backend: [
    { icon: <FaNodeJs />, label: "Node.js", color: "text-green-600" },
    { icon: <SiExpress />, label: "Express.js", color: "text-gray-600" },
    { icon: <SiMongodb />, label: "MongoDB", color: "text-green-500" },
    { icon: <SiCplusplus />, label: "C Language", color: "text-blue-400" },
  ],
  "Tools & Others": [
    { icon: <FaGitAlt />, label: "Git", color: "text-orange-600" },
    {
      icon: <FaGithub />,
      label: "Github",
      color: ` ${isDark ? "text-white" : "text-black"}`,
    },
  ],
};

  return (
    <div
      className={`min-h-screen transition-colors duration-500 px-4 py-12
      ${
        isDark
          ? "bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900"
          : "bg-gradient-to-br from-white via-blue-50 to-indigo-100"
      }`}
    >
      {/* Background floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-20 right-10 w-24 h-24 rounded-full blur-xl opacity-30 animate-pulse 
          ${isDark ? "bg-blue-800" : "bg-blue-200"}`}
        ></div>
        <div
          className={`absolute bottom-32 left-16 w-20 h-20 rounded-full blur-lg opacity-40 animate-bounce 
          ${isDark ? "bg-purple-800" : "bg-purple-200"}`}
        ></div>
        <div
          className={`absolute top-1/2 left-1/4 w-16 h-16 rounded-full blur-md opacity-25 animate-pulse 
          ${isDark ? "bg-cyan-800" : "bg-cyan-200"}`}
        ></div>
        <div
          className={`absolute top-1/3 right-1/3 w-12 h-12 rounded-full blur-lg opacity-30 animate-pulse 
          ${isDark ? "bg-pink-800" : "bg-pink-200"}`}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Tech Stack
          </h2>
          <p
            className={`text-lg max-w-2xl mx-auto
            ${isDark ? "text-gray-300" : "text-gray-700"}`}
          >
            Technologies and tools I use to bring ideas to life and create
            amazing digital experiences.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {Object.keys(techCategories).map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border backdrop-blur-sm
                ${
                  selectedCategory === category
                    ? `bg-blue-500 text-white border-blue-500 shadow-lg ${
                        isDark ? "shadow-blue-900/50" : "shadow-blue-200"
                      } scale-105`
                    : `${
                        isDark
                          ? "bg-slate-800/70 text-gray-300 border-gray-700 hover:bg-slate-700 hover:border-blue-600"
                          : "bg-white/70 text-gray-700 border-gray-200 hover:bg-blue-50 hover:border-blue-300"
                      } hover:scale-105`
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
          {techCategories[selectedCategory].map((tech, index) => {
            const isHovered = hoveredTech === `${selectedCategory}-${index}`;
            return (
              <div
                key={`${selectedCategory}-${index}`}
                onMouseEnter={() =>
                  setHoveredTech(`${selectedCategory}-${index}`)
                }
                onMouseLeave={() => setHoveredTech(null)}
                className={`group relative p-4 rounded-2xl backdrop-blur-sm border transition-all duration-300 cursor-pointer hover:shadow-xl
                  ${
                    isDark
                      ? "bg-slate-800/80 border-gray-700 hover:border-blue-600 hover:shadow-blue-900/30"
                      : "bg-white/80 border-gray-200 hover:border-blue-300 hover:shadow-blue-100"
                  }
                  ${isHovered ? "scale-105 -translate-y-2" : ""}`}
              >
                {/* Hover Glow */}
                <div
                  className={`absolute inset-0 rounded-2xl transition-opacity duration-300
                  ${isHovered ? "opacity-100" : "opacity-0"}
                  ${
                    isDark
                      ? "bg-gradient-to-br from-blue-900/20 to-purple-900/20"
                      : "bg-gradient-to-br from-blue-50 to-purple-100"
                  }`}
                ></div>

                <div className="relative z-10 flex flex-col items-center text-center">
                  <div
                    className={`text-3xl mb-3 transition-all duration-300 
                    ${isHovered ? "scale-110 rotate-12" : ""} ${tech.color}`}
                  >
                    {tech.icon}
                  </div>
                  <h3
                    className={`font-semibold text-sm  ${isDark ? "text-white" : "text-gray-800"}`}
                  >
                    {tech.label}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TechStack;
