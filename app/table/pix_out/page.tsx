'use client'
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableHeader, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Card } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import Sidebar from '@/components/ui/sidebar';
import Header from '@/components/ui/hearder';
import { listPixInByCompany } from '@/api/listarPixOut';



interface Transacao {
    idTrasacao: string;
    chave: string;
    descricao: string;
    solicitacao: string;
    pagador: {
        cpf: string;
        nome: string;
    };
    valor: {
        original: number;
    };
    endToEndId: string;
    comprovante: string;
    status: string;
    recebedor: {
        documento: string;
        nome: string;
        data: string;
    };
}

interface PixInSearchParams {
    inicio?: string;
    fim?: string;
    paginaAtual?: number;
    itensPorPagina?: number;
}

const ExampleComponent = () => {
    const [transacoes, setTransacoes] = useState<Transacao[]>([]);

    useEffect(() => {
        const fetchTransacoes = async () => {
            const token = localStorage.getItem('token') || ''; 
            const params: PixInSearchParams = {
                // inicio: '2024-01-26',
                // fim: '2024-01-26',
                // paginaAtual: 1,
                // itensPorPagina: 10
            };
            try {
                const data = await listPixInByCompany(params, token);
                setTransacoes(data); 
                console.log(data)
            } catch (error) {
                console.error('Erro ao buscar transações:', error);
            }
        };

        fetchTransacoes(); 
    }, []);

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex flex-col w-screen"> 
                <Header titulo="PIX OUT" />
                <div>
                <Card className="rounded-xl m-14">
                    Transações Pix Out
                    <ScrollArea className=" h-lvh flex-1">
                        <Table style={{ maxWidth: 'calc(100% - 32px)' }}>
                            <TableHeader>
                                <TableRow>
                                    {/* Cabeçalhos da tabela */}
                                    <TableHead>Id Transação</TableHead>
                                    <TableHead>Chave</TableHead>
                                    <TableHead>Solicitação</TableHead>
                                    <TableHead>Descrição</TableHead>
                                    <TableHead>Pagador</TableHead>
                                    <TableHead>CPF Pagador</TableHead>
                                    <TableHead>Valor Solicitado</TableHead>
                                    <TableHead>EndtoEndId</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Recebedor</TableHead>
                                    <TableHead>CPF Recebedor</TableHead>
                                    <TableHead>Data</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {transacoes.map((transacao, index) => (
                                    <TableRow key={index}>
                                        {/* Células da tabela */}
                                        <TableCell>{transacao.idTrasacao}</TableCell>
                                        <TableCell>{transacao.chave}</TableCell>
                                        <TableCell>{transacao.solicitacao}</TableCell>
                                        <TableCell>{transacao.descricao}</TableCell>
                                        <TableCell>{transacao.pagador.nome}</TableCell>
                                        <TableCell className="text-right">{`R$ ${transacao.pagador.cpf}`}</TableCell>
                                        <TableCell>{transacao.valor.original}</TableCell>
                                        <TableCell>{transacao.endToEndId}</TableCell>
                                        <TableCell>{transacao.status}</TableCell>
                                        <TableCell>{transacao.recebedor.nome}</TableCell>
                                        <TableCell>{transacao.recebedor.documento}</TableCell>
                                        <TableCell>{transacao.recebedor.data}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                </Card>
                </div>
            </div>
        </div>
    );
};

export default ExampleComponent;
