import React, { useState, useRef } from "react";
import formImage from "../assets/formImage.jpeg";
import { useLanguage } from "../context/LanguageContext";
import { homePageTranslations } from "../utils/homePageTranslations";
import { useToast } from "../context/ToastContext";
import { insertWhatsAppSiteContact } from "../utils/supabaseContact";
import styled from "styled-components";

// Styled image with margin-left only on small screens
const ResponsiveImage = styled.img`
  border-radius: 1rem;
  object-fit: cover;
  box-shadow: 0px 4px 4px 0px #00000040;
  width: clamp(250px, 35vw, 499px);
  height: auto;
  margin-top: clamp(20px, 3vw, 50px);
`;

export const ResponsiveFlex = styled.div`
  display: flex;

  /* Default (mobile-first) */
  flex-direction: column;
  align-items: stretch;
  gap: 3rem;

  /* For medium and larger screens (e.g. tablets/desktops) */
  @media (min-width: 768px) {
    flex-direction: row;
    // align-items: flex-start;
    gap: 3rem;
  }

  @media (max-width: 768px) {
    align-items: center;
  }
`;

const HomePageForm = ({
  onSubmitSuccess,
  embedded = false,
  source = "homepage",
  variant = "default",
}) => {
  const [form, setForm] = useState({
    fullName: "",
    jobTitle: "",
    phone: "",
    email: "",
    businessName: "",
    businessWebsite: "",
    businessDescription: "",
    challenges: "",
    runningAds: [],
    adBudgetRange: "",
    expectedTimeline: "",
    whatsappHelpMost: [],
    consent: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const { selectedLang } = useLanguage();
  const t =
    homePageTranslations[selectedLang] || homePageTranslations["English"];
  const fullNameRef = useRef(null);
  const jobTitleRef = useRef(null);
  const phoneRef = useRef(null);
  const emailRef = useRef(null);
  const businessNameRef = useRef(null);
  const businessWebsiteRef = useRef(null);
  const businessDescriptionRef = useRef(null);
  const challengesRef = useRef(null);


  const trackMetaEvent = (eventName, params = {}) => {
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq("track", eventName, params);
    }
  };
  

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "phone") {
      const digitsOnly = String(value || "").replace(/\D/g, "").slice(0, 10);
      setForm((prev) => ({
        ...prev,
        phone: digitsOnly,
      }));
      setErrors((prev) => ({ ...prev, phone: false }));
      return;
    }
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const toggleArrayValue = (field, value) => {
    setForm((prev) => {
      const current = Array.isArray(prev[field]) ? prev[field] : [];
      const exists = current.includes(value);
      const next = exists ? current.filter((v) => v !== value) : [...current, value];
      return { ...prev, [field]: next };
    });
    setErrors((prev) => ({ ...prev, [field]: false }));
  };

  const setSingleValue = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: false }));
  };

  const toggleRunningAds = (value) => {
    setForm((prev) => {
      const current = Array.isArray(prev.runningAds) ? prev.runningAds : [];
      if (value === "none") {
        return { ...prev, runningAds: current.includes("none") ? [] : ["none"] };
      }
      const withoutNone = current.filter((v) => v !== "none");
      const exists = withoutNone.includes(value);
      const next = exists ? withoutNone.filter((v) => v !== value) : [...withoutNone, value];
      return { ...prev, runningAds: next };
    });
    setErrors((prev) => ({ ...prev, runningAds: false }));
  };

  const renderError = (field) =>
    errors[field] && (
      <span className="text-red-500 text-sm mt-1">{errors[field]}</span>
    );

  const focusFirstError = (newErrors) => {
    if (newErrors.fullName) return fullNameRef.current?.focus();
    if (newErrors.jobTitle) return jobTitleRef.current?.focus();
    if (newErrors.phone) return phoneRef.current?.focus();
    if (newErrors.email) return emailRef.current?.focus();
    if (newErrors.businessName) return businessNameRef.current?.focus();
    if (newErrors.businessWebsite) return businessWebsiteRef.current?.focus();
    if (newErrors.businessDescription) return businessDescriptionRef.current?.focus();
    if (newErrors.challenges) return challengesRef.current?.focus();
  };

  const handleSubmit = async (e) => {
    trackMetaEvent("InitiateCheckout");

    e.preventDefault();
    if (isSubmitting) return;

    const newErrors = {};

    if (!form.fullName.trim()) newErrors.fullName = "Required *";
    if (!form.jobTitle.trim()) newErrors.jobTitle = "Required *";

    if (!form.phone.trim()) {
      newErrors.phone = "Required *";
    } else if (!/^\d{10}$/.test(form.phone.trim())) {
      newErrors.phone = "Please provide a valid number";
    }

    if (!form.email.trim()) {
      newErrors.email = "Required *";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email.trim())
    ) {
      newErrors.email = "Please provide a valid email";
    }

    if (!form.businessName.trim()) newErrors.businessName = "Required *";

    if (form.businessWebsite.trim()) {
      try {
        const raw = form.businessWebsite.trim();
        // Allow user to type domain without protocol.
        // eslint-disable-next-line no-new
        new URL(raw.startsWith("http://") || raw.startsWith("https://") ? raw : `https://${raw}`);
      } catch {
        newErrors.businessWebsite = "Please provide a valid website";
      }
    }

    if (!form.businessDescription.trim()) {
      newErrors.businessDescription = "Required *";
    } else if (form.businessDescription.trim().length > 1000) {
      newErrors.businessDescription = "Character limit exceeded (Max 1000)";
    }

    if (!form.challenges.trim()) {
      newErrors.challenges = "Required *";
    } else if (form.challenges.trim().length > 1000) {
      newErrors.challenges = "Character limit exceeded (Max 1000)";
    }

    if (!Array.isArray(form.runningAds) || form.runningAds.length === 0) {
      newErrors.runningAds = "Required *";
    }
    if (!form.adBudgetRange) newErrors.adBudgetRange = "Required *";
    if (!form.expectedTimeline) newErrors.expectedTimeline = "Required *";
    if (!Array.isArray(form.whatsappHelpMost) || form.whatsappHelpMost.length === 0) {
      newErrors.whatsappHelpMost = "Required *";
    }
    if (!form.consent) newErrors.consent = "Required *";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      focusFirstError(newErrors);
      return;
    }

    try {
      setIsSubmitting(true);

      await insertWhatsAppSiteContact({
        full_name: form.fullName.trim(),
        job_title: form.jobTitle.trim(),
        phone: form.phone.trim(),
        email: form.email.trim().toLowerCase(),
        business_name: form.businessName.trim(),
        business_website: form.businessWebsite.trim() || null,
        business_description: form.businessDescription.trim(),
        challenges: form.challenges.trim(),
        running_ads: form.runningAds,
        ad_budget_range: form.adBudgetRange,
        expected_timeline: form.expectedTimeline,
        whatsapp_help_most: form.whatsappHelpMost,
        consent: !!form.consent,
        language: selectedLang,
        source,
        page_url: typeof window !== "undefined" ? window.location.href : null,
      });
      trackMetaEvent("Lead", {
        content_name: "WhatsApp Business Partner Form",
        source: source,
        language: selectedLang,
      });
      toast.success(
        "Submitted",
        "Thanks! A Meta Verified Partner will reach out to you soon."
      );
      onSubmitSuccess?.();
      setForm({
        fullName: "",
        jobTitle: "",
        phone: "",
        email: "",
        businessName: "",
        businessWebsite: "",
        businessDescription: "",
        challenges: "",
        runningAds: [],
        adBudgetRange: "",
        expectedTimeline: "",
        whatsappHelpMost: [],
        consent: false,
      });
      setErrors({});
    } catch (error) {
      console.error(error);
      toast.error(
        "Submission failed",
        "Something went wrong while submitting your details. Please try again in a moment."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (field) =>
    `w-full rounded-[20px] border px-5 bg-white text-black caret-black placeholder:text-gray-500 text-[clamp(16px,2vw,22px)] focus:outline-none focus:ring-0 ${
      errors[field] ? "border-red-500" : "border-[#00000066]"
    }`;

  const inputClassCheckBox = (field) =>
    `w-full border px-5 bg-white text-black caret-black placeholder:text-gray-500 text-[clamp(16px,2vw,22px)] focus:outline-none focus:ring-0 ${
      errors[field] ? "border-red-500" : "border-[#00000066]"
    }`;

  const FORM_HEADER =
    "Connect with a Meta Verified Partner to Start Your WhatsApp for Business Journey Today";

  const ADS_OPTIONS = [
    { value: "whatsapp_ads", label: "Yes, WhatsApp ads" },
    { value: "instagram_ads", label: "Yes, Instagram ads" },
    { value: "facebook_ads", label: "Yes, Facebook ads" },
    { value: "none", label: "Not running ads yet" },
  ];

  const BUDGET_OPTIONS = [
    { value: "under_25000", label: "Under ₹25,000/month" },
    { value: "25000_100000", label: "₹25,000–₹1,00,000/month" },
    { value: "1_5_lakh", label: "₹1–5 Lakhs/month" },
    { value: "5_lakh_plus", label: "₹5 Lakhs+/month" },
  ];

  const TIMELINE_OPTIONS = [
    { value: "immediately", label: "Immediately" },
    { value: "within_1_month", label: "Within 1 month" },
    { value: "within_3_months", label: "Within 3 months" },
    { value: "just_exploring", label: "Just exploring" },
  ];

  const WA_HELP_OPTIONS = [
    { value: "lead_generation", label: "Lead generation" },
    { value: "customer_support", label: "Customer support" },
    { value: "promotions", label: "Promotions" },
    { value: "engagement_retention", label: "Engagement & retention" },
    { value: "sales_conversions", label: "Sales & conversions" },
  ];

  const isModalVariant = variant === "modal";

  const content = (
    <div
      className={`bg-[#0b3e2e] flex flex-col w-full ${
        isModalVariant ? "rounded-2xl md:rounded-[26px]" : "md:rounded-[30px]"
      } ${isModalVariant ? "px-4 md:px-10 py-6 md:py-8" : "px-[15px] md:px-[64px] py-8"} ${
        isModalVariant ? "max-w-none" : "max-w-7xl"
      }`}
      style={
        isModalVariant
          ? undefined
          : {
              paddingBottom: "clamp(40px, 5vw, 70px)",
              paddingTop: "clamp(40px, 5vw, 70px)",
            }
      }
    >
      {/* Header */}
      <h2
        className="text-center text-white font-medium"
        style={{
          fontFamily: "Helvetica Neue",
          fontWeight: 500,
          fontSize: isModalVariant
            ? "clamp(12px, 2vw, 24px)"
            : "clamp(13px, 2.2vw, 30px)",
          lineHeight: isModalVariant
            ? "clamp(18px, 2.6vw, 34px)"
            : "clamp(18px, 3vw, 40px)",
          marginBottom: "clamp(8px, 1.6vw, 14px)",
        }}
      >
        {FORM_HEADER}
      </h2>

      <form onSubmit={handleSubmit} className="w-full">
        {isModalVariant ? (
          <div className="w-full space-y-4">
            {/* Modal: full-width form (no image) */}
            <div className="space-y-4">
              {/* Full Name */}
              <div className="flex flex-col">
                <label className="text-white text-[clamp(14px,2vw,20px)] mb-2" style={{ fontFamily: "Helvetica Neue" }}>
                  Full Name
                </label>
                <input
                  ref={fullNameRef}
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  type="text"
                  placeholder="Full Name"
                  className={inputClass("fullName")}
                />
                {renderError("fullName")}
              </div>

              {/* Job Title + Phone */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex flex-col w-full">
                  <label className="text-white text-[clamp(14px,2vw,20px)] mb-2" style={{ fontFamily: "Helvetica Neue" }}>
                    Job Title / Role
                  </label>
                  <input
                    ref={jobTitleRef}
                    name="jobTitle"
                    value={form.jobTitle}
                    onChange={handleChange}
                    type="text"
                    placeholder="Job Title / Role"
                    className={inputClass("jobTitle")}
                  />
                  {renderError("jobTitle")}
                </div>

                <div className="flex flex-col w-full">
                  <label className="text-white text-[clamp(14px,2vw,20px)] mb-2" style={{ fontFamily: "Helvetica Neue" }}>
                    Phone Number
                  </label>
                  <input
                    ref={phoneRef}
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={10}
                    autoComplete="tel"
                    placeholder="Phone Number"
                    className={inputClass("phone")}
                  />
                  {renderError("phone")}
                </div>
              </div>

              {/* Email + Business Name */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex flex-col w-full">
                  <label className="text-white text-[clamp(14px,2vw,20px)] mb-2" style={{ fontFamily: "Helvetica Neue" }}>
                    Email ID
                  </label>
                  <input
                    ref={emailRef}
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="Email ID"
                    className={inputClass("email")}
                  />
                  {renderError("email")}
                </div>

                <div className="flex flex-col w-full">
                  <label className="text-white text-[clamp(14px,2vw,20px)] mb-2" style={{ fontFamily: "Helvetica Neue" }}>
                    Business Name
                  </label>
                  <input
                    ref={businessNameRef}
                    name="businessName"
                    value={form.businessName}
                    onChange={handleChange}
                    type="text"
                    placeholder="Business Name"
                    className={inputClass("businessName")}
                  />
                  {renderError("businessName")}
                </div>
              </div>

              {/* Website (optional) */}
              <div className="flex flex-col">
                <label className="text-white text-[clamp(14px,2vw,20px)] mb-2" style={{ fontFamily: "Helvetica Neue" }}>
                  Business Website (optional)
                </label>
                <input
                  ref={businessWebsiteRef}
                  name="businessWebsite"
                  value={form.businessWebsite}
                  onChange={handleChange}
                  type="text"
                  placeholder="example.com"
                  className={inputClass("businessWebsite")}
                />
                {renderError("businessWebsite")}
              </div>

              {/* Describe business */}
              <div className="flex flex-col">
                <label className="text-white text-[clamp(14px,2vw,20px)] mb-2" style={{ fontFamily: "Helvetica Neue" }}>
                  Please describe your business and what you offer.
                </label>
                <textarea
                  ref={businessDescriptionRef}
                  name="businessDescription"
                  value={form.businessDescription}
                  onChange={handleChange}
                  placeholder="Describe here"
                  className={inputClass("businessDescription") + " resize-none py-3"}
                  style={{ height: "clamp(56px, 9vw, 96px)" }}
                />
                {renderError("businessDescription")}
              </div>

              {/* Challenges */}
              <div className="flex flex-col">
                <label className="text-white text-[clamp(14px,2vw,20px)] mb-2" style={{ fontFamily: "Helvetica Neue" }}>
                  What challenges are you currently facing with digital marketing, lead generation, or customer communication?
                </label>
                <textarea
                  ref={challengesRef}
                  name="challenges"
                  value={form.challenges}
                  onChange={handleChange}
                  placeholder="Describe here"
                  className={inputClass("challenges") + " resize-none py-3"}
                  style={{ height: "clamp(56px, 9vw, 96px)" }}
                />
                {renderError("challenges")}
              </div>

              {/* Running Ads */}
              <div className="flex flex-col">
                <div className="text-white text-[clamp(14px,2vw,20px)] mb-2" style={{ fontFamily: "Helvetica Neue" }}>
                  Are you currently running any ads?
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {ADS_OPTIONS.map((opt) => (
                    <label key={opt.value} className="flex items-center gap-3 text-white">
                      <input
                        type="checkbox"
                        checked={form.runningAds.includes(opt.value)}
                        onChange={() => toggleRunningAds(opt.value)}
                        style={{ width: 18, height: 18, accentColor: "#000" }}
                      />
                      <span style={{ fontFamily: "Helvetica Neue" }}>{opt.label}</span>
                    </label>
                  ))}
                </div>
                {renderError("runningAds")}
              </div>

              {/* Budget */}
              <div className="flex flex-col">
                <div className="text-white text-[clamp(14px,2vw,20px)] mb-2" style={{ fontFamily: "Helvetica Neue" }}>
                  What budget range are you currently allocating or planning for digital advertising?
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {BUDGET_OPTIONS.map((opt) => (
                    <label key={opt.value} className="flex items-center gap-3 text-white">
                      <input
                        type="radio"
                        name="adBudgetRange"
                        checked={form.adBudgetRange === opt.value}
                        onChange={() => setSingleValue("adBudgetRange", opt.value)}
                        style={{ width: 18, height: 18, accentColor: "#000" }}
                      />
                      <span style={{ fontFamily: "Helvetica Neue" }}>{opt.label}</span>
                    </label>
                  ))}
                </div>
                {renderError("adBudgetRange")}
              </div>

              {/* Timeline */}
              <div className="flex flex-col">
                <div className="text-white text-[clamp(14px,2vw,20px)] mb-2" style={{ fontFamily: "Helvetica Neue" }}>
                  What is your expected timeline to get started?
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {TIMELINE_OPTIONS.map((opt) => (
                    <label key={opt.value} className="flex items-center gap-3 text-white">
                      <input
                        type="radio"
                        name="expectedTimeline"
                        checked={form.expectedTimeline === opt.value}
                        onChange={() => setSingleValue("expectedTimeline", opt.value)}
                        style={{ width: 18, height: 18, accentColor: "#000" }}
                      />
                      <span style={{ fontFamily: "Helvetica Neue" }}>{opt.label}</span>
                    </label>
                  ))}
                </div>
                {renderError("expectedTimeline")}
              </div>

              {/* WhatsApp Help */}
              <div className="flex flex-col">
                <div className="text-white text-[clamp(14px,2vw,20px)] mb-2" style={{ fontFamily: "Helvetica Neue" }}>
                  Where do you think WhatsApp Business can help you most?
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {WA_HELP_OPTIONS.map((opt) => (
                    <label key={opt.value} className="flex items-center gap-3 text-white">
                      <input
                        type="checkbox"
                        checked={form.whatsappHelpMost.includes(opt.value)}
                        onChange={() => toggleArrayValue("whatsappHelpMost", opt.value)}
                        style={{ width: 18, height: 18, accentColor: "#000" }}
                      />
                      <span style={{ fontFamily: "Helvetica Neue" }}>{opt.label}</span>
                    </label>
                  ))}
                </div>
                {renderError("whatsappHelpMost")}
              </div>
            </div>
          </div>
        ) : (
          <ResponsiveFlex>
            <ResponsiveImage src={formImage} alt="phone demo" />

            <div className="w-full md:w-3/5 space-y-4">
            {/* Full Name */}
            <div className="flex flex-col">
              <label className="text-white text-[clamp(14px,2vw,20px)] mb-2" style={{ fontFamily: "Helvetica Neue" }}>
                Full Name
              </label>
              <input
                ref={fullNameRef}
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                type="text"
                placeholder="Full Name"
                className={inputClass("fullName")}
              />
              {renderError("fullName")}
            </div>

            {/* Job Title + Phone */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex flex-col w-full">
                <label className="text-white text-[clamp(14px,2vw,20px)] mb-2" style={{ fontFamily: "Helvetica Neue" }}>
                  Job Title / Role
                </label>
                <input
                  ref={jobTitleRef}
                  name="jobTitle"
                  value={form.jobTitle}
                  onChange={handleChange}
                  type="text"
                  placeholder="Job Title / Role"
                  className={inputClass("jobTitle")}
                />
                {renderError("jobTitle")}
              </div>

              <div className="flex flex-col w-full">
                <label className="text-white text-[clamp(14px,2vw,20px)] mb-2" style={{ fontFamily: "Helvetica Neue" }}>
                  Phone Number
                </label>
                <input
                  ref={phoneRef}
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={10}
                  autoComplete="tel"
                  placeholder="Phone Number"
                  className={inputClass("phone")}
                />
                {renderError("phone")}
              </div>
            </div>

            {/* Email + Business Name */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex flex-col w-full">
                <label className="text-white text-[clamp(14px,2vw,20px)] mb-2" style={{ fontFamily: "Helvetica Neue" }}>
                  Email ID
                </label>
                <input
                  ref={emailRef}
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="Email ID"
                  className={inputClass("email")}
                />
                {renderError("email")}
              </div>

              <div className="flex flex-col w-full">
                <label className="text-white text-[clamp(14px,2vw,20px)] mb-2" style={{ fontFamily: "Helvetica Neue" }}>
                  Business Name
                </label>
                <input
                  ref={businessNameRef}
                  name="businessName"
                  value={form.businessName}
                  onChange={handleChange}
                  type="text"
                  placeholder="Business Name"
                  className={inputClass("businessName")}
                />
                {renderError("businessName")}
              </div>
            </div>

            {/* Website (optional) */}
            <div className="flex flex-col">
              <label className="text-white text-[clamp(14px,2vw,20px)] mb-2" style={{ fontFamily: "Helvetica Neue" }}>
                Business Website (optional)
              </label>
              <input
                ref={businessWebsiteRef}
                name="businessWebsite"
                value={form.businessWebsite}
                onChange={handleChange}
                type="text"
                placeholder="example.com"
                className={inputClass("businessWebsite")}
              />
              {renderError("businessWebsite")}
            </div>

            {/* Describe business */}
            <div className="flex flex-col">
              <label className="text-white text-[clamp(14px,2vw,20px)] mb-2" style={{ fontFamily: "Helvetica Neue" }}>
                Please describe your business and what you offer.
              </label>
              <textarea
                ref={businessDescriptionRef}
                name="businessDescription"
                value={form.businessDescription}
                onChange={handleChange}
                placeholder="Describe here"
                className={inputClass("businessDescription") + " resize-none py-3"}
                style={{ height: "clamp(56px, 9vw, 96px)" }}
              />
              {renderError("businessDescription")}
            </div>

            {/* Challenges */}
            <div className="flex flex-col">
              <label className="text-white text-[clamp(14px,2vw,20px)] mb-2" style={{ fontFamily: "Helvetica Neue" }}>
                What challenges are you currently facing with digital marketing, lead generation, or customer communication?
              </label>
              <textarea
                ref={challengesRef}
                name="challenges"
                value={form.challenges}
                onChange={handleChange}
                placeholder="Describe here"
                className={inputClass("challenges") + " resize-none py-3"}
                style={{ height: "clamp(56px, 9vw, 96px)" }}
              />
              {renderError("challenges")}
            </div>

            {/* Running Ads */}
            <div className="flex flex-col">
              <div className="text-white text-[clamp(14px,2vw,20px)] mb-2" style={{ fontFamily: "Helvetica Neue" }}>
                Are you currently running any ads?
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {ADS_OPTIONS.map((opt) => (
                  <label key={opt.value} className="flex items-center gap-3 text-white">
                    <input
                      type="checkbox"
                      checked={form.runningAds.includes(opt.value)}
                      onChange={() => toggleRunningAds(opt.value)}
                      style={{ width: 18, height: 18, accentColor: "#000" }}
                    />
                    <span style={{ fontFamily: "Helvetica Neue" }}>{opt.label}</span>
                  </label>
                ))}
              </div>
              {renderError("runningAds")}
            </div>

            {/* Budget */}
            <div className="flex flex-col">
              <div className="text-white text-[clamp(14px,2vw,20px)] mb-2" style={{ fontFamily: "Helvetica Neue" }}>
                What budget range are you currently allocating or planning for digital advertising?
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {BUDGET_OPTIONS.map((opt) => (
                  <label key={opt.value} className="flex items-center gap-3 text-white">
                    <input
                      type="radio"
                      name="adBudgetRange"
                      checked={form.adBudgetRange === opt.value}
                      onChange={() => setSingleValue("adBudgetRange", opt.value)}
                      style={{ width: 18, height: 18, accentColor: "#000" }}
                    />
                    <span style={{ fontFamily: "Helvetica Neue" }}>{opt.label}</span>
                  </label>
                ))}
              </div>
              {renderError("adBudgetRange")}
            </div>

            {/* Timeline */}
            <div className="flex flex-col">
              <div className="text-white text-[clamp(14px,2vw,20px)] mb-2" style={{ fontFamily: "Helvetica Neue" }}>
                What is your expected timeline to get started?
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {TIMELINE_OPTIONS.map((opt) => (
                  <label key={opt.value} className="flex items-center gap-3 text-white">
                    <input
                      type="radio"
                      name="expectedTimeline"
                      checked={form.expectedTimeline === opt.value}
                      onChange={() => setSingleValue("expectedTimeline", opt.value)}
                      style={{ width: 18, height: 18, accentColor: "#000" }}
                    />
                    <span style={{ fontFamily: "Helvetica Neue" }}>{opt.label}</span>
                  </label>
                ))}
              </div>
              {renderError("expectedTimeline")}
            </div>

            {/* WhatsApp Help */}
            <div className="flex flex-col">
              <div className="text-white text-[clamp(14px,2vw,20px)] mb-2" style={{ fontFamily: "Helvetica Neue" }}>
                Where do you think WhatsApp Business can help you most?
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {WA_HELP_OPTIONS.map((opt) => (
                  <label key={opt.value} className="flex items-center gap-3 text-white">
                    <input
                      type="checkbox"
                      checked={form.whatsappHelpMost.includes(opt.value)}
                      onChange={() => toggleArrayValue("whatsappHelpMost", opt.value)}
                      style={{ width: 18, height: 18, accentColor: "#000" }}
                    />
                    <span style={{ fontFamily: "Helvetica Neue" }}>{opt.label}</span>
                  </label>
                ))}
              </div>
              {renderError("whatsappHelpMost")}
            </div>
          </div>
        </ResponsiveFlex>
        )}

        {/* Consent + Submit */}
        <div
          className="w-full flex flex-col items-start px-0 gap-6"
          style={{ marginTop: "clamp(20px, 3vw, 50px)" }}
        >
          <div className="w-full">
            {renderError("consent")}
            <label
              className={`w-full flex items-start gap-3 md:gap-4 rounded-2xl border px-4 py-4 md:px-5 md:py-5 transition ${
                errors.consent ? "border-red-500 bg-red-500/10" : "border-white/25 bg-white/10 hover:bg-white/15"
              }`}
              style={{ fontFamily: "Helvetica Neue" }}
            >
              <input
                name="consent"
                type="checkbox"
                checked={form.consent}
                onChange={handleChange}
                className="mt-1"
                style={{
                  width: "clamp(16px, 2.2vw, 22px)",
                  height: "clamp(16px, 2.2vw, 22px)",
                  accentColor: "#25D366",
                }}
              />
              <div className="min-w-0">
                <div className="text-white font-medium text-[clamp(13px,1.6vw,18px)] leading-snug">
                  Consent & data sharing
                </div>
                <div className="text-white/85 text-[clamp(11px,1.35vw,16px)] leading-[clamp(16px,2.1vw,28px)] mt-1">
                  {t.Consent}
                </div>
              </div>
            </label>
          </div>

          <div className="w-full flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              aria-disabled={isSubmitting}
              className="rounded-full font-semibold transition"
              style={{
                fontSize: "clamp(18px, 2.5vw, 30px)",
                fontWeight: 400,
                color: isSubmitting ? "#0b3e2e" : "#103928",
                paddingRight: "2rem",
                paddingLeft: "clamp(1.2rem, 2vw, 2rem)",
                backgroundColor: "#25D366",
                fontFamily: "Helvetica Neue",
                width: "clamp(150px, 30vw, 281px)",
                height: "clamp(44px, 6vw, 72px)",
                opacity: isSubmitting ? 0.75 : 1,
              }}
              onMouseOver={(e) => {
                if (isSubmitting) return;
                e.currentTarget.style.backgroundColor = "#000";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseOut={(e) => {
                if (isSubmitting) return;
                e.currentTarget.style.backgroundColor = "#25D366";
                e.currentTarget.style.color = "#103928";
              }}
            >
              {isSubmitting ? "Submitting..." : t.Submit}
            </button>
          </div>
        </div>
      </form>
    </div>
  );

  if (embedded) return content;

  return <div className="flex justify-center items-center w-full">{content}</div>;
};

export default HomePageForm;
