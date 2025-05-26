import React, {
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect,
} from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const faqs = [
  {
    id: "tech-stack",
    question: "What technologies do you specialize in?",
    answer:
      "I specialize in React, Tailwind CSS, Redux and modern JavaScript ecosystem for building responsive, performant, and scalable web applications. I also work with Node.js and various testing frameworks.",
    category: "technical",
  },
  {
    id: "freelance",
    question: "Are you open to freelance projects?",
    answer:
      "Yes! I'm available for freelance opportunities and long-term collaborations. I work with startups, agencies, and established companies on projects ranging from landing pages to complex web applications.",
    category: "business",
  },
  {
    id: "contact",
    question: "How can I contact you?",
    answer:
      "You can reach me through multiple channels: the contact form on this site, email me directly at kinob17426@daxiake.com, or connect with me on LinkedIn. I typically respond within 24 hours.",
    category: "contact",
  },
  {
    id: "experience",
    question: "Do you have professional experience?",
    answer:
      "I'm actively building my professional portfolio through personal projects, open-source contributions, and continuous learning. While I'm early in my career, I bring fresh perspectives and modern development practices to every project.",
    category: "experience",
  },
  {
    id: "pricing",
    question: "What are your rates and project timelines?",
    answer:
      "Project pricing varies based on scope, complexity, and timeline. I offer competitive rates for quality work and provide detailed estimates after discussing requirements. Typical projects range from 1-8 weeks depending on complexity.",
    category: "business",
  },
  {
    id: "process",
    question: "What's your development process?",
    answer:
      "I follow agile methodologies with regular check-ins, version control with Git, comprehensive testing, and deployment best practices. Projects include discovery, design review, development, testing, and post-launch support.",
    category: "technical",
  },
];

const categoryColors = {
  technical: {
    light: "bg-blue-50 text-blue-700",
    dark: "bg-blue-900/30 text-blue-300",
  },
  business: {
    light: "bg-green-50 text-green-700",
    dark: "bg-green-900/30 text-green-300",
  },
  contact: {
    light: "bg-purple-50 text-purple-700",
    dark: "bg-purple-900/30 text-purple-300",
  },
  experience: {
    light: "bg-orange-50 text-orange-700",
    dark: "bg-orange-900/30 text-orange-300",
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

const expandVariants = {
  collapsed: {
    height: 0,
    opacity: 0,
    paddingTop: 0,
    paddingBottom: 0,
    transition: {
      height: { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] },
      opacity: { duration: 0.3, delay: 0.1 },
    },
  },
  expanded: {
    height: "auto",
    opacity: 1,
    paddingTop: "1rem",
    paddingBottom: "1.5rem",
    transition: {
      height: { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] },
      opacity: { duration: 0.3, delay: 0.1 },
    },
  },
};

export default function FAQ() {
  const isDark = useSelector((state) => state.theme.isDark);
  const [openItems, setOpenItems] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const categories = useMemo(
    () => [...new Set(faqs.map((faq) => faq.category))],
    []
  );

  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesSearch =
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || faq.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const toggleItem = useCallback((id) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  const expandAll = useCallback(() => {
    setOpenItems(new Set(filteredFaqs.map((faq) => faq.id)));
  }, [filteredFaqs]);

  const collapseAll = useCallback(() => {
    setOpenItems(new Set());
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setOpenItems(new Set());
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const themeClasses = {
    container: isDark
      ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100"
      : "bg-gradient-to-br from-gray-50 via-white to-gray-50 text-slate-900",
    searchInput: isDark
      ? "bg-slate-800 border-slate-600 text-white placeholder-slate-400 focus:border-cyan-400 focus:ring-cyan-400/20"
      : "bg-white border-gray-300 text-slate-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500/20",
    categoryButton: (isActive) =>
      isDark
        ? `px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            isActive
              ? "bg-cyan-500 text-slate-900 shadow-lg shadow-cyan-500/25"
              : "bg-slate-700 text-slate-300 hover:bg-slate-600"
          }`
        : `px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            isActive
              ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`,
    faqCard: isDark
      ? "bg-slate-800/60 border-slate-700 hover:bg-slate-800/80 hover:border-slate-600 backdrop-blur-sm"
      : "bg-white/80 border-gray-200 hover:bg-white hover:border-gray-300 backdrop-blur-sm shadow-sm hover:shadow-md",
  };

  return (
    <section
      id="faq"
      ref={containerRef}
      className={`w-full  mx-auto px-4 py-10 md:py-15 transition-all duration-700 ${themeClasses.container}`}
    >
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="space-y-8"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center space-y-4">
          <h2
            className={`text-4xl md:text-6xl font-bold tracking-tight ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            Frequently Asked
            <span
              className={`block ${isDark ? "text-cyan-400" : "text-blue-600"}`}
            >
              Questions
            </span>
          </h2>
          <p
            className={`text-lg md:text-xl max-w-2xl mx-auto ${
              isDark ? "text-slate-300" : "text-slate-600"
            }`}
          >
            Everything you need to know about working with me
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full px-4 py-3 pl-10 rounded-xl border transition-all duration-200 focus:ring-2 focus:outline-none ${themeClasses.searchInput}`}
            />
            <svg
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                isDark ? "text-slate-400" : "text-gray-400"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setSelectedCategory("all")}
              className={themeClasses.categoryButton(
                selectedCategory === "all"
              )}
            >
              All ({faqs.length})
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={themeClasses.categoryButton(
                  selectedCategory === category
                )}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}(
                {faqs.filter((faq) => faq.category === category).length})
              </button>
            ))}
          </div>

          {filteredFaqs.length > 2 && (
            <div className="flex justify-center gap-4">
              <button
                onClick={expandAll}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isDark
                    ? "text-cyan-400 hover:bg-slate-800"
                    : "text-blue-600 hover:bg-blue-50"
                }`}
              >
                Expand All
              </button>
              <button
                onClick={collapseAll}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isDark
                    ? "text-slate-400 hover:bg-slate-800"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                Collapse All
              </button>
            </div>
          )}
        </motion.div>

        {/* FAQ Items */}
        <motion.div variants={itemVariants} className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredFaqs.length === 0 ? (
              <motion.div
                key="no-results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`text-center py-12 ${
                  isDark ? "text-slate-400" : "text-gray-500"
                }`}
              >
                <svg
                  className="w-16 h-16 mx-auto mb-4 opacity-50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 6.306a7.962 7.962 0 00-6 0m6 0V5a2 2 0 00-2-2H9a2 2 0 00-2 2v1.306m8 0V7a2 2 0 012 2v11a2 2 0 01-2 2H7a2 2 0 01-2-2V9a2 2 0 012-2h.306"
                  />
                </svg>
                <p className="text-lg">No FAQs match your search</p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                  }}
                  className={`mt-2 text-sm ${
                    isDark
                      ? "text-cyan-400 hover:text-cyan-300"
                      : "text-blue-600 hover:text-blue-700"
                  }`}
                >
                  Clear filters
                </button>
              </motion.div>
            ) : (
              filteredFaqs.map((faq, index) => {
                const isOpen = openItems.has(faq.id);
                const categoryColor = categoryColors[faq.category];

                return (
                  <motion.div
                    key={faq.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                    className={`border rounded-2xl overflow-hidden transition-all duration-300 ${themeClasses.faqCard}`}
                  >
                    <button
                      onClick={() => toggleItem(faq.id)}
                      className="w-full p-6 text-left focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 group"
                      aria-expanded={isOpen}
                      aria-controls={`answer-${faq.id}`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-3">
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded-md ${
                                isDark
                                  ? categoryColor.dark
                                  : categoryColor.light
                              }`}
                            >
                              {faq.category}
                            </span>
                          </div>
                          <h3
                            className={`font-semibold text-lg leading-relaxed transition-colors ${
                              isOpen
                                ? isDark
                                  ? "text-cyan-400"
                                  : "text-blue-600"
                                : isDark
                                ? "text-white group-hover:text-cyan-400"
                                : "text-slate-900 group-hover:text-blue-600"
                            }`}
                          >
                            {faq.question}
                          </h3>
                        </div>

                        <motion.div
                          animate={{ rotate: isOpen ? 45 : 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 15,
                          }}
                          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                            isOpen
                              ? isDark
                                ? "bg-cyan-500 text-slate-900"
                                : "bg-blue-500 text-white"
                              : isDark
                              ? "bg-slate-700 text-slate-300 group-hover:bg-slate-600"
                              : "bg-gray-100 text-gray-600 group-hover:bg-gray-200"
                          }`}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                          >
                            <path d="M8 2a1 1 0 0 1 1 1v4h4a1 1 0 1 1 0 2H9v4a1 1 0 1 1-2 0V9H3a1 1 0 1 1 0-2h4V3a1 1 0 0 1 1-1Z" />
                          </svg>
                        </motion.div>
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial="collapsed"
                          animate="expanded"
                          exit="collapsed"
                          variants={expandVariants}
                          id={`answer-${faq.id}`}
                          className={`px-6 overflow-hidden ${
                            isDark ? "text-slate-300" : "text-slate-700"
                          }`}
                        >
                          <div
                            className={`border-t pt-4 ${
                              isDark ? "border-slate-700" : "border-gray-200"
                            }`}
                          >
                            <p className="text-base leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          variants={itemVariants}
          className={`text-center p-8 rounded-2xl ${
            isDark
              ? "bg-gradient-to-r from-slate-800 to-slate-700 border border-slate-600"
              : "bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100"
          }`}
        >
          <h3
            className={`text-2xl font-bold mb-3 ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            Still have questions?
          </h3>
          <p className={`mb-6 ${isDark ? "text-slate-300" : "text-slate-600"}`}>
            Don't hesitate to reach out. I'm here to help!
          </p>
          <Link to="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-200 cursor-pointer ${
                isDark
                  ? "bg-cyan-500 text-slate-900 hover:bg-cyan-400 shadow-lg shadow-cyan-500/25"
                  : "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/25"
              }`}
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Get in Touch
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
