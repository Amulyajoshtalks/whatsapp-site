import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const languages = ["English", "हिंदी", "मराठी", "বাংলা", "தமிழ்", "ગુજરાતી"];

const Layout = ({ children }) => {
  return (
    <div className="text-white font-sans min-h-screen flex flex-col">
      <Navbar languages={languages} />
      <main className="flex-1">{children}</main>
      <Footer id="main-footer" />
    </div>
  );
};

export default Layout;
