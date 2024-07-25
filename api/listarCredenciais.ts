import { error } from "console";
import { API_BASE_URL } from "./cadastroEmpresa";
import axios from "axios";

export interface Credenciais{
    username: string,
    password: string,
    ips: string[]
}

export const ListarCredenciais = async (token:string): Promise<Credenciais>=>{
    try {
        const response = await axios.get(`${API_BASE_URL}api/adm/company-credentials`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
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