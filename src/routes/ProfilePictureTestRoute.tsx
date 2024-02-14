import ProfilePictures from "@/components/ProfilePictures";
import profilePic from "@/assets/images/face1.jpeg";

function ProfilePictureTest() {
  return (
    <div>
      {/* Using margin or padding for the parent tag can break the navigation bar. */}
      <ProfilePictures children={profilePic} backgroundColor="gold"/>
    </div>
  );
}

export default ProfilePictureTest;
