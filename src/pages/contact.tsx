import React, { useState } from "react";
import { useTheme } from "../contexts/useTheme";
import { databases, ID } from "../config/appwrite";
import { validateEmail } from "../utils/helper";
import { Reveal } from "../components/reveal";
import { contactMethods } from "../store";

type FormErrors = {
  name?: string;
  email?: string;
  message?: string;
};

function validateForm(formState: {
  name: string;
  email: string;
  message: string;
}): FormErrors {
  const errors: FormErrors = {};
  if (!formState.name.trim()) {
    errors.name = "Name is required.";
  } else if (formState.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }
  if (!formState.email.trim()) {
    errors.email = "Email is required.";
  } else if (!validateEmail(formState.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!formState.message.trim()) {
    errors.message = "Message is required.";
  } else if (formState.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters.";
  }
  return errors;
}

const Contact: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const fg = isDark ? "#f5f5f3" : "#111111";
  const muted = isDark ? "rgba(245,245,243,0.65)" : "rgba(17,17,17,0.55)";
  const border = isDark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.14)";
  const tagBg = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)";
  const tagBorder = isDark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.18)";
  const fadeBg = isDark ? "#0e0e0e" : "#f0f0ee";
  const accent = isDark ? "#a8c5ff" : "#2563eb";
  const inputBg = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)";
  const inputFocus = isDark ? "rgba(168,197,255,0.25)" : "rgba(37,99,235,0.2)";
  const solidBtn = isDark
    ? { bg: "#f5f5f3", text: "#111111" }
    : { bg: "#111111", text: "#f5f5f3" };
  const errorColor = isDark ? "#ff8080" : "#dc2626";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    const updated = { ...formState, [name]: value };
    setFormState(updated);
    // Re-validate touched field on change
    if (touched[name]) {
      setErrors(validateForm(updated));
    }
    // Clear the submit-level error as soon as user edits anything
    if (submitError) setSubmitError(null);
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validateForm(formState));
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();

    // Mark all fields as touched and validate
    setTouched({ name: true, email: true, message: true });
    const validationErrors = validateForm(formState);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);
    setSubmitError(null);
    try {
      await databases.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID,
        ID.unique(),
        {
          Name: formState.name,
          email: formState.email,
          message: formState.message,
        },
      );
      setSubmitted(true);
      setFormState({ name: "", email: "", message: "" });
      setTouched({});
      setErrors({});
    } catch (_err) {
      setSubmitError(
        "Something went wrong sending your message. Please try again or reach out directly via email.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .contact-card {
          border: 1px solid ${border};
          border-radius: 16px;
          padding: 24px;
          background: ${tagBg};
          display: flex;
          align-items: flex-start;
          gap: 16px;
          transition: border-color 220ms ease, background 220ms ease, transform 220ms ease;
        }
        .contact-card:hover {
          border-color: ${tagBorder};
          background: ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"};
          transform: translateY(-2px);
        }

       
        .icon-bubble {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          border: 1px solid ${tagBorder};
          background: ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)"};
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: background 200ms ease;
        }
        .contact-card:hover .icon-bubble {
          background: ${isDark ? "rgba(168,197,255,0.12)" : "rgba(37,99,235,0.08)"};
        }

        
        .contact-link { transition: color 150ms ease; }
        .contact-link:hover { color: ${accent} !important; }

        
        .form-input {
          width: 100%;
          border: 1px solid ${border};
          border-radius: 12px;
          padding: 13px 16px;
          background: ${inputBg};
          color: ${fg};
          font-family: 'Outfit', system-ui, sans-serif;
          font-size: 15px;
          font-weight: 300;
          outline: none;
          resize: none;
          transition: border-color 200ms ease, box-shadow 200ms ease, background 200ms ease;
        }
        .form-input::placeholder {
          color: ${isDark ? "rgba(245,245,243,0.3)" : "rgba(17,17,17,0.3)"};
        }
        .form-input:focus {
          border-color: ${accent};
          box-shadow: 0 0 0 3px ${inputFocus};
          background: ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)"};
        }
        .form-input.input-error {
          border-color: ${errorColor};
          box-shadow: 0 0 0 3px ${isDark ? "rgba(255,128,128,0.15)" : "rgba(220,38,38,0.12)"};
        }

        
        .btn-solid { transition: opacity 200ms ease, transform 200ms ease; }
        .btn-solid:hover:not(:disabled) { opacity: 0.88; transform: translateY(-1px); }
        .btn-solid:disabled { opacity: 0.6; cursor: not-allowed; }

        
        @keyframes spin { to { transform: rotate(360deg); } }
        .spinner {
          width: 14px;
          height: 14px;
          border: 2px solid currentColor;
          border-top-color: transparent;
          border-radius: 50%;
          animation: spin 600ms linear infinite;
          flex-shrink: 0;
        }

        
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .submit-error-banner {
          animation: slide-down 280ms cubic-bezier(0.4,0,0.2,1) both;
        }

        /* ── Success pop-in ── */
        @keyframes pop-in {
          0%   { opacity: 0; transform: scale(0.75); }
          70%  { transform: scale(1.04); }
          100% { opacity: 1; transform: scale(1); }
        }
        .success-anim { animation: pop-in 400ms cubic-bezier(0.34,1.56,0.64,1) both; }
      `}</style>

      <section
        className="min-h-screen px-6 sm:px-10 lg:px-16 pt-32 pb-28"
        style={{ background: fadeBg, transition: "background 400ms ease" }}
      >
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="mb-16 text-center">
              <p
                className="font-ui font-semibold tracking-[0.14em] uppercase mb-5"
                style={{ color: accent, fontSize: "11px" }}
              >
                Contact
              </p>
              <h2
                className="font-ui font-normal leading-[1.05] tracking-[-0.03em]"
                style={{ fontSize: "clamp(42px, 7vw, 78px)", color: fg }}
              >
                Let's build something
                <br />
                <span style={{ color: muted }}>worth remembering.</span>
              </h2>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <p
              className="font-ui font-light leading-relaxed text-center max-w-xl mx-auto pb-14 mb-14"
              style={{
                color: muted,
                fontSize: "16px",
                borderBottom: `1px solid ${border}`,
              }}
            >
              I'm currently open to new opportunities and collaborations.
              Whether you have a project, a question, or just want to say hello
              — reach out through any channel below.
            </p>
          </Reveal>

          {/* ── Contact method cards ── */}
          <Reveal delay={100}>
            <div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-14 mb-14"
              style={{ borderBottom: `1px solid ${border}` }}
            >
              {contactMethods.map((method) => (
                <div key={method.label} className="contact-card">
                  <div className="icon-bubble">
                    <method.icon size={18} style={{ color: muted }} />
                  </div>
                  <div className="min-w-0">
                    <p
                      className="font-ui font-semibold tracking-[0.09em] uppercase mb-1"
                      style={{ color: accent, fontSize: "10px" }}
                    >
                      {method.label}
                    </p>
                    {method.href ? (
                      <a
                        href={method.href}
                        className="contact-link font-ui font-normal break-all"
                        style={{ color: fg, fontSize: "14px" }}
                        target={method.label !== "Email" ? "_blank" : undefined}
                        rel={
                          method.label !== "Email"
                            ? "noopener noreferrer"
                            : undefined
                        }
                      >
                        {method.value}
                      </a>
                    ) : (
                      <p
                        className="font-ui font-normal"
                        style={{ color: fg, fontSize: "14px" }}
                      >
                        {method.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* ── Contact form ── */}
          <Reveal delay={140}>
            <div>
              <p
                className="font-ui font-semibold tracking-[0.14em] uppercase mb-8 text-center"
                style={{ color: accent, fontSize: "11px" }}
              >
                Send a Message
              </p>

              {submitted ? (
                /* ── Success state ── */
                <div
                  className="success-anim flex flex-col items-center gap-5 py-16 rounded-2xl border text-center"
                  style={{ border: `1px solid ${border}`, background: tagBg }}
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center border"
                    style={{
                      background: isDark
                        ? "rgba(168,197,255,0.1)"
                        : "rgba(37,99,235,0.08)",
                      borderColor: isDark
                        ? "rgba(168,197,255,0.25)"
                        : "rgba(37,99,235,0.2)",
                    }}
                  >
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                      <path
                        d="M5 11l5 5 8-8"
                        stroke={accent}
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <p
                      className="font-display italic"
                      style={{ color: fg, fontSize: "24px" }}
                    >
                      Message sent!
                    </p>
                    <p
                      className="font-ui font-light mt-2"
                      style={{ color: muted, fontSize: "15px" }}
                    >
                      I'll get back to you as soon as possible.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormState({ name: "", email: "", message: "" });
                    }}
                    className="font-ui font-semibold tracking-[0.06em] uppercase"
                    style={{ color: accent, fontSize: "12px" }}
                  >
                    Send another →
                  </button>
                </div>
              ) : (
                /* ── Form ── */
                <div
                  className="rounded-2xl border p-8 sm:p-10"
                  style={{ border: `1px solid ${border}`, background: tagBg }}
                >
                  <div className="flex flex-col gap-5">
                    {/* Name + Email row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-2">
                        <label
                          className="font-ui font-semibold tracking-[0.08em] uppercase"
                          style={{ color: muted, fontSize: "10px" }}
                        >
                          Name
                        </label>
                        <input
                          className={`form-input${touched.name && errors.name ? " input-error" : ""}`}
                          name="name"
                          type="text"
                          placeholder="Your name"
                          value={formState.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          disabled={loading}
                        />
                        {touched.name && errors.name && (
                          <p
                            className="font-ui font-light"
                            style={{
                              color: errorColor,
                              fontSize: "12px",
                              marginTop: "-4px",
                            }}
                          >
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div className="flex flex-col gap-2">
                        <label
                          className="font-ui font-semibold tracking-[0.08em] uppercase"
                          style={{ color: muted, fontSize: "10px" }}
                        >
                          Email
                        </label>
                        <input
                          className={`form-input${touched.email && errors.email ? " input-error" : ""}`}
                          name="email"
                          type="email"
                          placeholder="your@email.com"
                          value={formState.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          disabled={loading}
                        />
                        {touched.email && errors.email && (
                          <p
                            className="font-ui font-light"
                            style={{
                              color: errorColor,
                              fontSize: "12px",
                              marginTop: "-4px",
                            }}
                          >
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label
                        className="font-ui font-semibold tracking-[0.08em] uppercase"
                        style={{ color: muted, fontSize: "10px" }}
                      >
                        Message
                      </label>
                      <textarea
                        className={`form-input${touched.message && errors.message ? " input-error" : ""}`}
                        name="message"
                        rows={5}
                        placeholder="What's on your mind?"
                        value={formState.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={loading}
                      />
                      {touched.message && errors.message && (
                        <p
                          className="font-ui font-light"
                          style={{
                            color: errorColor,
                            fontSize: "12px",
                            marginTop: "-4px",
                          }}
                        >
                          {errors.message}
                        </p>
                      )}
                    </div>

                    {/* ── Submit error banner ── */}
                    {submitError && (
                      <div
                        className="submit-error-banner flex items-start gap-3 rounded-xl px-4 py-3"
                        style={{
                          background: isDark
                            ? "rgba(255,128,128,0.08)"
                            : "rgba(220,38,38,0.06)",
                          border: `1px solid ${isDark ? "rgba(255,128,128,0.2)" : "rgba(220,38,38,0.18)"}`,
                        }}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          style={{
                            color: errorColor,
                            flexShrink: 0,
                            marginTop: "1px",
                          }}
                        >
                          <path
                            d="M8 5.5V8.5M8 10.5h.007M6.674 2.37 1.276 11.5A1.5 1.5 0 0 0 2.577 13.5h10.846a1.5 1.5 0 0 0 1.3-2L9.326 2.37a1.5 1.5 0 0 0-2.652 0Z"
                            stroke="currentColor"
                            strokeWidth="1.3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <p
                          className="font-ui font-light"
                          style={{
                            color: errorColor,
                            fontSize: "13px",
                            lineHeight: "1.5",
                          }}
                        >
                          {submitError}
                        </p>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
                      <p
                        className="font-ui font-light"
                        style={{ color: muted, fontSize: "13px" }}
                      >
                        I typically reply within 24–48 hours.
                      </p>
                      <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="btn-solid font-ui font-medium tracking-[0.05em] uppercase rounded-full px-7 py-3 shrink-0 flex items-center gap-2.5"
                        style={{
                          background: solidBtn.bg,
                          color: solidBtn.text,
                          fontSize: "13px",
                        }}
                      >
                        {loading ? (
                          <>
                            Sending
                            <span className="spinner" />
                          </>
                        ) : (
                          <>
                            Send Message
                            <svg
                              width="15"
                              height="15"
                              viewBox="0 0 15 15"
                              fill="none"
                            >
                              <path
                                d="M3 7.5h9m0 0L8.5 3M12 7.5L8.5 12"
                                stroke="currentColor"
                                strokeWidth="1.3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default Contact;
