'use client'

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
import { Login, LoginCompany } from "@/api/cadastro";
import { useState } from "react";
import { useRouter } from "next/navigation";



export default function Home() {
  const router = useRouter()
  const [login, setLogin] = useState<Login>({
    username: '',
    password: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLogin((prevLogin) => ({
      ...prevLogin,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let token;
    try {
      const response = await LoginCompany(login);
      alert('login realizado com sucesso!');
      token = response.data.Token;
      console.log(token);
      // Armazena o token no localStorage
      localStorage.setItem('token:', token);
      router.push('/');
    } catch (error) {
      alert('Erro ao cadastrar empresa!');
      console.error(error);
    }
    return token;  // Retorna o token
  };

  return (
    <main className="flex justify-center items-center h-dvh ">
      <Card className="rounded-xl w-1/4">
        <CardHeader>
          <CardTitle className="flex justify-center items-center">
            <Image src="/logo.png" width={180} height={100} alt="Rewind-UI" className='rounded-sm' />
          </CardTitle>
          <div></div>
        </CardHeader>
        <CardContent className="gap-5">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Label htmlFor="username">Email*</Label>
              <Input name="username" type="email" placeholder="Digite seu email" onChange={handleChange} />
            </div>
            <div className="mb-4">
              <Label htmlFor="password">Senha*</Label>
              <Input name="password" type="password" placeholder="Digite sua senha" onChange={handleChange} />
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
