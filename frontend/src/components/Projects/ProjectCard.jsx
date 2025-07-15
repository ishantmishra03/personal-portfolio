import React, { useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaCode, FaEye } from "react-icons/fa";

const ProjectCard = ({ project }) => {
  const isDark = useSelector((state) => state.theme.isDark);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => setImageLoaded(true);
  const handleImageError = () => setImageError(true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`group relative overflow-hidden rounded-2xl border backdrop-blur-sm transition-all duration-500 h-full ${
        isDark
          ? "bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90 border-gray-700/50 shadow-2xl "
          : "bg-gradient-to-br from-white/90 via-gray-50/90 to-white/90 border-gray-200/50 shadow-xl"
      }`}
    >
      {/* Animated border gradient */}
      <div
        className={`absolute inset-0 rounded-2xl opacity-0  transition-opacity duration-500 bg-gradient-to-r ${
          isDark
            ? "from-blue-500/10 via-purple-500/10 to-pink-500/10"
            : "from-blue-200/20 via-purple-200/20 to-pink-200/20"
        }`}
      />

      <div className="relative p-6 h-full flex flex-col">
        {/* Image Container */}
        <div className="relative mb-6 overflow-hidden rounded-xl">
          <motion.div className="relative">
            {!imageError ? (
              <>
                <img
                  src={project.image}
                  alt={`${project.title} preview`}
                  className={`w-full h-48 sm:h-52 md:h-48 lg:h-52 object-cover object-top transition-all duration-500 ${
                    imageLoaded ? "opacity-100 blur-0" : "opacity-0 blur-sm"
                  }`}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                />
                {!imageLoaded && (
                  <div
                    className={`absolute inset-0 flex items-center justify-center ${
                      isDark ? "bg-gray-800" : "bg-gray-100"
                    }`}
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className={`w-8 h-8 border-2 border-t-transparent rounded-full ${
                        isDark ? "border-blue-400" : "border-blue-600"
                      }`}
                    />
                  </div>
                )}
              </>
            ) : (
              <div
                className={`w-full h-48 sm:h-52 md:h-48 lg:h-52 flex items-center justify-center rounded-xl ${
                  isDark
                    ? "bg-gray-800 text-gray-400"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                <div className="text-center">
                  <div className="text-3xl mb-2">🖼️</div>
                  <p className="text-sm font-medium">Preview Unavailable</p>
                </div>
              </div>
            )}

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />

            {/* Hover overlay with quick actions */}
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              {project.github && (
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-black/70 text-white rounded-full backdrop-blur-sm hover:bg-black/80 transition-colors"
                  aria-label="View source code"
                >
                  <FaCode className="w-4 h-4" />
                </motion.a>
              )}
              {project.demo && (
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-blue-600/80 text-white rounded-full backdrop-blur-sm hover:bg-blue-600 transition-colors"
                  aria-label="View live demo"
                >
                  <FaEye className="w-4 h-4" />
                </motion.a>
              )}
            </motion.div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col">
          {/* Header with title and status */}
          <div className="flex items-start justify-between mb-3">
            <motion.h3
              whileHover={{ color: isDark ? "#60a5fa" : "#2563eb" }}
              className={`text-xl sm:text-2xl font-bold leading-tight cursor-default ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              {project.title}
            </motion.h3>

            {project.status && (
              <div
                className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${
                  project.status === "completed"
                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                    : project.status === "in-progress"
                    ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                    : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                }`}
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className={`w-1.5 h-1.5 rounded-full ${
                    project.status === "completed"
                      ? "bg-green-500"
                      : project.status === "in-progress"
                      ? "bg-yellow-500"
                      : "bg-gray-500"
                  }`}
                />
                <span className="capitalize">{project.status}</span>
              </div>
            )}
          </div>

          {/* Description */}
          <p
            className={`text-sm sm:text-base leading-relaxed mb-5 flex-1 ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies?.map((tech, idx) => (
              <motion.span
                key={idx}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`text-xs font-medium px-3 py-1.5 rounded-full border cursor-default transition-all duration-200 ${
                  isDark
                    ? "bg-blue-500/10 text-blue-300 border-blue-400/30 hover:bg-blue-500/20 hover:border-blue-400/50"
                    : "bg-blue-50 text-blue-700 border-blue-200/60 hover:bg-blue-100 hover:border-blue-300"
                }`}
              >
                {tech}
              </motion.span>
            ))}
          </div>

          {/* Action Links */}
          <div
            className={`flex items-center gap-3 pt-5 border-t ${
              isDark ? "border-gray-700/50" : "border-gray-200/60"
            }`}
          >
            {project.github && (
              <motion.a
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 flex-1 justify-center ${
                  isDark
                    ? "bg-gray-800/60 text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-700/30 hover:border-gray-600"
                    : "bg-gray-100/80 text-gray-700 hover:bg-gray-200 hover:text-gray-900 border border-gray-200/50 hover:border-gray-300"
                }`}
                aria-label="View source code on GitHub"
              >
                <FaGithub className="w-4 h-4" />
                <span>Code</span>
              </motion.a>
            )}

            {project.demo && (
              <motion.a
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 flex-1 justify-center bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-500 hover:to-blue-600 shadow-lg hover:shadow-blue-500/25"
                aria-label="View live demo"
              >
                <FaExternalLinkAlt className="w-3.5 h-3.5" />
                <span>Demo</span>
              </motion.a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
