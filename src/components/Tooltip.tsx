import React, { FC, ReactNode, useRef, useState } from 'react';

interface Props {
  children: ReactNode;
  message?: string;
}

const ToolTip: FC<Props> = ({ children, message }): JSX.Element => {
  const tooltipRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ horizontal: 'center', vertical: 'top' });
  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const delayTimeoutRef = useRef<number | null>(null);

  const showTooltip = () => {
    setTooltipVisible(true);
  };

  const handleMouseEnter = (event: any) => {
    // Clear any existing timeouts
    if (delayTimeoutRef.current) {
      clearTimeout(delayTimeoutRef.current);
    }

    const { clientX, clientY } = event;
    const pos = determinePosition(clientX, clientY);
    setPosition(pos);

    // Set a new timeout
    delayTimeoutRef.current = window.setTimeout(showTooltip, 500); // Delay for a bit
  };

  const handleMouseLeave = () => {
    // Clear the timeout to prevent the tooltip from showing after leaving
    if (delayTimeoutRef.current) {
      clearTimeout(delayTimeoutRef.current);
    }
    setTooltipVisible(false); // Hide the tooltip immediately when mouse leaves
  };

  const determinePosition = (clientX: number, clientY: number) => {
    if (!containerRef.current) return { horizontal: 'center', vertical: 'middle' };
    const { left, top, right, bottom, width, height } = containerRef.current.getBoundingClientRect();

    // Determine horizontal position
    const isLeft = clientX < left + width / 3;
    const isRight = clientX > right - width / 3;
    const horizontal = isLeft ? 'left' : isRight ? 'right' : 'center';

    // Determine vertical position
    const isTop = clientY < top + height / 3;
    const isBottom = clientY > bottom - height / 3;
    const vertical = isTop ? 'top' : isBottom ? 'bottom' : 'middle';

    return { horizontal, vertical };
  };

  const getTooltipPositionClass = () => {
    const baseClass = "invisible group-hover:visible absolute opacity-0 group-hover:opacity-100 bg-white text-base px-4 py-2 rounded-lg shadow-md w-[79px] z-0";
    let positionClass = "";
  
    // Define corner cases
    const cornerCases = [
      new Set(['top', 'left']),
      new Set(['top', 'right']),
      new Set(['bottom', 'left']),
      new Set(['bottom', 'right']),
    ];
  
    // Current position set
    const currentPosition = new Set([position.vertical, position.horizontal]);
  
    // Check if current position is a corner case
    const isCornerCase = cornerCases.some(cornerCase => cornerCase.size === currentPosition.size && [...cornerCase].every(pos => currentPosition.has(pos)));
  
    if (isCornerCase) {
      if (position.vertical === 'top' && position.horizontal === 'left') {
        positionClass = "bottom-full mb-[-4rem] right-full mr-2";
      } else if (position.vertical === 'top' && position.horizontal === 'right') {
        positionClass = "bottom-full mb-[-4rem] left-full ml-2";
      } else if (position.vertical === 'bottom' && position.horizontal === 'left') {
        positionClass = "top-full mt-[-4rem] right-full mr-2";
      } else if (position.vertical === 'bottom' && position.horizontal === 'right') {
        positionClass = "top-full mt-[-4rem] left-full ml-2";
      }
    } else {
      // Handle non-corner cases
      if (position.vertical === 'top') {
        positionClass += " bottom-full mb-2";
      } else if (position.vertical === 'bottom') {
        positionClass += " top-full mt-2";
      } else {
        positionClass += " top-1/2 -translate-y-1/2";
      }
  
      if (position.horizontal === 'left') {
        positionClass += " right-full mr-2";
      } else if (position.horizontal === 'right') {
        positionClass += " left-full ml-2";
      } else {
        positionClass += " left-1/2 -translate-x-1/2";
      }
    }
  
    return `${baseClass} ${positionClass}`;
  };
  

  const getArrowClass = () => {
    const baseArrowClass = "absolute w-4 h-4 bg-white transform rotate-45 z-[-1]";
    let arrowPositionClass = "";
  
    // Define corner cases
    const cornerCases = [
      new Set(['top', 'left']),
      new Set(['top', 'right']),
      new Set(['bottom', 'left']),
      new Set(['bottom', 'right']),
    ];
  
    // Current position set
    const currentPosition = new Set([position.vertical, position.horizontal]);
  
    // Check if current position is a corner case
    const isCornerCase = cornerCases.some(cornerCase => cornerCase.size === currentPosition.size && [...cornerCase].every(pos => currentPosition.has(pos)));

    if (isCornerCase) {
      if (position.vertical === 'top' && position.horizontal === 'left') {
        arrowPositionClass = "bottom-[1.9rem] left-[3.75rem] translate-x-1/2 -translate-y-1/2";
      } else if (position.vertical === 'top' && position.horizontal === 'right') {
        arrowPositionClass = "bottom-[1.9rem] right-[4.75rem] translate-x-1/2 -translate-y-1/2";
      } else if (position.vertical === 'bottom' && position.horizontal === 'left') {
        arrowPositionClass = "top-[2.8rem] right-1 translate-x-1/2 -translate-y-1/2 ";
      } else if (position.vertical === 'bottom' && position.horizontal === 'right') {
        arrowPositionClass = "top-[2.8rem] right-[4.75rem] translate-x-1/2 -translate-y-1/2 ";
      }
    } else {
        // Handle non-corner cases
        if (position.vertical === 'top') {
          arrowPositionClass += " bottom-0 mb-[-6px]";
        } else if (position.vertical === 'bottom') {
          arrowPositionClass += " top-0 mt-[-6px]";
        } else {
          // Center the arrow vertically
          arrowPositionClass += " top-1/2 -translate-y-1/2";
        }
        
        if (position.horizontal === 'left') {
          arrowPositionClass += " right-1 mr-[-9px]";
  
        } else if (position.horizontal === 'right') {
          arrowPositionClass += " left-1 ml-[-9px] rotate-15";
        } else {
          // Center the arrow horizontally
          arrowPositionClass += " left-1/2 -translate-x-1/2";
        }
    }
  
    console.log("This is the arrow position:", `vertical = ${position.vertical}`, `, horizontal = ${position.horizontal}`);
  
    return `${baseArrowClass} ${arrowPositionClass}`;
  };
  

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative inline-block"
    >
      {children}
      {message && isTooltipVisible && (
        <span
          ref={tooltipRef}
          className={getTooltipPositionClass()}
          style={{ visibility: isTooltipVisible ? 'visible' : 'hidden' }}
        >
          <div 
          className={getArrowClass()}
          ></div>
          {message}
        </span>
      )}
    </div>
  );
};

export default ToolTip;
