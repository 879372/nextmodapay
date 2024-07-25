import { API_BASE_URL } from "./cadastroEmpresa";
import axios from "axios";

export interface AlterarStatus{
    companyId: string,
    status: string
}   

export const AlterarStatusEmpresa = async (token:string, params:AlterarStatus): Promise<void> =>{
    try {
        const response = await axios.put(`${API_BASE_URL}api/adm/company-status`, params,{
            headers:{
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        if (response.status === 204) {
            console.log('Status da empresa alterado com sucesso');
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
        throw error
    }
}