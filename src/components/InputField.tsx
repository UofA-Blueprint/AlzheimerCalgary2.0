import { WarningCircle } from "@phosphor-icons/react";


export interface InputFieldProps {
    type: string;
    error: boolean;
    label: string;
    required: boolean;
}

// To do: hover should be a drak shadow
//        error on the input box
//        


function InputField({ type, error, label, required }: InputFieldProps) {

    return <div className="mt-5 w-[30em]">
        {required === false  
        ? <label className="block mb-1 ml-1 text-sm font-bold text-light-500 dark:text-white">
            {label} 
        </label>
        : 
            <label className="block mb-1 ml-1 text-sm font-bold text-light-500 dark:text-white"> 
                {label } <span className="text-red-500"> * </span>
            </label>
        }
        
        {error !== true
        ? <input placeholder={"Enter "+ type +"..."} type={type} 
        className="bg-gray-50 border border-gray-300 text-light-500 text-sm rounded-lg focus:shadow-lg block w-full p-2.5  dark:text-white">
        </input>
        : <div><input placeholder={"Enter "+ type +"..."} type={type} 
            className="bg-gray-50 border border-red-500 text-light-500 text-sm rounded-lg focus:shadow-lg block w-full p-2.5  dark:text-white">
            </input>
       
            <div className="text-red-500 text-xs">
                <WarningCircle color="red" className="mt-2 " /> 
                                
            </div>
        </div>
        }
    </div>;
}

export default InputField;
