"use client";

import { useEffect, useRef, useState } from "react";
import {
  Github,
  Linkedin,
  Mail,
  Send,
  MessageSquare,
  Loader2,
  Terminal,
  CheckCircle2,
  AlertCircle,
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
  const [isFocused, setIsFocused] = useState(""); // Track which input is focused

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

  /* ------------------------ FORM HANDLERS ------------------------ */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: "" }));
    setErrorMessage("");
    setSuccessMessage("");
  };

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

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    if (!validateForm()) return;

    setLoading(true);
    try {
      const { data } = await api.post("/contact", formData);
      if (data.success) {
        setSuccessMessage("Message transmitted successfully.");
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (error) {
      let message = "Transmission failed.";
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
      handle: "@ishantmishra03",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://linkedin.com/in/ishantmishra03",
      handle: "Ishant Mishra",
    },
    {
      name: "Email",
      icon: Mail,
      href: "mailto:ishantmishra.work@gmail.com",
      handle: "ishantmishra.work@gmail.com",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen py-24 px-4 md:px-6 bg-neutral-950 overflow-hidden"
    >
      {/* --- Background FX --- */}
      <div
        className="absolute inset-0 opacity-30 transition-all duration-500 ease-out pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at ${mousePos.x}% ${
            mousePos.y
          }%, rgba(6, 182, 212, 0.1) 0%, transparent 60%),
            radial-gradient(circle at ${100 - mousePos.x}% ${
            100 - mousePos.y
          }%, rgba(59, 130, 246, 0.1) 0%, transparent 60%)
          `,
        }}
      />

      {/* CRT Noise & Grid */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-soft-light" />
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #06b6d4 1px, transparent 1px), linear-gradient(to bottom, #06b6d4 1px, transparent 1px)`,
          backgroundSize: "4rem 4rem",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* --- Header --- */}
        <div className="mb-20 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/30 border border-cyan-500/30 backdrop-blur-md mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="text-xs font-mono text-cyan-300">
              OPEN_TO_WORK
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
            GET IN{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              TOUCH
            </span>
          </h2>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto border-l-2 border-cyan-500/20 pl-4">
            Initialize a conversation. Whether it's a project proposal or just a
            tech chat.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* --- Left: Form (Terminal Style) --- */}
          <div className="order-2 lg:order-1 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500" />

            <div className="relative bg-black/80 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-6 md:p-8">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 mb-8 border-b border-white/10 pb-4">
                <Terminal size={16} className="text-cyan-400" />
                <span className="text-xs text-gray-500 font-mono">
                  contact_form.exe
                </span>
              </div>

              <div className="space-y-6">
                {/* Name */}
                <div className="relative">
                  <label
                    htmlFor="name"
                    className={`block text-xs font-mono mb-2 transition-colors ${
                      isFocused === "name" ? "text-cyan-400" : "text-gray-500"
                    }`}
                  >
                    &gt; ENTER_NAME:
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setIsFocused("name")}
                    onBlur={() => setIsFocused("")}
                    className="w-full bg-white/5 border border-white/10 focus:border-cyan-500/50 text-white px-4 py-3 rounded outline-none transition-all font-mono"
                    placeholder="_"
                  />
                  {errors.name && (
                    <p className="text-red-400 text-xs mt-1 font-mono flex items-center gap-1">
                      <AlertCircle size={10} /> {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="relative">
                  <label
                    htmlFor="email"
                    className={`block text-xs font-mono mb-2 transition-colors ${
                      isFocused === "email" ? "text-cyan-400" : "text-gray-500"
                    }`}
                  >
                    &gt; ENTER_EMAIL:
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setIsFocused("email")}
                    onBlur={() => setIsFocused("")}
                    className="w-full bg-white/5 border border-white/10 focus:border-cyan-500/50 text-white px-4 py-3 rounded outline-none transition-all font-mono"
                    placeholder="_"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1 font-mono flex items-center gap-1">
                      <AlertCircle size={10} /> {errors.email}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div className="relative">
                  <label
                    htmlFor="message"
                    className={`block text-xs font-mono mb-2 transition-colors ${
                      isFocused === "message"
                        ? "text-cyan-400"
                        : "text-gray-500"
                    }`}
                  >
                    &gt; MESSAGE_BODY:
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setIsFocused("message")}
                    onBlur={() => setIsFocused("")}
                    className="w-full bg-white/5 border border-white/10 focus:border-cyan-500/50 text-white px-4 py-3 rounded outline-none transition-all font-mono resize-none"
                    placeholder="_"
                  />
                  {errors.message && (
                    <p className="text-red-400 text-xs mt-1 font-mono flex items-center gap-1">
                      <AlertCircle size={10} /> {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <button
                  disabled={loading}
                  onClick={handleSubmit}
                  className="w-full group/btn relative px-8 py-4 bg-cyan-500 text-black font-bold uppercase tracking-wider overflow-hidden hover:bg-cyan-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4 clip-path-polygon"
                  style={{
                    clipPath:
                      "polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)",
                  }}
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                  <span className="relative flex items-center justify-center gap-2">
                    {loading ? (
                      <Loader2 className="animate-spin" size={18} />
                    ) : (
                      <Send size={18} />
                    )}
                    {loading ? "TRANSMITTING..." : "SEND_MESSAGE"}
                  </span>
                </button>

                {/* Status Messages */}
                {successMessage && (
                  <div className="p-3 bg-green-500/10 border border-green-500/20 rounded text-green-400 text-xs font-mono flex items-center gap-2">
                    <CheckCircle2 size={14} /> {successMessage}
                  </div>
                )}
                {errorMessage && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 rounded text-red-400 text-xs font-mono flex items-center gap-2">
                    <AlertCircle size={14} /> {errorMessage}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* --- Right: Contact Info & Socials --- */}
          <div className="order-1 lg:order-2 space-y-8">
            {/* Quick Contact Card */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 backdrop-blur-md">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-cyan-500/10 rounded-lg text-cyan-400">
                  <MessageSquare size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Direct Line</h3>
                  <p className="text-xs text-gray-400 font-mono">
                    Response time: ~24hrs
                  </p>
                </div>
              </div>
              <a
                href="mailto:ishantmishra.work@gmail.com"
                className="text-xl md:text-2xl font-mono text-cyan-400 hover:text-white transition-colors break-all"
              >
                ishantmishra.work@gmail.com
              </a>
            </div>

            {/* Social Stack */}
            <div className="space-y-4">
              <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-4">
                Network Protocols
              </h3>
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
                    className="group flex items-center justify-between p-4 bg-white/5 border border-white/5 hover:border-cyan-500/50 hover:bg-cyan-500/5 rounded-lg transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <Icon
                        className="text-gray-400 group-hover:text-cyan-400 transition-colors"
                        size={20}
                      />
                      <div>
                        <div className="text-white font-bold text-sm">
                          {social.name}
                        </div>
                        <div className="text-gray-500 text-xs font-mono">
                          {social.handle}
                        </div>
                      </div>
                    </div>
                    <div className="text-cyan-500/50 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all">
                      &rarr;
                    </div>
                  </a>
                );
              })}
            </div>

            {/* System Status */}
            <div className="flex items-center justify-between p-4 rounded bg-green-900/10 border border-green-500/20">
              <div className="flex items-center gap-3">
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </div>
                <span className="text-green-400 text-sm font-bold">
                  System Operational
                </span>
              </div>
              <span className="text-xs text-green-500/60 font-mono">
                v2.4.0
              </span>
            </div>
          </div>
        </div>

        {/* --- Footer --- */}
        <div className="mt-32 border-t border-white/5 pt-8 flex flex-col items-center">
          <p className="font-mono text-cyan-500 text-sm mb-2">{`</>`}</p>
          <p className="text-gray-500 text-sm">
            Built by Ishant Mishra © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </section>
  );
}
