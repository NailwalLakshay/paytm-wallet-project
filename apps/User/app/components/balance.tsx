export const Balance = ({amount , locked , decimal} : {
    amount : number,
    locked : number,
    decimal : number
})=>{
    return(
        <div>

            <div className="flex  justify-between border-b mb-2">
                <h1>
                    Unlocked Balance
                </h1>
                <div>
                    {amount / decimal} INR
                </div>
            </div>
            <div className="flex  justify-between border-b mb-2">
                <h1>
                    Locked Balance
                </h1>
                <div>
                    {locked / decimal} INR
                </div>
            </div>
            <div className="flex  justify-between border-b mb-2">
                <h1>
                    Total Balance
                </h1>
                <div>
                    {(amount + locked) / decimal} INR
                </div>
            </div>
            
        </div>
    )
}