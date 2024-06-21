import MediaCard from "@/components/MediaCard";
import pic1 from "../assets/images/pic1.jpg";

const MediaCardTestRoute = () => {
    return(
        <div className="h-full w-full flex justify-center items-center bg-slate-400">
            <MediaCard url = {pic1} />
        </div>
    )
}

export default MediaCardTestRoute