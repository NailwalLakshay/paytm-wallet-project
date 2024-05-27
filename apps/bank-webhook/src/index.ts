import express from 'express';
import {prisma} from "@repo/db/client";



const app = express();

app.post("/hdfc-server", (req,res)=>{

        

})

app.listen(2000 , ()=>console.log('Server is running on port 2000'))