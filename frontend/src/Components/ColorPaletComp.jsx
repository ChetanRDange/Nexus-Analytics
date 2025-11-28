import React, { useState } from "react";

const ColorPaletComp = ({ title }) => {
  const [selectedColor, setSelectedColor] = useState("#7367F0");

  const predefinedColors = [
    "#7367F0", // Primary purple
    "#28C76F", // Success green
    "#EA5455", // Danger red
    "#FF9F43", // Warning orange
    "#00CFE8", // Info cyan
    "#1E1E1E", // Dark
    "#4B4B4B", // Gray
    "#82868B", // Secondary
  ];

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {title}
      </label>
      <div className="flex flex-wrap gap-3 items-center">
        {predefinedColors.map((color, index) => (
          <button
            key={index}
            onClick={() => handleColorChange(color)}
            className={`w-8 h-8 rounded-full border-2 transition-all duration-200 hover:scale-110 ${selectedColor === color
                ? "border-gray-800 ring-2 ring-offset-2 ring-gray-400"
                : "border-gray-200"
              }`}
            style={{ backgroundColor: color }}
            title={color}
          />
        ))}
        <div className="relative">
          <input
            type="color"
            value={selectedColor}
            onChange={(e) => handleColorChange(e.target.value)}
            className="w-8 h-8 rounded-full cursor-pointer border-2 border-gray-200 overflow-hidden"
            style={{ padding: 0 }}
          />
        </div>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <span className="text-xs text-gray-500">Selected:</span>
        <span
          className="inline-block w-4 h-4 rounded-full border border-gray-300"
          style={{ backgroundColor: selectedColor }}
        />
        <span className="text-xs font-mono text-gray-600">{selectedColor}</span>
      </div>
    </div>
  );
};

export default ColorPaletComp;
