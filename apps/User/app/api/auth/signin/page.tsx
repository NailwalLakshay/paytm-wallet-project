"use client"

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import { signIn , useSession} from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";
import { userLoginSchema } from "@repo/zodtypes/types";
import {useRouter , redirect} from "next/navigation";

const validate = (email : string , password : string) => {
    const res = userLoginSchema.safeParse({email : email , password :password })    
    return res
}

export default function(){

    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const Router = useRouter();

    const session = useSession();
    if(session?.status === "authenticated"){
        return redirect("/dashboard");
    }

    return(

        <div className="grid min-h-[80vh] place-items-center  ">
            <Card classname="sm:w-[500px] md:w-[700px] w-[300px] p-10 border" title="SignUp or Login">
                <div className="flex flex-col gap-4">
                    <TextInput type="email" label="Email" placeholder="Enter your email" onChange={(value)=>{
                        setEmail(value);
                    }}/>

                    <TextInput type="password" label="Password" placeholder="Enter your password" onChange={(value)=>{
                        setPassword(value);
                    }}/>    
                    
                    <Button OnClick={async()=>{
                        const check = validate(email , password);
                        if(!check.success){
                            const res = JSON.parse(check.error.message);
                            toast.error( res[0].message)
                            return;
                        };
                        
                        const loadingId = toast.loading("Processing | Please Wait");
                        
                        signIn("credentials" , {
                            email : email,
                            password : password,
                            redirect : false
                        }).then((res)=>{
                            toast.dismiss(loadingId);
                            if(!res?.error){
                                new Promise((Res)=> setTimeout(Res , 1000)).then(()=>{
                                    return Router.push("/dashboard");
                                })
                            }
                            else{
                                toast.error("Not Authorised | Invalid Credentials" , {duration : 3000})
                            }
                        })
                        
                        
                    }} className="bg-black w-fit rounded-lg text-white p-2" > 
                        Proceed Now
                    </Button>

                </div>
            </Card>
            <Toaster position="bottom-right"/>
        {/* </div> */}
    </div>
    )
}