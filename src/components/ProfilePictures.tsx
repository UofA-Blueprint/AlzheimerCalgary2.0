import * as Icon from "@phosphor-icons/react";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  children: ReactNode;
  backgroundColor:
    | "tulip"
    | "gold"
    | "lime"
    | "jade"
    | "water"
    | "air"
    | "lilac"
    | "candy";
}

const ProfilePictures = (props: Props) => {
  const backgroundColor = `bg-profile-${props.backgroundColor}`;
  const className = twMerge(
    backgroundColor,
    "object-cover object-center flex overflow-hidden justify-center items-center rounded-full w-full h-full"
  );

  return (
    <div className="w-full h-full">
      <div className={className}>{props.children}</div>
    </div>
  );
};

export default ProfilePictures;
