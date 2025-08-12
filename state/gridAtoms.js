"use client";

import { atom } from "jotai";

const makeInitialGrid = (rows = 3, cols = 3) =>
  Array.from({ length: rows }, (_, r) =>
    Array.from({ length: cols }, (_, c) => 0)
  );

const makeInitialKernel = (size = 3) =>
  Array.from({ length: size }, (_, r) =>
    Array.from({ length: size }, (_, c) => 0)
  );

const ensureSize = (grid, newRows, newCols) => {
  const rows = Math.max(1, newRows | 0);
  const cols = Math.max(1, newCols | 0);
  const currentRows = grid.length;
  const currentCols = grid[0]?.length || 0;

  // Clip or extend rows
  const resizedRows = Array.from({ length: rows }, (_, r) => {
    const row = r < currentRows ? grid[r] : [];
    // Clip or extend columns
    return Array.from({ length: cols }, (_, c) =>
      c < currentCols ? row[c] : ""
    );
  });
  return resizedRows;
};

// Image grid atoms (existing)
export const gridAtom = atom(makeInitialGrid());

export const rowsAtom = atom((get) => get(gridAtom).length);
export const colsAtom = atom((get) => get(gridAtom)[0]?.length || 0);

export const showImageBordersAtom = atom(false);

export const setGridSizeAtom = atom(null, (get, set, { rows, cols }) => {
  const current = get(gridAtom);
  set(gridAtom, ensureSize(current, rows, cols));
});

export const clearGridAtom = atom(null, (get, set) => {
  const rows = get(rowsAtom);
  const cols = get(colsAtom);
  set(
    gridAtom,
    Array.from({ length: rows }, () => Array.from({ length: cols }, () => ""))
  );
});

// Kernel matrix atoms (new)
export const kernelAtom = atom(makeInitialKernel());

export const kernelSizeAtom = atom((get) => get(kernelAtom).length);

export const setKernelSizeAtom = atom(null, (get, set, size) => {
  // Ensure odd number, minimum 3
  const oddSize = Math.max(3, size % 2 === 0 ? size + 1 : size);
  set(kernelAtom, makeInitialKernel(oddSize));
});

export const clearKernelAtom = atom(null, (get, set) => {
  const size = get(kernelSizeAtom);
  set(
    kernelAtom,
    Array.from({ length: size }, () => Array.from({ length: size }, () => ""))
  );
});

// Kernel presets based on common image processing kernels
export const kernelPresets = {
  identity: {
    name: "Identity",
    matrix: [
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 0],
    ],
  },
  boxBlur: {
    name: "Box Blur",
    matrix: [
      [1 / 9, 1 / 9, 1 / 9],
      [1 / 9, 1 / 9, 1 / 9],
      [1 / 9, 1 / 9, 1 / 9],
    ],
  },
  gaussianBlur: {
    name: "Gaussian Blur",
    matrix: [
      [1 / 16, 2 / 16, 1 / 16],
      [2 / 16, 4 / 16, 2 / 16],
      [1 / 16, 2 / 16, 1 / 16],
    ],
  },
  sharpen: {
    name: "Sharpen",
    matrix: [
      [0, -1, 0],
      [-1, 5, -1],
      [0, -1, 0],
    ],
  },
  edgeDetection: {
    name: "Edge Detection",
    matrix: [
      [0, 1, 0],
      [1, -4, 1],
      [0, 1, 0],
    ],
  },
  edgeDetection2: {
    name: "Edge Detection 2",
    matrix: [
      [-1, -1, -1],
      [-1, 8, -1],
      [-1, -1, -1],
    ],
  },
  emboss: {
    name: "Emboss",
    matrix: [
      [-2, -1, 0],
      [-1, 1, 1],
      [0, 1, 2],
    ],
  },
  sobelX: {
    name: "Sobel X",
    matrix: [
      [-1, 0, 1],
      [-2, 0, 2],
      [-1, 0, 1],
    ],
  },
  sobelY: {
    name: "Sobel Y",
    matrix: [
      [-1, -2, -1],
      [0, 0, 0],
      [1, 2, 1],
    ],
  },
};

export const setKernelPresetAtom = atom(null, (get, set, presetKey) => {
  const preset = kernelPresets[presetKey];
  if (preset) {
    set(
      kernelAtom,
      preset.matrix.map((row) => row.map((val) => val.toString()))
    );
  }
});
