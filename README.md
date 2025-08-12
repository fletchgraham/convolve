# Kernel Image Convolution Demo

A Next.js application demonstrating 2D kernel convolution with real-time interactive visualization using Jotai state management.

## Features

- **Interactive Image Grid**: Editable 2D grid representing an image with grayscale values
- **Kernel Matrix**: Configurable convolution kernel with preset options
- **Real-time Convolution**: Live preview of convolution results with mirrored edge handling
- **Blend Control**: Slider to interpolate between original and convolved images
- **Preset Kernels**: Common image processing kernels (blur, sharpen, edge detection, etc.)

## Getting Started

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the demo.

## How to Use

1. **Edit the Image**: Click on any cell in the image grid to modify values (0-1 range)
2. **Select a Kernel**: Choose from preset kernels or edit the kernel matrix manually
3. **Adjust Blend**: Use the "Convolution Blend" slider to mix original and convolved images
4. **Resize Grids**: Change the dimensions of both image and kernel grids

## Implementation Details

### Convolution Library (`lib/convolution.js`)

- **Pure JavaScript implementation** for 2D convolution
- **Mirrored edge handling** to handle kernel overlap at image boundaries
- **Linear interpolation** for smooth blending between images
- **Normalization and clamping** utilities for value management

### State Management

Uses Jotai atoms for reactive state:

- `gridAtom`: Original image data
- `kernelAtom`: Convolution kernel matrix
- `convolvedImageAtom`: Derived convolved image
- `lerpFactorAtom`: Blend factor (0 = original, 1 = convolved)
- `renderedImageAtom`: Final blended image for display

### Visual Features

- **Grayscale rendering**: Values mapped to colors automatically
- **Real-time updates**: Changes reflect immediately
- **Responsive layout**: Maintains square cells and proper aspect ratios

## Kernel Presets

- **Identity**: No change
- **Box Blur**: Simple averaging blur
- **Gaussian Blur**: Weighted blur
- **Sharpen**: Edge enhancement
- **Edge Detection**: Highlight edges
- **Emboss**: 3D-like effect
- **Sobel X/Y**: Directional edge detection

## Technical Notes

- Convolution uses mirrored padding for edge pixels
- Values are normalized to 0-1 range for consistent visualization
- Original grid remains editable while displaying convolved results
- All computations happen in derived atoms for optimal performance
