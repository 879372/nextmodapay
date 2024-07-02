import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";




export default function Home() {
  return (
    <main className="flex justify-center items-center h-dvh ">
      <Card className="rounded-xl w-1/4">
        <CardHeader>
          <CardTitle className="flex justify-center items-center">
            <Image src="/logo.png" width={180} height={100} alt="Rewind-UI" className='rounded-sm'/>
          </CardTitle>
          <div></div>
        </CardHeader>
        <CardContent className="gap-5">
          <form action="/dashboard" className="">
            <div className="mb-4">
              <Label htmlFor="email">Email*</Label>
              <Input type="email" placeholder="Digite seu email" />
            </div>
            <div className="mb-4">
              <Label htmlFor="password">Senha*</Label>
              <Input type="password" placeholder="Digite sua senha" />
            </div>
            <div className="flex">
              <Button type="submit" className="w-full bg-pink-700">Entrar</Button>
            </div>
          </form>
          <div className="mt-3 flex ">
            <Label>Não tem uma conta? <Link href="/auth/cadastre" className="text-pink-900 underline-offset-1"> Cadastre-se</Link></Label>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
