import type { LoginForm, RegisterForm } from "@/interfaces";
import { api } from "@/lib/api-config";

export const login = async (formData: LoginForm) =>{
    const response = await api.post(`/api/auth/login`,formData);    
    return response;
}

export const register = async (formData: RegisterForm) =>{
    const response = await api.post(`/api/auth/register`,formData);
    return response;
}

export const isAuthenticated = async () =>{
    const response = await api.post(`/api/auth/isAuth`);    
    return response;
}

export const logout = async () =>{
    const response = await api.post(`/api/auth/logout`);
    return response;
}