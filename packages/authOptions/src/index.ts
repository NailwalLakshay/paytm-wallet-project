
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from 'next-auth/providers/google';
import bcrypt from "bcrypt";
import {prisma} from "@repo/db/client";
// import { PrismaAdapter } from "@auth/prisma-adapter";
// const PrismaAdapter = require("@auth/prisma-adapter").PrismaAdapter;

// const {PrismaAdapter} = require(`@auth/prisma-adapter`);

export const authOptions = ({
    // adapter : PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name : "Credentials",
            credentials : {
                email : {label : "email" , type : "text" , placeholder : "Lakshay@gmail.com"},
                password : {label : "password" , type:"password" , placeholder: ""}
            },

            async authorize(credentials : any){

                // console.log("nextauth-url : ", process.env.NEXTAUTH_URL)
                // db check for credentials
                const hashedPassword = await bcrypt.hash(credentials.password , 10);
                
                const existingUser = await prisma.user.findFirst({
                    where: {
                        email : credentials.email
                    }
                });

                if(existingUser){

                    if(!await bcrypt.compare(credentials.password , existingUser.password)){
                        return null;
                    }
                    else{
                        return{
                            ...existingUser , id : existingUser.id.toString()
                        }
                    }
                }

                try {
                    const newUser = await prisma.user.create({
                        data : {
                            email : credentials.email,
                            password : hashedPassword
                        }
                    }) || 0;

                    const newBalanceEntry = newUser && await prisma.balance.create({
                        data : {
                            amount : 0,
                            locked : 0,
                            userId : newUser.id
                        }
                    })
    
                    return {
                        ...newUser ,  
                        id : newUser.id.toString(),
                    }
                } catch (error) {
                    console.log(error);
                }

                return null;
            }
        }),

        // GoogleProvider({
        //     clientId : process.env.GOOGLE_CLIENT_ID!,
        //     clientSecret : process.env.GOOGLE_CLIENT_SECRET!
        // })
    ],
    callbacks : {
        async session({session , token , user}:any){     
            session.user.id = token.sub
            console.log(session)       
            return session 
        },

        async redirect({url , baseUrl} : any){
            return baseUrl;
        }    
    },
    secret : process.env.NEXTAUTH_SECRECT || "secret",
    

})
