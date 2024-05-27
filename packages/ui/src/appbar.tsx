import { Button } from "./button";

import { getServerSession } from "next-auth";
export const AppBar = async ()=>{
    const session = await getServerSession();
    return (
        <div className="p-4 flex justify-between border-b-2 items-center">
            <h1 className="text-xl font-bold">PayTM@IIT</h1>
            {
                session ? <Button fxn="logout" className="p-2 min-w-24 bg-black text-white rounded-lg">Logout</Button> : <Button fxn="signin" className="p-2 min-w-24 bg-black text-white rounded-lg">Login</Button>
            }
        </div>
    )
}