'use client'
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
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cabecalho from "@/components/ui/cabecalho";
import UltimasPixIn from "@/components/ui/ultimasPixIn";
import UltimasPixOut from "@/components/ui/ultimasPixOut";
import Auth from "./auth/auth";


export default function Home() {
Auth()

  return (

        <div className="flex">
            <Sidebar />
            <div className="flex-1" style={{ width: 'calc(100% - 300px)' }}>
                <div className="flex-col">
                    <Header titulo="PIX Out" />
          <Cabecalho/>
          <div className="flex mt-5 flex-wrap gap-4 ml-6 mr-6">
            <Card className=" flex-1 rounded-xl max-h-96 p-5 pb-20 ">

              <Example />
            </Card>
            <Card className=" flex-1 rounded-xl max-h-96 p-5 pb-20 ">
              <h1 className="mb-5">Grafico transações</h1>
              <Example2  />
            </Card>
          </div>
          <div className="flex-1">

            <UltimasPixIn/>
            <UltimasPixOut/>

          </div>
          <div className="flex mb-5">
          <Card className=" flex-1 rounded-xl max-h-96 p-5 ml-6 mr-6 mt-5">
              Últimas Transações Maquininha
              <Table className="scroll-mr-10">
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
</div>
  );
}
