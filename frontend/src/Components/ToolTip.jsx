import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

export function Tooltip({ text, children }) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);
  const timeoutRef = useRef(null);

  const showTooltip = () => {
    clearTimeout(timeoutRef.current);
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 8, // 8px gap
        left: rect.left + rect.width / 2 + window.scrollX,
      });
    }
    setIsVisible(true);
  };

  const hideTooltip = () => {
    timeoutRef.current = setTimeout(() => setIsVisible(false), 100);
  };

  return (
    <>
      <div
        ref={triggerRef}
        className="relative inline-block"
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
      >
        {children}
      </div>

      {isVisible &&
        createPortal(
          <div
            ref={tooltipRef}
            style={{
              position: "absolute",
              top: `${position.top}px`,
              left: `${position.left}px`,
              transform: "translateX(-50%)",
              zIndex: 9999999999,
            }}
            className={`
              max-w-[400px]
              px-3 py-2 bg-tooltip text-light text-[13px] rounded-md whitespace-normal
              pointer-events-auto min-h-fit max-h-[160px] overflow-y-auto
              scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent
              after:content-[''] after:absolute after:top-0 after:left-1/2 after:-translate-x-1/2
              after:-translate-y-full after:border-4 after:border-transparent
              after:border-b-gray-900
            `}
            onMouseEnter={showTooltip}
            onMouseLeave={hideTooltip}
          >
            {text}
          </div>,
          document.body
        )}
    </>
  );
}
