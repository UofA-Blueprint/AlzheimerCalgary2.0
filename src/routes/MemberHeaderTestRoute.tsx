import { ReactNode } from "react";
import MemberHeader from "@/components/MemberHeader";
import ProfilePictures from "@/components/ProfilePictures";
import profilePic from "@/assets/images/face2.jpg";
import profilePic1 from "@/assets/images/face1.jpeg";
import profilePic2 from "@/assets/images/face.jpeg";

import * as Icon from "@phosphor-icons/react";
// vcl luon randy (size fixed vcl)
function MemberHeaderTestRoute() {
  return (
    <div className="flex flex-col space-y-4 p-4">
      <div className="w-20 h-14">
        <MemberHeader
          backgroundColor="tulip"
          username="User 1"
          profilePicChildren={
            <img
              className="w-12 h-12 object-cover rounded-full"
              src={profilePic}
              alt="Profile pic"
            />
          }
        />
      </div>
      <div className="w-22 h-16">
        <MemberHeader
          backgroundColor="gold"
          username="User 2"
          profilePicChildren={
            <img
              className="w-8 h-8 object-cover rounded-full"
              src={profilePic}
              alt="Profile pic"
            />
          }
        />
      </div>
      <div className="w-32 h-32">
        <MemberHeader
          backgroundColor="lime"
          username="User 3"
          profilePicChildren={
            <img
              className="w-8 h-8 object-cover rounded-full"
              src={profilePic}
              alt="Profile pic"
            />
          }
        />
      </div>
      <div className="w-32 h-32">
        <MemberHeader
          backgroundColor="jade"
          username="User 4"
          profilePicChildren={
            <img
              className="w-8 h-8 object-cover rounded-full"
              src={profilePic}
              alt="Profile pic"
            />
          }
        />
      </div>
    </div>
  );
}

export default MemberHeaderTestRoute;
