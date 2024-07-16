import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableHeader, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Card } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { listPixOutByCompany, PixOutSearchParams, TransacaoOut } from '@/api/listarPixOut';
import Link from 'next/link';

export default function UltimasPixOut() {
    const [transacoes, setTransacoes] = useState<TransacaoOut['items']>([]);
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
                const data: TransacaoOut = await listPixOutByCompany(params, token);
                // Ordenar as transações pela data de solicitação de forma descendente
                data.items.sort((a, b) => 
                    new Date(b.solicitacao).getTime() - new Date(a.solicitacao).getTime()
                );
                setTransacoes(data.items);
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
                                <TableCell>{transacao.idTrasacao || 'N/A'}</TableCell>
                                <TableCell>{transacao.chave || 'N/A'}</TableCell>
                                <TableCell>{transacao.solicitacao || 'N/A'}</TableCell>
                                <TableCell>{transacao.descricao || 'N/A'}</TableCell>
                                <TableCell>{transacao.pagador?.nome || 'N/A'}</TableCell>
                                <TableCell>{transacao.pagador?.cpf || 'N/A'}</TableCell>
                                <TableCell>{`R$ ${(transacao.valor?.original ?? 0).toFixed(2)}`}</TableCell>
                                <TableCell>{transacao.endToEndId || 'N/A'}</TableCell>
                                <TableCell>{transacao.status || 'N/A'}</TableCell>
                                <TableCell>{transacao.recebedor?.nome || 'N/A'}</TableCell>
                                <TableCell>{transacao.recebedor?.documento || 'N/A'}</TableCell>
                                <TableCell>{transacao.recebedor?.data || 'N/A'}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </Card>
    );
}
