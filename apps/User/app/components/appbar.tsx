"use client"
import { useRecoilState } from "recoil";
import { Button } from "@repo/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { BtnToggler } from "../store/recoil";

export const AppBar =  ()=>{
    const session = useSession();
    const [active, setActive] = useRecoilState(BtnToggler);
    return (
        <div id="top" className="p-4 flex justify-between border-b-2 items-center">
            <h1 className="text-xl font-bold text-blue-500">PayTM@IIT</h1>
            {
                session.data?.user ? 
                <div className="flex gap-3">
                            <div onClick={()=>{
                                setActive(!active);
                                }} className="sm:hidden block p-2 text-blue-500 border border-gray-400 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                    </svg>
                            </div>
                                <Button OnClick={signOut} className="p-2 min-w-24 bg-black text-white rounded-lg">Logout</Button>
                </div>
                                 : <Button OnClick={signIn} className="p-2 min-w-24 bg-black text-white rounded-lg">Login</Button>
            }
        </div>
    )
}