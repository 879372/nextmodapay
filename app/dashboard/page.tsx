'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import Example from "../../components/ui/grafico";
import Example2 from "@/components/ui/graficoDePizza";
import Sidebar from "@/components/ui/sidebar";
import Cabecalho from "@/components/ui/cabecalho";
import UltimasPixIn from "@/components/ui/ultimasPixIn";
import UltimasPixOut from "@/components/ui/ultimasPixOut";
import Auth from "../auth/auth";
import Header from "@/components/ui/hearder";

export default function Home() {
  Auth();
  const [isOpen, setIsOpen] = useState(true); 
  const [isSmallScreen, setIsSmallScreen] = useState(false); 
  const router = useRouter();

  const checkScreenSize = () => {
    setIsSmallScreen(window.innerWidth <= 768); 
  };

  const handleSidebarVisibility = () => {
    const shouldShowSidebar = window.innerWidth > 768; 
    setIsOpen(shouldShowSidebar);
  };

  useEffect(() => {
    checkScreenSize(); 
    handleSidebarVisibility()
    const handleResize = () => {
      checkScreenSize(); 
      handleSidebarVisibility(); 
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      
    };
  }, []); 

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };


  return (
    <div className="flex">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 transition-margin duration-300 ease-in-out ${isSmallScreen ? 'ml-0' : (isOpen ? 'ml-64' : 'ml-0')}`} style={{ width: isOpen ? 'calc(100% - 256px)' : '100%' }}>
      <Header titulo="Dashboard" isOpen={isOpen} toggleSidebar={toggleSidebar} />
        <div className="flex-col mt-28">
          <Cabecalho />
          <div className="flex mt-5 flex-wrap gap-4 ml-6 mr-6 flex-1">
            <Card className="flex-1 rounded-xl max-h-96 p-5 pb-20">
              <Example />
            </Card>
            <Card className="flex-1 rounded-xl max-h-96 p-5 pb-20">
              <h1 className="mb-5">Gráfico de Transações</h1>
              <Example2 />
            </Card>
          </div>

          <div className="flex-1">
            <UltimasPixIn />
            <UltimasPixOut />
          </div>
        </div>
      </div>
    </div>
  );
}
