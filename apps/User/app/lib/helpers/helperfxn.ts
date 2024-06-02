"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "@repo/authoptions/auth";
import { prisma } from "@repo/db/client";

export const checkSessionOnserver = async()=>{
    const session = await getServerSession(authOptions);
    if(!session?.user){
       return null
    }
    return session;
}

export const p2pRecentTransaction = async( numberToShow? : number , skip? :number)=>{
    const session = await checkSessionOnserver();
    if(!session){
        return null;
    }
    try {
        const transfers = await prisma.p2P_TRANSFER.findMany({
            take : numberToShow,
            skip : skip,
            where : {
                OR : [
                    {fromUserId : parseInt(session?.user?.id)},
                    {toUserId : parseInt(session?.user?.id)},
                ],
            },
            orderBy: {
                startDate : "desc"
            }
        })
    
        return transfers
    } catch (error) {
        console.log(error);
        return null       
    }
}


export const UserBalance = async()=>{
    const session = await checkSessionOnserver();
    if(!session){
        return null;
    }

    try {
        const balance = await prisma.balance.findFirst({
            where : {
                userId : Number(session.user.id)
            },
            select : {
                amount : true,
                locked:true,
            }
        })
    
        return balance;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const UserDetails = async()=>{
    const session = await checkSessionOnserver();
    if(!session){
        return null;
    }   
    try {
        const user = await prisma.user.findFirst({
            where : {
                id : parseInt(session.user.id)
            }
        })
    
        return user
    
    } catch (error) {
        console.log(error);
        return null;  
    }
   
}


export const UserOnRampTransaction = async(numberToShow? : number)=>{
    
    const session = await checkSessionOnserver();
    if(!session){
        return null;
    }

    try {
        const transaction = await prisma.onRampTransaction.findMany({
            take : numberToShow,
            where : {
                userId : parseInt(session.user.id),
                Status : "PENDING"
            },
            select : {
                StartTime : true,
                amount : true,
                Status : true,
                Provider : true
            },
            orderBy : {
                StartTime : "desc"
            }
        })
    
        return transaction
    } catch (error) {
       console.log(error);
        return null; 
    }
}
export const UserAllOnRampTransaction = async(numberToShow? : number , skip? : number)=>{
    
    const session = await checkSessionOnserver();
    if(!session){
        return null;
    }

    try {
        const transaction = await prisma.onRampTransaction.findMany({
            take : numberToShow,
            skip : skip,
            where : {
                userId : parseInt(session.user.id),
            },
            select : {
                StartTime : true,
                amount : true,
                Status : true,
                Provider : true
            },
            orderBy : {
                StartTime : "desc"
            }
        })
    
        return transaction
    } catch (error) {
         console.log(error);
          return null;   
    }
}

export const removePendingTransaction = async()=>{

    const session = await checkSessionOnserver();
    if(!session){
        return null;
    }

    const transaction = await prisma.onRampTransaction.updateMany({
        where : {
            userId : parseInt(session.user.id),
            Status : "PENDING",
            StartTime : {
                lte : new Date(new Date().getTime() - 1000*60*60*2)
            }
        },
        data : {
            Status : "FAILED"
        }
    })
    return transaction
}