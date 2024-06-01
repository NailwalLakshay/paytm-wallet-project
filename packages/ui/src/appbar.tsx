"use client"
import { Button } from "./button";
import { signIn, signOut, useSession } from "next-auth/react";

export const AppBar =  ()=>{
    const session = useSession();
    return (
        <div className="p-4 flex justify-between border-b-2 items-center">
            <h1 className="text-xl font-bold text-blue-500">PayTM@IIT</h1>
            {
                session.data?.user ? <Button OnClick={signOut} className="p-2 min-w-24 bg-black text-white rounded-lg">Logout</Button> : <Button OnClick={signIn} className="p-2 min-w-24 bg-black text-white rounded-lg">Login</Button>
            }
        </div>
    )
}