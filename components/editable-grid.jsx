"use client";

import Cell from "./cell";

export default function EditableGrid({
  grid,
  onCellChange,
  showBorders = true,
}) {
  const rowCount = grid.length;
  const colCount = grid[0]?.length || 0;

  // Calculate min and max values in the grid for color mapping
  const flatValues = grid.flat().map((value) => parseFloat(value) || 0);
  const minValue = Math.min(...flatValues);
  const maxValue = Math.max(...flatValues);
  const valueRange = maxValue - minValue;

  // Function to map a cell value to a grayscale color
  const getColorForValue = (value) => {
    const numValue = parseFloat(value) || 0;
    if (valueRange === 0) {
      // If all values are the same, use middle gray
      return "rgb(128, 128, 128)";
    }

    // Map value to 0-255 range (0 = black, 255 = white)
    const normalizedValue = (numValue - minValue) / valueRange;
    const grayValue = Math.round(normalizedValue * 255);
    return `rgb(${grayValue}, ${grayValue}, ${grayValue})`;
  };

  // Dynamically calculate cell size to be responsive and square
  // Use CSS Grid with fractional units and aspect-ratio for perfect squares
  const containerStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${colCount}, 1fr)`,
    gridTemplateRows: `repeat(${rowCount}, 1fr)`,
    width: "100%",
    aspectRatio: `${colCount} / ${rowCount}`, // Maintains proportional container
    border: showBorders ? ".5px solid #000" : "none",
    overflow: "hidden",
    minWidth: 0,
    minHeight: 0,
    background: "#fff",
  };

  return (
    <div style={containerStyle}>
      {grid.map((row, r) =>
        row.map((value, c) => (
          <Cell
            key={`${r}-${c}`}
            value={value}
            onChange={(e) => onCellChange(r, c, e.target.value)}
            showBorders={showBorders}
            color={getColorForValue(value)}
          />
        ))
      )}
    </div>
  );
}
