
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from 'next-auth/providers/google';
import bcrypt from "bcrypt";
import {prisma} from "@repo/db/client";

export const authOptions = ({
    providers: [
        CredentialsProvider({
            name : "Credentials",
            credentials : {
                email : {label : "email" , type : "text" , placeholder : "Lakshay@gmail.com"},
                password : {label : "password" , type:"password" , placeholder: ""}
            },

            async authorize(credentials : any){
                // db check for credentials
                const hashedPassword = await bcrypt.hash(credentials?.password , 10);
                
                const existingUser = await prisma.user.findFirst({
                    where: {
                        email : credentials.email
                    }
                });

                if(existingUser){

                    if(! await bcrypt.compare(credentials.password , existingUser.password)){
                        return null;
                    }
                    else{
                        return{
                            id : existingUser.id.toString(),
                            email : existingUser.email,
                        }
                    }
                }

                try {
                    const newUser = await prisma.user.create({
                        data : {
                            email : credentials.email,
                            password : hashedPassword
                        }
                    });
    
                    return {
                        id : newUser.id.toString(),
                        email : newUser.email
                    }
                } catch (error) {
                    console.log(error);
                }

                return null;
            }
        }),

        GoogleProvider({
            clientId : process.env.GOOGLE_CLIENT_ID!,
            clientSecret : process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    callbacks : {
        async session({session , token , user}:any){
            session.user.id = token.sub;
            return session;
        },
        
    },
    secret : process.env.NEXTAUTH_SECRECT!

})