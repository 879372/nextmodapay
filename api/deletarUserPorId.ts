import { API_BASE_URL } from "./cadastroEmpresa";
import axios from "axios";

export const deletarUserPorid = async(token:string): Promise<void> =>{
    try{
        const response = await axios.delete(`${API_BASE_URL}api/adm/user`, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        if (response.status === 204) {
            console.log('Usuario removido com sucesso.');
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
    }
}