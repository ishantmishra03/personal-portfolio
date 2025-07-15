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
  FaPython,
} from "react-icons/fa";
import {
  SiRedux,
  SiTailwindcss,
  SiExpress,
  SiMongodb,
  SiTypescript,
  SiNextdotjs,
  SiC,
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
      { icon: <SiTypescript />, label: "TypeScript", color: "text-blue-400" },
      { icon: <FaReact />, label: "ReactJS", color: "text-cyan-400" },
      { icon: <SiNextdotjs />, label: "Next.js", color: "text-gray-800 dark:text-white" },
      { icon: <SiRedux />, label: "Redux", color: "text-purple-500" },
      { icon: <SiTailwindcss />, label: "TailwindCSS", color: "text-sky-400" },
      { icon: <FaBootstrap />, label: "Bootstrap", color: "text-violet-600" },
      { icon: <FaNodeJs />, label: "Node.js", color: "text-green-600" },
      { icon: <SiExpress />, label: "Express.js", color: "text-gray-600" },
      { icon: <SiMongodb />, label: "MongoDB", color: "text-green-500" },
      { icon: <FaPython />, label: "Python", color: "text-yellow-300" },
      { icon: <SiC />, label: "C", color: "text-blue-500" },
      { icon: <FaGitAlt />, label: "Git", color: "text-orange-600" },
      { icon: <FaGithub />, label: "GitHub", color: isDark ? "text-white" : "text-black" },
    ],
    Frontend: [
      { icon: <FaHtml5 />, label: "HTML5", color: "text-orange-500" },
      { icon: <FaCss3Alt />, label: "CSS3", color: "text-blue-500" },
      { icon: <FaJsSquare />, label: "JavaScript", color: "text-yellow-400" },
      { icon: <SiTypescript />, label: "TypeScript", color: "text-blue-400" },
      { icon: <FaReact />, label: "ReactJS", color: "text-cyan-400" },
      { icon: <SiNextdotjs />, label: "Next.js", color: "text-gray-800 dark:text-white" },
      { icon: <SiRedux />, label: "Redux", color: "text-purple-500" },
      { icon: <SiTailwindcss />, label: "TailwindCSS", color: "text-sky-400" },
      { icon: <FaBootstrap />, label: "Bootstrap", color: "text-violet-600" },
    ],
    Backend: [
      { icon: <FaNodeJs />, label: "Node.js", color: "text-green-600" },
      { icon: <SiExpress />, label: "Express.js", color: "text-gray-600" },
      { icon: <SiMongodb />, label: "MongoDB", color: "text-green-500" },
      { icon: <FaPython />, label: "Python", color: "text-yellow-300" },
    ],
    "Tools & Others": [
      { icon: <FaGitAlt />, label: "Git", color: "text-orange-600" },
      { icon: <FaGithub />, label: "GitHub", color: isDark ? "text-white" : "text-black" },
      { icon: <SiC />, label: "C", color: "text-blue-500" },
    ],
  };

  return (
    <div
      className={`min-h-screen px-4 py-16 relative overflow-hidden transition-colors duration-500 ${
        isDark
          ? "bg-gradient-to-br from-black via-slate-900 to-indigo-950"
          : "bg-gradient-to-br from-white via-blue-50 to-indigo-100"
      }`}
    >
      {/* Animated Background Dots */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute w-20 h-20 rounded-full blur-2xl animate-ping ${isDark ? "bg-blue-900" : "bg-blue-200"} top-20 left-10`} />
        <div className={`absolute w-16 h-16 rounded-full blur-2xl animate-pulse ${isDark ? "bg-purple-900" : "bg-purple-200"} bottom-24 right-16`} />
        <div className={`absolute w-24 h-24 rounded-full blur-3xl animate-bounce ${isDark ? "bg-cyan-900" : "bg-cyan-100"} top-1/3 left-1/4`} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-transparent bg-clip-text">
            Tech Stack
          </h2>
          <p className={`max-w-xl mx-auto text-lg ${isDark ? "text-gray-300" : "text-gray-700"}`}>
            A curated set of tools, languages, and frameworks I use to build seamless and scalable applications.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {Object.keys(techCategories).map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border backdrop-blur-sm
                ${
                  selectedCategory === category
                    ? `bg-indigo-600 text-white border-indigo-600 shadow-lg ${
                        isDark ? "shadow-indigo-900/40" : "shadow-indigo-200"
                      } scale-105`
                    : `${
                        isDark
                          ? "bg-slate-800/70 text-gray-300 border-gray-700 hover:bg-slate-700 hover:border-indigo-600"
                          : "bg-white/70 text-gray-700 border-gray-200 hover:bg-indigo-50 hover:border-indigo-300"
                      } hover:scale-105`
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {techCategories[selectedCategory].map((tech, index) => {
            const key = `${selectedCategory}-${index}`;
            const isHovered = hoveredTech === key;
            return (
              <div
                key={key}
                onMouseEnter={() => setHoveredTech(key)}
                onMouseLeave={() => setHoveredTech(null)}
                className={`group relative p-5 rounded-2xl backdrop-blur-sm border transition-all duration-300 cursor-pointer hover:shadow-xl
                  ${
                    isDark
                      ? "bg-slate-800/80 border-gray-700 hover:border-indigo-500 hover:shadow-indigo-900/30"
                      : "bg-white/80 border-gray-200 hover:border-indigo-300 hover:shadow-indigo-100"
                  } ${isHovered ? "scale-105 -translate-y-2" : ""}`}
              >
                {/* Glow on hover */}
                <div
                  className={`absolute inset-0 rounded-2xl transition-opacity duration-300 ${
                    isHovered ? "opacity-100" : "opacity-0"
                  } ${
                    isDark
                      ? "bg-gradient-to-br from-indigo-900/20 to-blue-900/20"
                      : "bg-gradient-to-br from-indigo-50 to-blue-100"
                  }`}
                />

                <div className="relative z-10 flex flex-col items-center text-center">
                  <div
                    className={`text-3xl mb-3 transition-all duration-300 ${
                      isHovered ? "scale-110 rotate-12" : ""
                    } ${tech.color}`}
                  >
                    {tech.icon}
                  </div>
                  <h3 className={`font-semibold text-sm ${isDark ? "text-white" : "text-gray-800"}`}>
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
