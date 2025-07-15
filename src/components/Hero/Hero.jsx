import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [typedText, setTypedText] = useState("");
  const [currentRole, setCurrentRole] = useState(0);
  
 
  const isDark = useSelector((state) => state.theme.isDark); 
  
 const roles = [
  "Full Stack Developer",
  "MERN Stack Developer",
  "React Developer",
  "Node.js Backend Developer",
];

  
  // Mouse tracking for 3D effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 30, stiffness: 200 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);
  
  const rotateX = useTransform(y, [-200, 200], [15, -15]);
  const rotateY = useTransform(x, [-200, 200], [-15, 15]);

  // Auto-typing effect
  useEffect(() => {
    let timeout;
    const currentText = roles[currentRole];
    
    if (typedText.length < currentText.length) {
      timeout = setTimeout(() => {
        setTypedText(currentText.slice(0, typedText.length + 1));
      }, 100);
    } else {
      timeout = setTimeout(() => {
        setTypedText("");
        setCurrentRole((prev) => (prev + 1) % roles.length);
      }, 2000);
    }
    
    return () => clearTimeout(timeout);
  }, [typedText, currentRole]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = e.currentTarget?.getBoundingClientRect() || { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight };
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      mouseX.set((e.clientX - centerX) * 0.3);
      mouseY.set((e.clientY - centerY) * 0.3);
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className={`relative min-h-screen ${isDark ? 'bg-black' : 'bg-white'} overflow-hidden pt-22 md:p-5`}>
      {/* Dynamic Grid Background */}
      <div className="absolute inset-0">
        <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-br from-black via-gray-900 to-black' : 'bg-gradient-to-br from-white via-gray-100 to-white'}`} />
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(${isDark ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.2)'} 1px, transparent 1px),
              linear-gradient(90deg, ${isDark ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.2)'} 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
          }}
        />
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
          className={`absolute top-20 right-20 w-32 h-32 border ${isDark ? 'border-blue-500/20' : 'border-blue-600/30'} rounded-full`}
        />
        
        <motion.div
          animate={{
            rotate: [0, -360],
            x: [0, 30, 0],
            y: [0, -20, 0]
          }}
          transition={{
            rotate: { duration: 25, repeat: Infinity, ease: "linear" },
            x: { duration: 8, repeat: Infinity, ease: "easeInOut" },
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }}
          className={`absolute bottom-32 left-16 w-16 h-16 border-2 ${isDark ? 'border-blue-400/30' : 'border-blue-500/40'} rotate-45`}
        />

        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{
            scale: { duration: 5, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 15, repeat: Infinity, ease: "linear" }
          }}
          className={`absolute top-1/3 left-1/4 w-6 h-24 ${isDark ? 'bg-gradient-to-b from-blue-500/40 to-transparent' : 'bg-gradient-to-b from-blue-600/50 to-transparent'}`}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content - Text */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Code-like intro */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className={`font-mono text-sm ${isDark ? 'text-blue-400' : 'text-blue-600'}`}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <span className={isDark ? 'text-gray-500' : 'text-gray-400'}>01</span>
                  <span className={isDark ? 'text-gray-600' : 'text-gray-500'}>// Initializing developer...</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={isDark ? 'text-gray-500' : 'text-gray-400'}>02</span>
                  <span className={isDark ? 'text-white' : 'text-gray-800'}>const</span>
                  <span className={isDark ? 'text-blue-400' : 'text-blue-600'}>developer</span>
                  <span className={isDark ? 'text-white' : 'text-gray-800'}>=</span>
                  <span className={isDark ? 'text-green-400' : 'text-green-600'}>"Ishant Mishra"</span>
                </div>
              </motion.div>

              {/* Main Name */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <h1 className={`text-6xl md:text-8xl font-black ${isDark ? 'text-white' : 'text-gray-900'} leading-none`}>
                  ISHANT
                  <span className={`block text-transparent ${isDark ? 'bg-gradient-to-r from-blue-400 to-blue-600' : 'bg-gradient-to-r from-blue-600 to-blue-800'} bg-clip-text`}>
                    MISHRA
                  </span>
                </h1>
              </motion.div>

              {/* Auto-typing role */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="h-16 flex items-center"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 ${isDark ? 'bg-blue-500' : 'bg-blue-600'} rounded-full animate-pulse`} />
                  <span className={`text-2xl md:text-3xl font-light ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {typedText}
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className={isDark ? 'text-blue-400 ml-1' : 'text-blue-600 ml-1'}
                    >
                      |
                    </motion.span>
                  </span>
                </div>
              </motion.div>

              {/* Unique description */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="space-y-4"
              >
                <p className={`text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'} max-w-xl leading-relaxed`}>
                  Crafting digital experiences where 
                  <span className={`${isDark ? 'text-blue-400' : 'text-blue-600'} font-semibold`}> innovation meets functionality</span>. 
                  I transform complex problems into elegant solutions through code, design, and systematic thinking.
                </p>
                
                <div className={`flex items-center space-x-6 text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span>Available for projects</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 ${isDark ? 'bg-blue-500' : 'bg-blue-600'} rounded-full`} />
                    <span>Always ready for new ideas</span>
                  </div>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="flex flex-wrap gap-4 pt-4"
              >
                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: isDark ? "0 0 30px rgba(59, 130, 246, 0.5)" : "0 0 30px rgba(59, 130, 246, 0.3)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  className={`px-8 py-4 ${isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} text-white font-semibold rounded-none relative overflow-hidden group transition-all duration-300`}
                >
                  <Link to="/projects"><span className="relative z-10 cursor-pointer">Explore Work</span></Link>
                  <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-r from-blue-600 to-blue-800' : 'bg-gradient-to-r from-blue-700 to-blue-900'} transform translate-x-full group-hover:translate-x-0 transition-transform duration-300`} />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className={`px-8 py-4 border ${isDark ? 'border-gray-600 hover:border-blue-500 text-gray-300 hover:text-white' : 'border-gray-400 hover:border-blue-600 text-gray-700 hover:text-gray-900'} font-semibold rounded-none transition-all duration-300 relative group`}
                >
                 <Link to="/contact"> <span className="relative z-10 cursor-pointer">Get In Touch</span></Link>
                  <div className={`absolute inset-0 ${isDark ? 'bg-blue-600/10' : 'bg-blue-600/20'} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />
                </motion.button>
              </motion.div>
            </div>

            {/* Right Content - 3D Profile */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <motion.div
                style={{ rotateX, rotateY }}
                className="relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                {/* Main Profile Container */}
                <div className="relative w-80 h-80 md:w-96 md:h-96">
                  
                  {/* Hexagonal Frame */}
                  <motion.div
                    animate={{
                      rotate: [0, 360]
                    }}
                    transition={{
                      duration: 30,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className={`absolute inset-0 border-2 ${isDark ? 'border-blue-500/30' : 'border-blue-600/40'}`}
                    style={{
                      clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)"
                    }}
                  />

                  {/* Inner rotating rings */}
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className={`absolute inset-4 border ${isDark ? 'border-blue-400/20' : 'border-blue-500/30'} rounded-full`}
                  />
                  
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className={`absolute inset-8 border ${isDark ? 'border-gray-600/30' : 'border-gray-400/40'} rounded-full`}
                  />

                  {/* Profile Image */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className={`absolute inset-12 rounded-full overflow-hidden border-4 ${isDark ? 'border-blue-500/50 shadow-2xl shadow-blue-500/20' : 'border-blue-600/60 shadow-2xl shadow-blue-600/30'}`}
                  >
                    <div className={`w-full h-full ${isDark ? 'bg-gradient-to-br from-gray-800 to-black' : 'bg-gradient-to-br from-gray-200 to-gray-300'} relative`}>
                      <img
                        src="/favicon.png"
                        alt="Ishant Mishra"
                        className="w-full h-full object-cover"
                      />
                      {/* Overlay gradient */}
                      <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-t from-black/50 via-transparent to-transparent' : 'bg-gradient-to-t from-white/30 via-transparent to-transparent'}`} />
                    </div>
                  </motion.div>

                  {/* Floating Tech Indicators */}
                  <motion.div
                    animate={{
                      y: [-15, 15, -15],
                      rotate: [0, 180, 360]
                    }}
                    transition={{
                      y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                      rotate: { duration: 8, repeat: Infinity, ease: "linear" }
                    }}
                    className={`absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 ${isDark ? 'bg-black border border-blue-500 text-blue-400' : 'bg-white border border-blue-600 text-blue-600'} flex items-center justify-center font-mono text-sm shadow-lg`}
                  >
                    &lt;/&gt;
                  </motion.div>

                  <motion.div
                    animate={{
                      x: [-20, 20, -20],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{
                      x: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                      scale: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }
                    }}
                    className={`absolute top-1/4 -right-8 w-8 h-8 ${isDark ? 'bg-blue-600' : 'bg-blue-700'} flex items-center justify-center text-white text-xs font-bold shadow-lg`}
                  >
                    UI
                  </motion.div>

                  <motion.div
                    animate={{
                      y: [20, -20, 20],
                      rotate: [0, -90, -180]
                    }}
                    transition={{
                      y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                      rotate: { duration: 12, repeat: Infinity, ease: "linear" }
                    }}
                    className={`absolute bottom-1/4 -left-6 w-10 h-6 ${isDark ? 'bg-gradient-to-r from-blue-600 to-blue-800' : 'bg-gradient-to-r from-blue-700 to-blue-900'} flex items-center justify-center text-white text-xs font-mono shadow-lg`}
                  >
                    DEV
                  </motion.div>

                  {/* Data visualization elements */}
                  <motion.div
                    animate={{
                      scaleY: [1, 1.5, 1, 0.8, 1]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute -bottom-8 left-1/4 flex space-x-1"
                  >
                    {[1, 2, 3, 4, 5].map((i) => (
                      <motion.div
                        key={i}
                        animate={{
                          scaleY: [0.5, 1.5, 0.8, 1.2, 0.5]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: i * 0.1
                        }}
                        className={`w-2 h-8 ${isDark ? 'bg-blue-500/60' : 'bg-blue-600/70'}`}
                      />
                    ))}
                  </motion.div>
                </div>

                {/* Network connections */}
                <svg 
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  style={{ filter: `drop-shadow(0 0 10px rgba(59, 130, 246, ${isDark ? '0.3' : '0.4'}))` }}
                >
                  <motion.line
                    x1="20%" y1="30%"
                    x2="80%" y2="70%"
                    stroke={isDark ? "rgb(59 130 246 / 0.4)" : "rgb(59 130 246 / 0.5)"}
                    strokeWidth="1"
                    strokeDasharray="5,5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.line
                    x1="80%" y1="30%"
                    x2="20%" y2="70%"
                    stroke={isDark ? "rgb(59 130 246 / 0.3)" : "rgb(59 130 246 / 0.4)"}
                    strokeWidth="1"
                    strokeDasharray="3,7"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  />
                </svg>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2"
      >
        <span className={`${isDark ? 'text-gray-500' : 'text-gray-500'} text-xs font-mono`}>SCROLL</span>
        <div className={`w-px h-8 ${isDark ? 'bg-gradient-to-b from-blue-500 to-transparent' : 'bg-gradient-to-b from-blue-600 to-transparent'}`} />
      </motion.div>
    </div>
  );
};

export default HeroSection;