import MediaCard from "@/components/MediaCard";
function MediaCardTest() {
  return (
    <div className="h-screen w-screen flex justify-center items-center space-x-10">
      <div className="w-40 h-60 ">
        <MediaCard></MediaCard>
      </div>
      <div className="w-40 h-60">
        <MediaCard></MediaCard>
      </div>
    </div>
  );
}

export default MediaCardTest;
