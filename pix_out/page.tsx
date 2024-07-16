'use client';
import React, { useState, useEffect, ChangeEvent, useCallback } from 'react';
import { Table, TableBody, TableHeader, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Card } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import Sidebar from '@/components/ui/sidebar';
import { listPixOutByCompany, PixOutSearchParams, TransacaoOut } from '@/api/listarPixOut';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import * as XLSX from 'xlsx';
import { useRouter } from 'next/navigation';
import Auth from '@/app/auth/auth';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { format } from 'date-fns'; // Importa a função de formatação de date-fns
import Header from '@/components/ui/hearder';

interface ExampleComponentProps {
    isOpen: boolean; 
}

export default function ExampleComponent() {
    const [isOpen, setIsOpen] = useState(true);
    const [transacoes, setTransacoes] = useState<TransacaoOut['items']>([]); // Updated type
    const [filtroInicio, setFiltroInicio] = useState<string>('');
    const [filtroFim, setFiltroFim] = useState<string>('');
    const [filtroCPF, setFiltroCPF] = useState<string>('');
    const [filtroStatus, setFiltroStatus] = useState<string>('executed');
    const [paginaAtual, setPaginaAtual] = useState<number>(1);
    const [itensPorPagina, setItensPorPagina] = useState<number>(10);

    const router = useRouter();
    Auth();

    const params: PixOutSearchParams = {
        inicio: filtroInicio,
        fim: filtroFim,
        cpf: filtroCPF,
        status: 'executed',
        paginaAtual,
        itensPorPagina
    };

    const fetchTransacoes = useCallback(async () => {
        const token = localStorage.getItem('token') || '';
        try {
            const data = await listPixOutByCompany(params, token);
            setTransacoes(data.items); // Atualiza o estado com o array de TransacaoOut
        } catch (error) {
            console.error('Erro ao buscar transações:', error);
        }
    }, [params]);

    useEffect(() => {
        fetchTransacoes();
    }, [paginaAtual]);

    const handleFiltrar = () => {
        setPaginaAtual(1); // Reseta a página ao filtrar
        fetchTransacoes(); // Chama fetchTransacoes apenas ao clicar no botão Filtrar
    };

    const handlePageChange = (page: number) => {
        setPaginaAtual(page);
    };

    const handleNextPage = () => {
        setPaginaAtual(prev => prev + 1);
    };
    
    const handlePreviousPage = () => {
        setPaginaAtual(prev => Math.max(prev - 1, 1));
    };
    
    const exportToExcel = async () => {
        const token = localStorage.getItem('token') || '';
        const allTransactions: TransacaoOut['items'] = [];
    
        const fetchAllTransactions = async (startPage: number) => {
            try {
                const data = await listPixOutByCompany({ ...params, paginaAtual: startPage }, token);
                allTransactions.push(...data.items);
    
                if (data.totalPages > startPage) {
                    const nextPage = startPage + 1;
                    await fetchAllTransactions(nextPage);
                }
            } catch (error) {
                console.error(`Erro ao buscar transações da página ${startPage}:`, error);
            }
        };
    
        await fetchAllTransactions(1); // Começa da página 1

        const fileName = 'transacoes.xlsx';
        const ws = XLSX.utils.json_to_sheet(allTransactions.map((transacao) => ({
            'Id transação': transacao.idTrasacao,
            Chave: transacao.chave,
            Solicitação: transacao.solicitacao ? format(new Date(transacao.solicitacao), 'dd/MM/yyyy') : 'N/A',
            Descrição: transacao.descricao,
            Pagador: transacao.pagador.nome,
            'CPF Pagador': transacao.pagador.cpf,
            'Valor Solicitado': transacao.valor.original,
            EndToEndId: transacao.endToEndId,
            Comprovante: transacao.comprovante,
            Status: transacao.status,
            Recebedor: transacao.recebedor.nome,
            'CPF Recebedor': transacao.recebedor.documento,
            'Data Pagamento': transacao.recebedor.data ? format(new Date(transacao.recebedor.data), 'dd/MM/yyyy') : 'N/A',
        })));

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Transações');

        XLSX.writeFile(wb, fileName);
    };

    return (
        <div className="flex">
            <Sidebar isOpen={isOpen} toggleSidebar={() => setIsOpen(!isOpen)} />
            <div className={` flex-1 transition-all duration-300 ease-in-out ${isOpen ? 'ml-64 ' : 'ml-0'}`} style={{ width: isOpen ? 'calc(100% - 300px)' : '100%'}}>
                <div className="flex-col">
                    <Header titulo="Pix Out" />
                    <div className="p-8">
                        <Card className="rounded-xl p-5 h-full">
                            <div className='flex justify-end gap-2 items-center mb-2 flex-wrap'>
                                <div>
                                        <Label className='text-xs'>Data Inicio:</Label>
                                        <Input className='text-xs max-h-8 max-w-[130px]'
                                            type="date"
                                            placeholder='Data inicio'
                                            value={filtroInicio}
                                            onChange={(e) => setFiltroInicio(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <Label className='text-xs'>Data Fim:</Label>
                                        <Input className='text-xs max-h-8 max-w-[130px]'
                                            type="date"
                                            placeholder='Data Fim'
                                            value={filtroFim}
                                            onChange={(e) => setFiltroFim(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <Label className='text-xs'>Filtrar CPF:</Label>
                                        <Input className='text-xs max-h-8 max-w-[130px]'
                                            type="text"
                                            placeholder='CPF'
                                            value={filtroCPF}
                                            onChange={(e) => setFiltroCPF(e.target.value)}
                                        />
                                    </div>
                                    <div className='flex flex-col self-end'>
                                        <Label className='text-xs mb-[1px]'>Filtrar Status:</Label>
                                        <select value={filtroStatus} onChange={(e) => setFiltroStatus(e.target.value)} className='text-xs h-8 p-1 min-w-[130px] border self-end rounded-md'>
                                            <option value="executed">executed</option>
                                            <option value="CANCELADA">Cancelada</option>
                                            <option value="processing">Ativa</option>
                                        </select>
                                    </div>

                                    <div className='self-end'>
                                        <Button className="bg-pink-900 max-h-8 max-w-[130px] rounded text-xs"
                                            onClick={handleFiltrar}
                                        >
                                            Filtrar
                                        </Button>
                                    </div>
                                    <div className='self-end'>
                                        <Button className="bg-pink-900 max-h-8 max-w-[130px] rounded text-xs"
                                            onClick={exportToExcel}
                                        >
                                            Exportar
                                        </Button>
                                    </div>
                                </div>
                            <ScrollArea className="h-full whitespace-nowrap">
                                <Table style={{ maxWidth: 'calc(100% - 32px)' }}>
                                    <TableHeader>
                                        <TableRow>
                                            {/* Cabeçalhos da tabela */}
                                            <TableHead className=''>Id Transação</TableHead>
                                            <TableHead className=''>Chave</TableHead>
                                            <TableHead className=''>Solicitação</TableHead>
                                            <TableHead className=''>Descrição</TableHead>
                                            <TableHead className=''>Pagador</TableHead>
                                            <TableHead className=''>CPF Pagador</TableHead>
                                            <TableHead className=''>Valor Solicitado</TableHead>
                                            <TableHead className=''>EndToEndId</TableHead>
                                            <TableHead className=''>Status</TableHead>
                                            <TableHead className=''>Recebedor</TableHead>
                                            <TableHead className=''>CPF Recebedor</TableHead>
                                            <TableHead className=''>Data</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        
                                        { 
                                        transacoes.map((transacao, index) => (
                                            <TableRow key={index} className=''>
                                                {/* Células da tabela */}
                                                <TableCell>{transacao.idTrasacao}</TableCell>
                                                <TableCell>{transacao.chave}</TableCell>
                                                <TableCell>{transacao.solicitacao? new Date(transacao.solicitacao).toLocaleDateString() : 'N/A'}</TableCell>
                                                <TableCell>{transacao.descricao}</TableCell>
                                                <TableCell>{transacao.pagador.nome}</TableCell>
                                                <TableCell>{transacao.pagador.cpf}</TableCell>
                                                <TableCell className='text-right'>{`R$ ${transacao.valor.original}`}</TableCell>
                                                <TableCell>{transacao.endToEndId}</TableCell>
                                                <TableCell>
                                                    {transacao.status === 'executed' ? (
                                                        <span className='text-green-500'>{transacao.status}</span>
                                                    ) : transacao.status === 'CANCELADA' ? (
                                                        <span className='text-red-500'>{transacao.status}</span>
                                                    ) : (
                                                        transacao.status // Caso não corresponda aos casos anteriores, mostra o status normalmente
                                                    )}
                                                </TableCell>
                                                <TableCell>{transacao.recebedor.nome}</TableCell>
                                                <TableCell>{transacao.recebedor.documento}</TableCell>
                                                <TableCell>{transacao.recebedor.data}</TableCell>
                                                <TableCell>{transacao.recebedor.data? new Date(transacao.recebedor.data).toLocaleDateString() : 'N/A'}</TableCell>

                                            </TableRow>
                                        ))
                                        }
                                    </TableBody>
                                </Table>
                                <ScrollBar orientation="horizontal" />
                            </ScrollArea>
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious onClick={handlePreviousPage} />
                                    </PaginationItem>
                                    {[1, 2, 3].map(page => (
                                        <PaginationItem key={page}>
                                            <PaginationLink 
                                                href="#" 
                                                onClick={() => handlePageChange(page)}
                                                className={paginaAtual === page ? 'active' : ''}
                                            >
                                                {page}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))}...
                                    <PaginationItem>
                                        <PaginationNext onClick={handleNextPage} />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};