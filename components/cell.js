"use client";

import { useAtomValue, useSetAtom } from "jotai";
import { gridAtom } from "../state/gridAtoms";

export default function Cell({ r, c }) {
  const grid = useAtomValue(gridAtom);
  const setGrid = useSetAtom(gridAtom);
  const value = grid[r]?.[c] ?? "";

  const onChange = (e) => {
    const v = e.target.value;
    setGrid((prev) => {
      const next = prev.map((row) => row.slice());
      if (!next[r]) next[r] = [];
      next[r][c] = v;
      return next;
    });
  };

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
