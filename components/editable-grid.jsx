"use client";

import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  gridAtom,
  rowsAtom,
  colsAtom,
  setGridSizeAtom,
  clearGridAtom,
} from "../state/gridAtoms";

export default function EditableGrid() {
  const [grid, setGrid] = useAtom(gridAtom);
  const rowCount = useAtomValue(rowsAtom);
  const colCount = useAtomValue(colsAtom);
  const setGridSize = useSetAtom(setGridSizeAtom);
  const clearGrid = useSetAtom(clearGridAtom);

  const handleCellChange = (r, c, value) => {
    setGrid((prev) => {
      const next = prev.map((row) => row.slice());
      next[r][c] = value;
      return next;
    });
  };

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
                setGridSize({ rows: Number(e.target.value), cols: colCount })
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
                setGridSize({ rows: rowCount, cols: Number(e.target.value) })
              }
              style={{ width: 64, marginLeft: 6 }}
            />
          </label>
          <button onClick={() => clearGrid()}>Clear</button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${colCount}, 1fr)`,
            width: "100%",
            aspectRatio: `${colCount} / ${rowCount}`,
            border: ".5px solid #000",
          }}
        >
          {grid.map((row, r) =>
            row.map((value, c) => (
              <input
                key={`${r}-${c}`}
                value={value}
                onChange={(e) => handleCellChange(r, c, e.target.value)}
                style={{
                  border: ".5px solid #000",
                  background: "blue",
                  fontFamily: "monospace",
                  fontSize: "0.85rem",
                  textAlign: "center",
                }}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
