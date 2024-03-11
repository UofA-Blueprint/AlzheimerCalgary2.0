import Tooltip from "@/components/Tooltip"; // Import Tooltip from its own file

const TooltipTestRoute = () => {
  return (
    <div className="text-h2 flex flex-col items-center justify-center min-h-screen bg-primary-light">
      <Tooltip message="This is a really helpful tool tip">
        <button className=" rounded-lg text-primary-dark p-3 border bg-white h-[140px]">
          Hover on me 😩
        </button>
      </Tooltip>
    </div>
  );
};

export default TooltipTestRoute;
