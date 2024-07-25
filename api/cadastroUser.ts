import { headers } from "next/headers";
import { API_BASE_URL } from "./cadastroEmpresa";
import axios from "axios";

export interface CadastrarUser{
    name: string,
    documentNumber: string,
    phone: string,
    birthDate: string,
    motherName: string,
    email: string,
    password: string,
    cep: string,
    street: string,
    number: string,
    complement: string,
    neighborhood: string,
    city: string,
    uf:string,
    codiemp:number | undefined
}

export const CadastroUsuario = async(token:string, cadastrarUser: CadastrarUser) =>{
    try{
        const response = await axios.post(`${API_BASE_URL}api/adm/user`, cadastrarUser, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response
    }catch(error){
        if (axios.isAxiosError(error)) {
            if (error.response) {
                alert(error.response.data.message);
                console.log(error);
            }
        }
    }
} 