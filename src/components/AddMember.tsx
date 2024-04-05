import clsx from "clsx";
import Modal from "@/components/Modal";
import InputField from "@/components/InputField";
import ProfilePictureSelect from "@/components/ProfilePictureSelect";
import Button from "@/components/Button";

interface AddMemberProps {
  /* Toggles the modal's visibility */
  isOpen: boolean;

  /* Callback to close the modal */
  onClose: () => void;
}
function AddMember({ isOpen, onClose }: AddMemberProps) {
  // Content style
  const content = "flex flex-col gap-6";
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Member"
      content={
        <div className={clsx(content)}>
          <InputField
            type="text"
            error={false}
            label="Name"
            required={true}
          />
          <InputField
            type="text"
            error={false}
            label="Unique ID"
            required={true}
          />
          <ProfilePictureSelect />
        </div>
      }
    ></Modal>
  );
}

export default AddMember;
