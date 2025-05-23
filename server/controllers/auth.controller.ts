import User from "../models/user.model";
import { Request, Response } from "express";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { IsAuthenticatedRequest } from "../isAuth.middleware";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const register = async (request: Request, response: Response) =>{
    try{
        const { name, username, password }: { name: string, username: string, password: string} = request.body;
        const userExists = await User.findOne({username: username});
        
        if(userExists){
            return response.status(401).json({
                'message' : 'User with this username is already exists'
            }) 
        }

        const hashedPassword: string = await bcrypt.hash(password,10);
        const newUser = new User({
            name,username,
            password: hashedPassword
        });
        await newUser.save();
        return response.json({
            'message' : 'Registred successfully!'
        })

    }catch{
        return response.status(500).json({
            'message' : 'Internal server error'
        })
    }
}

export const login = async (request: Request, response: Response) =>{
    try{
        const { username, password }: { username: string, password: string} = request.body;
        const user = await User.findOne({username})

        if(user){
            const comparePasswords = await bcrypt.compare(password,user.password)

            if(!comparePasswords){
                return response.status(401).json({
                    'message' : 'username or password incorrect'
                })
            }

            const payload = {
                id: user._id,
                username: user.username,
            };
        
            const token = jwt.sign(payload,
                JWT_SECRET,
                { expiresIn: '2h' });
        
            response.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 24 * 60 * 60 * 1000, 
            });
        
            return response.status(200).json({ 
                message: 'Login successful' 
            });
        }

        if (!user) {
            return response.status(401).json({
                message: 'Invalid username or password'
            });
        }
    }catch{
        return response.status(500).json({
            'message' : 'Internal server error'
        })
    }
}

export const me = async (request: IsAuthenticatedRequest,response: Response) =>{
    try {
        const userData = request.user;
        const user = await User.findById(userData.id);
        const userToObject = user.toObject();
        delete userToObject.password;
        return response.status(200).json({ user: userToObject });
    } catch {
        return response.status(500).json({ 
            message: 'Server error' 
        });
    }
}