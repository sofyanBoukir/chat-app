import { api } from "@/lib/api-config"

export const getConvs = async () =>{
    const response = await api.get(`/api/conversation/get`);
    return response
}

export const startNew = async (otherPaticipantId: string) =>{
    const response = await api.post(`/api/conversation/startNew`,{otherPaticipantId});
    return response;
}