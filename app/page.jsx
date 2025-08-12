"use client";

import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  gridAtom,
  rowsAtom,
  colsAtom,
  setGridSizeAtom,
  clearGridAtom,
} from "../state/gridAtoms";
import EditableGrid from "../components/editable-grid";
import GridControls from "../components/grid-controls";

export default function Page() {
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

  const handleResize = ({ rows, cols }) => {
    setGridSize({ rows, cols });
  };

  const handleClear = () => {
    clearGrid();
  };

  return (
    <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
      <div>
        <GridControls
          rowCount={rowCount}
          colCount={colCount}
          onResize={handleResize}
          onClear={handleClear}
        />
        <EditableGrid grid={grid} onCellChange={handleCellChange} />
      </div>
    </div>
  );
}
