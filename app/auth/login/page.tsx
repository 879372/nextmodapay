'use client'

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { Login, LoginCompany } from "@/api/cadastro";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from '../../index.module.css'; 

export default function Home() {
  const router = useRouter();
  const [login, setLogin] = useState<Login>({
    username: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const cleanedValue = value.trim();
    setLogin((prevLogin) => ({
      ...prevLogin,
      [name]: cleanedValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await LoginCompany(login);
      alert('Login realizado com sucesso!');
      const token = response.data.Token;
      console.log(response);
      // Armazena o token no localStorage
      localStorage.setItem('token', token);
      router.push('/');
    } catch (error) {
      alert('Erro ao realizar login!');
      console.error(error);
    }
  };

  return (
<div className="flex">
<div className="bg-zinc-100 w-1/2 h-lvh flex justify-center items-center">
      <Image src="/logo-Photoroom.png" width={500} height={500} alt="logo" className='rounded-sm'/>
      </div>
      <div className={`${styles.background} w-full flex justify-center items-center`}>
        <div className="rounded-xl w-1/2 pl-10 pr-10">
          <CardHeader>
            <CardTitle className="flex justify-center items-center">
            <h1 className="text-center text-zinc-800 ">Bem-vindo(a) ao painel administrativo ModaBank</h1>
          </CardTitle>
          </CardHeader>
          <CardContent className="gap-5">
            <form onSubmit={handleSubmit}>
              <div className="mb-4 text-zinc-800">
                <Label htmlFor="username">Email*</Label>
                <Input name="username" type="email" placeholder="Digite seu email" onChange={handleChange} required />
              </div>
              <div className="mb-4 text-zinc-800">
                <Label htmlFor="password">Senha*</Label>
                <Input name="password" type="password" placeholder="Digite sua senha" onChange={handleChange} required />
              </div>
              <div className="flex">
                <Button type="submit" className="w-full ">Entrar</Button>
              </div>
            </form>
            <div className="mt-3 flex text-zinc-800">
              <Label>Não tem uma conta? <Link href="/auth/cadastre" className="text-black "> Cadastre-se</Link></Label>
            </div>
          </CardContent>
        </div>
      </div>
      </div>
  );
}
