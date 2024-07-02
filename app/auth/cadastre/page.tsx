"use client"
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { registerCompany, Company } from '@/api/cadastro';
import { useRouter } from "next/navigation";

export default function Home() {
    const [activeCard, setActiveCard] = useState(0);
    const router = useRouter()
    const handleNext = () => {
        setActiveCard((prev) => (prev < 7 ? prev + 1 : prev));
    };

    const handlePrevious = () => {
        setActiveCard((prev) => (prev > 0 ? prev - 1 : prev));
    };

    const [company, setCompany] = useState<Company>({
        fantasy: '',
        name: '',
        email: '',
        documentNumber: '',
        ie: '',
        im: '',
        street: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: '',
        uf: '',
        cep: '',
        phone: '',
        site: '',
        user: {
            name: '',
            documentNumber: '',
            phone: '',
            birthDate: '',
            motherName: '',
            email: '',
            password: '',
            cep: '',
            street: '',
            number: '',
            complement: '',
            neighborhood: '',
            city: '',
            uf: ''
        }
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCompany((prevCompany) => ({
            ...prevCompany,
            [name]: value,
        }));
    };

    const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCompany((prevCompany) => ({
            ...prevCompany,
            user: {
                ...prevCompany.user,
                [name]: value,
            }
        }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await registerCompany(company);
            alert('Cadastro realizado com sucesso!')
            router.push('/');
        } catch (error) {
            alert('Erro ao cadastrar empresa!')
            console.error(error)
        }
    }

    return (
        <main className="flex justify-center items-center h-dvh">
            <Card className="rounded-xl w-1/4 relative">
                <CardHeader>
                    <CardTitle className="flex justify-center items-center">
                        <Image src="/logo.png" width={180} height={100} alt="Rewind-UI" className="rounded-sm" />
                    </CardTitle>
                </CardHeader>
                <CardContent className="gap-5">
                    <form onSubmit={handleSubmit}>
                        {activeCard === 0 && (
                            <div>
                                <div className="mb-4">
                                    <Label htmlFor="fantasy">Nome Fantasia*</Label>
                                    <Input name="fantasy" type="text" placeholder="Digite o nome fantasia" onChange={handleChange} />
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="name">Nome*</Label>
                                    <Input name="name" type="text" placeholder="Digite o nome" onChange={handleChange} />
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="email">Email*</Label>
                                    <Input name="email" type="email" placeholder="Digite seu email" onChange={handleChange} />
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="phone">Telefone*</Label>
                                    <Input name="phone" type="number" placeholder="Digite seu telefone" onChange={handleChange} />
                                </div>
                                <div className="flex justify-center text-zinc-500">
                                    <Label>1/8</Label>
                                </div>
                                <div className="flex justify-between items-center mt-4">
                                    <Link href="/auth/login" className="w-1/3" ><Button className="bg-zinc-500 w-full" > Login</Button></Link>
                                    <Button className="bg-pink-700 w-1/3" onClick={handleNext}>Próximo</Button>
                                </div>
                            </div>
                        )}
                        {activeCard === 1 && (
                            <div>
                                <div className="mb-4">
                                    <Label htmlFor="Empresa PF ou PJ">Empresa PF ou PJ*</Label>
                                    <Input type="text" placeholder="Digite o nome fantasia" onChange={handleChange} />
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="documentNumber">CNPJ/CPF*</Label>
                                    <Input name="documentNumber" type="text" placeholder="Digite o nome" onChange={handleChange} />
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="ie">Inscrição Estadual*</Label>
                                    <Input name="ie" type="number" placeholder="Digite seu email" onChange={handleChange} />
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="im">Inscrição municipal*</Label>
                                    <Input name="im" type="number" placeholder="Digite seu email" onChange={handleChange} />
                                </div>
                                <div className="flex justify-center text-zinc-500">
                                    <Label>2/8</Label>
                                </div>
                                <div className="flex justify-between items-center mt-4">
                                    <Button className="bg-zinc-500 w-1/3" onClick={handlePrevious}>Anterior</Button>
                                    <Button className="bg-pink-700 w-1/3" onClick={handleNext}>Próximo</Button>
                                </div>
                            </div>
                        )}
                        {activeCard === 2 && (
                            <div>
                                <div className="mb-4">
                                    <Label htmlFor="cep">CEP*</Label>
                                    <Input name="cep" type="number" placeholder="00000-000" onChange={handleChange} />
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="pais">País*</Label>
                                    <Input type="text" placeholder="Ex: Brasil" onChange={handleChange} />
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="uf">Estado*</Label>
                                    <Input name="uf" type="text" placeholder="Ex: RN" onChange={handleChange} />
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="city">Cidade*</Label>
                                    <Input name="city" type="text" placeholder="Ex: Natal" onChange={handleChange} />
                                </div>
                                <div className="flex justify-center text-zinc-500">
                                    <Label>3/8</Label>
                                </div>
                                <div className="flex justify-between items-center mt-4">
                                    <Button className="bg-zinc-500 w-1/3" onClick={handlePrevious}>Anterior</Button>
                                    <Button className="bg-pink-700 w-1/3" onClick={handleNext}>Próximo</Button>
                                </div>
                            </div>
                        )}
                        {activeCard === 3 && (
                            <div>
                                <div className="mb-4">
                                    <Label htmlFor="street">Logradouro*</Label>
                                    <Input name="street" type="text" placeholder="Ex: Rua X, 123" onChange={handleChange} />
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="number">Numero*</Label>
                                    <Input name="number" type="number" placeholder="Ex: 820" onChange={handleChange} />
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="neighborhood">Bairro*</Label>
                                    <Input name="neighborhood" type="text" placeholder="Ex: Bairro X" onChange={handleChange} />
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="complement">Complemento*</Label>
                                    <Input name="complement" type="text" placeholder="Ex: Sala 1" onChange={handleChange} />
                                </div>
                                <div className="flex justify-center text-zinc-500">
                                    <Label>4/8</Label>
                                </div>
                                <div className="flex justify-between items-center mt-4">
                                    <Button className="bg-zinc-500 w-1/3" onClick={handlePrevious}>Anterior</Button>
                                    <Button className="bg-pink-700 w-1/3" onClick={handleNext}>Próximo</Button>
                                </div>
                            </div>)}
                        {activeCard === 4 && (
                            <div>
                                <div className="mb-4">
                                    <Label htmlFor="user.name">Nome de Usuário*</Label>
                                    <Input name="user.name" type="text" placeholder="Digite seu nome" onChange={handleUserChange} />
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="user.email">E-mail*</Label>
                                    <Input name="user.email" type="email" placeholder="Digite seu email" onChange={handleUserChange} />
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="user.password">Senha*</Label>
                                    <Input name="user.password" type="password" placeholder="Digite sua senha" onChange={handleUserChange} />
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="user.phone">Telefone*</Label>
                                    <Input name="user.phone" type="number" placeholder="Digite seu telefone" onChange={handleUserChange} />
                                </div>
                                <div className="flex justify-center text-zinc-500">
                                    <Label>5/8</Label>
                                </div>
                                <div className="flex justify-between items-center mt-4">
                                    <Button className="bg-zinc-500 w-1/3" onClick={handlePrevious}>Anterior</Button>
                                    <Button className="bg-pink-700 w-1/3" onClick={handleNext}>Próximo</Button>
                                </div>
                            </div>
                        )}
                        {activeCard === 5 && (
                            <div>
                                <div className="mb-4">
                                    <Label htmlFor="user.documentNumber">CPF/CNPJ*</Label>
                                    <Input name="user.documentNumber" type="text" placeholder="Digite o CPF/CNPJ" onChange={handleUserChange} />
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="user.birthDate">Data de nascimento*</Label>
                                    <Input name="user.birthDate" type="date" placeholder="dd/mm/aaaa" onChange={handleUserChange} />
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="user.motherName">Nome da mãe*</Label>
                                    <Input name="user.motherName" type="text" placeholder="Digite o nome da sua mãe" onChange={handleUserChange} />
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="user.cep">CEP*</Label>
                                    <Input name="user.cep" type="text" placeholder="Ex: Sala 1" onChange={handleUserChange} />
                                </div>
                                <div className="flex justify-center text-zinc-500">
                                    <Label>6/8</Label>
                                </div>
                                <div className="flex justify-between items-center mt-4">
                                    <Button className="bg-zinc-500 w-1/3" onClick={handlePrevious}>Anterior</Button>
                                    <Button className="bg-pink-700 w-1/3" onClick={handleNext}>Próximo</Button>
                                </div>
                            </div>
                        )}
                        {activeCard === 6 && (
                            <div>
                                <div className="mb-4">
                                    <Label htmlFor="pais">País*</Label>
                                    <Input type="text" placeholder="Ex: Brasil" onChange={handleUserChange} />
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="user.uf">Estado*</Label>
                                    <Input name="user.uf" type="text" placeholder="Ex: RN" onChange={handleUserChange} />
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="user.city">Cidade*</Label>
                                    <Input name="user.city" type="text" placeholder="Ex: Natal" onChange={handleUserChange} />
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="user.street">Logradouro*</Label>
                                    <Input name="user.street" type="text" placeholder="Ex: Rua X 123" onChange={handleUserChange} />
                                </div>
                                <div className="flex justify-center text-zinc-500">
                                    <Label>7/8</Label>
                                </div>
                                <div className="flex justify-between items-center mt-4">
                                    <Button className="bg-zinc-500 w-1/3" onClick={handlePrevious}>Anterior</Button>
                                    <Button className="bg-pink-700 w-1/3" onClick={handleNext}>Próximo</Button>
                                </div>
                            </div>
                        )}
                        {activeCard === 7 && (
                            <div>
                                <div className="mb-4">
                                    <Label htmlFor="user.number">Número*</Label>
                                    <Input name="user.number" type="number" placeholder="Ex: 820" onChange={handleUserChange} />
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="user.neighborhood">Bairro*</Label>
                                    <Input name="user.neighborhood" type="text" placeholder="Ex: Bairro X" onChange={handleUserChange} />
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="user.complement">Complemento*</Label>
                                    <Input name="user.complement" type="text" placeholder="Ex: Natal" onChange={handleUserChange} />
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="site">Site da empresa*</Label>
                                    <Input name="site" type="text" placeholder="Ex: www.site.com.br" onChange={handleChange} />
                                </div>
                                <div className="flex justify-center text-zinc-500">
                                    <Label>8/8</Label>
                                </div>
                                <div className="flex justify-between items-center mt-4">
                                    <Button className="bg-zinc-500 w-1/3" onClick={handlePrevious}>Anterior</Button>
                                    <Button type="submit" className="w-1/3 bg-pink-700">
                                        Cadastre-se
                                    </Button>
                                </div>
                            </div>
                        )}
                    </form>
                </CardContent>
            </Card>
        </main>
    );
}

