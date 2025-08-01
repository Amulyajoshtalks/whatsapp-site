import React, { useState, useEffect } from "react";
import ASSETS_PATHS from "../storiesAssets";
import VideoGallery from "../components/VideoGallery";
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/storiesTranslations';

const Stories = () => {

  const { selectedLang } = useLanguage();
  const filterOptions = translations[selectedLang]?.filterOptions || translations['English'].filterOptions;


  useEffect(() => {
    const headerElement = document.getElementById("main-header");
    if (headerElement) {
      headerElement.classList.remove("hidden");
      if (window.location.pathname === "/success-stories") {
        headerElement.classList.remove("shadow-[0_4px_0_0_rgba(255,255,255,0.8)]", "border-b-2", "border-white");
        headerElement.style.boxShadow = "";
      }
    }

    const footerElement = document.getElementById("main-footer");
    console.log("footerElement instories 1", footerElement);
    if (
      footerElement &&
      (footerElement.classList.contains("!hidden") || window.location.pathname === "/success-stories")
    ) {
      footerElement.classList.remove("!hidden");
    }
  }, []);

  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <div className="px-4 py-10 max-w-7xl mx-auto">
      {/* Hero Banner */}
      <div className="w-full max-w-[1288px] md:top-[50px] h-[163px] sm:h-[590px] rounded-[10px] sm:rounded-[30px] overflow-hidden mb-10 relative bg-gray-200 flex items-center justify-center">
        <img src={ASSETS_PATHS.background} alt="Success Story Hero" className="absolute inset-0 w-full h-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-2 flex flex-col items-start justify-end h-full pl-4 sm:pl-8 md:pl-20 pb-2 md:pb-16 w-full">
          <h2
            className={`font-['Helvetica Neue'] font-bold sm:text-[24px] md:tracking-[0.01em] leading-[1.2] md:text-[40px] tracking-normal text-[#25D366] mb-2 drop-shadow-lg max-w-[600px] md:max-w-[900px] md:mb-12
            ${selectedLang === 'தமிழ்' ? 'text-[10px]' : 'text-[20px]'}`}
            dangerouslySetInnerHTML={{
              __html:
                translations[selectedLang]?.bannerHeading ||
                translations['English'].bannerHeading,
            }}
          />
          <p
            className="font-['Helvetica Neue'] md:font-['Helvetica Neue'] md:tracking-[0.003em] md:font-medium text-white text-[10px] md:text-[25px] xs:text-[10px] sm:text-sm md:text-xl max-w-full md:max-w-[720px] mb-2 drop-shadow-lg leading-[2] md:leading-[1.5]"
            dangerouslySetInnerHTML={{
              __html: translations[selectedLang]?.bannerText || translations['English'].bannerText,
            }}
          />
        </div>

      </div>

      <h1
        className="block md:inline-block text-center md:text-left text-2xl md:text-[50px] font-bold mb-6 text-[#103928] pb-8 md:mt-20"
      >
        <span className="inline-block md:border-b-[6px] border-b-[4px] border-[#25D366] md:pb-6">
          <span
            className="inline-block"
            dangerouslySetInnerHTML={{
              __html:
                translations[selectedLang]?.successStoriesTitle ||
                translations['English'].successStoriesTitle,
            }}
          />
        </span>
      </h1>

      <div className="flex gap-5 mt-6">
        {filterOptions.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setSelectedCategory(value)}
            className={`px-3 py-0.5 rounded-full border md:px-8 md:py-3 md:text-[20px] text-[7px] font-medium whitespace-nowrap transition-colors duration-200 sm:px-6 sm:py-2 sm:text-sm ${selectedCategory === value
              ? 'bg-green-500 text-white border-green-500'
              : 'bg-white text-black border-black hover:bg-green-500 hover:text-white hover:border-green-500'
              }`}
          >
            {label}
          </button>
        ))}
      </div>

      <VideoGallery selectedCategory={selectedCategory} />
    </div>

  );
};

export default Stories;