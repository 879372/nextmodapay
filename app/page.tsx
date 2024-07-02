import Header from "@/components/ui/hearder";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card } from "@/components/ui/card";
import { User, Users } from "lucide-react";
import Grafico from "../components/ui/grafico"
import Example from "../components/ui/grafico";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Example2 from "@/components/ui/graficoDePizza";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import Sidebar from "@/components/ui/sidebar";

export default function Home() {
  return (
    <>
      <Header />
      <Sidebar/>
      <div className="flex justify-between mt-14 flex-wrap ml-8 mr-8 ">
        <Card className=" w-1/5 rounded-xl  flex pt-3 pl-3 pb-3 gap-3  items-center">
          <div className="w-14 h-14 bg-slate-400 rounded-full flex justify-center items-center " >
            <Users className="" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-sm">Clientes totais</h3>
            <p className="text-xs">13.450</p>
          </div>
        </Card>
        <Card className=" w-1/5 rounded-xl flex pt-4 pl-4 pb-4  gap-3 items-center">
          <div className="w-14 h-14 bg-slate-400 rounded-full flex justify-center items-center" >
            <Users className="" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-sm">Cobranças</h3>
            <p className="text-xs">13.450</p>
          </div>
        </Card>
        <Card className=" w-1/5 rounded-xl  flex pt-4 pl-4 pb-4 gap-3  items-center">
          <div className="w-14 h-14 bg-slate-400 rounded-full flex justify-center items-center" >
            <Users className="" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-sm">Transações</h3>
            <p className="text-xs">13.450</p>
          </div>
        </Card>
        <Card className=" w-1/5 rounded-xl  flex  pt-4 pl-4 pb-4 gap-3  items-center ">
          <div className="w-14 h-14 bg-slate-400 rounded-full flex justify-center items-center" >
            <Users className="" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-sm">Transações suspeitas</h3>
            <p className="text-xs">13.450</p>
          </div>
        </Card>

      </div>
      
      <div className="flex mt-5 justify-between flex-wrap">
        <Card className=" w-1/2 rounded-xl max-h-96 p-5 pb-20 ml-8">
          <h1 className="mb-5">Grafico transações</h1>
          <Example />
        </Card>

        <Card className=" w-[540px]  transacoes_suspeitas  rounded-xl max-h-96 p-5 ml-5 mr-8">Table transações suspeitas
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
      <div className="flex justify-evenly mt-5">
        <Card className=" w-[585px] rounded-xl max-h-96 p-5 pb-10">Clientes
          <Example2 />
        </Card>
        <Card className=" w-[585px] rounded-xl max-h-96 p-5 pb-10"> Cobranças
          <div className="flex justify-between">
            <h1>R$ 5.000</h1>
            <h3>Ver todos</h3>
          </div>
          <Table>
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
      <div className="flex justify-evenly mt-5">
        <Card className=" w-full rounded-xl max-h-96 flex-col ml-10 mr-10 mb-10 p-5">
          <div className="flex justify-between">
            <h1>adiministradores</h1>
            <h1>Filtro: Todos</h1>
          </div>
          <div className="flex items-center gap-3 border p-2 rounded-xl">
            <div className="w-14 h-14 bg-slate-400 rounded-full flex justify-center items-center" >
              <Users className="" />
            </div>
            <div className="flex flex-col">
              <h3 className="text-sm">José Kaio</h3>
              <p className="text-xs">kaios5028@gmail.com</p>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
