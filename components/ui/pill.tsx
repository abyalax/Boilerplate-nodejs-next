"use client";

import { X } from "lucide-react";
import { FC, useEffect, useState } from "react";

interface PillProps {
  selectedCount: number;
  onRemove: () => void;
}

export const Pill: FC<PillProps> = ({ selectedCount, onRemove }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (selectedCount > 0) {
      setShouldRender(true);
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      setTimeout(() => setShouldRender(false), 200);
    }
  }, [selectedCount]);

  if (!shouldRender) return null;

  return (
    <div
      className={`
        inline-flex items-center gap-2 px-3 py-1.5 
        bg-blue-100 text-blue-800 rounded-full
        text-lg font-normal
        transition-all duration-200 ease-in-out
        ${isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-2 scale-95"}
      `}
    >
      <span>{selectedCount}</span>
      <button
        onClick={onRemove}
        className="
          ml-1 p-0.5 rounded-full
          hover:bg-blue-200 
          transition-colors duration-150
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
        "
        aria-label="Clear selection"
      >
        <X size={14} className="text-blue-600" />
      </button>
    </div>
  );
};
