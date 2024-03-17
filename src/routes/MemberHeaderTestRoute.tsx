import { ReactNode } from "react";
import MemberHeader from "@/components/MemberHeader";
import ProfilePictures from "@/components/ProfilePictures";
import profilePic from "@/assets/images/face2.jpg";
import profilePic1 from "@/assets/images/face1.jpeg";
import profilePic2 from "@/assets/images/face.jpeg";

import * as Icon from "@phosphor-icons/react";

function MemberHeaderTestRoute() {
  return (
    <div className="flex flex-col space-y-4 p-4">
      <MemberHeader
        backgroundColor="tulip"
        username="User 1"
        profilePicChildren={
          <img
            className=" w-32 h-32 object-cover rounded-full"
            src={profilePic}
            alt="Profile pic"
          />
        }
      />

      <MemberHeader
        backgroundColor="gold"
        username="User 2"
        profilePicChildren={
          <img
            className=" h-32 w-32 object-cover rounded-full"
            src={profilePic1}
            alt="Profile pic"
          />
        }
      />

      <MemberHeader
        backgroundColor="lime"
        username="User 3"
        profilePicChildren={
          <img
            className=" w-32 h-32 object-cover rounded-full"
            src={profilePic2}
            alt="Profile pic"
          />
        }
      />

      <MemberHeader
        backgroundColor="jade"
        username="User 4"
        profilePicChildren={
          <img
            className=" h-32 w-32 object-cover rounded-full"
            src={profilePic}
            alt="Profile pic"
          />
        }
      />
    </div>
  );
}

export default MemberHeaderTestRoute;
