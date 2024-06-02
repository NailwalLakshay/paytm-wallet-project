"use client"


import { useRecoilValue } from "recoil";
import { UserDetailsStore } from "../store/recoil";

const checkStatusIcon = ( status : string )=>{

    if( status === "PENDING") return <div className="text-gray-500 font-bold">
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
  </svg>
    </div>

    else if (status === "FAILED") return <div className="text-red-700 font-bold">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>
    </div>

    else return <div className="text-green-500 font-bold">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
</svg>
    </div>

  
}


export const P2P_Transaction = ({transaction , label , classname , flag} : {
    transaction : {
        id: number;
        startDate: Date;
        amount: number;
        fromUserId: number;
        toUserId: number;
        status: string
    }[],
    label : string,
    classname? : string,
    flag? : boolean
})=>{

    const userId = useRecoilValue(UserDetailsStore).id;

    if(transaction.length == 0){
        return <div>
                {label}
            </div>
    }

    return (
        <div className="flex flex-col gap-4">

            <div className={`${classname}`} >
                
                {transaction.map((item)=>{
                    return <div key={item.id} className="flex justify-between mb-2 ">
                    <div>
                        <h1 className="flex gap-1"> { 
                            checkStatusIcon(item.status)
                        }Received INR</h1>
                        <h1>{item.startDate.toDateString()}</h1>
                    </div>
                    <div className="text-xl">{ (item.fromUserId === userId) ? "-": "+" }Rs {item.amount}</div>
                </div>
                })}
            </div>
        </div>
    )
}