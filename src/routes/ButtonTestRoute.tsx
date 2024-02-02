import Button from "../components/Button";

function ButtonTestRoute() {
  return (
    <div className="space-x-4 flex flex-row">
      <div className="space-y-4 flex flex-col  justify-center items-center min-h-screen">
        <Button
          onClick={function (): void {
            throw new Error("Function not implemented.");
          }}
          text={"Button"}
          rounded={false}
          fill={true}
          status={false}
          icon={true}
        />
        <Button
          onClick={function (): void {
            throw new Error("Function not implemented.");
          }}
          text={"Button"}
          rounded={false}
          fill={true}
          status={false}
          icon={false}
        />
        <Button
          onClick={function (): void {
            throw new Error("Function not implemented.");
          }}
          text={""}
          rounded={false}
          fill={true}
          status={false}
          icon={true}
        />
        <Button
          onClick={function (): void {
            throw new Error("Function not implemented.");
          }}
          text={""}
          rounded={true}
          fill={true}
          status={false}
          icon={true}
        />
      </div>
      <div className="space-y-4 flex flex-col  justify-center items-center min-h-screen">
        <Button
          onClick={function (): void {
            throw new Error("Function not implemented.");
          }}
          text={"Button"}
          rounded={false}
          fill={true}
          status={true}
          icon={true}
        />
        <Button
          onClick={function (): void {
            throw new Error("Function not implemented.");
          }}
          text={"Button"}
          rounded={false}
          fill={true}
          status={true}
          icon={false}
        />
        <Button
          onClick={function (): void {
            throw new Error("Function not implemented.");
          }}
          text={""}
          rounded={false}
          fill={true}
          status={true}
          icon={true}
        />
        <Button
          onClick={function (): void {
            throw new Error("Function not implemented.");
          }}
          text={""}
          rounded={true}
          fill={true}
          status={true}
          icon={true}
        />
      </div>
      <div className="space-y-4 flex flex-col  justify-center items-center min-h-screen">
        <Button
          onClick={function (): void {
            throw new Error("Function not implemented.");
          }}
          text={"Button"}
          rounded={false}
          fill={false}
          status={true}
          icon={true}
        />
        <Button
          onClick={function (): void {
            throw new Error("Function not implemented.");
          }}
          text={"Button"}
          rounded={false}
          fill={false}
          status={true}
          icon={false}
        />
        <Button
          onClick={function (): void {
            throw new Error("Function not implemented.");
          }}
          text={""}
          rounded={false}
          fill={false}
          status={true}
          icon={true}
        />
        <Button
          onClick={function (): void {
            throw new Error("Function not implemented.");
          }}
          text={""}
          rounded={true}
          fill={false}
          status={true}
          icon={true}
        />
      </div>
    </div>
  );
}

export default ButtonTestRoute;
