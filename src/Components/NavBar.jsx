"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdDashboard } from "react-icons/md";
import { FiMessageSquare, FiSettings } from "react-icons/fi";
import { RiFolder3Fill } from "react-icons/ri";
import { FaTools, FaCogs, FaBoxOpen } from "react-icons/fa";

const data = [
  {
    title: "Dashboard",
    icon: <MdDashboard />,
    link: "/",
  },
  {
    title: "Messages",
    icon: <FiMessageSquare />,
    link: "messages",
  },
  {
    title: "Services",
    icon: <FaCogs />,
    link: "services",
  },
  {
    title: "Packages",
    icon: <FaBoxOpen />,
    link: "packages",
  },
  {
    title: "Skills",
    icon: <FaTools />,
    link: "skills",
  },
  {
    title: "Projects",
    icon: <RiFolder3Fill />,
    link: "projects",
  },
  { title: "Settings", icon: <FiSettings />, link: "settings" },
];

function NavBar({isSidebarOpen}) {
  const pathname = usePathname();

  return (
    <div
      className={`h-full boxBg absolute  md:static md:left-0 shadow-lg flex flex-col py-6 space-y-6 justify-center px-4 z-40 transition-all duration-700 ease-in-out ${
        isSidebarOpen ? "w-20 left-0 md:w-64" : "w-20 -left-20"
      }`}
    >
      
      <div className={` h-fit lg:space-y-6 ${isSidebarOpen ? "" : ""}`}>
        {data.map((dt, index) => {
          const isActive =
          (dt.link === "/" && pathname === "/") ||
          (dt.link !== "/" && pathname.startsWith(`/${dt.link}`));

          return (
            <Link
              key={index}
              href={`/${dt.link}`}
              className={`group relative flex items-center gap-3 h-12 rounded-xl ${
                isActive
                  ? "activeBg text-[#1e1e28]"
                  : "titleText hover:text-white bgHover "
              }`}
            >
              <div className="flex items-center">
                <i className="w-12 h-12 flex justify-center items-center">
                  {dt.icon}
                </i>
                <span
                  className={`transition-all duration-500 ease-in-out hidden md:block ${
                    isSidebarOpen ? "opacity-100 ml-0" : "opacity-0 ml-5"
                  }`}
                >
                  {dt.title}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default NavBar;
