"use client";

import Cell from "./cell";

export default function EditableGrid({
  grid,
  onCellChange,
  onResize,
  onClear,
}) {
  const rowCount = grid.length;
  const colCount = grid[0]?.length || 0;

  // Dynamically calculate cell size so all cells are square
  const maxGridSize = 400; // px
  const cellSize = Math.floor(maxGridSize / Math.max(colCount, rowCount));
  const gridWidth = cellSize * colCount;
  const gridHeight = cellSize * rowCount;

  return (
    <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
      <div>
        <div
          style={{
            marginBottom: 8,
            display: "flex",
            gap: 8,
            alignItems: "center",
          }}
        >
          <label>
            Rows:
            <input
              type="number"
              min={1}
              value={rowCount}
              onChange={(e) =>
                onResize({ rows: Number(e.target.value), cols: colCount })
              }
              style={{ width: 64, marginLeft: 6 }}
            />
          </label>
          <label>
            Cols:
            <input
              type="number"
              min={1}
              value={colCount}
              onChange={(e) =>
                onResize({ rows: rowCount, cols: Number(e.target.value) })
              }
              style={{ width: 64, marginLeft: 6 }}
            />
          </label>
          <button onClick={() => onClear()}>Clear</button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${colCount}, ${cellSize}px)`,
            gridTemplateRows: `repeat(${rowCount}, ${cellSize}px)`,
            width: gridWidth,
            height: gridHeight,
            border: ".5px solid #000",
            overflow: "hidden",
            minWidth: 0,
            minHeight: 0,
            background: "#fff",
          }}
        >
          {grid.map((row, r) =>
            row.map((value, c) => (
              <Cell
                key={`${r}-${c}`}
                value={value}
                onChange={(e) => onCellChange(r, c, e.target.value)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
