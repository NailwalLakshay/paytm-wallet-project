import { atom } from "recoil";

export const p2pRecentTransactionFactor = atom({
    key : "p2pRecentTransactionFactor",
    default : false
})

export const SessionUser = atom({
    key: "sessionUser",
    default : null
})

export const onRampTxn = atom({
    key : "onRampTxn",
    default : false
})
