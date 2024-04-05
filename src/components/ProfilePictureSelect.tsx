import clsx from "clsx";
import ColorPicker from "@/components/ColorPicker";
import ProfilePictures from "@/components/ProfilePictures";

function ProfilePictureSelect() {
  // Container style
  const outer = "flex flex-col gap-2";

  // Label and color picker section style
  const upper = "flex flex-row justify-between";

  // Profile picture options section style
  const lower = "flex flex-row justify-start gap-4";

  // Label style
  const label = "text-h4";

  return (
    <div className={clsx(outer)}>
      <div className={clsx(upper)}>
        <span className={clsx(label)}>Member Profile Picture</span>
        <ColorPicker />
      </div>
      <div className={clsx(lower)}></div>
    </div>
  );
}

export default ProfilePictureSelect;
