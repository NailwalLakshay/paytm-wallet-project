
"use client";

import { Transaction } from "../../components/transaction";
import { P2P_Transaction } from "../../components/p2pTransaction";
import { useRecoilState} from "recoil";
import { getNextOnRampTxn, getNextP2pTxn, isLoadingAllOnRamp, isLoadingAllP2p } from "../../store/recoil";
import { Button } from "@repo/ui/button";
import { Loader } from "../../components/loader";
import { useEffect, useState } from "react";
import { p2pRecentTransaction, UserAllOnRampTransaction } from "../../lib/helpers/helperfxn";

export default function(){

    const [OnRampPtr , setOnRampPtr] = useRecoilState(getNextOnRampTxn);
    const [P2pTxnPtr , setP2pTxnPtr] = useRecoilState(getNextP2pTxn);

    const [isLoadingOnRamp , setIsLoadingOnRamp] = useRecoilState(isLoadingAllOnRamp);
    const [isLoadingP2p , setIsLoadingP2p] = useRecoilState(isLoadingAllP2p);

    const [txn , setTxn] = useState<{
        amount: number;
    Provider: string;
    Status: string;
    StartTime: Date;
    }[]>([]);

    const [tsx , setTsx] = useState<{id: number;
        startDate: Date;
        amount: number;
        fromUserId: number;
        toUserId: number;
        status: string;}[]>([]);

    useEffect(()=>{
        setIsLoadingOnRamp(true);
        UserAllOnRampTransaction(11 , OnRampPtr ).then((res)=>{
            if(res) setTxn(res);
            setIsLoadingOnRamp(false);
        })
    } , [OnRampPtr]);

    useEffect(()=>{
        setIsLoadingP2p(true);
        p2pRecentTransaction(11 , P2pTxnPtr).then((res)=>{
            if(res) setTsx(res);
            setIsLoadingP2p(false);
        })
    } , [P2pTxnPtr]);

    return(
        <div className="grid grid-cols-1 gap-10 p-4 w-full ">
            <div>
                <div className="font-bold text-4xl mt-10 text-blue-500">
                    <h1>OnRamp Transactions</h1>
                </div>
                <div>
                    {isLoadingOnRamp ? <div className="flex flex-col gap-2">
                        <Loader classname="w-full p-2.5"/>
                        <Loader classname="w-full p-2.5"/>
                        <Loader classname="w-full p-2.5"/>
                        <Loader classname="w-full p-2.5"/>
                        <div className="flex gap-2">
                            <Loader classname="w-[60px] p-4"/>
                            <Loader classname="w-[60px] p-4"/>
                        </div>
                    </div> : 
                    <div>
                    <Transaction label="" transaction={txn} classname="w-full"  />
                        <div className=" flex gap-2">
                        { <Button disabled={OnRampPtr<10} OnClick={()=>{
                            setOnRampPtr(OnRampPtr-10);
                        }} className="bg-black text-white p-2 rounded-lg">Prev</Button>}
                        { <Button disabled={txn.length < 10 } OnClick={()=>{
                            setOnRampPtr(OnRampPtr+10);
                        }}className="bg-black text-white p-2 rounded-lg">Next</Button>}
                        </div>
                    </div>
                    }
                </div>
            </div>
            <div>
                <div className="font-bold text-4xl mt-10 text-blue-500">
                    <h1>P2P Transactions</h1>
                </div>
                <div>{
                    isLoadingP2p ? <div className="flex flex-col gap-2">
                    <Loader classname="w-full "/>
                    <Loader classname="w-full "/>
                    <Loader classname="w-full "/>
                    <Loader classname="w-full"/>
                    <div className="flex gap-2">
                        <Loader classname="w-[60px]"/>
                        <Loader classname="w-[60px]"/>
                    </div>
                </div> : 
                    <div>
                        <P2P_Transaction classname="" label="" transaction={tsx} />
                        <div className="flex gap-2">
                        { <Button disabled={P2pTxnPtr<10} OnClick={()=>{
                            setP2pTxnPtr(P2pTxnPtr-10);
                        }} className="bg-black text-white p-2 rounded-lg">Prev</Button>}
                        { <Button disabled={tsx.length < 10} OnClick={()=>{
                            setP2pTxnPtr(P2pTxnPtr+10);
                        }} className="bg-black text-white p-2 rounded-lg">Next</Button>}
                        </div>
                    </div>
                }
                </div>
            </div>
        </div>
    )
}