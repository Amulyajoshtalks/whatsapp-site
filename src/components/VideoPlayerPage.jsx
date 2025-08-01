import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../src/components/VideoPlayerPage.css";
import ASSETS_PATHS from '../storiesAssets';
import { useEffect } from "react";
import whatsappLogo from "../assets/StoriesImageAssets/Video Player Page Logo.png";
import whatsappLogoMobile from "../assets/whatsappLogo.png";


const VideoPlayerPage = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
    const headerElement = document.getElementById("main-header");
    if (headerElement) {
      headerElement.classList.add("hidden");
    }
    const footerElement = document.getElementById("main-footer");
    if (footerElement) {
      footerElement.classList.add("!hidden");
    }
  }, []);


  const navigate = useNavigate();
  const location = useLocation();
  const video = location.state?.video;

  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  if (!video) {
    return (
      <div className="text-center mt-10 text-red-600">
        No video selected. Please go back and choose a video.
      </div>
    );
  }

  const handlePlay = () => {
    setIsPlaying(true);
    videoRef.current?.play();
  };

  return (

    <div className="min-h-screen bg-white flex flex-col">
      {/* Top Bar */}
      <div className="bg-[#103928] h-[80px] md:h-[106px] text-white flex justify-between items-center px-4 md:px-6 py-4">
        <div className="w-full flex justify-between items-center mx-auto pl-1 md:pl-2 md:pr-6">
          <button
            onClick={() => navigate(-1)}
            className="font-normal text-[12px] md:text-[26px] leading-[100%] tracking-[0] align-middle font-['Helvetica_Neue'] flex items-center gap-1"
          >
            <img
              src={ASSETS_PATHS.nextCorousalImage}
              alt="Back Arrow"
              className="w-4 h-4 md:w-6 md:h-6 transform -scale-x-100 filter invert brightness-0"
            /> <div>{video.backToSuccessStories}</div>
          </button>
          <img
            src={whatsappLogoMobile}
            alt="WhatsApp Logo"
            className="block md:hidden h-5 sm:h-10"
          />

          {/* Desktop Logo */}
          <img
            src={whatsappLogo}
            alt="WhatsApp Logo"
            className="hidden md:block h-12"
          />
        </div>
      </div>

      <div className="flex flex-col items-center w-full px-4 md:px-0 md:mt-8 mt-2">
        <p className="text-left text-black font-normal md:text-[40px] text-[12px] md:leading-[110%] tracking-[0] align-middle font-['Helvetica Neue'] w-[1205px] max-w-full md:mb-6 mb-2">
          {video.title} | {video.location}
        </p>
        <div className="w-full max-w-[1205px] h-[56vw] max-h-[705px] min-h-[200px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[650px] bg-white md:rounded-[15px] overflow-hidden relative mb-6">
          <video
            ref={videoRef}
            className="w-full h-full object-cover md:rounded-[15px]"
            controls={isPlaying}
            poster={video.poster || ""}
          >
            <source src={video.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {!isPlaying && (
            <button
              onClick={handlePlay}
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-50 transition"
            >
              <div className="bg-white rounded-full p-4 shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-black"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </button>
          )}

        </div>
        <p className="text-left text-black font-normal md:text-[30px] text-[10px] leading-normal tracking-[0] align-middle font-['Helvetica_Neue'] w-[1205px] max-w-full">
          {video.tagline}
        </p>
      </div>
    </div>
  );
};

export default VideoPlayerPage;

