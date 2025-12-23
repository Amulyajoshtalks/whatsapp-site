import { useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import whatsappLogo from "../assets/whatsappLogo.png";
import { useAudio } from "../context/AudioContext";
import { useLanguage } from "../context/LanguageContext";
import { homePageTranslations } from "../utils/homePageTranslations";

const navLinkStyle = {
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  fontWeight: 500,
  fontSize: "1.1rem",
  lineHeight: "1.2",
  letterSpacing: "-0.01em",
  textAlign: "center",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  position: "relative",
};

const navLinkStyleMobile = {
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  fontWeight: 500,
  fontSize: "1.25rem",
  lineHeight: "1.4",
  letterSpacing: "-0.01em",
  textAlign: "center",
  transition: "all 0.3s ease",
};

const customSelectStyles = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "transparent",
    borderColor: "rgba(255, 255, 255, 0.7)",
    borderWidth: "2px",
    borderRadius: "9999px",
    minHeight: "44px",
    minWidth: "160px",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    fontSize: "1rem",
    fontWeight: "500",
    color: "white",
    boxShadow: state.isFocused ? "0 0 0 3px rgba(37, 211, 102, 0.1)" : "none",
    cursor: "pointer",
    transition: "all 0.3s ease",
    "&:hover": {
      borderColor: "#25D366",
      transform: "translateY(-1px)",
    },
  }),
  singleValue: (base) => ({
    ...base,
    color: "white",
    fontWeight: "500",
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: "rgba(255, 255, 255, 0.9)",
    padding: 0,
    transition: "transform 0.3s ease",
    "&:hover": {
      color: "#25D366",
    },
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "#103928",
    borderRadius: "12px",
    overflow: "hidden",
    zIndex: 9999,
    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
    marginTop: "8px",
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor:
      state.isFocused || state.isSelected ? "#25D366" : "#103928",
    color: state.isFocused || state.isSelected ? "#111" : "#fff",
    cursor: "pointer",
    fontWeight: 500,
    padding: "12px 16px",
    transition: "all 0.2s ease",
    "&:active": {
      backgroundColor: "#1da954",
    },
  }),
};

const Navbar = ({ languages }) => {
  const { selectedLang, setSelectedLang } = useLanguage();
  const { setShowIcon } = useAudio();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const t =
    homePageTranslations[selectedLang] || homePageTranslations["English"];

  const langOptions = languages.map((lang) => ({
    value: lang,
    label: lang,
  }));

  const handleSelectedLangChange = (value) => {
    setSelectedLang(value);
    setShowIcon(true);
  };

  return (
    <header
      id="main-header"
      className="bg-[#103928] w-full px-0 py-5 flex items-center border-b border-white/10 z-50"
      style={{
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.25)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div
        className="flex w-full items-center justify-between relative"
        style={{
          maxWidth: "1400px",
          margin: "auto",
          padding: "0 1rem",
        }}
      >
        {/* Logo with glow effect */}
        <div className="flex items-center pl-4 md:pl-0">
          <Link 
            to="/" 
            className="group"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-[#25D366] rounded-full blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
              <img
                src={whatsappLogo}
                alt="WhatsApp Logo"
                className="h-9 md:h-11 relative transform transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-12">
          <div className="flex items-center gap-12">
            <Link
              to="/"
              className="text-white hover:text-[#25D366] group relative"
              style={navLinkStyle}
            >
              {t.Home}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#25D366] group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              to="/success-stories"
              className="text-white hover:text-[#25D366] group relative"
              style={navLinkStyle}
            >
              {t.SuccessStories}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#25D366] group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>
          
          {/* Language Selector */}
          <div className="relative">
            <div className="relative w-fit">
              <Select
                options={langOptions}
                value={{ value: selectedLang, label: selectedLang }}
                onChange={(option) => handleSelectedLangChange(option.value)}
                styles={customSelectStyles}
                isSearchable={false}
                classNamePrefix="select"
              />
            </div>
          </div>
        </div>

        {/* Modern Hamburger Menu */}
        <button
          className="md:hidden pr-4 relative w-12 h-12 flex items-center justify-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className="relative w-6 h-5">
            <span className={`absolute left-0 w-full h-0.5 bg-white rounded-full transition-all duration-300 ${mobileMenuOpen ? 'top-1/2 transform -translate-y-1/2 rotate-45' : 'top-0'}`}></span>
            <span className={`absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-0.5 bg-white rounded-full transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`absolute left-0 w-full h-0.5 bg-white rounded-full transition-all duration-300 ${mobileMenuOpen ? 'top-1/2 transform -translate-y-1/2 -rotate-45' : 'bottom-0'}`}></span>
          </div>
        </button>

        {/* Mobile Menu with slide animation */}
        <div
          className={`md:hidden fixed top-0 left-0 w-full h-screen bg-[#103928] z-40 flex flex-col pt-24 px-6 gap-8 transition-transform duration-500 ease-in-out ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{
            boxShadow: "-20px 0 40px rgba(0, 0, 0, 0.3)",
          }}
        >
          <button
            className="absolute top-8 right-6 text-white text-2xl"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
          
          <div className="flex flex-col gap-8">
            <Link
              to="/"
              className="text-white hover:text-[#25D366] py-3 border-b border-white/10"
              style={navLinkStyleMobile}
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.Home}
            </Link>
            <Link
              to="/success-stories"
              className="text-white hover:text-[#25D366] py-3 border-b border-white/10"
              style={navLinkStyleMobile}
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.SuccessStories}
            </Link>
            
            <div className="pt-4">
              <Select
                options={langOptions}
                value={{ value: selectedLang, label: selectedLang }}
                onChange={(option) => {
                  handleSelectedLangChange(option.value);
                  setMobileMenuOpen(false);
                }}
                onMenuOpen={() => setShowIcon(false)}
                styles={{
                  ...customSelectStyles,
                  control: (base, state) => ({
                    ...customSelectStyles.control(base, state),
                    minWidth: "100%",
                    borderColor: "rgba(255, 255, 255, 0.3)",
                  }),
                }}
                isSearchable={false}
              />
            </div>
          </div>
          
          {/* Decorative element */}
          <div className="absolute bottom-8 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </div>
        
        {/* Overlay for mobile menu */}
        {mobileMenuOpen && (
          <div
            className="md:hidden fixed inset-0 bg-black/50 z-30"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </div>
    </header>
  );
};

export default Navbar;