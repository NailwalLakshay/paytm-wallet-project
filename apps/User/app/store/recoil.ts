import { atom } from "recoil";

export const p2pRecentTransactionFactor = atom({
    key : "p2pRecentTransactionFactor",
    default : false
})

export const SessionUser = atom({
    key: "sessionUser",
    default : {}
})

export const onRampTxn = atom({
    key : "onRampTxn",
    default : false
})

export const BtnToggler = atom({
    key : "BtnToggler",
    default : false
})

export const PendingOnRampTxn = atom({
    key : "PendingOnRampTxn",
    default : <{ amount: number; Provider: string; Status: string; StartTime: Date; }[]>[]
})
export const PendingP2pTxn = atom({
    key : "PendingP2pTxn",
    default : <{id: number;
    startDate: Date;
    amount: number;
    fromUserId: number;
    toUserId: number;
    status: string} []>[]
})

export const AllOnRampTxn = atom({
    key : "AllOnRampTxn",
    default : <{ amount: number; Provider: string; Status: string; StartTime: Date; }[]>[]
})
export const AllP2pTxn = atom({
    key : "AllP2pTxn",
    default : <{id: number;
    startDate: Date;
    amount: number;
    fromUserId: number;
    toUserId: number;
    status: string} []>[],
})

export const getP2pToggler = atom({
    key : "getP2pToggler",
    default : false
})

export const getPendingToggler = atom({
    key : "getPendingToggler",
    default : false
})

export const getNextOnRampTxn = atom({
    key : "getNextOnRampTxn",
    default : 0
})

export const getNextP2pTxn = atom({
    key : "getNextP2pTxn",
    default : 0
})

export const BalanceData = atom({
    key : "BalanceData",
    default : {
        amount : -1,
        locked : 0
    }
});

export const BalanceToggler = atom({
    key : "BalanceToggler",
    default : false
})

export const UserDetailsStore = atom({
    key : "UserDetails",
    default : <{id: number;
    email: string;
    password: string;
    accountNumber: string;}>{
        id : 0,
        email : "",
        password : "",
        accountNumber  :""
    }
})

export const isLoadingAllOnRamp = atom({
    key : "isLoadingAllOnRamp",
    default : true
})

export const isLoadingAllP2p = atom({
    key : "isLoadingAllP2p",
    default : true
})

export const isLoadingPendingOnRamp = atom({
    key : "isLoadingPendingOnRamp",
    default : true
})

export const isLoadingPendingP2p = atom({
    key : "isLoadingPendingP2p",
    default : true
})