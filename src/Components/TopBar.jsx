"use client";
import React from "react";
import { Divide as Hamburger } from "hamburger-react";
import ThemeButton from "@/Components/ThemeButton";
import { usePathname } from "next/navigation";
function TopBar({isSidebarOpen, setIsSidebarOpen}) {
  const pathname = usePathname();
  const pathTitleMap = {
  messages: "Messages",
  skills: "Skills",
  projects: "Projects",
  settings: "Settings",
  services: "Services",
  packages: "Packages",
};
   const segments = pathname.split("/").filter(Boolean);
const matchedKey = segments.find((segment) => pathTitleMap[segment]);
const capitalizedTitle = matchedKey ? pathTitleMap[matchedKey] : "Dashboard";
  return (
    <div className="absolute top-0 left-0 w-full h-20 flex justify-between items-center boxBg overflow-hidden">
      <div className="w-20 h-full">
        <div
        className={`w-20 h-20 flex justify-center items-center titleText absolute z-50 top-0 left-0 transition-all duration-700 ease-in-out ${
          isSidebarOpen ? "" : "subBoxBg"
        }`}
      >
        <Hamburger
          id="mobileNavBarIcon"
          toggled={isSidebarOpen}
          toggle={setIsSidebarOpen}
          size={20}
          duration={0.3}
          distance="sm"
          onClick={() => {
            setIsNavBarOpen(!isSidebarOpen);
          }}
        />
      </div>
        
      </div>
      <h2 className="md:text-2xl md:font-bold titleText">{capitalizedTitle}</h2>
      <div className="w-20 h-full flex justify-center items-center">
        <ThemeButton />
      </div>
    </div>
  );
}

export default TopBar;
