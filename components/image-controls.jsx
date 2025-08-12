"use client";

import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  rowsAtom,
  colsAtom,
  setGridSizeAtom,
  clearGridAtom,
  showImageBordersAtom,
} from "../state/gridAtoms";
import GridControls from "./grid-controls";

export default function ImageControls() {
  const rowCount = useAtomValue(rowsAtom);
  const colCount = useAtomValue(colsAtom);
  const [showImageBorders, setShowImageBorders] = useAtom(showImageBordersAtom);
  const setGridSize = useSetAtom(setGridSizeAtom);
  const clearGrid = useSetAtom(clearGridAtom);

  const handleResize = ({ rows, cols }) => {
    setGridSize({ rows, cols });
  };

  const handleClear = () => {
    clearGrid();
  };

  const handleToggleBorders = (checked) => {
    setShowImageBorders(checked);
  };

  const titleStyle = {
    fontSize: "1rem",
    fontWeight: "bold",
    marginBottom: 4,
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <h3 style={titleStyle}>Image Controls</h3>
      <GridControls
        rowCount={rowCount}
        colCount={colCount}
        showBorders={showImageBorders}
        onResize={handleResize}
        onClear={handleClear}
        onToggleBorders={handleToggleBorders}
      />
    </div>
  );
}
