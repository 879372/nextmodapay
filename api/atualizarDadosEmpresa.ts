import axios from "axios";
import { API_BASE_URL } from "./cadastro";

export interface AtualizarEmpresa {
    email: string;
    ie: string;
    im: string;
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    uf: string;
    cep: string;
    phone: string;
    site: string;
}

const AtualizarDadosEmpresa = async (params: AtualizarEmpresa, token: string): Promise<void> => {
    try {
        const response = await axios.put(`${API_BASE_URL}api/adm/company/`, params, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        
        if (response.status === 204) {
            console.log(response);
        } else {
            console.error('Resposta inesperada:', response.status);
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                alert(error.response.data.message);
                console.log(error);
            }
        }
    }
};

export default AtualizarDadosEmpresa;