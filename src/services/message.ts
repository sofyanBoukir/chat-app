import { api } from "@/lib/api-config"

export const _getMessages = async (conversationId: string) =>{
    const response = await api.get(`/api/message/get/${conversationId}`);
    return response;
}

export const _sendMessage  = async (conversationId: string, text: string) =>{
    const response = await api.post(`/api/message/sendMessage`, {conversationId, text});
    return response;
}

export const _deleteMessage = async (messageId: string) =>{
    const response = await api.delete(`/api/message/deleteMessage/${messageId}`)
    return response;
}