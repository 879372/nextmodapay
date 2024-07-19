'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { Table, TableBody, TableHeader, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Card } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import Sidebar from '@/components/ui/sidebar';
import { listPixOutByCompany, PixOutSearchParams, TransacaoOut } from '@/api/listarPixOut';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import * as XLSX from 'xlsx';
import Auth from '@/app/auth/auth';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { format } from 'date-fns';
import Header from '@/components/ui/hearder';

export default function ExampleComponent() {
    Auth();

    const obterPrimeiroEUltimoDiaDoMes = () => {
        const hoje = new Date();
        const primeiroDiaDoMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
        const ultimoDiaDoMes = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0);

        const formatoData = (data: Date) => {
            const ano = data.getFullYear();
            const mes = (data.getMonth() + 1).toString().padStart(2, '0');
            const dia = data.getDate().toString().padStart(2, '0');
            return `${ano}-${mes}-${dia}`;
        };

        setFiltroInicio(formatoData(primeiroDiaDoMes));
        setFiltroFim(formatoData(ultimoDiaDoMes));
    };

    const [isOpen, setIsOpen] = useState(true);
    const [transacoes, setTransacoes] = useState<TransacaoOut['items']>([]);
    const [filtroInicio, setFiltroInicio] = useState<string>('');
    const [filtroFim, setFiltroFim] = useState<string>('');
    const [filtroCPF, setFiltroCPF] = useState<string>('');
    const [filtroStatus, setFiltroStatus] = useState<string>('executed');
    const [paginaAtual, setPaginaAtual] = useState<number>(0);
    const [itensPorPagina, setItensPorPagina] = useState<number>(10);
    const [shouldFetch, setShouldFetch] = useState<boolean>(false);
    const [pagination, setPagination] = useState<number>(0);

    const [isSmallScreen, setIsSmallScreen] = useState(false); 
  
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth <= 768); 
    };
  
    const handleSidebarVisibility = () => {
      const shouldShowSidebar = window.innerWidth > 768; 
      setIsOpen(shouldShowSidebar);
    };
  
    useEffect(() => {
      checkScreenSize(); 
      handleSidebarVisibility();
      const handleResize = () => {
        checkScreenSize(); 
        handleSidebarVisibility(); 
      };
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []); 
  
    const toggleSidebar = () => {
      setIsOpen(!isOpen);
    };

    const params: PixOutSearchParams = {
        inicio: filtroInicio,
        fim: filtroFim,
        cpf: filtroCPF,
        status: filtroStatus,
        paginaAtual,
        itensPorPagina
    };

    const fetchTransacoes = useCallback(async () => {
        const token = localStorage.getItem('token') || '';
        try {
            const data = await listPixOutByCompany(params, token);
                setTransacoes(data.items);
                setPagination(data.totalPages); 
            } catch (error) {
                console.error('Erro ao buscar transações:', error);
            }
        }, [params]);
    

    useEffect(() => {
        obterPrimeiroEUltimoDiaDoMes();
        setShouldFetch(true); 
    }, []);

    useEffect(() => {
        if (filtroInicio && filtroFim) {
            fetchTransacoes();
        }
    }, [paginaAtual]);

    useEffect(() => {
        if (shouldFetch) {
            fetchTransacoes();
            setShouldFetch(false); 
        }
    }, [fetchTransacoes, shouldFetch]);

    const handleFiltrar = () => {
        setPaginaAtual(0);
        fetchTransacoes();
    };

    const handlePageChange = (page: number) => {
        setPaginaAtual(page);
    };
    const handleNextPage = () => {
        setPaginaAtual(prev => Math.min(prev + 1, pagination - 1)); // Limita a próxima página
    };
    
    const handlePreviousPage = () => {
        setPaginaAtual(prev => Math.max(prev - 1, 0));
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
    
        await fetchAllTransactions(0);

        const fileName = 'transacoes.xlsx';
        const ws = XLSX.utils.json_to_sheet(allTransactions.map((transacao) => ({
            'Id transação': transacao.idTrasacao,
            Chave: transacao.chave,
            Solicitação: transacao.solicitacao ? format(new Date(transacao.solicitacao), 'dd/MM/yyyy') : '',
            Descrição: transacao.descricao,
            Pagador: transacao.pagador.nome,
            'CPF Pagador': transacao.pagador.cpf,
            'Valor Solicitado': `R$ ${parseFloat(String(transacao.valor.original)).toFixed(2)}`,
            EndToEndId: transacao.endToEndId,
            Comprovante: transacao.comprovante,
            Status: transacao.status,
            Recebedor: transacao.recebedor.nome,
            'CPF Recebedor': transacao.recebedor.documento,
            'Data Pagamento': transacao.recebedor.data ? format(new Date(transacao.recebedor.data), 'dd/MM/yyyy') : '',
        })));

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Transações');

        XLSX.writeFile(wb, fileName);
    };

    return (
        <div className="flex">
            <Sidebar isOpen={isOpen} toggleSidebar={() => setIsOpen(!isOpen)} />
            <div className={`flex-1 transition-margin duration-300 ease-in-out ${isSmallScreen ? 'ml-0' : (isOpen ? 'ml-64' : 'ml-0')}`} style={{ width: isOpen ? 'calc(100% - 256px)' : '100%' }}>
            <Header titulo="Pix Out" isOpen={isOpen} toggleSidebar={toggleSidebar} />
            <div className="flex-col mt-20">
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
                                        
                                        { 
                                        transacoes.map((transacao, index) => (
                                            <TableRow key={index} className=''>
                                                {/* Células da tabela */}
                                                <TableCell>{transacao.idTrasacao || '-'}</TableCell>
                                                <TableCell>{transacao.endToEndId || '-'}</TableCell>
                                                <TableCell>{transacao.chave || '-'}</TableCell>
                                                <TableCell>{transacao.solicitacao? new Date(transacao.solicitacao).toLocaleDateString() : '-'}</TableCell>
                                                <TableCell>{transacao.descricao || '-'}</TableCell>
                                                <TableCell className='text-right'>{`R$ ${transacao.valor.original ? parseFloat(String(transacao.valor.original)).toFixed(2) :  '-'}`}</TableCell>
                                                <TableCell>{transacao.pagador.nome || '-'}</TableCell>
                                                <TableCell>{transacao.pagador.cpf || '-'}</TableCell>
                                                <TableCell>
                                                    {transacao.status === 'executed' ? (
                                                        <span className='text-green-500'>{transacao.status}</span>
                                                    ) : transacao.status === 'CANCELADA' ? (
                                                        <span className='text-red-500'>{transacao.status}</span>
                                                    ) : (
                                                        transacao.status // Caso não corresponda aos casos anteriores, mostra o status normalmente
                                                    )}
                                                </TableCell>
                                                <TableCell>{transacao.recebedor.nome || '-'}</TableCell>
                                                <TableCell>{transacao.recebedor.documento || '-'}</TableCell>
                                                <TableCell>{transacao.recebedor.data? new Date(transacao.recebedor.data).toLocaleDateString() : '-'}</TableCell>

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