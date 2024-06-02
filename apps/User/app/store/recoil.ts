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
    default : false
})

export const isLoadingAllP2p = atom({
    key : "isLoadingAllP2p",
    default : false
})

export const isLoadingPendingOnRamp = atom({
    key : "isLoadingPendingOnRamp",
    default : false
})

export const isLoadingPendingP2p = atom({
    key : "isLoadingPendingP2p",
    default : false
})

// export const getUserDetailsSelector = selector({
//     key : "getUserDetailsSelector",
//     get : async () => {
//         const res = await UserDetails();
//         if(!res) return null;
//         return res;
//     },
// })

// export const getBalanceSelector = selector({
//     key : "getBalanceSelector",
//     get : async ({get}) => {
//         const rest = get(BalanceToggler);
//         const res = await UserBalance();
//         if(!res) return null;
//         return res;
//     },
// });
// export const getPendingP2pTxnSelector = selector({
//     key : "getPendingP2pTxnSelector",
//     get : async ({get}) => {
//         const rest = get(BalanceToggler);
//         const res = await p2pRecentTransaction(3);
//         if(!res) return null;
//         return res;
//     },
// });

// export const getPendingOnRampTxnSelector = selector({
//     key : "getPendingOnRampTxnSelector",
//     get : async ({get}) => {
//         const rest = get(getPendingToggler);
//         const res = await UserOnRampTransaction(3);
//         if(!res) return null;
//         return res;
//     },
// });

// export const getAllOnRampTxnSelector = selector({
//     key : "getAllOnRampTxnSelector",
//     get : async ({get}) => {
//         const next = get(getNextOnRampTxn);
//         const res = await UserAllOnRampTransaction(11 , next);
//         if(!res) return null;
//         return res;
//     },
// });

// export const getAllP2pTxnSelector = selector({
//     key : "getAllP2pTxnSelector",
//     get : async ({get}) => {
//         const next = get(getNextP2pTxn);
//         const rest = get(BalanceToggler);
//         const res = await p2pRecentTransaction(11 , next);
//         if(!res) return null;
//         return res;
//     },
// });