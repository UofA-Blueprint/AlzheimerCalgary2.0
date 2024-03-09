import Tooltip from "@/components/Tooltip"; // Import Tooltip from its own file

const TooltipTestRoute = () => {
  return (
    <div className="text-h2 flex flex-col items-center justify-center min-h-screen bg-primary-light">
      <Tooltip message="The ToolTip">
        <button className=" rounded-lg text-primary-dark p-3 border bg-white h-[140px]">
          Show me Tooltip
        </button>
      </Tooltip>
    </div>
  );
};

export default TooltipTestRoute;
