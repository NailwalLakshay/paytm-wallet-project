import express from 'express';
import {prisma} from "@repo/db/client";



const app = express();

app.post("/hdfc-server", async (req,res)=>{

    const paymentInformation : {
        token : string,
        userId : string,
        amount : string
    } = {
        token : req.body.token,
        userId : req.body.user_identifier,
        amount : req.body.amount
    }

    try {
        await prisma.$transaction([
            prisma.balance.update({
                where : {
                    userId : Number(paymentInformation.userId)
                },
                data : {
                    amount : {
                        increment : Number(paymentInformation.amount)
                    }
                }
            }),
            prisma.onRampTransaction.update({
                where : {
                    userId : Number(paymentInformation.userId)
                },
                data : {
                    Status : "SUCCESS"
                }
            })
        ])   

        res.status(200).json({
            message : "Succesfully updated"
        })

    } catch (error) {
        res.status(411).json( { 
            message : "Error while processing the webhook"
        })
    }
        
})

app.listen(2000 , ()=>console.log('Server is running on port 2000'))