"use client"

import { P2P_Transaction } from "../../components/p2pTransaction";
import { SendMoney } from "../../components/sendmoney";
import { useRecoilValue } from "recoil";
import { BalanceToggler} from "../../store/recoil";
import { Card } from "@repo/ui/card";
import { Loader } from "../../components/loader";
import { useEffect, useState } from "react";
import { p2pRecentTransaction } from "../../lib/helpers/helperfxn";

export default function() {

    const [txn , setTxn] = useState<{
        id: number;
        startDate: Date;
        amount: number;
        fromUserId: number;
        toUserId: number;
        status: string;
    }[]>([]);
    
    const [isLoading , setIsLoading] = useState(true);
    const toggler = useRecoilValue(BalanceToggler);

    useEffect(()=>{
        setIsLoading(true);
        p2pRecentTransaction(4).then((res)=>{
            if(res) setTxn(res);
            setIsLoading(false);
        })
    } , [toggler]);

    return(
    <div className="w-full p-4 mt-10 ">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <SendMoney />
            <Card title="P2P Recent Transfers">
                { isLoading ? <div className="flex flex-col gap-2">
                        <Loader classname="w-full"/>
                        <Loader classname="w-full"/>
                        <Loader classname="w-full"/>
                    </div> : 
                <P2P_Transaction classname="h-[400px] overflow-x-hidden " transaction={txn} label="No Recent Transfers" />
                }
            </Card>
        </div>
    </div>
    )
}

 