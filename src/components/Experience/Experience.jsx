// Experience.jsx
import React from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

export default function Experience() {
  const isDark = useSelector((state) => state.theme.isDark);

  return (
    <section
      id="experience"
      className={`w-full min-h-screen flex items-center justify-center relative overflow-hidden transition-colors duration-500 ${
        isDark ? "bg-black" : "bg-white"
      }`}
    >
      {/* Background Visual */}
      <div
        className={`absolute inset-0 z-0 pointer-events-none ${
          isDark
            ? "bg-gradient-to-br from-black via-blue-900 to-black opacity-40"
            : "bg-gradient-to-br from-white via-blue-100 to-white opacity-40"
        }`}
      ></div>

      {/* Light mode animated blob */}
      {!isDark && (
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <motion.div
            animate={{
              x: ["0%", "15%", "0%"],
              y: ["0%", "10%", "0%"],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
            className="absolute w-[400px] h-[400px] bg-cyan-400 rounded-full filter blur-3xl opacity-30 top-20 left-10"
          />
          <motion.div
            animate={{
              x: ["0%", "-15%", "0%"],
              y: ["0%", "-10%", "0%"],
              scale: [1, 0.9, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
            className="absolute w-[300px] h-[300px] bg-blue-400 rounded-full filter blur-2xl opacity-25 bottom-10 right-20"
          />
        </div>
      )}

      {/* Content */}
      <div className="absolute z-10 text-center px-4 max-w-xl">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`text-4xl md:text-6xl font-bold drop-shadow-xl ${
            isDark ? "text-white" : "text-slate-900"
          }`}
        >
          Still Learning
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
          className="mt-4 h-1 w-32 mx-auto bg-cyan-400 origin-left rounded-full shadow-md"
        />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className={`mt-4 max-w-md mx-auto ${
            isDark ? "text-slate-300" : "text-slate-600"
          }`}
        >
          I haven’t worked professionally yet, but I’m constantly learning, building, and improving my skills every day.
        </motion.p>
      </div>
    </section>
  );
}
