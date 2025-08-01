import React, { useEffect, useRef, useState } from "react";
import AnimatedText from "../components/AnimatedText";
import DelayAnimationImages from "../components/DelayAnimationImages";
import HomePageForm from "../components/HomePageForm";
import HomeStatsSection from "../components/HomeStatsSection";
import WhatsappBanner from "../components/WhatsappBanner";
import AnimatedBusinessText from "../components/AnimatedBusinessText";
import { useLanguage } from "../context/LanguageContext";
import { homePageTranslations } from "../utils/homePageTranslations";
import styled from "styled-components";

const ResponsiveContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem 1rem;
  width: 100%;
  background-color: white;
  min-height: clamp(60vh, 60vh, 90vh);
  padding-left: clamp(2.5rem, 2vw, 6rem);
  padding-right: 2.5rem;
  padding-top: 1.5rem;
  padding-bottom: 2.5rem;
  max-width: 1920px;
  margin: auto;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0 2rem;
    padding-right: 3rem;
    padding-left: 3rem;
    padding-top: 3rem;
    padding-bottom: 3rem;
  }

  @media (min-width: 1024px) {
    padding-right: 2rem;
    padding-left: 6rem;
    padding-top: 6rem;
  }
`;

const ResponsiveParagraph = styled.p`
  font-family: "Helvetica Neue";
  font-weight: 400;
  color: black;

  /* Base (mobile-first) styles */
  font-size: 12px;
  line-height: 20px;
   margin-top: ${({ lang }) => (lang === "தமிழ்" ? "40px" : "10px")};

  /* Medium and up (tablets, desktops) */
  @media (min-width: 768px) {
    font-size: 20px;
    line-height: 32px;
  margin-top: ${({ lang }) => (lang === "தமிழ்" ? "140px" : "20px")};  }

  /* Large screens (desktops/larger monitors) */
  @media (min-width: 1024px) {
    font-size: 25px;
    line-height: 50px;
  margin-top: ${({ lang }) => (lang === "தமிழ்" ? "70px" : "40px")};  }
}
`;

const ResponsiveInnerParagraph = styled.p`
  font-family: "Helvetica Neue";
  font-weight: 400;
  color: black;

  /* Base (mobile-first) styles */
  font-size: 12px;
  line-height: 20px;

  /* Medium and up (tablets, desktops) */
  @media (min-width: 768px) {
    font-size: 20px;
    line-height: 32px;
    // margin-top: 40px;
  }

  /* Large screens (desktops/larger monitors) */
  @media (min-width: 1024px) {
    font-size: 25px;
    line-height: 40px;
  }
`;

const Home = () => {
  const { selectedLang } = useLanguage();
  const t =
    homePageTranslations[selectedLang] || homePageTranslations["English"];

  const ref = useRef();
  const [animate, setAnimate] = useState(false);
  const [animatedOnce, setAnimatedOnce] = useState(false);

  useEffect(() => {
    const headerElement = document.getElementById("main-header");
    if (headerElement) {
      // If you want to remove shadow and border when on home page
      headerElement.classList.add(
        "shadow-[0_4px_0_0_rgba(255,255,255,0.8)]",
        "border-b-2",
        "border-white"
      );
      headerElement.style.boxShadow = "0px 4px 10px 0px #000000";
    }
    const handleScroll = () => {
      if (!ref.current || animatedOnce) return;
      const rect = ref.current.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (inView) {
        setAnimate(true);
        setAnimatedOnce(true);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // check on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, [animatedOnce]);

  const [showOnScroll, setShowOnScroll] = useState(false);
  const [shownOnce, setShownOnce] = useState(false);
  const sectionRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || shownOnce) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (inView) {
        setShowOnScroll(true);
        setShownOnce(true);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // check on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, [shownOnce]);

  return (
    <>
      <div className="bg-[#103928] flex flex-col items-center w-full px-2">
        {/* Heading */}
        <div className="mt-16 sm:mt-24 mb-2 w-full flex justify-center">
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
              letterSpacing: "0%",
              verticalAlign: "middle",
              color: "#fff",
              textAlign: "center",
            }}
            // className="max-w-[95vw] w-full text-[clamp(16px,4.5vw,40px)] leading-[2] px-2 overflow-x-auto whitespace-nowrap"
            className="max-w-[95vw] w-full text-[clamp(16px,4.5vw,40px)] leading-[2] px-2"
          >
            {t.DeliverCompelling}
          </p>
        </div>

        {/* AnimatedText */}
        <div className="w-full flex justify-center mt-6 sm:mt-8">
          <AnimatedText />
        </div>

        {/* WhatsappBanner */}
        <div className="w-full flex justify-center">
          <WhatsappBanner />
        </div>

        {/* Description */}
        <div className="mt-6 sm:mt-8 mb-8 sm:mb-12 w-full flex justify-center">
          <p
            style={{
              fontFamily: "Helvetica Neue",
              fontWeight: 300,
              color: "#fff",
              textAlign: "center",
              letterSpacing: "0%",
              fontSize: "clamp(12px, 3vw, 25px)",
              lineHeight: "clamp(20px, 2.8vw, 50px)",
            }}
            className="max-w-[95vw] sm:max-w-4xl"
          >
            <span
              dangerouslySetInnerHTML={{
                __html: t.WhatsAppBusinessProducts,
              }}
            />
          </p>
        </div>
      </div>
      <HomeStatsSection />
      <HomePageForm />
      <ResponsiveContainer>
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
          <AnimatedBusinessText />

          <ResponsiveParagraph lang={selectedLang}>
            {t.ManageChats.split("<br/>").map((line, idx) => (
              <React.Fragment key={idx}>
                {line}
                {idx < t.ManageChats.split("<br/>").length - 1 && <br />}
              </React.Fragment>
            ))}
          </ResponsiveParagraph>
          <br />
          <ResponsiveInnerParagraph>
            {t.FullFeatureDetails}
            <br />
            <span style={{ color: "#25D366" }}>WhatsApp Business app</span>
            <span style={{ color: "#111" }}> {t.page}</span>
          </ResponsiveInnerParagraph>

          <div className="flex gap-4 mt-6">
            <a
              href="https://play.google.com/store/apps/details?id=com.whatsapp.w4b&pcampaignid=web_share"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Google Play"
                className="h-[40px] sm:h-[45px] w-auto"
              />
            </a>
            <a
              href="https://apps.apple.com/in/app/whatsapp-business/id1386412985"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="App Store"
                className="h-[40px] sm:h-[45px] w-auto"
              />
            </a>
          </div>
        </div>

        <div className="w-full md:w-auto flex justify-center md:justify-end">
          <DelayAnimationImages />
        </div>
      </ResponsiveContainer>
    </>
  );
};

export default Home;
