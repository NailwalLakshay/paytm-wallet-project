import { prisma } from '@repo/db/client';
import express from 'express';
import {v4 as uuidv4} from "uuid";
import cors from "cors";

const app = express();
app.use(cors({
    origin : ["https://bankwebhook.lakshaynailwaldevs.top" , "http://localhost:2000"],
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(express.json());
app.set("view engine" , "ejs")

app.get("/" , async (req,res)=>{
    const token = req.query.token?.toString() ||  "";
    
    if(token == ""){
        return res.json({message : "Invalid Access" , status : 400});
    }

    try {
        const userEntry = await prisma.token.findFirst({
            where : {
                token : token,
                status : "PENDING"
            }
        })
        res.render("index.ejs" , {token , userId : userEntry?.userId , amount : userEntry?.amount , status : "Processeing"})
    } catch (error) {
        res.render("index.ejs" , {token , userId : "" , amount : "" , status : "Processed"})
    }
})

app.post("/genToken" , async(req,res)=>{
    const amount = req.body.amount;
    const userId = req.body.userId;

    if(!amount || !userId){
        res.status(400).json({error : "Invalid data" , status : 400});
    }

    try {
        const token = uuidv4();
        const newTokenEntry = await prisma.token.create({
            data : {
                token : token,
                amount : parseInt(amount),
                userId : parseInt(userId),
                status : "PENDING"
            }
        })
    res.status(200).json({data : token , status : 200})
    } catch (error) {
        res.status(500).json({error : "Internal Server Error" , status : 500});
    }
})


app.listen(4000 , ()=>{
    console.log("Server is running on port 4000")
});