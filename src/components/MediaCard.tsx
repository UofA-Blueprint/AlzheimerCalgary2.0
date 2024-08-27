import { Copy } from "@phosphor-icons/react";

interface MediaCardProps {
	src: string;
	title: string;
	date: Date;
	id: number;
}

const options: Intl.DateTimeFormatOptions = {
	year: "numeric",
	month: "short",
	day: "numeric",
};

function MediaCard({ src, title, date, id }: MediaCardProps) {
	return (
		<div className=" flex flex-col rounded-lg">
			<div className="relative rounded-lg">
				<img
					src={src}
					alt="Image"
					className="object-fit rounded-t-lg"
				/>
			</div>
			<div className="bg-white p-2 rounded-b-lg flex flex-col gap-4">
				<h3 className="text-body-reg">{title}</h3>
				<div className="flex justify-between">
					<span className="text-sm text-neutrals-dark-200">
						{date.toLocaleDateString("en-US", options)}
					</span>
					<div className="flex items-center gap-2">
						<span className="text-sm text-neutrals-dark-300">
							Id: {id}
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
