"use client";
import React, { useState } from "react";

import ThemeButton from "@/Components/ThemeButton";
import { usePathname } from "next/navigation";
import { Package } from "lucide-react";
function TopBar() {
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
      <div className="w-20 h-full"></div>
      <h2 className="text-2xl font-bold titleText">{capitalizedTitle}</h2>
      <div className="w-20 h-full flex justify-center items-center">
        <ThemeButton />
      </div>
    </div>
  );
}

export default TopBar;
