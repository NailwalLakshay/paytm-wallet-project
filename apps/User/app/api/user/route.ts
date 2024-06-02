import { authOptions } from "@repo/authoptions/auth";
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server";
import { removePendingTransaction } from "../../lib/helpers/helperfxn";

export const GET = async()=>{

    try {
        const session = await getServerSession(authOptions);
        if(session.user){
            await removePendingTransaction();
            return NextResponse.json({
                user : session.user
            })
        }
    } catch (error) {
        return NextResponse.json({
            message: "You are not logged in!"
        },
        {
            status : 403
        })
    }

    return NextResponse.json({
        message: "You are not logged in!"
    },
    {
        status : 403
    })
}