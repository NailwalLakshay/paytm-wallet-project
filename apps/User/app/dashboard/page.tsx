import { Card } from "@repo/ui/card";
import { UserBalance , UserDetails } from "../lib/helpers/helperfxn";

export default async function (){

    const Balance = await UserBalance();
    const getUser = await UserDetails();

    return(
        <div className="p-4 flex flex-col gap-10 mt-10 ">
            <div>
                <h1 className="font-bold text-4xl mt-10 text-purple-500">Paytm@IIT Dashboard</h1>
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4 ">
                <Card title="Available Balance " classname="bg-gray-200 rounded-lg">
                    <div>
                        Rs {Balance?.amount}
                    </div>
                </Card>
                <Card title="Account Details" classname="bg-gray-200 rounded-lg">
                    <div>
                        <h1 className="flex flex-col">
                        <p className="font-semibold">Account Number</p>
                        {getUser?.accountNumber}
                        </h1>
                        <h1 className="flex flex-col">
                            <p className="font-semibold">Email Id</p>
                            {getUser?.email}
                        </h1>
                    </div>
                </Card>
            </div>
        </div>
    )
}
