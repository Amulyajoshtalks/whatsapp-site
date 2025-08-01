import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Catalogue from "../assets/Catalogue.svg";
import Shoedoctorlogo from "../assets/Shoedoctorlogo.svg";
import ShoeDoctorMain from "../assets/ShoeDoctorMain.jpg";
import whatsappBubble from "../assets/whatsappBubble.svg";
import { useLanguage } from "../context/LanguageContext";

const StyledImage = styled.img`
  object-fit: cover;
  // box-shadow: 0px 4px 24px 0px #00000020;
  border-radius: 10px;
  width: 200px;
  height: 240px;
  margin-left: 60px;

  @media (min-width: 768px) {
    border-radius: 15px;
    width: 240px;
    height: 320px;
    margin-left: 100px;
  }

  @media (min-width: 1024px) {
    border-radius: 20px;
    width: 440px;
    height: 500px;
    margin-left: 60px;
  }
`;

export const ChatWrapper = styled.div`
  position: absolute;
  opacity: ${({ show }) => (show ? 1 : 0)};
  transition: opacity 1.2s ease-out;
  z-index: 2;
  pointer-events: ${({ show }) => (show ? "auto" : "none")};
  bottom: clamp(50px, 9vw, 0px);
  @media (min-width: 1024px) {
    margin-left: -70px;
    top: 470px;
  }
`;

// Chat bubble with layout & tail
export const ChatBubble = styled.div`
  position: relative;
  background: #e6ffda;
  width: clamp(147px, 45vw, 280px);
  height: clamp(30px, 15vw, 68px);
  padding: clamp(4px, 1.5vw, 10px) clamp(8px, 2vw, 14px);
  padding-right: clamp(12px, 3vw, 24px); /* Extra space for tail */
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-weight: 400;
  font-size: clamp(6px, 1.5vw, 12px);
  line-height: clamp(10px, 2vw, 22px);
  letter-spacing: 0%;
  color: #111;
  box-shadow: 0 2px 8px #0001;
  border-radius: 18px;

  &::after {
    content: "";
    position: absolute;
    top: clamp(5px, 1.5vw, 12px);
    right: -10px;
    width: 0;
    height: 0;
    border-top: clamp(6px, 1.5vw, 10px) solid transparent;
    border-bottom: clamp(6px, 1.5vw, 10px) solid transparent;
    border-left: clamp(8px, 1.5vw, 12px) solid #e6ffda;
  }

  @media (max-width: 480px) {
    width: 147px;
    height: 40px;
    font-size: 6px;
    line-height: 10px;

    &::after {
      top: 5px;
      right: -8px;
      border-top: 6px solid transparent;
      border-bottom: 6px solid transparent;
      border-left: 8px solid #e6ffda;
    }
  }

  @media (min-width: 1024px) {
    width: 280px;
    height: 70px;
    font-size: 12px;
    line-height: 22px;

    &::after {
      top: 12px;
      right: -10px;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      border-left: 12px solid #e6ffda;
    }
  }
`;

export const BadgeWrapper = styled.div`
  position: absolute;
  margin-right: clamp(8px, 2vw, 30px);
  margin-left: 8px;
  left: clamp(0px, -8vw, -40px);
  top: clamp(-36px, -4vw, -24px);
  width: clamp(150px, 45vw, 280px);
  height: clamp(56px, 10vw, 76px);
  background: #e6ffda;
  border-radius: clamp(12px, 3vw, 20px);
  padding: clamp(8px, 2.5vw, 10px) clamp(8px, 4vw, 15px);
  display: flex;
  align-items: center;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  box-shadow: 0 2px 8px #0001;
  z-index: 2;
  opacity: ${({ show }) => (show ? 1 : 0)};
  transition: opacity 1.2s ease-out;
`;

export const ProfileImage = styled.img`
  width: clamp(28px, 6vw, 44px);
  height: clamp(26px, 5.5vw, 41px);
  margin-right: clamp(10px, 3vw, 18px);
  border-radius: 50%;
  object-fit: cover;
  background: black;

  @media (max-width: 480px) {
    width: 28px;
    height: 26px;
    margin-right: 10px;
  }

  @media (min-width: 1024px) {
    width: 44px;
    height: 41px;
    margin-right: 18px;
  }
`;

// Name
export const DoctorName = styled.span`
  font-weight: 500;
  font-size: clamp(16px, 2.3vw, 23px);
  color: #222;
  width: clamp(100px, 30vw, 140px);
  height: clamp(18px, 3vw, 23px);
`;

// Business Label
export const BusinessLabel = styled.span`
  font-weight: 300;
  font-size: clamp(11px, 1.5vw, 14px);
  color: #222;
  margin-top: clamp(3px, 0.8vw, 5px);
  display: block;
`;

// Verified Icon wrapper (optional)
export const VerifiedIcon = styled.svg`
  margin-left: clamp(1px, 0.4vw, 2px);
  margin-top: clamp(2px, 0.8vw, 4px);
  width: clamp(16px, 3vw, 22px);
  height: clamp(16px, 3vw, 22px);
`;

export const ProductCardWrapper = styled.div`
  position: absolute;
  bottom: clamp(12px, 2.5vw, 24px);
  right: clamp(8px, 3vw, 28px);
  width: clamp(150px, 40vw, 200px);
  height: clamp(185px, 20vw, 240px);
  background: #fff;
  border-radius: clamp(12px, 3vw, 20px);
  padding: clamp(10px, 3vw, 0px);
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  // box-shadow: 0 2px 8px #0001;
  opacity: ${({ show }) => (show ? 1 : 0)};
  transition: opacity 1.2s ease-out;
  z-index: 2;
  margin-bottom: 80px;

  @media (max-width: 480px) {
    right: 10px;
    bottom: 20px;
    top: 130px;
    bottom: 20px;
  }
`;

// Product Image
export const ProductImage = styled.img`
  width: 100%;
  height: clamp(50px, 20vw, 120px);
  border-radius: clamp(8px, 2vw, 14px);
  object-fit: cover;
  border: 1px solid #eee;
`;

// Title
export const ProductTitle = styled.div`
  font-weight: 300;
  font-size: clamp(8px, 2vw, 14px);
  margin-bottom: clamp(2px, 0.4vw, 4px);
  color: #222;
`;

// Price
export const ProductPrice = styled.div`
  font-weight: 200;
  font-size: clamp(8px, 1.8vw, 12px);
  color: #222;
  margin-bottom: clamp(3px, 1.5vw, 12px);
`;

// Input
export const ProductInput = styled.input`
  width: 100%;
  height: clamp(20px, 4vw, 38px);
  border-radius: clamp(6px, 2vw, 8px);
  border: 1px solid #ddd;
  padding: clamp(6px, 1.5vw, 8px) clamp(10px, 2.5vw, 12px);
  margin-bottom: clamp(6px, 1.5vw, 8px);
  font-size: clamp(12px, 2vw, 14px);
  background: #fafafa;
  outline: none;
`;

// Button
export const ProductButton = styled.button`
  width: 100%;
  height: clamp(20px, 4vw, 38px);
  border-radius: clamp(6px, 2vw, 8px);
  background: #fff;
  color: #222;
  font-weight: 600;
  font-size: clamp(13px, 2vw, 15px);
  padding: clamp(6px, 1.5vw, 8px) 0;
  border: 1px solid #bbb;
  cursor: pointer;
  margin-bottom: clamp(4px, 1vw, 6px);
  transition:
    background 0.2s,
    color 0.2s;

  &:hover {
    background: #24d366;
    color: #fff;
  }
`;

// Button Text
export const ProductButtonText = styled.div`
  font-weight: 300;
  font-size: clamp(8px, 2vw, 14px);
  margin-bottom: clamp(4px, 0.4vw, 4px);
  color: black;
`;

const DelayAnimationImages = () => {
  const badgeRef = useRef(null);
  const [showBadge, setShowBadge] = useState(false);
  const [showProduct, setShowProduct] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const { selectedLang } = useLanguage();

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowBadge(true);
          setTimeout(() => setShowProduct(true), 1200);
          setTimeout(() => setShowChat(true), 2400);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (badgeRef.current) {
      observer.observe(badgeRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="relative flex-shrink-0"
      style={{
        width: "clamp(300px, 80vw, 634px)",
        height: "clamp(300px, 72vw, 573px)",
        marginTop: "clamp(30px, 4vw, 32px)",
      }}
    >
      {/* 1st: Business Account Badge */}
      <BadgeWrapper ref={badgeRef} show={showBadge}>
        <img
          src={Shoedoctorlogo}
          alt="WhatsApp Bubble"
          style={{
            width: "clamp(140px, 20vw, 300px)",
            height: "auto",
            maxWidth: "100%",
            display: "block",
          }}
        />
      </BadgeWrapper>

      {/* Main Image */}
      <StyledImage src={ShoeDoctorMain} alt="Shoe Doctor at work" />

      <ProductCardWrapper show={showProduct}>
        <img
          src={Catalogue}
          alt="WhatsApp Bubble"
          style={{
            width: "clamp(140px, 20vw, 300px)",
            height: "auto", // maintain aspect ratio
            maxWidth: "100%",
            display: "block",
          }}
        />
      </ProductCardWrapper>

      {/* 3rd: WhatsApp Chat Bubble */}

      <ChatWrapper show={showChat}>
        <img
          src={whatsappBubble}
          alt="WhatsApp Bubble"
          style={{
            width: "clamp(140px, 20vw, 300px)",
            height: "auto", // maintain aspect ratio
            maxWidth: "100%",
            display: "block",
          }}
        />
      </ChatWrapper>
    </div>
  );
};

export default DelayAnimationImages;
