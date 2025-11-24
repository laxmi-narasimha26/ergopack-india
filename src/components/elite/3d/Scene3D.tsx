'use client';

import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * 3D Ergopack Machine Placeholder
 *
 * For now, displays a stylized placeholder box
 * Replace with actual GLTF model when available
 */
function ErgopackMachine() {
  const groupRef = useRef<THREE.Group>(null);
  const rotationRef = useRef({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    // GSAP ScrollTrigger for full 3D rotation (X, Y, Z axes)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      },
    });

    // Full rotation journey through sections
    tl.to(rotationRef.current, {
      y: Math.PI * 0.5, // 90° Y rotation
      x: 0,
      duration: 2,
    })
      .to(rotationRef.current, {
        y: Math.PI, // 180° Y rotation
        x: -0.2,
        duration: 2,
      })
      .to(rotationRef.current, {
        y: Math.PI * 1.5, // 270° Y rotation
        x: 0,
        z: 0.1,
        duration: 2,
      })
      .to(rotationRef.current, {
        y: Math.PI * 2, // 360° Y rotation (full circle)
        x: 0.2,
        z: 0,
        duration: 3,
      })
      .to(rotationRef.current, {
        y: Math.PI * 2 + 0.3,
        x: 0,
        z: 0,
        duration: 2,
      });

    return () => {
      tl.kill();
    };
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      // Apply scroll-controlled rotation + subtle idle animation
      groupRef.current.rotation.y =
        rotationRef.current.y + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.05;
      groupRef.current.rotation.x =
        rotationRef.current.x + Math.sin(state.clock.getElapsedTime() * 0.3) * 0.02;
      groupRef.current.rotation.z =
        rotationRef.current.z + Math.sin(state.clock.getElapsedTime() * 0.4) * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Machine Body */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[3, 4, 2]} />
        <meshStandardMaterial
          color="#C8102E"
          roughness={0.3}
          metalness={0.8}
          emissive="#C8102E"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Strapping Mechanism */}
      <mesh position={[0, 1.5, 1.2]} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 2, 16]} />
        <meshStandardMaterial color="#666666" roughness={0.2} metalness={0.9} />
      </mesh>

      {/* Control Panel */}
      <mesh position={[0, 0.5, 1.05]} castShadow>
        <boxGeometry args={[1.5, 1, 0.1]} />
        <meshStandardMaterial
          color="#1A1A1A"
          roughness={0.1}
          metalness={0.5}
          emissive="#FFB81C"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Side Details */}
      <mesh position={[-1.6, 0, 0]} castShadow>
        <boxGeometry args={[0.2, 3.5, 1.8]} />
        <meshStandardMaterial color="#8B0000" roughness={0.4} metalness={0.7} />
      </mesh>

      <mesh position={[1.6, 0, 0]} castShadow>
        <boxGeometry args={[0.2, 3.5, 1.8]} />
        <meshStandardMaterial color="#8B0000" roughness={0.4} metalness={0.7} />
      </mesh>

      {/* Base */}
      <mesh position={[0, -2.2, 0]} receiveShadow>
        <boxGeometry args={[3.5, 0.4, 2.5]} />
        <meshStandardMaterial color="#333333" roughness={0.7} metalness={0.3} />
      </mesh>

      {/* Ambient Glow */}
      <pointLight position={[0, 0, 0]} color="#C8102E" intensity={2} distance={8} />
      <pointLight position={[0, 2, 2]} color="#FFB81C" intensity={1} distance={6} />
    </group>
  );
}

/**
 * Camera Controller with Scroll-Triggered Zoom
 *
 * Implements:
 * - Camera dolly (zoom in/out on Z-axis)
 * - Tied to scroll progress
 * - Smooth interpolation
 */
function CameraController() {
  const { camera } = useThree();
  const cameraRef = useRef({
    position: new THREE.Vector3(0, 3, 15),
    lookAt: new THREE.Vector3(0, 0, 0),
  });

  useEffect(() => {
    // GSAP ScrollTrigger for camera animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      },
    });

    // Camera journey:
    // Start: Far away (z=15)
    // Section 1-2: Zoom in (z=8)
    // Section 3-4: Close-up (z=5)
    // Section 5-6: Very close (z=3)
    // Section 7-10: Pull back (z=10)
    // Section 11-15: Final position (z=12)

    tl.to(cameraRef.current.position, {
      z: 8,
      duration: 2,
      ease: 'power2.inOut',
    })
      .to(cameraRef.current.position, {
        z: 5,
        y: 2,
        duration: 2,
        ease: 'power2.inOut',
      })
      .to(cameraRef.current.position, {
        z: 3,
        y: 1,
        duration: 2,
        ease: 'power2.inOut',
      })
      .to(cameraRef.current.position, {
        z: 10,
        y: 4,
        duration: 3,
        ease: 'power2.inOut',
      })
      .to(cameraRef.current.position, {
        z: 12,
        y: 3,
        duration: 2,
        ease: 'power2.inOut',
      });

    return () => {
      tl.kill();
    };
  }, []);

  useFrame(() => {
    // Update camera position smoothly
    camera.position.lerp(cameraRef.current.position, 0.1);
    camera.lookAt(cameraRef.current.lookAt);
  });

  return null;
}

interface Scene3DProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

/**
 * Main 3D Scene Component
 *
 * Features:
 * - 3D Ergopack machine (placeholder)
 * - Scroll-triggered camera zoom
 * - Professional lighting
 * - Ambient red glow
 */
export default function Scene3D({ containerRef }: Scene3DProps) {
  return (
    <div className="fixed inset-0 z-5 pointer-events-none">
      <Canvas
        shadows
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        camera={{ position: [0, 3, 15], fov: 50 }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <spotLight
          position={[-5, 5, 0]}
          intensity={0.5}
          angle={0.3}
          penumbra={0.5}
          color="#FFB81C"
        />

        {/* 3D Machine */}
        <ErgopackMachine />

        {/* Camera Controller */}
        <CameraController />

        {/* Optional: Orbit controls for debugging (disable in production) */}
        {/* <OrbitControls enableZoom={false} enablePan={false} /> */}
      </Canvas>
    </div>
  );
}
