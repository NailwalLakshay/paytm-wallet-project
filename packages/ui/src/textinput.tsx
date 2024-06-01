export const TextInput = ({type, placeholder , label , onChange} : {
    type : string,
    placeholder : string,
    label : string,
    onChange : (value : any)=>void
})=>{
    return(
        <div>
            <label className="block mb-2 text-sm font-medium" >{label}</label>
            <input className="bg-gray-100 border border-gray-300 text-sm rounded-lg w-full p-2"
            onChange={(e)=>{
                onChange(e.target.value)
            }} type={type} placeholder = {placeholder}  />
        </div>
    )
}