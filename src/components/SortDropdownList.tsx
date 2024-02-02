import { useState } from "react";
import DropdownItem from "./DropdownItem";
import { CaretDown } from '@phosphor-icons/react';


function SortDropdownList() {
    // State to keep track of the currently selected option
    const [selectedItem, setSelectedItem] = useState<string | null>(null) // useState expect either string or null var

    // State to keep track of the menu is being open or not
    const [open, setOpen] = useState(false)

    // Options that can be later add in
    const items = ["Newest to Oldest", "Oldest to Newest", "Most-Least Storage", "Recently Updated"];

    return (
        <div>
            {/* For the menu trigger */}
            <div className={`cursor-pointer font-body h-10 bg-status-blue-light flex justify-between items-center px-4 py-2 ${open ? 'rounded-t-lg mb-2' : 'rounded-lg'} `} onClick={() => setOpen(!open)}>
                Sort
                
                <CaretDown size={24}/>
            </div>
    
            {/* For the dropdown options */}
            <div className={`bg-status-blue-light p-4 rounded-b-lg ${open ? 'visible opacity-1' : 'invisible opacity-0'}`}> 
                <div className={`flex flex-col gap-2`}>
                    <ul>
                        {items.map((item, index) => (
                            <DropdownItem
                                key={index}
                                text={item}
                                isSelected={selectedItem === item} // Check if matched with the selected option
                                onSelect={() => setSelectedItem(item)} // set the selectedItem to that option and when it re-render it will be check by the line above
                            />
                        ))}
                    </ul>
                    {/* for fun */}
                    <button className="border bg-primary-main text-white">Reset</button>
                </div>
            </div>
        </div>
    );
    
}

export default SortDropdownList;
