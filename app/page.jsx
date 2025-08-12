"use client";

import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  gridAtom,
  rowsAtom,
  colsAtom,
  setGridSizeAtom,
  clearGridAtom,
  showImageBordersAtom,
  kernelAtom,
  kernelSizeAtom,
  setKernelSizeAtom,
  clearKernelAtom,
} from "../state/gridAtoms";
import EditableGrid from "../components/editable-grid";
import GridControls from "../components/grid-controls";
import KernelControls from "../components/kernel-controls";

export default function Page() {
  // Image grid state
  const [grid, setGrid] = useAtom(gridAtom);
  const rowCount = useAtomValue(rowsAtom);
  const colCount = useAtomValue(colsAtom);
  const [showImageBorders, setShowImageBorders] = useAtom(showImageBordersAtom);
  const setGridSize = useSetAtom(setGridSizeAtom);
  const clearGrid = useSetAtom(clearGridAtom);

  // Kernel matrix state
  const [kernel, setKernel] = useAtom(kernelAtom);
  const kernelSize = useAtomValue(kernelSizeAtom);
  const setKernelSize = useSetAtom(setKernelSizeAtom);
  const clearKernel = useSetAtom(clearKernelAtom);

  const handleCellChange = (r, c, value) => {
    setGrid((prev) => {
      const next = prev.map((row) => row.slice());
      next[r][c] = value;
      return next;
    });
  };

  const handleKernelCellChange = (r, c, value) => {
    setKernel((prev) => {
      const next = prev.map((row) => row.slice());
      next[r][c] = value;
      return next;
    });
  };

  const handleResize = ({ rows, cols }) => {
    setGridSize({ rows, cols });
  };

  const handleKernelResize = (size) => {
    setKernelSize(size);
  };

  const handleClear = () => {
    clearGrid();
  };

  const handleKernelClear = () => {
    clearKernel();
  };

  const handleToggleBorders = (checked) => {
    setShowImageBorders(checked);
  };

  const panelStyle = {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  };

  const titleStyle = {
    fontSize: "1.2rem",
    fontWeight: "bold",
    marginBottom: 4,
  };

  return (
    <div style={{ display: "flex", gap: 32, alignItems: "flex-start" }}>
      {/* Left Panel - Kernel Matrix */}
      <div style={panelStyle}>
        <h2 style={titleStyle}>Kernel Matrix</h2>
        <KernelControls
          kernelSize={kernelSize}
          onResize={handleKernelResize}
          onClear={handleKernelClear}
        />
        <EditableGrid grid={kernel} onCellChange={handleKernelCellChange} />
      </div>

      {/* Right Panel - Image Grid */}
      <div style={panelStyle}>
        <h2 style={titleStyle}>Image</h2>
        <GridControls
          rowCount={rowCount}
          colCount={colCount}
          showBorders={showImageBorders}
          onResize={handleResize}
          onClear={handleClear}
          onToggleBorders={handleToggleBorders}
        />
        <EditableGrid
          grid={grid}
          onCellChange={handleCellChange}
          showBorders={showImageBorders}
        />
      </div>
    </div>
  );
}
