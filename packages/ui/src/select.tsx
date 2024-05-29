"use client" 

export const Select = ({options , onSelect , label} : {
    onSelect : (value : string) => void,
    options : {
        key : string,
        value : string
    } [],
    label : string
})=>{
    return (
        <div>
            <label className="block mb-2 mt-2 text-sm font-medium">{label}</label>
            <select 
            className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2"
            title="select bank" onChange={(e)=>{
                onSelect(e.target.value);
            }} >
                {options.map((option)=> <option className="bg-gray-800 text-white" value={option.value}>{option.key} </option>)}
            </select>
        </div>
    )
}