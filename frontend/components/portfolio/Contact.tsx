"use client";

import { useEffect, useRef, useState } from "react";
import {
  Github,
  Linkedin,
  Mail,
  Send,
  MessageSquare,
  Loader2,
} from "lucide-react";
import { isAxiosError } from "axios";
import api from "@/lib/axios";

export default function Contact() {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);

  /* ------------------------ MOUSE BACKGROUND EFFECT ------------------------ */
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  /* ------------------------ COMMON HANDLE CHANGE ------------------------ */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;

    setFormData((prev) => ({ ...prev, [id]: value }));

    setErrors((prev) => ({ ...prev, [id]: "" }));

    setErrorMessage("");
    setSuccessMessage("");
  };

  /* ------------------------ VALIDATION ------------------------ */
  const validateForm = () => {
    let valid = true;
    const newErrors = { name: "", email: "", message: "" };

    if (!formData.name.trim() || formData.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters.";
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email.";
      valid = false;
    }

    if (!formData.message.trim() || formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  /* ------------------------ HANDLE SUBMIT ------------------------ */
  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");

    if (!validateForm()) return;

     setLoading(true);
    try {
      const { data } = await api.post("/contact", formData);

      if (data.success) {
        setSuccessMessage("Your message has been sent successfully!");

        setFormData({
          name: "",
          email: "",
          message: "",
        });
      }
    } catch (error) {
      let message = "Something went wrong";

      if (isAxiosError(error) && error.response?.data.message) {
        message = error.response.data.message;
      } else if (error instanceof Error) {
        message = error.message;
      }

      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      href: "https://github.com/ishantmishra03",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://linkedin.com/in/ishantmishra03",
    },
    {
      name: "Email",
      icon: Mail,
      href: "mailto:ishantmishra.work@gmail.com",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen py-20 md:py-32 px-4 md:px-6 bg-black overflow-hidden"
    >
      {/* Dynamic background gradient */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: `
            radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, 
              rgba(6, 182, 212, 0.15) 0%, 
              transparent 50%)
          `,
        }}
      />

      {/* Grid background */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="contact-grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="rgba(6, 182, 212, 0.2)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#contact-grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="mb-16 md:mb-24 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px bg-cyan-400 w-12 md:w-20" />
            <span className="text-cyan-400 text-sm md:text-base font-mono">
              LET{"'"}S CONNECT
            </span>
            <div className="h-px bg-cyan-400 w-12 md:w-20" />
          </div>
          <h2
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-4"
            style={{
              textShadow: `
                ${mousePos.x * 0.02}px ${
                mousePos.y * 0.02
              }px 0 rgba(6, 182, 212, 0.5),
                ${-mousePos.x * 0.02}px ${
                -mousePos.y * 0.02
              }px 0 rgba(14, 165, 233, 0.5)
              `,
            }}
          >
            GET IN TOUCH
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Have a project in mind or just want to chat? I{"'"}m always open to
            discussing new opportunities.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* Left side - Contact Form */}
          <div className="order-2 lg:order-1">
            <div className="relative">
              {/* Form container */}
              <div className="relative bg-linear-to-br from-gray-900/50 to-black/50 border-2 border-cyan-400/20 rounded-lg p-6 md:p-8 backdrop-blur-sm">
                <div className="space-y-6">
                  {/* Name input */}
                  <div className="relative group">
                    <label
                      htmlFor="name"
                      className="block text-cyan-400 text-sm font-mono mb-2"
                    >
                      NAME
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-black/50 border border-cyan-400/30 focus:border-cyan-400 text-white px-4 py-3 rounded font-mono outline-none"
                    />
                    {errors.name && (
                      <p className="text-red-400 text-sm mt-1 font-mono">
                        {errors.name}
                      </p>
                    )}
                    <div className="absolute inset-0 bg-cyan-400/5 rounded opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
                  </div>

                  {/* Email input */}
                  <div className="relative group">
                    <label
                      htmlFor="email"
                      className="block text-cyan-400 text-sm font-mono mb-2"
                    >
                      EMAIL
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-black/50 border border-cyan-400/30 focus:border-cyan-400 text-white px-4 py-3 rounded font-mono outline-none"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-sm mt-1 font-mono">
                        {errors.email}
                      </p>
                    )}
                    <div className="absolute inset-0 bg-cyan-400/5 rounded opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
                  </div>

                  {/* Message textarea */}
                  <div className="relative group">
                    <label
                      htmlFor="message"
                      className="block text-cyan-400 text-sm font-mono mb-2"
                    >
                      MESSAGE
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full bg-black/50 border border-cyan-400/30 focus:border-cyan-400 text-white px-4 py-3 rounded font-mono outline-none resize-none"
                    />
                    {errors.message && (
                      <p className="text-red-400 text-sm mt-1 font-mono">
                        {errors.message}
                      </p>
                    )}
                    <div className="absolute inset-0 bg-cyan-400/5 rounded opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
                  </div>

                  {/* Submit button */}
                  <button
                    disabled={loading}
                    onClick={handleSubmit}
                    className="w-full px-8 py-4 bg-cyan-400 hover:bg-white text-black font-bold rounded transition-all flex justify-center items-center gap-2"
                  >
                    {loading ? (
                      <Loader2 className="animate-spin" size={20} />
                    ) : (
                      <>
                        <Send size={20} /> SEND MESSAGE
                      </>
                    )}
                  </button>

                  {/* SUCCESS BOX */}
                  {successMessage && (
                    <div className="mt-4 p-4 rounded border border-green-500/40 bg-green-500/10 text-green-400 font-mono">
                      {successMessage}
                    </div>
                  )}

                  {/* ERROR BOX */}
                  {errorMessage && (
                    <div className="mt-4 p-4 rounded border border-red-500/40 bg-red-500/10 text-red-400 font-mono">
                      {errorMessage}
                    </div>
                  )}
                </div>

                {/* Corner accents */}
                <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-cyan-400/30" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-cyan-400/30" />
              </div>
            </div>
          </div>

          {/* Right side - Contact Info & Social */}
          <div className="order-1 lg:order-2 space-y-8">
            {/* Quick contact card */}
            <div className="relative bg-linear-to-br from-gray-900/50 to-black/50 border-2 border-cyan-400/20 rounded-lg p-6 md:p-8 backdrop-blur-sm">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-cyan-400/10 border-2 border-cyan-400/30 rounded">
                  <MessageSquare className="text-cyan-400" size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Let{"'"}s Talk
                  </h3>
                  <p className="text-gray-400">
                    I{"'"}m always interested in hearing about new projects and
                    opportunities.
                  </p>
                </div>
              </div>

              {/* Direct email link */}
              <a
                href="mailto:ishantmishra.work@gmail.com"
                className="block text-cyan-400 hover:text-white transition-colors duration-300 font-mono text-lg mb-2"
              >
                ishantmishra.work@gmail.com
              </a>
              <p className="text-gray-500 text-sm">
                Response time: Usually within 24 hours
              </p>
            </div>

            {/* Social links */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white mb-4">
                Connect with me
              </h3>
              <div className="space-y-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target={social.name !== "Email" ? "_blank" : undefined}
                      rel={
                        social.name !== "Email"
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="group flex items-center gap-4 p-4 bg-linear-to-r from-gray-900/50 to-black/50 border-2 border-cyan-400/20 rounded-lg hover:border-cyan-400 transition-all duration-300"
                    >
                      <div className="p-3 bg-cyan-400/10 border border-cyan-400/30 group-hover:bg-cyan-400/20 group-hover:border-cyan-400 transition-all duration-300">
                        <Icon className="text-cyan-400" size={20} />
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-bold group-hover:text-cyan-400 transition-colors duration-300">
                          {social.name}
                        </div>
                        <div className="text-gray-500 text-sm">
                          @ishantmishra03
                        </div>
                      </div>
                      <div className="text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        →
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Availability status */}
            <div className="relative bg-linear-to-br from-green-900/20 to-black/50 border-2 border-green-400/30 rounded-lg p-6 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="relative">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                  <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping" />
                </div>
                <span className="text-green-400 font-bold">
                  Available for work
                </span>
              </div>
              <p className="text-gray-400 text-sm">
                Currently accepting new projects and collaborations
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 md:mt-32 pt-8 border-t border-cyan-400/20 text-center">
          <div className="text-cyan-400/60 text-sm mb-2 font-mono">{"</>"}</div>
          <p className="text-gray-500 text-sm">
            Designed & Built by Ishant Mishra | {new Date().getFullYear()}
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <p className="text-gray-600 text-xs font-mono">
              SYSTEM_STATUS: ONLINE
            </p>
          </div>
        </div>
      </div>

      {/* Floating glow effect */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-400 rounded-full blur-[150px] opacity-10 pointer-events-none"
        style={{
          transform: `translate(-50%, 0) translate(${mousePos.x * 0.5}px, ${
            mousePos.y * 0.5
          }px)`,
        }}
      />
    </section>
  );
}
