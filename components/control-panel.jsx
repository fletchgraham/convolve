"use client";

import KernelComponent from "./kernel-component";
import ImageControls from "./image-controls";

export default function ControlPanel() {
  const panelStyle = {
    display: "flex",
    flexDirection: "column",
    gap: 24,
    padding: 16,
    borderRight: "2px solid #ccc",
    minWidth: 300,
  };

  return (
    <div style={panelStyle}>
      <KernelComponent />
      <ImageControls />
    </div>
  );
}
