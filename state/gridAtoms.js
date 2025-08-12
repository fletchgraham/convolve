"use client";

import { atom } from "jotai";
import {
  convolve2D,
  lerp2D,
  normalize2D,
  clamp2D,
} from "../lib/convolution.js";

const makeInitialGrid = (rows = 5, cols = 5) =>
  Array.from({ length: rows }, (_, r) =>
    Array.from({ length: cols }, (_, c) => {
      // Create a simple test pattern - a bright center with darker edges
      const centerR = Math.floor(rows / 2);
      const centerC = Math.floor(cols / 2);
      const distFromCenter = Math.max(
        Math.abs(r - centerR),
        Math.abs(c - centerC)
      );
      return (1 - distFromCenter / Math.max(centerR, centerC)).toString();
    })
  );

const makeInitialKernel = (size = 3) => {
  // Start with a simple box blur kernel for demonstration
  const value = (1 / (size * size)).toString();
  return Array.from({ length: size }, (_, r) =>
    Array.from({ length: size }, (_, c) => value)
  );
};

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

// Convolution and lerp atoms
export const convolvedImageAtom = atom((get) => {
  const image = get(gridAtom);
  const kernel = get(kernelAtom);

  if (!image || !kernel || image.length === 0 || kernel.length === 0) {
    return image || [];
  }

  // Ensure both image and kernel have valid dimensions
  const imageRows = image.length;
  const imageCols = image[0]?.length || 0;
  const kernelRows = kernel.length;
  const kernelCols = kernel[0]?.length || 0;

  if (
    imageRows === 0 ||
    imageCols === 0 ||
    kernelRows === 0 ||
    kernelCols === 0
  ) {
    return image;
  }

  try {
    const convolved = convolve2D(image, kernel);
    // Normalize the result to prevent extreme values and ensure good visualization
    return normalize2D(convolved);
  } catch (error) {
    console.warn("Convolution failed:", error);
    return image;
  }
});

// Lerp factor for blending original and convolved images
export const lerpFactorAtom = atom(0.5);

// Final rendered image (lerp between original and convolved)
export const renderedImageAtom = atom((get) => {
  const originalImage = get(gridAtom);
  const convolvedImage = get(convolvedImageAtom);
  const lerpFactor = get(lerpFactorAtom);

  try {
    // Convert original image values to numbers for lerping
    const normalizedOriginal = originalImage.map((row) =>
      row.map((val) => parseFloat(val) || 0)
    );

    const lerpedImage = lerp2D(normalizedOriginal, convolvedImage, lerpFactor);

    // Clamp values to reasonable range for display
    return clamp2D(lerpedImage, 0, 1);
  } catch (error) {
    console.warn("Image lerp failed:", error);
    return originalImage;
  }
});

// Helper atom to set lerp factor with clamping
export const setLerpFactorAtom = atom(null, (get, set, factor) => {
  const clampedFactor = Math.max(0, Math.min(1, parseFloat(factor) || 0));
  set(lerpFactorAtom, clampedFactor);
});

// Pattern loading atom
export const loadPatternAtom = atom(null, (get, set, pattern) => {
  const rows = get(rowsAtom);
  const cols = get(colsAtom);
  let newGrid;

  switch (pattern) {
    case "center":
      // Bright center, dark edges
      newGrid = Array.from({ length: rows }, (_, r) =>
        Array.from({ length: cols }, (_, c) => {
          const centerR = Math.floor(rows / 2);
          const centerC = Math.floor(cols / 2);
          const distFromCenter = Math.max(
            Math.abs(r - centerR),
            Math.abs(c - centerC)
          );
          return (
            1 -
            distFromCenter / Math.max(centerR, centerC, 1)
          ).toString();
        })
      );
      break;
    case "gradient":
      // Horizontal gradient
      newGrid = Array.from({ length: rows }, (_, r) =>
        Array.from({ length: cols }, (_, c) =>
          (c / Math.max(cols - 1, 1)).toString()
        )
      );
      break;
    case "checkerboard":
      // Checkerboard pattern
      newGrid = Array.from({ length: rows }, (_, r) =>
        Array.from({ length: cols }, (_, c) => ((r + c) % 2).toString())
      );
      break;
    case "edge":
      // Edge pattern (1s on border, 0s inside)
      newGrid = Array.from({ length: rows }, (_, r) =>
        Array.from({ length: cols }, (_, c) =>
          r === 0 || r === rows - 1 || c === 0 || c === cols - 1 ? "1" : "0"
        )
      );
      break;
    case "cross":
      // Cross pattern
      newGrid = Array.from({ length: rows }, (_, r) =>
        Array.from({ length: cols }, (_, c) => {
          const centerR = Math.floor(rows / 2);
          const centerC = Math.floor(cols / 2);
          return r === centerR || c === centerC ? "1" : "0";
        })
      );
      break;
    default:
      return;
  }

  if (newGrid) {
    set(gridAtom, newGrid);
  }
});
