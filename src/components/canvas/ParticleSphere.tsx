"use client";

/**
 * ParticleSphere — animated dots on a sphere surface.
 * - Particles breathe/float on their own (sine-wave offsets)
 * - On hover: particles scatter outward
 * - Reduced count for better performance
 */

import { useRef, useMemo, useEffect, useCallback } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "next-themes";

interface Props {
  count?: number;
}

export default function ParticleSphere({ count = 600 }: Props) {
  const pointsRef   = useRef<THREE.Points>(null!);
  const geoRef      = useRef<THREE.BufferGeometry>(null!);
  const { size }    = useThree();

  // Reduce particles on narrow screens
  const actualCount = size.width < 640 ? Math.round(count * 0.45) : count;

  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme !== "light";

  // Mouse position (normalized -1…1)
  const mouseRef = useRef({ x: 0, y: 0 });

  // Hover state: 0 = normal, 1 = fully scattered
  const hoverRef     = useRef(0);
  const isHoveringRef = useRef(false);

  // Track if mouse is over canvas area (centre of screen)
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth  - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseRef.current = { x: nx, y: ny };

      // Sphere is roughly in the center — use distance from center as hover check
      const dist = Math.sqrt(nx * nx + ny * ny);
      isHoveringRef.current = dist < 0.55; // approx sphere radius in normalized coords
    };
    const onLeave = () => { isHoveringRef.current = false; };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  // Build base sphere positions + random phase offsets for animation
  const { basePositions, phases, colors } = useMemo(() => {
    const basePositions = new Float32Array(actualCount * 3);
    const phases        = new Float32Array(actualCount * 3); // x,y,z phase per particle
    const colors        = new Float32Array(actualCount * 3);

    const paletteDark  = [
      new THREE.Color("#8b5cf6"),
      new THREE.Color("#6366f1"),
      new THREE.Color("#60a5fa"),
      new THREE.Color("#a78bfa"),
    ];
    const paletteLight = [
      new THREE.Color("#7c3aed"),
      new THREE.Color("#4f46e5"),
      new THREE.Color("#3b82f6"),
    ];
    const palette = isDark ? paletteDark : paletteLight;

    for (let i = 0; i < actualCount; i++) {
      // Golden-ratio even sphere surface distribution
      const phi   = Math.acos(1 - (2 * (i + 0.5)) / actualCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;

      const r = 2.2;
      basePositions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      basePositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      basePositions[i * 3 + 2] = r * Math.cos(phi);

      // Random phase offsets so particles don't all move in sync
      phases[i * 3]     = Math.random() * Math.PI * 2;
      phases[i * 3 + 1] = Math.random() * Math.PI * 2;
      phases[i * 3 + 2] = Math.random() * Math.PI * 2;

      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3]     = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    return { basePositions, phases, colors };
  }, [actualCount, isDark]);

  // Working buffer for per-frame position mutations
  const workPositions = useMemo(
    () => new Float32Array(actualCount * 3),
    [actualCount]
  );

  // Time accumulator
  const timeRef = useRef(0);

  useFrame((_state, delta) => {
    if (!pointsRef.current || !geoRef.current) return;
    const mesh = pointsRef.current;

    timeRef.current += delta;
    const t = timeRef.current;

    // ── Smooth hover blend ────────────────────────────────────────
    const target = isHoveringRef.current ? 1 : 0;
    hoverRef.current += (target - hoverRef.current) * Math.min(1, delta * 3.5);
    const scatter = hoverRef.current;

    // ── Continuous auto-rotation ──────────────────────────────────
    mesh.rotation.y += delta * 0.07;
    mesh.rotation.x += delta * 0.03;

    // ── Per-particle float animation + scatter ────────────────────
    const amp   = 0.08;   // breathe amplitude
    const speed = 0.6;    // breathe speed

    for (let i = 0; i < actualCount; i++) {
      const bx = basePositions[i * 3];
      const by = basePositions[i * 3 + 1];
      const bz = basePositions[i * 3 + 2];

      // Sine-wave micro-float on each axis with individual phase
      const fx = Math.sin(t * speed + phases[i * 3])     * amp;
      const fy = Math.sin(t * speed + phases[i * 3 + 1]) * amp;
      const fz = Math.cos(t * speed + phases[i * 3 + 2]) * amp;

      // Radial scatter on hover: push particles outward along their base normal
      const scatterAmt = scatter * 0.55;

      workPositions[i * 3]     = bx * (1 + scatterAmt) + fx;
      workPositions[i * 3 + 1] = by * (1 + scatterAmt) + fy;
      workPositions[i * 3 + 2] = bz * (1 + scatterAmt) + fz;
    }

    // Mark positions as needing GPU upload
    const attr = geoRef.current.attributes.position as THREE.BufferAttribute;
    attr.array = workPositions;
    attr.needsUpdate = true;

    // ── Mouse-parallax tilt ───────────────────────────────────────
    const { x, y } = mouseRef.current;
    mesh.rotation.y += (x * 0.15 - mesh.rotation.y) * 0.025;
    mesh.rotation.x += (-y * 0.10 - mesh.rotation.x) * 0.025;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry ref={geoRef}>
        <bufferAttribute
          attach="attributes-position"
          args={[workPositions, 3]}
          usage={THREE.DynamicDrawUsage}
        />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={isDark ? 0.026 : 0.020}
        vertexColors
        transparent
        opacity={isDark ? 0.80 : 0.70}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
