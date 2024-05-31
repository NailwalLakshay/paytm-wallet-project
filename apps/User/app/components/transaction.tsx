
import { checkStatusIcon } from "./p2pTransaction"

export const Transaction = ({transaction , label , classname} : {
    transaction : {
        StartTime : Date,
        amount : number,
        Status : string,
        Provider : string
    }[]    ,
    label : string,
    classname : string
})=>{

    if(transaction.length == 0){
        return (
            <div>
                {label}
            </div>
        )
    }

    
    return (

        <div className= {classname}>
            {transaction.map((item)=>{
                return <div className="flex justify-between mb-2 ">
                    <div>
                        <h1 className="flex gap-1"> { 
                            checkStatusIcon(item.Status)
                        }Received INR</h1>
                        <h1>{item.StartTime.toDateString()}</h1>
                    </div>
                    <div className="text-xl">+Rs {item.amount}</div>
                </div>
            })}
        </div>
    )

}