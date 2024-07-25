import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableHeader, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Card } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { listPixInByCompany, PixInSearchParams, TransacaoIn } from '@/api/listarPixIn';
import Link from 'next/link';

export default function UltimasPixIn() {
    const [transacoes, setTransacoes] = useState<TransacaoIn['items']>([]);
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

            const params: PixInSearchParams = {
                inicio: firstDay,
                fim: lastDay,
                status: 'CONCLUIDO',
                paginaAtual,
                itensPorPagina
            };

            try {
                const data = await listPixInByCompany(params, token);
                const sortedData = data.items.sort((a, b) => new Date(b.calendario.criacao).getTime() - new Date(a.calendario.criacao).getTime());
                setTransacoes(sortedData);
                setSemTransacoes(sortedData.length === 0);
            } catch (error) {
                console.error('Erro ao buscar transações:', error);
            }
        };

        fetchTransacoes();
    }, []); 

    return (
        <Card className="flex-1 rounded-xl h-96 p-5 pb-14 ml-6 mr-6 mt-5">
            <div className='flex justify-between items-center'>
                <h1 className='p-2 font-semibold'>Últimas transações Pix In</h1>
                <Link href="/table/pix_in" className='p-2 font-semibold text-sm text-[#11CE8A] hover:bg-slate-100 rounded-md'>Ver todos</Link>
            </div>
            <ScrollArea className="h-full whitespace-nowrap pb-5 relative">
                <Table>
                    <TableHeader className='sticky top-0 z-10'>
                        <TableRow>
                            <TableHead className=''>Txid</TableHead>
                            <TableHead className=''>EndToEndId</TableHead>
                            <TableHead className=''>Descrição</TableHead>
                            <TableHead className=''>Devedor</TableHead>
                            <TableHead className=''>CPF Devedor</TableHead>
                            <TableHead className=''>Valor Solicitado</TableHead>
                            <TableHead className=''>Valor Pago</TableHead>
                            <TableHead className=''>Status</TableHead>
                            <TableHead className=''>Pagador</TableHead>
                            <TableHead className=''>Data Pagamento</TableHead>
                            <TableHead className=''>CPF Pagador</TableHead>
                            <TableHead className=''>Valor Devolvido</TableHead>
                            <TableHead className=''>Id Devolução</TableHead>
                            <TableHead className=''>Status Devolução</TableHead>
                            <TableHead className=''>Data Devolução</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {semTransacoes ? (
                            <TableRow>
                                <TableCell colSpan={15} className="text-center">Ainda não houve transações esse mês</TableCell>
                            </TableRow>
                        ) : (
                            transacoes.map((transacao, index) => (
                                <TableRow key={transacao.txid}>
                                    <TableCell>{transacao.txid || '-'}</TableCell>
                                    <TableCell>{transacao.endToEndId || '-'}</TableCell>
                                    <TableCell>{transacao.descricao || '-'}</TableCell>
                                    <TableCell>{transacao.devedor.nome || '-'}</TableCell>
                                    <TableCell>{transacao.devedor.cpf || '-'}</TableCell>
                                    <TableCell className='text-right'>{`R$ ${transacao.valor.original ? parseFloat(String(transacao.valor.original)).toFixed(2) : '-'}`}</TableCell>
                                    <TableCell className='text-right'>{`R$ ${transacao.pagador.valor ? parseFloat(String(transacao.pagador.valor)).toFixed(2) : '-'}`}</TableCell>
                                    <TableCell>{
                                        (transacao.status === 'CONCLUIDA' ? <span className='text-green-500'>{transacao.status}</span> :
                                            (transacao.status === 'CANCELADO' ? <span className='text-red-500'>{transacao.status}</span> :
                                                transacao.status)
                                        )}</TableCell>
                                    <TableCell>{transacao.pagador.nome || '-'}</TableCell>
                                    <TableCell>{transacao.pagador.data ? new Date(transacao.pagador.data).toLocaleDateString() : '-'}</TableCell>
                                    <TableCell>{transacao.pagador.cpf || '-'}</TableCell>
                                    <TableCell className='text-right'>{`R$ ${transacao.devolucao.valor ? parseFloat(String(transacao.devolucao.valor)).toFixed(2) : '-'}`}</TableCell>
                                    <TableCell>{transacao.devolucao.id || '-'}</TableCell>
                                    <TableCell>{transacao.devolucao.status || '-'}</TableCell>
                                    <TableCell>{transacao.devolucao.data ? new Date(transacao.devolucao.data).toLocaleDateString() : '-'}</TableCell>
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
