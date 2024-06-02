"use client"
import {TextInput} from "@repo/ui/textinput";
import {Select} from "@repo/ui/select";
import { useState } from "react";
import { Button } from "@repo/ui/button";
import { OnRampTransactionAction } from "../lib/actions/onRampTransactionAction";
import toast from "react-hot-toast";
import { onRampTxnSchema } from "@repo/zodtypes/types";

const url = "https://mybank.lakshaynailwaldevs.top";

export const Addmoney=()=>{

    const [amount , setAmount] = useState(0);
    const [redirectUrl , setRedirectUrl] = useState(options[0]?.redirectUrl || "");
    const [provider , setProvider] = useState(options[0]?.value || "")

    return (
        <div>
            <TextInput label="Amount" type="number" placeholder="RS 1000" onChange={(value)=>{
                setAmount(parseInt(value))
            }} /> 
            
            <Select label="Bank" onSelect={ (value) => {
                setRedirectUrl(
                    options.find((option)=> option.value === value )?.redirectUrl || ""
                )
                setProvider(options.find((option)=> option.value === value)?.value || "")

            }} options={options}/>

            <Button OnClick={()=>{

                const res = onRampTxnSchema.safeParse({amount , provider});
                let tokenId = toast.loading("Please Wait...");
                if(!res.success){
                    toast.dismiss(tokenId);
                    return toast.error(JSON.parse(res.error.message)[0].message , {duration : 1000});
                }

                OnRampTransactionAction(amount , provider).then((res)=>{
                    toast.dismiss(tokenId);
                    if(res.data){
                        if(redirectUrl === url){
                            window.location.href = `${redirectUrl}?token=${res.data}`
                        }   
                        else 
                            window.location.href = redirectUrl ;
                    }
                    else{
                        toast.error(res.message , {duration : 4000})
                    }
                });

            }} className="bg-black mt-4 text-white p-2 rounded-xl">Add Money</Button>
        </div>
    )
}

const options = [
    {
        key : "My Local Bank",
        value : "My Local Bank",
        redirectUrl : url
    },
    {
        key : "HDFC BANK",
        value : "HDFC BANK",
        redirectUrl : "https://netbanking.hdfcbank.com"
    },
    {
        key : "AXIS BANK",
        value : "AXIS BANK",
        redirectUrl:"https://www.axisbank.com/"
    },
]
