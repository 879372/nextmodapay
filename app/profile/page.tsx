'use client'
import React, { useState, useEffect, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import Sidebar from '@/components/ui/sidebar';
import Header from '@/components/ui/hearder';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { IconEdit } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import ObterDadosEmpresa, { Empresa } from '@/api/obterEmpresa';
import AtualizarDadosEmpresa from '@/api/atualizarDadosEmpresa';
import { useRouter } from 'next/navigation';
import Auth from '../auth/auth';

export default function Profile() {
    Auth()
    const [dadosEmpresa, setDadosEmpresa] = useState<Empresa | null>(null);
    const [dadosAlterados, setDadosAlterados] = useState<Empresa | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchDadosEmpresa = useCallback(async () => {
        setIsLoading(true);
        const token = localStorage.getItem('token') || '';
        try {
            const data = await ObterDadosEmpresa(token);
            setDadosEmpresa(data);
            setDadosAlterados(data); // Inicialmente, os dados alterados são iguais aos dados da empresa
        } catch (error) {
            console.error('Erro ao chamar dados da empresa:', error);
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
        // Reverter os dados alterados para os dados originais
        setDadosAlterados(dadosEmpresa);
    };

    const handleSaveClick = async () => {
        const token = localStorage.getItem('token') || '';
        if (dadosAlterados) {
            try {
                await AtualizarDadosEmpresa(dadosAlterados, token);
                setDadosEmpresa(dadosAlterados); // Atualizar os dados da empresa com os dados alterados
                setIsEditing(false);
            } catch (error) {
                console.error('Erro ao atualizar dados da empresa:', error);
            }
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, key: keyof Empresa) => {
        if (dadosAlterados) {
            setDadosAlterados({
                ...dadosAlterados,
                [key]: e.target.value
            });
        }
    };

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1" style={{ width: 'calc(100% - 300px)' }}>
                <div className="flex-col">
                    <Header titulo="Configurações" />
                    <div className="p-8">
                        <Card className="rounded-xl p-5">
                            <div className='flex justify-between mb-4'>
                                <h1 className='text-xl font-bold'>Informações Cadastrais</h1>
                                <div className='flex gap-3'>
                                    {isEditing ? (
                                        <>
                                            <Button onClick={handleSaveClick} className='bg-zinc-700'>Salvar</Button>
                                            <Button onClick={handleCancelClick} className='bg-red-600'>Cancelar</Button>
                                        </>
                                    ) : (
                                        <Button onClick={handleEditClick} variant="secondary" className='flex items-center border rounded-md Button'>
                                            <IconEdit className='mr-1' />
                                            Editar
                                        </Button>
                                    )}
                                </div>
                            </div>

                            {isLoading ? (
                                <p>Carregando...</p>
                            ) : (
                                <>
                                    {dadosEmpresa && (
                                        <div>
                                            <div className='mb-6'>
                                                <h2 className='text-lg font-semibold mb-2'>Empresa:</h2>
                                                <div className='grid grid-cols-3 gap-3'>
                                                    <div>
                                                        <Label>Nome</Label>
                                                        <Input
                                                            disabled
                                                            value={dadosAlterados?.name || ''}
                                                        />
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
                                                <h2 className='text-lg font-semibold mb-2'>Endereço:</h2>
                                                <div className='grid grid-cols-2 gap-4'>
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
                                                <h2 className='text-lg font-semibold mb-2 mt-5'>Taxas:</h2>
                                                <div className='grid grid-cols-2 gap-4'>
                                                    <div>
                                                        <Label>typeFee</Label>
                                                        <Input
                                                            disabled
                                                            value={dadosAlterados?.typeFee || ''}
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label>valueFee</Label>
                                                        <Input
                                                            disabled
                                                            value={dadosAlterados?.valueFee || ''}                                                        />
                                                    </div>
                                                    <div>
                                                        <Label>partnerTypeFee</Label>
                                                        <Input
                                                            disabled
                                                            value={dadosAlterados?.partnerTypeFee || ''}
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label>partnerValueFee</Label>
                                                        <Input
                                                            disabled
                                                            value={dadosAlterados?.partnerValueFee || ''}
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label>totalFee</Label>
                                                        <Input
                                                            disabled
                                                            value={dadosAlterados?.totalFee || ''}
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label>status</Label>
                                                        <Input
                                                            disabled
                                                            value={dadosAlterados?.status || ''}
                                                        />
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
        </div>
    );
}
