export const Balance = ({amount , locked } : {
    amount : number,
    locked : number,
})=>{
    return(
        <div>

            <div className="flex  justify-between border-b mb-2">
                <h1>
                    Unlocked Balance
                </h1>
                <div>
                    {amount } INR
                </div>
            </div>
            <div className="flex  justify-between border-b mb-2">
                <h1>
                    Locked Balance
                </h1>
                <div>
                    {locked } INR
                </div>
            </div>
            <div className="flex  justify-between border-b mb-2">
                <h1>
                    Total Balance
                </h1>
                <div>
                    {(amount + locked) } INR
                </div>
            </div>
            
        </div>
    )
}