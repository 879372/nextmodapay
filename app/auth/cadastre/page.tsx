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

    const validateFields = () => {
        const newErrors: any = {};
        // Add validation logic for each card step here
        if (activeCard === 0) {

            if (!company.name) newErrors.name = "Nome é obrigatório.";
            if (!company.email) newErrors.email = "Email é obrigatório.";
            if (!company.phone) newErrors.phone = "Telefone é obrigatório.";
        }

        // Add other validation checks for other card steps
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateFields()) {
            setActiveCard((prev) => (prev < 7 ? prev + 1 : prev));
        }
    };

    const handlePrevious = () => {
        setActiveCard((prev) => (prev > 0 ? prev - 1 : prev));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (validateFields()) {
            try {
                const response =await registerCompany(company);
                alert('Cadastro realizado com sucesso!')
                router.push('/');
            } catch (error) {
                alert(error)
                console.error(error)
            }
        }
    };

    return (
        <div className="flex w-full h-lvh">
      <div className={`${styles.background} w-full flex justify-center items-center`}>
      <Card className="rounded-xl  relative w-1/2">
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
                                    <Label htmlFor="fantasy">Nome Fantasia</Label>
                                    <Input name="fantasy" type="text" placeholder="Digite o nome fantasia" onChange={handleChange} />
                                    {errors.fantasy && <p className="text-red-500">{errors.fantasy}</p>}
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="name">Nome*</Label>
                                    <Input name="name" type="text" placeholder="Digite o nome" onChange={handleChange} />
                                    {errors.name && <p className="text-red-500">{errors.name}</p>}
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="email">Email*</Label>
                                    <Input name="email" type="email" placeholder="Digite seu email" onChange={handleChange} />
                                    {errors.email && <p className="text-red-500">{errors.email}</p>}
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="phone">Telefone*</Label>
                                    <InputMask mask="(99) 99999-9999" name="phone" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"  placeholder="Digite seu telefone" onChange={handleChange} />
                                    {errors.phone && <p className="text-red-500">{errors.phone}</p>}
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
                                    <Select >
                                    <SelectTrigger className="w-full" >
                                        <SelectValue placeholder="Selecione PJ ou PF"  onChange={handleChange}/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="CPF">CPF</SelectItem>
                                        <SelectItem value="CNPF">CNPJ</SelectItem>
                                    </SelectContent>
                                    </Select>
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="documentNumber">CNPJ/CPF*</Label>
                                    <Input name="documentNumber" type="text" placeholder="Digite o nome" onChange={handleChange} />
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="ie">Inscrição Estadual</Label>
                                    <Input name="ie" type="number" placeholder="Digite sua IE" onChange={handleChange} />
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="im">Inscrição Municipal</Label>
                                    <Input name="im" type="number" placeholder="Digite sua IM" onChange={handleChange} />
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
                                    <InputMask mask="99999-999" name="cep" placeholder="00000-000" onChange={handleChange} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"/>
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
                                    <Label htmlFor="number">Número*</Label>
                                    <Input name="number" type="text" placeholder="Digite o número" onChange={handleChange} />
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="complement">Complemento</Label>
                                    <Input name="complement" type="text" placeholder="Digite o complemento" onChange={handleChange} />
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="neighborhood">Bairro*</Label>
                                    <Input name="neighborhood" type="text" placeholder="Digite o bairro" onChange={handleChange} />
                                </div>
                                <div className="flex justify-center text-zinc-500">
                                    <Label>4/8</Label>
                                </div>
                                <div className="flex justify-between items-center mt-4">
                                    <Button className="bg-zinc-500 w-1/3" onClick={handlePrevious}>Anterior</Button>
                                    <Button className="bg-pink-700 w-1/3" onClick={handleNext}>Próximo</Button>
                                </div>
                            </div>
                        )}
                        {activeCard === 4 && (
                            <div>
                                <div className="mb-4">
                                    <Label htmlFor="name">Nome*</Label>
                                    <Input name="name" type="text" placeholder="Digite o nome do Usuário" onChange={handleUserChange} />
                                    {errors.user?.name && <p className="text-red-500">{errors.user.name}</p>}
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="documentNumber">CPF*</Label>
                                    <Input name="documentNumber" placeholder="Digite o CPF do Usuário" onChange={handleUserChange} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"/>
                                    {errors.user?.documentNumber && <p className="text-red-500">{errors.user.documentNumber}</p>}
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="phone">Telefone*</Label>
                                    <InputMask mask="(99) 99999-9999" name="phone" placeholder="Digite o telefone do Usuário" onChange={handleUserChange} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"/>
                                    {errors.user?.phone && <p className="text-red-500">{errors.user.phone}</p>}
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="email">Email*</Label>
                                    <Input name="email" type="email" placeholder="Digite o seu email" onChange={handleUserChange} />
                                    {errors.user?.email && <p className="text-red-500">{errors.user.email}</p>}
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
                                <div className="mb-4 ">
                                    <Label htmlFor="birthDate">Data de Nascimento*</Label>
                                    <Input name="birthDate" type="date" placeholder="Digite a data de nascimento" onChange={handleUserChange} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"/>
                                    {errors.user?.birthDate && <p className="text-red-500">{errors.user.birthDate}</p>}
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="motherName">Nome da Mãe*</Label>
                                    <Input name="motherName" type="text" placeholder="Digite o nome da mãe" onChange={handleUserChange} />
                                    {errors.user?.motherName && <p className="text-red-500">{errors.user.motherName}</p>}
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="password">Senha*</Label>
                                    <Input name="password" type="password" placeholder="Digite a senha" onChange={handleUserChange} />
                                    {errors.user?.password && <p className="text-red-500">{errors.user.password}</p>}
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="confirmPassword">Confirme a Senha*</Label>
                                    <Input name="confirmPassword" type="password" placeholder="Confirme a senha" onChange={handleUserChange} />
                                    {errors.user?.confirmPassword && <p className="text-red-500">{errors.user.confirmPassword}</p>}
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
                                    <Label htmlFor="cep">CEP*</Label>
                                    <InputMask mask="99999-999" name="cep" placeholder="00000-000" onChange={handleUserChange} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"/>
                                    {errors.user?.cep && <p className="text-red-500">{errors.user.cep}</p>}
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="street">Logradouro do Usuário*</Label>
                                    <Input name="street" type="text" placeholder="Ex: Rua X, 123" onChange={handleUserChange} />
                                    {errors.user?.street && <p className="text-red-500">{errors.user.street}</p>}
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="number">Número*</Label>
                                    <Input name="number" type="text" placeholder="Digite o número" onChange={handleUserChange} />
                                    {errors.user?.number && <p className="text-red-500">{errors.user.number}</p>}
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="complement">Complemento</Label>
                                    <Input name="complement" type="text" placeholder="Digite o complemento" onChange={handleUserChange} />
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
                                    <Label htmlFor="neighborhood">Bairro*</Label>
                                    <Input name="neighborhood" type="text" placeholder="Digite o bairro" onChange={handleUserChange} />
                                    {errors.user?.neighborhood && <p className="text-red-500">{errors.user.neighborhood}</p>}
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="city">Cidade*</Label>
                                    <Input name="city" type="text" placeholder="Ex: Natal" onChange={handleUserChange} />
                                    {errors.user?.city && <p className="text-red-500">{errors.user.city}</p>}
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="uf">Estado*</Label>
                                    <Input name="uf" type="text" placeholder="Ex: RN" onChange={handleUserChange} />
                                    {errors.user?.uf && <p className="text-red-500">{errors.user.uf}</p>}
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="site">Site</Label>
                                    <Input name="site" type="text" placeholder="Ex: www.site.com" onChange={handleUserChange} />
                                    {errors.user?.site && <p className="text-red-500">{errors.user.uf}</p>}
                                </div>
                                <div className="flex justify-center text-zinc-500">
                                    <Label>8/8</Label>
                                </div>
                                <div className="flex justify-between items-center mt-4">
                                    <Button className="bg-zinc-500 w-1/3" onClick={handlePrevious}>Anterior</Button>
                                    <Button className="bg-pink-700 w-1/3" type="submit">Finalizar</Button>
                                </div>
                            </div>
                        )}
                    </form>
                </CardContent>
            </Card>
        </div>
        <div className=" bg-zinc-100 w-1/2 h-lvh flex justify-center items-center">
        <Image src="/logo-Photoroom.png" width={500} height={500} alt="logo" className='rounded-sm'/>
        </div>
        </div>
    );
}
