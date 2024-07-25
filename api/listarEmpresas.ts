import { API_BASE_URL } from "./cadastroEmpresa";
import axios from "axios";

export interface Empresas {
    totalPages: number,
    totalItems: number,
    page: number,
    limit: number,
    companies: {
        id: string;
        fantasy: string;
        name: string;
        documentNumber: string;
        email: string;
        phone: string;
        type: string;
        ie: string;
        im: string;
        street: string;
        number: string;
        complement: string;
        neighborhood: string;
        city: string;
        uf: string;
        cep: string;
        site: string;
        webhook: string;
        webhook_out: string;
        username: string;
        typeFee: string;
        valueFee: string;
        partnerTypeFee: string;
        partnerValueFee: string;
        totalFee: number;
        status: string;
    }[]
}

export interface ParamsListarEmps{
    search?:string,
    uf?:string,
    typeFee?:string,
    partnerTypeFee?:string,
    limit?:number,
    page?:number
}

export const ListarTodasEmpresas = async(token:string, params:ParamsListarEmps): Promise<Empresas> =>{
    const {search, uf, typeFee, partnerTypeFee, limit, page} = params
    console.log(params)
    try {
        const response = await axios.get(`${API_BASE_URL}api/adm/company`, {
            headers:{
                Authorization: `Bearer ${token}`
            },
            params:{
                search,
                uf,
                typeFee,
                partnerTypeFee,
                limit,
                page
            }
        })
        return response.data
    } catch (error) {
        console.log(error)
        throw error; 
    }
}