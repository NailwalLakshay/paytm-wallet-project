"use client"
import {TextInput} from "@repo/ui/textinput";
import {Select} from "@repo/ui/select";
import { useState } from "react";
import { Button } from "@repo/ui/button";
import { OnRampTransactionAction } from "../lib/actions/onRampTransactionAction";
import toast from "react-hot-toast";
import { useRecoilState} from "recoil";
import { onRampTxn } from "../store/recoil";

export const Addmoney=()=>{

    const [amount , setAmount] = useState(0);
    const [redirectUrl , setRedirectUrl] = useState(options[0]?.redirectUrl || "");
    const [provider , setProvider] = useState(options[0]?.value || "")

    const [onRampCheck , setOnRampCheck] =  useRecoilState(onRampTxn);

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
                OnRampTransactionAction(amount , provider).then((res)=>{
                    if(res.message != "fail"){
                        toast.loading("Transfering to Bank Redirect Url || Please Wait..." , {duration : 4000});
                        setOnRampCheck(!onRampCheck);
                        window.open(redirectUrl || "" , "_blank")
                    }
                    else{
                        toast.error("Transaction failed || Please retry after some time" , {duration : 4000})
                    }
                });

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