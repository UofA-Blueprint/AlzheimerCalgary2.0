import React, { FC, ReactNode, useRef, useState } from 'react';

interface Props {
  children: ReactNode;
  message?: string;
}

const ToolTip: FC<Props> = ({ children, message }): JSX.Element => {
  const tooltipRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ horizontal: 'center', vertical: 'top', closest: 'top' });
  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const delayTimeoutRef = useRef<number | null>(null);

  const showTooltip = () => {
    setTooltipVisible(true);
  };

  const handleMouseEnter = (event: any) => {
    if (delayTimeoutRef.current) {
      clearTimeout(delayTimeoutRef.current);
    }

    const { clientX, clientY } = event;
    const pos = determinePosition(clientX, clientY);
    setPosition(pos);

    delayTimeoutRef.current = window.setTimeout(showTooltip, 500);
  };

  const handleMouseLeave = () => {
    if (delayTimeoutRef.current) {
      clearTimeout(delayTimeoutRef.current);
    }
    setTooltipVisible(false);
  };

  const determinePosition = (clientX: number, clientY: number) => {
    if (!containerRef.current) return { horizontal: 'center', vertical: 'middle', closest: 'top' };
    const { left, top, right, bottom, width, height } = containerRef.current.getBoundingClientRect();
  
    // Define thresholds for considering the position as center or middle
    const horizontalCenterThreshold = width / 3;
    const verticalMiddleThreshold = height / 3;
  
    let horizontal = 'center';
    let vertical = 'middle';
  
    if (clientX < left + horizontalCenterThreshold) {
      horizontal = 'left';
    } else if (clientX > right - horizontalCenterThreshold) {
      horizontal = 'right';
    }
  
    if (clientY < top + verticalMiddleThreshold) {
      vertical = 'top';
    } else if (clientY > bottom - verticalMiddleThreshold) {
      vertical = 'bottom';
    }
  
    // Calculate distances to each side
    const distances = {
      top: Math.max(0, clientY - top),
      bottom: Math.max(0, bottom - clientY),
      left: Math.max(0, clientX - left),
      right: Math.max(0, right - clientX),
    };
  
    // Determine the closest side
    let closest: keyof typeof distances = 'top'; // Make sure closest can only be one of the key in distance object
    if (distances.bottom < distances[closest]) closest = 'bottom';
    if (distances.left < distances[closest]) closest = 'left';
    if (distances.right < distances[closest]) closest = 'right';
    
    return { horizontal, vertical, closest };
  };
  

  const getTooltipPositionClass = () => {
    const baseClass = "invisible group-hover:visible absolute opacity-0 group-hover:opacity-100 bg-white text-base px-4 py-2 rounded-lg shadow-md w-[79px] z-0";
    let positionClass = "";

    // Directly check for corner cases
    const isTop = position.vertical === 'top';
    const isBottom = position.vertical === 'bottom';
    const isLeft = position.horizontal === 'left';
    const isRight = position.horizontal === 'right';

    // Top left cases
    if (isTop && isLeft) {
      if (position.closest === 'left') {
        positionClass = "top-[0.02rem] mb-[-4rem] right-full mr-2";
      } else {
        positionClass = "left-10 -translate-x-1/2 bottom-full mb-2";
      }
    } 
    // Top right cases
    else if (isTop && isRight) {
      if (position.closest === 'right') {
        positionClass = "mb-[-2.47rem] left-full ml-2";
      } else {
        positionClass = "left-[13.885rem] -translate-x-1/2 bottom-full mb-2";
      }
    } 
    // Bottom right cases
    else if (isBottom && isRight) {
      if (position.closest === 'right') {
        positionClass = "bottom-[-0.02rem] mt-[-2.47rem] left-full ml-2";
      } else {
        positionClass = "top-full mt-2 left-[13.885rem] -translate-x-1/2";
      }
    }
    // Bottom left cases
    else if (isBottom && isLeft) {
      if (position.closest === 'left') {
        positionClass = "bottom-[-0.02rem] mt-[-2.47rem] right-full mr-2";
      } else {
        positionClass = "top-full mt-2 left-10 -translate-x-1/2";
      }
    } 
    else {
      // Handle non-corner cases
      if (isTop) {
        positionClass += " bottom-full mb-2";
      } else if (isBottom) {
        positionClass += " top-full mt-2";
      } else {
        positionClass += " top-1/2 -translate-y-1/2";
      }

      if (isLeft) {
        positionClass += " right-full mr-2";
      } else if (isRight) {
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

  // Directly check the position and closest to set the arrow class
  if (position.vertical === 'top') {
    if (position.closest === 'left') {
      arrowPositionClass = "top-[1rem] left-[3.75rem] translate-x-1/2 -translate-y-1/2";
    } else if (position.closest === 'right') {
      arrowPositionClass = "top-[1rem] right-[4.75rem] translate-x-1/2 -translate-y-1/2";
    } else {
      if (position.horizontal === 'left'){
        arrowPositionClass = "bottom-0 mb-[-0.375rem] left-[1.15rem] -translate-x-1/2";
      } else if (position.horizontal === 'right'){
        arrowPositionClass = "bottom-0 mb-[-0.375rem] left-[3.75rem] -translate-x-1/2";
      } else {
        arrowPositionClass = "bottom-0 mb-[-0.375rem] left-1/2 -translate-x-1/2";
      }
    }

  } else if (position.vertical === 'bottom') {
    if (position.closest === 'left') {
      arrowPositionClass = "bottom-[0.2rem] right-1 translate-x-1/2 -translate-y-1/2";
    } else if (position.closest === 'right') {
      arrowPositionClass = "bottom-[0.2rem] right-[4.75rem] translate-x-1/2 -translate-y-1/2";
    } else {
      if (position.horizontal === 'left'){
        arrowPositionClass = "top-0 mt-[-0.375rem] left-[1.15rem] -translate-x-1/2";
      } else if (position.horizontal === 'right'){
        arrowPositionClass = "top-0 mt-[-0.375rem] left-[3.75rem] -translate-x-1/2";
      } else {
        arrowPositionClass = "top-0 mt-[-0.375rem] left-1/2 -translate-x-1/2";
      }
    }

  } else {
    // Center the arrow vertically if not top or bottom
    arrowPositionClass = "top-1/2 -translate-y-1/2";
    if (position.horizontal === 'left') {
      arrowPositionClass += " right-1 mr-[-0.563rem]";
    } else if (position.horizontal === 'right') {
      arrowPositionClass += " left-1 ml-[-0.563rem]";
    } else {
      // Center the arrow horizontally if not left or right
      arrowPositionClass += " left-1/2 -translate-x-1/2";
    }
  }

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
          <div className={getArrowClass()}></div>
          {message}
        </span>
      )}
    </div>
  );
};

export default ToolTip;
