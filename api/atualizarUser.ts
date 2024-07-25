import { headers } from "next/headers";
import { API_BASE_URL } from "./cadastroEmpresa";
import axios from "axios";

export interface AtualizarUser {
    phone: string,
    email: string,
    cep: string,
    street: string,
    number: string,
    complement?:string,
    neighborhood: string,
    city: string,
    uf: string
}

export interface atualizarMaster{
    master: string,
    userId: string
}

export const Useratualizar = async (token:string, params: AtualizarUser): Promise<void> => {
    try{
        const response = await axios.put(`${API_BASE_URL}api/adm/user/`, params,{
            headers:{
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        if (response.status === 204) {
            console.log('Usuario atualizado com sucesso.');
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


export const masterAtualizar = async(token:string, params: atualizarMaster): Promise<void> =>{
    try{
        const response = await axios.put(`${API_BASE_URL}api/adm/user-profile`, params, {
            headers:{
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        if (response.status === 204) {
            console.log('Master atualizado com sucesso.');
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