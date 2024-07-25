import { API_BASE_URL } from "./cadastroEmpresa";
import axios from "axios";


export interface AdicionarIp{
    companyId?: string,
    ip: string
}

export const AdicionarIpAcesso = async (token:string, params: AdicionarIp): Promise<void> => {
    try{
        const response = await axios.put(`${API_BASE_URL}api/adm/company-add-ip`, params,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        
        if (response.status === 204) {
            console.log('IP adicionado com sucesso.');
        } else {
            console.error('Resposta inesperada:', response.status);
        }
    }catch(error){
        if (axios.isAxiosError(error)) {
            if (error.response) {
                alert(error.response.data.message);
                console.log(error);
            }
        }
        throw error;
    }
}