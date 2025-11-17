'use client';

import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Line, Text } from '@react-three/drei';
import * as THREE from 'three';

// ChainLance Mechanism Component
function ChainLanceMechanism() {
  const groupRef = useRef<THREE.Group>(null);
  const [animationProgress, setAnimationProgress] = useState(0);

  // Create the main shaft
  const Shaft = () => (
    <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
      <cylinderGeometry args={[0.15, 0.15, 8, 32]} />
      <meshStandardMaterial
        color="#2c3e50"
        metalness={0.9}
        roughness={0.2}
      />
    </mesh>
  );

  // Create chain links
  const ChainLinks = () => {
    const links = [];
    const linkCount = 20;
    const radius = 2.5;

    for (let i = 0; i < linkCount; i++) {
      const angle = (i / linkCount) * Math.PI * 2 + animationProgress;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      links.push(
        <mesh key={i} position={[x, y, 0]} rotation={[0, 0, angle]}>
          <torusGeometry args={[0.2, 0.08, 16, 32]} />
          <meshStandardMaterial
            color="#34495e"
            metalness={0.8}
            roughness={0.3}
          />
        </mesh>
      );
    }

    return <>{links}</>;
  };

  // Create strap guides
  const StrapGuides = () => {
    const guides = [];
    const guideCount = 8;

    for (let i = 0; i < guideCount; i++) {
      const x = -3.5 + (i / (guideCount - 1)) * 7;

      guides.push(
        <mesh key={i} position={[x, 0, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.5, 16]} />
          <meshStandardMaterial
            color="#95a5a6"
            metalness={0.7}
            roughness={0.4}
          />
        </mesh>
      );
    }

    return <>{guides}</>;
  };

  // Animated strap path
  const StrapPath = () => {
    const points = useMemo(() => {
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-4, 0, 0.2),
        new THREE.Vector3(-2, 0.5, 0.2),
        new THREE.Vector3(0, 0, 0.2),
        new THREE.Vector3(2, -0.5, 0.2),
        new THREE.Vector3(4, 0, 0.2),
      ]);
      return curve.getPoints(100);
    }, []);

    // Animate the glow along the path
    const glowProgress = (animationProgress % (Math.PI * 2)) / (Math.PI * 2);
    const glowIndex = Math.floor(glowProgress * points.length);

    return (
      <>
        {/* Main strap line */}
        <Line
          points={points}
          color="#d4af37"
          lineWidth={3}
          transparent
          opacity={0.8}
        />

        {/* Animated glow point */}
        <mesh position={points[glowIndex]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial
            color="#d4af37"
            emissive="#d4af37"
            emissiveIntensity={2}
          />
        </mesh>

        {/* Trail effect */}
        {[...Array(5)].map((_, i) => {
          const trailIndex = Math.max(0, glowIndex - (i + 1) * 5);
          return (
            <mesh key={i} position={points[trailIndex]}>
              <sphereGeometry args={[0.1 - i * 0.015, 16, 16]} />
              <meshStandardMaterial
                color="#d4af37"
                emissive="#d4af37"
                emissiveIntensity={1.5 - i * 0.3}
                transparent
                opacity={0.8 - i * 0.15}
              />
            </mesh>
          );
        })}
      </>
    );
  };

  // Tensioning mechanism
  const TensionMechanism = () => (
    <>
      {/* Left tensioner */}
      <mesh position={[-4.5, 0, 0]}>
        <boxGeometry args={[0.4, 0.8, 0.4]} />
        <meshStandardMaterial
          color="#e74c3c"
          metalness={0.6}
          roughness={0.4}
        />
      </mesh>

      {/* Right tensioner */}
      <mesh position={[4.5, 0, 0]}>
        <boxGeometry args={[0.4, 0.8, 0.4]} />
        <meshStandardMaterial
          color="#e74c3c"
          metalness={0.6}
          roughness={0.4}
        />
      </mesh>
    </>
  );

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Slow rotation of entire mechanism
      groupRef.current.rotation.z += delta * 0.1;
    }

    // Update animation progress
    setAnimationProgress((prev) => prev + delta);
  });

  return (
    <group ref={groupRef}>
      <Shaft />
      <ChainLinks />
      <StrapGuides />
      <StrapPath />
      <TensionMechanism />
    </group>
  );
}

// Annotation component
function Annotations() {
  return (
    <>
      <Text
        position={[0, 3.5, 0]}
        fontSize={0.3}
        color="#d4af37"
        anchorX="center"
        anchorY="middle"
      >
        CHAINLANCE MECHANISM
      </Text>

      <Text
        position={[-5, -2, 0]}
        fontSize={0.15}
        color="#ecf0f1"
        anchorX="center"
        anchorY="middle"
      >
        Tensioning System
      </Text>

      <Text
        position={[5, -2, 0]}
        fontSize={0.15}
        color="#ecf0f1"
        anchorX="center"
        anchorY="middle"
      >
        Load Distribution
      </Text>

      <Text
        position={[0, -3, 0]}
        fontSize={0.12}
        color="#95a5a6"
        anchorX="center"
        anchorY="middle"
      >
        Precision Strap Guidance & Control
      </Text>
    </>
  );
}

// Particle effects for premium look
function ParticleEffect() {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 500;

  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }

    return positions;
  }, []);

  useFrame(({ clock }) => {
    if (!particlesRef.current) return;

    const time = clock.getElapsedTime();
    particlesRef.current.rotation.y = time * 0.02;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#4a90e2"
        transparent
        opacity={0.3}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Main ChainLance Animation Component
export default function ChainLanceAnimation() {
  return (
    <div className="w-full h-full min-h-[500px]">
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
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
        <pointLight position={[-10, 5, -5]} intensity={0.5} color="#4a90e2" />
        <spotLight
          position={[0, 8, 5]}
          angle={0.5}
          penumbra={1}
          intensity={1.5}
          castShadow
          color="#d4af37"
        />
        <spotLight
          position={[0, -8, -5]}
          angle={0.5}
          penumbra={1}
          intensity={0.5}
          color="#4a90e2"
        />

        {/* Camera */}
        <PerspectiveCamera makeDefault position={[8, 4, 8]} fov={50} />

        {/* Scene Elements */}
        <ChainLanceMechanism />
        <Annotations />
        <ParticleEffect />

        {/* Controls */}
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={5}
          maxDistance={15}
          autoRotate
          autoRotateSpeed={0.5}
        />

        {/* Background */}
        <color attach="background" args={['#0a0a15']} />
      </Canvas>
    </div>
  );
}

// Simplified version for performance
export function ChainLanceAnimationSimplified() {
  return (
    <div className="w-full h-full min-h-[500px]">
      <Canvas
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          alpha: true,
        }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />

        <PerspectiveCamera makeDefault position={[8, 4, 8]} fov={50} />

        {/* Simplified mechanism */}
        <mesh>
          <cylinderGeometry args={[0.15, 0.15, 8, 16]} />
          <meshStandardMaterial color="#2c3e50" />
        </mesh>

        <Text
          position={[0, 3, 0]}
          fontSize={0.3}
          color="#d4af37"
          anchorX="center"
        >
          CHAINLANCE
        </Text>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={1}
        />

        <color attach="background" args={['#0a0a15']} />
      </Canvas>
    </div>
  );
}
