"use client"

import { P2P_Transaction } from "../../components/p2pTransaction";
import { SendMoney } from "../../components/sendmoney";
import { redirect } from "next/navigation";
import { p2pRecentTransaction } from "../../lib/helpers/helperfxn";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { p2pRecentTransactionFactor } from "../../store/recoil";


export default function() {

    const numberToShow : number = 5;
    const callDone = useRecoilValue(p2pRecentTransactionFactor);
    const [transfers , setTransfers] = useState<{
        id: number;
        startDate: Date;
        amount: number;
        fromUserId: number;
        toUserId: number;
        status : string
    }[]>([]);

    useEffect(()=>{
        p2pRecentTransaction(numberToShow).then((res)=>{
            if(res) setTransfers(res)
            else redirect("/api/auth/signin");
        })
    },[callDone])

    return(
    <div className="w-full p-4 mt-10">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <SendMoney />
            <P2P_Transaction classname="h-[400px] overflow-x-hidden " transaction={transfers} label="No Recent Transfers" />
        </div>
    </div>
    )
}

 