"use client";

export default function KernelControls({ kernelSize, onResize, onClear }) {
  const controlsStyle = {
    marginBottom: 8,
    display: "flex",
    gap: 8,
    alignItems: "center",
  };

  const inputStyle = {
    width: 64,
    marginLeft: 6,
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
      <button onClick={() => onClear()}>Clear</button>
    </div>
  );
}
