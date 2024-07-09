import { API_BASE_URL } from "./cadastro";
import axios from 'axios';

export interface Transacao {
    idTrasacao: string;
    chave: string;
    descricao: string;
    solicitacao: string;
    pagador: {
        cpf: string;
        nome: string;
    };
    valor: {
        original: number;
    };
    endToEndId: string;
    comprovante: string;
    status: string;
    recebedor: {
        documento: string;
        nome: string;
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

export const listPixInByCompany = async (params: PixInSearchParams, token: string): Promise<Transacao[]> =>{
    const { inicio, fim, cpf, status, paginaAtual, itensPorPagina} = params
    try{
        const response = await axios.get(`${API_BASE_URL}api/adm/pix-out/`,{
            headers:{
                Authorization: `Bearer ${token}`,
            },
            params:{
                inicio,
                fim,
                cpf,
                status,
                paginaAtual,
                itensPorPagina
            }
        })
        return response.data
    } catch (error){
        console.error("Pix In:", error)
        return [];
    }
}

