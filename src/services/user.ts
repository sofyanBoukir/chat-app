import { api } from "@/lib/api-config"


export const updateProfile = async (formData) =>{
    const response = await api.put(`/api/user/update`,formData,{
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
    return response
}

export const searchByQuery  = async (query: string) =>{
    const response = await api.get(`/api/user/searchUsers?query=${query}`);
    return response
}