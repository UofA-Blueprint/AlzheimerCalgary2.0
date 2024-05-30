import MediaUploadStatus from "@/components/MediaUploadStatus";


// TODO: Add the +20% button here to test it and the fail to upload button
// 
function MediaUploadStatusTestRoute() {
    return (
    <div className="text-h2 flex flex-col items-center justify-center min-h-screen bg-primary-light">
        <div>
            <h1>Is this what you looking for? </h1>
            {/* fileSize is in bytes */}
            {/* Play around with uploadProgress in percentage and isFailed variables in MediaUploadStatus.tsx */}
            <MediaUploadStatus fileName="Testing.png" fileSize={1000000000}/>
        </div>
    </div>

    )
}
export default MediaUploadStatusTestRoute;


