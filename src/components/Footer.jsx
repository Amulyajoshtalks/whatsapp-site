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
    <footer className="bg-[#0b3e2e] text-white w-full py-8 md:py-12 lg:py-16">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-12">
          
          {/* Brand & Social Section - Left */}
          <div className="flex-1 max-w-2xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 mb-6 md:mb-8">
              <img
                src={whatsappLogo}
                alt="WhatsApp Logo"
                className="w-32 md:w-40 lg:w-48 h-auto"
              />
              <div className="hidden sm:block h-12 w-0.5 bg-white/40"></div>
              <div className="flex sm:block">
                <img
                  src={joshTalks}
                  alt="Josh Talks"
                  className="h-8 md:h-10 lg:h-12 w-auto"
                />
                <p className="text-sm md:text-base text-white/80 mt-2 sm:mt-4 max-w-md">
                  Empowering individuals through transformative conversations and resources.
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 md:gap-6">
              <span className="text-sm md:text-base font-medium text-white/90">Follow us:</span>
              <div className="flex gap-3 md:gap-4">
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
                  {
                    href: "https://twitter.com/JoshTalksLive",
                    label: "Twitter",
                    icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/twitter.svg",
                  },
                ].map(({ href, label, icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/30 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:scale-110 hover:border-white/60 hover:shadow-lg"
                  >
                    <img
                      src={icon}
                      alt={label}
                      className="w-5 h-5 md:w-6 md:h-6 filter invert brightness-0 group-hover:brightness-100 transition-all duration-300"
                    />
                    <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                      {label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Resources Section - Right Aligned */}
          <div className="w-full lg:w-auto lg:ml-auto">
            <div className="flex flex-col items-start lg:items-end">
              <div className="text-left lg:text-right">
                <h3 className="text-lg md:text-xl font-semibold mb-4 md:mb-6 pb-2 border-b-2 border-[#24D366] inline-block">
                  {t.Resources || "Resources"}
                </h3>
                <ul className="space-y-3 md:space-y-4">
                  <li>
                    <Link
                      to="/success-stories"
                      className="group inline-flex items-center justify-end text-white/80 hover:text-white transition-all duration-300 text-base md:text-lg lg:flex-row-reverse"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-[#24D366] ml-0 group-hover:ml-2 transition-all duration-300 lg:mr-0 lg:group-hover:mr-2"></span>
                      {t.SuccessStories || "Success Stories"}
                    </Link>
                  </li>
                  {/* Uncomment these if you need more links */}
                  {/* 
                  <li>
                    <Link
                      to="/blog"
                      className="group inline-flex items-center justify-end text-white/80 hover:text-white transition-all duration-300 text-base md:text-lg lg:flex-row-reverse"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-[#24D366] ml-0 group-hover:ml-2 transition-all duration-300 lg:mr-0 lg:group-hover:mr-2"></span>
                      Blog & Articles
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/webinars"
                      className="group inline-flex items-center justify-end text-white/80 hover:text-white transition-all duration-300 text-base md:text-lg lg:flex-row-reverse"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-[#24D366] ml-0 group-hover:ml-2 transition-all duration-300 lg:mr-0 lg:group-hover:mr-2"></span>
                      Webinars
                    </Link>
                  </li>
                  */}
                </ul>
              </div>
              
              {/* Optional: Add contact info aligned to right */}
              {/* <div className="mt-6 lg:mt-8 lg:text-right hidden lg:block">
                <p className="text-white/60 text-sm mb-2">Need help?</p>
                <a 
                  href="mailto:contact@joshtalks.com" 
                  className="text-white/80 hover:text-white transition-colors duration-300 text-base"
                >
                  contact@joshtalks.com
                </a>
              </div> */}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <p className="text-sm md:text-base text-white/60">
              © {new Date().getFullYear()} Josh Talks. All rights reserved.
            </p>
            {/* Mobile contact info */}
            <div className="flex lg:hidden items-center gap-4 text-sm md:text-base text-white/60">
              <a 
                href="mailto:contact@joshtalks.com" 
                className="hover:text-white transition-colors duration-300"
              >
                contact@joshtalks.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;