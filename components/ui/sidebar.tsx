import React, { useEffect } from "react";
import Image from "next/image";
import { CardTitle } from "./card";
import Secao from "./secao";
import { Button } from "./button";
import { IconArrowBigLeftLineFilled, IconArrowBigRightLineFilled } from "@tabler/icons-react";

interface SidebarProps {
  isOpen: boolean; // Propriedade que indica se o Sidebar está aberto
  toggleSidebar: () => void; // Função para alternar o estado do Sidebar
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  
  useEffect(() => {
    const handleResize = () => {
      // Fecha o sidebar se a largura da janela for menor que 768px (por exemplo)
      if (window.innerWidth < 768 && isOpen) {
        toggleSidebar();
      }
    };

    // Adiciona o event listener para monitorar o redimensionamento da janela
    window.addEventListener("resize", handleResize);

    // Remove o event listener quando o componente é desmontado
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen, toggleSidebar]);

  return (
    <div className="fixed flex ">
      <div className={ ` bg-pink-700 ${isOpen ? "w-64" : "w-0"} min-h-screen transition-width duration-300 `}>
        {isOpen && (
          <>
            <CardTitle className="text-center py-5 flex justify-center h-20 items-center gap-2 border-b border-b-neutral-400 mb-2">
              <Image src="/logosemfundo.png" width={180} height={100} alt="Rewind-UI" className="rounded-sm" />
            </CardTitle>
            <Secao/>
          </>
        )}
      </div>
      <Button onClick={toggleSidebar} className={`absolute z-50 top-72 ${isOpen ? "left-60" : "left-2"} transform -translate-x-1/2 transition-all duration-300`}>
        {isOpen ? <IconArrowBigLeftLineFilled/> : <IconArrowBigRightLineFilled/>} 
      </Button>
    </div>
  );
}

export default Sidebar;
