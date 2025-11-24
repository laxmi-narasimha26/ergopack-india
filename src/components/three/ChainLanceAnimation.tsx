'use client';

import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  OrbitControls,
  PerspectiveCamera,
  Line,
  Text,
  Float,
  ContactShadows,
} from '@react-three/drei';
import * as THREE from 'three';

// Premium Materials
const GoldMaterial = new THREE.MeshStandardMaterial({
  color: '#D4AF37',
  metalness: 1,
  roughness: 0.15,
});

const DarkMetalMaterial = new THREE.MeshStandardMaterial({
  color: '#1a1a1a',
  metalness: 0.8,
  roughness: 0.2,
});

const GlowingMaterial = new THREE.MeshStandardMaterial({
  color: '#4a90e2',
  emissive: '#4a90e2',
  emissiveIntensity: 2,
  toneMapped: false,
});

// ChainLance Mechanism Component
function ChainLanceMechanism() {
  const groupRef = useRef<THREE.Group>(null);
  const [animationProgress, setAnimationProgress] = useState(0);

  // Create the main shaft
  const Shaft = () => (
    <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
      <cylinderGeometry args={[0.2, 0.2, 8, 64]} />
      <primitive object={DarkMetalMaterial} />
    </mesh>
  );

  // Create chain links
  const ChainLinks = () => {
    const links = [];
    const linkCount = 24;
    const radius = 2.8;

    for (let i = 0; i < linkCount; i++) {
      const angle = (i / linkCount) * Math.PI * 2 + animationProgress * 0.5;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      links.push(
        <group key={i} position={[x, y, 0]} rotation={[0, 0, angle]}>
          <mesh>
            <boxGeometry args={[0.4, 0.15, 0.3]} />
            <primitive object={GoldMaterial} />
          </mesh>
          <mesh position={[0.2, 0, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 0.32, 16]} />
            <primitive object={DarkMetalMaterial} />
          </mesh>
        </group>
      );
    }

    return <>{links}</>;
  };

  // Create strap guides
  const StrapGuides = () => {
    const guides = [];
    const guideCount = 6;

    for (let i = 0; i < guideCount; i++) {
      const x = -3 + (i / (guideCount - 1)) * 6;
      guides.push(
        <mesh key={i} position={[x, 0, 0]}>
          <torusGeometry args={[0.3, 0.05, 16, 32]} />
          <primitive object={GoldMaterial} />
        </mesh>
      );
    }
    return <>{guides}</>;
  };

  // Animated strap path
  const StrapPath = () => {
    const points = useMemo(() => {
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-4.5, 0, 0.2),
        new THREE.Vector3(-2, 0.8, 0.2),
        new THREE.Vector3(0, 0, 0.2),
        new THREE.Vector3(2, -0.8, 0.2),
        new THREE.Vector3(4.5, 0, 0.2),
      ]);
      return curve.getPoints(150);
    }, []);

    const glowProgress = (animationProgress * 0.5) % 1;
    const glowIndex = Math.floor(glowProgress * points.length);

    return (
      <>
        <Line points={points} color="#D4AF37" lineWidth={2} transparent opacity={0.4} />
        <mesh position={points[glowIndex]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <primitive object={GlowingMaterial} />
        </mesh>
      </>
    );
  };

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
      groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.15) * 0.05;
    }
    setAnimationProgress((prev) => prev + delta);
  });

  return (
    <group ref={groupRef}>
      <Shaft />
      <ChainLinks />
      <StrapGuides />
      <StrapPath />
    </group>
  );
}

// Annotation component
function Annotations() {
  return (
    <>
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5}>
        <Text
          position={[0, 3.8, 0]}
          fontSize={0.4}
          color="#D4AF37"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#000000"
        >
          PATENTED CHAINLANCE
        </Text>
      </Float>
    </>
  );
}

// Main ChainLance Animation Component
export default function ChainLanceAnimation() {
  return (
    <div className="w-full h-full min-h-[600px]">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0, 12], fov: 45 }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
      >
        {/* Environment & Lighting */}
        <color attach="background" args={['#050508']} />

        <ambientLight intensity={0.2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.5}
          penumbra={1}
          intensity={2}
          castShadow
          shadow-bias={-0.0001}
          color="#ffffff"
        />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#D4AF37" />

        {/* Scene */}
        <group position={[0, 0, 0]}>
          <ChainLanceMechanism />
          <Annotations />
        </group>

        {/* Floor Reflection */}
        <ContactShadows
          resolution={1024}
          scale={50}
          blur={2}
          opacity={0.5}
          far={10}
          color="#000000"
        />

        {/* Controls */}
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={8}
          maxDistance={20}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
}
