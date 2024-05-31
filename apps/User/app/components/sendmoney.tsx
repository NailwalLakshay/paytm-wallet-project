"use client"

import { Button } from "@repo/ui/button"
import { Card } from "@repo/ui/card"
import { TextInput } from "@repo/ui/textinput"
import { useState } from "react"
import { P2P_Transfer } from "../lib/actions/p2pTransfer"
import toast from "react-hot-toast"
import { useRecoilState } from "recoil"
import { p2pRecentTransactionFactor } from "../store/recoil"

export const SendMoney = ()=>{

    const [toUser , setToUser] = useState("");
    const [amount , setAmount] = useState(0);

    const [test , setTest] = useRecoilState(p2pRecentTransactionFactor)

    return (
        <div className="w-full">
            <Card title="Send Money">
                <div className="">

                    <TextInput type="string" label="Email" placeholder="l@g.com" onChange={(value)=>{
                        setToUser(value)
                    }}/>

                    <TextInput type="number" label="Amount" placeholder="1000" onChange={(value)=>{
                        setAmount(parseInt(value))
                    }}/>

                    <Button OnClick={()=>{
                        toast.loading("Processing Transaction || Please Wait..." , {duration : 2000});
                        P2P_Transfer(amount , toUser).then((response)=>{
                            if (response.message === "success"){
                                toast.success(`${response.message}` , {duration : 2000});
                            }
                            else {
                                toast.error(`${response.message}`,{duration : 2000});
                            }
                            setTest(!test);
                        });
                    }} className="bg-black mt-2 text-white p-2 rounded-lg">Proceed</Button>
                </div>
            </Card>
        </div>
    )
}