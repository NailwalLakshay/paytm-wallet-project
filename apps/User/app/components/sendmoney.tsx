"use client"

import { Button } from "@repo/ui/button"
import { Card } from "@repo/ui/card"
import { TextInput } from "@repo/ui/textinput"
import { useState } from "react"
import { P2P_Transfer } from "../lib/actions/p2pTransfer"

export const SendMoney = ()=>{
    const [toUser , setToUser] = useState("");
    const [amount , setAmount] = useState(0);
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
                    <Button OnClick={async()=>{
                        // we will do something later
                        // server action
                        const response = await P2P_Transfer(amount , toUser);
                        console.log(response);
                        
                    }} className="bg-black mt-2 text-white p-2 rounded-lg">Proceed</Button>
                </div>
            </Card>
        </div>
    )
}