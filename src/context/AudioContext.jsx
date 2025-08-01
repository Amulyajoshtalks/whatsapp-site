import React, { createContext, useState, useContext, useEffect } from "react";

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [showIcon, setShowIcon] = useState(true);

  return (
    <AudioContext.Provider value={{ showIcon, setShowIcon }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);
