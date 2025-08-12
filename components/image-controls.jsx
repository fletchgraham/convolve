"use client";

import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  rowsAtom,
  colsAtom,
  setGridSizeAtom,
  clearGridAtom,
  showImageBordersAtom,
  lerpFactorAtom,
  setLerpFactorAtom,
  loadPatternAtom,
} from "../state/gridAtoms";
import GridControls from "./grid-controls";

export default function ImageControls() {
  const rowCount = useAtomValue(rowsAtom);
  const colCount = useAtomValue(colsAtom);
  const [showImageBorders, setShowImageBorders] = useAtom(showImageBordersAtom);
  const lerpFactor = useAtomValue(lerpFactorAtom);
  const setGridSize = useSetAtom(setGridSizeAtom);
  const clearGrid = useSetAtom(clearGridAtom);
  const setLerpFactor = useSetAtom(setLerpFactorAtom);
  const loadPattern = useSetAtom(loadPatternAtom);

  const handleResize = ({ rows, cols }) => {
    setGridSize({ rows, cols });
  };

  const handleClear = () => {
    clearGrid();
  };

  const handleToggleBorders = (checked) => {
    setShowImageBorders(checked);
  };

  const handleLerpChange = (e) => {
    setLerpFactor(parseFloat(e.target.value));
  };

  const handleLoadPattern = (pattern) => {
    loadPattern(pattern);
  };

  const titleStyle = {
    fontSize: "1rem",
    fontWeight: "bold",
    marginBottom: 4,
  };

  const sliderContainerStyle = {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    padding: "8px 0",
    borderTop: "1px solid #ddd",
    marginTop: 8,
  };

  const sliderLabelStyle = {
    fontSize: "0.85rem",
    fontWeight: "bold",
    color: "#333",
  };

  const sliderStyle = {
    width: "100%",
    height: "20px",
    background: "#ddd",
    outline: "none",
    borderRadius: "10px",
  };

  const valueDisplayStyle = {
    fontSize: "0.8rem",
    color: "#666",
    textAlign: "center",
    fontFamily: "monospace",
  };

  const patternButtonStyle = {
    padding: "4px 8px",
    fontSize: "0.75rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    background: "#f5f5f5",
    cursor: "pointer",
    ":hover": {
      background: "#e5e5e5",
    },
  };

  const patternGridStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "4px",
    marginTop: "8px",
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

      <div style={sliderContainerStyle}>
        <label style={sliderLabelStyle}>Convolution Blend</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={lerpFactor}
          onChange={handleLerpChange}
          style={sliderStyle}
        />
        <div style={valueDisplayStyle}>
          {(lerpFactor * 100).toFixed(0)}% convolved
        </div>
        <div style={{ ...valueDisplayStyle, fontSize: "0.7rem" }}>
          0% = Original | 100% = Convolved
        </div>
      </div>

      <div style={sliderContainerStyle}>
        <label style={sliderLabelStyle}>Load Pattern</label>
        <div style={patternGridStyle}>
          <button
            style={patternButtonStyle}
            onClick={() => handleLoadPattern("center")}
          >
            Center
          </button>
          <button
            style={patternButtonStyle}
            onClick={() => handleLoadPattern("gradient")}
          >
            Gradient
          </button>
          <button
            style={patternButtonStyle}
            onClick={() => handleLoadPattern("checkerboard")}
          >
            Checker
          </button>
          <button
            style={patternButtonStyle}
            onClick={() => handleLoadPattern("edge")}
          >
            Edge
          </button>
          <button
            style={patternButtonStyle}
            onClick={() => handleLoadPattern("cross")}
          >
            Cross
          </button>
          <button style={patternButtonStyle} onClick={handleClear}>
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
