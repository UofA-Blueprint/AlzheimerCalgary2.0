// MemberHeader.tsx
import { ReactNode } from "react";
import ProfilePictures from "./ProfilePictures";

interface MemberHeaderProp {
  profilePicChildren: ReactNode;
  backgroundColor:
    | "tulip"
    | "gold"
    | "lime"
    | "jade"
    | "water"
    | "air"
    | "lilac"
    | "candy";
  username: string;
}

function MemberHeader({
  profilePicChildren,
  backgroundColor,
  username,
}: MemberHeaderProp) {
  return (
    <div className="flex flex-col md:flex-row items-center w-full h-full">
      <div className="w-full ">
        <ProfilePictures backgroundColor={backgroundColor}>
          {profilePicChildren}
        </ProfilePictures>
      </div>
      <h1 className="w-full ">{username}</h1>
    </div>
  );
}

export default MemberHeader;
