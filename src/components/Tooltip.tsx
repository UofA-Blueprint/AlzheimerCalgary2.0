import { FC, ReactNode, useRef } from "react";

interface Props {
  children: ReactNode;
  message?: string;
}

const ToolTip: FC<Props> = ({ children, message }): JSX.Element => {
  const tooltipRef = useRef<HTMLSpanElement>(null);
  const container = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={container}
      onMouseEnter={({ clientX, clientY }) => {
        if (!tooltipRef.current || !container.current) return;
        const { left } = container.current.getBoundingClientRect();
        console.log(
          container.current.getBoundingClientRect(),
          clientX,
          clientY
        );
        tooltipRef.current.style.left = clientX - left + "px";
      }}
      // TODO: set the condition based on the x and y and set the style based on its custom condition (set the string outside for each cases(top, right, bottom, left) and append that satisfied string into the class name of arrow and pointer)as well
      className="group relative inline-block"
    >
      {children}
      {message ? (
        <span
          ref={tooltipRef}
          className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition bg-white text-base px-4 py-2 rounded-lg absolute top-full w-[79px] m-3 "
        >
          <div className="absolute top-0 left-[19px] transform -translate-x-1/2 -translate-y-1/2 rotate-45 w-4 h-4 bg-white"></div>
          {message}
        </span>
      ) : null}
    </div>
  );
};

export default ToolTip;
