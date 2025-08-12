"use client";

import ControlPanel from "../components/control-panel";
import ImagePanel from "../components/image-panel";

export default function Page() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <ControlPanel />
      <div style={{ flex: 1, padding: 16 }}>
        <ImagePanel />
      </div>
    </div>
  );
}
