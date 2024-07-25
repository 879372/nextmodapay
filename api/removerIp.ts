import { API_BASE_URL } from "./cadastroEmpresa";
import axios from "axios";


export interface removerIpParams {
    companyId?: string; // Altere para number de acordo com a documentação
    ip: string;
}

export const deleteIp = async (token: string, params: removerIpParams): Promise<void> => {
    try {
        const response = await axios.delete(`${API_BASE_URL}api/adm/company-remove-ip`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: params // Use `data` para enviar o corpo da requisição
        });

        if (response.status === 204) {
            console.log('IP removido com sucesso.');
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
        throw error;
    }
}