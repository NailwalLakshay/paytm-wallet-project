"use client"

import { P2P_Transaction } from "../../components/p2pTransaction";
import { SendMoney } from "../../components/sendmoney";
import { useRecoilValue } from "recoil";
import { isLoadingPendingP2p, PendingP2pTxn } from "../../store/recoil";
import { Card } from "@repo/ui/card";
import { Loader } from "../../components/loader";


export default function() {

    const transfers = useRecoilValue(PendingP2pTxn);
    const isLoading = useRecoilValue(isLoadingPendingP2p);

    return(
    <div className="w-full p-4 mt-10">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <SendMoney />
            <Card title="P2P Recent Transfers">
                { isLoading ? <div className="flex flex-col gap-2">
                        <Loader classname="w-full"/>
                        <Loader classname="w-full"/>
                        <Loader classname="w-full"/>
                    </div> : 
                <P2P_Transaction classname="h-[400px] overflow-x-hidden " transaction={transfers} label="No Recent Transfers" />
                }
            </Card>
        </div>
    </div>
    )
}

 