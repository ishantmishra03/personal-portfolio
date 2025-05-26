import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../store/themeSlice";
import { Link } from "react-router-dom";
import {
  Home,
  Code,
  Folder,
  Briefcase,
  HelpCircle,
  Mail,
  Menu,
  X,
  Moon,
  Sun,
} from "lucide-react";

const navItems = [
  { icon: Home, label: "Home", id: "home", location: "/" },
  { icon: Code, label: " My Tech Stack", id: "tech", location: "/tech" },
  { icon: Folder, label: "Projects", id: "projects", location: "/projects" },
  {
    icon: Briefcase,
    label: "Experience",
    id: "experience",
    location: "/experience",
  },
  { icon: HelpCircle, label: "FAQ", id: "faq", location: "/faq" },
  { icon: Mail, label: "Contact", id: "contact", location: "/contact" },
];

export default function Navbar() {
  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeItem, setActiveItem] = useState("home");

  // Get theme state from Redux
  const isDark = useSelector((state) => state.theme.isDark);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setExpanded(false);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleItemClick = (id) => {
    setActiveItem(id);
    setExpanded(false);
  };

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleSidebar}
          className={`p-3 rounded-xl backdrop-blur-md border transition-all duration-300 shadow-lg ${
            isDark
              ? "bg-black/20 border-blue-500/30 text-white hover:bg-blue-600/20 hover:shadow-blue-500/20"
              : "bg-white/30 border-blue-400/40 text-gray-800 hover:bg-blue-100/40 hover:shadow-blue-400/20"
          }`}
        >
          {expanded ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {isMobile && expanded && (
        <div
          className={`fixed inset-0 backdrop-blur-sm z-30 md:hidden ${
            isDark ? "bg-black/50" : "bg-white/30"
          }`}
          onClick={() => setExpanded(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen z-40 transition-all duration-500 ease-in-out ${
          isMobile
            ? expanded
              ? "translate-x-0"
              : "-translate-x-full"
            : expanded
            ? "w-64"
            : "w-16"
        } ${isMobile ? "w-64" : ""}`}
        style={{
          background: isDark
            ? "linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(15, 23, 42, 0.9) 50%, rgba(30, 41, 59, 0.8) 100%)"
            : "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 50%, rgba(241, 245, 249, 0.8) 100%)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderRight: isDark
            ? "1px solid rgba(59, 130, 246, 0.2)"
            : "1px solid rgba(59, 130, 246, 0.3)",
          boxShadow: isDark
            ? "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
            : "0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
        }}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between p-4 border-b ${
            isDark ? "border-white/10" : "border-gray-200/50"
          }`}
        >
          <div
            className={`transition-all duration-300 ${
              expanded ? "opacity-100" : "opacity-0"
            }`}
          >
            {expanded && (
              <div className="flex items-center space-x-3">
                <div
                  className={`p-2 rounded-lg flex items-center justify-center hidden md:block ${
                    isDark ? "bg-gray-300" : "bg-gray-800"
                  }`}
                >
                  <span
                    className={`font-bold text-md ${
                      isDark ? "text-black" : "text-white"
                    }`}
                  >
                    <span className="text-blue-600">&lt;</span> IM{" "}
                    <span className="text-blue-600">/&gt;</span>
                  </span>
                </div>
              </div>
            )}
          </div>

          {!isMobile && (
            <button
              onClick={toggleSidebar}
              className={`p-2 rounded-lg transition-all duration-200 ${
                isDark
                  ? "text-gray-300 hover:text-white hover:bg-white/10"
                  : "text-gray-600 hover:text-gray-800 hover:bg-black/10"
              }`}
            >
              <Menu size={18} />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1 mt-6 px-3">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeItem === item.id;

            return (
              <Link
                to={item.location}
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`group relative flex items-center gap-4 p-3 rounded-xl transition-all duration-300 ${
                  isActive
                    ? isDark
                      ? "bg-gradient-to-r from-blue-600/30 to-purple-600/20 text-white shadow-lg shadow-blue-500/20 border border-blue-500/30"
                      : "bg-gradient-to-r from-blue-500/20 to-purple-500/15 text-gray-800 shadow-lg shadow-blue-400/20 border border-blue-400/40"
                    : isDark
                    ? "text-gray-300 hover:text-white hover:bg-white/5 hover:shadow-md"
                    : "text-gray-600 hover:text-gray-800 hover:bg-black/5 hover:shadow-md"
                } ${!expanded && !isMobile ? "justify-center" : ""}`}
              >
                {/* Active indicator */}
                {isActive && (
                  <div
                    className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full ${
                      isDark
                        ? "bg-gradient-to-b from-blue-400 to-purple-500"
                        : "bg-gradient-to-b from-blue-500 to-purple-600"
                    }`}
                  />
                )}

                <div
                  className={`flex-shrink-0 ${
                    isActive ? (isDark ? "text-blue-400" : "text-blue-600") : ""
                  } group-hover:scale-110 transition-transform duration-200`}
                >
                  <IconComponent size={20} />
                </div>

                <span
                  className={`font-medium transition-all duration-300 ${
                    expanded
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-2"
                  } ${!expanded && !isMobile ? "hidden" : ""}`}
                >
                  {item.label}
                </span>

                {/* Tooltip for collapsed state */}
                {!expanded && !isMobile && (
                  <div
                    className={`absolute left-full ml-2 px-3 py-2 text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 border ${
                      isDark
                        ? "bg-gray-900 text-white border-gray-700"
                        : "bg-white text-gray-800 border-gray-300 shadow-lg"
                    }`}
                  >
                    {item.label}
                    <div
                      className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 rotate-45 border-l border-b ${
                        isDark
                          ? "bg-gray-900 border-gray-700"
                          : "bg-white border-gray-300"
                      }`}
                    />
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div
          className={`mt-5 p-2 border-t ${
            isDark ? "border-white/10" : "border-gray-200/50"
          }`}
        >
          <button
            onClick={handleThemeToggle}
            className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all duration-300 ${
              isDark
                ? "text-gray-300 hover:text-white hover:bg-white/5"
                : "text-gray-600 hover:text-gray-800 hover:bg-black/5"
            } ${!expanded && !isMobile ? "justify-center" : ""}`}
          >
            {isDark ? <Moon size={20} /> : <Sun size={20} />}
            <span
              className={`font-medium transition-all duration-300 ${
                expanded ? "opacity-100" : "opacity-0"
              } ${!expanded && !isMobile ? "hidden" : ""}`}
            >
              {isDark ? "Dark Mode" : "Light Mode"}
            </span>
          </button>

          {expanded && (
            <div
              className={`mt-4 pt-4 border-t ${
                isDark ? "border-white/5" : "border-gray-200/30"
              }`}
            >
              <div
                className={`text-xs text-center ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                <p>Frontend Developer</p>
                <p
                  className={`font-medium ${
                    isDark ? "text-blue-400" : "text-blue-600"
                  }`}
                >
                  Dev
                </p>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}