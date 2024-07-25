import { API_BASE_URL } from "./cadastroEmpresa";
import axios from "axios";

export interface UserId {
    id: number,
    name: string,
    codiemp: number,
    email: string,
    master: string,
    avatar: string | null,
    createdAt: string,
    documentNumber: string,
    phone: string,
    birthDate: string,
    motherName: string,
    cep: string,
    street: string,
    number: string,
    complement: string,
    neighborhood: string,
    city: string,
    uf: string
}


export const buscarUserId = async (token: string): Promise<UserId> =>{
    try{
        const response = await axios.get(`${API_BASE_URL}api/adm/user-id`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        return response.data as UserId
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