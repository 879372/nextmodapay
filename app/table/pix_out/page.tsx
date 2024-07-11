'use client'
import React, { useState, useEffect, ChangeEvent } from 'react';
import { Table, TableBody, TableHeader, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Card } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import Sidebar from '@/components/ui/sidebar';
import Header from '@/components/ui/hearder';
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
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
const ExampleComponent = () => {
    Auth();

    const [transacoes, setTransacoes] = useState<TransacaoOut[]>([]);
    const [filtroInicio, setFiltroInicio] = useState<string>('');
    const [filtroFim, setFiltroFim] = useState<string>('');
    const [filtroCPF, setFiltroCPF] = useState<string>('');
    const [filtroStatus, setFiltroStatus] = useState<string>('');
    const [paginaAtual, setPaginaAtual] = useState<number>(1);
    const [itensPorPagina, setItensPorPagina] = useState<number>(10);

    useEffect(() => {
        const fetchTransacoes = async () => {
            const token = localStorage.getItem('token') || '';
            const params: PixOutSearchParams = {
                inicio: filtroInicio,
                fim: filtroFim,
                cpf: filtroCPF,
                status: filtroStatus,
                paginaAtual,
                itensPorPagina  
            };
            try {
                const data = await listPixOutByCompany(params, token);
                setTransacoes(data);
                console.log(data)
            } catch (error) {
                console.error('Erro ao buscar transações:', error);
            }
        };

        fetchTransacoes();
    }, [filtroInicio, filtroFim, filtroCPF, filtroStatus, paginaAtual]);

    const filtroInicioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFiltroInicio(e.target.value);
    }

    const filtroFimChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFiltroFim(e.target.value);
    }

    const filtroCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFiltroCPF(e.target.value);
    }

    const filtroStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFiltroStatus(e.target.value)
    }

    const handlePageChange = (page: number) => {
        setPaginaAtual(page);
    };

    const handleNextPage = () => {
        setPaginaAtual(prevPage => prevPage + 10);
    };

    const handlePreviousPage = () => {
        setPaginaAtual(prevPage => Math.max(prevPage - 10, 1));
    };

    const handleItensPorPaginaChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setItensPorPagina(Number(e.target.value));
        setPaginaAtual(1); // Resetar para a primeira página
    };

    const exportToExcel = () => {
        const fileName = 'transacoes.xlsx';
        const ws = XLSX.utils.json_to_sheet(transacoes.map((transacao) => ({
            'Id transação': transacao.idTrasacao,
            Chave: transacao.chave,
            Solicitação: transacao.solicitacao,
            Descrição: transacao.descricao,
            Pagador: transacao.pagador.nome,
            'CPF Pagador': transacao.pagador.cpf,
            'Valor Solicitado': transacao.valor.original,
            EndToEndId: transacao.endToEndId,
            Comprovante: transacao.comprovante,
            Status: transacao.status,
            Recebedor: transacao.recebedor.nome,
            'CPF Recebedor': transacao.recebedor.documento,
            'Data Pagamento': transacao.recebedor.data,
        })));

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Transações');

        XLSX.writeFile(wb, fileName);
    };

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1" style={{ width: 'calc(100% - 300px)' }}>
                <div className="flex-col">
                    <Header titulo="PIX Out" />
                    <div className="p-8">
                        <Card className="rounded-xl p-5 h-full">
                            <div className='flex justify-end gap-2 items-center mb-2 flex-wrap'>
                                <div>
                                    <Label className='text-xs'>Data Inicio:</Label>
                                    <Input className='text-xs max-h-8 max-w-[130px]'
                                        type="date"
                                        placeholder='Data inicio'
                                        value={filtroInicio}
                                        onChange={filtroInicioChange}
                                    />
                                </div>
                                <div>
                                    <Label className='text-xs'>Data Fim:</Label>
                                    <Input className='text-xs max-h-8 max-w-[130px]'
                                        type="date"
                                        placeholder='Data Fim'
                                        value={filtroFim}
                                        onChange={filtroFimChange}
                                    />
                                </div>
                                <div>
                                    <Label className='text-xs'>Filtrar CPF:</Label>
                                    <Input className='text-xs max-h-8 max-w-[130px]'
                                        type="text"
                                        placeholder='CPF'
                                        value={filtroCPF}
                                        onChange={filtroCPFChange}
                                    />
                                </div>
                                <div className='flex flex-col self-end'>
                                    <Label className='text-xs mb-[2px]'>Filtrar Status:</Label>
                                    <select value={filtroStatus} onChange={filtroStatusChange} className='text-xs h-8 p-1 min-w-[130px] border self-end rounded-md'>
                                        <option value="">Todos</option>
                                        <option value="CONCLUIDO">Concluido</option>
                                        <option value="CANCELADA">Cancelado</option>
                                        <option value="executed">Executed</option>
                                    </select>
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
                                            <TableHead className='text-center'>Id Transação</TableHead>
                                            <TableHead className='text-center'>Chave</TableHead>
                                            <TableHead className='text-center'>Solicitação</TableHead>
                                            <TableHead className='text-center'>Descrição</TableHead>
                                            <TableHead className='text-center'>Pagador</TableHead>
                                            <TableHead className='text-center'>CPF Pagador</TableHead>
                                            <TableHead className='text-center'>Valor Solicitado</TableHead>
                                            <TableHead className='text-center'>EndToEndId</TableHead>
                                            <TableHead className='text-center'>Status</TableHead>
                                            <TableHead className='text-center'>Recebedor</TableHead>
                                            <TableHead className='text-center'>CPF Recebedor</TableHead>
                                            <TableHead className='text-center'>Data</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {transacoes.map((transacao, index) => (
                                            <TableRow key={index} className='text-center'>
                                                {/* Células da tabela */}
                                                <TableCell>{transacao.idTrasacao}</TableCell>
                                                <TableCell>{transacao.chave}</TableCell>
                                                <TableCell>{transacao.solicitacao}</TableCell>
                                                <TableCell>{transacao.descricao}</TableCell>
                                                <TableCell>{transacao.pagador.nome}</TableCell>
                                                <TableCell>{transacao.pagador.cpf}</TableCell>
                                                <TableCell>{`R$ ${transacao.valor.original}`}</TableCell>
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

export default ExampleComponent;
