'use client'
import React from "react";
import NavBar from "@/Components/NavBar"
import TopBar from "@/Components/TopBar"
import { Scrollbar } from "smooth-scrollbar-react";
function layout({ children }) {
  return (
    <div className="w-full h-screen mainBg flex items-center justify-center">
      <div className="containerBg w-[calc(100%-30px)] h-[calc(100vh-30px)] flex relative">
        <TopBar/>
        <NavBar />
        <div className="mt-20 px-7 py-7 w-full overflow-y-auto">
          <Scrollbar
            className="hide-scrollbar"
            plugins={{
              overscroll: {
                effect: "bounce",
              },
            }}
            damping={0.05}
            thumbMaxSize={20}
            renderByPixels={true}
            alwaysShowTracks={false}
            continuousScrolling={true}
          >

              {children}
            
          </Scrollbar>
        </div>
      </div>
    </div>
  );
}

export default layout;
