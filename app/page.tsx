import Header from "@/components/ui/hearder";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card } from "@/components/ui/card";
import { User, Users } from "lucide-react";

export default function Home() {
  return (
    <>
      <Header />
      <div className="flex justify-around mt-10 flex-wrap">
        <Card className=" w-1/5 rounded-lg bg-pink-900 flex pt-5 pl-5 pb-5 gap-3  items-center">
          <div className="w-14 h-14 bg-slate-400 rounded-full flex justify-center items-center " >
            <Users className="" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-sm">Clientes totais</h3>
            <p className="text-xs">13.450</p>
          </div>
        </Card>
        <Card className=" w-1/5 rounded-lg bg-pink-900 flex pt-5 pl-5 pb-5  gap-3 items-center">
          <div className="w-14 h-14 bg-slate-400 rounded-full flex justify-center items-center" >
            <Users className="" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-sm">Cobranças</h3>
            <p className="text-xs">13.450</p>
          </div>
        </Card>
        <Card className=" w-1/5 rounded-lg bg-pink-900 flex pt-5 pl-5 pb-5 gap-3  items-center">
          <div className="w-14 h-14 bg-slate-400 rounded-full flex justify-center items-center" >
            <Users className="" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-sm">Transações</h3>
            <p className="text-xs">13.450</p>
          </div>
        </Card>
        <Card className=" w-1/5 rounded-lg bg-pink-900 flex  pt-5 pl-5 pb-5 gap-3  items-center ">
          <div className="w-14 h-14 bg-slate-400 rounded-full flex justify-center items-center" >
            <Users className="" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-sm">Transações suspeitas</h3>
            <p className="text-xs">13.450</p>
          </div>
        </Card>

      </div>
      <div className="flex justify-evenly mt-10">
        <Card className=" w-1/3 rounded-sm">Grafico transações</Card>
        <Card className=" w-1/3 rounded-sm">Table transações suspeitas</Card>
      </div>
      <div className="flex justify-evenly mt-10">
        <Card className=" w-1/3 rounded-sm">Clientes</Card>
        <Card className=" w-1/3 rounded-sm">Cobranças</Card>
      </div>
      <div className="flex justify-evenly mt-10">
        <Card className=" w-1/2 rounded-sm">administradores</Card>
      </div>
    </>
  );
}
