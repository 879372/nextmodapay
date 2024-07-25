'use client'
import { AdicionarIp, AdicionarIpAcesso } from "@/api/adicionarIp";
import { AlterarStatus, AlterarStatusEmpresa } from "@/api/alterarStatusEmpresa";
import { AtualizarUser, Useratualizar } from "@/api/atualizarUser";
import { buscarUserId, UserId } from "@/api/buscarUserPorId";
import { CadastrarUser, CadastroUsuario } from "@/api/cadastroUser";
import { ListarTodosUsers, ListarUsers, ParamsListarUsers } from "@/api/listarUsers";
import { deleteIp, removerIpParams } from "@/api/removerIp";
import { useCallback, useEffect, useState } from "react";

export default function Teste() {
    const [user, setUser] = useState<CadastrarUser>({
        name: '',
        documentNumber: '',
        phone: '',
        birthDate: '',
        motherName: '',
        email: '',
        password: '',
        cep: '',
        street: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: '',
        uf: '',
        codiemp: 0
    });

    const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('token') || '';
        console.log(token)
        try {
            const response = await CadastroUsuario(token, user);
            console.log('Usuário cadastrado com sucesso:', response);
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
        }
    };

    //////////////////////////////////////////////////////////////////////


    const [obterDadosUser, setObterDadosUser] = useState<UserId | undefined>();
    const [atualizarUser, setAtualizarUser] = useState<AtualizarUser | undefined>();

    const fectDadosUser = useCallback(async () => {
        const token = localStorage.getItem('token') || '';
        try {
            const data = await buscarUserId(token);
            setObterDadosUser(data);
            setAtualizarUser(data as AtualizarUser); // Casting para garantir compatibilidade
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        fectDadosUser();
    }, [fectDadosUser]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, key: keyof AtualizarUser) => {
        if (atualizarUser) {
            setAtualizarUser({
                ...atualizarUser,
                [key]: e.target.value,
            });
        }
    };

    const handleSaveClick = async () => {
        const token = localStorage.getItem('token') || '';
        if (atualizarUser) {
            try {
                await Useratualizar(token, atualizarUser);
                setObterDadosUser(atualizarUser as UserId); // Casting para garantir compatibilidade
            } catch (error) {
                console.error('Erro ao atualizar dados da empresa:', error);
            }
        }
    };

    //////////////////////////////////////////////////////////////////////
    const [buscarUsers, setListarUsers] = useState<ListarUsers['users']>();
    const [searchParams, setSearchParams] = useState<string>('');
    const [ufParams, setufParams] = useState<string>('');
    const [masterParams, setMasterParams] = useState<string>('');
    const [limitParams, setlimitParams] = useState<number>(10);
    const [pageParams, setPageParams] = useState<number>(0);

    const Params: ParamsListarUsers = {
        search: searchParams,
        uf: ufParams,
        master: masterParams,
        limit: limitParams,
        page: pageParams
    }

    const fecthUsers = useCallback(async () => {
        const token = localStorage.getItem('token') || '';
        try {
            const data = await ListarTodosUsers(token, Params)
            setListarUsers(data.users)
            console.log(data)
        } catch (error) {
            console.error(error)
        }
    }, [])

    useEffect(() => {
        fecthUsers()
    }, [fecthUsers])


    // \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    const [ip, setIp] = useState<AdicionarIp>({ companyId: '', ip: '' });
    // const [error, setError] = useState('');

    const handleInputtChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setIp((prevIp) => ({ ...prevIp, [name]: value }));
    };

    const handleeSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const token = localStorage.getItem('token') || '';
        // setError('');

        if (ip.ip) {
            const response = await AdicionarIpAcesso(token, ip);
            console.log(response);
            console.log('Endereço IP enviado:', ip);
        } else {
            console.log('Endereço IP inválido.');
        }
    };

    // \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    const [status, setStatus] = useState<AlterarStatus>({ companyId: '', status: '' });

    const handleInputttChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setStatus((prevstatus) => ({ ...prevstatus, [name]: value }));
    };

    const handleeeSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const token = localStorage.getItem('token') || '';
        // setError('');
        if (status.status) {
            const response = await AlterarStatusEmpresa(token, status);
            console.log(response);
            console.log('status enviado:', status);
        } else {
            console.log('Endereço IP inválido.');
        }
    };
    // \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    const [removerIp, setremoverIp] = useState<removerIpParams>({ companyId: '', ip: '' });

    const handleInputtttChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setremoverIp((prevremover) => ({ ...prevremover, [name]: value }));
    };

    const handleeeeSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const token = localStorage.getItem('token') || '';
        // setError('');
        if (removerIp.ip) {
            const response = await deleteIp(token, removerIp);
            console.log(response);
            console.log('status enviado:', removerIp);
        } else {
            console.log('não removido');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Nome</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={user.name}
                        onChange={handleUserChange}
                    />
                </div>
                <div>
                    <label htmlFor="documentNumber">CPF</label>
                    <input
                        type="text"
                        id="documentNumber"
                        name="documentNumber"
                        value={user.documentNumber}
                        onChange={handleUserChange}
                    />
                </div>
                <div>
                    <label htmlFor="phone">Telefone</label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={user.phone}
                        onChange={handleUserChange}
                    />
                </div>
                <div>
                    <label htmlFor="birthDate">Data de Nascimento</label>
                    <input
                        type="date"
                        id="birthDate"
                        name="birthDate"
                        value={user.birthDate}
                        onChange={handleUserChange}
                    />
                </div>
                <div>
                    <label htmlFor="motherName">Nome da Mãe</label>
                    <input
                        type="text"
                        id="motherName"
                        name="motherName"
                        value={user.motherName}
                        onChange={handleUserChange}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={user.email}
                        onChange={handleUserChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Senha</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={user.password}
                        onChange={handleUserChange}
                    />
                </div>
                <div>
                    <label htmlFor="cep">CEP</label>
                    <input
                        type="text"
                        id="cep"
                        name="cep"
                        value={user.cep}
                        onChange={handleUserChange}
                    />
                </div>
                <div>
                    <label htmlFor="street">Rua</label>
                    <input
                        type="text"
                        id="street"
                        name="street"
                        value={user.street}
                        onChange={handleUserChange}
                    />
                </div>
                <div>
                    <label htmlFor="number">Número</label>
                    <input
                        type="text"
                        id="number"
                        name="number"
                        value={user.number}
                        onChange={handleUserChange}
                    />
                </div>
                <div>
                    <label htmlFor="complement">Complemento</label>
                    <input
                        type="text"
                        id="complement"
                        name="complement"
                        value={user.complement}
                        onChange={handleUserChange}
                    />
                </div>
                <div>
                    <label htmlFor="neighborhood">Bairro</label>
                    <input
                        type="text"
                        id="neighborhood"
                        name="neighborhood"
                        value={user.neighborhood}
                        onChange={handleUserChange}
                    />
                </div>
                <div>
                    <label htmlFor="city">Cidade</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={user.city}
                        onChange={handleUserChange}
                    />
                </div>
                <div>
                    <label htmlFor="uf">UF</label>
                    <input
                        type="text"
                        id="uf"
                        name="uf"
                        value={user.uf}
                        onChange={handleUserChange}
                    />
                </div>
                <div>
                    <label htmlFor="codiemp">Código da Empresa</label>
                    <input
                        type="number"
                        id="codiemp"
                        name="codiemp"
                        value={user.codiemp}
                        onChange={handleUserChange}
                    />
                </div>
                <button type="submit">Cadastrar</button>
            </form>
            ///////////////////////////////////////////////////////////////////////////////
            <div>
                <label htmlFor="phone">Telefone</label>
                <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={atualizarUser?.phone || ''}
                    onChange={(e) => handleInputChange(e, 'phone')}
                />
            </div>
            <div>
                <button onClick={handleSaveClick}>Alterar Dados</button>
            </div>
            //////////////////////////////////////////////////////////////////////////////
            {buscarUsers?.map((item, index) => (
                <div key={index}>{item.email}</div>
            ))}

            \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
            <form onSubmit={handleeSubmit}>
                <div>
                    <label htmlFor="companyId">Ip company </label>
                    <input
                        type="text"
                        id="companyId"
                        name="companyId"
                        value={ip.companyId}
                        onChange={handleInputtChange}
                    />
                </div>
                <div>
                    <label htmlFor="companyId">Ip  </label>
                    <input
                        type="text"
                        id="ip"
                        name="ip"
                        value={ip.ip}
                        onChange={handleInputtChange}
                    />
                </div>
                <div>
                    <button type="submit">Enviar</button>
                </div>
                {/* {error && <div style={{ color: 'red' }}>{error}</div>} */}
            </form>
            <form onSubmit={handleeeSubmit}>
                <div>
                    <label htmlFor="companyId">status company</label>
                    <input
                        type="text"
                        id="companyId"
                        name="companyId"
                        value={status.companyId}
                        onChange={handleInputttChange}
                    />
                </div>
                <div>
                    <label htmlFor="status">status </label>
                    <input
                        type="text"
                        id="status"
                        name="status"
                        value={status.status}
                        onChange={handleInputttChange}
                    />
                </div>
                <div>
                    <button type="submit">Enviar</button>
                </div>
                {/* {error && <div style={{ color: 'red' }}>{error}</div>} */}
            </form>
            <form onSubmit={handleeeeSubmit}>
                <div>
                    <label htmlFor="companyId">id company</label>
                    <input
                        type="text"
                        id="companyId"
                        name="companyId"
                        value={removerIp.companyId}
                        onChange={handleInputtttChange}
                    />
                </div>
                <div>
                    <label htmlFor="ip">ip</label>
                    <input
                        type="text"
                        id="ip"
                        name="ip"
                        value={removerIp.ip}
                        onChange={handleInputtttChange}
                    />
                </div>
                <div>
                    <button type="submit">Enviar</button>
                </div>
                {/* {error && <div style={{ color: 'red' }}>{error}</div>} */}
            </form>

        </div>
    );
}
