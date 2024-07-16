import { API_BASE_URL } from "./cadastro";
import axios from 'axios';

// Corrigir a interface para refletir a estrutura dos dados
export interface TransacaoIn {
  totalPages: number;
  totalItems: number;
  page: number;
  limit: number;
  items: {
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
  }[];
}

export interface PixInSearchParams {
  inicio?: string;
  fim?: string;
  cpf?: string;
  status?: string;
  paginaAtual?: number;
  itensPorPagina?: number;
}

export const listPixInByCompany = async (params: PixInSearchParams, token: string): Promise<TransacaoIn> => {
  const { inicio, fim, cpf, status, paginaAtual, itensPorPagina } = params;
  console.log("Parâmetros da requisição:", { inicio, fim, paginaAtual, itensPorPagina });
  try {
    const response = await axios.get(`${API_BASE_URL}api/adm/pix-in/`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": 'application/json'
      },
      params: {
        inicio,
        fim,
        cpf,
        status,
        paginaAtual,
        itensPorPagina
      }
    });
    return response.data;
  } catch (error) {
    console.error("Pix In:", error);
    throw error;
  }
}


