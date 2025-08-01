import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/storiesTranslations';
import ASSETS_PATHS from '../storiesAssets';

const itemsPerPage = 8;

const VideoGallery = ({ selectedCategory }) => {
    const { selectedLang } = useLanguage();

    const videoData = translations[selectedLang]?.items || translations['English'].items;

    const navigate = useNavigate();

    const handleVideoClick = (video) => {
        navigate("/video-player", { state: { video } });
    };

    // Reset currentPage to 1 when selectedCategory changes
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory]);

    const filteredVideos = selectedCategory === 'all'
        ? videoData
        : videoData.filter(video => video.category === selectedCategory);

    const totalPages = Math.ceil(filteredVideos.length / itemsPerPage);

    const currentVideos = filteredVideos.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="p-0 md:mt-20">

            <div className="md:px-0 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-20 md:gap-y-20 mt-8">
                {currentVideos.map((video, index) => (
                    <div>
                        <div
                            key={video.id}
                            className="md:bg-white md:rounded-2xl md:overflow-hidden md:max-w-[582px] md:h-[347px] relative group cursor-pointer"
                        >
                            {/* Desktop Video Player */}
                            <div className="hidden md:block relative w-full h-full" onClick={() => handleVideoClick(video)}>
                                <video
                                    nocontrols="true"
                                    controlsList="nodownload nofullscreen noremoteplayback"
                                    disablePictureInPicture
                                    playsInline
                                    poster={video.poster}
                                    className="w-full h-full object-cover"
                                >
                                    <source src={video.url} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>

                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                    <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-[#E5E5E5]/65">
                                        <div className="absolute bottom-0 left-0 right-0 p-6">
                                            <p className={`text-[14px] sm:text-[16px]  text-[#103928] mb-4
                                            ${selectedLang === 'தமிழ்' ? 'md:text-[19px]' : 'md:text-[21px]'}`}>
                                                {video.title} | {video.location}
                                            </p>
                                            <div className="space-y-1">
                                                <p className={`text-[14px] sm:text-[16px] text-[#000000]
                                                ${selectedLang === 'தமிழ்' ? 'md:text-[16px] lg:text-[15px] sm:text-[14px]' : 'md:text-[21px]'}`}>
                                                    {video.tagline}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Mobile Video Player */}
                        <div className="w-full overflow-x-hidden">
                            <div className="w-full p-0 md:hidden">
                                <div
                                    key={video.id}
                                    className={`flex w-full gap-8 font-helvetica max-w-7xl mx-auto ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                                        }`}
                                    onClick={() => handleVideoClick(video)}
                                    style={{ justifyContent: 'space-between' }}
                                >

                                    <div className="w-[50%] flex-shrink-0">
                                        <div className="w-full aspect-[14/9]">
                                            <video
                                                controlsList="nodownload nofullscreen noremoteplayback"
                                                disablePictureInPicture
                                                playsInline
                                                poster={video.poster}
                                                className="w-full h-full object-cover rounded-lg"
                                            >
                                                <source src={video.url} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                        </div>
                                    </div>


                                    <div className="w-[50%] flex-grow">
                                        <div
                                            className={`flex flex-col w-full ${index % 2 === 0 ? 'text-left pl-0 text-end' : 'text-right pr-0 text-start'
                                                }`}
                                        >
                                            <div className="w-full h-[150px]">
                                                <h3 className="text-[12px] font-medium leading-tight text-[#103928] mb-0 mt-2 w-full">
                                                    {video.title}
                                                </h3>
                                                <p className="text-[12px] font-normal leading-snug text-[#103928] mb-2 w-full">
                                                    {video.location}
                                                </p>
                                                <p className="text-[8px] font-normal leading-snug text-[#1C1E21] mb-2 w-full">
                                                    {video.tagline}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>



                    </div>
                ))}
            </div>


            {/* Pagination Controls */}
            <div className="flex items-center justify-center gap-6 mt-8 md:mt-20 md:mb-20">
                {/* Back Arrow */}
                {currentPage > 1 && (
                    <button
                        onClick={() => goToPage(currentPage - 1)}
                        className="text-xl font-bold hover:text-gray-600"
                    >
                        <img
                            src={ASSETS_PATHS.nextCorousalImage}
                            alt="Previous"
                            className="w-4 h-4 md:w-6 md:h-6 transform -scale-x-100"
                        />
                    </button>
                )}

                {/* Page Numbers */}
                {[...Array(totalPages)].map((_, idx) => {
                    const pageNum = idx + 1;
                    const isActive = pageNum === currentPage;
                    return (
                        <button
                            key={pageNum}
                            onClick={() => goToPage(pageNum)}
                            className={`text-lg font-semibold underline underline-offset-4 decoration-green-500 ${isActive ? 'text-green-600' : 'text-black hover:text-green-600'
                                }`}
                        >
                            {pageNum}
                        </button>
                    );
                })}

                {/* Next Arrow here */}
                {currentPage < totalPages && (
                    <button
                        onClick={() => goToPage(currentPage + 1)}
                        className="text-xl font-bold hover:text-gray-600"
                    >
                        <img src={ASSETS_PATHS.nextCorousalImage} alt="Next" className="w-4 h-4 md:w-6 md:h-6" />
                    </button>
                )}
            </div>
        </div>

    );
};

export default VideoGallery;
