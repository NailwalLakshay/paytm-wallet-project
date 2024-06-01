"use client"
import { Card } from "@repo/ui/card";
import { Addmoney } from "../../components/addmoney";
import { Balance } from "../../components/balance";
import { Transaction } from "../../components/transaction";
import { useEffect, useState } from "react";
import { UserBalance, UserOnRampTransaction } from "../../lib/helpers/helperfxn";
import { useRecoilValue } from "recoil";
import { onRampTxn } from "../../store/recoil";


export default function(){

    const [balance , setBalance] = useState<{
        amount : number,
        locked : number
    }>({
        amount : 0,
        locked : 0
    });

    const onRampCheck = useRecoilValue(onRampTxn);

    const [transaction , setTransaction] = useState<{
        amount: number;
        Provider: string;
        Status: string;
        StartTime: Date;
    }[]>([])

    const numberToShow = 3;

    useEffect(()=>{
        UserBalance().then((res)=>{
            if(res) setBalance(res);
        })
    } , [])

    useEffect(()=>{

        UserOnRampTransaction(numberToShow).then((res)=>{
            if(res) setTransaction(res)
        })

    } , [onRampCheck])


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
                            <Balance amount={balance?.amount || 0} locked= {balance?.locked || 0} decimal={1} />    
                        </Card>   
                    </div>    
                    <div>
                    <Card title="Pending Transaction">
                        <Transaction classname="" label={"No Pending Transaction"} transaction={transaction} />    
                    </Card>      
                    </div>    
                </div>    
            </div>  
        </div>
    )
}
