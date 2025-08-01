import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import { useLanguage } from "../context/LanguageContext";
import { homePageTranslations } from "../utils/homePageTranslations";

// Keyframes for the animations
const slideUpAndOut = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  80% {
    opacity: 1;
    transform: translateY(-80%);
  }
  100% {
    opacity: 0;
    transform: translateY(-100%);
  }
`;

const slideInFromDown = keyframes`
  0% {
    opacity: 0;
    transform: translateY(100%);
  }
  20% {
    opacity: 1;
    transform: translateY(20%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Wrapper = styled.div`
  position: relative;
  height: 4rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  @media (max-width: 576px) {
    height: 2.2rem;
  }
  @media (min-width: 577px) and (max-width: 767px) {
    height: 2.7rem;
  }
`;

// Responsive AnimatedSpan
const AnimatedSpan = styled.span`
  position: absolute;
  left: 0;
  right: 0;
  text-align: center;
  color: #25d366;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  letter-spacing: 0%;
  line-height: 60px;
  font-size: 45px;
  font-weight: 400;
  opacity: 0;
  pointer-events: none;
  ${(props) =>
    props.visible &&
    css`
      opacity: 1;
      pointer-events: auto;
      transition: opacity 0.2s;
    `}
  ${(props) =>
    props.animateOut &&
    css`
      animation: ${slideUpAndOut} 0.7s forwards;
    `}
  ${(props) =>
    props.animateIn &&
    css`
      animation: ${slideInFromDown} 0.7s forwards;
    `}
  @media (max-width: 576px) {
    font-size: 18px;
    line-height: 28px;
  }
  @media (min-width: 577px) and (max-width: 767px) {
    font-size: 24px;
    line-height: 36px;
  }
  @media (min-width: 768px) and (max-width: 1199px) {
    font-size: 32px;
    line-height: 44px;
  }
  @media (min-width: 1200px) {
    font-size: 45px;
    line-height: 60px;
  }
`;

const DISPLAY_TIME = 1000;
const ANIMATION_TIME = 700;

const AnimatedText = () => {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState("visible");
  const { selectedLang } = useLanguage();

  const t =
    homePageTranslations[selectedLang] || homePageTranslations["English"];

  const PHRASES = [t.Showcasing, t.Boosting, t.Building];

  useEffect(() => {
    let timeout;
    if (phase === "visible") {
      timeout = setTimeout(() => setPhase("out"), DISPLAY_TIME);
    } else if (phase === "out") {
      timeout = setTimeout(() => {
        setIndex((prev) => (prev + 1) % PHRASES.length);
        setPhase("in");
      }, ANIMATION_TIME);
    } else if (phase === "in") {
      timeout = setTimeout(() => setPhase("visible"), ANIMATION_TIME);
    }
    return () => clearTimeout(timeout);
  }, [phase]);

  return (
    <Wrapper>
      <AnimatedSpan
        visible={phase === "visible" && index === 0}
        animateOut={phase === "out" && index === 0}
        animateIn={phase === "in" && index === 0}
      >
        {PHRASES[0]}
      </AnimatedSpan>
      <AnimatedSpan
        visible={phase === "visible" && index === 1}
        animateOut={phase === "out" && index === 1}
        animateIn={phase === "in" && index === 1}
      >
        {PHRASES[1]}
      </AnimatedSpan>
      <AnimatedSpan
        visible={phase === "visible" && index === 2}
        animateOut={phase === "out" && index === 2}
        animateIn={phase === "in" && index === 2}
      >
        {PHRASES[2]}
      </AnimatedSpan>
    </Wrapper>
  );
};

export default AnimatedText;
