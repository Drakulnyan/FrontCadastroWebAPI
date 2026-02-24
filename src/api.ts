import axios, { type AxiosRequestConfig } from "axios";
import { API_URL } from "./config";

function getToken() {
    return localStorage.getItem("token");
}

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Interceptador para adicionar o token em todas as requisições
api.interceptors.request.use(config => {
    const token = getToken();
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
})

export async function apiRequest(endpoint: string, options: AxiosRequestConfig = {}) {
    try {
        const response = await api.request({
            url: endpoint,
            ...options,
        });
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || "Erro na requisição");
        } else if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("Erro desconhecido");
        }
    }
    
}
