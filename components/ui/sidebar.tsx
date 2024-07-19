import React, { useEffect } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./button";
import { IconArrowBigLeftLineFilled, IconArrowBigRightLineFilled } from "@tabler/icons-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "./card";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IconBusinessplan, IconChartBar, IconHome, IconLogout, IconMoneybag, IconUserEdit } from "@tabler/icons-react";
import { Banknote, Receipt, Users } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && isOpen) {
        toggleSidebar();
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen, toggleSidebar]);

  const handleLogout = () => {
    localStorage.removeItem('token');
  };

  const isActivePage = (href: string) => {
    return pathname === href;
  };

  return (
    <div className="fixed z-50 flex">
      <div className={`bg-pink-700 ${isOpen ? "w-64" : "w-0"} min-h-screen transition-width duration-300`}>
        {isOpen && (
          <>
            <ScrollArea className="flex h-lvh">
            <div className="text-center py-5 flex justify-center h-20 items-center gap-2 border-b border-b-neutral-400 mb-2">
              <Image src="/logosemfundo.png" width={180} height={100} alt="Rewind-UI" className="rounded-sm" />
            </div>
              <div className="flex flex-col gap-1">
                <Card className="rounded-xl bg-pink-900 text-white mx-2">
                  <Accordion type="single" collapsible defaultValue="item-1" className="rounded-xl py-3">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className={`flex items-center ml-8 mr-3 text-lg`}>
                        Dashboard
                      </AccordionTrigger>
                      <AccordionContent>
                        <Link href="/dashboard" className={`flex items-center bg-pink-900 px-8 h-10 w-full py-5 pt-7 hover:text-gray-600 ${isActivePage("/dashboard") ? "text-gray-600" : ""}`}>
                          <IconHome size={24} strokeWidth={1.5} className="mr-2" />
                          Painel
                        </Link>
                        <Link href="/table/pix_in" className={`flex items-center bg-pink-900 px-8 h-10 w-full py-5 pt-7 hover:text-gray-600 ${isActivePage("/table/pix_in") ? "text-gray-600" : ""}`}>
                          <IconMoneybag size={24} strokeWidth={1.5} className="mr-2" />
                          Pix In
                        </Link>
                        <Link href="/table/pix_out" className={`flex items-center bg-pink-900 px-8 h-10 w-full py-5 pt-7 hover:text-gray-600 ${isActivePage("/table/pix_out") ? "text-gray-600" : ""}`}>
                          <Banknote size={24} strokeWidth={1.5} className="mr-2" />
                          Pix Out
                        </Link>
                        <Link href="/dashboard" className={`flex items-center bg-pink-900 px-8 h-10 w-full py-5 pt-7 hover:text-gray-600 ${isActivePage("") ? "text-gray-600" : ""}`}>
                          <Users size={24} strokeWidth={1.5} className="mr-2" />
                          Usuários
                        </Link>
                        <Link href="/dashboard" className={`flex items-center bg-pink-900 px-8 h-10 w-full py-5 pt-7 hover:text-gray-600 ${isActivePage("") ? "text-gray-600" : ""}`}>
                          <IconChartBar size={24} strokeWidth={1.5} className="mr-2 " />
                          Marketing
                        </Link>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </Card>
                <Card className="rounded-xl bg-pink-900 text-white mx-2">
                  <Accordion type="single" collapsible defaultValue="item-2" className="rounded-xl py-3">
                    <AccordionItem value="item-2">
                      <AccordionTrigger className={`flex items-center ml-8 mr-3 text-lg ${isActivePage("/clientes") ? "bg-zinc-500" : ""}`}>
                        Clientes
                      </AccordionTrigger>
                      <AccordionContent>
                        <Link href="/dashboard" className={`flex items-center bg-pink-900 px-8 h-10 w-full py-5 pt-7 hover:text-gray-600 ${isActivePage("") ? "bg-zinc-500" : ""}`}>
                          <Users size={24} strokeWidth={1.5} className="mr-2" />
                          Pessoa Física
                        </Link>
                        <Link href="/dashboard" className={`flex items-center bg-pink-900 px-8 h-10 w-full py-5 pt-7 hover:text-gray-600 ${isActivePage("") ? "bg-zinc-500" : ""}`}>
                          <IconBusinessplan size={24} strokeWidth={1.5} className="mr-2" />
                          Pessoa Jurídica
                        </Link>
                        <Link href="/dashboard" className={`flex items-center bg-pink-900 px-8 h-10 w-full py-5 pt-7 hover:text-gray-600 ${isActivePage("") ? "bg-zinc-500" : ""}`}>
                          <Receipt size={24} strokeWidth={1.5} className="mr-2" />
                          Cobranças
                        </Link>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </Card>
                <Card className="rounded-xl bg-pink-900 mx-2 text-white">
                  <Accordion type="single" collapsible defaultValue="item-4" className="rounded-xl py-3">
                    <AccordionItem value="item-4">
                      <AccordionTrigger className={`flex items-center ml-8 mr-3 text-lg${isActivePage("/configuracoes") ? "bg-zinc-500" : ""}`}>
                        Configurações
                      </AccordionTrigger>
                      <AccordionContent>
                        <Link href="/profile" className={`flex items-center bg-pink-900 px-8 h-10 w-full py-5 pt-7 hover:text-gray-600 ${isActivePage("/profile") ? "tex-zinc-600" : ""}`}>
                          <IconUserEdit size={24} strokeWidth={1.5} className="mr-2" />
                          Perfil
                        </Link>
                        <Link href="/" onClick={handleLogout} className={`flex items-center bg-pink-900 px-8 h-10 w-full py-5 pt-7 hover:text-gray-600 ${isActivePage("/") ? "text-zinc-600" : ""}`}>
                          <IconLogout size={24} strokeWidth={1.5} className="mr-2" />
                          Sair
                        </Link>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </Card>
              </div>
            </ScrollArea>
          </>
        )}
      </div>
      <Button onClick={toggleSidebar} className={`absolute z-50 top-72 ${isOpen ? "left-60" : "left-2"} transform -translate-x-1/2 transition-all duration-300`}>
        {isOpen ? <IconArrowBigLeftLineFilled /> : <IconArrowBigRightLineFilled />}
      </Button>
    </div>
  );
}

export default Sidebar;
