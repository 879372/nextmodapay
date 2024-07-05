import axios from 'axios';

const API_BASE_URL = 'https://stage-api.modapay.com.br/';

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

export interface Login {
  username: string;
  password: string;
}


  export const LoginCompany = async (login: Login) => {
    try{
      const response = await axios.post(`${API_BASE_URL}api/adm/login`, login, {
        headers:{
          'Content-Type': 'application/json'
        },
      });
      return response
    }catch (error){
      throw error;
    }
  }

  export const registerCompany = async (company: Company) =>{
    try{
        const response = await axios.post(`${API_BASE_URL}api/adm/company`, company,{
            headers:{
                'Content-Type': 'application/json',
            },
        });
        return response
    }catch (error){
        throw error;
    }
  }

