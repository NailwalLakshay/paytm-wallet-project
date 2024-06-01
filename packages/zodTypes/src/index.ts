import {z} from 'zod';

export const userLoginSchema = z.object({
    email : z.string().email({message : "Invalid Email Address"}),
    password : z.string().min(3 , {message : "Password must be atleast 3 characters long"})
})

export const onRampTxnSchema = z.object({
    amount: z.number({message : "Enter a valid Amount"}).nonnegative(),
    provider: z.string().min(1)
});

export const p2pTransferSchema = z.object({
    amount : z.number({message : "Enter a valid Amount"}).nonnegative(),
    toUser : z.string({message : "Invalid Account Number"})
})