import { Mountains } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import Button from "./Button";

interface MediaCardProps {
    /* url to img */
	url: string;

    /* whether card is selected */
    selected?: boolean;
}


const MediaCard: React.FC<MediaCardProps> = ({url, selected}) => {

    const [valueChanged, setValueChanged] = useState(false)
    const [err, setErr] = useState(false)
    
    useEffect(() => {
        if (valueChanged){
            const inputVal = (document.getElementById("txtbox") as HTMLInputElement).value
            if (!inputVal){
                setErr(true)
            } else{
                setErr(false)
            }
        }
    }, [valueChanged])


    return(

      <div className="h-svh w-svh rounded-2xl flex flex-col justify-center items-center bg-white">
          <img className="h-3/5 bg-slate-400" src={url}/>
          <div className="h-2/5 w-full p-5">
            <div className="inline-block relative h-full w-full">
                <input id="txtbox" onInput={(e) => {setValueChanged(true)}} className="w-full h-full" type="text" placeholder="Add Text..." />
                <Button className="absolute bottom-2 left-10 h-4 w-2/5 z-10" text="Cancel" fill={false}/>
                <Button className="absolute bottom-2 right-2 h-4 w-2/5 z-10" text="Save"/>
            </div>
          </div>
      </div> 

      )

}

export default MediaCard