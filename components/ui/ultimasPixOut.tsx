import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableHeader, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Card } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { listPixOutByCompany, PixOutSearchParams, TransacaoOut } from '@/api/listarPixOut';
import Link from 'next/link';

export default function UltimasPixOut() {
    const [transacoes, setTransacoes] = useState<TransacaoOut[]>([]);
    const [filtroInicio, setFiltroInicio] = useState<string>('');
    const [filtroFim, setFiltroFim] = useState<string>('');

    useEffect(() => {
        const fetchTransacoes = async () => {
            const token = localStorage.getItem('token') || '';
            const params: PixOutSearchParams = {
                inicio: filtroInicio,
                fim: filtroFim,
                status: 'executed',
            };
            try {
                const data = await listPixOutByCompany(params, token);
                // Ordenar as transações pela data de criação de forma descendente
                data.sort((a, b) => new Date(b.solicitacao).getTime() - new Date(a.solicitacao).getTime());
                setTransacoes(data);
            } catch (error) {
                console.error('Erro ao buscar transações:', error);
            }
        };

        fetchTransacoes();
    }, [filtroInicio, filtroFim]);

    return (
        <Card className="flex-1 rounded-xl h-96 p-5 pb-14 ml-6 mr-6 mt-5 mb-6">
            <div className='flex justify-between items-center'>
                <h1 className='p-2 font-semibold'>Últimas transações Pix Out</h1>
                <Link href="/table/pix_in" className='p-2  font-semibold text-sm text-[#FD0000]  hover:bg-slate-100 rounded-md'>Ver todos</Link>
            </div>
            <ScrollArea className="h-full whitespace-nowrap pb-5">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className='text-center'>Id Transação</TableHead>
                            <TableHead className='text-center'>Chave</TableHead>
                            <TableHead className='text-center'>Solicitação</TableHead>
                            <TableHead className='text-center'>Descrição</TableHead>
                            <TableHead className='text-center'>Pagador</TableHead>
                            <TableHead className='text-center'>CPF Pagador</TableHead>
                            <TableHead className='text-center'>Valor Solicitado</TableHead>
                            <TableHead className='text-center'>EndtoEndId</TableHead>
                            <TableHead className='text-center'>Status</TableHead>
                            <TableHead className='text-center'>Recebedor</TableHead>
                            <TableHead className='text-center'>CPF Recebedor</TableHead>
                            <TableHead className='text-center'>Data</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {transacoes.map((transacao, index) => (
                            <TableRow key={index} className='text-center'>
                                <TableCell>{transacao.idTrasacao}</TableCell>
                                <TableCell>{transacao.chave}</TableCell>
                                <TableCell>{transacao.solicitacao}</TableCell>
                                <TableCell>{transacao.descricao}</TableCell>
                                <TableCell>{transacao.pagador.nome}</TableCell>
                                <TableCell>{transacao.pagador.cpf}</TableCell>
                                <TableCell>{`R$ ${transacao.valor.original.toFixed(2)}`}</TableCell>
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

    );
}
