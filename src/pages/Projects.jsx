import React, { useState } from "react";
import { ProjectCard } from "../components";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const Projects = () => {
  const projects = useSelector((state) => state.projects.projects);
  const isDark = useSelector((state) => state.theme.isDark);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  
  const categories = ["all", ...new Set(projects.map(p => p.category).filter(Boolean))];

  
  const filteredProjects = projects.filter(project => {
    const matchesFilter = filter === "all" || project.category === filter;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.technologies?.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };


  //Item variants
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className={`min-h-screen relative overflow-hidden transition-all duration-500 ${
      isDark ? "bg-gray-900" : "bg-gray-50"
    }`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating orbs */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className={`absolute top-20 left-20 w-64 h-64 rounded-full blur-3xl opacity-20 ${
            isDark ? "bg-blue-500" : "bg-blue-400"
          }`}
        />
        
        <motion.div
          animate={{
            x: [0, -150, 0],
            y: [0, 100, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5
          }}
          className={`absolute top-1/2 right-20 w-80 h-80 rounded-full blur-3xl opacity-15 ${
            isDark ? "bg-purple-500" : "bg-purple-400"
          }`}
        />
        
        <motion.div
          animate={{
            x: [0, 80, -80, 0],
            y: [0, -80, 80, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 10
          }}
          className={`absolute bottom-20 left-1/3 w-56 h-56 rounded-full blur-3xl opacity-25 ${
            isDark ? "bg-pink-500" : "bg-pink-400"
          }`}
        />

        {/* Geometric patterns */}
        <div className={`absolute top-0 right-0 w-96 h-96 opacity-5 ${
          isDark ? "text-white" : "text-gray-800"
        }`}>
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Header Section with Glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`sticky top-0 z-20 backdrop-blur-xl border-b transition-all duration-300 ${
            isDark 
              ? "bg-gray-900/70 border-gray-700/50" 
              : "bg-white/70 border-gray-200/50"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Title and Description */}
            <div className="text-center mb-8">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r bg-clip-text text-transparent ${
                  isDark 
                    ? "from-blue-400 via-purple-400 to-pink-400" 
                    : "from-blue-600 via-purple-600 to-pink-600"
                }`}
              >
                Featured Projects
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className={`text-lg md:text-xl max-w-3xl mx-auto ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Explore my collection of innovative projects, showcasing cutting-edge technologies 
                and creative solutions to real-world problems.
              </motion.p>
            </div>

            {/* Filters and Search */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-between items-center"
            >
              {/* Category Filters */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFilter(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 backdrop-blur-sm border ${
                      filter === category
                        ? isDark
                          ? "bg-blue-500/20 text-blue-300 border-blue-400/50"
                          : "bg-blue-100/80 text-blue-700 border-blue-300/60"
                        : isDark
                        ? "bg-gray-800/40 text-gray-300 border-gray-600/30 hover:bg-gray-700/60"
                        : "bg-white/40 text-gray-600 border-gray-300/40 hover:bg-gray-100/60"
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </motion.button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="relative">
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`pl-10 pr-4 py-2 rounded-full text-sm backdrop-blur-sm border transition-all duration-200 focus:outline-none focus:ring-2 w-64 ${
                    isDark
                      ? "bg-gray-800/40 text-white border-gray-600/30 placeholder-gray-400 focus:ring-blue-400/50"
                      : "bg-white/40 text-gray-900 border-gray-300/40 placeholder-gray-500 focus:ring-blue-400/50"
                  }`}
                />
                <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </motion.div>

            {/* Results Count */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
              className={`text-center mt-4 ${isDark ? "text-gray-400" : "text-gray-500"}`}
            >
              <span className="text-sm">
                Showing {filteredProjects.length} of {projects.length} projects
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {filteredProjects.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="h-full cursor-pointer"
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 0 }}
              transition={{ duration: 0.5 }}
              className={`text-center py-20 ${isDark ? "text-gray-400" : "text-gray-500"}`}
            >
              <div className="mb-4">
                <svg className="w-16 h-16 mx-auto opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">No projects found</h3>
              <p className="text-sm">Try adjusting your search or filter criteria</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Floating Action Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 right-8 p-4 rounded-full shadow-2xl backdrop-blur-sm border transition-all duration-200 z-30 ${
          isDark
            ? "bg-gray-800/80 text-white border-gray-600/30 hover:bg-gray-700/90"
            : "bg-white/80 text-gray-800 border-gray-200/40 hover:bg-gray-50/90"
        }`}
        aria-label="Scroll to top"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </motion.button>
    </div>
  );
};

export default Projects;