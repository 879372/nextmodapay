import * as React from "react"
 
import { Card, CardContent, CardTitle ,CardHeader} from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
 
export default function CarouselDemo() {
  return (
    <div className="flex justify-center">
    <Carousel className=" w-full max-w-xs">
      <CarouselContent>

        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>

        <Card>
        <CardHeader>
          <CardTitle className="text-center">Card Title</CardTitle>
          <div></div>
        </CardHeader>
        <CardContent className="gap-5">
          <form action="/dashboard" className="">
          <div>
                <div className="mb-4">
                <Label htmlFor="Nome Fantasia">Nome Fantasia*</Label>
                <Input type="text" placeholder="Digite o nome fantasia" />
                </div>
                <div className="mb-4">
                <Label htmlFor="Nome">Nome*</Label>
                <Input type="text" placeholder="Digite o nome" />
                </div>
                <div className="mb-4">
                <Label htmlFor="email">Email*</Label>
                <Input type="email" placeholder="Digite seu email" />
                </div>
                <div className="mb-4">
                <Label htmlFor="Telefone">Telefone*</Label>
                <Input type="number" placeholder="Digite seu telefone" />
                </div>
            </div>
            <div className="flex justify-center items-center">
              <Button type="submit" className="">Entrar</Button>
            </div>
          </form>
        </CardContent>
      </Card>
            
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
    </div>
  )
}