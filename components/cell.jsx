"use client";

export default function Cell({ value, onChange, showBorders = true, color = "blue" }) {
  const containerStyle = {
    display: "flex",
    width: "100%",
    height: "100%",
    minWidth: 0,
    minHeight: 0,
  };

  const inputStyle = {
    flex: 1,
    width: "100%",
    height: "100%",
    minWidth: 0,
    minHeight: 0,
    boxSizing: "border-box",
    border: showBorders ? ".5px solid #000" : "none",
    background: color,
    fontFamily: "monospace",
    fontSize: "0.85rem",
    textAlign: "center",
    padding: 0,
    margin: 0,
    outline: "none",
  };

  return (
    <div style={containerStyle}>
      <input value={value} onChange={onChange} style={inputStyle} />
    </div>
  );
}
