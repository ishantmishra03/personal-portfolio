import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const DevContentSections = () => {
  const [terminalText, setTerminalText] = useState("");
  const isDark = useSelector((state) => state.theme.isDark);

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  useEffect(() => {
    const commands = [
      "git checkout -b feature/auth",
      "npm install express mongoose cors",
      "nodemon server.js",
      "curl -X GET https://api.mydomain.com/health",
    ];

    let currentCommand = 0;
    let currentChar = 0;

    const typeCommand = () => {
      if (currentChar < commands[currentCommand].length) {
        setTerminalText(commands[currentCommand].slice(0, currentChar + 1));
        currentChar++;
        setTimeout(typeCommand, 80);
      } else {
        setTimeout(() => {
          currentCommand = (currentCommand + 1) % commands.length;
          currentChar = 0;
          setTerminalText("");
          typeCommand();
        }, 2000);
      }
    };

    typeCommand();
  }, []);

  return (
    <div
      className={`${
        isDark ? "bg-black text-white" : "bg-white text-gray-900"
      } transition-colors duration-300`}
    >
      {/* Terminal Section */}
      <section className="pt-20 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className={isDark ? "text-gray-400" : "text-gray-500"}>
                //
              </span>{" "}
              Currently Working On
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div
              className={`${
                isDark
                  ? "bg-gray-900 border-gray-800"
                  : "bg-gray-50 border-gray-200"
              } rounded-lg border shadow-2xl`}
            >
              {/* Terminal Header */}
              <div
                className={`flex items-center justify-between px-4 py-3 ${
                  isDark ? "bg-gray-800" : "bg-gray-100"
                } rounded-t-lg`}
              >
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span
                    className={`${
                      isDark ? "text-gray-400" : "text-gray-600"
                    } text-sm ml-4`}
                  >
                    terminal
                  </span>
                </div>
                <div
                  className={`${
                    isDark ? "text-gray-500" : "text-gray-500"
                  } text-xs`}
                >
                  ishant@portfolio:~/
                </div>
              </div>

              {/* Terminal Content */}
              <div className="p-6 font-mono">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-green-400">$</span>
                  <span className={isDark ? "text-white" : "text-gray-900"}>
                    {terminalText}
                  </span>
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className={`${
                      isDark
                        ? "text-white bg-white"
                        : "text-gray-900 bg-gray-900"
                    } w-2 h-5 inline-block`}
                  />
                </div>

                <div
                  className={`${
                    isDark ? "text-gray-400" : "text-gray-600"
                  } text-sm space-y-1`}
                >
                  <div>✓ Architecting scalable MERN stack systems</div>
                  <div>✓ Implementing secure JWT-based authentication</div>
                  <div>✓ Developing RESTful APIs & MongoDB schemas</div>
                  <div className="text-green-400">
                    ✓ Continuously improving backend performance
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Code Philosophy */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Development <span className="text-blue-500">Philosophy</span>
            </h2>

            <div
              className={`${
                isDark
                  ? "bg-gray-900 border-gray-800"
                  : "bg-gray-50 border-gray-200"
              } rounded-lg border p-8 text-left shadow-sm`}
            >
              <div
                className={`font-mono text-sm ${
                  isDark ? "text-gray-400" : "text-gray-600"
                } mb-4`}
              >
                <span className="text-blue-400">function</span>{" "}
                <span className="text-yellow-400">buildWithPurpose</span>(){" "}
                {"{"}
              </div>

              <div
                className={`pl-4 space-y-3 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                <div className="flex items-start space-x-3">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>Craft solutions that are robust and scalable</span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>Prioritize readability and testability in code</span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>Build APIs with performance and security in mind</span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>
                    Stay up-to-date with modern web technologies and patterns
                  </span>
                </div>
              </div>

              <div
                className={`font-mono text-sm ${
                  isDark ? "text-gray-400" : "text-gray-600"
                } mt-4`}
              >
                {"}"}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section
        className={`py-20 ${
          isDark
            ? "bg-gradient-to-r from-blue-600/10 to-purple-600/10"
            : "bg-gradient-to-r from-blue-100/50 to-purple-100/50"
        }`}
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Let's Build Something{" "}
              <span className="text-blue-500">Professional</span>
            </h2>
            <p
              className={`${
                isDark ? "text-gray-400" : "text-gray-600"
              } text-lg mb-8 max-w-2xl mx-auto`}
            >
              Looking for a reliable developer who bridges frontend aesthetics
              with backend architecture? I’d love to hear about your project.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)",
                }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-none relative overflow-hidden group transition-all duration-300"
              >
                <Link to="/contact">
                  <span className="relative z-10">Start a Project</span>
                </Link>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className={`px-8 py-4 border ${
                  isDark
                    ? "border-gray-600 hover:border-blue-500 text-gray-300 hover:text-white"
                    : "border-gray-300 hover:border-blue-500 text-gray-700 hover:text-gray-900"
                } font-semibold rounded-none transition-all duration-300`}
              >
                View Resume
              </motion.button>
            </div>

            <div
              className={`mt-8 flex justify-center space-x-6 ${
                isDark ? "text-gray-500" : "text-gray-600"
              }`}
            >
              {["GitHub", "LinkedIn"].map((platform) => (
                <motion.a
                  key={platform}
                  href="https://github.com/ishantmishra03"
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{
                    scale: 1.1,
                    color: "#3B82F6",
                  }}
                  className="hover:text-blue-400 transition-colors duration-300"
                >
                  {platform}
                </motion.a>
              ))}
            </div>
          </motion.div>
          <p className="mt-10 text-sm opacity-60">© 2025 Ishant Mishra</p>
        </div>
      </section>
    </div>
  );
};

export default DevContentSections;
