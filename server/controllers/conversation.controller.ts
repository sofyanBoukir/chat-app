import { Response } from 'express'
import { IsAuthenticatedRequest } from '../isAuth.middleware'
import Conversation from '../models/conversation.model'
import Message from '../models/message.model'
import User from '../models/user.model'

export const getConversations = async (request: IsAuthenticatedRequest, response: Response) =>{
    try{
        const userId: string = request.user.id

        const conversations = await Conversation.find({participants:{$in:[userId]}})
                                                .sort({updatedAt:-1})
                                                .populate('participants', '-password')
        
        if(conversations){
            return response.json({
                conversations
            }) 
        }

        return response.status(404).json({
            message: 'Try to start a conversation by asking an api publisher if its available'
        }) 
    }catch{
        return response.status(500).json({
            message: 'Failed to fetch your conversations'
        }) 
    }
}

export const startNew = async (request: IsAuthenticatedRequest, response: Response) =>{
    try{
        const userId: string = request.user.id
        const { otherPaticipantId } = request.body;

        const user = await User.findById(otherPaticipantId);

        if(!user){
            return response.status(500).json({
                message: "User not found"
            })
        }

        const newConversation = new Conversation({
            participants: [userId, otherPaticipantId],
            lastMessage: `Hi ${user.name}!`
        })

        const newMessage = new Message({
            sender: userId,
            conversation: newConversation._id,
            text: `Hi ${user.name}!`,
        })

        await newConversation.save();
        await newMessage.save();
        
        return response.json({
            message: "Your message has been sent successfully!"
        })
    }catch{
        return response.status(500).json({
            message: "Failed to start new conversation"
        })
    }
}