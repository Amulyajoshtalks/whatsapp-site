import React, { useState, useRef } from "react";
import formImage from "../assets/formImage.jpeg";
import { useLanguage } from "../context/LanguageContext";
import { homePageTranslations } from "../utils/homePageTranslations";
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

const HomePageForm = () => {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    business: "",
    description: "",
    whatsappHelp: "",
    consent: false,
  });

  const [errors, setErrors] = useState({});

  const { selectedLang } = useLanguage();
  const t =
    homePageTranslations[selectedLang] || homePageTranslations["English"];
  const fullNameRef = useRef(null);
  const phoneRef = useRef(null);
  const emailRef = useRef(null);
  const businessRef = useRef(null);
  const descriptionRef = useRef(null);
  const whatsappHelpRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const renderError = (field) =>
    errors[field] && (
      <span className="text-red-500 text-sm mt-1">{errors[field]}</span>
    );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!form.fullName.trim()) newErrors.fullName = "Required *";

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

    if (!form.business.trim()) newErrors.business = "Required *";

    if (!form.description.trim()) {
      newErrors.description = "Required *";
    } else {
      const charCount = form.description.trim().length;
      if (charCount > 650) {
        newErrors.description = "Character limit exceeded (Max 650)";
      }
    }

    if (!form.whatsappHelp.trim()) {
      newErrors.whatsappHelp = "Required *";
    } else {
      const charCount = form.whatsappHelp.trim().length;
      if (charCount > 650) {
        newErrors.whatsappHelp = "Character limit exceeded (Max 650)";
      }
    }
    if (!form.consent) newErrors.consent = "Required *";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      if (newErrors.fullName) return fullNameRef.current.focus();
      if (newErrors.phone) return phoneRef.current.focus();
      if (newErrors.email) return emailRef.current.focus();
      if (newErrors.business) return businessRef.current.focus();
      if (newErrors.description) return descriptionRef.current.focus();
      if (newErrors.whatsappHelp) return whatsappHelpRef.current.focus();
      return;
    }

    const formData = new URLSearchParams();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbwTUMb88T0_u7upZzyNAX1ocICh3ueEJLiak58XMa5kGRxLmIPytWY72OFhVDqDP7GQ/exec",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formData.toString(),
        }
      );
      console.log(response);

      if (response.ok) {
        alert("Form submitted successfully!");
        setForm({
          fullName: "",
          phone: "",
          email: "",
          business: "",
          description: "",
          whatsappHelp: "",
          consent: false,
        });
        setErrors({});
      } else {
        alert("Submission failed.");
      }
    } catch (error) {
      alert("form submitted successfully!");
    }
  };

  const inputClass = (field) =>
    `w-full rounded-[20px] border px-5 text-[clamp(16px,2vw,22px)] focus:outline-none focus:ring-0 ${
      errors[field] ? "border-red-500" : "border-[#00000066]"
    }`;

  const inputClassCheckBox = (field) =>
    `w-full border px-5 text-[clamp(16px,2vw,22px)] focus:outline-none focus:ring-0 ${
      errors[field] ? "border-red-500" : "border-[#00000066]"
    }`;

  const inputStyle = {
    height: "clamp(50px, 7vw, 70px)",
    boxShadow: "inset 0px 4px 4px 0px #00000040",
    color: "black",
  };

  return (
    <div className="flex justify-center items-center w-full">
      <div
        className="max-w-7xl bg-[#0b3e2e] md:rounded-[30px] px-[15px] md:px-[64px] py-8 flex flex-col w-full"
        style={{
          paddingBottom: "clamp(40px, 5vw, 70px)",
          paddingTop: "clamp(40px, 5vw, 70px)",
        }}
      >
        {/* Heading */}
        <h2
          className="text-center text-white font-medium text-[clamp(24px,3vw,40px)] leading-[clamp(30px,4vw,50px)]"
          style={{
            fontFamily: "Helvetica Neue",
            fontWeight: "500",
            fontSize: "clamp(16px, 5vw, 40px)",
            lineHeight: "50px",
            marginBottom: "clamp(5px, 2vw, 15px)",
          }}
        >
          {t.GrowYourBusiness}
        </h2>
        <p
          className="text-center mb-6 text-white text-[clamp(16px,2vw,25px)] leading-[clamp(24px,3vw,50px)] max-w-[935px] mx-auto"
          style={{
            fontFamily: "Helvetica Neue",
            fontWeight: "400",
            fontSize: "clamp(12px, 3vw, 25px)",
            lineHeight: "clamp(20px, 2.8vw, 50px)",
          }}
        >
          {t.ShareYourJourney}
        </p>

        {/* Form Content */}
        <ResponsiveFlex>
          <ResponsiveImage src={formImage} alt="phone demo" />
          <div className="w-full md:w-3/5 space-y-4">
            <form className="space-y-4">
              <div className="flex flex-col" style={{}}>
                <label
                  className="text-white text-[clamp(16px,2vw,22px)] mb-[clamp(8px,1vw,16px)]"
                  style={{
                    fontFamily: "Helvetica Neue",
                    fontWeight: "400",
                    fontSize: "clamp(16px, 2vw, 22px)",
                    lineHeight: "clamp(24px, 3vw, 30px)",
                    letterSpacing: "0",
                  }}
                >
                  {t.FullName}
                </label>
                <input
                  ref={fullNameRef}
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  type="text"
                  placeholder={t.FullName}
                  className={inputClass("fullName")}
                  style={inputStyle}
                />
                {renderError("fullName")}
              </div>

              {/* Phone + Email */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex flex-col w-full" style={{}}>
                  <label
                    className="text-white text-[clamp(16px,2vw,22px)] mb-[clamp(8px,1vw,16px)]"
                    style={{ fontFamily: "Helvetica Neue" }}
                  >
                    {t.PhoneNumber}
                  </label>
                  <input
                    ref={phoneRef}
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    type="number"
                    placeholder={t.PhoneNumber}
                    className={inputClass("phone")}
                    style={inputStyle}
                  />
                  {renderError("phone")}
                </div>
                <div className="flex flex-col w-full" style={{}}>
                  <label
                    className="text-white text-[clamp(16px,2vw,22px)] mb-[clamp(8px,1vw,16px)]"
                    style={{ fontFamily: "Helvetica Neue" }}
                  >
                    {t.EmailID}
                  </label>
                  <input
                    ref={emailRef}
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    type="email"
                    placeholder={t.EmailID}
                    className={inputClass("email")}
                    style={inputStyle}
                  />
                  {renderError("email")}
                </div>
              </div>

              {/* Business Name */}
              <div className="flex flex-col" style={{}}>
                <label
                  className="text-white text-[clamp(16px,2vw,22px)] mb-[clamp(8px,1vw,16px)]"
                  style={{ fontFamily: "Helvetica Neue" }}
                >
                  {t.BusinessName}
                </label>
                <input
                  ref={businessRef}
                  name="business"
                  value={form.business}
                  onChange={handleChange}
                  type="text"
                  placeholder={t.BusinessName}
                  className={inputClass("business")}
                  style={inputStyle}
                />
                {renderError("business")}
              </div>

              {/* Description */}
              <div className="flex flex-col" style={{}}>
                <label
                  className="text-white text-[clamp(16px,2vw,22px)] mb-[clamp(8px,1vw,16px)]"
                  style={{ fontFamily: "Helvetica Neue" }}
                >
                  {t.DescribeBusiness}
                </label>
                <textarea
                  ref={descriptionRef}
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder={t.DescribeHere}
                  className={inputClass("description") + " resize-none py-3"}
                  style={{
                    ...inputStyle,
                    height: "clamp(90px,15vw,115px)",
                  }}
                />
                {renderError("description")}
              </div>

              {/* WhatsApp Help */}
              <div className="flex flex-col" style={{}}>
                <label
                  className="text-white text-[clamp(16px,2vw,22px)] mb-[clamp(8px,1vw,16px)]"
                  style={{ fontFamily: "Helvetica Neue" }}
                >
                  {t.WhereHelpMost}
                </label>
                <textarea
                  ref={whatsappHelpRef}
                  name="whatsappHelp"
                  value={form.whatsappHelp}
                  onChange={handleChange}
                  placeholder={t.DescribeHere}
                  className={inputClass("whatsappHelp") + " resize-none py-3"}
                  style={{
                    ...inputStyle,
                    height: "clamp(90px,15vw,115px)",
                  }}
                />
                {renderError("whatsappHelp")}
              </div>
            </form>
          </div>
        </ResponsiveFlex>

        {/* Consent + Submit */}
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-start px-4 gap-6"
          style={{
            marginTop: "clamp(20px, 3vw, 50px)",
          }}
        >
          <div className="flex items-start gap-4">
            <input
              name="consent"
              type="checkbox"
              checked={form.consent}
              onChange={handleChange}
              className={inputClassCheckBox("consent")}
              style={{
                width: "clamp(25px, 4vw, 48px)",
                height: "clamp(25px, 4vw, 48px)",
                accentColor: "#000",
                marginTop: "clamp(4px, 0.5vw, 10px)",
                backgroundColor: form.consent ? "black" : "white",
              }}
            />
            {renderError("consent")}
            <span
              className="text-white text-[clamp(16px,2vw,22px)] leading-[clamp(24px,3vw,50px)]"
              style={{
                fontFamily: "Helvetica Neue",
                lineHeight: "clamp(24px, 3vw, 50px)",
              }}
            >
              {t.Consent}
            </span>
          </div>

          <div className="w-full flex justify-center">
            <button
              type="submit"
              className="bg-[#2eff98] text-black px-8 py-2 rounded-full font-semibold hover:bg-[#24d380] transition"
              style={{
                fontSize: "clamp(18px, 2.5vw, 30px)",
                fontWeight: 400,
                color: "#103928",
                paddingRight: "2rem",
                paddingLeft: "clamp(1.2rem, 2vw, 2rem)",
                backgroundColor: "#25D366",
                fontFamily: "Helvetica Neue",
                width: "clamp(150px, 30vw, 281px)",
                height: "clamp(50px, 7vw, 90px)",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "#000";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "#25D366";
                e.currentTarget.style.color = "#103928";
              }}
            >
              {t.Submit}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HomePageForm;
