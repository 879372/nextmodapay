import { API_BASE_URL } from "./cadastro";
import axios from 'axios';

export interface Transacao {
    chave: string;
    descricao: string;
    calendario: {
        criacao: string;
        expiracao: number;
    };
    devedor: {
        cpf: string;
        nome: string;
    };
    valor: {
        original: number;
    };
    txid: string;
    endToEndId: string;
    tipo: string;
    status: string;
    pagador: {
        cpf: string;
        nome: string;
        valor: number;
        data: string;
    };
    devolucao: {
        id: string;
        valor: number;
        status: string;
        data: string;
    };
}

export interface PixInSearchParams{
    inicio?: string;
    fim?: string;
    cpf?: string;
    status?: string;
    paginaAtual?: number;
    itensPorPagina?: number;
}

export const listPixInByCompany = async (params: PixInSearchParams): Promise<Transacao[]> =>{
    const { inicio, fim, cpf, status, paginaAtual, itensPorPagina} = params
    try{
        const response = await axios.get(`https://stage-api.modapay.com.br/api/adm/pix-in/`,{
            headers:{
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RpZ28iOjE3LCJuYW1lIjoiVEVTVEUgU1RBR0UiLCJtYXN0ZXIiOiJOIiwiY29tcGFuaWVzIjpbXSwiaWRDb21wYW55IjoyOCwiaWF0IjoxNzIwNDY4NDgyLCJleHAiOjE3MjA0OTcyODJ9.df6C5rWcB5DbU7nIhViFZyYPI5SkKMPb55UGKEOVhMs`,
            },
            params:{

            }
        })
        return response.data
    } catch (error){
        console.error("Pix In:", error)
        return [];
    }
}

