import {useState, useRef} from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";

export interface SearchBarProps {
    target: string;
  }

  
  function SearchBar({ target }: SearchBarProps) {   
    // const input = useRef<HTMLDivElement>(null);
    const [query,setQuery] = useState("")
    

    const handleClick = () => {
        //handle query
        //redirect to results
        console.log(query)
    }

    return <div className={"h-[2.5em] flex flex-row m-[1em]"}>
            <input 
                value={query}
                placeholder={"Search by " + target}  
                className={"p-[0.5em] rounded-l-lg border  w-[20em]"} 
                onChange={e => setQuery(e.target.value)}
            />
            <button className={"rounded-r-lg bg-primary-main p-[0.5em] hover:bg-primary-light cursor-pointer"} onClick={handleClick} >
                <MagnifyingGlass color="white" size={"1em"} />
            </button>
    </div>;
  }
  
  export default SearchBar;
  