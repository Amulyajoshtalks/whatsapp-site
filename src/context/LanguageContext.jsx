import { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [selectedLang, setSelectedLang] = useState("English");

  return (
    <LanguageContext.Provider value={{ selectedLang, setSelectedLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
