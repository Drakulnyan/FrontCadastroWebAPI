import React, { useEffect, useState } from "react";
import { apiRequest } from "./api"; // Importe a função de requisição genérica

type UsuarioDto = {
    nome: string;
    email: string;
    idade: number;
    telefone: string;
    endereco: string;
    dataNascimento: string; // ISO string para compatibilidade com input type="date"
    senha : string
};

type FormularioUsuarioProps = {
    usuarioEditavel?: UsuarioDto & { id?: number };
    onSalvar?: () => void;
    onCancelar?: () => void;
};


const FormularioUsuario: React.FC<FormularioUsuarioProps> = ({
    usuarioEditavel,
    onSalvar,
    onCancelar
}) => {
    const [usuario, setUsuario] = useState<UsuarioDto>(
        usuarioEditavel ?? {
            nome: "",
            email: "",
            idade: 0,
            telefone: "",
            endereco: "",
            dataNascimento: "",
            senha: "",
        }
    );

    useEffect(() => {
        async function fetchUsuario() {
            if (usuarioEditavel?.id)
                try {
                    const usuarioData = await apiRequest(`/usuarios/${usuarioEditavel.id}`, {
                        method: "GET",
                    });
                    setUsuario(usuarioData);
                } catch (err: unknown) {
                    if (err instanceof Error) {
                        alert("Erro ao carregar usuário: " + err.message);
                    } else {
                        alert("Erro desconhecido ao carregar usuário.");
                    }
                }
        }
        fetchUsuario();
    },[usuarioEditavel])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUsuario((prev) => ({
            ...prev,
            [name]: name === "idade" ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const endpoint = usuarioEditavel?.id
            ? `/usuarios/${usuarioEditavel.id}`
            : "/usuarios";
        const method = usuarioEditavel?.id ? "PUT" : "POST";
        try {
            await apiRequest(endpoint, {
                method,
                data: usuario,
            });
            alert(usuarioEditavel ? "Usuário atualizado com sucesso!" : "Usuário cadastrado com sucesso!");
            if (onSalvar) onSalvar();
            setUsuario({
                nome: "",
                email: "",
                idade: 0,
                telefone: "",
                endereco: "",
                dataNascimento: "",
                senha: "",
            });
        } catch (err: unknown) {
            if (err instanceof Error) {
                alert("Erro ao cadastrar usuário: " + err.message);
            } else {
                alert("Erro desconhecido ao cadastrar usuário.");
            }
        }

    };


    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="form-label" htmlFor="nome">Nome</label>
                <input
                    id="nome"
                    name="nome"
                    className="form-input"
                    value={usuario.nome}
                    onChange={handleChange}
                    placeholder="Digite o nome"
                    required
                />
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="email">Email</label>
                <input
                    id="email"
                    name="email"
                    className="form-input"
                    value={usuario.email}
                    onChange={handleChange}
                    placeholder="Digite o email"
                    type="email"
                    required
                />
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="idade">Idade</label>
                <input
                    id="idade"
                    name="idade"
                    className="form-input"
                    value={usuario.idade}
                    onChange={handleChange}
                    placeholder="Digite a idade"
                    type="number"
                    min={0}
                    required
                />
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="telefone">Telefone</label>
                <input
                    id="telefone"
                    name="telefone"
                    className="form-input"
                    value={usuario.telefone}
                    onChange={handleChange}
                    placeholder="Digite o telefone"
                    required
                />
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="endereco">Endereço</label>
                <input
                    id="endereco"
                    name="endereco"
                    className="form-input"
                    value={usuario.endereco}
                    onChange={handleChange}
                    placeholder="Digite o endereço"
                    required
                />
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="dataNascimento">Data de Nascimento</label>
                <input
                    id="dataNascimento"
                    name="dataNascimento"
                    className="form-input"
                    value={usuario.dataNascimento}
                    onChange={handleChange}
                    type="date"
                    required
                />
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="senha">Senha</label>
                <input
                    id="senha"
                    name="senha"
                    className="form-input"
                    value={usuario.senha}
                    onChange={handleChange}
                    placeholder="Digite uma senha de 6 números"
                    type="password"
                    required
                    disabled={!!usuarioEditavel}
                />
            </div>
            <button className="form-button" type="submit">
                {usuarioEditavel ? "Salvar Alterações" : "Enviar"}
            </button>
            {onCancelar && (
                <button type="button" className="form-button" onClick={onCancelar} style={{ marginLeft: 8, background: "#ccc", color: "#222" }}>
                    Cancelar
                </button>
            )}
        </form>

    );
};

export default FormularioUsuario;
