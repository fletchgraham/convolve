"use client";

import { useAtom, useAtomValue } from "jotai";
import {
  gridAtom,
  showImageBordersAtom,
  renderedImageAtom,
} from "../state/gridAtoms";
import ConvolutionGrid from "./convolution-grid";

export default function ImagePanel() {
  const [grid, setGrid] = useAtom(gridAtom);
  const renderedImage = useAtomValue(renderedImageAtom);
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

  const panelStyle = {
    flex: 1, // Take up remaining space after control panel
    display: "flex",
    flexDirection: "column",
    minWidth: 0, // Allow shrinking if needed
  };

  return (
    <div style={panelStyle}>
      <ConvolutionGrid
        originalGrid={grid}
        renderedGrid={renderedImage}
        onCellChange={handleCellChange}
        showBorders={showImageBorders}
      />
    </div>
  );
}
