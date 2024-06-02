export const Loader = ({classname}:{
    classname? : string
} )=>{
    return (<div className="">
        <div className="animate-pulse">
            
                <div className={`${classname} h-4 bg-gray-300 rounded p-4 `}></div>
        </div>
   </div>)
}