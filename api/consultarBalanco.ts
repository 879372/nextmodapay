import { createContext } from "react";
import { API_BASE_URL } from "./cadastroEmpresa";
import axios from "axios";

interface Balanco {
    pin: number;
    pix_in: number;
    pix_out: number;
    taxa_total: number;
    saldo: number;
    accounts: {
        fk_conta: number;
        pix_out: number;
        pix_in: number;
        taxa_total: number;
        balanceAccount: number;
    }
}

export const consultarBalanco = async (token: string, accountId: number): Promise<Balanco | undefined> => {
    try {
        const response = await axios.get(`${API_BASE_URL}api/adm/balance/${accountId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        )
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                console.log('Erro ao fazer a requisição:', error.message);
                console.log('Erro não relacionado ao Axios:', error);
            }
        }
        return undefined
    }
}