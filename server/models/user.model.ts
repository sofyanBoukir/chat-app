import mongoose, { models, Schema } from "mongoose";

interface UserI {
    name: string, 
    username: string,
    password: string,
    profile_picture?: string,
}


const userSchema = new Schema<UserI>({
    name: {type: String, required: true, max: 50,},
    username: {type: String, unique: true, required: true, max: 20},
    password: {type: String, required: true},
    profile_picture: {type: String}
},{
    timestamps: true
})

const User = models.User || mongoose.model<UserI>('User',userSchema)
export default User;