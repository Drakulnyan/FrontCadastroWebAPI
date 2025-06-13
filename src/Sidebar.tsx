import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import "./Sidebar.css";

const Sidebar: React.FC = () => {
    const location = useLocation();
    const [aberto, setAberto] = useState(true);

    return (
        <nav className={`sidebar${aberto ? "" : " sidebar-fechado"}`}>
            <button
                className="sidebar-toggle"
                onClick={() => setAberto((prev) => !prev)}
                title={aberto ? "Recolher menu" : "Expandir menu"}
            >
                <FaBars />
            </button>
            <div className="sidebar-links">
                <Link to="/cadastro" className={location.pathname === "/cadastro" ? "active" : ""}>
                    {aberto ? "Cadastro de Usuário" : <span title="Cadastro de Usuário">👤</span>}
                </Link>
                <Link to="/usuarios" className={location.pathname === "/usuarios" ? "active" : ""}>
                    {aberto ? "Lista de Usuários" : <span title="Lista de Usuários">📋</span>}
                </Link>
                <Link to="/sobre" className={location.pathname === "/sobre" ? "active" : ""}>
                    {aberto ? "Sobre" : <span title="Sobre">ℹ️</span>}
                </Link>
            </div>
        </nav>
    );
};

export default Sidebar;
