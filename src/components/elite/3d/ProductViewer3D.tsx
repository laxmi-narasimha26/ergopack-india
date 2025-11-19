'use client';

import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Advanced 3D Product Viewer
 * Ultra-premium Three.js implementation with:
 * - Realistic product rendering
 * - Interactive camera controls
 * - Dynamic lighting and shadows
 * - Hotspots for feature highlighting
 * - Smooth animations and transitions
 */

interface ProductViewer3DProps {
  productModel: string;
  productName: string;
  productData: any;
  autoRotate?: boolean;
}

// Fallback 3D product representation (geometric primitive with ErgopackGermany branding)
function ProductMesh({ productData, hoveredPart, onPartHover }: any) {
  const meshRef = useRef<THREE.Group>(null);
  const [rotation, setRotation] = useState(0);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Smooth rotation animation
      setRotation((prev) => prev + delta * 0.3);
      meshRef.current.rotation.y = rotation;

      // Subtle floating animation
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  const baseColor = productData?.line === 'X-pert Line' ? '#C8102E' : '#FFB81C';
  const accentColor = '#1A1A1A';

  return (
    <group ref={meshRef} position={[0, 0, 0]}>
      {/* Main body */}
      <mesh
        position={[0, 0, 0]}
        castShadow
        receiveShadow
        onPointerOver={() => onPartHover('body')}
        onPointerOut={() => onPartHover(null)}
      >
        <boxGeometry args={[1.5, 2.5, 1]} />
        <meshStandardMaterial
          color={hoveredPart === 'body' ? '#FF1744' : baseColor}
          metalness={0.8}
          roughness={0.2}
          emissive={hoveredPart === 'body' ? baseColor : '#000000'}
          emissiveIntensity={hoveredPart === 'body' ? 0.3 : 0}
        />
      </mesh>

      {/* Tool-lift mechanism */}
      <mesh
        position={[0, 1.5, 0]}
        castShadow
        onPointerOver={() => onPartHover('toollift')}
        onPointerOut={() => onPartHover(null)}
      >
        <cylinderGeometry args={[0.3, 0.3, 0.8, 32]} />
        <meshStandardMaterial
          color={hoveredPart === 'toollift' ? '#FFD700' : accentColor}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Sealing head */}
      <mesh
        position={[0, 2.2, 0]}
        castShadow
        onPointerOver={() => onPartHover('sealinghead')}
        onPointerOut={() => onPartHover(null)}
      >
        <boxGeometry args={[0.6, 0.4, 0.4]} />
        <meshStandardMaterial
          color={hoveredPart === 'sealinghead' ? '#00D9FF' : '#2A2A2A'}
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* Wheels */}
      {[-0.5, 0.5].map((x, i) =>
        [-0.3, 0.3].map((z, j) => (
          <mesh
            key={`wheel-${i}-${j}`}
            position={[x, -1.2, z]}
            rotation={[Math.PI / 2, 0, 0]}
            castShadow
          >
            <cylinderGeometry args={[0.15, 0.15, 0.1, 32]} />
            <meshStandardMaterial
              color="#1A1A1A"
              metalness={0.5}
              roughness={0.5}
            />
          </mesh>
        ))
      )}

      {/* Battery indicator (for Li-Ion models) */}
      {productData?.battery?.type === 'Lithium-Ion' && (
        <mesh
          position={[0.6, -0.5, 0]}
          castShadow
          onPointerOver={() => onPartHover('battery')}
          onPointerOut={() => onPartHover(null)}
        >
          <boxGeometry args={[0.3, 0.6, 0.2]} />
          <meshStandardMaterial
            color={hoveredPart === 'battery' ? '#00FF88' : '#00D9FF'}
            metalness={0.6}
            roughness={0.4}
            emissive="#00D9FF"
            emissiveIntensity={0.2}
          />
        </mesh>
      )}

      {/* Chain guide */}
      <mesh
        position={[0, -0.5, 0.6]}
        castShadow
        onPointerOver={() => onPartHover('chain')}
        onPointerOut={() => onPartHover(null)}
      >
        <torusGeometry args={[0.4, 0.05, 16, 100, Math.PI]} />
        <meshStandardMaterial
          color={hoveredPart === 'chain' ? '#FFB81C' : '#3A3A3A'}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Branding plate */}
      <mesh position={[0, 0.5, 0.51]}>
        <planeGeometry args={[1, 0.3]} />
        <meshStandardMaterial
          color="#1A1A1A"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Logo emboss effect */}
      <mesh position={[0, 0.5, 0.52]}>
        <planeGeometry args={[0.8, 0.15]} />
        <meshStandardMaterial
          color={baseColor}
          emissive={baseColor}
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  );
}

// 3D Scene with lighting and environment
function Scene({ productData, hoveredPart, onPartHover, autoRotate }: any) {
  return (
    <>
      {/* Camera */}
      <PerspectiveCamera makeDefault position={[4, 2, 4]} fov={45} />

      {/* Controls */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={3}
        maxDistance={8}
        maxPolarAngle={Math.PI / 2}
        autoRotate={autoRotate}
        autoRotateSpeed={1}
      />

      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <spotLight
        position={[-10, 10, -10]}
        angle={0.15}
        penumbra={1}
        intensity={0.5}
        castShadow
      />
      <pointLight position={[0, 5, 0]} intensity={0.5} color="#FFB81C" />

      {/* Environment for reflections */}
      <Environment preset="warehouse" />

      {/* Product mesh */}
      <ProductMesh
        productData={productData}
        hoveredPart={hoveredPart}
        onPartHover={onPartHover}
      />

      {/* Ground plane with contact shadows */}
      <ContactShadows
        position={[0, -1.4, 0]}
        opacity={0.5}
        scale={10}
        blur={2}
        far={4}
      />

      {/* Grid floor */}
      <gridHelper args={[10, 20, '#C8102E', '#1A1A1A']} position={[0, -1.4, 0]} />
    </>
  );
}

// Part information overlay
const partInfo: Record<string, { name: string; description: string }> = {
  body: {
    name: 'Main Frame',
    description: 'Robust steel construction with ergonomic design for optimal operator comfort',
  },
  toollift: {
    name: 'Tool-Lift System',
    description: 'Precision height adjustment mechanism for versatile pallet dimensions',
  },
  sealinghead: {
    name: 'Sealing Head',
    description: 'Advanced ultrasonic sealing technology for permanent, reliable bonds',
  },
  battery: {
    name: 'Lithium-Ion Battery',
    description: '36.3V battery with 1200+ cycles - 3.4x more than standard batteries',
  },
  chain: {
    name: 'Chain Guide System',
    description: 'Precision chain routing for smooth strap feeding around any pallet size',
  },
};

export default function ProductViewer3D({
  productName,
  productData,
  autoRotate = true,
}: Omit<ProductViewer3DProps, 'productModel'>) {
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-[600px] rounded-2xl overflow-hidden bg-gradient-to-br from-black via-[#1A0000] to-black border-2 border-[#4A0000]">
      {/* Loading state */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-black"
          >
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-[#C8102E] border-t-transparent rounded-full animate-spin mb-4 mx-auto" />
              <p className="text-gray-400 font-mono text-sm">Loading 3D Model...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D Canvas */}
      <Canvas shadows className="touch-none">
        <Suspense fallback={null}>
          <Scene
            productData={productData}
            hoveredPart={hoveredPart}
            onPartHover={setHoveredPart}
            autoRotate={autoRotate}
          />
        </Suspense>
      </Canvas>

      {/* Part information overlay */}
      <AnimatePresence>
        {hoveredPart && partInfo[hoveredPart] && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-8 left-8 right-8 z-10 pointer-events-none"
          >
            <div className="bg-gradient-to-br from-black/95 to-[#1A0000]/95 backdrop-blur-xl border-2 border-[#C8102E] rounded-xl p-6 shadow-2xl">
              <div className="flex items-start gap-4">
                <div className="w-1 h-full bg-gradient-to-b from-[#C8102E] to-[#FFB81C] rounded-full" />
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {partInfo[hoveredPart].name}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {partInfo[hoveredPart].description}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls hint */}
      <div className="absolute top-4 left-4 z-10 bg-black/80 backdrop-blur-md px-4 py-2 rounded-lg border border-[#4A0000]">
        <p className="text-xs text-gray-500 font-mono">
          🖱️ DRAG TO ROTATE • SCROLL TO ZOOM • HOVER PARTS FOR INFO
        </p>
      </div>

      {/* Product name badge */}
      <div className="absolute top-4 right-4 z-10 bg-gradient-to-br from-[#C8102E] to-[#8B0000] backdrop-blur-md px-6 py-3 rounded-xl border border-[#FF1744] shadow-lg">
        <p className="text-white font-bold text-lg">{productName}</p>
        <p className="text-xs text-gray-300 mt-1">{productData?.line || 'ErgopackGermany'}</p>
      </div>

      {/* Specifications quick view */}
      <div className="absolute bottom-4 right-4 z-10 flex gap-2">
        {productData?.battery?.type && (
          <div className="bg-black/80 backdrop-blur-md px-3 py-2 rounded-lg border border-[#4A0000]">
            <p className="text-[10px] text-gray-600 uppercase tracking-wider mb-1">Battery</p>
            <p className="text-xs text-[#FFB81C] font-bold">
              {productData.battery.type === 'Lithium-Ion' ? 'Li-Ion' : '24V Lead'}
            </p>
          </div>
        )}
        {productData?.performance?.chainSpeed && (
          <div className="bg-black/80 backdrop-blur-md px-3 py-2 rounded-lg border border-[#4A0000]">
            <p className="text-[10px] text-gray-600 uppercase tracking-wider mb-1">Speed</p>
            <p className="text-xs text-[#FFB81C] font-bold">
              {productData.performance.chainSpeed} m/min
            </p>
          </div>
        )}
        {productData?.battery?.strappingCycles && (
          <div className="bg-black/80 backdrop-blur-md px-3 py-2 rounded-lg border border-[#4A0000]">
            <p className="text-[10px] text-gray-600 uppercase tracking-wider mb-1">Cycles</p>
            <p className="text-xs text-[#FFB81C] font-bold">
              {productData.battery.strappingCycles}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
