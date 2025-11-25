'use client';

import { Suspense, useState, useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Html } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import {
  Maximize2,
  Minimize2,
  RotateCcw,
  Info,
  Zap,
  Volume2,
  VolumeX,
  Play,
  Pause,
  ZoomIn,
} from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface Hotspot {
  id: string;
  position: [number, number, number];
  title: string;
  description: string;
}

const hotspots: Hotspot[] = [
  {
    id: '1',
    position: [2, 1, 0],
    title: 'ChainLance System',
    description: 'Patent-pending precision tensioning mechanism',
  },
  {
    id: '2',
    position: [-2, 1, 0],
    title: 'IoT Sensors',
    description: 'Real-time monitoring and alerting system',
  },
  {
    id: '3',
    position: [0, 2, 1],
    title: 'Control Panel',
    description: 'Intuitive touchscreen interface',
  },
  {
    id: '4',
    position: [0, 0.5, -2],
    title: 'Base Platform',
    description: 'Heavy-duty industrial-grade foundation',
  },
];

interface HotspotMarkerProps {
  position: [number, number, number];
  title: string;
  description: string;
  onClick: () => void;
  isActive: boolean;
}

function HotspotMarker({ position, title, description, onClick, isActive }: HotspotMarkerProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={position} onClick={onClick}>
      <sphereGeometry args={[0.15, 16, 16]} />
      <meshStandardMaterial
        color={isActive ? '#f59e0b' : '#ffffff'}
        emissive={isActive ? '#f59e0b' : '#ffffff'}
        emissiveIntensity={isActive ? 2 : 1}
        transparent
        opacity={0.8}
      />
      <Html distanceFactor={10}>
        <motion.div
          className="pointer-events-none"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 20 }}
        >
          <div className="bg-slate-900/90 backdrop-blur-md border border-amber-500/50 rounded-lg px-3 py-2 whitespace-nowrap shadow-xl">
            <p className="text-white text-sm font-semibold">{title}</p>
          </div>
        </motion.div>
      </Html>
    </mesh>
  );
}

function ShowroomEnvironment() {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Main Product */}
      <group ref={meshRef} position={[0, 0.5, 0]}>
        {/* Base */}
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[3, 0.3, 2]} />
          <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Main body */}
        <mesh position={[0, 1, 0]} castShadow>
          <boxGeometry args={[2.5, 1.5, 1.8]} />
          <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Top mechanism */}
        <mesh position={[0, 2.2, 0]} castShadow>
          <cylinderGeometry args={[0.5, 0.5, 1, 32]} />
          <meshStandardMaterial color="#f59e0b" metalness={0.95} roughness={0.05} />
        </mesh>

        {/* Arms */}
        {[-1.3, 1.3].map((x, i) => (
          <mesh
            key={i}
            position={[x, 1, 0]}
            rotation={[0, 0, x > 0 ? -Math.PI / 6 : Math.PI / 6]}
            castShadow
          >
            <boxGeometry args={[0.4, 2, 0.4]} />
            <meshStandardMaterial color="#475569" metalness={0.8} roughness={0.3} />
          </mesh>
        ))}

        {/* Details */}
        {[...Array(6)].map((_, i) => (
          <mesh key={i} position={[-1 + i * 0.4, 0.3, 1]} castShadow>
            <cylinderGeometry args={[0.06, 0.06, 0.4, 16]} />
            <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.1} />
          </mesh>
        ))}

        {/* LED status lights */}
        {[0, 1, 2].map((i) => (
          <mesh key={i} position={[1.2, 1.8 - i * 0.3, 1]}>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshStandardMaterial
              color={i === 0 ? '#10b981' : i === 1 ? '#f59e0b' : '#3b82f6'}
              emissive={i === 0 ? '#10b981' : i === 1 ? '#f59e0b' : '#3b82f6'}
              emissiveIntensity={3}
            />
            <pointLight
              color={i === 0 ? '#10b981' : i === 1 ? '#f59e0b' : '#3b82f6'}
              intensity={2}
              distance={3}
            />
          </mesh>
        ))}
      </group>

      {/* Ambient lighting */}
      <ambientLight intensity={0.4} />
      <spotLight
        position={[5, 10, 5]}
        angle={0.3}
        penumbra={1}
        intensity={1.5}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <spotLight position={[-5, 10, -5]} angle={0.3} penumbra={1} intensity={0.8} />
    </group>
  );
}

export default function Virtual360Showroom() {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showInfo, setShowInfo] = useState(true);

  const activeHotspotData = hotspots.find((h) => h.id === activeHotspot);

  return (
    <div className="w-full max-w-7xl mx-auto">
      <Card
        className={`bg-slate-900/50 border-slate-800 overflow-hidden ${isFullscreen ? 'fixed inset-4 z-50 max-w-none' : ''}`}
      >
        <div
          className="relative bg-gradient-to-br from-slate-950 to-slate-900"
          style={{ height: isFullscreen ? 'calc(100vh - 2rem)' : '700px' }}
        >
          {/* 3D Canvas */}
          <Canvas shadows>
            <PerspectiveCamera makeDefault position={[6, 4, 6]} fov={50} />
            <OrbitControls
              enableZoom={true}
              enablePan={false}
              minDistance={4}
              maxDistance={12}
              minPolarAngle={0}
              maxPolarAngle={Math.PI / 2.2}
              autoRotate={isAutoRotate}
              autoRotateSpeed={0.5}
            />

            <Suspense fallback={null}>
              <ShowroomEnvironment />

              {/* Hotspots */}
              {hotspots.map((hotspot) => (
                <HotspotMarker
                  key={hotspot.id}
                  position={hotspot.position}
                  title={hotspot.title}
                  description={hotspot.description}
                  onClick={() => setActiveHotspot(hotspot.id === activeHotspot ? null : hotspot.id)}
                  isActive={hotspot.id === activeHotspot}
                />
              ))}
            </Suspense>
          </Canvas>

          {/* Loading Fallback */}
          <Suspense
            fallback={
              <div className="absolute inset-0 flex items-center justify-center bg-slate-950">
                <LoadingSpinner />
              </div>
            }
          />

          {/* Header */}
          <div className="absolute top-4 left-4 right-4 flex items-start justify-between z-10">
            <AnimatePresence>
              {showInfo && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-slate-900/90 backdrop-blur-md border border-slate-700 rounded-lg px-6 py-4 max-w-md"
                >
                  <h3 className="text-white font-bold text-lg mb-1">Virtual 360° Showroom</h3>
                  <p className="text-slate-300 text-sm mb-3">
                    Explore the X-pert Line in immersive 3D. Click on hotspots to learn more.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                      <span>Interactive Hotspots</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Controls */}
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="bg-slate-900/80 backdrop-blur-md border border-slate-700 text-white hover:bg-slate-800"
                onClick={() => setShowInfo(!showInfo)}
              >
                <Info className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="bg-slate-900/80 backdrop-blur-md border border-slate-700 text-white hover:bg-slate-800"
                onClick={() => setIsAutoRotate(!isAutoRotate)}
              >
                {isAutoRotate ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="bg-slate-900/80 backdrop-blur-md border border-slate-700 text-white hover:bg-slate-800"
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="bg-slate-900/80 backdrop-blur-md border border-slate-700 text-white hover:bg-slate-800"
                onClick={() => setIsFullscreen(!isFullscreen)}
              >
                {isFullscreen ? (
                  <Minimize2 className="h-4 w-4" />
                ) : (
                  <Maximize2 className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Active Hotspot Panel */}
          <AnimatePresence>
            {activeHotspotData && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="absolute bottom-4 left-4 right-4 md:left-auto md:w-96"
              >
                <Card className="bg-slate-900/95 backdrop-blur-md border-amber-500/50 p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse" />
                      <h4 className="text-xl font-bold text-white">{activeHotspotData.title}</h4>
                    </div>
                    <button
                      onClick={() => setActiveHotspot(null)}
                      className="text-slate-400 hover:text-white transition-colors"
                    >
                      <RotateCcw className="h-5 w-5" />
                    </button>
                  </div>
                  <p className="text-slate-300 mb-4">{activeHotspotData.description}</p>
                  <div className="flex gap-3">
                    <Button
                      size="sm"
                      variant="primary"
                      className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
                    >
                      Learn More
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-slate-700 text-slate-300 hover:bg-slate-800"
                    >
                      <ZoomIn className="h-4 w-4 mr-2" />
                      Zoom In
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hotspot Legend */}
          <div className="absolute bottom-4 left-4 max-w-xs">
            <AnimatePresence>
              {!activeHotspot && showInfo && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-lg p-4"
                >
                  <h4 className="text-white font-semibold text-sm mb-3">Explore Features</h4>
                  <div className="space-y-2">
                    {hotspots.map((hotspot) => (
                      <button
                        key={hotspot.id}
                        onClick={() => setActiveHotspot(hotspot.id)}
                        className="w-full flex items-center gap-3 text-left text-sm text-slate-300 hover:text-white transition-colors group"
                      >
                        <div className="w-2 h-2 bg-white rounded-full group-hover:bg-amber-500 transition-colors" />
                        <span>{hotspot.title}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Card>
    </div>
  );
}
