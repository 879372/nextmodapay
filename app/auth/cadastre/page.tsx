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
import { registerCompany, Company } from '@/api/cadastroEmpresa';
import { useRouter } from "next/navigation";
import InputMask from "react-input-mask";
import styles from '../../index.module.css';

export default function Home() {
    const [inputValue, setInputValue] = useState<string>('')
    const [activeCard, setActiveCard] = useState(0);
    const [errors, setErrors] = useState<any>({});
    const router = useRouter()

    const verificaInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
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
    };

    const validateFields = () => {
        const newErrors: any = {};
        // Add validation logic for each card step here
        if (activeCard === 0) {
            if (!company.fantasy) newErrors.fantasy = "Nome Fantasia é obrigatório.";
            if (!company.name) newErrors.name = "Nome é obrigatório.";
            if (!company.email) newErrors.email = "Email é obrigatório.";
            if (!company.phone) newErrors.phone = "Telefone é obrigatório.";
        }

        if (activeCard === 1) {
            if (!company.documentNumber) newErrors.documentNumber = "CNPJ é obrigatório.";
            if (!company.ie) newErrors.ie = "IE é obrigatório.";
            if (!company.im) newErrors.im = "IM é obrigatório.";
        }

        if (activeCard === 2) {
            if (!company.cep) newErrors.cep = "CEP é obrigatório.";
            if (!company.uf) newErrors.uf = "Estado é obrigatório.";
            if (!company.city) newErrors.city = "Cidade é obrigatório.";
        }

        if (activeCard === 3) {
            if (!company.street) newErrors.street = "Logradouro é obrigatório.";
            if (!company.number) newErrors.number = "Número é obrigatório.";
            if (!company.neighborhood) newErrors.neighborhood = "Bairro é obrigatório.";
        }

        if (activeCard === 4) {
            if (!company.user.name) newErrors['user.name'] = "Nome do Usuário é obrigatório.";
            if (!company.user.documentNumber) newErrors['user.documentNumber'] = "CPF é obrigatório.";
            if (!company.user.phone) newErrors['user.phone'] = "Telefone é obrigatório.";
            if (!company.user.email) newErrors['user.email'] = "Email é obrigatório.";
        }
        if (activeCard === 5) {
            if (!company.user.birthDate) newErrors['user.birthDate'] = "Data de nascimento é obrigatório.";
            if (!company.user.motherName) newErrors['user.motherName'] = "Nome da Mãe é obrigatório.";
            if (!company.user.password) newErrors['user.password'] = "Senha é obrigatório.";
        }
        if (activeCard === 6) {
            if (!company.user.cep) newErrors['user.cep'] = "Cep é obrigatório.";
            if (!company.user.street) newErrors['user.street'] = "Logradouro é obrigatório.";
            if (!company.user.number) newErrors['user.number'] = "Número é obrigatório.";
        }
        if (activeCard === 7) {
            if (!company.user.neighborhood) newErrors['user.neighborhood'] = "Bairro é obrigatório.";
            if (!company.user.city) newErrors['user.city'] = "CPF é obrigatório.";
            if (!company.user.uf) newErrors['user.uf'] = "Telefone é obrigatório.";
        }

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
                const response = await registerCompany(company);
                if(response?.status === 201){
                    alert('Cadastro realizado com sucesso!')
                    router.push('/');
                }
            } catch (error) {
                alert('Erro ao cadastrar empresa, tente novamente mais tarde!')
                console.error(error)
            }
        }
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
                                    <Input name="fantasy" type="text" placeholder="Digite o nome fantasia" onChange={handleChange} value={company.fantasy}
                                        className="h-9 rounded-sm text-xs mt-2" />
                                    {errors.fantasy && <p className="text-red-500 text-xs">{errors.fantasy}</p>}
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="name" className="text-xs">Nome*</Label>
                                    <Input name="name" type="text" placeholder="Digite o nome" onChange={handleChange} className="h-9 rounded-sm text-xs mt-2"
                                        value={company.name} />
                                    {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="email" className="text-xs">Email*</Label>
                                    <Input name="email" type="email" placeholder="Digite seu email" onChange={handleChange} className="h-9 rounded-sm text-xs mt-2"
                                        value={company.email} />
                                    {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="phone" className="text-xs">Telefone*</Label>
                                    <InputMask mask="(99) 99999-9999" name="phone" className="flex  w-full border border-input bg-background px-3 py-2  ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-9 rounded-sm text-xs mt-2" placeholder="Digite seu telefone" onChange={handleChange} value={company.phone} />
                                    {errors.phone && <p className="text-red-500 text-xs" >{errors.phone}</p>}
                                </div>
                                <div className="flex justify-center text-zinc-500 ">
                                    <Label className="text-xs">1/8</Label>
                                </div>
                                <div className="flex justify-between items-center mt-4 flex-col ">
                                    <Button className="bg-pink-700 w-full text-xs rounded-sm mb-3 h-9 " onClick={handleNext}>Próximo</Button>
                                    <div>
                                        <Label className="text-xs">Você é já possuí uma conta ?<Link href="/" className="font-bold"> Entrar</Link></Label>
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
                                    <Label htmlFor="documentNumber" className="text-xs">CNPJ*</Label>
                                    <InputMask mask="99.999.999/9999-99"
                                        name="documentNumber" className="flex  w-full border border-input bg-background px-3 py-2  ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-9 rounded-sm text-xs mt-2" placeholder="Digite seu telefone" onChange={handleChange} value={company.documentNumber} />
                                    {errors.documentNumber && <p className="text-red-500 text-xs" >{errors.documentNumber}</p>}
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="ie" className="text-xs">Inscrição Estadual*</Label>
                                    <Input name="ie" type="number" placeholder="Digite sua IE" onChange={handleChange} className="h-9 rounded-sm text-xs mt-2"
                                        value={company.ie} />
                                    {errors.ie && <p className="text-red-500 text-xs" >{errors.ie}</p>}
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="im" className="text-xs">Inscrição Municipal*</Label>
                                    <Input name="im" type="number" placeholder="Digite sua IM" onChange={handleChange} className="h-9 rounded-sm text-xs mt-2"
                                        value={company.im} />
                                    {errors.im && <p className="text-red-500 text-xs" >{errors.im}</p>}

                                </div>

                                <div className="">
                                    <Label className="text-pink-700 " onClick={handlePrevious}>Anterior</Label>
                                </div>
                                <div className="flex  justify-center"><Label className="text-xs text-zinc-500">2/8</Label></div>
                                <div className="flex justify-between items-center mt-4 flex-col ">
                                    <Button className="bg-pink-700 w-full text-xs rounded-sm mb-3 h-9 " onClick={handleNext}>Próximo</Button>
                                    <div>
                                        <Label className="text-xs">Você é já possuí uma conta ?<Link href="/" className="font-bold"> Entrar</Link></Label>
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
                                    <InputMask mask="99999-999" name="cep" placeholder="00000-000" onChange={handleChange} className="h-9 rounded-sm text-xs mt-2 flex w-full border border-input bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" value={company.cep} />
                                    {errors.cep && <p className="text-red-500 text-xs">{errors.cep}</p>}

                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="pais" className="text-xs">País*</Label>
                                    <Input type="text" placeholder="Ex: Brasil" onChange={handleChange} className="h-9 rounded-sm text-xs mt-2"
                                    />
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="uf" className="text-xs">UF*</Label>
                                    <Input name="uf" type="text" placeholder="Ex: RN" onChange={handleChange} className="h-9 rounded-sm text-xs mt-2"
                                        value={company.uf} />
                                    {errors.uf && <p className="text-red-500 text-xs">{errors.uf}</p>}

                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="city" className="text-xs">Cidade*</Label>
                                    <Input name="city" type="text" placeholder="Ex: Natal" onChange={handleChange} className="h-9 rounded-sm text-xs mt-2"
                                        value={company.city} />
                                    {errors.city && <p className="text-red-500 text-xs">{errors.city}</p>}

                                </div>
                                <div className="">
                                    <Label className="text-pink-700 " onClick={handlePrevious}>Anterior</Label>
                                </div>
                                <div className="flex  justify-center"><Label className="text-xs text-zinc-500">3/8</Label></div>
                                <div className="flex justify-between items-center mt-4 flex-col ">
                                    <Button className="bg-pink-700 w-full text-xs rounded-sm mb-3 h-9 " onClick={handleNext}>Próximo</Button>
                                    <div>
                                        <Label className="text-xs">Você é já possuí uma conta ?<Link href="/" className="font-bold"> Entrar</Link></Label>
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
                                    <Input name="street" type="text" placeholder="Ex: Rua X, 123" onChange={handleChange} className="h-9 rounded-sm text-xs mt-2"
                                        value={company.street} />
                                    {errors.street && <p className="text-red-500 text-xs">{errors.street}</p>}

                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="number" className="text-xs">Número*</Label>
                                    <Input name="number" type="text" placeholder="Digite o número" onChange={handleChange} className="h-9 rounded-sm text-xs mt-2"
                                        value={company.number} />
                                    {errors.number && <p className="text-red-500 text-xs">{errors.number}</p>}

                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="complement" className="text-xs">Complemento</Label>
                                    <Input name="complement" type="text" placeholder="Digite o complemento" onChange={handleChange} className="h-9 rounded-sm text-xs mt-2"
                                        value={company.complement} />
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="neighborhood" className="text-xs">Bairro*</Label>
                                    <Input name="neighborhood" type="text" placeholder="Digite o bairro" onChange={handleChange} className="h-9 rounded-sm text-xs mt-2" value={company.neighborhood} />
                                    {errors.neighborhood && <p className="text-red-500 text-xs">{errors.neighborhood}</p>}

                                </div>
                                <div className="">
                                    <Label className="text-pink-700 " onClick={handlePrevious}>Anterior</Label>
                                </div>
                                <div className="flex  justify-center" ><Label className="text-xs text-zinc-500">4/8</Label></div>
                                <div className="flex justify-between items-center mt-4 flex-col ">
                                    <Button className="bg-pink-700 w-full text-xs rounded-sm mb-3 h-9 " onClick={handleNext}>Próximo</Button>
                                    <div>
                                        <Label className="text-xs">Você é já possuí uma conta ?<Link href="/" className="font-bold"> Entrar</Link></Label>
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
                                    <Input name="name" type="text" placeholder="Digite o nome do Usuário" onChange={handleUserChange} className="h-9 rounded-sm text-xs mt-2" value={company.user.name} />
                                    {errors['user.name'] && <p className="text-red-500 text-xs">{errors['user.name']}</p>}
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="documentNumber" className="text-xs">CPF*</Label>
                                    <InputMask name="documentNumber" mask="999.999.999-99" placeholder="Digite o CPF do Usuário" onChange={handleUserChange} className="h-9 rounded-sm text-xs mt-2 flex w-full  border border-input bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" value={company.user.documentNumber} />
                                    {errors['user.documentNumber'] && <p className="text-red-500 text-xs">{errors['user.documentNumber']}</p>}
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="phone" className="text-xs">Telefone*</Label>
                                    <InputMask mask="(99) 99999-9999" name="phone" placeholder="Digite o telefone do Usuário" onChange={handleUserChange} className=" h-9 rounded-sm text-xs mt-2 flex  w-full  border border-input bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" value={company.user.phone} />
                                    {errors['user.phone'] && <p className="text-red-500 text-xs">{errors['user.phone']}</p>}
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="email" className="text-xs">Email*</Label>
                                    <Input name="email" type="email" placeholder="Digite o seu email" onChange={handleUserChange} className="h-9 rounded-sm text-xs mt-2" value={company.user.email} />
                                    {errors['user.email'] && <p className="text-red-500 text-xs">{errors['user.email']}</p>}
                                </div>
                                <div className="">
                                    <Label className="text-pink-700 " onClick={handlePrevious}>Anterior</Label>
                                </div>
                                <div className="flex  justify-center"><Label className="text-xs text-zinc-500">5/8</Label></div>
                                <div className="flex justify-between items-center mt-4 flex-col ">
                                    <Button className="bg-pink-700 w-full text-xs rounded-sm mb-3 h-9 " onClick={handleNext}>Próximo</Button>
                                    <div>
                                        <Label className="text-xs">Você é já possuí uma conta ?<Link href="/" className="font-bold"> Entrar</Link></Label>
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
                                    <Input name="birthDate" type="date" placeholder="Digite a data de nascimento" onChange={handleUserChange} className="h-9 rounded-sm text-xs mt-2 flex w-full border border-input bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" value={company.user.birthDate} />
                                    {errors['user.birthDate'] && <p className="text-red-500 text-xs">{errors['user.birthDate']}</p>}
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="motherName" className="text-xs">Nome da Mãe*</Label>
                                    <Input name="motherName" type="text" placeholder="Digite o nome da mãe" onChange={handleUserChange} className="h-9 rounded-sm text-xs mt-2" value={company.user.motherName} />
                                    {errors['user.motherName'] && <p className="text-red-500 text-xs">{errors['user.motherName']}</p>}
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="password" className="text-xs">Senha*</Label>
                                    <Input name="password" type="password" placeholder="Digite a senha" onChange={handleUserChange} className="h-9 rounded-sm text-xs mt-2" value={company.user.password} />
                                    {errors['user.password'] && <p className="text-red-500 text-xs">{errors['user.password']}</p>}
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="confirmPassword" className="text-xs">Confirme a Senha*</Label>
                                    <Input name="confirmPassword" type="password" placeholder="Confirme a senha" onChange={verificaInput} className="h-9 rounded-sm text-xs mt-2" value={inputValue} />
                                    {errors['user.password'] && <p className="text-red-500 text-xs">{errors['user.password']}</p>}
                                </div>
                                <div className="">
                                    <Label className="text-pink-700 " onClick={handlePrevious}>Anterior</Label>
                                </div>
                                <div className="flex  justify-center"><Label className="text-xs text-zinc-500">6/8</Label></div>
                                <div className="flex justify-between items-center mt-4 flex-col ">
                                    <Button className="bg-pink-700 w-full text-xs rounded-sm mb-3 h-9 " onClick={handleNext}>Próximo</Button>
                                    <div>
                                        <Label className="text-xs">Você é já possuí uma conta ?<Link href="/" className="font-bold"> Entrar</Link></Label>
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
                                    <InputMask mask="99999-999" name="cep" placeholder="00000-000" onChange={handleUserChange} className="h-9 rounded-sm text-xs mt-2 flex w-full border border-input bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" value={company.user.cep} />
                                    {errors['user.cep'] && <p className="text-red-500 text-xs">{errors['user.cep']}</p>}
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="street" className="text-xs">Logradouro do Usuário*</Label>
                                    <Input name="street" type="text" placeholder="Ex: Rua X, 123" onChange={handleUserChange} className="h-9 rounded-sm text-xs mt-2"
                                        value={company.user.street} />
                                    {errors['user.street'] && <p className="text-red-500 text-xs">{errors['user.street']}</p>}
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="number" className="text-xs">Número*</Label>
                                    <Input name="number" type="text" placeholder="Digite o número" onChange={handleUserChange} className="h-9 rounded-sm text-xs mt-2" value={company.user.number} />
                                    {errors['user.number'] && <p className="text-red-500 text-xs">{errors['user.number']}</p>}
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="complement" className="text-xs">Complemento</Label>
                                    <Input name="complement" type="text" placeholder="Digite o complemento" onChange={handleUserChange} className="h-9 rounded-sm text-xs mt-2" value={company.user.complement} />
                                </div>
                                <div className="">
                                    <Label className="text-pink-700 " onClick={handlePrevious}>Anterior</Label>
                                </div>
                                <div className="flex  justify-center"><Label className="text-xs text-zinc-500">7/8</Label></div>
                                <div className="flex justify-between items-center mt-4 flex-col ">
                                    <Button className="bg-pink-700 w-full text-xs rounded-sm mb-3 h-9 " onClick={handleNext}>Próximo</Button>
                                    <div>
                                        <Label className="text-xs">Você é já possuí uma conta ?<Link href="/" className="font-bold"> Entrar</Link></Label>
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
                                    <Input name="neighborhood" type="text" placeholder="Digite o bairro" onChange={handleUserChange} className="h-9 rounded-sm text-xs mt-2" value={company.user.neighborhood} />
                                    {errors['user.neighborhood'] && <p className="text-red-500 text-xs">{errors['user.neighborhood']}</p>}
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="city" className="text-xs">Cidade*</Label>
                                    <Input name="city" type="text" placeholder="Ex: Natal" onChange={handleUserChange} className="h-9 rounded-sm text-xs mt-2"
                                        value={company.user.city} />
                                    {errors['user.city'] && <p className="text-red-500 text-xs">{errors['user.city']}</p>}
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="uf" className="text-xs">UF*</Label>
                                    <Input name="uf" type="text" placeholder="Ex: RN" onChange={handleUserChange} className="h-9 rounded-sm text-xs mt-2"
                                        value={company.user.uf} />
                                    {errors['user.uf'] && <p className="text-red-500 text-xs">{errors['user.uf']}</p>}
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="site" className="text-xs">Site</Label>
                                    <Input name="site" type="text" placeholder="Ex: www.site.com" onChange={handleUserChange} className="h-9 rounded-sm text-xs mt-2"
                                    />
                                </div>
                                <div className="">
                                    <Label className="text-pink-700 underline" onClick={handlePrevious}>Anterior</Label>
                                </div>
                                <div className="flex  justify-center"><Label className="text-xs text-zinc-500">8/8</Label></div>
                                <div className="flex justify-between items-center mt-4 flex-col ">
                                    <Button className="bg-pink-700 w-full text-xs rounded-sm mb-3 h-9 " onClick={handleNext}>Cadastrar</Button>
                                    <div>
                                        <Label className="text-xs ">Você é já possuí uma conta ?<Link href="/" className="font-bold underline hover:text-pink-700"> Entrar</Link></Label>
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

