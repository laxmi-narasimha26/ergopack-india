'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

// =====================================================
// OPTIMIZED STRAPPING MACHINE (INSTANCED MESH)
// =====================================================
// Uses InstancedMesh for the ChainLance to handle 50+ segments
// at 60fps without React reconciliation overhead.

interface StrappingMachineProps {
  position?: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
  cycleProgress?: number;
  modelType?: '700' | '726X' | 'GO';
}

export function StrappingMachine({
  position = [0, 0, 0],
  scale = 1,
  rotation = [0, 0, 0],
  cycleProgress = 0,
  modelType = '726X',
}: StrappingMachineProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Materials
  const bodyColor = modelType === 'GO' ? '#4A90D9' : '#C8102E';
  const metalMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#222222',
        roughness: 0.4,
        metalness: 0.8,
      }),
    []
  );
  const bodyMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: bodyColor,
        roughness: 0.2,
        metalness: 0.1,
      }),
    [bodyColor]
  );

  // Smoother Cycle Calculation
  // We want the internal mechanics to respond fluidly
  const lanceExtension =
    cycleProgress < 0.1
      ? 0
      : cycleProgress < 0.4
        ? (cycleProgress - 0.1) * 3.33
        : cycleProgress < 0.8
          ? 1
          : Math.max(0, 1 - (cycleProgress - 0.8) * 5);

  const lanceBend =
    cycleProgress < 0.3
      ? 0
      : cycleProgress < 0.5
        ? (cycleProgress - 0.3) * 5
        : cycleProgress < 0.8
          ? 1
          : Math.max(0, 1 - (cycleProgress - 0.8) * 5);

  return (
    <group
      ref={groupRef}
      position={position}
      scale={scale}
      rotation={rotation ? new THREE.Euler(...rotation) : undefined}
    >
      {/* --- 1. CHASSIS --- */}
      <group position={[0, 0.4, 0]}>
        <mesh castShadow receiveShadow position={[0, 0, 0]}>
          <boxGeometry args={[0.35, 0.7, 0.5]} />
          <primitive object={bodyMaterial} attach="material" />
        </mesh>
        <mesh castShadow position={[0, -0.25, -0.35]} rotation={[Math.PI / 4, 0, 0]}>
          <boxGeometry args={[0.36, 0.2, 0.4]} />
          <primitive object={bodyMaterial} attach="material" />
        </mesh>
        <mesh position={[0.18, 0, 0]} castShadow>
          <boxGeometry args={[0.02, 0.6, 0.4]} />
          <meshStandardMaterial color="#888888" metalness={0.5} roughness={0.5} />
        </mesh>
      </group>

      {/* --- 2. TOOL ARM --- */}
      {modelType !== '700' && (
        <group position={[0.25, 0.4, 0.2]}>
          <mesh castShadow position={[0, 0.4, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 0.8]} />
            <primitive object={metalMaterial} attach="material" />
          </mesh>
          <mesh castShadow position={[0, 0.75, -0.3]} rotation={[0, 0, 0]}>
            <boxGeometry args={[0.04, 0.04, 0.6]} />
            <primitive object={metalMaterial} attach="material" />
          </mesh>
          <mesh position={[0, 0.65, -0.6]} castShadow>
            <boxGeometry args={[0.15, 0.25, 0.15]} />
            <meshStandardMaterial color="#333333" />
            <mesh position={[0, 0, 0.08]} visible={cycleProgress > 0.85}>
              <circleGeometry args={[0.02]} />
              <meshBasicMaterial color="#00ff00" toneMapped={false} />
            </mesh>
          </mesh>
        </group>
      )}

      {/* --- 3. HANDLEBARS --- */}
      <group position={[0, 0.85, 0.15]}>
        <mesh castShadow rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.02, 0.02, 0.5]} />
          <primitive object={metalMaterial} attach="material" />
        </mesh>
        <mesh position={[0.2, 0.05, -0.1]} rotation={[0.5, 0, 0]}>
          <boxGeometry args={[0.08, 0.08, 0.15]} />
          <meshStandardMaterial color="black" />
        </mesh>
        <mesh position={[0.2, 0.12, -0.12]} rotation={[0.2 + cycleProgress * 0.3, 0, 0]}>
          <cylinderGeometry args={[0.01, 0.01, 0.1]} />
          <meshStandardMaterial color="#ff0000" />
        </mesh>
      </group>

      {/* --- 4. WHEELS --- */}
      <group position={[0, 0.1, 0]}>
        <mesh position={[-0.22, 0.05, 0.25]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.12, 0.12, 0.05, 32]} />
          <meshStandardMaterial color="#111" />
        </mesh>
        <mesh position={[0.22, 0.05, 0.25]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.12, 0.12, 0.05, 32]} />
          <meshStandardMaterial color="#111" />
        </mesh>
        <mesh position={[0, -0.02, -0.4]} castShadow>
          <sphereGeometry args={[0.06]} />
          <meshStandardMaterial color="#333" />
        </mesh>
      </group>

      {/* --- 5. OPTIMIZED CHAIN LANCE (InstancedMesh) --- */}
      <group position={[0, 0.1, -0.45]}>
        <mesh position={[0, 0, 0.05]}>
          <boxGeometry args={[0.1, 0.05, 0.05]} />
          <meshStandardMaterial color="#111" />
        </mesh>

        <ChainLanceInstanced extension={lanceExtension} bend={lanceBend} color="#FFB81C" />
      </group>
    </group>
  );
}

// --- INSTANCED MESH SYSTEM ---
function ChainLanceInstanced({
  extension,
  bend,
  color,
}: {
  extension: number;
  bend: number;
  color: string;
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 50; // High fidelity
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const segmentLength = 0.035;

  useFrame(() => {
    if (!meshRef.current) return;

    // ANIMATION LOOP (Runs outside React render cycle)
    for (let i = 0; i < count; i++) {
      const normalizeIndex = i / count;

      // Logic: Calculate pos for each link
      let x = 0;
      let y = 0;
      let z = 0; // Relative to start
      let rotX = 0;
      let scale = 1;

      // Visibility (Scale down to 0 if not extended)
      if (normalizeIndex > extension) {
        scale = 0;
      }

      // --- CURVE MATH ---
      // Base extension (Linear Z-)
      z = -i * segmentLength;

      // Bend Logic (Pivot at link 12)
      const pivotIndex = 12;

      if (i > pivotIndex) {
        const distFromPivot = i - pivotIndex;

        // How much to bend per link? Total bend distributed over the curve
        // We want the chain to go DOWN under the pallet or UP depending on visual
        // Previous logic: Curve UP and Back

        // Refined Arc Math:
        // Radius = 0.3m
        const radius = 0.3;
        // Max angle = 180 degrees (PI)
        const anglePerSegment = 0.15;
        // Current total angle for this segment
        const currentAngle = Math.min(distFromPivot * anglePerSegment, Math.PI);

        // Apply 'bend' influence (0 to 1)
        const effectiveAngle = currentAngle * bend;

        // Arc position relative to pivot
        // y = r * sin(theta)
        // z_offset = r * (1 - cos(theta))

        const arcY = radius * Math.sin(effectiveAngle);
        const arcZ = radius * (1 - Math.cos(effectiveAngle));

        // Reset Z to pivot, then add arc Z
        z = -(pivotIndex * segmentLength) - arcZ;
        y = arcY;

        rotX = -effectiveAngle;
      }

      // Update Dummy Object
      dummy.position.set(x, y, z);
      dummy.rotation.set(rotX, 0, 0);
      dummy.scale.set(scale, scale, scale); // Hide/Show

      dummy.updateMatrix();

      // Set Matrix
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} castShadow receiveShadow>
      <boxGeometry args={[0.045, 0.008, 0.04]} />
      <meshStandardMaterial color={color} metalness={0.7} roughness={0.3} />
    </instancedMesh>
  );
}
