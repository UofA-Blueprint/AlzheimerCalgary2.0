import React, {useState} from 'react';
import Image from "@/components/Image";

const getDeviceType = (): string => {
    const width = window.innerWidth;

    if (width >= 1024){
        return 'desktop'
    } else if (width >= 464){
        return 'tablet'
    } else {
        return 'mobile'
    }


}
function ImageTestRoute() {
    const deviceType = getDeviceType()
    const [imageClicked, setImageClicked] = useState(false);
    return (
        <div className="items-center h-screen w-screen relative">
            <button className="absolute top-4 left-4" onClick={() => setImageClicked(!imageClicked)}>Click to view image</button>
            {imageClicked ? <Image deviceType={deviceType}/> : <></>}
        </div>
    );
}

export default ImageTestRoute;