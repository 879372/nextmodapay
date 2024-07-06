'use client'
import Header from "@/components/ui/hearder";
import { Card } from "@/components/ui/card";
import { ArrowDown, CreditCard, DollarSign, DollarSignIcon, Users } from "lucide-react";
import Example from "../components/ui/grafico";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Example2 from "@/components/ui/graficoDePizza";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import Sidebar from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IconMoneybag } from "@tabler/icons-react";

export default function Home() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/auth/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (!isAuthenticated) {
    return null; // ou você pode retornar um loader
  }

  return (
    <>
      <div className="flex w-full">
        <Sidebar />
        <div className="flex flex-col w-full">
          <Header />
          <div className="flex flex-wrap justify-between mt-14 ml-8 mr-8 gap-2">
            <Card className="w-[380px] min-w-[100px] rounded-xl flex pt-3 pl-3 pb-3 gap-3 items-center">
              <div className="w-14 h-14 bg-slate-100 rounded-full flex justify-center items-center">
                <DollarSignIcon  className="text-[#11CE8A]" />
              </div>
              <div className="flex items-center gap-5">
                <h3 className="text-sm font-semibold">PIX IN</h3>
                <p className="text-sm text-[#11CE8A] font-bold">13.450</p>
              </div>
            </Card>
            <Card className=" w-[380px] min-w-[100px] rounded-xl flex pt-4 pl-4 pb-4  gap-3 items-center">
              <div className="w-14 h-14 bg-slate-100 rounded-full flex justify-center items-center">
                <ArrowDown  className="text-[#FD0000]" />
              </div>
              <div className="flex items-center gap-5">
                <h3 className="text-sm font-semibold">PIX OUT</h3>
                <p className="text-sm text-[#FD0000] font-bold">13.450</p>
              </div>
            </Card>
            <Card className=" w-[380px] min-w-[100px] rounded-xl  flex pt-4 pl-4 pb-4 gap-3  items-center">
              <div className="w-14 h-14 bg-slate-100 rounded-full flex justify-center items-center">
                <CreditCard  className="text-[#3B82F6]" />
              </div>
              <div className="flex items-center gap-5">
                <h3 className="text-sm font-semibold">MAQUININHA</h3>
                <p className="text-sm text-[#3B82F6] font-bold">13.450</p>
              </div>
            </Card>
          </div>

          <div className="flex mt-5 justify-between flex-wrap">
            <Card className=" w-1/2 rounded-xl max-h-96 p-5 pb-20 ml-8">
              <h1 className="mb-5">Grafico transações</h1>
              <Example />
            </Card>
            <Card className=" w-1/3 rounded-xl max-h-96 p-5 pb-20 mr-8">
              <h1 className="mb-5">Grafico transações</h1>
              <Example2 />
            </Card>

            
          </div>
          <div className="flex justify-between mt-5 mb-5">
          <Card className=" w-[540px]  transacoes_suspeitas  rounded-xl max-h-96 p-5 ml-8">
              Transações Pix In
              <Table className="scroll-mr-10">
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Invoice</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">INV001</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell className="text-right">$250.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">INV001</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell className="text-right">$250.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">INV001</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell className="text-right">$250.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">INV001</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell className="text-right">$250.00</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>
            <Card className=" w-[540px]  transacoes_suspeitas  rounded-xl max-h-96 p-5 ml-5 mr-8">
              Transações Pix Out
              <Table className="scroll-mr-10">
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Invoice</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">INV001</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell className="text-right">$250.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">INV001</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell className="text-right">$250.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">INV001</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell className="text-right">$250.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">INV001</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell className="text-right">$250.00</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>
          </div>
          <div className="flex justify-between mt-5 mb-5">
          <Card className=" w-full rounded-xl max-h-96 p-5 ml-8 mr-8">
              Transações Maquininha
              <Table className="scroll-mr-10">
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Invoice</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">INV001</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell className="text-right">$250.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">INV001</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell className="text-right">$250.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">INV001</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell className="text-right">$250.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">INV001</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell className="text-right">$250.00</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
