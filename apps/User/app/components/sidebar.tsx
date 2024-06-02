"use client";

import {Sidebar} from "@repo/ui/sidebar";
import { useRecoilState, useRecoilValue } from "recoil";
import { BalanceData, BalanceToggler, BtnToggler, UserDetailsStore } from "../store/recoil";
import { useEffect, useState } from "react";
import { UserBalance, UserDetails} from "../lib/helpers/helperfxn";

export const SidebarComp = ()=>{
    const active = useRecoilValue(BtnToggler);

    const [windowWidth , setWindowWidth] = useState<number>(1000);
    useEffect(()=>{
      if(window){
        setWindowWidth(window.screen.width);
      }
    })
    const balanceToggler = useRecoilValue(BalanceToggler);
    const [user , setUser] = useRecoilState(UserDetailsStore);
    const [Balance , setBalanceData] = useRecoilState(BalanceData)
    
    

    useEffect(()=>{
        console.log("sidebar mounted")
        UserDetails().then((res)=>{
            if(res) setUser(res)
        });
        UserBalance().then((res)=>{
            if(res) setBalanceData(res)
        })
    } , [balanceToggler]);

    return (
        <div className={`sm:min-w-[250px] sm:border-r-2 border-b-2 sm:p-2  sm:min-h-screen sm:static sm:z-0 ${active ? " absolute z-10 w-full bg-white p-2" : ""}`}>
              <div className={`sm:block ${(active || windowWidth >640) ? "" : "hidden"}`}>
                {Links.map((item) : any=>{
                    return <Sidebar linkItem = {item} />
                })}
              </div>
        </div>
    )
}


const Links = [
    {
        title : "Home",
        link : "/dashboard",
        id : "1",
        icon : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    },
    {
        title : "Transaction",
        link : "/dashboard/transaction",
        id : "2",
        icon : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    },
    {
        title : "Wallet",
        link : "/dashboard/wallet",
        id : "3",
        icon : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
      </svg>
    },
    {
      title : "P2P Transfer",
      link : "/dashboard/p2p",
      id : "4",
      icon : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
    </svg>
    }
]
