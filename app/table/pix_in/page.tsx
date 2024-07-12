'use client'
import React, { useState, useEffect, ChangeEvent, useCallback } from 'react';
import { Table, TableBody, TableHeader, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import Sidebar from '@/components/ui/sidebar';
import Header from '@/components/ui/hearder';
import { listPixInByCompany, PixInSearchParams, TransacaoIn } from '@/api/listarPixIn';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import * as XLSX from 'xlsx';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter } from 'next/navigation';
import Auth from '@/app/auth/auth';

interface ExampleComponentProps {
    isOpen: boolean; // Propriedade que indica se o Sidebar está aberto
}

export default function  ExampleComponent(){
    Auth();
    const [isOpen, setIsOpen] = useState(true);
    const toggleSidebar = () => {
      setIsOpen(!isOpen);
    };
    const [transacoes, setTransacoes] = useState<TransacaoIn[]>([]);
    const [filtroInicio, setFiltroInicio] = useState<string>('');
    const [filtroFim, setFiltroFim] = useState<string>('');
    const [filtroCPF, setfiltroCPF] = useState<string>('');
    const [filtroStatus, setFiltroStatus] = useState<string>('');
    const [paginaAtual, setPaginaAtual] = useState<number>(1);
    const [itensPorPagina, setItensPorPagina] = useState<number>(10);

    const fetchTransacoes = useCallback(async () => {
        const token = localStorage.getItem('token') || '';
        const params: PixInSearchParams = {
            inicio: filtroInicio,
            fim: filtroFim,
            cpf: filtroCPF,
            status: filtroStatus,
            paginaAtual: paginaAtual,
            itensPorPagina: itensPorPagina
        };
        try {
            const data = await listPixInByCompany(params, token);
            setTransacoes(data);
        } catch (error) {
            console.error('Erro ao buscar transações:', error);
        }
    }, [filtroInicio, filtroFim, filtroCPF, filtroStatus, paginaAtual, itensPorPagina]);

    useEffect(() => {
        fetchTransacoes();
    }, [fetchTransacoes]);

    const filtroInicioChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFiltroInicio(e.target.value);
    };

    const filtroFimChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFiltroFim(e.target.value);
    };

    const filtroCpfChange = (e: ChangeEvent<HTMLInputElement>) => {
        setfiltroCPF(e.target.value);
    };

    const filtroStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setFiltroStatus(e.target.value);
    };

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
            Chave: transacao.chave,
            Descrição: transacao.descricao,
            'Data Criação': transacao.calendario.criacao,
            Devedor: transacao.devedor.nome,
            'CPF Devedor': transacao.devedor.cpf,
            'Valor Solicitado': transacao.valor.original,
            Txid: transacao.txid,
            EndToEndId: transacao.endToEndId,
            Tipo: transacao.tipo,
            Status: transacao.status,
            Pagador: transacao.pagador.nome,
            'CPF Pagador': transacao.pagador.cpf,
            'Valor Pago': transacao.pagador.valor,
            'Data Pagamento': transacao.pagador.data,
            'Id Devolução': transacao.devolucao.id,
            'Valor Devolvido': transacao.devolucao.valor,
            'Status Devolução': transacao.devolucao.status,
            'Data Devolução': transacao.devolucao.data,
        })));

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Transações');

        XLSX.writeFile(wb, fileName);
    };

    return (
        <div className="flex">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={` flex-1 transition-all duration-300 ease-in-out ${isOpen ? 'ml-64 ' : 'ml-0'}`} style={{ width: isOpen ? 'calc(100% - 300px)' : '100%'}}>
                <div className="flex-col">
                    <Header titulo="Pix In" />
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
                                        onChange={filtroCpfChange}
                                    />
                                </div>
                                <div className='flex flex-col self-end'>
                                    <Label className='text-xs mb-[1px]'>Filtrar Status:</Label>
                                    <select value={filtroStatus} onChange={filtroStatusChange} className='text-xs h-8 p-1 min-w-[130px] border self-end rounded-md'>
                                        <option value="">Todos</option>
                                        <option value="CONCLUIDA">Concluida</option>
                                        <option value="CANCELADO">Cancelado</option>
                                        <option value="ATIVA">Ativa</option>
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
                                <Table>
                                    <TableHeader>
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

