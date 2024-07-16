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
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter } from 'next/navigation';
import Auth from '@/app/auth/auth';

interface ExampleComponentProps {
    isOpen: boolean; 
}

export default function ExampleComponent() {
    const [isOpen, setIsOpen] = useState(true);
    const router = useRouter();
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
      };
    Auth();
    const [transacoes, setTransacoes] = useState<TransacaoIn[]>([]);
    const [filtroInicio, setFiltroInicio] = useState<string>('');
    const [filtroFim, setFiltroFim] = useState<string>('');
    const [filtroCPF, setFiltroCPF] = useState<string>('');
    const [filtroStatus, setFiltroStatus] = useState<string>('CONCLUIDA');
    const [paginaAtual, setPaginaAtual] = useState<number>(0);
    const [itensPorPagina, setItensPorPagina] = useState<number>(10);

    const [params, setParams] = useState<PixInSearchParams>({
        inicio: '',
        fim: '',
        cpf: '',
        status: 'CONCLUIDA',
        paginaAtual: 0,
        itensPorPagina: 10
    });

    const fetchTransacoes = useCallback(async () => {
        const token = localStorage.getItem('token') || '';
        try {
            const data = await listPixInByCompany(params, token);
            console.log(data)
            setTransacoes(data);
        } catch (error) {
            console.error('Erro ao buscar transações:', error);
        }
    }, [params]);

    useEffect(() => {
        fetchTransacoes();
    }, [fetchTransacoes]);

    const handleFiltrar = () => {
        setParams({
            ...params,
            inicio: filtroInicio,
            fim: filtroFim,
            cpf: filtroCPF,
            status: filtroStatus,
            paginaAtual: 1
        });
    };

    const handlePageChange = (page: number) => {
        setParams({
            ...params,
            paginaAtual: page
        });
    };

    const handleNextPage = () => {
        setParams(prevParams => ({
            ...prevParams,
            paginaAtual: prevParams ? (prevParams.paginaAtual || 1) + 1 : 1
        }));
    };
    
    const handlePreviousPage = () => {
        setParams(prevParams => ({
            ...prevParams,
            paginaAtual: prevParams ? Math.max((prevParams.paginaAtual || 1) - 1, 1) : 1
        }));
    };
    

    const handleItensPorPaginaChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setParams({
            ...params,
            itensPorPagina: Number(e.target.value),
            paginaAtual: 1 
        });
    };


    const exportToExcel = async () => {
        const token = localStorage.getItem('token') || '';
        const allTransactions: TransacaoIn[] = [];
    
        // Função recursiva para buscar todas as transações de todas as páginas
        const fetchAllTransactions = async (startPage: number) => {
            try {
                const data = await listPixInByCompany({ ...params, paginaAtual: startPage }, token);
                allTransactions.push(...data);
    
                // Verifica se ainda precisa buscar mais páginas
                if (data.length === itensPorPagina) {
                    // Calcula a próxima página a ser buscada
                    const nextPage = startPage + 1;
                    await fetchAllTransactions(nextPage);
                }
            } catch (error) {
                console.error(`Erro ao buscar transações da página ${startPage}:`, error);
            }
        };
    
        // Inicia a busca das transações a partir da primeira página
        await fetchAllTransactions(0);
    
        // Após coletar todas as transações, exporta para Excel
        const fileName = 'transacoes.xlsx';
        const ws = XLSX.utils.json_to_sheet(allTransactions.map((transacao) => ({
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
            <div className={`flex-1 transition-all duration-300 ease-in-out ${isOpen ? 'ml-64 ' : 'ml-0'}`} style={{ width: isOpen ? 'calc(100% - 300px)' : '100%' }}>
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
                                        <option value="CONCLUIDA">Concluida</option>
                                        <option value="CANCELADO">Cancelado</option>
                                        <option value="ATIVA">Ativa</option>
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
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            {/* Cabeçalhos da tabela */}
                                            <TableHead className=''>Txid</TableHead>
                                            <TableHead className=''>EndToEndId</TableHead>
                                            <TableHead className=''>Descrição</TableHead>
                                            <TableHead className=''>Devedor</TableHead>
                                            <TableHead className=''>CPF Devedor</TableHead>
                                            <TableHead className=''>Valor Solicitado</TableHead>
                                            <TableHead className=''>Valor Pago</TableHead>
                                            <TableHead className=''>Valor Devolvido</TableHead>
                                            <TableHead className=''>Status</TableHead>
                                            <TableHead className=''>Pagador</TableHead>
                                            <TableHead className=''>CPF Pagador</TableHead>
                                            <TableHead className=''>Data Pagamento</TableHead>
                                            <TableHead className=''>Id Devolução</TableHead>
                                            <TableHead className=''>Status Devolução</TableHead>
                                            <TableHead className=''>Data Devolução</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {
                                        transacoes.map((transacao, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{transacao.txid}</TableCell>
                                                <TableCell>{transacao.endToEndId}</TableCell>
                                                <TableCell>{transacao.descricao}</TableCell>
                                                <TableCell>{transacao.devedor.nome}</TableCell>
                                                <TableCell>{transacao.devedor.cpf}</TableCell>
                                                <TableCell className='text-right'>R$ {Number(transacao.valor.original).toFixed(2) || '0.00'}</TableCell>
                                                <TableCell className='text-right'>R$ {Number(transacao.pagador.valor).toFixed(2) || '0.00'}</TableCell>
                                                <TableCell className='text-right'>R$ {transacao.devolucao?.valor || '0.00'}</TableCell>
                                                <TableCell>{
                                                    transacao.status === 'CONCLUIDA' ? (
                                                        <span className='text-green-500'>{transacao.status}</span>
                                                    ) : transacao.status === 'CANCELADO' ? (
                                                        <span className='text-red-500'>{transacao.status}</span>
                                                    ) :(
                                                        transacao.status
                                                    )
                                                           }
                                                </TableCell>
                                                <TableCell>{transacao.pagador?.nome || 'N/A'}</TableCell>
                                                <TableCell>{transacao.pagador?.cpf || 'N/A'}</TableCell>
                                                <TableCell>{transacao.pagador.data ? new Date(transacao.pagador.data).toLocaleDateString() : 'N/A'}</TableCell>
                                                <TableCell>{transacao.devolucao?.id || 'N/A'}</TableCell>
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
                                    ))}
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
