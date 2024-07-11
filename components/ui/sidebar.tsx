import React, { useState, useEffect } from "react";
import Image from "next/image";
import { CardTitle } from "./card";
import Secao from "./secao";
import { Button } from "./button";
import { IconArrowBigLeftLineFilled, IconArrowBigRightLineFilled } from "@tabler/icons-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const handleMediaQueryChange = (e: any) => {
      if (!e.matches) {
        setIsOpen(false);
        setIsSmallScreen(true);
      } else {
        setIsSmallScreen(false);
      }
    };

    mediaQuery.addEventListener('change', handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);

  return (
    <div className="relative flex">
      <div className={`bg-pink-700 ${isOpen ? "w-64" : "w-0"} ${isSmallScreen ? "fixed z-50" : "relative"} min-h-screen transition-width duration-300 overflow-y-auto`}>
        {isOpen && (
          <>
            <CardTitle className="text-center py-5 flex justify-center h-20 items-center gap-2 border-b border-b-neutral-400 mb-2">
              <Image src="/logosemfundo.png" width={180} height={100} alt="Rewind-UI" className="rounded-sm" />
            </CardTitle>
            <Secao />
          </>
        )}
      </div>
      <Button onClick={toggleSidebar} className={`absolute z-50 top-72 ${isOpen ? "left-60" : "left-2"} transform -translate-x-1/2 transition-all duration-300`}>
        {isOpen ? <IconArrowBigLeftLineFilled/> : <IconArrowBigRightLineFilled/>} 
      </Button>
    </div>
  );
}
