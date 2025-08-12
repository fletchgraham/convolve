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

export default function Page() {
  const [grid, setGrid] = useAtom(gridAtom);
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
    <EditableGrid
      grid={grid}
      onCellChange={handleCellChange}
      onResize={handleResize}
      onClear={handleClear}
    />
  );
}
