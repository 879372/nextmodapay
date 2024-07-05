"use client"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { registerCompany, Company } from '@/api/cadastro';
import { useRouter } from "next/navigation";
import InputMask from "react-input-mask";
import styles from '../../index.module.css';

export default function Home() {
    const [activeCard, setActiveCard] = useState(0);
    const [errors, setErrors] = useState<any>({});
    const router = useRouter()

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
    };

    // const validateFields = () => {
    //     const newErrors: any = {};
    //     // Add validation logic for each card step here
    //     if (activeCard === 0) {

    //         if (!company.name) newErrors.name = "Nome é obrigatório.";
    //         if (!company.email) newErrors.email = "Email é obrigatório.";
    //         if (!company.phone) newErrors.phone = "Telefone é obrigatório.";
    //     }

    //     // Add other validation checks for other card steps
    //     setErrors(newErrors);
    //     return Object.keys(newErrors).length === 0;
    // };

    const handleNext = () => {
        //   if (validateFields()) {
        setActiveCard((prev) => (prev < 7 ? prev + 1 : prev));
        // }
    };

    const handlePrevious = () => {
        setActiveCard((prev) => (prev > 0 ? prev - 1 : prev));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        // if (validateFields()) {
        try {
            const response = await registerCompany(company);
            alert('Cadastro realizado com sucesso!')
            console.log(response)
            router.push('/');
        } catch (error) {
            alert(error)
            console.error(error)
        }
        // }
    };

    return (
        <div className={`${styles.background} flex justify-center flex-col items-center w-full h-lvh`}>
            <Image src="/logo-Photoroom.png" width={200} height={200} alt="logo" className='rounded-sm mb-5' />
            <Card className="rounded-md min-w-[380px] flex justify-center relative">
                <CardContent className="gap-5 w-full max-w-[380px] pl-10 pr">
                    <form onSubmit={handleSubmit}>
                        {activeCard === 0 && (
                            <div className="w-full">
                                <CardHeader>
                                    <CardTitle className="text-center text-zinc-800  text-xl font-medium">
                                        <p>Cadastro de empresa</p>
                                    </CardTitle>
                                </CardHeader>
                                <div className="mb-4">
                                    <Label htmlFor="fantasy " className="text-xs">Nome Fantasia</Label>
                                    <Input name="fantasy" type="text" placeholder="Digite o nome fantasia" onChange={handleChange} className="h-9 rounded-sm text-xs mt-2" />
                                    {errors.fantasy && <p className="text-red-500 text-xs">{errors.fantasy}</p>}
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="name" className="text-xs">Nome*</Label>
                                    <Input name="name" type="text" placeholder="Digite o nome" onChange={handleChange} className="h-9 rounded-sm text-xs mt-2" />
                                    {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="email" className="text-xs">Email*</Label>
                                    <Input name="email" type="email" placeholder="Digite seu email" onChange={handleChange} className="h-9 rounded-sm text-xs mt-2" />
                                    {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="phone" className="text-xs">Telefone*</Label>
                                    <InputMask mask="(99) 99999-9999" name="phone" className="flex  w-full border border-input bg-background px-3 py-2  ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-9 rounded-sm text-xs mt-2" placeholder="Digite seu telefone" onChange={handleChange} />
                                    {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
                                </div>
                                <div className="flex justify-center text-zinc-500 ">
                                    <Label className="text-xs">1/8</Label>
                                </div>
                                <div className="flex justify-between items-center mt-4 flex-col ">
                                    <Button className="bg-pink-700 w-full text-xs rounded-sm mb-3 h-9 " onClick={handleNext}>Próximo</Button>
                                    <div>
                                        <Label className="text-xs">Você é já possuí uma conta ?<Link href="/auth/login" className="font-bold"> Entrar</Link></Label>
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeCard === 1 && (
                            <div>
                                <CardHeader>
                                    <CardTitle className="flex justify-center items-center">
                                        <p>Cadastro de empresa</p>
                                    </CardTitle>
                                </CardHeader>
                                <div className="mb-4">
                                    <Label htmlFor="Empresa PF ou PJ" className="text-xs">Empresa PF ou PJ*</Label>
                                    <Select >
                                        <SelectTrigger className="w-full" >
                                            <SelectValue placeholder="Selecione PJ ou PF" onChange={handleChange} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="CPF">CPF</SelectItem>
                                            <SelectItem value="CNPF">CNPJ</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="documentNumber" className="text-xs">CNPJ/CPF*</Label>
                                    <Input name="documentNumber" type="text" placeholder="Digite o nome" onChange={handleChange} className="h-9 rounded-sm text-xs mt-2" />
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="ie" className="text-xs">Inscrição Estadual</Label>
                                    <Input name="ie" type="number" placeholder="Digite sua IE" onChange={handleChange} className="h-9 rounded-sm text-xs mt-2" />
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="im" className="text-xs">Inscrição Municipal</Label>
                                    <Input name="im" type="number" placeholder="Digite sua IM" onChange={handleChange} className="h-9 rounded-sm text-xs mt-2" />
                                </div>

                                <div className="">
                                    <Label className="text-pink-700 " onClick={handlePrevious}>Anterior</Label>
                                </div>
                                <div className="flex  justify-center"><Label className="text-xs text-zinc-500">2/8</Label></div>
                                <div className="flex justify-between items-center mt-4 flex-col ">
                                    <Button className="bg-pink-700 w-full text-xs rounded-sm mb-3 h-9 " onClick={handleNext}>Próximo</Button>
                                    <div>
                                        <Label className="text-xs">Você é já possuí uma conta ?<Link href="/auth/login" className="font-bold"> Entrar</Link></Label>
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeCard === 2 && (
                            <div>
                                <CardHeader>
                                    <CardTitle className="flex justify-center items-center">
                                        <p>Cadastro de empresa</p>
                                    </CardTitle>
                                </CardHeader>
                                <div className="mb-4">
                                    <Label htmlFor="cep" className="text-xs">CEP*</Label>
                                    <InputMask mask="99999-999" name="cep" placeholder="00000-000" onChange={handleChange} className="h-9 rounded-sm text-xs mt-2 flex w-full border border-input bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="pais" className="text-xs">País*</Label>
                                    <Input type="text" placeholder="Ex: Brasil" onChange={handleChange} className="h-9 rounded-sm text-xs mt-2" />
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="uf" className="text-xs">Estado*</Label>
                                    <Input name="uf" type="text" placeholder="Ex: RN" onChange={handleChange} className="h-9 rounded-sm text-xs mt-2" />
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="city" className="text-xs">Cidade*</Label>
                                    <Input name="city" type="text" placeholder="Ex: Natal" onChange={handleChange} className="h-9 rounded-sm text-xs mt-2" />
                                </div>
                                <div className="">
                                    <Label className="text-pink-700 " onClick={handlePrevious}>Anterior</Label>
                                </div>
                                <div className="flex  justify-center"><Label className="text-xs text-zinc-500">3/8</Label></div>
                                <div className="flex justify-between items-center mt-4 flex-col ">
                                    <Button className="bg-pink-700 w-full text-xs rounded-sm mb-3 h-9 " onClick={handleNext}>Próximo</Button>
                                    <div>
                                        <Label className="text-xs">Você é já possuí uma conta ?<Link href="/auth/login" className="font-bold"> Entrar</Link></Label>
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeCard === 3 && (
                            <div>
                                <CardHeader>
                                    <CardTitle className="flex justify-center items-center">
                                        <p>Cadastro de empresa</p>
                                    </CardTitle>
                                </CardHeader>
                                <div className="mb-4">
                                    <Label htmlFor="street" className="text-xs">Logradouro*</Label>
                                    <Input name="street" type="text" placeholder="Ex: Rua X, 123" onChange={handleChange} className="h-9 rounded-sm text-xs mt-2" />
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="number" className="text-xs">Número*</Label>
                                    <Input name="number" type="text" placeholder="Digite o número" onChange={handleChange} className="h-9 rounded-sm text-xs mt-2" />
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="complement" className="text-xs">Complemento</Label>
                                    <Input name="complement" type="text" placeholder="Digite o complemento" onChange={handleChange} className="h-9 rounded-sm text-xs mt-2" />
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="neighborhood" className="text-xs">Bairro*</Label>
                                    <Input name="neighborhood" type="text" placeholder="Digite o bairro" onChange={handleChange} className="h-9 rounded-sm text-xs mt-2" />
                                </div>
                                <div className="">
                                    <Label className="text-pink-700 " onClick={handlePrevious}>Anterior</Label>
                                </div>
                                <div className="flex  justify-center" ><Label className="text-xs text-zinc-500">4/8</Label></div>
                                <div className="flex justify-between items-center mt-4 flex-col ">
                                    <Button className="bg-pink-700 w-full text-xs rounded-sm mb-3 h-9 " onClick={handleNext}>Próximo</Button>
                                    <div>
                                        <Label className="text-xs">Você é já possuí uma conta ?<Link href="/auth/login" className="font-bold"> Entrar</Link></Label>
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeCard === 4 && (
                            <div>
                                <CardHeader>
                                    <CardTitle className="flex justify-center items-center">
                                        <p>Cadastro de usuário</p>
                                    </CardTitle>
                                </CardHeader>
                                <div className="mb-4">
                                    <Label htmlFor="name " className="text-xs">Nome*</Label>
                                    <Input name="name" type="text" placeholder="Digite o nome do Usuário" onChange={handleUserChange} className="h-9 rounded-sm text-xs mt-2" />
                                    {errors.user?.name && <p className="text-red-500">{errors.user.name}</p>}
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="documentNumber" className="text-xs">CPF*</Label>
                                    <Input name="documentNumber" placeholder="Digite o CPF do Usuário" onChange={handleUserChange} className="h-9 rounded-sm text-xs mt-2 flex w-full  border border-input bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                                    {errors.user?.documentNumber && <p className="text-red-500">{errors.user.documentNumber}</p>}
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="phone" className="text-xs">Telefone*</Label>
                                    <InputMask mask="(99) 99999-9999" name="phone" placeholder="Digite o telefone do Usuário" onChange={handleUserChange} className=" h-9 rounded-sm text-xs mt-2 flex  w-full  border border-input bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                                    {errors.user?.phone && <p className="text-red-500">{errors.user.phone}</p>}
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="email" className="text-xs">Email*</Label>
                                    <Input name="email" type="email" placeholder="Digite o seu email" onChange={handleUserChange} className="h-9 rounded-sm text-xs mt-2" />
                                    {errors.user?.email && <p className="text-red-500">{errors.user.email}</p>}
                                </div>
                                <div className="">
                                    <Label className="text-pink-700 " onClick={handlePrevious}>Anterior</Label>
                                </div>
                                <div className="flex  justify-center"><Label className="text-xs text-zinc-500">5/8</Label></div>
                                <div className="flex justify-between items-center mt-4 flex-col ">
                                    <Button className="bg-pink-700 w-full text-xs rounded-sm mb-3 h-9 " onClick={handleNext}>Próximo</Button>
                                    <div>
                                        <Label className="text-xs">Você é já possuí uma conta ?<Link href="/auth/login" className="font-bold"> Entrar</Link></Label>
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeCard === 5 && (
                            <div>
                                <CardHeader>
                                    <CardTitle className="flex justify-center items-center">
                                        <p>Cadastro de usuário</p>
                                    </CardTitle>
                                </CardHeader>
                                <div className="mb-4 ">
                                    <Label htmlFor="birthDate" className="text-xs">Data de Nascimento*</Label>
                                    <Input name="birthDate" type="date" placeholder="Digite a data de nascimento" onChange={handleUserChange} className="h-9 rounded-sm text-xs mt-2 flex w-full border border-input bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                                    {errors.user?.birthDate && <p className="text-red-500">{errors.user.birthDate}</p>}
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="motherName" className="text-xs">Nome da Mãe*</Label>
                                    <Input name="motherName" type="text" placeholder="Digite o nome da mãe" onChange={handleUserChange} className="h-9 rounded-sm text-xs mt-2" />
                                    {errors.user?.motherName && <p className="text-red-500">{errors.user.motherName}</p>}
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="password" className="text-xs">Senha*</Label>
                                    <Input name="password" type="password" placeholder="Digite a senha" onChange={handleUserChange} className="h-9 rounded-sm text-xs mt-2" />
                                    {errors.user?.password && <p className="text-red-500">{errors.user.password}</p>}
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="confirmPassword" className="text-xs">Confirme a Senha*</Label>
                                    <Input name="confirmPassword" type="password" placeholder="Confirme a senha" onChange={handleUserChange} className="h-9 rounded-sm text-xs mt-2" />
                                    {errors.user?.confirmPassword && <p className="text-red-500">{errors.user.confirmPassword}</p>}
                                </div>
                                <div className="">
                                    <Label className="text-pink-700 " onClick={handlePrevious}>Anterior</Label>
                                </div>
                                <div className="flex  justify-center"><Label className="text-xs text-zinc-500">6/8</Label></div>
                                <div className="flex justify-between items-center mt-4 flex-col ">
                                    <Button className="bg-pink-700 w-full text-xs rounded-sm mb-3 h-9 " onClick={handleNext}>Próximo</Button>
                                    <div>
                                        <Label className="text-xs">Você é já possuí uma conta ?<Link href="/auth/login" className="font-bold"> Entrar</Link></Label>
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeCard === 6 && (
                            <div>
                                <CardHeader>
                                    <CardTitle className="flex justify-center items-center">
                                        <p>Cadastro de usuário</p>
                                    </CardTitle>
                                </CardHeader>
                                <div className="mb-4">
                                    <Label htmlFor="cep" className="text-xs">CEP*</Label>
                                    <InputMask mask="99999-999" name="cep" placeholder="00000-000" onChange={handleUserChange} className="h-9 rounded-sm text-xs mt-2 flex w-full border border-input bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                                    {errors.user?.cep && <p className="text-red-500">{errors.user.cep}</p>}
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="street" className="text-xs">Logradouro do Usuário*</Label>
                                    <Input name="street" type="text" placeholder="Ex: Rua X, 123" onChange={handleUserChange} className="h-9 rounded-sm text-xs mt-2" />
                                    {errors.user?.street && <p className="text-red-500">{errors.user.street}</p>}
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="number" className="text-xs">Número*</Label>
                                    <Input name="number" type="text" placeholder="Digite o número" onChange={handleUserChange} className="h-9 rounded-sm text-xs mt-2" />
                                    {errors.user?.number && <p className="text-red-500">{errors.user.number}</p>}
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="complement" className="text-xs">Complemento</Label>
                                    <Input name="complement" type="text" placeholder="Digite o complemento" onChange={handleUserChange} className="h-9 rounded-sm text-xs mt-2" />
                                </div>
                                <div className="">
                                    <Label className="text-pink-700 " onClick={handlePrevious}>Anterior</Label>
                                </div>
                                <div className="flex  justify-center"><Label className="text-xs text-zinc-500">7/8</Label></div>
                                <div className="flex justify-between items-center mt-4 flex-col ">
                                    <Button className="bg-pink-700 w-full text-xs rounded-sm mb-3 h-9 " onClick={handleNext}>Próximo</Button>
                                    <div>
                                        <Label className="text-xs">Você é já possuí uma conta ?<Link href="/auth/login" className="font-bold"> Entrar</Link></Label>
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeCard === 7 && (
                            <div>
                                <CardHeader>
                                    <CardTitle className="flex justify-center items-center">
                                        <p>Cadastro de usuário</p>
                                    </CardTitle>
                                </CardHeader>
                                <div className="mb-4">
                                    <Label htmlFor="neighborhood" className="text-xs">Bairro*</Label>
                                    <Input name="neighborhood" type="text" placeholder="Digite o bairro" onChange={handleUserChange} className="h-9 rounded-sm text-xs mt-2" />
                                    {errors.user?.neighborhood && <p className="text-red-500">{errors.user.neighborhood}</p>}
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="city" className="text-xs">Cidade*</Label>
                                    <Input name="city" type="text" placeholder="Ex: Natal" onChange={handleUserChange} className="h-9 rounded-sm text-xs mt-2" />
                                    {errors.user?.city && <p className="text-red-500">{errors.user.city}</p>}
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="uf" className="text-xs">Estado*</Label>
                                    <Input name="uf" type="text" placeholder="Ex: RN" onChange={handleUserChange} className="h-9 rounded-sm text-xs mt-2" />
                                    {errors.user?.uf && <p className="text-red-500">{errors.user.uf}</p>}
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="site" className="text-xs">Site</Label>
                                    <Input name="site" type="text" placeholder="Ex: www.site.com" onChange={handleUserChange} className="h-9 rounded-sm text-xs mt-2" />
                                    {errors.user?.site && <p className="text-red-500">{errors.user.uf}</p>}
                                </div>
                                <div className="">
                                    <Label className="text-pink-700 underline" onClick={handlePrevious}>Anterior</Label>
                                </div>
                                <div className="flex  justify-center"><Label className="text-xs text-zinc-500">8/8</Label></div>
                                <div className="flex justify-between items-center mt-4 flex-col ">
                                    <Button className="bg-pink-700 w-full text-xs rounded-sm mb-3 h-9 " onClick={handleNext}>Cadastrar</Button>
                                    <div>
                                        <Label className="text-xs ">Você é já possuí uma conta ?<Link href="/auth/login" className="font-bold underline hover:text-pink-700"> Entrar</Link></Label>
                                    </div>
                                </div>
                            </div>
                        )}
                    </form>
                </CardContent>
            </Card>
        </div>

    );
}

