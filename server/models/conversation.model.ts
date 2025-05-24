import mongoose, { Document, models, ObjectId, Schema } from "mongoose";

export interface ConversationI extends Document{
    participants : ObjectId[],
    lastMessage: ObjectId,
}


const conversationSchema = new Schema<ConversationI>({
    participants : [
        {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
    ],
    lastMessage : {type: String, required: true},
},{
    timestamps: true
}) 

const Conversation = models.Conversation || mongoose.model<ConversationI>('Conversation',conversationSchema);
export default Conversation;