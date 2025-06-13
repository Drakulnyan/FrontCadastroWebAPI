import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import FormularioUsuario from "./FormularioUsuario";
import ListaUsuarios from "./ListaUsuarios";
import Sidebar from "./Sidebar";
import './App.css'

function App() {
    return (
        <BrowserRouter>
            <div style={{ display: "flex" }}>
                <Sidebar />
                <div className="app-container" style={{ marginLeft: 220, width: "calc(100vw - 220px)" }}>
                    <Routes>
                        <Route path="/" element={<Navigate to="/cadastro" />} />
                        <Route path="/cadastro" element={
                            <>
                                <div className="header">
                                    <h1>Cadastro de Usuário</h1>
                                    <p>Preencha os dados abaixo para cadastrar um novo usuário.</p>
                                </div>
                                <div className="form-card">
                                    <FormularioUsuario />
                                </div>
                            </>
                        } />
                        <Route path="/usuarios" element={<ListaUsuarios />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App
