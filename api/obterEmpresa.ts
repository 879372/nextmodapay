import { API_BASE_URL } from "./cadastro";
import axios from "axios";

export interface Empresa {
    id: number;
    fantasy: string;
    name: string;
    documentNumber: string;
    email: string;
    phone: string;
    type: string;
    ie: string;
    im: string;
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    uf: string;
    cep: string;
    site: string;
    typeFee: string ;
    valueFee: number ;
    partnerTypeFee: string;
    partnerValueFee: number;
    totalFee: number;
    status: string;
}

const ObterDadosEmpresa = async (token: string): Promise<Empresa | null> => {
    try {
        const response = await axios.get(`${API_BASE_URL}api/adm/company-id`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao obter dados da empresa:', error);
        return null;
    }
};

export default ObterDadosEmpresa;
