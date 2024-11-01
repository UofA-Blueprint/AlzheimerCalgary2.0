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
						size="large"
						severity="primary"
						onClick={() => console.log("Button clicked")}
					/>
					<Button
						text="Button"
						icon={<Plus size={24} />}
						size="medium"
						severity="primary"
						onClick={() => console.log("Button clicked")}
					/>
					<Button
						text="Button"
						icon={<Plus size={16} />}
						size="small"
						severity="primary"
						onClick={() => console.log("Button clicked")}
					/>
					<Button
						icon={<Plus size={32} />}
						size="large"
						shape="round"
						severity="primary"
						onClick={() => console.log("Button clicked")}
					/>
					<Button
						icon={<Plus size={32} />}
						size="large"
						shape="square"
						severity="primary"
						onClick={() => console.log("Button clicked")}
					/>
					<Button
						icon={<Plus size={24} />}
						size="medium"
						shape="round"
						severity="primary"
						onClick={() => console.log("Button clicked")}
					/>
					<Button
						icon={<Plus size={24} />}
						size="medium"
						shape="square"
						severity="primary"
						onClick={() => console.log("Button clicked")}
					/>
					<Button
						icon={<Plus size={16} />}
						size="small"
						shape="round"
						severity="primary"
						onClick={() => console.log("Button clicked")}
					/>
					<Button
						icon={<Plus size={16} />}
						size="small"
						shape="square"
						severity="primary"
						onClick={() => console.log("Button clicked")}
					/>
				</div>
				<div className="flex flex-col items-start gap-2 w-[200px]">
					<Button
						text="Button"
						icon={<Plus size={24} />}
						size="large"
						severity="secondary"
						onClick={() => console.log("Button clicked")}
					/>
					<Button
						text="Button"
						icon={<Plus size={24} />}
						size="medium"
						severity="secondary"
						onClick={() => console.log("Button clicked")}
					/>
					<Button
						text="Button"
						icon={<Plus size={16} />}
						size="small"
						severity="secondary"
						onClick={() => console.log("Button clicked")}
					/>
					<Button
						icon={<Plus size={32} />}
						size="large"
						shape="round"
						severity="secondary"
						onClick={() => console.log("Button clicked")}
					/>
					<Button
						icon={<Plus size={32} />}
						size="large"
						shape="square"
						severity="secondary"
						onClick={() => console.log("Button clicked")}
					/>
					<Button
						icon={<Plus size={24} />}
						size="medium"
						shape="round"
						severity="secondary"
						onClick={() => console.log("Button clicked")}
					/>
					<Button
						icon={<Plus size={24} />}
						size="medium"
						shape="square"
						severity="secondary"
						onClick={() => console.log("Button clicked")}
					/>
					<Button
						icon={<Plus size={16} />}
						size="small"
						shape="round"
						severity="secondary"
						onClick={() => console.log("Button clicked")}
					/>
					<Button
						icon={<Plus size={16} />}
						size="small"
						shape="square"
						severity="secondary"
						onClick={() => console.log("Button clicked")}
					/>
				</div>
				<div className="flex flex-col items-start gap-2 w-[200px]">
					<Button
						text="Button"
						icon={<Plus size={24} />}
						size="large"
						severity="danger"
						onClick={() => console.log("Button clicked")}
					/>
					<Button
						text="Button"
						icon={<Plus size={24} />}
						size="medium"
						severity="danger"
						onClick={() => console.log("Button clicked")}
					/>
					<Button
						text="Button"
						icon={<Plus size={16} />}
						size="small"
						severity="danger"
						onClick={() => console.log("Button clicked")}
					/>
					<Button
						icon={<Plus size={32} />}
						size="large"
						shape="round"
						severity="danger"
						onClick={() => console.log("Button clicked")}
					/>
					<Button
						icon={<Plus size={32} />}
						size="large"
						shape="square"
						severity="danger"
						onClick={() => console.log("Button clicked")}
					/>
					<Button
						icon={<Plus size={24} />}
						size="medium"
						shape="round"
						severity="danger"
						onClick={() => console.log("Button clicked")}
					/>
					<Button
						icon={<Plus size={24} />}
						size="medium"
						shape="square"
						severity="danger"
						onClick={() => console.log("Button clicked")}
					/>
					<Button
						icon={<Plus size={16} />}
						size="small"
						shape="round"
						severity="danger"
						onClick={() => console.log("Button clicked")}
					/>
					<Button
						icon={<Plus size={16} />}
						size="small"
						shape="square"
						severity="danger"
						onClick={() => console.log("Button clicked")}
					/>
				</div>
				<div className="flex flex-col items-start gap-2 w-[200px]">
					<Button
						text="Button"
						icon={<Plus size={24} />}
						size="large"
						severity="danger"
						disabled={true}
						onClick={() => console.log("Button clicked")}
					/>
					<Button
						text="Button"
						icon={<Plus size={24} />}
						size="medium"
						severity="danger"
						disabled={true}
						onClick={() => console.log("Button clicked")}
					/>
					<Button
						text="Button"
						icon={<Plus size={16} />}
						size="small"
						severity="danger"
						disabled={true}
						onClick={() => console.log("Button clicked")}
					/>
					<Button
						icon={<Plus size={32} />}
						size="large"
						shape="round"
						severity="danger"
						disabled={true}
						onClick={() => console.log("Button clicked")}
					/>
					<Button
						icon={<Plus size={32} />}
						size="large"
						shape="square"
						severity="danger"
						disabled={true}
						onClick={() => console.log("Button clicked")}
					/>
					<Button
						icon={<Plus size={24} />}
						size="small"
						shape="round"
						severity="danger"
						disabled={true}
						onClick={() => console.log("Button clicked")}
					/>
					<Button
						icon={<Plus size={24} />}
						size="small"
						shape="square"
						severity="danger"
						disabled={true}
						onClick={() => console.log("Button clicked")}
					/>
					<Button
						icon={<Plus size={16} />}
						size="small"
						shape="round"
						severity="danger"
						disabled={true}
						onClick={() => console.log("Button clicked")}
					/>
					<Button
						icon={<Plus size={16} />}
						size="small"
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
