'use client'
import React, { useState, useEffect, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import Sidebar from '@/components/ui/sidebar';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { IconEdit, IconLock } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import ObterDadosEmpresa, { Empresa } from '@/api/obterEmpresa';
import AtualizarDadosEmpresa from '@/api/atualizarDadosEmpresa';
import AtualizarSenhaAdm, { Atualizarsenha } from '@/api/atualizarSenha';
import Auth from '../auth/auth';
import Header from '@/components/ui/hearder';

export default function Profile() {
    Auth();

    const [isOpen, setIsOpen] = useState(true);
    const [modalOpen, setModalOpen] = useState(false); 
    const [dadosEmpresa, setDadosEmpresa] = useState<Empresa | null>(null);
    const [dadosAlterados, setDadosAlterados] = useState<Empresa | null>(null);
    const [alterarSenha, setAlterarSenha] = useState<Atualizarsenha>({ oldPassword: '', newPassword: '', confirmPassword: '' });
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isSmallScreen, setIsSmallScreen] = useState(false); 
  
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

    return (
        <div className="flex">
            <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
            <div className={`flex-1 transition-margin duration-300 ease-in-out ${isSmallScreen ? 'ml-0' : (isOpen ? 'ml-64' : 'ml-0')}`} style={{ width: isOpen ? 'calc(100% - 256px)' : '100%' }}>
            <Header titulo="Configurações" isOpen={isOpen} toggleSidebar={toggleSidebar} />
            <div className="flex-col mt-20">
                    <div className="p-8">
                        <Card className="rounded-xl p-5">
                            <div className="flex justify-between mb-4">
                                <h1 className="text-xl font-bold">Informações Cadastrais</h1>
                                <div className="flex gap-3">
                                    {isEditing ? (
                                        <>
                                            <Button onClick={handleSaveClick} className="bg-zinc-700">
                                                Salvar
                                            </Button>
                                            <Button onClick={handleCancelClick} className="bg-red-600">
                                                Cancelar
                                            </Button>
                                        </>
                                    ) : (
                                        <div className='flex flex-wrap gap-2 justify-end'>
                                        <div className='relative '>
                                            <Button onClick={handleEditClick} className="bg-pink-900  pl-8">
                                                Editar
                                            </Button>
                                            <IconEdit className="absolute left-1 top-1/2 transform -translate-y-1/2 text-white" />
                                        </div>
                                        <div className='relative'>
                                            <Button onClick={() => setModalOpen(true)} className=" bg-pink-900   pl-8">
                                                Atualizar senha
                                            </Button>
                                            <IconLock className="absolute left-1 top-1/2 transform -translate-y-1/2 text-white" />
                                        </div>
                                    </div>
                                    )}
                                </div>
                            </div>

                            {isLoading ? (
                                <p>Carregando...</p>
                            ) : (
                                <>
                                    {dadosEmpresa && (
                                        <div>
                                            <div className="mb-6">
                                                <h2 className="text-lg font-semibold mb-2">Empresa:</h2>
                                                <div className="grid grid-cols-3 gap-3">
                                                    <div>
                                                        <Label>Nome</Label>
                                                        <Input disabled value={dadosAlterados?.name || ''} />
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
                                                    <div>
                                                        <Label>CEP</Label>
                                                        <Input
                                                            disabled={!isEditing}
                                                            value={dadosAlterados?.cep || ''}
                                                            onChange={(e) => handleInputChange(e, 'cep')}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <h2 className="text-lg font-semibold mb-2 mt-5">Taxas:</h2>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <Label>typeFee</Label>
                                                        <Input disabled value={dadosAlterados?.typeFee || ''} />
                                                    </div>
                                                    <div>
                                                        <Label>valueFee</Label>
                                                        <Input disabled value={dadosAlterados?.valueFee || ''} />
                                                    </div>
                                                    <div>
                                                        <Label>partnerTypeFee</Label>
                                                        <Input disabled value={dadosAlterados?.partnerTypeFee || ''} />
                                                    </div>
                                                    <div>
                                                        <Label>partnerValueFee</Label>
                                                        <Input disabled value={dadosAlterados?.partnerValueFee || ''} />
                                                    </div>
                                                    <div>
                                                        <Label>totalFee</Label>
                                                        <Input disabled value={dadosAlterados?.totalFee || ''} />
                                                    </div>
                                                    <div>
                                                        <Label>status</Label>
                                                        <Input disabled value={dadosAlterados?.status || ''} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </Card>
                    </div>
                </div>
            </div>

            {/* Modal para atualização de senha */}
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
