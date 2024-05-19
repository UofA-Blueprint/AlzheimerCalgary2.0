import ProfilePictures from "@/components/ProfilePictures";
import profilePic from "@/assets/images/face2.jpg";

import * as Icon from "@phosphor-icons/react";

function ProfilePictureTest() {
	return (
		<div className="space-y-4 p-4">
			<div className="w-20 h-20">
				<ProfilePictures backgroundColor="tulip">
					<img
						src={profilePic}
						alt="profile"
						className="w-12 h-12 rounded-full object-cover"
					/>
				</ProfilePictures>
			</div>

			<div className="w-12 h-12">
				<ProfilePictures backgroundColor="tulip">
					<Icon.PawPrint className="w-full h-full rounded-full p-2 object-cover" />
				</ProfilePictures>
			</div>
		</div>
	);
}

export default ProfilePictureTest;
