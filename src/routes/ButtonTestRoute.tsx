import Button from "../components/Button";

function ButtonTestRoute() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <Button
        onClick={function (): void {
          throw new Error("Function not implemented.");
        }}
        text={"something"}
        rounded={false}
        fill={true}
        status={true}
      />
    </div>
  );
}

export default ButtonTestRoute;
