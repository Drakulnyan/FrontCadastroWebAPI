import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaSearch } from "react-icons/fa";
import FormularioUsuario from "./FormularioUsuario";
import "./ListaUsuarios.css";

type Usuario = {
    id: number;
    nome: string;
    email: string;
    idade: number;
    telefone: string;
    endereco: string;
    dataNascimento: string;
};

const ListaUsuarios: React.FC = () => {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [loading, setLoading] = useState(true);
    const [busca, setBusca] = useState("");
    const [usuarioEdit, setUsuarioEdit] = useState<Usuario | null>(null);

    useEffect(() => {
        fetch("http://localhost:5180/api/usuarios")
            .then(res => res.json())
            .then(data => {
                setUsuarios(data);
                setLoading(false);
            });
    }, []);

    const atualizarLista = () => {
        fetch("http://localhost:5180/api/usuarios")
            .then(res => res.json())
            .then(data => {
                setUsuarios(data);
                setLoading(false);
            });
    };

    const usuariosFiltrados = usuarios.filter(u =>
        u.nome.toLowerCase().includes(busca.toLowerCase()) ||
        u.email.toLowerCase().includes(busca.toLowerCase()) ||
        u.telefone.toLowerCase().includes(busca.toLowerCase()) ||
        u.endereco.toLowerCase().includes(busca.toLowerCase())
    );

    const handleDelete = (id: number) => {
        if (window.confirm("Deseja realmente deletar este usuário?")) {
            fetch(`http://localhost:5180/api/usuarios/${id}`, {
                method: "DELETE"
            }).then(res => {
                if (res.ok) {
                    setUsuarios(usuarios.filter(u => u.id !== id));
                } else {
                    alert("Erro ao deletar usuário.");
                }
            });
        }
    };

    const handleEdit = (id: number) => {
        const usuario = usuarios.find(u => u.id === id);
        if (usuario) setUsuarioEdit(usuario);
    };

    const handleCloseModal = () => setUsuarioEdit(null);

    return (
        <div className="usuarios-tabela-container">
            <div className="usuarios-tabela-header">
                <div className="usuarios-tabela-busca">
                    <input
                        type="text"
                        placeholder="Pesquisar usuário..."
                        value={busca}
                        onChange={e => setBusca(e.target.value)}
                    />
                    <FaSearch className="icon-busca" />
                </div>
            </div>
            <div className="usuarios-tabela-scroll">
                <table className="usuarios-tabela">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Idade</th>
                            <th>Telefone</th>
                            <th>Endereço</th>
                            <th>Data de Nascimento</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={8}>Carregando...</td>
                            </tr>
                        ) : usuariosFiltrados.length === 0 ? (
                            <tr>
                                <td colSpan={8}>Nenhum usuário encontrado.</td>
                            </tr>
                        ) : (
                            usuariosFiltrados.map(u => (
                                <tr key={u.id}>
                                    <td>{u.id}</td>
                                    <td>{u.nome}</td>
                                    <td>{u.email}</td>
                                    <td>{u.idade}</td>
                                    <td>{u.telefone}</td>
                                    <td>{u.endereco}</td>
                                    <td>{new Date(u.dataNascimento).toLocaleDateString("pt-BR")}</td>
                                    <td>
                                        <button className="icon-btn" title="Editar" onClick={() => handleEdit(u.id)}>
                                            <FaEdit />
                                        </button>
                                        <button className="icon-btn" title="Deletar" onClick={() => handleDelete(u.id)}>
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            {/* Modal de edição */}
            {usuarioEdit && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Editar Usuário</h3>
                        <FormularioUsuario
                            usuarioEditavel={usuarioEdit}
                            onSalvar={() => {
                                handleCloseModal();
                                atualizarLista();
                            }}
                            onCancelar={handleCloseModal}
                        />
                    </div>
                </div>
            )}
            <div className="usuarios-tabela-footer">
                <span>{usuariosFiltrados.length} resultado(s)</span>
            </div>
        </div>
    );
};

export default ListaUsuarios;
