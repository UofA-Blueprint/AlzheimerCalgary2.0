import { WarningCircle } from "@phosphor-icons/react";


export interface InputFieldProps {
    type: string;
    error: boolean;
    label: string;
    required: boolean;
}

function InputField({ type, error, label, required }: InputFieldProps) {
    // todo: functionality


    return <div className="mt-5 w-[30em]">
        {required === false  
        ? <label className="font-extrabold block mb-1 ml-1 text-sm text-light-500 dark:text-white">
            {label} 
        </label>
        : 
            <label className="font-extrabold block mb-1 ml-1 text-sm text-light-500 dark:text-white"> 
                {label} <span className="text-red-500"> * </span>
            </label>
        }
        
        {error !== true
        ? <input placeholder={"Enter "+ type +"..."} type={type} 
        className="bg-gray-50 border border-gray-300 text-light-500 text-sm rounded-lg focus:outline-none focus:drop-shadow-[0_0px_5px_rgba(0,0,0,0.25)] hover:outline-none hover:drop-shadow-[0_0px_5px_rgba(0,0,0,0.25)] block w-full p-2.5  dark:text-white">
        </input>
        : <div><input placeholder={"Enter "+ type +"..."} type={type} 
            className="bg-gray-50 border border-red-500 text-light-500 text-sm rounded-lg focus:outline-none focus:drop-shadow-[0_0px_5px_rgba(0,0,0,0.25)] hover:outline-none hover:drop-shadow-[0_0px_5px_rgba(0,0,0,0.25)] block w-full p-2.5  dark:text-white">
            </input>
            
            <div className="flex mt-1 align-middle">
                <WarningCircle color="red" className="mr-1" size={"1.1em"} /> 
                <span className="text-red-500 text-xs "> Error {type} </span>
            </div>
        </div>
        }
    </div>;
}

export default InputField;
