'use client'
import React, { useState, useEffect, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import Sidebar from '@/components/ui/sidebar';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Auth from '../../auth/auth';
import Header from '@/components/ui/hearder';
import Link from 'next/link';
import { IconDotsVertical, IconLock, IconSearch, IconUser } from '@tabler/icons-react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { CadastrarUser, CadastroUsuario } from '@/api/cadastroUser';
import { ListarTodosUsers, ListarUsers, ParamsListarUsers } from '@/api/listarUsers';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { masterAtualizar } from '@/api/atualizarUser';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';

export default function Profile() {
    Auth();
    const [isOpen, setIsOpen] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [user, setUser] = useState<CadastrarUser>({
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
        uf: '',
        codiemp: undefined
    });
    const [buscarUsers, setListarUsers] = useState<ListarUsers['users']>();
    const [searchParams, setSearchParams] = useState<string>('');
    const [ufParams, setufParams] = useState<string>('');
    const [masterParams, setMasterParams] = useState<string>('');
    const [limitParams, setlimitParams] = useState<number>(10);
    const [pageParams, setPageParams] = useState<number>(0);
    const [pagination, setPagination] = useState({ totalPages: 0, currentPage: 0 });

    const handleMasterChange = async (userId: string, currentStatus: string) => {
        const newMaster = currentStatus === 'S' ? 'N' : 'S';
        const token = localStorage.getItem('token') || '';
        try {
            await masterAtualizar(token, { userId, master: newMaster });
            fetchUsers();
        } catch (error) {
            console.error('Erro ao alterar o status:', error);
        }
    };

    const fetchUsers = useCallback(async () => {
        const Params: ParamsListarUsers = {
            search: searchParams,
            uf: ufParams,
            master: masterParams,
            limit: limitParams,
            page: pageParams
        };

        const token = localStorage.getItem('token') || '';
        try {
            const data = await ListarTodosUsers(token, Params);
            setListarUsers(data.users);
            setPagination({ totalPages: data.totalPages, currentPage: data.page });
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }, [searchParams, ufParams, masterParams, limitParams, pageParams]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const limparDados = {
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
        uf: '',
        codiemp: undefined
    };

    const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('token') || '';
        try {
            const response = await CadastroUsuario(token, user);
            if (response?.status === 201) {
                console.log('Usuário cadastrado com sucesso:', response);
                setModalOpen(false);
                setUser(limparDados);
                console.log(response);
            }
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
        }
    };

    const handlePageChange = (page: number) => {
        setPageParams(page - 1);
    };

    const handleNextPage = () => {
        setPageParams((prev) => Math.min(prev + 1, pagination.totalPages - 1));
    };

    const handlePreviousPage = () => {
        setPageParams((prev) => Math.max(prev - 1, 0));
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
    const openModalCloseSidebar = () => {
        setIsOpen(false);
        setModalOpen(true);
    };

    return (
        <div className="flex">
            <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
            <div className={`flex-1 transition-margin duration-300 ease-in-out ${isSmallScreen ? 'ml-0' : (isOpen ? 'ml-64' : 'ml-0')}`} style={{ width: isOpen ? 'calc(100% - 256px)' : '100%' }}>
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
                                <Button className="text-sm hover:bg-white text-pink-900 font-bold mb-6 h-6 rounded-sm bg-white p-5 pb-5 rounded-b-none " variant="secondary">
                                    <Link href="">Usuários</Link>
                                </Button>
                            </div>
                            <div className=''>
                                <Button className="text-sm mb-6 h-7 rounded-sm rounded-tl-none rounded-bl-none  rounded-br-none p-5" variant="secondary">
                                    <Link href="/profile/emps">Empresas</Link>
                                </Button>
                            </div>

                        </div>
                        <Card className="rounded-xl p-5 mt-[15px] rounded-tl-none">

                            {isLoading ? (
                                <p>Carregando...</p>
                            ) : (<div className=''>
                                <div className='flex justify-between mb-2'>
                                    <div className='flex items-center gap-1'>
                                        <IconSearch />
                                        <Input
                                            value={searchParams}
                                            onChange={(e) => setSearchParams(e.target.value)}
                                            className='h-8'
                                            placeholder='Pesquise um cliente...' />
                                    </div>
                                    <Button onClick={() => openModalCloseSidebar()} variant={'secondary'}>Adicionar usuário</Button>

                                </div>
                                <div>
                                    <ScrollArea className="h-full whitespace-nowrap">
                                        <Table style={{ maxWidth: 'calc(100% - 32px)' }}>
                                            <TableHeader>
                                                <TableRow>
                                                    {/* Cabeçalhos da tabela */}
                                                    <TableHead className=''>Código</TableHead>
                                                    <TableHead className=''>Nome</TableHead>
                                                    <TableHead className=''>Código Empresa</TableHead>
                                                    <TableHead className=''>E-mail</TableHead>
                                                    <TableHead className=''>Master</TableHead>
                                                    <TableHead className=''>Data Cadastro</TableHead>
                                                    <TableHead className=''>CPF</TableHead>
                                                    <TableHead className=''>Telefone</TableHead>
                                                    <TableHead className=''>Data Nascimento</TableHead>
                                                    <TableHead className=''>Cidade</TableHead>
                                                    <TableHead className=''>UF</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {
                                                    buscarUsers?.map((users, index) => (
                                                        <TableRow key={index} className=''>
                                                            {/* Células da tabela */}
                                                            <TableCell>{users.id || '-'}</TableCell>
                                                            <TableCell>{users.name || '-'}</TableCell>
                                                            <TableCell>{users.codiemp || '-'}</TableCell>
                                                            <TableCell>{users.email || '-'}</TableCell>
                                                            {/* <TableCell>{users.master || '-'}</TableCell> */}
                                                            <TableCell className='flex justify-evenly items-center'>
                                                                {users.master === 'S' ? <span className='text-green-500 font-semibold'>{users.master}</span> : <span className=''> {users.master}</span>}
                                                                <DropdownMenu>
                                                                    <DropdownMenuTrigger asChild>
                                                                        <Button className="bg-transparent focus:border-0 text-gray-500 hover:bg-gray-300 p-0">
                                                                            <IconDotsVertical className="w-5 h-5" />
                                                                        </Button>
                                                                    </DropdownMenuTrigger>
                                                                    <DropdownMenuContent className="absolute  right-0 top-full mt-2 w-16 bg-white shadow-lg rounded-md border border-gray-200 p-2 flex flex-col">
                                                                        <DropdownMenuItem onClick={() => handleMasterChange(users.id, users.master)} className="flex justify-center items-center p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                                                                            <span className="text-gray-700">
                                                                                {users.master === 'S' ? 'N' : 'S'}
                                                                            </span>
                                                                        </DropdownMenuItem>
                                                                    </DropdownMenuContent>
                                                                </DropdownMenu>
                                                            </TableCell>
                                                            <TableCell>{users.createdAt ? new Date(users.createdAt).toLocaleDateString() : '-'}</TableCell>
                                                            <TableCell>{users.documentNumber || '-'}</TableCell>
                                                            <TableCell>{users.phone || '-'}</TableCell>
                                                            <TableCell>{users.birthDate ? new Date(users.birthDate).toLocaleDateString() : '-'}</TableCell>
                                                            <TableCell>{users.city || '-'}</TableCell>
                                                            <TableCell>{users.uf || '-'}</TableCell>
                                                        </TableRow>
                                                    ))
                                                }
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
                            </div>)




                            }

                        </Card>

                    </div>
                </div>
            </div>
            {modalOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <ScrollArea>
                                <div className="bg-white px-4 pt-5 pb-4 ">
                                    <div className="h-96">
                                        <div className='flex items-center gap-2'>
                                            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-pink-100 sm:mx-0 sm:h-10 sm:w-10">
                                                <IconUser className="h-6 w-6 text-pink-600" aria-hidden="true" />
                                            </div>
                                            <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                                Cadastro de usuário
                                            </h3>
                                        </div>
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left ">
                                            <div className="mt-5">
                                                <form onSubmit={handleSubmit}>
                                                    <div className="flex flex-col gap-2">
                                                        <div className='flex gap-2'>
                                                            <div>
                                                                <Label htmlFor='name'>Nome</Label>
                                                                <Input
                                                                    type="text"
                                                                    id="name"
                                                                    name="name"
                                                                    value={user.name}
                                                                    onChange={handleUserChange}
                                                                    placeholder='Digite seu nome'
                                                                />
                                                            </div>
                                                            <div>
                                                                <Label htmlFor='documentNumber'>CPF</Label>
                                                                <Input
                                                                    type="number"
                                                                    id="documentNumber"
                                                                    name="documentNumber"
                                                                    value={user.documentNumber}
                                                                    onChange={handleUserChange}
                                                                    placeholder="000.000.000-00"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className='flex gap-2'>
                                                            <div className='flex-1'>
                                                                <Label htmlFor='phone'>Telefone</Label>
                                                                <Input
                                                                    type="number"
                                                                    id="phone"
                                                                    name="phone"
                                                                    value={user.phone}
                                                                    onChange={handleUserChange}
                                                                    placeholder="(00) 0-0000-0000"
                                                                />
                                                            </div>
                                                            <div className='max-w-[150px]'>
                                                                <Label htmlFor='birthDate'>Data de Nascimento</Label>
                                                                <Input
                                                                    type="date"
                                                                    id="birthDate"
                                                                    name="birthDate"
                                                                    value={user.birthDate}
                                                                    onChange={handleUserChange}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <Label htmlFor='motherName'>Nome da Mãe</Label>
                                                            <Input
                                                                type="text"
                                                                id="motherName"
                                                                name="motherName"
                                                                value={user.motherName}
                                                                placeholder="Digite o nome da Mãe"
                                                                onChange={handleUserChange}

                                                            />
                                                        </div>
                                                        <div>
                                                            <Label htmlFor='email'>E-mail</Label>
                                                            <Input
                                                                type="email"
                                                                id="email"
                                                                name="email"
                                                                value={user.email}
                                                                placeholder="Digite seu e-mail"
                                                                onChange={handleUserChange}

                                                            />
                                                        </div>
                                                        <div>
                                                            <Label htmlFor='password'>Senha</Label>
                                                            <Input
                                                                type="password"
                                                                id="password"
                                                                name="password"
                                                                value={user.password}
                                                                placeholder="Digite sua senha"
                                                                onChange={handleUserChange}

                                                            />
                                                        </div>
                                                        <div className='flex gap-2'>
                                                            <div className='max-w-[150px]'>
                                                                <Label htmlFor='cep'>CEP</Label>
                                                                <Input
                                                                    type="number"
                                                                    id="cep"
                                                                    name="cep"
                                                                    value={user.cep}
                                                                    placeholder="00000-000"
                                                                    onChange={handleUserChange}

                                                                />
                                                            </div>
                                                            <div className='flex-1'>
                                                                <Label htmlFor='street'>Logradouro</Label>
                                                                <Input
                                                                    type="text"
                                                                    id="street"
                                                                    name="street"
                                                                    value={user.street}
                                                                    placeholder="Rua X"
                                                                    onChange={handleUserChange}

                                                                />
                                                            </div>
                                                        </div>
                                                        <div className='flex gap-2'>
                                                            <div className='flex-1'>
                                                                <Label htmlFor='neighborhood'>Bairro</Label>
                                                                <Input
                                                                    type="text"
                                                                    id="neighborhood"
                                                                    name="neighborhood"
                                                                    value={user.neighborhood}
                                                                    placeholder="Bairro X"
                                                                    onChange={handleUserChange}

                                                                />
                                                            </div>
                                                            <div className='max-w-[80px]'>
                                                                <Label htmlFor='number'>Nº</Label>
                                                                <Input
                                                                    type="number"
                                                                    id="number"
                                                                    name="number"
                                                                    value={user.number}
                                                                    placeholder="10"
                                                                    onChange={handleUserChange}

                                                                />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <Label htmlFor='complement'>Complemento</Label>
                                                            <Input
                                                                type="text"
                                                                id="complement"
                                                                name="complement"
                                                                value={user.complement}
                                                                placeholder="Loja 1"
                                                                onChange={handleUserChange}

                                                            />
                                                        </div>
                                                        <div className='flex gap-2'>
                                                            <div className='flex-1'>
                                                                <Label>Cidade</Label>
                                                                <Input
                                                                    type="text"
                                                                    id="city"
                                                                    name="city"
                                                                    value={user.city}
                                                                    placeholder="São Paulo"
                                                                    onChange={handleUserChange}

                                                                />
                                                            </div>
                                                            <div className='max-w-[80px]'>
                                                                <Label htmlFor='uf'>UF</Label>
                                                                <Input
                                                                    type="text"
                                                                    id="uf"
                                                                    name="uf"
                                                                    value={user.uf}
                                                                    placeholder="SP"
                                                                    onChange={handleUserChange}

                                                                />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <Label>Código da empresa</Label>
                                                            <Input
                                                                type="number"
                                                                id="codiemp"
                                                                name="codiemp"
                                                                value={user.codiemp}
                                                                placeholder="12"
                                                                onChange={handleUserChange}

                                                            />
                                                        </div>
                                                    </div>
                                                </form>
                                                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ScrollArea>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <Button className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-pink-900 text-base font-medium text-white hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-100 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={handleSubmit}>
                                    Salvar
                                </Button>
                                <Button
                                    onClick={() => setModalOpen(false)}
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Cancelar
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}