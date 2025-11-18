'use client';

import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Wireframe Grid Background Component
 *
 * Creates:
 * - Geometric wireframe grid with red lines
 * - Particle effects at intersection points
 * - Subtle animation (pulse/glow)
 * - Technical/engineering aesthetic
 */
function WireframeGrid() {
  const gridRef = useRef<THREE.LineSegments>(null);
  const particlesRef = useRef<THREE.Points>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    // Create wireframe grid geometry
    const gridSize = 50;
    const divisions = 50;
    const geometry = new THREE.BufferGeometry();
    const vertices: number[] = [];

    // Create grid lines
    for (let i = -gridSize / 2; i <= gridSize / 2; i += gridSize / divisions) {
      // Horizontal lines
      vertices.push(-gridSize / 2, 0, i);
      vertices.push(gridSize / 2, 0, i);

      // Vertical lines
      vertices.push(i, 0, -gridSize / 2);
      vertices.push(i, 0, gridSize / 2);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    gridRef.current.geometry = geometry;

    // Create particles at intersection points
    if (particlesRef.current) {
      const particleGeometry = new THREE.BufferGeometry();
      const particlePositions: number[] = [];

      for (let i = -gridSize / 2; i <= gridSize / 2; i += gridSize / divisions) {
        for (let j = -gridSize / 2; j <= gridSize / 2; j += gridSize / divisions) {
          particlePositions.push(i, 0, j);
        }
      }

      particleGeometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(particlePositions, 3)
      );

      particlesRef.current.geometry = particleGeometry;
    }
  }, []);

  // Animate grid (subtle pulse)
  useFrame((state) => {
    if (gridRef.current) {
      const time = state.clock.getElapsedTime();
      gridRef.current.rotation.y = Math.sin(time * 0.05) * 0.05;

      // Pulse effect on material
      const material = gridRef.current.material as THREE.LineBasicMaterial;
      material.opacity = 0.15 + Math.sin(time * 0.5) * 0.05;
    }

    if (particlesRef.current) {
      const time = state.clock.getElapsedTime();
      const material = particlesRef.current.material as THREE.PointsMaterial;
      material.opacity = 0.3 + Math.sin(time * 0.5) * 0.1;
    }
  });

  return (
    <group rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]}>
      {/* Wireframe Grid Lines */}
      <lineSegments ref={gridRef}>
        <lineBasicMaterial color="#4A0000" transparent opacity={0.15} />
      </lineSegments>

      {/* Particles at Grid Intersections */}
      <points ref={particlesRef}>
        <pointsMaterial color="#C8102E" size={0.05} transparent opacity={0.3} sizeAttenuation />
      </points>
    </group>
  );
}

/**
 * Wireframe Background Canvas
 *
 * Fixed background layer with:
 * - Dark void background
 * - Animated wireframe grid
 * - Particle system
 */
export default function WireframeBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{
          position: [0, 10, 20],
          fov: 60,
        }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#000000']} />
        <WireframeGrid />
        <ambientLight intensity={0.2} />
      </Canvas>
    </div>
  );
}
