import axios from 'axios';

const API_BASE_URL = 'https://api.modapay.com.br/';

export interface Company {
    fantasy: string;
    name: string;
    email: string;
    documentNumber: string;
    ie?: string;
    im?: string;
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    uf: string;
    cep: string;
    phone: string;
    site?: string;
    user: {
      name: string;
      documentNumber: string;
      phone: string;
      birthDate: string;
      motherName: string;
      email: string;
      password: string;
      cep: string;
      street: string;
      number: string;
      complement?: string;
      neighborhood: string;
      city: string;
      uf: string;
    };
  }

  export const registerCompany = async (company: Company) =>{
    try{
        const response = await axios.post(`${API_BASE_URL}api/adm/company`, company,{
            headers:{
                'Content-Type': 'application/json',
            },
        });
    }catch (error){
        throw error;
    }
  }