import { API_BASE_URL } from "./cadastroEmpresa";
import axios from "axios";

export type SolicitarCredenciasParams = string[]

export interface CredenciaisResponse {
    pin: number,
    username: string
}

export const SolicitarCredenciasEmp = async (token:string, params:SolicitarCredenciasParams): Promise<CredenciaisResponse> =>{
 try {
    const response = await axios.put(`${API_BASE_URL}api/adm/company-credentials`, params, {
        headers:{
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json" 
        }
    })
    if (response.status === 200) {
        return response.data;
    } else {
        console.error('Resposta inesperada:', response.status);
        throw new Error('Resposta inesperada');
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