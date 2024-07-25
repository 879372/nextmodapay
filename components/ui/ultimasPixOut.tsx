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
    const [paginaAtual, setPaginaAtual] = useState<number>(0);
    const [itensPorPagina, setItensPorPagina] = useState<number>(10);
    const [semTransacoes, setSemTransacoes] = useState<boolean>(false); 

    useEffect(() => {
        const getFirstAndLastDayOfMonth = () => {
            const now = new Date();
            const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
            const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
            return {
                firstDay: firstDay.toISOString().split('T')[0],
                lastDay: lastDay.toISOString().split('T')[0],
            };
        };

        const fetchTransacoes = async () => {
            const token = localStorage.getItem('token') || '';
            const { firstDay, lastDay } = getFirstAndLastDayOfMonth();
            setFiltroInicio(firstDay);
            setFiltroFim(lastDay);

            const params: PixOutSearchParams = {
                inicio: firstDay,
                fim: lastDay,
                status: 'executed',
                paginaAtual,
                itensPorPagina
            };

            try {
                const data = await listPixOutByCompany(params, token);
                const sortedData = data.items.sort((a, b) => new Date(b.solicitacao).getTime() - new Date(a.solicitacao).getTime());
                setTransacoes(sortedData);
                setSemTransacoes(sortedData.length === 0);
            } catch (error) {
                console.error('Erro ao buscar transações:', error);
            }
        };

        fetchTransacoes();
    }, []); 

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
                            <TableHead className=''>Id Transação</TableHead>
                            <TableHead className=''>EndToEndId</TableHead>
                            <TableHead className=''>Chave</TableHead>
                            <TableHead className=''>Solicitação</TableHead>
                            <TableHead className=''>Descrição</TableHead>
                            <TableHead className=''>Valor Solicitado</TableHead>
                            <TableHead className=''>Pagador</TableHead>
                            <TableHead className=''>CPF Pagador</TableHead>
                            <TableHead className=''>Status</TableHead>
                            <TableHead className=''>Recebedor</TableHead>
                            <TableHead className=''>CPF Recebedor</TableHead>
                            <TableHead className=''>Data Recebimento</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {semTransacoes ? (
                            <TableRow>
                                <TableCell colSpan={12} className="text-center">Ainda não houve transações esse mês</TableCell>
                            </TableRow>
                        ) : (
                            transacoes.map((transacao, index) => (
                                <TableRow key={index}>
                                    <TableCell>{transacao.idTrasacao || '-'}</TableCell>
                                    <TableCell>{transacao.endToEndId || '-'}</TableCell>
                                    <TableCell>{transacao.chave || '-'}</TableCell>
                                    <TableCell>{transacao.solicitacao ? new Date(transacao.solicitacao).toLocaleDateString() : '-'}</TableCell>
                                    <TableCell>{transacao.descricao || '-'}</TableCell>
                                    <TableCell className='text-right'>{`R$ ${transacao.valor.original ? parseFloat(String(transacao.valor.original)).toFixed(2) : '-'}`}</TableCell>
                                    <TableCell>{transacao.pagador.nome || '-'}</TableCell>
                                    <TableCell>{transacao.pagador.cpf || '-'}</TableCell>
                                    <TableCell>
                                        {transacao.status === 'executed' ? (
                                            <span className='text-green-500'>{transacao.status}</span>
                                        ) : transacao.status === 'CANCELADA' ? (
                                            <span className='text-red-500'>{transacao.status}</span>
                                        ) : (
                                            transacao.status 
                                        )}
                                    </TableCell>
                                    <TableCell>{transacao.recebedor.nome || '-'}</TableCell>
                                    <TableCell>{transacao.recebedor.documento || '-'}</TableCell>
                                    <TableCell>{transacao.recebedor.data ? new Date(transacao.recebedor.data).toLocaleDateString() : '-'}</TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </Card>
    );
}
