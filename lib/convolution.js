/**
 * 2D Convolution Library
 * Pure JavaScript functions for applying 2D kernel convolution with mirroring edge handling
 */

/**
 * Applies mirrored padding to get a value from the image at any position
 * @param {Array[]} image - 2D array representing the image
 * @param {number} row - Row index (can be out of bounds)
 * @param {number} col - Column index (can be out of bounds)
 * @returns {number} The mirrored value at the given position
 */
function getMirroredValue(image, row, col) {
  const rows = image.length;
  const cols = image[0]?.length || 0;

  if (rows === 0 || cols === 0) return 0;

  // Mirror the indices if they're out of bounds
  let mirroredRow = row;
  let mirroredCol = col;

  // Handle row mirroring
  if (mirroredRow < 0) {
    mirroredRow = Math.abs(mirroredRow) - 1;
  } else if (mirroredRow >= rows) {
    mirroredRow = rows - 1 - (mirroredRow - rows);
  }

  // Handle column mirroring
  if (mirroredCol < 0) {
    mirroredCol = Math.abs(mirroredCol) - 1;
  } else if (mirroredCol >= cols) {
    mirroredCol = cols - 1 - (mirroredCol - cols);
  }

  // Ensure we're still in bounds after mirroring (for edge cases)
  mirroredRow = Math.max(0, Math.min(rows - 1, mirroredRow));
  mirroredCol = Math.max(0, Math.min(cols - 1, mirroredCol));

  return parseFloat(image[mirroredRow][mirroredCol]) || 0;
}

/**
 * Applies a 2D kernel convolution to an image using mirrored edge handling
 * @param {Array[]} image - 2D array representing the image (values should be numbers or numeric strings)
 * @param {Array[]} kernel - 2D array representing the convolution kernel
 * @returns {Array[]} New 2D array with convolution applied
 */
export function convolve2D(image, kernel) {
  if (!image || !kernel || image.length === 0 || kernel.length === 0) {
    return image || [];
  }

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

  // Calculate kernel center (assumes odd-sized kernel)
  const kernelCenterRow = Math.floor(kernelRows / 2);
  const kernelCenterCol = Math.floor(kernelCols / 2);

  // Create result array
  const result = Array.from({ length: imageRows }, () =>
    Array.from({ length: imageCols }, () => 0)
  );

  // Apply convolution
  for (let imageRow = 0; imageRow < imageRows; imageRow++) {
    for (let imageCol = 0; imageCol < imageCols; imageCol++) {
      let sum = 0;

      // Apply kernel
      for (let kernelRow = 0; kernelRow < kernelRows; kernelRow++) {
        for (let kernelCol = 0; kernelCol < kernelCols; kernelCol++) {
          // Calculate position in image corresponding to this kernel position
          const imageRowPos = imageRow + kernelRow - kernelCenterRow;
          const imageColPos = imageCol + kernelCol - kernelCenterCol;

          // Get mirrored value from image
          const imageValue = getMirroredValue(image, imageRowPos, imageColPos);
          const kernelValue = parseFloat(kernel[kernelRow][kernelCol]) || 0;

          sum += imageValue * kernelValue;
        }
      }

      result[imageRow][imageCol] = sum;
    }
  }

  return result;
}

/**
 * Linear interpolation between two 2D arrays
 * @param {Array[]} array1 - First 2D array
 * @param {Array[]} array2 - Second 2D array
 * @param {number} t - Interpolation factor (0 = array1, 1 = array2)
 * @returns {Array[]} Interpolated 2D array
 */
export function lerp2D(array1, array2, t) {
  if (!array1 || !array2) return array1 || array2 || [];

  const rows = Math.max(array1.length, array2.length);
  const cols = Math.max(array1[0]?.length || 0, array2[0]?.length || 0);

  if (rows === 0 || cols === 0) return [];

  const result = Array.from({ length: rows }, (_, r) =>
    Array.from({ length: cols }, (_, c) => {
      const val1 = parseFloat(array1[r]?.[c]) || 0;
      const val2 = parseFloat(array2[r]?.[c]) || 0;
      return val1 * (1 - t) + val2 * t;
    })
  );

  return result;
}

/**
 * Clamps values in a 2D array to a specified range
 * @param {Array[]} array - 2D array to clamp
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {Array[]} New 2D array with clamped values
 */
export function clamp2D(array, min = 0, max = 1) {
  return array.map((row) =>
    row.map((value) => Math.max(min, Math.min(max, parseFloat(value) || 0)))
  );
}

/**
 * Normalizes a 2D array to a 0-1 range
 * @param {Array[]} array - 2D array to normalize
 * @returns {Array[]} New 2D array with normalized values
 */
export function normalize2D(array) {
  if (!array || array.length === 0) return array;

  let min = Infinity;
  let max = -Infinity;

  // Find min and max values
  for (const row of array) {
    for (const value of row) {
      const num = parseFloat(value) || 0;
      min = Math.min(min, num);
      max = Math.max(max, num);
    }
  }

  // Avoid division by zero
  if (max === min) return array.map((row) => row.map(() => 0));

  const range = max - min;

  return array.map((row) =>
    row.map((value) => ((parseFloat(value) || 0) - min) / range)
  );
}
