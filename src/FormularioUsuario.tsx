import React, { useEffect, useState } from "react";

type UsuarioDto = {
    nome: string;
    email: string;
    idade: number;
    telefone: string;
    endereco: string;
    dataNascimento: string; // ISO string para compatibilidade com input type="date"
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
        }
    );

    useEffect(() => {
        if (usuarioEditavel) setUsuario(usuarioEditavel);
    }, [usuarioEditavel]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUsuario((prev) => ({
            ...prev,
            [name]: name === "idade" ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const url = usuarioEditavel?.id
            ? `http://localhost:5180/api/usuarios/${usuarioEditavel.id}`
            : "http://localhost:5180/api/usuarios";
        const method = usuarioEditavel?.id ? "PUT" : "POST";
        console.log("Enviando dados do usuário:", usuario);
        // Substitua pela URL da sua API
        const response = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usuario),
        });
        if (response.ok) {
            alert(usuarioEditavel ? "Usuário atualizado com sucesso!" : "Usuário cadastrado com sucesso!");
            if (onSalvar) onSalvar();
            setUsuario({
                nome: "",
                email: "",
                idade: 0,
                telefone: "",
                endereco: "",
                dataNascimento: "",
            });
        } else {
            alert("Erro ao cadastrar usuário.");
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
