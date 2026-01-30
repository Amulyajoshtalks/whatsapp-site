// import { useEffect, useRef, useState } from "react";
// import MontageCover from "../assets/MontageCover.png";
// import { useAudio } from "../context/AudioContext";
// import { useLanguage } from "../context/LanguageContext";
// import { homePageTranslations } from "../utils/homePageTranslations";

// const WhatsappBanner = () => {
//   const { selectedLang } = useLanguage();
//   const t =
//     homePageTranslations[selectedLang] || homePageTranslations["English"];

//   const { showIcon } = useAudio();
//   const videoRef = useRef(null);
//   const containerRef = useRef(null);
//   const progressBarRef = useRef(null);
//   const animationRef = useRef(null);

//   const [isStarted, setIsStarted] = useState(false);
//   const [isEnded, setIsEnded] = useState(false);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [duration, setDuration] = useState(0);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [volume, setVolume] = useState(1);

//   const handlePlay = () => {
//     setIsStarted(true);
//     setIsEnded(false);
//     setCurrentTime(0);
//   };

//   const formatTime = (time) => {
//     const minutes = Math.floor(time / 60).toString();
//     const seconds = Math.floor(time % 60)
//       .toString()
//       .padStart(2, "0");
//     return `${minutes}:${seconds}`;
//   };

//   const updateTime = () => {
//     const video = videoRef.current;
//     if (video && !video.paused) {
//       setCurrentTime(video.currentTime);
//       animationRef.current = requestAnimationFrame(updateTime);
//     }
//   };

//   useEffect(() => {
//     const video = videoRef.current;
//     if (isStarted && video) {
//       video.muted = false;
//       video.volume = volume;
//       video.currentTime = 0;

//       video
//         .play()
//         .then(() => {
//           setIsPlaying(true);
//           setDuration(video.duration || 0);
//           animationRef.current = requestAnimationFrame(updateTime);
//         })
//         .catch((error) => {
//           console.error("Video playback failed:", error);
//         });
//     }
//   }, [isStarted]);

//   useEffect(() => {
//     return () => cancelAnimationFrame(animationRef.current);
//   }, []);

//   const togglePlayback = () => {
//     const video = videoRef.current;
//     if (!video) return;

//     if (video.paused) {
//       video.play();
//       setIsPlaying(true);
//       animationRef.current = requestAnimationFrame(updateTime);
//     } else {
//       video.pause();
//       setIsPlaying(false);
//       cancelAnimationFrame(animationRef.current);
//     }
//   };

//   const toggleVolume = () => {
//     const video = videoRef.current;
//     if (!video) return;
//     const newVolume = volume > 0 ? 0 : 1;
//     video.volume = newVolume;
//     setVolume(newVolume);
//   };

//   const handleSeek = (e) => {
//     const video = videoRef.current;
//     const progressBar = progressBarRef.current;
//     if (!video || !progressBar || !duration || duration === Infinity) return;

//     const rect = progressBar.getBoundingClientRect();
//     const clickX = e.clientX - rect.left;
//     const percentage = Math.min(Math.max(clickX / rect.width, 0), 1);
//     const newTime = percentage * duration;

//     video.currentTime = newTime;
//     setCurrentTime(newTime);
//   };

//   useEffect(() => {
//     const handleScroll = () => {
//       const video = videoRef.current;
//       const container = containerRef.current;
//       if (!video || !container || !isStarted) return;

//       const rect = container.getBoundingClientRect();
//       const inView = rect.top < window.innerHeight && rect.bottom > 0;

//       if (!inView && !video.paused) {
//         video.pause();
//         setIsPlaying(false);
//         cancelAnimationFrame(animationRef.current);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [isStarted]);

//   return (
//     <div
//       ref={containerRef}
//       className="relative w-full max-w-7xl mx-auto mt-12 rounded-3xl overflow-hidden sm:px-0"
//     >
//       {!isStarted || isEnded ? (
//         <>
//           <img
//             src={MontageCover}
//             alt="Whatsapp Banner"
//             className="w-full h-[200px] xs:h-[300px] sm:h-[400px] md:h-[480px] lg:h-[680px] xl:h-[680px] object-cover"
//             style={{ aspectRatio: "2.35/1", filter: "blur(2px)", opacity: 0.9 }}
//           />
//           <h2
//             className="absolute inset-0 flex items-center justify-center text-white text-lg xs:text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal"
//             style={{
//               textShadow: "0 2px 16px rgba(0,0,0,0.5)",
//               fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
//             }}
//           >
//             {selectedLang === "English" && (
//               <>
//                 All through{" "}
//                 <span className="text-[#25D366] font-bold ml-2 sm:ml-3">
//                   WhatsApp
//                 </span>
//               </>
//             )}

//             {selectedLang === "हिंदी" && (
//               <>
//                 <span className="text-[#25D366] font-bold mr-2 sm:mr-3">
//                   WhatsApp
//                 </span>{" "}
//                 के साथ
//               </>
//             )}

//             {selectedLang === "ગુજરાતી" && (
//               <>
//                 બધા{" "}
//                 <span className="text-[#25D366] font-bold ml-2 sm:ml-3">
//                   WhatsApp
//                 </span>{" "}
//                 દ્વારા
//               </>
//             )}

//             {selectedLang === "বাংলা" && (
//               <>
//                 <span className="text-[#25D366] font-bold mr-2 sm:mr-3">
//                   WhatsApp
//                 </span>{" "}
//                 এর মাধ্যমে
//               </>
//             )}

//             {selectedLang === "தமிழ்" && (
//               <>
//                 <span className="text-[#25D366] font-bold mr-2 sm:mr-3">
//                   WhatsApp
//                 </span>{" "}
//                 மூலம் எல்லாம்
//               </>
//             )}

//             {selectedLang === "मराठी" && (
//               <>
//                 सर्व काही{" "}
//                 <span className="text-[#25D366] font-bold ml-2 sm:ml-3">
//                   WhatsApp
//                 </span>
//               </>
//             )}
//           </h2>

//           {showIcon && (
//             <button
//               onClick={handlePlay}
//               className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
//               aria-label="Start Video"
//             >
//               <div className="w-20 h-20 rounded-full bg-white bg-opacity-90 flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="30"
//                   height="30"
//                   viewBox="0 0 24 24"
//                   fill="black"
//                 >
//                   <path d="M8 5v14l11-7z" />
//                 </svg>
//               </div>
//             </button>
//           )}
//         </>
//       ) : (
//         <>
//           <video
//             ref={videoRef}
//             src={t.video}
//             muted={false}
//             playsInline
//             className="w-full h-[200px] xs:h-[300px] sm:h-[400px] md:h-[480px] lg:h-[680px] xl:h-[680px] object-fill"
//             style={{
//               aspectRatio: "2.35/1",
//               cursor: "pointer",
//             }}
//             onClick={togglePlayback}
//             onLoadedMetadata={(e) => setDuration(e.target.duration)}
//             onEnded={() => {
//               setIsEnded(true);
//               setIsPlaying(false);
//               cancelAnimationFrame(animationRef.current);
//             }}
//           />

//           {showIcon ? (
//             <>
//               {!isPlaying && !isEnded && (
//                 <button
//                   onClick={togglePlayback}
//                   className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
//                   aria-label="Resume"
//                 >
//                   <div className="w-20 h-20 rounded-full bg-white bg-opacity-90 flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="30"
//                       height="30"
//                       viewBox="0 0 24 24"
//                       fill="black"
//                       zIndex="1"
//                     >
//                       <path d="M8 5v14l11-7z" />
//                     </svg>
//                   </div>
//                 </button>
//               )}
//             </>
//           ) : (
//             <></>
//           )}

//           {!isEnded && (
//             <div className="absolute bottom-0 left-0 w-full z-30 bg-gradient-to-t from-black/80 to-transparent px-4 py-2 flex items-center justify-between text-white text-sm pointer-events-auto">
//               <span>{formatTime(currentTime)}</span>

//               <div
//                 ref={progressBarRef}
//                 className="flex-1 mx-3 relative h-1 bg-white/30 rounded-full overflow-hidden cursor-pointer"
//                 onClick={handleSeek}
//               >
//                 <div
//                   className="absolute top-0 left-0 h-full bg-white"
//                   style={{
//                     width:
//                       duration && duration !== Infinity
//                         ? `${(currentTime / duration) * 100}%`
//                         : "0%",
//                   }}
//                 ></div>
//               </div>

//               <span>{formatTime(duration)}</span>

//               <button onClick={toggleVolume} className="ml-3">
//                 {volume > 0 ? (
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="white"
//                     width="20"
//                     height="20"
//                     viewBox="0 0 24 24"
//                   >
//                     <path d="M5 9v6h4l5 5V4l-5 5H5z" />
//                   </svg>
//                 ) : (
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="white"
//                     width="20"
//                     height="20"
//                     viewBox="0 0 24 24"
//                   >
//                     <path d="M5 9v6h4l5 5V4l-5 5H5z" />
//                     <line
//                       x1="19"
//                       y1="5"
//                       x2="5"
//                       y2="19"
//                       stroke="white"
//                       strokeWidth="2"
//                     />
//                   </svg>
//                 )}
//               </button>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default WhatsappBanner;



import { useEffect, useRef, useState } from "react";
import { useAudio } from "../context/AudioContext";
import { useLanguage } from "../context/LanguageContext";
import { homePageTranslations } from "../utils/homePageTranslations";

const HOMEPAGE_VIDEO_THUMBNAIL =
  "https://storage.googleapis.com/joshtalks-ias.appspot.com/image_data/wp_thumbnail.jpg";

const WhatsappBanner = () => {
  const { selectedLang } = useLanguage();
  const t = homePageTranslations[selectedLang] || homePageTranslations["English"];
  const { showIcon } = useAudio();

  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const progressBarRef = useRef(null);
  const animationRef = useRef(null);

  const [isStarted, setIsStarted] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const hideControlsTimeout = useRef(null);

  const handlePlay = () => {
    setIsStarted(true);
    setIsEnded(false);
    setCurrentTime(0);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60).toString();
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const updateTime = () => {
    const video = videoRef.current;
    if (video && !video.paused) {
      setCurrentTime(video.currentTime);
      animationRef.current = requestAnimationFrame(updateTime);
    }
  };

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
      animationRef.current = requestAnimationFrame(updateTime);
    } else {
      video.pause();
      setIsPlaying(false);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    }
  };

  const toggleVolume = () => {
    const video = videoRef.current;
    if (!video) return;
    const newVolume = volume > 0 ? 0 : 1;
    video.volume = newVolume;
    setVolume(newVolume);
  };

  const handleSeek = (e) => {
    const video = videoRef.current;
    const progressBar = progressBarRef.current;
    if (!video || !progressBar || !duration || duration === Infinity) return;

    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.min(Math.max(clickX / rect.width, 0), 1);
    const newTime = percentage * duration;

    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (isStarted && video) {
      video.muted = false;
      video.volume = volume;
      video.currentTime = 0;
      video
        .play()
        .then(() => {
          setIsPlaying(true);
          setDuration(video.duration || 0);
          animationRef.current = requestAnimationFrame(updateTime);
        })
        .catch((error) => console.error("Video playback failed:", error));
    }
  }, [isStarted]);

  useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const video = videoRef.current;
      const container = containerRef.current;
      if (!video || !container || !isStarted) return;

      const rect = container.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;

      if (!inView && !video.paused) {
        video.pause();
        setIsPlaying(false);
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isStarted]);

  // Show controls on hover (desktop) or tap/touch (mobile)
  const showControls = () => {
    setIsHovered(true);
    // On mobile, auto-hide after 3 seconds
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
      if (hideControlsTimeout.current) clearTimeout(hideControlsTimeout.current);
      hideControlsTimeout.current = setTimeout(() => setIsHovered(false), 3000);
    }
  };
  const hideControls = () => {
    setIsHovered(false);
    if (hideControlsTimeout.current) clearTimeout(hideControlsTimeout.current);
  };

  useEffect(() => {
    return () => {
      if (hideControlsTimeout.current) clearTimeout(hideControlsTimeout.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-7xl mx-auto mt-12 rounded-3xl overflow-hidden sm:px-0"
      onMouseEnter={showControls}
      onMouseLeave={hideControls}
      onTouchStart={showControls}
      onClick={showControls}
    >
      {!isStarted || isEnded ? (
        <>
          <img
            src={HOMEPAGE_VIDEO_THUMBNAIL}
            alt="Whatsapp Banner"
            className="w-full h-[200px] xs:h-[300px] sm:h-[400px] md:h-[480px] lg:h-[680px] xl:h-[680px] object-cover"
            loading="eager"
            decoding="async"
            fetchPriority="high"
            style={{ aspectRatio: "2.35/1" }}
          />
          <div className="absolute inset-0 bg-black/25" />
          {showIcon && (
            <button
              onClick={handlePlay}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
              aria-label="Start Video"
            >
              <div className="w-20 h-20 rounded-full bg-white bg-opacity-90 flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="black">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </button>
          )}
        </>
      ) : (
        <>
          <video
            ref={videoRef}
            src={t.video}
            muted={false}
            playsInline
            preload="metadata"
            poster={HOMEPAGE_VIDEO_THUMBNAIL}
            className="w-full h-[200px] xs:h-[300px] sm:h-[400px] md:h-[480px] lg:h-[680px] xl:h-[680px] object-fill"
            style={{ aspectRatio: "2.35/1", cursor: "pointer" }}
            onClick={togglePlayback}
            onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
            onEnded={() => {
              setIsEnded(true);
              setIsPlaying(false);
              if (animationRef.current) cancelAnimationFrame(animationRef.current);
            }}
          />

          {showIcon && !isPlaying && !isEnded && (
            <button
              onClick={togglePlayback}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
              aria-label="Resume"
            >
              <div className="w-20 h-20 rounded-full bg-white bg-opacity-90 flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="black">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </button>
          )}

          {/* Controls visible only on hover */}
          {isHovered && !isEnded && (
            <div className="absolute bottom-0 left-0 w-full z-30 bg-gradient-to-t from-black/80 to-transparent px-4 py-2 flex items-center justify-between text-white text-sm">
              <span>{formatTime(currentTime)}</span>

              <div
                ref={progressBarRef}
                className="flex-1 mx-3 relative h-1 bg-white/30 rounded-full overflow-hidden cursor-pointer"
                onClick={handleSeek}
              >
                <div
                  className="absolute top-0 left-0 h-full bg-white"
                  style={{
                    width:
                      duration && duration !== Infinity
                        ? `${(currentTime / duration) * 100}%`
                        : "0%",
                  }}
                />
              </div>

              <span>{formatTime(duration)}</span>

              <button onClick={toggleVolume} className="ml-3">
                {volume > 0 ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="white" width="20" height="20" viewBox="0 0 24 24">
                    <path d="M5 9v6h4l5 5V4l-5 5H5z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="white" width="20" height="20" viewBox="0 0 24 24">
                    <path d="M5 9v6h4l5 5V4l-5 5H5z" />
                    <line x1="19" y1="5" x2="5" y2="19" stroke="white" strokeWidth="2" />
                  </svg>
                )}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default WhatsappBanner;
