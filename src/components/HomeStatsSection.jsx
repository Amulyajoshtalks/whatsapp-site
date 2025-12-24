import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import arrowIcon from "../assets/arrowIcon.png";
import hoverIcon2 from "../assets/hoverIcon2.png";
import pic1 from "../assets/sliderImages/pic1.jpg";
import pic2 from "../assets/sliderImages/pic2.jpg";
import pic3 from "../assets/sliderImages/pic3.jpg";
import pic4 from "../assets/sliderImages/pic4.jpg";
import pic5 from "../assets/sliderImages/pic5.jpg";
import pic6 from "../assets/sliderImages/pic6.jpg";
import { useLanguage } from "../context/LanguageContext";
import { homePageTranslations } from "../utils/homePageTranslations";

const images = [pic5, pic1, pic2, pic3, pic4, pic6];

const Section = styled.section`
  width: 100%;
  max-width: 1920px;
  margin: auto;
  min-height: 50vh;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  padding: 8vw 0;
  @media (max-width: 900px) {
    flex-direction: column;
    padding: 8vw 0;
    height: 400px;
    min-height: unset;
  }
`;

const Left = styled.div`
  padding-left: 5vw;
  @media (max-width: 900px) {
    padding-left: 0;
    width: 100%;
    text-align: center;
    max-width: 100%;
  }
`;

const Title = styled.div`
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-weight: 400;
  font-size: clamp(12px, 2vw, 25px);
  line-height: clamp(20px, 2.8vw, 50px);
  color: #111;
  margin-bottom: clamp(2px, 3.5vw, 55px);
  margin-top: clamp(2px, 2vw, 50px);
  margin-left: clamp(8px, 2vw, 0px);
  margin-right: clamp(8px, 2vw, 0px);
`;

const BigStat = styled.div`
  font-family: "Helvetica Neue World", Helvetica, Arial, sans-serif;
  font-weight: 500;
  // font-size: clamp(30px, 8vw, 110px);
  line-height: clamp(50px, 5vw, 50px);
  color: #111;
  margin-bottom: clamp(20px, 2vw, 40px);
   font-size: ${({ lang }) => (lang === "தமிழ்" ? "clamp(25px, 6.2vw, 110px)" : "clamp(30px, 8vw, 110px)")};  }

  @media (max-width: 768px) {
    margin-bottom: 5px;
  }
`;

const SubText = styled.div`
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-weight: 400;
  font-size: clamp(12px, 2vw, 25px);
  line-height: clamp(20px, 2.8vw, 50px);
  margin-bottom: clamp(20px, 1.5vw, 40px);
  color: #111;
`;

const Arrows = styled.div`
  display: flex;
  gap: 2vw;
  margin-top: clamp(10px, 2.8vw, 50px);

  &.mobile-arrows {
    display: none;
  }

  &.desktop-arrows {
    display: flex;
  }

  @media (max-width: 900px) {
    &.mobile-arrows {
      display: flex;
      justify-content: center;
      margin-top: 6vw;
    }

    &.desktop-arrows {
      display: none;
    }
  }
`;

const ArrowButton = styled.button`
  width: clamp(25px, 6vw, 70px);
  height: clamp(25px, 6vw, 70px);
  border-radius: 50%;
  border: 1.5px solid #111;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0;
  outline: none;

  &:not(:disabled):hover {
    background: #111;
    border-color: #111;
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const CarouselContainer = styled.div`
  position: relative;
  width: clamp(300px, 50vw, 720px);
  overflow: hidden;
  margin-left: 0px;
  @media (max-width: 900px) {
    overflow: visible;
    padding: 0 5vw;
  }
`;

const Slides = styled.div`
  display: flex;
  transition: transform 0.6s ease-in-out;
  transform: ${(props) =>
    `translateX(calc(-${props.current * 80}% - ${props.current * 36}px))`};
`;

const Slide = styled.div`
  width: 80%;
  height: clamp(100px, 30vw, 400px);
  margin-right: 40px;
  opacity: ${(props) => (props.active ? 1 : 0.6)};
  transition: opacity 0.35s ease-in-out;
  flex-shrink: 0;
  position: relative;
`;

const SlideImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 24px;
`;

const HomeStatsSection = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  const { selectedLang } = useLanguage();
  const t =
    homePageTranslations[selectedLang] || homePageTranslations["English"];
  const [hovered, setHovered] = useState("");

  // Home slider → Success Stories mapping (serial-wise)
  // Tab 1 - Truffle tangles by ILA            -> truffleTangles
  // Tab 2 - Singh's Foto by Shaan             -> singhsPhotoByShaan
  // Tab 3 - Singh's Foto by Shaan             -> singhsPhotoByShaan
  // Tab 4 - Savvytree                         -> savvyTree
  // Tab 5 - Travel Connection                 -> travelConnection
  // Tab 6 - Mondello Domani                   -> modelloDomani
  const storyIdBySlide = [
    "truffleTangles",
    "singhsPhotoByShaan",
    "singhsPhotoByShaan",
    "savvyTree",
    "travelConnection",
    "modelloDomani",
  ];

  const handleSlideClick = (index) => {
    const storyId = storyIdBySlide[index];
    navigate("/success-stories", { state: { autoOpenId: storyId } });
  };

  const next = () => {
    if (current < images.length - 1) {
      setCurrent((prev) => prev + 1);
    }
  };

  const prev = () => {
    if (current > 0) {
      setCurrent((prev) => prev - 1);
    }
  };

  const renderArrows = (isMobile = false) => (
    <Arrows className={isMobile ? "mobile-arrows" : "desktop-arrows"}>
      <ArrowButton
        onClick={prev}
        disabled={current === 0}
        onMouseEnter={() => setHovered("prev")}
        onMouseLeave={() => setHovered("")}
      >
        <img
          src={hovered === "prev" && current !== 0 ? hoverIcon2 : arrowIcon}
          alt="Previous"
          style={{
            width: "clamp(15px, 4vw, 30px)",
            height: "clamp(15px, 4vw, 30px)",
            transform: "rotate(90deg)",
          }}
        />
      </ArrowButton>
      <ArrowButton
        onClick={next}
        disabled={current === images.length - 1}
        onMouseEnter={() => setHovered("next")}
        onMouseLeave={() => setHovered("")}
      >
        <img
          src={
            hovered === "next" && current !== images.length - 1
              ? hoverIcon2
              : arrowIcon
          }
          alt="Next"
          style={{
            width: "clamp(15px, 4vw, 30px)",
            height: "clamp(15px, 4vw, 30px)",
            transform: "rotate(270deg)",
          }}
        />
      </ArrowButton>
    </Arrows>
  );

  return (
    <Section>
      <Left>
        <Title>
          {t.EngageAudiences?.split("\n").map((line, idx) => (
            <React.Fragment key={idx}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </Title>
        <BigStat className="md:mb-5" lang={selectedLang}>
          {t.ThreeBillion}
        </BigStat>
        <SubText>{t.UsersAround}</SubText>
        {renderArrows(false)}
      </Left>
      <div>
        <CarouselContainer>
          <Slides current={current}>
            {images.map((img, idx) => (
              <Slide
                key={idx}
                active={idx === current}
                role="button"
                tabIndex={0}
                aria-label={`Open success story ${idx + 1}`}
                onClick={() => handleSlideClick(idx)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") handleSlideClick(idx);
                }}
                style={{ cursor: "pointer" }}
              >
                <SlideImg
                  src={img}
                  alt={`Slide ${idx + 1}`}
                  loading={idx === current ? "eager" : "lazy"}
                  decoding="async"
                />
              </Slide>
            ))}
          </Slides>
        </CarouselContainer>
        {renderArrows(true)}
      </div>
    </Section>
  );
};

export default HomeStatsSection;
