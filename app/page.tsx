import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <>
      <Card className="bg-zinc-500 w-64 h-lvh">
        <CardTitle className="text-center py-5">Modapay</CardTitle>
        <Card className="rounded-lg bg-slate-900 mx-2">
          <Accordion type="single"  className="rounded-xl py-2 ">
            <AccordionItem value="item-1">
              <AccordionTrigger  className="flex items-center ml-8 mr-3">Dashboard</AccordionTrigger>
              <AccordionContent>
                <Button>Painel</Button>
                <Button>Transações</Button>
                <Button>Cobranças</Button>
                <Button>Usuários</Button>
                <Button>Marketing</Button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>
      </Card>
    </>
  );
}
