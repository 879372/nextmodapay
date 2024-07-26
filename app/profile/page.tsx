'use client'
import React, { useState, useEffect, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import Sidebar from '@/components/ui/sidebar';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { IconDotsVertical, IconEdit, IconIndentDecrease, IconLock, IconTextDecrease } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import ObterDadosEmpresa, { Empresa } from '@/api/obterEmpresa';
import AtualizarDadosEmpresa from '@/api/atualizarDadosEmpresa';
import AtualizarSenhaAdm, { Atualizarsenha } from '@/api/atualizarSenha';
import Auth from '../auth/auth';
import Header from '@/components/ui/hearder';
import { buscarUserId, UserId } from '@/api/buscarUserPorId';
import { AtualizarUser, Useratualizar } from '@/api/atualizarUser';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import Link from 'next/link';
import { AdicionarIp, AdicionarIpAcesso } from '@/api/adicionarIp';
import { deleteIp, removerIpParams } from '@/api/removerIp';
import { Credenciais, ListarCredenciais } from '@/api/listarCredenciais';
import { SolicitarCredenciasEmp, SolicitarCredenciasParams } from '@/api/credenciasDaEmpresa';

export default function Profile() {
    Auth();
    const [isOpen, setIsOpen] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [dadosEmpresa, setDadosEmpresa] = useState<Empresa | null>(null);
    const [dadosAlterados, setDadosAlterados] = useState<Empresa | null>(null);
    const [obterDadosUser, setObterDadosUser] = useState<UserId | undefined>();
    const [atualizarUser, setAtualizarUser] = useState<AtualizarUser | undefined>();
    const [alterarSenha, setAlterarSenha] = useState<Atualizarsenha>({ oldPassword: '', newPassword: '', confirmPassword: '' });
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [activeTab, setActiveTab] = useState('empresa');
    const [ip, setIp] = useState<AdicionarIp>({ companyId: '', ip: '' });
    const [removerIp, setRemoverIp] = useState<removerIpParams>({ companyId: '', ip: '' });
    const [dadosCredenciais, setDadosCredenciais] = useState<Credenciais | null>(null);
    const [credenciais, setCredenciais] = useState<SolicitarCredenciasParams>([]);
    const [ipCredenciais, setIpCredenciais] = useState<string>('');

    const SolicitarCredenciais = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const token: string = localStorage.getItem('token') || '';

        const params: SolicitarCredenciasParams = [ipCredenciais];
        try {
            if (ipCredenciais) {
                const response = await SolicitarCredenciasEmp(token, params);
                setCredenciais([]); // Limpa o estado após a solicitação
                setIpCredenciais('');
                fecthBuscarCredenciais()
                console.log(response);
            } else {
                console.log('Endereço de IP invalido')
            }
        } catch (error) {
            console.error('Erro ao solicitar credenciais:', error);
        }
    };

    const fecthBuscarCredenciais = useCallback(async () => {
        const token = localStorage.getItem('token') || '';
        try {
            const data = await ListarCredenciais(token);
            setDadosCredenciais(data)
            console.log(data)
        } catch (error) {
            console.error(error)
        }
    }, [])

    useEffect(() => {
        fecthBuscarCredenciais();
    }, [fecthBuscarCredenciais]);

    const fectDadosUser = useCallback(async () => {
        const token = localStorage.getItem('token') || '';
        try {
            const data = await buscarUserId(token);
            setObterDadosUser(data);

            setAtualizarUser(data as AtualizarUser);
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        fectDadosUser();
    }, [fectDadosUser]);


    const handleInputChangeUser = (e: React.ChangeEvent<HTMLInputElement>, key: keyof AtualizarUser) => {
        if (atualizarUser) {
            setAtualizarUser({
                ...atualizarUser,
                [key]: e.target.value,
            });
        }
    };

    const handleSaveClickUser = async () => {
        const token = localStorage.getItem('token') || '';
        if (atualizarUser) {
            try {
                await Useratualizar(token, atualizarUser);
                setObterDadosUser(atualizarUser as UserId); // Casting para garantir compatibilidade
                setIsEditing(false);

            } catch (error) {
                console.error('Erro ao atualizar dados da empresa:', error);
                setIsEditing(true);

            }
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
        handleSidebarVisibility()
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

    const fetchDadosEmpresa = useCallback(async () => {
        const token = localStorage.getItem('token') || '';
        setIsLoading(true);
        try {
            const data = await ObterDadosEmpresa(token);
            setDadosEmpresa(data);
            setDadosAlterados(data);
        } catch (error) {
            console.error('Erro ao chamar dados da empresa:', error);
            setError('Erro ao carregar dados da empresa. Por favor, tente novamente mais tarde.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchDadosEmpresa();
    }, [fetchDadosEmpresa]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setDadosAlterados(dadosEmpresa);
        setAtualizarUser(obterDadosUser)
    };

    const handleSaveClick = async () => {
        const token = localStorage.getItem('token') || '';
        if (dadosAlterados) {
            try {
                await AtualizarDadosEmpresa(dadosAlterados, token);
                setDadosEmpresa(dadosAlterados);
                setIsEditing(false);
            } catch (error) {
                console.error('Erro ao atualizar dados da empresa:', error);
                setIsEditing(true);
                setError('Erro ao atualizar dados da empresa. Por favor, tente novamente.');
            }
        }
    };

    const handleUpdatePassword = async () => {
        const token = localStorage.getItem('token') || '';
        setError(null);

        try {
            if (alterarSenha.oldPassword && alterarSenha.newPassword && alterarSenha.confirmPassword) {
                if (alterarSenha.oldPassword === alterarSenha.newPassword) {
                    setError('A senha nova não pode ser igual à senha atual!');
                    return;
                }

                if (alterarSenha.newPassword !== alterarSenha.confirmPassword) {
                    setError('A senha nova não pode ser confirmada!');
                    return;
                }

                if (alterarSenha.newPassword !== alterarSenha.confirmPassword) {
                    setError('Erro ao confirmar senha!');
                    return;
                }
                const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@.$!#]).{8,}$/;
                if (!passwordRegex.test(alterarSenha.newPassword)) {
                    setError('A senha deve ter no mínimo 8 caracteres, sendo pelo menos uma letra maiúscula, um número e um dos caracteres especiais @ . ! # $');
                    return;
                }

                await AtualizarSenhaAdm(alterarSenha, token);
                alert("Senha atualizada com sucesso!");
                setModalOpen(false);
                setAlterarSenha({ oldPassword: '', newPassword: '', confirmPassword: '' });
            } else {
                setError('Todos os campos de senha são obrigatórios.');
            }
        } catch (error) {
            console.error('Erro ao atualizar senha:', error);
            setError('Erro ao atualizar senha. Por favor, tente novamente.');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, key: keyof Empresa) => {
        if (dadosAlterados) {
            setDadosAlterados({
                ...dadosAlterados,
                [key]: e.target.value,
            });
        }
    };

    const handleInputAddChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setIp((prevIp) => ({ ...prevIp, [name]: value }));
        setRemoverIp((prevRemover) => ({ ...prevRemover, [name]: value }));
    };

    const Addip = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const token = localStorage.getItem('token') || '';

        if (ip.ip) {
            const response = await AdicionarIpAcesso(token, ip);
            setIp({ companyId: '', ip: '' });
            console.log(response);
            fecthBuscarCredenciais()
        } else {
            console.log('Endereço IP inválido.');
        }
    };

    const handleRemoveIp = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const token = localStorage.getItem('token') || '';

        if (removerIp.ip) {
            await deleteIp(token, removerIp);
            setRemoverIp({ companyId: '', ip: '' });
            console.log('IP removido com sucesso:', removerIp.ip);
            fecthBuscarCredenciais();
        } else {
            console.log('Endereço IP inválido.');
        }
    };


    const removeIp = async (ip: string) => {
        const token = localStorage.getItem('token') || '';
        try {
            await deleteIp(token, { companyId: removerIp.companyId, ip });
            fecthBuscarCredenciais(); // Atualiza os dados após a remoção
            console.log('IP removido com sucesso:', ip);
        } catch (error) {
            console.error('Erro ao remover IP:', error);
        }
    };
    

    return (
        <div className="flex">
            <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
            <div className={`flex-1 transition-margin duration-300 ease-in-out ${isSmallScreen ? 'ml-0' : (isOpen ? 'ml-64' : 'ml-0')}`} style={{ width: isOpen ? 'calc(100% - 256px)' : '100%' }}>
                <Header titulo="Configurações" isOpen={isOpen} toggleSidebar={toggleSidebar} />
                <div className="flex-col mt-20">
                    <div className="p-10 ">
                        <div className='flex  items-center flex-wrap absolute top-24'>
                            <div className=''>
                                <Button className="text-sm hover:bg-white text-pink-900 font-bold mb-5 h-6 rounded-sm bg-white p-5 pb-5 rounded-b-none ">Informações Cadastrais</Button>
                            </div>
                            {obterDadosUser && obterDadosUser.master === 'S' && (
                                <>
                                    <div className=''>
                                        <Button className="text-sm h-7 rounded-none  mb-5 p-5 " variant="secondary">
                                            <Link href="/profile/users">Usuários</Link>
                                        </Button>
                                    </div>
                                    <div className=''>
                                        <Button className="text-sm mb-5 h-7 rounded-sm rounded-tl-none rounded-bl-none  rounded-br-none p-5" variant="secondary">
                                            <Link href="/profile/emps">Empresas</Link>
                                        </Button>
                                    </div>
                                </>
                            )}

                        </div>
                        <Card className="rounded-xl p-5 mt-[15px] rounded-tl-none">

                            {isLoading ? (
                                <p>Carregando...</p>
                            ) : (
                                <Tabs value={activeTab} onValueChange={setActiveTab} className=''>
                                    <TabsList className='flex flex-wrap justify-start max-w-[325px]'>
                                        <TabsTrigger value="empresa" className='pb-1'>Empresa</TabsTrigger>
                                        <TabsTrigger value="usuario">Usuário</TabsTrigger>
                                        <TabsTrigger value="taxa">Taxa</TabsTrigger>
                                        <TabsTrigger value="credenciais">Credenciais</TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="empresa">
                                        {dadosEmpresa && (
                                            <div>
                                                <div className="flex justify-end">
                                                    {isEditing ? (
                                                        <div className="flex gap-3">
                                                            <Button onClick={handleSaveClick} className="bg-zinc-700 text-white">
                                                                Salvar
                                                            </Button>
                                                            <Button onClick={handleCancelClick} className="bg-red-600 text-white">
                                                                Cancelar
                                                            </Button>
                                                        </div>
                                                    ) : (
                                                        <div className="relative flex items-center">
                                                            <DropdownMenu>
                                                                <DropdownMenuTrigger asChild>
                                                                    <Button className="bg-transparent text-gray-700 hover:bg-gray-300 rounded p-1">
                                                                        <IconDotsVertical className="w-5 h-5" />
                                                                    </Button>
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent className="absolute right-0 top-full mt-2 w-44 bg-white shadow-lg rounded-md border border-gray-200 p-2 flex flex-col">
                                                                    <DropdownMenuItem onSelect={handleEditClick} className="flex items-center p-1 hover:bg-gray-100 rounded-md cursor-pointer">
                                                                        <IconEdit className="w-5 h-5 text-gray-600 mr-2" />
                                                                        <span className="text-gray-700 text-sm">Editar</span>
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem onSelect={() => setModalOpen(true)} className="flex items-center p-1 hover:bg-gray-100 rounded-md cursor-pointer">
                                                                        <IconLock className="w-5 h-5 text-gray-600 mr-2" />
                                                                        <span className="text-gray-700 text-sm">Atualizar senha</span>
                                                                    </DropdownMenuItem>
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="mb-6">
                                                    <h2 className="text-lg font-semibold mb-2">Empresa:</h2>
                                                    <div className="grid grid-cols-3 gap-3">
                                                        {/* Informações da Empresa */}
                                                        <div>
                                                            <Label>Nome</Label>
                                                            <Input
                                                                disabled
                                                                value={dadosAlterados?.name || ''} />
                                                        </div>
                                                        <div>
                                                            <Label>E-mail</Label>
                                                            <Input
                                                                disabled={!isEditing}
                                                                value={dadosAlterados?.email || ''}
                                                                onChange={(e) => handleInputChange(e, 'email')}
                                                            />
                                                        </div>
                                                        <div>
                                                            <Label>IE</Label>
                                                            <Input
                                                                disabled={!isEditing}
                                                                value={dadosAlterados?.ie || ''}
                                                                onChange={(e) => handleInputChange(e, 'ie')}
                                                                className=''
                                                            />
                                                        </div>
                                                        <div>
                                                            <Label>IM</Label>
                                                            <Input
                                                                disabled={!isEditing}
                                                                value={dadosAlterados?.im || ''}
                                                                onChange={(e) => handleInputChange(e, 'im')}
                                                            />
                                                        </div>
                                                        <div>
                                                            <Label>Telefone</Label>
                                                            <Input
                                                                disabled={!isEditing}
                                                                value={dadosAlterados?.phone || ''}
                                                                onChange={(e) => handleInputChange(e, 'phone')}
                                                            />
                                                        </div>
                                                        <div>
                                                            <Label>Site</Label>
                                                            <Input
                                                                disabled={!isEditing}
                                                                value={dadosAlterados?.site || ''}
                                                                onChange={(e) => handleInputChange(e, 'site')}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h2 className="text-lg font-semibold mb-2">Endereço:</h2>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <Label>CEP</Label>
                                                            <Input
                                                                disabled={!isEditing}
                                                                value={dadosAlterados?.cep || ''}
                                                                onChange={(e) => handleInputChange(e, 'cep')}
                                                            />
                                                        </div>
                                                        <div>
                                                            <Label>Logradouro</Label>
                                                            <Input
                                                                disabled={!isEditing}
                                                                value={dadosAlterados?.street || ''}
                                                                onChange={(e) => handleInputChange(e, 'street')}
                                                            />
                                                        </div>
                                                        <div>
                                                            <Label>Nº</Label>
                                                            <Input
                                                                disabled={!isEditing}
                                                                value={dadosAlterados?.number || ''}
                                                                onChange={(e) => handleInputChange(e, 'number')}
                                                            />
                                                        </div>
                                                        <div>
                                                            <Label>Complemento</Label>
                                                            <Input
                                                                disabled={!isEditing}
                                                                value={dadosAlterados?.complement || ''}
                                                                onChange={(e) => handleInputChange(e, 'complement')}
                                                            />
                                                        </div>
                                                        <div>
                                                            <Label>Bairro</Label>
                                                            <Input
                                                                disabled={!isEditing}
                                                                value={dadosAlterados?.neighborhood || ''}
                                                                onChange={(e) => handleInputChange(e, 'neighborhood')}
                                                            />
                                                        </div>
                                                        <div>
                                                            <Label>Cidade</Label>
                                                            <Input
                                                                disabled={!isEditing}
                                                                value={dadosAlterados?.city || ''}
                                                                onChange={(e) => handleInputChange(e, 'city')}
                                                            />
                                                        </div>
                                                        <div>
                                                            <Label>UF</Label>
                                                            <Input
                                                                disabled={!isEditing}
                                                                value={dadosAlterados?.uf || ''}
                                                                onChange={(e) => handleInputChange(e, 'uf')}
                                                            />
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </TabsContent>

                                    <TabsContent value="usuario">
                                        <div>
                                            <div className="flex justify-end">
                                                {isEditing ? (
                                                    <div className="flex gap-3">
                                                        <Button onClick={handleSaveClickUser} className="bg-zinc-700 text-white">
                                                            Salvar
                                                        </Button>
                                                        <Button onClick={handleCancelClick} className="bg-red-600 text-white">
                                                            Cancelar
                                                        </Button>
                                                    </div>
                                                ) : (
                                                    <div className="relative flex items-center">
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button className="bg-transparent text-gray-700 hover:bg-gray-300 rounded p-1">
                                                                    <IconDotsVertical className="w-5 h-5" />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent className="absolute right-0 top-full mt-2 w-44 bg-white shadow-lg rounded-md border border-gray-200 p-2 flex flex-col">
                                                                <DropdownMenuItem onSelect={handleEditClick} className="flex items-center p-1 hover:bg-gray-100 rounded-md cursor-pointer">
                                                                    <IconEdit className="w-5 h-5 text-gray-600 mr-2" />
                                                                    <span className="text-gray-700 text-sm">Editar</span>
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </div>
                                                )}
                                            </div>
                                            <h2 className="text-lg font-semibold mb-2">Usuário:</h2>
                                            <div className="grid grid-cols-2 gap-4">
                                                {/* Informações do Usuário */}
                                                <div>
                                                    <Label>Id</Label>
                                                    <Input disabled value={obterDadosUser?.id || ''} />
                                                </div>
                                                <div>
                                                    <Label>Nome</Label>
                                                    <Input
                                                        disabled
                                                        value={obterDadosUser?.name || ''}
                                                    />
                                                </div>
                                                <div>
                                                    <Label>Código empresa</Label>
                                                    <Input disabled value={obterDadosUser?.codiemp || ''} />
                                                </div>
                                                <div>
                                                    <Label>Master</Label>
                                                    <Input disabled value={obterDadosUser?.master || ''} />
                                                </div>
                                                <div>
                                                    <Label>CPF</Label>
                                                    <Input disabled value={obterDadosUser?.documentNumber || ''} />
                                                </div>
                                                <div>
                                                    <Label htmlFor='phone'>Telefone</Label>
                                                    <Input
                                                        type="text"
                                                        id="phone"
                                                        name="phone"
                                                        disabled={!isEditing}
                                                        value={atualizarUser?.phone || ''}
                                                        onChange={(e) => handleInputChangeUser(e, 'phone')}
                                                    />
                                                </div>
                                                <div>
                                                    <Label>Data de nascimento</Label>
                                                    <Input disabled value={obterDadosUser?.birthDate ? new Date(obterDadosUser?.birthDate).toLocaleDateString(): ''} />
                                                </div>
                                                <div>
                                                    <Label>CEP</Label>
                                                    <Input
                                                        disabled={!isEditing}
                                                        value={atualizarUser?.cep || ''}
                                                        onChange={(e) => handleInputChangeUser(e, 'cep')}
                                                    />
                                                </div>
                                                <div>
                                                    <Label>Logradouro</Label>
                                                    <Input
                                                        disabled={!isEditing}
                                                        value={atualizarUser?.street || ''}
                                                        onChange={(e) => handleInputChangeUser(e, 'street')}
                                                    />
                                                </div>
                                                <div>
                                                    <Label>Nº</Label>
                                                    <Input
                                                        disabled={!isEditing}
                                                        value={atualizarUser?.number || ''}
                                                        onChange={(e) => handleInputChangeUser(e, 'number')}
                                                    />
                                                </div>
                                                <div>
                                                    <Label>Complemento</Label>
                                                    <Input
                                                        disabled
                                                        value={atualizarUser?.complement || ''}
                                                        onChange={(e) => handleInputChangeUser(e, 'complement')}
                                                    />
                                                </div>
                                                <div>
                                                    <Label>Bairro</Label>
                                                    <Input
                                                        disabled={!isEditing}
                                                        value={atualizarUser?.neighborhood || ''}
                                                        onChange={(e) => handleInputChangeUser(e, 'neighborhood')}
                                                    />
                                                </div>
                                                <div>
                                                    <Label>Cidade</Label>
                                                    <Input
                                                        disabled
                                                        value={atualizarUser?.city || ''}
                                                        onChange={(e) => handleInputChangeUser(e, 'city')}
                                                    />
                                                </div>
                                                <div>
                                                    <Label>UF</Label>
                                                    <Input
                                                        disabled
                                                        value={atualizarUser?.uf || ''}
                                                        onChange={(e) => handleInputChangeUser(e, 'uf')}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="taxa">
                                        <div>
                                            <h2 className="text-lg font-semibold mb-2 mt-10">Taxas:</h2>
                                            <div className="grid grid-cols-2 gap-4">
                                                {/* Informações da Taxa */}
                                                <div>
                                                    <Label>Tipo Taxa</Label>
                                                    <Input disabled value={dadosAlterados?.typeFee || ''} />
                                                </div>
                                                <div>
                                                    <Label>Valor Taxa</Label>
                                                    <Input disabled value={dadosAlterados?.valueFee || ''} />
                                                </div>
                                                <div>
                                                    <Label>Tipo Parceiro</Label>
                                                    <Input
                                                        disabled={!isEditing}
                                                        value={dadosAlterados?.partnerTypeFee || ''}
                                                    />
                                                </div>
                                                <div>
                                                    <Label>Taxa Parceiro</Label>
                                                    <Input disabled value={dadosAlterados?.partnerValueFee || ''} />
                                                </div>
                                                <div>
                                                    <Label>Taxa Total</Label>
                                                    <Input disabled value={dadosAlterados?.totalFee || ''} />
                                                </div>
                                                <div>
                                                    <Label>Status</Label>
                                                    <Input disabled value={dadosAlterados?.status || ''} />
                                                </div>
                                            </div>
                                        </div>
                                    </TabsContent>
                                    <TabsContent value="credenciais">
                                        <div className="grid grid-cols-2 gap-4 mt-10">
                                            <div>
                                                <form onSubmit={SolicitarCredenciais}>

                                                    <h1 className="font-bold">Solicitar Credenciais</h1>
                                                    <div className='mt-4 mb-4'>
                                                        <Label>Endereço de IP:</Label>
                                                        <Input
                                                            type="text"
                                                            placeholder='127.0.0.1'
                                                            id="credenciais"
                                                            name="credenciais"
                                                            value={ipCredenciais}
                                                            onChange={(e) => setIpCredenciais(e.target.value)}
                                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                                                        />
                                                    </div>
                                                    <div>
                                                        <Button type="submit" className="bg-pink-900 text-white px-4 py-2 rounded-md shadow-sm ">
                                                            Solicitar
                                                        </Button>
                                                    </div>
                                                </form>

                                                <form onSubmit={Addip} className="space-y-4">
                                                    <h1 className='font-bold mt-4'>Adicionar ou Remover  endereço de IP</h1>
                                                    {obterDadosUser && obterDadosUser.master === 'S' && (
                                                        <div>
                                                            <Label htmlFor="companyId">Id da Empresa</Label>
                                                            <Input
                                                                type="text"
                                                                placeholder='1'
                                                                id="companyId"
                                                                name="companyId"
                                                                value={ip.companyId}
                                                                onChange={handleInputAddChange}
                                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                                                            />
                                                        </div>
                                                    )}
                                                    <div>
                                                        <Label htmlFor="ip">Endereço de IP</Label>
                                                        <Input
                                                            type="text"
                                                            placeholder='127.0.0.1'
                                                            id="ip"
                                                            name="ip"
                                                            value={ip.ip}
                                                            onChange={handleInputAddChange}
                                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                                                        />
                                                    </div>
                                                    <div className="flex space-x-4">
                                                        <Button type="submit" className="bg-pink-900 text-white px-4 py-2 rounded-md shadow-sm">
                                                            Adicionar
                                                        </Button>
                                                        <Button type="button" onClick={handleRemoveIp} className="bg-red-600 text-white px-4 py-2 rounded-md shadow-sm">
                                                            Remover
                                                        </Button>
                                                    </div>
                                                </form>

                                            </div>
                                            <div className="space-y-4">
                                                <h1 className='font-bold'>Credenciais</h1>
                                                <div>
                                                    <Label>Username:</Label>
                                                    <Input
                                                        type="text"
                                                        value={dadosCredenciais?.username || ''}
                                                        readOnly
                                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                                                    />
                                                </div>
                                                <div>
                                                    <Label>Password:</Label>
                                                    <Input
                                                        type="text"
                                                        value={dadosCredenciais?.password || ''}
                                                        readOnly
                                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                                                    />
                                                </div>
                                                <div className="overflow-x-auto">
                                                    <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-sm">
                                                        <thead>
                                                            <tr className="bg-gray-200">
                                                                <th className="px-4 py-2 text-left">IP Address</th>
                                                                <th className="px-4 py-2 text-left">Actions</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {dadosCredenciais?.ips.map((ip, index) => (
                                                                <tr key={index} className="border-t border-gray-300">
                                                                    <td className="px-4 py-2">{ip}</td>
                                                                    <td className="px-4 py-2">
                                                                        <Button

                                                                            onClick={() => removeIp(ip)}
                                                                            className="text-white bg-red-600 h-8"
                                                                        >
                                                                            -
                                                                        </Button>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </TabsContent>

                                </Tabs>
                            )}
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
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="">
                                    <div className='flex items-center gap-2'>
                                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-pink-100 sm:mx-0 sm:h-10 sm:w-10">
                                            <IconLock className="h-6 w-6 text-pink-600" aria-hidden="true" />
                                        </div>
                                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                            Atualização de senha
                                        </h3>
                                    </div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <div className="mt-5">
                                            <div className="flex flex-col gap-2">
                                                <div>
                                                    <Label>Senha atual</Label>
                                                    <Input
                                                        type="password"
                                                        value={alterarSenha.oldPassword}
                                                        onChange={(e) => setAlterarSenha({ ...alterarSenha, oldPassword: e.target.value })}
                                                        placeholder="Digite sua senha atual"
                                                    />
                                                </div>
                                                <div>
                                                    <Label>Nova senha</Label>
                                                    <Input
                                                        type="password"
                                                        value={alterarSenha.newPassword}
                                                        onChange={(e) => setAlterarSenha({ ...alterarSenha, newPassword: e.target.value })}
                                                        placeholder="Digite sua nova senha"
                                                    />
                                                </div>
                                                <div>
                                                    <Label>Confirme sua senha</Label>
                                                    <Input
                                                        type="password"
                                                        value={alterarSenha.confirmPassword}
                                                        onChange={(e) => setAlterarSenha({ ...alterarSenha, confirmPassword: e.target.value })}
                                                        placeholder="Confirme sua nova senha"
                                                    />
                                                </div>
                                            </div>
                                            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <Button onClick={handleUpdatePassword} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-pink-900 text-base font-medium text-white hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-100 sm:ml-3 sm:w-auto sm:text-sm">
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