'use client'
import React, { useState, useEffect, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import Sidebar from '@/components/ui/sidebar';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Auth from '../../auth/auth';
import Link from 'next/link';
import { IconDotsVertical, IconLock, IconSearch, IconUser } from '@tabler/icons-react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { ListarTodasEmpresas, ParamsListarEmps, Empresas } from '@/api/listarEmpresas';
import { AlterarStatusEmpresa } from '@/api/alterarStatusEmpresa';
import { AlterarTaxaEmp, AlterarTaxaParams } from '@/api/alterarTaxaEmp';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import Header from '@/components/ui/hearder';

export default function Profile() {
    Auth();
    const [isOpen, setIsOpen] = useState(true);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [listarEmps, setListarEmps] = useState<Empresas['companies']>([]);
    const [searchParams, setSearchParams] = useState<string>('');
    const [ufParams, setUfParams] = useState<string>('');
    const [typeFeeParams, setTypeFeeParams] = useState<string>('');
    const [partnerTypeFeeParams, setPartnerTypeFeeParams] = useState<string>('');
    const [limitParams, setLimitParams] = useState<number>(10);
    const [pageParams, setPageParams] = useState<number>(0);
    const [pagination, setPagination] = useState({ totalPages: 0, currentPage: 0 });

    const fetchUsers = useCallback(async () => {
        const token = localStorage.getItem('token') || '';
        try {
            const params: ParamsListarEmps = {
                search: searchParams,
                uf: ufParams,
                typeFee: typeFeeParams,
                partnerTypeFee: partnerTypeFeeParams,
                limit: limitParams,
                page: pageParams,
            };
            const data = await ListarTodasEmpresas(token, params);
            setListarEmps(data.companies);
            setPagination({ totalPages: data.totalPages, currentPage: data.page });
        } catch (error) {
            console.error(error);
        }
    }, [searchParams, ufParams, typeFeeParams, partnerTypeFeeParams, limitParams, pageParams]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handlePageChange = (page: number) => {
        setPageParams(page - 1);
    };

    const handleNextPage = () => {
        setPageParams((prev) => Math.min(prev + 1, pagination.totalPages - 1));
    };

    const handlePreviousPage = () => {
        setPageParams((prev) => Math.max(prev - 1, 0));
    };

    const handleStatusChange = async (companyId: string, currentStatus: string) => {
        const newStatus = currentStatus === 'ATIVO' ? 'INATIVO' : 'ATIVO';
        const token = localStorage.getItem('token') || '';
        try {
            await AlterarStatusEmpresa(token, { companyId, status: newStatus });
            fetchUsers();
        } catch (error) {
            console.error('Erro ao alterar o status:', error);
        }
    };

    const handleTypeFeeChange = async (companyId: string, currentTypeFee: string) => {
        const token = localStorage.getItem('token') || '';
        const newTypeFee = currentTypeFee === 'V' ? 'P' : 'V'
        try {
            await AlterarTaxaEmp(token, { companyId, typeFee: newTypeFee });
            fetchUsers();
        } catch (error) {
            console.error('Erro ao alterar o tipo da taxa:', error);
        }
    };

    const handlePartnerTypeFeeChange = async (companyId: string, currentPartnerTypeFee: string) => {
        const token = localStorage.getItem('token') || '';
        const newPartnerTypeFee = currentPartnerTypeFee === 'V' ? 'P' : 'V'
        try {
            await AlterarTaxaEmp(token, { companyId, partnerTypeFee: newPartnerTypeFee });
            fetchUsers();
        } catch (error) {
            console.error('Erro ao alterar o tipo da taxa do parceiro:', error);
        }
    };

    // Função para alterar a taxa
    const handleTaxaChange = async (companyId: string, typeFee: string, valueFee: string) => {
        const token = localStorage.getItem('token') || '';

        // Log de depuração
        console.log('Valores enviados para AlterarTaxaEmp:');
        console.log('companyId:', companyId);
        console.log('typeFee:', typeFee);
        console.log('valueFee:', valueFee);

        try {
            const response = await AlterarTaxaEmp(token, { companyId, valueFee, typeFee });
            console.log('Resposta do servidor:', response);
            fetchUsers();
        } catch (error) {
            console.error('Erro ao alterar o valor da taxa:', error);
        }
    };

    // Função para alterar a taxa do parceiro
    const handleTaxaParceiroChange = async (companyId: string, partnerTypeFee: string, partnerValueFee: string) => {
        const token = localStorage.getItem('token') || '';

        // Log de depuração
        console.log('Valores enviados para AlterarTaxaEmp:');
        console.log('companyId:', companyId);
        console.log('partnerTypeFee:', partnerTypeFee);
        console.log('partnerValueFee:', partnerValueFee);

        try {
            const response = await AlterarTaxaEmp(token, { companyId, partnerTypeFee, partnerValueFee });
            console.log('Resposta do servidor:', response);
            fetchUsers();
        } catch (error) {
            console.error('Erro ao alterar o valor da taxa:', error);
        }
    };




    const checkScreenSize = () => {
        setIsSmallScreen(window.innerWidth <= 768);
    };

    const handleSidebarVisibility = () => {
        const shouldShowSidebar = window.innerWidth > 768;
        setIsOpen(shouldShowSidebar);
    };

    useEffect(() => {
        checkScreenSize();
        handleSidebarVisibility();
        const handleResize = () => {
            checkScreenSize();
            handleSidebarVisibility();
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    
    return (
        <div className="flex">
            <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
            <div className={`flex-1 transition-margin duration-300 ease-in-out ${isSmallScreen ? 'ml-0' : isOpen ? 'ml-64' : 'ml-0'}`} style={{ width: isOpen ? 'calc(100% - 256px)' : '100%' }}>
                <Header titulo="Configurações" isOpen={isOpen} toggleSidebar={toggleSidebar} />
                <div className="flex-col mt-20">
                <div className="p-10">
                    <div className='flex  items-center flex-wrap absolute top-24'>
                            <div className=''>
                                <Button className="text-sm h-7 rounded-none  mb-6 p-5 rounded-tl-sm " variant="secondary">
                                    <Link href="/profile">Informações cadastrais</Link>
                                </Button>
                            </div>
                            <div className=''>
                                <Button className="text-sm h-7 rounded-none  mb-6 p-5 " variant="secondary">
                                    <Link href="/profile/users">Usuários</Link>
                                </Button>
                            </div>
                            <div className=''>
                                <Button className="text-sm hover:bg-white text-pink-900 font-bold mb-6 h-6 rounded-sm bg-white p-5 pb-5 rounded-b-none " variant="secondary">
                                    <Link href="">Empresas</Link>
                                </Button>
                            </div>
                        </div>
                        <Card className="rounded-xl p-5 mt-[15px] rounded-tl-none">
                            {listarEmps ? (
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <div className="flex items-center gap-1">
                                            <IconSearch />
                                            <Input
                                                value={searchParams}
                                                onChange={(e) => setSearchParams(e.target.value)}
                                                className="h-8"
                                                placeholder="Pesquise uma empresa..."
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <ScrollArea className="h-full whitespace-nowrap">
                                            <Table style={{ maxWidth: 'calc(100% - 32px)' }}>
                                                <TableHeader>
                                                    <TableRow>
                                                        {/* Cabeçalhos da tabela */}
                                                        <TableHead>ID</TableHead>
                                                        <TableHead>Nome Fantasia</TableHead>
                                                        {/* <TableHead>Razão Social</TableHead> */}
                                                        <TableHead>CNPJ</TableHead>
                                                        <TableHead>E-mail</TableHead>
                                                        <TableHead>Status</TableHead>
                                                        <TableHead></TableHead>
                                                        <TableHead>Taxa do Parceiro</TableHead>
                                                        <TableHead>Valor Parceiro</TableHead>
                                                        <TableHead>Tipo de Taxa</TableHead>
                                                        <TableHead>Valor Taxa</TableHead>
                                                        <TableHead>Taxa Total</TableHead>
                                                        <TableHead>Site</TableHead>
                                                        <TableHead>Usuário</TableHead>
                                                        <TableHead>Telefone</TableHead>
                                                        <TableHead>IE</TableHead>
                                                        <TableHead>IM</TableHead>
                                                        <TableHead>Endereço</TableHead>
                                                        <TableHead>Número</TableHead>
                                                        <TableHead>Complemento</TableHead>
                                                        <TableHead>Bairro</TableHead>
                                                        <TableHead>Cidade</TableHead>
                                                        <TableHead>UF</TableHead>
                                                        <TableHead>CEP</TableHead>
                                                        <TableHead>Webhook</TableHead>
                                                        <TableHead>Webhook Out</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {listarEmps.map((emps, index) => (
                                                        <TableRow key={index}>
                                                            {/* Células da tabela */}
                                                            <TableCell>{emps.id || '-'}</TableCell>
                                                            <TableCell>{emps.fantasy || '-'}</TableCell>
                                                            {/* <TableCell>{emps.name || '-'}</TableCell> */}
                                                            <TableCell>{emps.documentNumber || '-'}</TableCell>
                                                            <TableCell>{emps.email || '-'}</TableCell>

                                                            <TableCell className='flex justify-between items-center'>
                                                                {emps.status === 'ATIVO' ? (
                                                                    <span className='bg-green-100 text-green-500 p-1 rounded-sm w-full'>{emps.status || '-'}</span>
                                                                ) : emps.status === 'PENDENTE' ? (
                                                                    <span className='bg-yellow-100 text-yellow-500 p-1 rounded-sm w-full'>{emps.status || '-'}</span>
                                                                ) : emps.status === 'INATIVO' ? (
                                                                    <span className='bg-red-100 text-red-500 p-1 rounded-sm w-full'>{emps.status || '-'}</span>
                                                                ) : <span className='bg-transparent text-zinc-500'>{emps.status || '-'}</span>}
                                                                <DropdownMenu>
                                                                    <DropdownMenuTrigger asChild>
                                                                        <Button className="bg-transparent focus:border-0 text-gray-500 hover:bg-gray-300 p-0">
                                                                            <IconDotsVertical className="w-5 h-5" />
                                                                        </Button>
                                                                    </DropdownMenuTrigger>
                                                                    <DropdownMenuContent className="absolute right-0 top-full mt-2 w-16 bg-white shadow-lg rounded-md border border-gray-200 p-2 flex flex-col">
                                                                        <DropdownMenuItem onClick={() => handleStatusChange(emps.id, emps.status)} className="flex justify-center items-center p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                                                                            <span className="text-gray-700 text-xs">
                                                                                {emps.status === 'ATIVO' ? 'INATIVAR' : 'ATIVAR'}
                                                                            </span>
                                                                        </DropdownMenuItem>
                                                                    </DropdownMenuContent>
                                                                </DropdownMenu>
                                                            </TableCell>

                                                                <TableCell></TableCell>

                                                            <TableCell className='flex justify-evenly items-center'>{emps.partnerTypeFee || '-'}
                                                                <DropdownMenu>
                                                                    <DropdownMenuTrigger asChild>
                                                                        <Button className="bg-transparent focus:border-0 text-gray-500 hover:bg-gray-300 p-0">
                                                                            <IconDotsVertical className="w-5 h-5" />
                                                                        </Button>
                                                                    </DropdownMenuTrigger>
                                                                    <DropdownMenuContent className="absolute right-0 top-full mt-2 w-16 bg-white shadow-lg rounded-md border border-gray-200 p-2 flex flex-col">
                                                                        <DropdownMenuItem onClick={() => handlePartnerTypeFeeChange(emps.id, emps.partnerTypeFee)} className="flex justify-center items-center p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                                                                            <span className="text-gray-700 text-xs">
                                                                                {emps.partnerTypeFee === 'V' ? 'P' : 'V'}
                                                                            </span>
                                                                        </DropdownMenuItem>
                                                                    </DropdownMenuContent>
                                                                </DropdownMenu>
                                                            </TableCell>



                                                            <TableCell>
                                                                <Input
                                                                    type="number"
                                                                    step="0.01"
                                                                    value={emps.partnerValueFee || ''}
                                                                    onChange={(e) => handleTaxaParceiroChange(
                                                                        emps.id,
                                                                        emps.partnerTypeFee,
                                                                        e.target.value
                                                                    )}
                                                                    className="h-8 max-w-20 bg-transparent  focus:border-transparent focus:outline-none"
                                                                />
                                                            </TableCell>

                                                            <TableCell className='flex justify-evenly items-center'>{emps.typeFee || '-'}
                                                                <DropdownMenu>
                                                                    <DropdownMenuTrigger asChild>
                                                                        <Button className="bg-transparent focus:none text-gray-500 hover:bg-gray-300 p-0">
                                                                            <IconDotsVertical className="w-5 h-5" />
                                                                        </Button>
                                                                    </DropdownMenuTrigger>
                                                                    <DropdownMenuContent className="absolute right-0 top-full mt-2 w-16 bg-white shadow-lg rounded-md border border-gray-200 p-2 flex flex-col">
                                                                        <DropdownMenuItem onClick={() => handleTypeFeeChange(emps.id, emps.typeFee)} className="flex justify-center items-center p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                                                                            <span className="text-gray-700 text-xs">
                                                                                {emps.typeFee === 'V' ? 'P' : 'V'}
                                                                            </span>
                                                                        </DropdownMenuItem>
                                                                    </DropdownMenuContent>
                                                                </DropdownMenu>
                                                            </TableCell>


                                                            <TableCell>
                                                                <Input
                                                                    type="number"
                                                                    step="0.01"
                                                                    value={emps.valueFee || ''}
                                                                    onChange={(e) => handleTaxaChange(
                                                                        emps.id,
                                                                        emps.typeFee,
                                                                        e.target.value
                                                                    )}
                                                                    className="h-8 w-20 bg-transparent  focus:border-transparent focus:outline-none"
                                                                />
                                                            </TableCell>

                                                            <TableCell>{emps.totalFee || '-'}</TableCell>
                                                            <TableCell>{emps.site || '-'}</TableCell>
                                                            <TableCell>{emps.username || '-'}</TableCell>
                                                            <TableCell>{emps.phone || '-'}</TableCell>
                                                            <TableCell>{emps.ie || '-'}</TableCell>
                                                            <TableCell>{emps.im || '-'}</TableCell>
                                                            <TableCell>{emps.street || '-'}</TableCell>
                                                            <TableCell>{emps.number || '-'}</TableCell>
                                                            <TableCell>{emps.complement || '-'}</TableCell>
                                                            <TableCell>{emps.neighborhood || '-'}</TableCell>
                                                            <TableCell>{emps.city || '-'}</TableCell>
                                                            <TableCell>{emps.uf || '-'}</TableCell>
                                                            <TableCell>{emps.cep || '-'}</TableCell>
                                                            <TableCell>{emps.webhook || '-'}</TableCell>
                                                            <TableCell>{emps.webhook_out || '-'}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                            <ScrollBar orientation="horizontal" />
                                        </ScrollArea>
                                        <div className="flex justify-between items-center mt-4">
                                            <div className="flex-1">
                                                <p className="text-sm text-muted-foreground">Página {pagination.currentPage + 1} de {pagination.totalPages}</p>
                                            </div>
                                            <div className="flex justify-end">
                                                <Pagination>
                                                    <PaginationContent>
                                                        <PaginationItem>
                                                            <PaginationPrevious onClick={handlePreviousPage} />
                                                        </PaginationItem>
                                                        {Array.from({ length: pagination.totalPages }, (_, page) => (
                                                            <PaginationItem key={page + 1}>
                                                                <PaginationLink
                                                                    href="#"
                                                                    onClick={() => handlePageChange(page + 1)}
                                                                    className={pageParams === page ? 'active' : ''}
                                                                >
                                                                    {page + 1}
                                                                </PaginationLink>
                                                            </PaginationItem>
                                                        ))}
                                                        <PaginationItem>
                                                            <PaginationNext onClick={handleNextPage} />
                                                        </PaginationItem>
                                                    </PaginationContent>
                                                </Pagination>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <p>Carregando...</p>
                                </div>
                            )}
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
