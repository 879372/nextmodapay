import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableHeader, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Card } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { listPixInByCompany, PixInSearchParams, TransacaoIn } from '@/api/listarPixIn';
import Link from 'next/link';

export default function UltimasPixIn() {
    const [transacoes, setTransacoes] = useState<TransacaoIn[]>([]);
    const [filtroInicio, setFiltroInicio] = useState<string>('');
    const [filtroFim, setFiltroFim] = useState<string>('');

    useEffect(() => {
        const fetchTransacoes = async () => {
            const token = localStorage.getItem('token') || '';
            const params: PixInSearchParams = {
                inicio: filtroInicio,
                fim: filtroFim,
                status: 'CONCLUIDO',
            };
            try {
                const data = await listPixInByCompany(params, token);
                // Ordenar as transações pela data de criação de forma descendente
                data.sort((a, b) => new Date(b.calendario.criacao).getTime() - new Date(a.calendario.criacao).getTime());
                setTransacoes(data);
            } catch (error) {
                console.error('Erro ao buscar transações:', error);
            }
        };

        fetchTransacoes();
    }, [filtroInicio, filtroFim]);

    return (

        <Card className="flex-1 rounded-xl h-96 p-5 pb-14 ml-6 mr-6 mt-5 ">
            <div className='flex justify-between items-center'>
                <h1 className='p-2  font-semibold'>Últimas transações Pix In</h1>
                <Link href="/table/pix_in" className='p-2  font-semibold text-sm text-[#11CE8A]  hover:bg-slate-100 rounded-md'>Ver todos</Link>
            </div>
            <ScrollArea className="h-full whitespace-nowrap pb-5 relative">
                <Table>
                    <TableHeader className=' sticky  top-0 z-10'>
                        <TableRow>
                            {/* Cabeçalhos da tabela */}
                            <TableHead className='text-center'>Chave</TableHead>
                            <TableHead className='text-center'>Descrição</TableHead>
                            <TableHead className='text-center'>Data Criação</TableHead>
                            <TableHead className='text-center'>Devedor</TableHead>
                            <TableHead className='text-center'>CPF Devedor</TableHead>
                            <TableHead className='text-center'>Valor Solicitado</TableHead>
                            <TableHead className='text-center'>Txid</TableHead>
                            <TableHead className='text-center'>EndToEndId</TableHead>
                            <TableHead className='text-center'>Tipo</TableHead>
                            <TableHead className='text-center'>Status</TableHead>
                            <TableHead className='text-center'>Pagador</TableHead>
                            <TableHead className='text-center'>CPF Pagador</TableHead>
                            <TableHead className='text-center'>Valor Pago</TableHead>
                            <TableHead className='text-center'>Data Pagamento</TableHead>
                            <TableHead className='text-center'>Id Devolução</TableHead>
                            <TableHead className='text-center'>Valor Devolvido</TableHead>
                            <TableHead className='text-center'>Status Devolução</TableHead>
                            <TableHead className='text-center'>Data Devolução</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {transacoes.map((transacao, index) => (
                            <TableRow key={index} className='text-center'>
                                {/* Células da tabela */}
                                <TableCell>{transacao.chave}</TableCell>
                                <TableCell>{transacao.descricao}</TableCell>
                                <TableCell>{transacao.calendario.criacao}</TableCell>
                                <TableCell>{transacao.devedor.nome}</TableCell>
                                <TableCell>{transacao.devedor.cpf}</TableCell>
                                <TableCell>{`R$ ${transacao.valor.original}`}</TableCell>
                                <TableCell>{transacao.txid}</TableCell>
                                <TableCell>{transacao.endToEndId}</TableCell>
                                <TableCell>{transacao.tipo}</TableCell>
                                <TableCell>{transacao.status}</TableCell>
                                <TableCell>{transacao.pagador?.nome || 'N/A'}</TableCell>
                                <TableCell>{transacao.pagador?.cpf || 'N/A'}</TableCell>
                                <TableCell>{`R$ ${transacao.pagador?.valor || '0.00'}`}</TableCell>
                                <TableCell>{transacao.pagador?.data || 'N/A'}</TableCell>
                                <TableCell>{transacao.devolucao?.id || 'N/A'}</TableCell>
                                <TableCell>{`R$ ${transacao.devolucao?.valor || '0.00'}`}</TableCell>
                                <TableCell>{transacao.devolucao?.status || 'N/A'}</TableCell>
                                <TableCell>{transacao.devolucao?.data || 'N/A'}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </Card>

    );
}
