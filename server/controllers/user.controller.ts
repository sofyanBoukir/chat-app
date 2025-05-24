import { Response } from "express"
import { IsAuthenticatedRequest } from "../isAuth.middleware"
import User, { UserI } from '../models/user.model'
import bcrypt from 'bcrypt'
import path from "path"
import fs from 'fs'

export const searchUsers = async (request: IsAuthenticatedRequest, response: Response) => {
    try {
        const userId: string = request.user.id;
        const { query } = request.query;
    
        if (!query || typeof query !== 'string') {
                return response.status(400).json({
                message: 'Query is required and must be a string',
                });
        }
    
        const users = await User.find(
            {
                _id: { $ne: userId },
                $or: [
                    { name: { $regex: query, $options: 'i' } },
                    { username: { $regex: query, $options: 'i' } },
                ],
            },
            {
                password: 0, 
            }
        );
    
        return response.status(200).json({
            users
        });
    } catch {
        
        return response.status(500).json({
            message: 'Failed to search users',
        });
    }
  };


export const updateUserData = async (request: IsAuthenticatedRequest, response: Response) =>{
    try{
        const { username, name, oldPassword, newPassword } = request.body;
        const userId: string = request.user.id;
        
        const user:UserI | null = await User.findById(request.user.id);
        if(!user){
            return response.status(404).json({
                message: 'User not found'
            })
        }

        if (newPassword) {
            const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
            if (!isPasswordMatch) {
            return response.status(400).json({ 
                message: 'Old password is incorrect' 
            });
            }
            user.password = await bcrypt.hash(newPassword, 10);
        }
    
        if (username && username !== user.username) {
            const usernameExists = await User.findOne({ _id: { $ne: userId }, username });
            if (usernameExists) {
                return response.status(400).json({ 
                    message: 'Username already exists' 
                });
            }
            user.username = username;
        }
    
        if (name) {
            user.name = name;
        }
    
        if (request.file) {
            if (user.profile_picture) {
                const oldImagePath = path.join(__dirname, '../public', user.profile_picture);
                fs.unlink(oldImagePath, (err) => {
                    if (err) {
                        console.error('Failed to delete old profile picture:', err);
                    }
                });
            }

            user.profile_picture = `/uploads/profiles/${request.file.filename}`;
        }

        await user.save();

        return response.json({ message: 'Profile data updated successfully' });
    }catch{
        return response.status(500).json({ 
            message: 'Failed to updated userdata' 
        });
    }
}