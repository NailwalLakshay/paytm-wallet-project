export const TextInput = ({type, placeholder , label , onChange} : {
    type : string,
    placeholder : string,
    label : string,
    onChange : (value : number)=>void
})=>{
    return(
        <div>
            <label className="block mb-2 text-sm font-medium" >{label}</label>
            <input className="bg-gray-50 border border-gray-300 text-sm rounded-lg w-full p-2"
            onChange={(e)=>{
                onChange(Number(e.target.value))
            }} type={type} placeholder = {placeholder}  />
        </div>
    )
}