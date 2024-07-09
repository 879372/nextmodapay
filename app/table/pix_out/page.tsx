'use client'
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableHeader, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Card } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import Sidebar from '@/components/ui/sidebar';
import Header from '@/components/ui/hearder';
import { listPixInByCompany, PixOutSearchParams, TransacaoOut } from '@/api/listarPixOut';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import * as XLSX from 'xlsx'; // Importando a biblioteca xlsx


const ExampleComponent = () => {
    const [transacoes, setTransacoes] = useState<TransacaoOut[]>([]);
    const [filtroInicio, setFiltroIncio] = useState<string>('')
    const [filtroFim, setFiltroFim] = useState<string>('')
    const [filtroCPF, setFiltroCPF] = useState<string>('')
    const [filtroStatus, setFiltroStatus] = useState<string>('')
    const [filtroPaginaAtual, setFiltroPaginaAtual] = useState<number | undefined>()
    const [filtroItensPorPagina, setFiltroItensPorPagina] = useState<number| undefined>()

    useEffect(() => {
        const fetchTransacoes = async () => {
            const token = localStorage.getItem('token') || ''; 
            const params: PixOutSearchParams = {
                inicio: filtroInicio,
                fim: filtroFim,
                cpf: filtroCPF,
                status: filtroStatus,
                // paginaAtual: filtroPaginaAtual,
                // itensPorPagina: filtroItensPorPagina  
            };
            try {
                const data = await listPixInByCompany(params, token);
                setTransacoes(data); 
                console.log(data)
            } catch (error) {
                console.error('Erro ao buscar transações:', error);
            }
        };

        fetchTransacoes(); 
    }, [filtroInicio, filtroFim, filtroCPF, filtroStatus]);

    const filtroInicioChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setFiltroIncio(e.target.value);
    }

    const filtroFimChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setFiltroFim(e.target.value);
    }

    const filtroCPFChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setFiltroCPF(e.target.value);
    }

    const filtroStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) =>{
        setFiltroStatus(e.target.value)
    }

    // const filtroitemsPorPaginaChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    //     const valor = parseInt(e.target.value, 10);
    //     if (!isNaN(valor)) {
    //         setFiltroPaginaAtual(valor);
    //     } else {
    //         setFiltroPaginaAtual(10); 
    //     }
    // }

    // const filtroPaginaAtualChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    //     const valor = parseInt(e.target.value, 10);
    //     if (!isNaN(valor)) {
    //         setFiltroPaginaAtual(valor);
    //     } else {
    //         setFiltroPaginaAtual(1); 
    //     }
    // }

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
            'CPF Receedor': transacao.recebedor.documento,
            'Data Pagamento': transacao.recebedor.data,
        })));

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Transações');

        XLSX.writeFile(wb, fileName);
    };
    return (
        <div className="flex">
            <Sidebar />
            <div>
                <div className="flex-col">
                    <Header titulo="PIX OUT" />
                </div>
                <div>
                    <Card className="max-w-[1198px] rounded-xl p-5 m-8 h-lvh">
                    <div className='flex justify-end gap-2 items-center mb-2'>
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
                            <Input  className='text-xs max-h-8 max-w-[130px]'
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

                            <div className='self-end '>
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
                                        {/* Células da tabela */}
                                        <TableCell>{transacao.idTrasacao}</TableCell>
                                        <TableCell>{transacao.chave}</TableCell>
                                        <TableCell>{transacao.solicitacao}</TableCell>
                                        <TableCell>{transacao.descricao}</TableCell>
                                        <TableCell>{transacao.pagador.nome}</TableCell>
                                        <TableCell>{transacao.pagador.cpf}</TableCell>
                                        <TableCell >{`R$ ${transacao.valor.original}`}</TableCell>
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
                </div>
            </div>
        </div>
    );
};

export default ExampleComponent;
