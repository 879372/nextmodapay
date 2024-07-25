import { API_BASE_URL } from "./cadastroEmpresa";
import axios from "axios";

export interface ListarUsers{
    totalPages: number,
    totalItems: number,
    page: number,
    limit: number,
    users: {
        id: string,
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
    }[];
}

export interface ParamsListarUsers{
    search?:string,
    uf?:string,
    master?:string,
    limit?:number,
    page?:number
}

export const ListarTodosUsers = async(token:string, params: ParamsListarUsers): Promise<ListarUsers> =>{
    const {search, uf, master, limit, page} = params
    try{
        const response = await axios.get(`${API_BASE_URL}api/adm/user`, {
            headers:{
                Authorization: `Bearer ${token}`
            },
            params:{
                search,
                uf,
                master,
                limit,
                page
            }
        })

        return response.data as ListarUsers
    }catch(error){
        console.error("Listar Users:", error);
        throw error;
    }
}