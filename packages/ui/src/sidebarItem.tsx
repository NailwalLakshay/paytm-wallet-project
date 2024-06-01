"use client"

import {useRouter , usePathname} from "next/navigation";

export const Sidebar = ({linkItem} : {linkItem : {
    title : string,
    link : string,
    id : string,
    icon : any
}})=>{
    const router = useRouter();
    const pathName = usePathname();
    return(
        <div className=" p-2 mt">
            <button className={`flex gap-2 ${pathName === linkItem.link ? "text-blue-500 font-bold" : ""}`} onClick={()=>{
                router.push(linkItem.link);
            }} >
                {linkItem.icon}
                {linkItem.title}</button>
        </div>
    )
}