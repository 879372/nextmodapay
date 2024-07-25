'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { Login, LoginCompany } from "@/api/cadastroEmpresa";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from './index.module.css'; 
import { Checkbox } from "@/components/ui/checkbox"


export default function Home() {
  const router = useRouter();
  const [login, setLogin] = useState({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    setLoading(true);
    setError(null);
    try {
      const response = await LoginCompany(login);
      const token = response.data.Token;
      localStorage.setItem('token', token);
      router.push('/dashboard');
    } catch (error) {
      setError('Erro ao realizar login. Verifique suas credenciais.');
      console.error('Erro ao realizar login:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${styles.background} w-full flex flex-col justify-center items-center`}>
      <Image src="/logo-Photoroom.png" width={200} height={200} alt="logo" className="rounded-sm mb-5" />
      <Card className="rounded-sm min-w-[380px] max-w-[480px] p-5">
        <CardHeader>
          <CardTitle className="flex justify-center items-center">
            <p className="text-center text-zinc-800 text-xl font-medium">Bem-vindo(a) ao ModaBank</p>
          </CardTitle>
        </CardHeader>
        <CardContent className="gap-5">
          <form onSubmit={handleSubmit}>
            <div className="mb-4 text-zinc-800">
              <Label htmlFor="username" className="text-xs">
                Email*
              </Label>
              <Input
                name="username"
                type="email"
                placeholder="Digite seu email"
                onChange={handleChange}
                required
                className="h-9 rounded-sm text-xs mt-2"
              />
            </div>
            <div className="mb-4 text-zinc-800 text-xs">
              <Label htmlFor="password" className="text-xs">
                Senha*
              </Label>
              <Input
                name="password"
                type="password"
                placeholder="Digite sua senha"
                onChange={handleChange}
                required
                className="h-9 rounded-sm text-xs mt-2"
              />
            </div>
            <div className="flex items-center space-x-2 mb-5">
              <Checkbox id="terms2" />
              <label
                htmlFor="terms2"
                className="text-xs leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Lembrar senha
              </label>
            </div>
            <div className="flex h-8">
              <Button type="submit" className="w-full h-full rounded-sm text-xs bg-pink-700" disabled={loading}>
                {loading ? 'Carregando...' : 'Entrar'}
              </Button>
            </div>
            {error && (
              <div className="mt-3 text-red-500 text-xs text-center">
                {error}
              </div>
            )}
          </form>
          <div className="mt-5 flex justify-center text-zinc-800">
            <Label className="text-xs">
              Não tem uma conta?{' '}
              <Link
                href="/auth/cadastre"
                className="text-zinc-500 text-xs font-bold underline hover:text-pink-700"
              >
                Cadastre-se
              </Link>
            </Label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
