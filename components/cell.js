"use client";

export default function Cell({ value, onChange }) {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        minWidth: 0,
        minHeight: 0,
      }}
    >
      <input
        value={value}
        onChange={onChange}
        style={{
          flex: 1,
          width: "100%",
          height: "100%",
          minWidth: 0,
          minHeight: 0,
          boxSizing: "border-box",
          border: ".5px solid #000",
          background: "blue",
          fontFamily: "monospace",
          fontSize: "0.85rem",
          textAlign: "center",
          padding: 0,
          margin: 0,
          outline: "none",
        }}
      />
    </div>
  );
}
