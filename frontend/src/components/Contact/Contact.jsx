import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Mail, User, MessageSquare, Send, Github } from "lucide-react";
import { useSelector } from "react-redux";
import axios from "../../config/axios";
import { toast } from "react-hot-toast";

export default function ContactForm() {
  const isDark = useSelector((state) => state.theme.isDark);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  //Handle Submit function
  const onSubmit = async (data) => {
    setSubmitError(null);
    try {
      const response = await axios.post("/api/contact", data);
      if (response.data.success) {
        setSubmitSuccess(true);
        toast.success(response.data.message || "Message sent successfully!");
        reset(); 
      } else {
        setSubmitError("Something went wrong. Please try again.");
      }
    } catch (error) {
      setSubmitError(true);
      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Try again later."
      );
    }
  };

  return (
    <section
      id="contact"
      className={`w-full py-20 ${
        isDark ? "bg-slate-900" : "bg-gradient-to-b from-white to-slate-50"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2
              className={`text-4xl md:text-5xl font-bold mb-6 ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              Get In Touch
            </h2>
            <p
              className={`text-lg md:text-xl max-w-2xl mx-auto leading-relaxed ${
                isDark ? "text-slate-300" : "text-slate-600"
              }`}
            >
              Let's discuss your next project or just say hello. I'm always open
              to new opportunities.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Info */}
            <div
              className={`${
                isDark
                  ? "bg-slate-800 border-slate-700"
                  : "bg-white border-slate-200"
              } border rounded-2xl p-8 shadow-lg`}
            >
              <h3
                className={`text-2xl font-semibold mb-8 ${
                  isDark ? "text-white" : "text-slate-900"
                }`}
              >
                Let's Connect
              </h3>
              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-center space-x-4 group">
                  <div
                    className={`p-3 rounded-xl ${
                      isDark ? "bg-blue-500/20" : "bg-blue-50"
                    } group-hover:scale-110 transition`}
                  >
                    <Mail
                      className={`w-6 h-6 ${
                        isDark ? "text-blue-400" : "text-blue-600"
                      }`}
                    />
                  </div>
                  <div>
                    <p
                      className={`text-sm font-medium ${
                        isDark ? "text-slate-300" : "text-slate-600"
                      }`}
                    >
                      Email me at
                    </p>
                    <a
                      href="mailto:ishantmishra.dev@gmail.com"
                      className={`text-lg font-semibold ${
                        isDark
                          ? "text-blue-400 hover:text-blue-300"
                          : "text-blue-600 hover:text-blue-700"
                      }`}
                    >
                      ishantmishra.dev@gmail.com
                    </a>
                  </div>
                </div>

                {/* GitHub */}
                <div className="flex items-center space-x-4 group">
                  <div
                    className={`p-3 rounded-xl ${
                      isDark ? "bg-purple-500/20" : "bg-purple-50"
                    } group-hover:scale-110 transition`}
                  >
                    <Github
                      className={`w-6 h-6 ${
                        isDark ? "text-purple-400" : "text-purple-600"
                      }`}
                    />
                  </div>
                  <div>
                    <p
                      className={`text-sm font-medium ${
                        isDark ? "text-slate-300" : "text-slate-600"
                      }`}
                    >
                      Check out my work
                    </p>
                    <a
                      href="https://github.com/ishantmishra03"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-lg font-semibold ${
                        isDark
                          ? "text-purple-400 hover:text-purple-300"
                          : "text-purple-600 hover:text-purple-700"
                      }`}
                    >
                      github.com/ishantmishra03
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div
              className={`${
                isDark
                  ? "bg-slate-800 border-slate-700"
                  : "bg-white border-slate-200"
              } border rounded-2xl p-8 shadow-lg`}
            >
              <h3
                className={`text-2xl font-semibold mb-8 ${
                  isDark ? "text-white" : "text-slate-900"
                }`}
              >
                Send a Message
              </h3>

              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                {/* Name */}
                <div>
                  <label
                    className={`flex items-center gap-2 text-sm font-medium mb-2 ${
                      isDark ? "text-slate-200" : "text-slate-700"
                    }`}
                  >
                    <User className="w-4 h-4" />
                    Your Name
                  </label>
                  <input
                    type="text"
                    {...register("name", { required: "Name is required" })}
                    placeholder="Dev"
                    className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 ${
                      isDark
                        ? "bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:ring-blue-500/30"
                        : "bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-500 focus:ring-blue-500/30"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    className={`flex items-center gap-2 text-sm font-medium mb-2 ${
                      isDark ? "text-slate-200" : "text-slate-700"
                    }`}
                  >
                    <Mail className="w-4 h-4" />
                    Your Email
                  </label>
                  <input
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email",
                      },
                    })}
                    placeholder="dev@example.com"
                    className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 ${
                      isDark
                        ? "bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:ring-blue-500/30"
                        : "bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-500 focus:ring-blue-500/30"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label
                    className={`flex items-center gap-2 text-sm font-medium mb-2 ${
                      isDark ? "text-slate-200" : "text-slate-700"
                    }`}
                  >
                    <MessageSquare className="w-4 h-4" />
                    Message
                  </label>
                  <textarea
                    rows={5}
                    {...register("message", {
                      required: "Message is required",
                    })}
                    placeholder="Tell me about your project..."
                    className={`w-full px-4 py-3 rounded-lg border resize-none focus:outline-none focus:ring-2 ${
                      isDark
                        ? "bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:ring-blue-500/30"
                        : "bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-500 focus:ring-blue-500/30"
                    }`}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex items-center justify-center gap-3 px-6 py-3 rounded-lg font-medium text-white transition ${
                    isDark
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-blue-600 hover:bg-blue-700"
                  } disabled:opacity-70 disabled:cursor-not-allowed`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>

                {/* Success/Error Feedback */}
                {submitSuccess && (
                  <div
                    className={`${
                      isDark
                        ? "text-green-300 bg-green-900/30"
                        : "text-green-700 bg-green-50"
                    } p-4 rounded-lg text-sm`}
                  >
                    Message Sent Successfully
                  </div>
                )}
                {submitError && (
                  <div className="text-red-500 bg-red-100 p-4 rounded-lg text-sm">
                    ❌ {submitError}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
