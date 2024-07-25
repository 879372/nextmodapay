import { API_BASE_URL } from "./cadastroEmpresa";
import axios from "axios";

export interface Atualizarsenha{
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}

const AtualizarSenhaAdm = async (params: Atualizarsenha, token: string): Promise<Atualizarsenha | undefined> => {
    try {
        const response = await axios.put(`${API_BASE_URL}api/adm/update/password`, params, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 204) {
            return response.data as Atualizarsenha;
        } else {
            console.error(response.data);
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                alert(error.response.data.message);
                console.log(error);
            }
        }
    }
    return undefined; // Return something appropriate in case of error or unexpected status
};


export default AtualizarSenhaAdm;