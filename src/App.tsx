import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import FormularioUsuario from "./FormularioUsuario";
import ListaUsuarios from "./ListaUsuarios";
import Login from "./Login";
import Sidebar from "./Sidebar";
import './App.css'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route
                    path="*"
                    element={
                        <div style={{ display: "flex" }}>
                            <Sidebar />
                            <div className="app-container" style={{ marginLeft: 220, width: "calc(100vw - 220px)" }}>
                                <Routes>
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
                                    <Route path="*" element={<Navigate to="/usuarios" />} />
                                </Routes>
                            </div>
                        </div>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App
