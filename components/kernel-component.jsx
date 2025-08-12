"use client";

import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  kernelAtom,
  kernelSizeAtom,
  setKernelSizeAtom,
  clearKernelAtom,
} from "../state/gridAtoms";
import EditableGrid from "./editable-grid";
import KernelControls from "./kernel-controls";

export default function KernelComponent() {
  const [kernel, setKernel] = useAtom(kernelAtom);
  const kernelSize = useAtomValue(kernelSizeAtom);
  const setKernelSize = useSetAtom(setKernelSizeAtom);
  const clearKernel = useSetAtom(clearKernelAtom);

  const handleKernelCellChange = (r, c, value) => {
    setKernel((prev) => {
      const next = prev.map((row) => row.slice());
      next[r][c] = value;
      return next;
    });
  };

  const handleKernelResize = (size) => {
    setKernelSize(size);
  };

  const handleKernelClear = () => {
    clearKernel();
  };

  const titleStyle = {
    fontSize: "1.2rem",
    fontWeight: "bold",
    marginBottom: 4,
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <h2 style={titleStyle}>Kernel Matrix</h2>
      <KernelControls
        kernelSize={kernelSize}
        onResize={handleKernelResize}
        onClear={handleKernelClear}
      />
      <EditableGrid grid={kernel} onCellChange={handleKernelCellChange} />
    </div>
  );
}
