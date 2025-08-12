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
  const flatValues = grid.flat().map(value => parseFloat(value) || 0);
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

  // Dynamically calculate cell size so all cells are square
  const maxGridSize = 400; // px
  const cellSize = Math.floor(maxGridSize / Math.max(colCount, rowCount));
  const gridWidth = cellSize * colCount;
  const gridHeight = cellSize * rowCount;

  const containerStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${colCount}, ${cellSize}px)`,
    gridTemplateRows: `repeat(${rowCount}, ${cellSize}px)`,
    width: gridWidth,
    height: gridHeight,
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
