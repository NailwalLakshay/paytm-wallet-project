"use client"
import {TextInput} from "@repo/ui/textinput";
import {Select} from "@repo/ui/select";
import { useState } from "react";
import { redirect } from "next/dist/server/api-utils";
import { Button } from "@repo/ui/button";

export const Addmoney=()=>{

    const [amount , setAmount] = useState(0);
    const [redirectUrl , setRedirectUrl] = useState("");

    return (
        <div>
            <TextInput label="Amount" type="number" placeholder="$1000" onChange={setAmount} /> 
            
            <Select label="Bank" onSelect={ (value) => {
                setRedirectUrl(
                    options.find((option)=> option.value === value )?.redirectUrl || ""
                )
            }} options={options}/>

            <Button className="bg-black mt-4 text-white p-2 rounded-xl">Add Money</Button>
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