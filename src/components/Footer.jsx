import React from "react";
import whatsappLogo from "../assets/whatsappLogo.png";
import joshTalks from "../assets/joshTalks.png";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { homePageTranslations } from "../utils/homePageTranslations";

const Footer = () => {
  const { selectedLang } = useLanguage();
  const t =
    homePageTranslations[selectedLang] || homePageTranslations["English"];

  return (
    <footer
      id="main-footer"
      className="bg-[#0b3e2e] text-white w-full flex justify-center"
      style={{
        height: "clamp(146px, 24vw, 560px)",
        paddingBottom: "clamp(16px, 4vw, 40px)",
      }}
    >
      <div
        className="flex flex-row items-start justify-between w-full"
        style={{
          width: "100%",
          maxWidth: "1920px",
          margin: "clamp(2rem, 3vw, 6rem)",
          paddingLeft: "clamp(10px, 3vw, 30px)",
          paddingRight: "clamp(10px, 3vw, 30px)",
        }}
      >
        {/* Left Section */}
        <div
          className="flex flex-col gap-4"
          style={{ width: "clamp(160px, 45vw, 50%)" }}
        >
          {/* Logos */}
          <div className="flex items-center gap-2 md:gap-8 flex-wrap">
            <img
              src={whatsappLogo}
              alt="WhatsApp Logo"
              style={{ width: "clamp(70px, 12vw, 160px)" }}
            />
            <div
              style={{
                borderLeft: "2px solid white",
                height: "clamp(32px, 6vw, 64px)",
              }}
            />
            <img
              src={joshTalks}
              alt="Josh Talks"
              style={{ height: "clamp(32px, 5vw, 56px)", width: "auto" }}
            />
          </div>

          {/* Social Icons */}
          <div
            className="flex gap-2 md:gap-8 flex-wrap"
            style={{
              marginTop: "clamp(12px, 2vw, 24px)",
              marginLeft: "clamp(20px, 2vw, 0px)",
            }}
          >
            {[
              {
                href: "https://www.instagram.com/joshtalkslive/channel/",
                label: "Instagram",
                icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg",
              },
              {
                href: "https://www.linkedin.com/company/joshtalks/",
                label: "LinkedIn",
                icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg",
              },
              {
                href: "https://www.facebook.com/JoshTalksLive/",
                label: "Facebook",
                icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/facebook.svg",
              },
            ].map(({ href, label, icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex items-center justify-center border-2 border-white rounded-full transition-all duration-300 hover:bg-black"
                style={{
                  width: "clamp(24px, 6vw, 80px)",
                  height: "clamp(24px, 6vw, 80px)",
                  border: "1px solid white",
                }}
              >
                <img
                  src={icon}
                  alt={label}
                  style={{
                    width: "clamp(10px, 2.5vw, 40px)",
                    height: "clamp(10px, 2.5vw, 40px)",
                    filter: "invert(1)",
                  }}
                />
              </a>
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div
          className="flex flex-col gap-2"
          style={{
            // width: "clamp(140px, 31vw, 16%)",
            marginTop: 0,
            marginLeft: "30px",
          }}
        >
          <Link
            to="/success-stories"
            style={{
              fontFamily: "Helvetica Neue",
              fontWeight: 400,
              fontSize: "clamp(12px, 2vw, 24px)",
              lineHeight: "100%",
              color: "#fff",
              borderBottom: "2px solid #24D366",
              paddingBottom: "clamp(2px, 0.5vw, 4px)",
              width: "fit-content",
              background: "none",
              marginBottom: "clamp(8px, 2vw, 12px)",
            }}
          >
            {t.Resources || "Resources"}
          </Link>

          <Link
            to="/success-stories"
            style={{
              fontFamily: "Helvetica Neue",
              fontWeight: 400,
              fontSize: "clamp(12px, 2vw, 24px)",
              lineHeight: "100%",
              color: "#fff",
              width: "fit-content",
            }}
          >
            {t.SuccessStories}
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
