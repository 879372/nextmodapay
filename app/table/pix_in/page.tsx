'use client'
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableHeader, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Card } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import Sidebar from '@/components/ui/sidebar';
import Header from '@/components/ui/hearder';
import { listPixInByCompany } from '@/api/listarPixIn';

interface Transacao {
    chave: string;
    descricao: string;
    calendario: {
        criacao: string;
        expiracao: number;
    };
    devedor: {
        cpf: string;
        nome: string;
    };
    valor: {
        original: number;
    };
    txid: string;
    endToEndId: string;
    tipo: string;
    status: string;
    pagador: {
        cpf: string;
        nome: string;
        valor: number;
        data: string;
    };
    devolucao: {
        id: string;
        valor: number;
        status: string;
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
            //const token = localStorage.getItem('token') || ''; 
            const params: PixInSearchParams = {
                paginaAtual: 1,
                itensPorPagina: 10
            };
            try {
                const data = await listPixInByCompany(params);
                setTransacoes(data); 
                console.log(data)
            } catch (error) {
                console.error('Erro ao buscar transações:', error);
            }
        };

        fetchTransacoes(); 
    }, []);

    return (
        <div className="flex w-full">
            <Sidebar />
            <div className="flex flex-col w-full ">
                <Header titulo="Pix In" />
                <Card className="flex-1 rounded-xl p-5 w-lvw mt-12 ml-8 h-full">
                    Transações Pix In
                    <ScrollArea className=" h-64 ">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    {/* Cabeçalhos da tabela */}
                                    <TableHead>Chave</TableHead>
                                    <TableHead>Descrição</TableHead>
                                    <TableHead>Data Criação</TableHead>
                                    <TableHead>Devedor</TableHead>
                                    <TableHead>CPF Devedor</TableHead>
                                    <TableHead>Valor Solicitado</TableHead>
                                    <TableHead>Txid</TableHead>
                                    <TableHead>EndToEndId</TableHead>
                                    <TableHead>Tipo</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Pagador</TableHead>
                                    <TableHead>CPF Pagador</TableHead>
                                    <TableHead>Valor Pago</TableHead>
                                    <TableHead>Data Pagamento</TableHead>
                                    <TableHead>Id Devolução</TableHead>
                                    <TableHead>Valor Devolvido</TableHead>
                                    <TableHead>Status Devolução</TableHead>
                                    <TableHead>Data Devolução</TableHead>
                                    <TableHead className="text-right">Valor</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {transacoes.map((transacao, index) => (
                                    <TableRow key={index}>
                                        {/* Células da tabela */}
                                        <TableCell className="font-medium">{transacao.chave}</TableCell>
                                        <TableCell>{transacao.descricao}</TableCell>
                                        <TableCell>{transacao.calendario.criacao}</TableCell>
                                        <TableCell>{transacao.devedor.nome}</TableCell>
                                        <TableCell>{transacao.devedor.cpf}</TableCell>
                                        <TableCell className="text-right">{`R$ ${transacao.valor.original}`}</TableCell>
                                        <TableCell>{transacao.txid}</TableCell>
                                        <TableCell>{transacao.endToEndId}</TableCell>
                                        <TableCell>{transacao.tipo}</TableCell>
                                        <TableCell>{transacao.status}</TableCell>
                                        <TableCell>{transacao.pagador.nome}</TableCell>
                                        <TableCell>{transacao.pagador.cpf}</TableCell>
                                        <TableCell>{transacao.pagador.valor}</TableCell>
                                        <TableCell>{transacao.pagador.data}</TableCell>
                                        <TableCell>{transacao.devolucao.id}</TableCell>
                                        <TableCell>{transacao.devolucao.valor}</TableCell>
                                        <TableCell>{transacao.devolucao.status}</TableCell>
                                        <TableCell>{transacao.devolucao.data}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                </Card>
            </div>
        </div>
    );
};

export default ExampleComponent;
