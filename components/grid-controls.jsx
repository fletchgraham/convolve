"use client";

export default function GridControls({
  rowCount,
  colCount,
  showBorders,
  onResize,
  onClear,
  onToggleBorders,
}) {
  const controlsStyle = {
    marginBottom: 8,
    display: "flex",
    gap: 8,
    alignItems: "center",
  };

  const inputStyle = {
    width: 64,
    marginLeft: 6,
  };

  return (
    <div style={controlsStyle}>
      <label>
        Rows:
        <input
          type="number"
          min={1}
          value={rowCount}
          onChange={(e) =>
            onResize({ rows: Number(e.target.value), cols: colCount })
          }
          style={inputStyle}
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
          style={inputStyle}
        />
      </label>
      <label>
        <input
          type="checkbox"
          checked={showBorders}
          onChange={(e) => onToggleBorders(e.target.checked)}
        />
        Show Borders
      </label>
      <button onClick={() => onClear()}>Clear</button>
    </div>
  );
}
