import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export interface IsAuthenticatedRequest extends Request{
    user?: any,
    file?:{
        filename: string,
    }
}

const JWT_SECRET = process.env.JWT_SECRET;
export const isAuthenticated = (request: IsAuthenticatedRequest, response: Response,
    next: NextFunction
) => {
    try{
        const token: string = request.cookies.token;
        
        if(!token){
            return response.status(401).json({ 
                message: 'Invalid or expired token' 
            });
        }

        const decoded = jwt.verify(token,JWT_SECRET);
        request.user = decoded
        next();
    }catch{
        return response.status(401).json({ 
            message: 'Invalid or expired token' 
        });
    }
}