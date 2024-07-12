'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/ui/hearder";
import { Card } from "@/components/ui/card";
import { ArrowDown, CreditCard, DollarSignIcon } from "lucide-react";
import Example from "../components/ui/grafico";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Example2 from "@/components/ui/graficoDePizza";
import Sidebar from "@/components/ui/sidebar";
import Cabecalho from "@/components/ui/cabecalho";
import UltimasPixIn from "@/components/ui/ultimasPixIn";
import UltimasPixOut from "@/components/ui/ultimasPixOut";
import Auth from "./auth/auth";
import { ScrollArea } from "@radix-ui/react-scroll-area";

export default function Home() {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  // Function to handle sidebar visibility based on window width
  const handleSidebarVisibility = () => {
    const shouldShowSidebar = window.innerWidth > 768; // Example threshold for large screens
    setIsOpen(shouldShowSidebar);
  };

  // Effect to set sidebar visibility on component mount and window resize
  useEffect(() => {
    handleSidebarVisibility(); // Set initial sidebar visibility

    const handleResize = () => {
      handleSidebarVisibility(); // Update sidebar visibility on window resize
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Perform authentication logic
  Auth();

  return (
    <div className="flex">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 transition-margin duration-300 ease-in-out ${isOpen ? 'ml-64' : 'ml-0'}`} style={{ width: isOpen ? 'calc(100% - 300px)' : '100%' }}>
        <div className="flex-col">
          <Header titulo="Dashboard" />
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
