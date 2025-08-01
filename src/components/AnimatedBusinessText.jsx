import React, { useRef, useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { homePageTranslations } from "../utils/homePageTranslations";

const AnimatedBusinessText = () => {
  const sectionRef = useRef();
  const [show, setShow] = useState(false);
  const [showSimplify, setShowSimplify] = useState(false);
  const [showWithWA, setShowWithWA] = useState(false);
  const [animateWithWA, setAnimateWithWA] = useState(false);
  const { selectedLang } = useLanguage();
  const t =
    homePageTranslations[selectedLang] || homePageTranslations["English"];

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0 && !show) {
        setShow(true);
        setTimeout(() => setShowSimplify(true), 600);
        setTimeout(() => setShowWithWA(true), 1200);
        setTimeout(() => setAnimateWithWA(true), 1800);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [show]);

  return (
    <div
      ref={sectionRef}
      className="text-center md:text-left"
      style={{
        height: "clamp(110px, 20vw, 150px)",
        position: "relative",
      }}
    >
      {show && (
        <div>
          {showSimplify && (
            <span
              style={{
                fontFamily: "Helvetica Neue",
                fontWeight: 400,
                // fontSize: "clamp(20px, 4vw, 40px)",
                fontSize: (selectedLang == "தமிழ்") ? "clamp(20px, 4vw, 38px)" : "clamp(20px, 4vw, 40px)",
                color: "#111",
                display: "block",
                // marginBottom: "12px",
                opacity: 1,
                transition: "opacity 0.5s",
              }}
            >
             
              {t.SimplifyBusiness.split("<br/>").map((line, idx) => (
                            <React.Fragment key={idx}>
                              {line}
                              {idx < t.SimplifyBusiness.split("<br/>").length - 1 && <br />}
                            </React.Fragment>
                          ))}
            </span>
          )}
          {showWithWA && (
            <span
              style={{
                fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
                fontWeight: 400,
                fontSize: "clamp(20px, 4vw, 40px)",
                color: animateWithWA ? "#25D366" : "#111",
                display: "block",
                opacity: 1,
                transition: "color 0.5s, transform 0.7s",
                transform: animateWithWA ? "translateY(10px)" : "translateY(0)",
              }}
            >
              {t.WithWhatsApp}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default AnimatedBusinessText;
