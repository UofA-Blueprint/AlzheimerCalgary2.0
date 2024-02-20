import ProfilePictures from "@/components/ProfilePictures";
import profilePic from "@/assets/images/face2.jpg";
import profilePic1 from "@/assets/images/face1.jpeg";
import profilePic2 from "@/assets/images/face.jpeg";

import * as Icon from '@phosphor-icons/react'

function ProfilePictureTest() {

  
  return (
    <div className="space-y-4 p-4">
      <ProfilePictures backgroundColor="tulip"><img className="w-full h-full object-cover rounded-full" src={profilePic} alt="Profile pic" /></ProfilePictures>
      <ProfilePictures backgroundColor="tulip"><img className="w-full h-full object-cover rounded-full" src={profilePic1} alt="Profile pic" /></ProfilePictures>
      <ProfilePictures backgroundColor="tulip"><img className="w-full h-full object-cover rounded-full" src={profilePic2} alt="Profile pic" /></ProfilePictures>

      <ProfilePictures backgroundColor="tulip"><Icon.PawPrint className="w-full h-full object-cover rounded-full" size={100} color={'white'}/></ProfilePictures>    
      </div>
  );
}

export default ProfilePictureTest;
