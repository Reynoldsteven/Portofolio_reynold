"use client";

import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";
import ParticleSphere from "./ParticleSphere";

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 55 }}
      gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
      dpr={[1, 1.2]}
      frameloop="always"
    >
      {/* Adaptively lower DPR when performance drops */}
      <AdaptiveDpr pixelated />
      <ParticleSphere count={600} />
    </Canvas>
  );
}
