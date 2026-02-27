import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    Alert,
    Paper,
} from "@mui/material";
import { apiRequest } from './api';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErro('');
        try {
            const dados = await apiRequest('/login', {
                method: 'POST',
                data: { email, senha },
            });
            localStorage.setItem('token', dados.token);
            alert('Login realizado com sucesso!');
            navigate('/usuarios');
        } catch (err: unknown) {
            if (err instanceof Error) {
                setErro(err.message);
            } else {
                setErro('Erro desconhecido.');
            }
        }

    };



    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                width: "100vw",
            }}
        >
            <Container maxWidth="sm">
                <Box mt={0} component={Paper} p={4} boxShadow={3}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Login 
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="E-mail"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                            margin="normal"
                            required
                        />
                        <TextField
                            label="Senha"
                            type="password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            fullWidth
                            margin="normal"
                            required
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 2 }}
                        >
                            Entrar
                        </Button>
                    </form>
                    {erro && (
                        <Alert severity="error" sx={{ mt: 2 }}>
                            {erro}
                        </Alert>
                    )}

                    
                </Box>
            </Container>
        </Box>

    );

};

export default Login;
