import { Copy } from "@phosphor-icons/react";

function MediaCard() {
	return (
		<div className=" flex flex-col rounded-lg">
			<div className="relative rounded-lg">
				<img
					src="https://images.unsplash.com/photo-1724579243894-6a8c9bbfe88c"
					alt="Image"
					className="object-fit rounded-t-lg"
				/>
			</div>
			<div className="bg-white p-2 rounded-b-lg flex flex-col gap-4">
				<h3 className="text-body-reg">
					Channeling their inner artist with a paintbrush and a splash
					of color!
				</h3>
				<div className="flex justify-between">
					<span className="text-sm text-neutrals-dark-200">
						Oct.2, 2023
					</span>
					<div className="flex items-center gap-2">
						<span className="text-sm text-neutrals-dark-300">
							Id: 1234
						</span>
						<button>
							<Copy></Copy>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default MediaCard;
