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

export default function Profile() {
    const [dadosEmpresa, setDadosEmpresa] = useState<Empresa | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchDadosEmpresa = useCallback(async () => {
        setIsLoading(true);
        const token = localStorage.getItem('token') || '';
        try {
            const data = await ObterDadosEmpresa(token);
            setDadosEmpresa(data[0]); // Assumindo que a API retorna um array com um único objeto Empresa
            console.log(data);
        } catch (error) {
            console.error('Erro ao chamar dados da empresa:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchDadosEmpresa();
    }, [fetchDadosEmpresa]);

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1" style={{ width: 'calc(100% - 300px)' }}>
                <div className="flex-col">
                    <Header titulo="Configurações" />
                    <div className="p-8">
                        <Card className="rounded-xl p-5 h-full gap-4 ">
                            <div className='flex justify-between '>
                                <h1>Informações Cadastrais</h1>
                                <div className='flex gap-3 '>
                                    <Button className='bg-zinc-700'>Salvar</Button>
                                    <Button className='bg-red-600'>Cancelar</Button>
                                    <Button variant="secondary" className='flex items-center border  rounded-md Button '>
                                        <IconEdit />
                                        Editar
                                    </Button>
                                </div>
                            </div>

                            {/* Renderizar os dados da empresa se existirem */}
                            {isLoading && <p>Carregando...</p>}

                            {dadosEmpresa && (
                                <div className=''>
                                    <h1>Empresa:</h1>
                                    <div className='flex gap-4 mb-5 flex-1'>
                                        <div className='flex-1'>
                                            <Label>E-mail</Label>
                                            <Input
                                                disabled
                                                value={dadosEmpresa.email || ''}
                                            />
                                        </div>
                                        <div className='flex-1'>
                                            <Label>IE</Label>
                                            <Input
                                                disabled
                                                value={dadosEmpresa.ie || ''}
                                            />
                                        </div>
                                        <div className='flex-1'>
                                            <Label>IM</Label>
                                            <Input
                                                disabled
                                                value={dadosEmpresa.im || ''}
                                            />
                                        </div>
                                        <div className='flex-1'>
                                            <Label>Telefone</Label>
                                            <Input
                                                disabled
                                                value={dadosEmpresa.phone}
                                            />
                                        </div>
                                        <div className='flex-1'>
                                            <Label>Site</Label>
                                            <Input
                                                disabled
                                                value={dadosEmpresa.site || ''}
                                            />
                                        </div>
                                    </div>

                                    <div className=''>
                                        <h1>Endereço:</h1>
                                    </div>

                                    <div className='flex gap-4 mb-5'>
                                        <div className='flex-1'>
                                            <Label>Logradouro</Label>
                                            <Input
                                                disabled
                                                value={dadosEmpresa.street}
                                            />
                                        </div>
                                        <div className='flex-1'>
                                            <Label>Nº</Label>
                                            <Input
                                                disabled
                                                value={dadosEmpresa.number}
                                            />
                                        </div>
                                        <div className='flex-1'>
                                            <Label>Complemento</Label>
                                            <Input
                                                disabled
                                                value={dadosEmpresa.complement}
                                            />
                                        </div>
                                        <div className='flex-1'>
                                            <Label>Bairro</Label>
                                            <Input
                                                disabled
                                                value={dadosEmpresa.neighborhood}
                                            />
                                        </div>
                                    </div>

                                    <div className='flex gap-4 mb-5'>
                                        <div className='flex-1'>
                                            <Label>Cidade</Label>
                                            <Input
                                                disabled
                                                value={dadosEmpresa.city}
                                            />
                                        </div>
                                        <div className='flex-1'>
                                            <Label>UF</Label>
                                            <Input
                                                disabled
                                                value={dadosEmpresa.uf}
                                            />
                                        </div>
                                        <div className='flex-1'>
                                            <Label>CEP</Label>
                                            <Input
                                                disabled
                                                value={dadosEmpresa.cep}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};
