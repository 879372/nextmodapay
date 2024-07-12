import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "./card";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IconBusinessplan, IconChartBar, IconHome, IconLogout, IconMoneybag, IconUserEdit } from "@tabler/icons-react";
import { Banknote, Briefcase, File, FileText, Receipt, Slash, Truck, User, UserCheck, UserPlus, Users, Zap } from "lucide-react";
import { useRouter } from 'next/navigation'; 

export default function Secao() {
    const router = useRouter(); 
    const handleLogout = () => {
        localStorage.removeItem('token');
      };
      
    return (
        <ScrollArea className="flex  h-full">
            <div className="flex flex-col gap-1  ">
                <Card className="rounded-xl bg-pink-900 text-white mx-2">
                    <Accordion type="single" collapsible defaultValue="item-1" className="rounded-xl py-3">
                        <AccordionItem value="item-1">
                            <AccordionTrigger className="flex items-center ml-8 mr-3">Dashboard</AccordionTrigger>
                            <AccordionContent>
                                <Link href="/" className="flex items-center bg-pink-900 px-8 h-10 w-full py-5 pt-7 hover:text-gray-600">
                                    <IconHome size={24} strokeWidth={1.5} className="mr-2" />
                                    Painel
                                </Link>
                                <Link href="/table/pix_in" className="flex items-center bg-pink-900 px-8 h-10 w-full py-5 pt-7 hover:text-gray-600">
                                    <IconMoneybag size={24} strokeWidth={1.5} className="mr-2" />
                                    Pix In
                                </Link>
                                <Link href="/table/pix_out" className="flex items-center bg-pink-900 px-8 h-10 w-full py-5 pt-7 hover:text-gray-600">
                                    <Banknote size={24} strokeWidth={1.5} className="mr-2" />
                                    Pix Out
                                </Link>
                                <Link href="/" className="flex items-center bg-pink-900 px-8 h-10 w-full py-5 pt-7 hover:text-gray-600">
                                    <Users size={24} strokeWidth={1.5} className="mr-2" />
                                    Usuários
                                </Link>
                                <Link href="/" className="flex items-center bg-pink-900 px-8 h-10 w-full py-5 pt-7 hover:text-gray-600">
                                    <IconChartBar size={24} strokeWidth={1.5} className="mr-2" />
                                    Marketing
                                </Link>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </Card>
                <Card className="rounded-xl bg-pink-900 text-white mx-2">
                    <Accordion type="single" collapsible defaultValue="item-2" className="rounded-xl py-3">
                        <AccordionItem value="item-2">
                            <AccordionTrigger className="flex items-center ml-8 mr-3">Clientes</AccordionTrigger>
                            <AccordionContent>
                                <Link href="/" className="flex items-center bg-pink-900 px-8 h-10 w-full py-5 pt-7 hover:text-gray-600">
                                    <User size={24} strokeWidth={1.5} className="mr-2" />
                                    Pessoa Física
                                </Link>
                                <Link href="/" className="flex items-center bg-pink-900 px-8 h-10 w-full py-5 pt-7 hover:text-gray-600">
                                    <IconBusinessplan size={24} strokeWidth={1.5} className="mr-2" />
                                    Pessoa Jurídica
                                </Link>
                                <Link href="/" className="flex items-center bg-pink-900 px-8 h-10 w-full py-5 pt-7 hover:text-gray-600">
                                    <Receipt size={24} strokeWidth={1.5} className="mr-2" />
                                    Cobranças
                                </Link>

                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </Card>
                {/* <Card className="rounded-xl bg-pink-900 text-white mx-2">
                    <Accordion type="single" collapsible defaultValue="item-3" className="rounded-xl py-3">
                        <AccordionItem value="item-3">
                            <AccordionTrigger className="flex items-center ml-8 mr-3">Transporte</AccordionTrigger>
                            <AccordionContent>
                                <Link href="/" className="flex items-center bg-pink-900 px-8 h-10 w-full py-5 pt-7 hover:text-gray-600">
                                    <Truck size={24} strokeWidth={1.5} className="mr-2" />
                                    Transportadoras
                                </Link>
                                <Link href="/" className="flex items-center bg-pink-900 px-8 h-10 w-full py-5 pt-7 hover:text-gray-600">
                                    <UserCheck size={24} strokeWidth={1.5} className="mr-2" />
                                    Motoristas
                                </Link>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </Card> */}
                <Card className="rounded-xl bg-pink-900 mx-2 text-white">
                    <Accordion type="single" collapsible defaultValue="item-4" className="rounded-xl py-3">
                        <AccordionItem value="item-4">
                            <AccordionTrigger className="flex items-center ml-8 mr-3">Configurações</AccordionTrigger>
                            <AccordionContent>
                                <Link href="/profile" className="flex items-center bg-pink-900 px-8 h-10 w-full py-5 pt-7 hover:text-gray-600">
                                    <IconUserEdit size={24} strokeWidth={1.5} className="mr-2" />
                                    Perfil
                                </Link>
                                <Link href="/auth/login" onClick={handleLogout} className="flex items-center bg-pink-900 px-8 h-10 w-full py-5 pt-7 hover:text-gray-600">
                                    <IconLogout size={24} strokeWidth={1.5} className="mr-2" />
                                    Sair
                                </Link>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </Card>
                {/* <Card className="rounded-xl bg-pink-900 mx-2 text-white">
                    <Accordion type="single" collapsible defaultValue="item-5" className="rounded-xl py-3">
                        <AccordionItem value="item-5">
                            <AccordionTrigger className="flex items-center ml-8 mr-3">Configurações</AccordionTrigger>
                            <AccordionContent>
                                <Link href="/" className="flex items-center bg-pink-900 px-8 h-10 w-full py-5 pt-7 hover:text-gray-600">
                                    <Zap size={24} strokeWidth={1.5} className="mr-2" />
                                    Webhooks
                                </Link>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </Card>
                <Card className="rounded-xl bg-pink-900 mx-2 text-white">
                    <Accordion type="single" collapsible defaultValue="item-6" className="rounded-xl py-3">
                        <AccordionItem value="item-6">
                            <AccordionTrigger className="flex items-center ml-8 mr-3">Financeiro</AccordionTrigger>
                            <AccordionContent>
                                <Link href="/" className="flex items-center bg-pink-900 px-8 h-10 w-full py-5 pt-7 hover:text-gray-600">
                                    <FileText size={24} strokeWidth={1.5} className="mr-2" />
                                    Relatórios
                                </Link>
                                <Link href="/" className="flex items-center bg-pink-900 px-8 h-10 w-full py-5 pt-7 hover:text-gray-600">
                                    <File size={24} strokeWidth={1.5} className="mr-2" />
                                    CTRC
                                </Link>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </Card> */}
            </div>
        </ScrollArea>
    );
}
