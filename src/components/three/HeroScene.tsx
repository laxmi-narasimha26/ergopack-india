'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Float } from '@react-three/drei';
import * as THREE from 'three';

// Animated Particles Component
function Particles() {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 2000;

  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      // Position particles in a sphere
      const radius = 15 + Math.random() * 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      // Gradient colors from deep blue to gold
      const colorMix = Math.random();
      colors[i * 3] = 0.1 + colorMix * 0.6; // R
      colors[i * 3 + 1] = 0.15 + colorMix * 0.5; // G
      colors[i * 3 + 2] = 0.3 + colorMix * 0.2; // B
    }

    return { positions, colors };
  }, [particleCount]);

  useFrame(({ clock }) => {
    if (!particlesRef.current) return;

    const time = clock.getElapsedTime();
    particlesRef.current.rotation.y = time * 0.05;
    particlesRef.current.rotation.x = Math.sin(time * 0.1) * 0.1;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Geometric Shapes Component
function GeometricShapes() {
  return (
    <>
      {/* Central rotating torus */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh position={[0, 0, 0]}>
          <torusGeometry args={[3, 0.8, 16, 100]} />
          <meshStandardMaterial
            color="#d4af37"
            emissive="#d4af37"
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.2}
            wireframe
          />
        </mesh>
      </Float>

      {/* Orbiting icosahedron */}
      <Float speed={3} rotationIntensity={1} floatIntensity={0.5}>
        <mesh position={[5, 2, -3]}>
          <icosahedronGeometry args={[0.8, 0]} />
          <meshStandardMaterial
            color="#4a90e2"
            emissive="#4a90e2"
            emissiveIntensity={0.6}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      </Float>

      {/* Floating octahedron */}
      <Float speed={2.5} rotationIntensity={0.8} floatIntensity={0.7}>
        <mesh position={[-4, -2, -2]}>
          <octahedronGeometry args={[0.6, 0]} />
          <meshStandardMaterial
            color="#8b7355"
            emissive="#8b7355"
            emissiveIntensity={0.5}
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
      </Float>

      {/* Dodecahedron */}
      <Float speed={1.8} rotationIntensity={0.6} floatIntensity={0.6}>
        <mesh position={[3, -3, 2]}>
          <dodecahedronGeometry args={[0.7, 0]} />
          <meshStandardMaterial
            color="#d4af37"
            emissive="#d4af37"
            emissiveIntensity={0.4}
            metalness={0.8}
            roughness={0.2}
            wireframe
          />
        </mesh>
      </Float>

      {/* Additional small spheres */}
      <Float speed={3.5} rotationIntensity={0.4} floatIntensity={0.8}>
        <mesh position={[-3, 3, 1]}>
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshStandardMaterial
            color="#4a90e2"
            emissive="#4a90e2"
            emissiveIntensity={0.7}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      </Float>
    </>
  );
}

// Animated Camera Component
function AnimatedCamera() {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  useFrame(({ clock }) => {
    if (!cameraRef.current) return;

    const time = clock.getElapsedTime();
    const radius = 12;
    cameraRef.current.position.x = Math.sin(time * 0.1) * radius;
    cameraRef.current.position.z = Math.cos(time * 0.1) * radius;
    cameraRef.current.position.y = 3 + Math.sin(time * 0.2) * 2;
    cameraRef.current.lookAt(0, 0, 0);
  });

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      position={[0, 3, 12]}
      fov={60}
    />
  );
}

// Grid Component for depth
function Grid() {
  const gridRef = useRef<THREE.GridHelper>(null);

  useFrame(() => {
    if (!gridRef.current) return;
    gridRef.current.rotation.y += 0.001;
  });

  return (
    <gridHelper
      ref={gridRef}
      args={[50, 50, '#1a1a2e', '#0a0a15']}
      position={[0, -5, 0]}
    />
  );
}

// Main Hero Scene Component
export default function HeroScene() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#4a90e2" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#d4af37" />
        <spotLight
          position={[0, 15, 0]}
          angle={0.3}
          penumbra={1}
          intensity={1}
          castShadow
          color="#ffffff"
        />

        {/* Camera */}
        <AnimatedCamera />

        {/* Scene Elements */}
        <Particles />
        <GeometricShapes />
        <Grid />

        {/* Post-processing effects would go here */}
        {/* Optional: Add bloom, depth of field, etc. */}
      </Canvas>
    </div>
  );
}

// Simplified version for mobile/low-end devices
export function HeroSceneSimplified() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'low-power',
        }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />

        <PerspectiveCamera makeDefault position={[0, 3, 12]} fov={60} />

        {/* Simplified geometry */}
        <Float speed={2} rotationIntensity={0.5}>
          <mesh>
            <torusGeometry args={[3, 0.8, 16, 50]} />
            <meshStandardMaterial
              color="#d4af37"
              emissive="#d4af37"
              emissiveIntensity={0.5}
              wireframe
            />
          </mesh>
        </Float>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}
