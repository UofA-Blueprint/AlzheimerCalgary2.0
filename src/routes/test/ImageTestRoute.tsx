import Image from "@/components/Image";
import Overlay from "@/components/Overlay";
import old1 from "../../assets/images/old1.jpg";

function ImageTestRoute() {
	return (
		<Overlay nav={true}>
			<Image
				url={old1}
				alt="old"
			/>
		</Overlay>
	);
}

export default ImageTestRoute;
