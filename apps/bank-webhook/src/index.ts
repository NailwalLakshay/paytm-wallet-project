import express from 'express';
import {prisma} from "@repo/db/client";
import cors from "cors";

const app = express();
app.use(cors({
    origin :[ "https://mybank.lakshaynailwaldevs.top" , "http://localhost:4000"],
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}))

app.use(express.json());

app.post("/", async (req,res)=>{

    const paymentInformation : {
        token : string,
        userId : string,
        amount : string
    } = {
        token : req.body.token,
        userId : req.body.userId,
        amount : req.body.amount
    }

    // console.log(paymentInformation)

    if(!paymentInformation.token || !paymentInformation.userId || !paymentInformation.amount){
        return res.status(400).json({
            message : "Invalid data"
        })
    }

    try {
        await prisma.$transaction(async (tx : any)=>{
            
            await tx.balance.update({
                where : {
                    userId : parseInt(paymentInformation.userId)
                },
                data : {
                    amount : {
                        increment : parseInt(paymentInformation.amount)
                    }
                }
            }).catch((err : any)=>{
                console.log(err)
                throw err;
            })
            
            const txn = await tx.onRampTransaction.updateMany({
                where : {
                    AND : [
                        {token : (paymentInformation.token)},
                        {userId : parseInt(paymentInformation.userId)},
                        {amount : parseInt(paymentInformation.amount)},
                        {Status : "PENDING"}
                    ]
                },
                data : {
                    Status : "SUCCESS"
                }
            }).catch((err:any)=>{
                console.log(err)
                throw err;
            })

            // even when not matched on db the above call may not throw error but simply say txn.count = 0
            if(txn.count === 0){
                throw new Error("Transaction Failed")
            }
        }   
    )

    return res.status(200).json({
        message : "Succesfully updated"
    })

    } catch (error) {
        // await prisma.onRampTransaction.update({
        //     where : {
        //         token : paymentInformation.token
        //     },
        //     data : {
        //         Status : "FAILED"
        //     }
        // })
        res.status(411).json( { 
            message : "Error while processing the webhook"
        })
    }
    
        
})

app.listen(2000 , ()=>console.log('Server is running on port 2000'))