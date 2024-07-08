'use client'
import React, { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface Transacao {
    id_transacao: string;
    end_to_end_id: string;
    nome: string;
    cpf: string;
    descricao: string;
    method:string; 
    chave: string;
    rejected: string;
    status: string;
    valor: string;
    comprovante: string;
    conclusao: string;
}

const PixOut = () => {
    const [transacoes, setTransacoes] = useState<Transacao[]>([]);

    const dadosTransacoes: Transacao[] = [
        {
            "id_transacao": "128629C780F849D28221040B66E655CA",
            "end_to_end_id": "E151119752024050613272449ea4737c",
            "nome": "Fullano de tal",
            "cpf": "***.052.654-**",
            "descricao": "teste integracao",
            "method": "cpf",
            "chave": "080052654000",
            "valor": "5",
            "conclusao": "2024-05-06T10:27:19-03:00",
            "status": "executed",
            "comprovante": "https://comprovantes.iugu.com/128629c7-80f8-49d2-8221-040b66e000ca-e11a00",
            "rejected": "null"
            },
        {
            "id_transacao": "128629C780F849D28221040B66E655CA",
            "end_to_end_id": "E151119752024050613272449ea4737c",
            "nome": "Fullano de tal",
            "cpf": "***.052.654-**",
            "descricao": "teste integracao",
            "method": "cpf",
            "chave": "080052654000",
            "valor": "5",
            "conclusao": "2024-05-06T10:27:19-03:00",
            "status": "executed",
            "comprovante": "https://comprovantes.iugu.com/128629c7-80f8-49d2-8221-040b66e000ca-e11a00",
            "rejected": "null"
            },
        {
            "id_transacao": "128629C780F849D28221040B66E655CA",
            "end_to_end_id": "E151119752024050613272449ea4737c",
            "nome": "Fullano de tal",
            "cpf": "***.052.654-**",
            "descricao": "teste integracao",
            "method": "cpf",
            "chave": "080052654000",
            "valor": "5",
            "conclusao": "2024-05-06T10:27:19-03:00",
            "status": "executed",
            "comprovante": "https://comprovantes.iugu.com/128629c7-80f8-49d2-8221-040b66e000ca-e11a00",
            "rejected": "null"
            },
        {
            "id_transacao": "128629C780F849D28221040B66E655CA",
            "end_to_end_id": "E151119752024050613272449ea4737c",
            "nome": "Fullano de tal",
            "cpf": "***.052.654-**",
            "descricao": "teste integracao",
            "method": "cpf",
            "chave": "080052654000",
            "valor": "5",
            "conclusao": "2024-05-06T10:27:19-03:00",
            "status": "executed",
            "comprovante": "https://comprovantes.iugu.com/128629c7-80f8-49d2-8221-040b66e000ca-e11a00",
            "rejected": "null"
            },
        {
            "id_transacao": "128629C780F849D28221040B66E655CA",
            "end_to_end_id": "E151119752024050613272449ea4737c",
            "nome": "Fullano de tal",
            "cpf": "***.052.654-**",
            "descricao": "teste integracao",
            "method": "cpf",
            "chave": "080052654000",
            "valor": "5",
            "conclusao": "2024-05-06T10:27:19-03:00",
            "status": "executed",
            "comprovante": "https://comprovantes.iugu.com/128629c7-80f8-49d2-8221-040b66e000ca-e11a00",
            "rejected": "null"
            },
        // Adicione mais transações conforme necessário
    ];

    useEffect(() => {
        setTransacoes(dadosTransacoes);
    }, []);

    return (
        <Card className="flex-1 rounded-xl max-h-96 p-5 w-96">
            Transações Pix Out
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead >Nome</TableHead>
                            <TableHead>CPF</TableHead>
                            <TableHead >Descrição</TableHead>
                            <TableHead >Chave</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Valor</TableHead>
                        </TableRow>
                    </TableHeader>
                </Table>
            <ScrollArea className=" h-64 whitespace-nowrap">
                <div style={{ maxHeight: 'calc(100% - 40px)', overflowY: 'auto' }}>
                    <Table>
                        <TableBody>
                            {transacoes.map((transacao, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{transacao.nome}</TableCell>
                                    <TableCell>{transacao.cpf}</TableCell>
                                    <TableCell>{transacao.descricao}</TableCell>
                                    <TableCell>{transacao.chave}</TableCell>
                                    <TableCell>{transacao.status}</TableCell>
                                    <TableCell className="text-right">{`R$ ${transacao.valor}`}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </Card>
    );
};

export default PixOut;
