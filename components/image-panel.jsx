"use client";

import { useAtom, useAtomValue } from "jotai";
import { gridAtom, showImageBordersAtom } from "../state/gridAtoms";
import EditableGrid from "./editable-grid";

export default function ImagePanel() {
  const [grid, setGrid] = useAtom(gridAtom);
  const showImageBorders = useAtomValue(showImageBordersAtom);

  const handleCellChange = (r, c, value) => {
    setGrid((prev) => {
      const next = prev.map((row) => row.slice());
      next[r][c] = value;
      return next;
    });
  };

  const titleStyle = {
    fontSize: "1.2rem",
    fontWeight: "bold",
    marginBottom: 4,
  };

  return (
    <div>
      <EditableGrid
        grid={grid}
        onCellChange={handleCellChange}
        showBorders={showImageBorders}
      />
    </div>
  );
}
