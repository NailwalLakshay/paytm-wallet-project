"use client"
import { Card } from "@repo/ui/card";
import { Addmoney } from "../../components/addmoney";
import { Balance } from "../../components/balance";
import { Transaction } from "../../components/transaction";
import { useRecoilState, useRecoilValue } from "recoil";
import { BalanceData, isLoadingPendingOnRamp } from "../../store/recoil";
import { Loader } from "../../components/loader";
import { useEffect, useState } from "react";
import { UserOnRampTransaction } from "../../lib/helpers/helperfxn";


export default function(){

    const balance = useRecoilValue(BalanceData);

    const [txn , setTxn] = useState<{
        amount: number;
        Provider: string;
        Status: string;
        StartTime: Date;
    }[]>([]);

    const [isLoading , setIsLoading ] = useRecoilState(isLoadingPendingOnRamp);
    useEffect(()=>{
        setIsLoading(true);
        UserOnRampTransaction(4).then((res)=>{
            if(res) setTxn(res);
            setIsLoading(false);
        })
    } , []);


    return(
        <div className="p-4 w-full flex flex-col gap-10">
            <div className="font-bold text-4xl mt-10 text-blue-500">
                <h1>PayTM@IIT WALLET</h1>
            </div>          
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div >
                    <Card title="Add Money"> 
                        <Addmoney/>
                    </Card>
                </div>    
                <div>
                    <div>
                        <Card title="Balance">
                            {balance.amount < 0 ? <div className="flex flex-col gap-2">
                        <Loader classname="w-full p-4"/>
                        <Loader classname="w-full p-4"/>
                        <Loader classname="w-full p-4"/>
                    </div> : 
                            <Balance amount={balance?.amount || 0} locked= {balance?.locked || 0} decimal={1} />    
                            }
                            </Card>   
                    </div>    
                    <div>
                    <Card title="Pending Transaction">
                        {isLoading ? <div className="flex flex-col gap-2">
                        <Loader classname="w-full"/>
                        <Loader classname="w-full"/>
                        <Loader classname="w-full"/>
                    </div> : 
                        <Transaction classname="" label={"No Pending Transaction"} transaction={txn} />    
                        }
                    </Card>      
                    </div>    
                </div>    
            </div>  
        </div>
    )
}
