import Button from "@/components/Button";
import { Plus } from "@phosphor-icons/react";

function ButtonTestRoute() {
	return (
		<div className="flex w-[100vw] h-[100vh] justify-center items-center">
			<div className="flex flex-row flex-wrap gap-4 justify-center">
				<div className="flex flex-col items-start gap-2 w-[200px]">
					<Button
						text="Button"
						icon={<Plus size={24} />}
						shape="large"
						severity="primary"
						onClick={() => console.log("Button clicked")}
					/>
					<Button
						text="Button"
						icon={<Plus size={24} />}
						shape="medium"
						severity="primary"
						onClick={() => console.log("Button clicked")}
					/>
					<Button
						text="Button"
						icon={<Plus size={16} />}
						shape="small"
						severity="primary"
						onClick={() => console.log("Button clicked")}
					/>
					<Button
						icon={<Plus size={32} />}
						shape="round"
						severity="primary"
						onClick={() => console.log("Button clicked")}
					/>
					<Button
						icon={<Plus size={32} />}
						shape="square"
						severity="primary"
						onClick={() => console.log("Button clicked")}
					/>
				</div>
				<div className="flex flex-col items-start gap-2 w-[200px]">
					<Button
						text="Button"
						icon={<Plus size={24} />}
						shape="large"
						severity="secondary"
						onClick={() => console.log("Button clicked")}
					/>
					<Button
						text="Button"
						icon={<Plus size={24} />}
						shape="medium"
						severity="secondary"
						onClick={() => console.log("Button clicked")}
					/>
					<Button
						text="Button"
						icon={<Plus size={16} />}
						shape="small"
						severity="secondary"
						onClick={() => console.log("Button clicked")}
					/>
					<Button
						icon={<Plus size={32} />}
						shape="round"
						severity="secondary"
						onClick={() => console.log("Button clicked")}
					/>
					<Button
						icon={<Plus size={32} />}
						shape="square"
						severity="secondary"
						onClick={() => console.log("Button clicked")}
					/>
				</div>
				<div className="flex flex-col items-start gap-2 w-[200px]">
					<Button
						text="Button"
						icon={<Plus size={24} />}
						shape="large"
						severity="danger"
						onClick={() => console.log("Button clicked")}
					/>
					<Button
						text="Button"
						icon={<Plus size={24} />}
						shape="medium"
						severity="danger"
						onClick={() => console.log("Button clicked")}
					/>
					<Button
						text="Button"
						icon={<Plus size={16} />}
						shape="small"
						severity="danger"
						onClick={() => console.log("Button clicked")}
					/>
					<Button
						icon={<Plus size={32} />}
						shape="round"
						severity="danger"
						onClick={() => console.log("Button clicked")}
					/>
					<Button
						icon={<Plus size={32} />}
						shape="square"
						severity="danger"
						onClick={() => console.log("Button clicked")}
					/>
				</div>
				<div className="flex flex-col items-start gap-2 w-[200px]">
					<Button
						text="Button"
						icon={<Plus size={24} />}
						shape="large"
						severity="danger"
						disabled={true}
						onClick={() => console.log("Button clicked")}
					/>
					<Button
						text="Button"
						icon={<Plus size={24} />}
						shape="medium"
						severity="danger"
						disabled={true}
						onClick={() => console.log("Button clicked")}
					/>
					<Button
						text="Button"
						icon={<Plus size={16} />}
						shape="small"
						severity="danger"
						disabled={true}
						onClick={() => console.log("Button clicked")}
					/>
					<Button
						icon={<Plus size={32} />}
						shape="round"
						severity="danger"
						disabled={true}
						onClick={() => console.log("Button clicked")}
					/>
					<Button
						icon={<Plus size={32} />}
						shape="square"
						severity="danger"
						disabled={true}
						onClick={() => console.log("Button clicked")}
					/>
				</div>
			</div>
		</div>
	);
}

export default ButtonTestRoute;
