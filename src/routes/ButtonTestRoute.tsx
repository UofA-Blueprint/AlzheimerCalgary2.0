import Button from "@/components/Button";
import { Plus } from "@phosphor-icons/react";

function ButtonTestRoute() {
  return (
    <div className="space-x-4 flex flex-row">
      <div className="space-y-4 flex flex-col justify-center items-center min-h-screen">
        {/* Put font size inside, depending on you */}
        <div style={{ fontSize: "20px" }} className=" w-72 h-64">
          <Button
            onClick={function (): void {
              throw new Error("Function not implemented.");
            }}
            text={"Button"}
            rounded={false}
            fill={true}
            status={"disabled"}
            icon={Plus}
          />
        </div>
        <div className="text-sm w-48 h-12">
          <Button
            onClick={function (): void {
              throw new Error("Function not implemented.");
            }}
            text={"Button"}
            rounded={false}
            fill={true}
            status={"disabled"}
          />
        </div>
        <div className="text-sm w-22 h-8">
          <Button
            onClick={function (): void {
              throw new Error("Function not implemented.");
            }}
            text={"Button"}
            rounded={false}
            fill={true}
            status={"disabled"}
            icon={Plus}
          />
        </div>
        <div className="text-sm w-22 h-8">
          <Button
            onClick={function (): void {
              throw new Error("Function not implemented.");
            }}
            text={"Button"}
            rounded={false}
            fill={true}
            status={"disabled"}
          />
        </div>
        <div className="text-sm w-12 h-12">
          <Button
            onClick={function (): void {
              throw new Error("Function not implemented.");
            }}
            text={""}
            rounded={false}
            fill={true}
            status={"disabled"}
            icon={Plus}
          />
        </div>
        <div className="text-sm w-12 h-12">
          <Button
            onClick={function (): void {
              throw new Error("Function not implemented.");
            }}
            text={""}
            rounded={true}
            fill={true}
            status={"disabled"}
            icon={Plus}
          />
        </div>
      </div>
      <div className="space-y-4 flex flex-col justify-center items-center min-h-screen">
        <div className="text-sm w-64 h-12">
          <Button
            onClick={function (): void {
              throw new Error("Function not implemented.");
            }}
            text={"Button"}
            rounded={false}
            fill={true}
            status={"enabled"}
            icon={Plus}
          />
        </div>
        <div className="text-sm w-48 h-12">
          <Button
            onClick={function (): void {
              throw new Error("Function not implemented.");
            }}
            text={"Button"}
            rounded={false}
            fill={true}
            status={"enabled"}
          />
        </div>
        <div className="text-sm w-48 h-12">
          <Button
            onClick={function (): void {
              throw new Error("Function not implemented.");
            }}
            text={"Button"}
            rounded={false}
            fill={true}
            status={"enabled"}
            icon={Plus}
          />
        </div>
        <div className="text-sm w-12 h-12">
          <Button
            onClick={function (): void {
              throw new Error("Function not implemented.");
            }}
            text={""}
            rounded={false}
            fill={true}
            status={"enabled"}
            icon={Plus}
          />
        </div>
        <div className="text-sm w-12 h-12">
          <Button
            onClick={function (): void {
              throw new Error("Function not implemented.");
            }}
            text={""}
            rounded={true}
            fill={true}
            status={"enabled"}
            icon={Plus}
          />
        </div>
      </div>
      <div className="space-y-4 flex flex-col justify-center items-center min-h-screen">
        <div className="text-sm w-64 h-12">
          <Button
            onClick={function (): void {
              throw new Error("Function not implemented.");
            }}
            text={"Button"}
            rounded={false}
            fill={false}
            status={"enabled"}
            icon={Plus}
          />
        </div>
        <div className="text-sm w-48 h-12">
          <Button
            onClick={function (): void {
              throw new Error("Function not implemented.");
            }}
            text={"Button"}
            rounded={false}
            fill={false}
            status={"enabled"}
          />
        </div>
        <div className="text-sm w-12 h-12">
          <Button
            onClick={function (): void {
              throw new Error("Function not implemented.");
            }}
            text={""}
            rounded={false}
            fill={false}
            status={"enabled"}
            icon={Plus}
          />
        </div>
        <div className="text-sm w-12 h-12">
          <Button
            onClick={function (): void {
              throw new Error("Function not implemented.");
            }}
            text={""}
            rounded={true}
            fill={false}
            status={"enabled"}
            icon={Plus}
            color="red-900"
          />
        </div>
      </div>
    </div>
  );
}

export default ButtonTestRoute;
