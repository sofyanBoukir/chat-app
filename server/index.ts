import express from 'express'
import dotenv from 'dotenv';
import { Request,Response } from 'express';
dotenv.config();

const app = express();

app.get('/get/:name',(request: Request, response: Response) =>{
})



const PORT = process.env.PORT || 5000;
app.listen(PORT,() =>{
    console.log(`server is listenning on port: ${PORT}`);
})