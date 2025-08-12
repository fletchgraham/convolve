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
    <input
      value={value}
      onChange={onChange}
      style={{
        border: ".5px solid #000",
        background: "blue",
        fontFamily: "monospace",
        fontSize: "0.85rem",
        textAlign: "center",
      }}
    />
  );
}
