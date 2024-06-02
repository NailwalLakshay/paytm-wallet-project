"use client";

import { Card } from "@repo/ui/card";
import { useRecoilValue } from "recoil";
import { BalanceData, UserDetailsStore } from "../store/recoil";
import { Loader } from "../components/loader";

export default function (){

    const Balance = useRecoilValue(BalanceData);
    const user = useRecoilValue(UserDetailsStore);

    return(
        <div className="p-4 flex flex-col gap-10 mt-10 ">
            
            <div>
                <h1 className="font-bold text-4xl mt-10 text-blue-500">Paytm@IIT Dashboard</h1>
            </div>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 ">
                <Card title="Available Balance " classname="bg-gray-100 rounded-lg ">
                 {Balance?.amount >=0 ?   <div>
                        Rs {Balance?.amount}
                    </div>:
                    <Loader classname="w-full"/>}
                
                </Card>
                <Card title="Account Details" classname="bg-gray-100 rounded-lg ">
                
                    <div>
                        <h1 className="flex flex-col">
                        <p className="font-semibold">Account Number</p>
                        { user?.accountNumber !== "" ? 
                        <p>{user?.accountNumber}</p> : <Loader classname="w-full" />}
                        </h1>
                        <h1 className="flex flex-col">
                            <p className="font-semibold">Email Id</p>
                            {user?.email !== "" ? user?.email : <Loader classname="w-full"/>}
                        </h1>
                    </div>
                
                </Card>
            </div>
        </div>
    )
}
