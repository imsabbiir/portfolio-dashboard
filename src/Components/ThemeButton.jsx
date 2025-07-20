"use client";
import React, { useEffect, useState } from "react";
import { FaLightbulb } from "react-icons/fa";

function ThemeButton() {
  const [isDark, setIsDark] = useState(false);

  // Load theme from localStorage on initial render
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark");
      setIsDark(true);
    } else {
      document.body.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  // Toggle theme on button click
  const handleTheme = () => {
    const newTheme = isDark ? "light" : "dark";

    if (newTheme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }

    localStorage.setItem("theme", newTheme);
    setIsDark(!isDark);
  };

  return (
    <div className="subBoxBg w-full h-[82px]">
      <div className="w-[82px] h-[82px] flex justify-center items-center text-white">
        <span
          className="activeText text-lg cursor-pointer h-10 w-10 rounded-full flex justify-center items-center bg-[#1c1c27]"
          onClick={handleTheme}
          title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          <FaLightbulb />
        </span>
      </div>
    </div>
  );
}

export default ThemeButton;
