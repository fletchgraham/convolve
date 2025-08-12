"use client";

import { kernelPresets } from "../state/gridAtoms";

export default function KernelControls({
  kernelSize,
  onResize,
  onClear,
  onPresetSelect,
}) {
  const controlsStyle = {
    marginBottom: 8,
    display: "flex",
    gap: 8,
    alignItems: "center",
    flexWrap: "wrap",
  };

  const inputStyle = {
    width: 64,
    marginLeft: 6,
  };

  const selectStyle = {
    marginLeft: 6,
    padding: "2px 4px",
  };

  return (
    <div style={controlsStyle}>
      <label>
        Kernel Size:
        <input
          type="number"
          min={3}
          step={2}
          value={kernelSize}
          onChange={(e) => onResize(Number(e.target.value))}
          style={inputStyle}
        />
      </label>

      <label>
        Preset:
        <select
          onChange={(e) => onPresetSelect(e.target.value)}
          style={selectStyle}
          defaultValue=""
        >
          <option value="">Select a preset...</option>
          {Object.entries(kernelPresets).map(([key, preset]) => (
            <option key={key} value={key}>
              {preset.name}
            </option>
          ))}
        </select>
      </label>

      <button onClick={() => onClear()}>Clear</button>
    </div>
  );
}
