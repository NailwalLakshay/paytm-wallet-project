"use client"
import {TextInput} from "@repo/ui/textinput";
import {Select} from "@repo/ui/select";
import { useState } from "react";
import { Button } from "@repo/ui/button";
import { OnRampTransactionAction } from "../lib/actions/onRampTransactionAction";

export const Addmoney=()=>{

    const [amount , setAmount] = useState(0);
    const [redirectUrl , setRedirectUrl] = useState(options[0]?.redirectUrl || "");
    const [provider , setProvider] = useState(options[0]?.value || "")

    return (
        <div>
            <TextInput label="Amount" type="number" placeholder="$1000" onChange={(value)=>{
                setAmount(parseInt(value))
            }} /> 
            
            <Select label="Bank" onSelect={ (value) => {
                setRedirectUrl(
                    options.find((option)=> option.value === value )?.redirectUrl || ""
                )
                setProvider(options.find((option)=> option.value === value)?.value || "")

            }} options={options}/>

            <Button OnClick={()=>{
                OnRampTransactionAction(amount , provider);
                window.location.href = redirectUrl || "";
            }} className="bg-black mt-4 text-white p-2 rounded-xl">Add Money</Button>
        </div>
    )
}

const options = [
    {
        key : "HDFC BANK",
        value : "HDFC BANK",
        redirectUrl : "https://netbanking.hdfcbank.com"
    },
    {
        key : "AXIS BANK",
        value : "AXIS BANK",
        redirectUrl:"https://www.axisbank.com/"
    }
]