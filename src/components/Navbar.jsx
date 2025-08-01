// import { useState } from "react";
// import { Link } from "react-router-dom";
// import Select from "react-select";
// import whatsappLogo from "../assets/whatsappLogo.png";
// import { useAudio } from "../context/AudioContext";
// import { useLanguage } from "../context/LanguageContext";
// import { homePageTranslations } from "../utils/homePageTranslations";

// const navLinkStyle = {
//   fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
//   fontWeight: 500,
//   fontSize: "26px",
//   lineHeight: "100%",
//   letterSpacing: "0%",
//   textAlign: "center",
//   transition: "color 0.2s",
// };

// const navLinkStyleMobile = {
//   fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
//   fontWeight: 400,
//   fontSize: "1.125rem",
//   lineHeight: "100%",
//   letterSpacing: "0%",
//   textAlign: "center",
//   transition: "color 0.2s",
// };

// const customSelectStyles = {
//   control: (base, state) => ({
//     ...base,
//     backgroundColor: "transparent",
//     borderColor: "white",
//     borderWidth: "2px",
//     borderRadius: "9999px",
//     minHeight: "45px",
//     minWidth: "160px",
//     paddingLeft: "0.5rem",
//     paddingRight: "1.5rem",
//     fontSize: "1.125rem",
//     fontWeight: "600",
//     color: "white",
//     boxShadow: "none",
//     cursor: "pointer",
//     "&:hover": {
//       borderColor: "#25D366",
//     },
//   }),
//   singleValue: (base) => ({
//     ...base,
//     color: "white",
//   }),
//   dropdownIndicator: (base) => ({
//     ...base,
//     color: "white",
//     padding: 0,
//   }),
//   indicatorSeparator: () => ({
//     display: "none",
//   }),
//   menu: (base) => ({
//     ...base,
//     backgroundColor: "#103928",
//     borderRadius: "12px",
//     overflow: "hidden",
//     zIndex: 9999,
//   }),
//   option: (base, state) => ({
//     ...base,
//     backgroundColor:
//       state.isFocused || state.isSelected ? "#25D366" : "#103928",
//     color: state.isFocused || state.isSelected ? "#111" : "#fff",
//     cursor: "pointer",
//     fontWeight: 500,
//     padding: "10px 12px",
//   }),
// };

// const Navbar = ({ languages }) => {
//   const { selectedLang, setSelectedLang } = useLanguage();

//   const { setShowIcon } = useAudio();
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const t =
//     homePageTranslations[selectedLang] || homePageTranslations["English"];

//   const langOptions = languages.map((lang) => ({ value: lang, label: lang }));

//   const handleSelectedLangChange = (selectedOption) => {
//     setSelectedLang(selectedOption);
//     setShowIcon(true);
//   };

//   return (
//     <>
//       <header
//         id="main-header"
//         className="bg-[#103928] w-full px-0 py-8 flex items-center shadow-[0_4px_0_0_rgba(255,255,255,0.8)] border-b-2 border-white z-10"
//         style={{
//           boxShadow: "0px 4px 10px 0px #000000",
//           position: "relative",
//         }}
//       >
//         <div
//           className="flex w-full items-center justify-between relative"
//           style={{
//             maxWidth: "1920px",
//             margin: "auto",
//             padding: "0px",
//           }}
//         >
//           {/* Logo */}
//           <div className="flex items-center min-w-[120px] pl-6 md:pl-16">
//             <Link to="/">
//               <img
//                 src={whatsappLogo}
//                 alt="WhatsApp Logo"
//                 className="h-8 md:h-12"
//               />
//             </Link>
//           </div>

//           {/* Desktop Nav */}
//           <div
//             className="hidden md:flex justify-end gap-24 w-[60%]"
//             style={{ paddingRight: "4rem" }}
//           >
//             <div className="flex items-center">
//               <Link
//                 to="/"
//                 className="text-white hover:text-[#25D366]"
//                 style={navLinkStyle}
//               >
//                 {t.Home}
//               </Link>
//             </div>
//             <div className="flex items-center">
//               <Link
//                 to="/success-stories"
//                 className="text-white hover:text-[#25D366]"
//                 style={navLinkStyle}
//               >
//                 {t.SuccessStories}
//               </Link>
//             </div>

//             {/* Desktop Language Selector */}
//             <div className="flex items-center">
//               <div
//                 className="relative w-fit"
//                 style={{ minWidth: "160px", minHeight: "45px !important" }}
//               >
//                 <Select
//                   options={langOptions}
//                   value={{ value: selectedLang, label: selectedLang }}
//                   onChange={(selectedOption) =>
//                     setSelectedLang(selectedOption.value)
//                   }
//                   styles={customSelectStyles}
//                   isSearchable={false}
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Hamburger for Mobile */}
//           <button
//             className="md:hidden pr-6"
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             aria-label="Open menu"
//           >
//             <svg
//               width="48"
//               height="48"
//               fill="none"
//               stroke="#fff"
//               strokeWidth="4"
//             >
//               <line x1="8" y1="14" x2="40" y2="14" />
//               <line x1="8" y1="24" x2="40" y2="24" />
//               <line x1="8" y1="34" x2="40" y2="34" />
//             </svg>
//           </button>

//           {/* Mobile Menu */}
//           {mobileMenuOpen && (
//             <div
//               className="md:hidden absolute top-full right-0 w-64 max-w-[90vw] bg-[#103928] z-30 flex flex-col py-6 px-6 gap-6 border border-white rounded-b-xl shadow-lg"
//               style={{
//                 borderTopLeftRadius: 0,
//                 borderTopRightRadius: 0,
//               }}
//             >
//               <Link
//                 to="/"
//                 className="text-white text-lg"
//                 style={navLinkStyleMobile}
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 {t.Home}
//               </Link>
//               <Link
//                 to="/success-stories"
//                 className="text-white text-lg"
//                 style={navLinkStyleMobile}
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 {t.SuccessStories}
//               </Link>
//               <div className="relative w-full">
//                 <Select
//                   options={langOptions}
//                   value={{ value: selectedLang, label: selectedLang }}
//                   onChange={(selectedOption) =>
//                     handleSelectedLangChange(selectedOption.value)
//                   }
//                   onMenuOpen={() => {
//                     setShowIcon(false);
//                   }}
//                   styles={{
//                     ...customSelectStyles,
//                     control: (base, state) => ({
//                       ...customSelectStyles.control(base, state),
//                       padding: "8px 16px",
//                       fontWeight: 400,
//                     }),
//                   }}
//                   isSearchable={false}
//                 />
//               </div>
//             </div>
//           )}
//         </div>
//       </header>
//     </>
//   );
// };

// export default Navbar;


import { useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import whatsappLogo from "../assets/whatsappLogo.png";
import { useAudio } from "../context/AudioContext";
import { useLanguage } from "../context/LanguageContext";
import { homePageTranslations } from "../utils/homePageTranslations";

const navLinkStyle = {
  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  fontWeight: 500,
  fontSize: "26px",
  lineHeight: "100%",
  textAlign: "center",
  transition: "color 0.2s",
};

const navLinkStyleMobile = {
  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  fontWeight: 400,
  fontSize: "1.125rem",
  lineHeight: "100%",
  textAlign: "center",
  transition: "color 0.2s",
};

const customSelectStyles = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "transparent",
    borderColor: "white",
    borderWidth: "2px",
    borderRadius: "9999px",
    minHeight: "45px",
    minWidth: "160px",
    paddingLeft: "0.5rem",
    paddingRight: "1.5rem",
    fontSize: "1.125rem",
    fontWeight: "600",
    color: "white",
    boxShadow: "none",
    cursor: "pointer",
    "&:hover": {
      borderColor: "#25D366",
    },
  }),
  singleValue: (base) => ({
    ...base,
    color: "white",
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: "white",
    padding: 0,
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
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor:
      state.isFocused || state.isSelected ? "#25D366" : "#103928",
    color: state.isFocused || state.isSelected ? "#111" : "#fff",
    cursor: "pointer",
    fontWeight: 500,
    padding: "10px 12px",
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
      className="bg-[#103928] w-full px-0 py-8 flex items-center shadow-[0_4px_0_0_rgba(255,255,255,0.8)] border-b-2 border-white z-10"
      style={{
        boxShadow: "0px 4px 10px 0px #000000",
        position: "relative",
      }}
    >
      <div
        className="flex w-full items-center justify-between relative"
        style={{
          maxWidth: "1920px",
          margin: "auto",
          padding: "0px",
        }}
      >
        {/* Logo */}
        <div className="flex items-center min-w-[120px] pl-6 md:pl-16">
          <Link to="/">
            <img
              src={whatsappLogo}
              alt="WhatsApp Logo"
              className="h-8 md:h-12"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div
          className="hidden md:flex justify-end gap-24 w-[60%]"
          style={{ paddingRight: "4rem" }}
        >
          <Link
            to="/"
            className="text-white hover:text-[#25D366]"
            style={navLinkStyle}
          >
            {t.Home}
          </Link>
          <Link
            to="/success-stories"
            className="text-white hover:text-[#25D366]"
            style={navLinkStyle}
          >
            {t.SuccessStories}
          </Link>
          <div className="relative w-fit">
            <Select
              options={langOptions}
              value={{ value: selectedLang, label: selectedLang }}
              onChange={(option) => handleSelectedLangChange(option.value)}
              styles={customSelectStyles}
              isSearchable={false}
            />
          </div>
        </div>

        {/* Hamburger Menu */}
        <button
          className="md:hidden pr-6"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            width="48"
            height="48"
            fill="none"
            stroke="#fff"
            strokeWidth="4"
          >
            <line x1="8" y1="14" x2="40" y2="14" />
            <line x1="8" y1="24" x2="40" y2="24" />
            <line x1="8" y1="34" x2="40" y2="34" />
          </svg>
        </button>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            className="md:hidden absolute top-full right-0 w-64 max-w-[90vw] bg-[#103928] z-30 flex flex-col py-6 px-6 gap-6 border border-white rounded-b-xl shadow-lg"
            style={{
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
            }}
          >
            <Link
              to="/"
              className="text-white text-lg"
              style={navLinkStyleMobile}
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.Home}
            </Link>
            <Link
              to="/success-stories"
              className="text-white text-lg"
              style={navLinkStyleMobile}
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.SuccessStories}
            </Link>
            <div className="relative w-full">
              <Select
                options={langOptions}
                value={{ value: selectedLang, label: selectedLang }}
                onChange={(option) => {
                  handleSelectedLangChange(option.value);
                  setMobileMenuOpen(false); // Collapse menu after language selection
                }}
                onMenuOpen={() => setShowIcon(false)}
                styles={{
                  ...customSelectStyles,
                  control: (base, state) => ({
                    ...customSelectStyles.control(base, state),
                    padding: "8px 16px",
                    fontWeight: 400,
                  }),
                }}
                isSearchable={false}
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
