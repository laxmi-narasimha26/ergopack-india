'use client';

import { Suspense, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
  ContactShadows,
  Html,
} from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import {
  Maximize2,
  RotateCcw,
  Download,
  Share2,
  Eye,
  Settings,
  Palette,
  Layers,
} from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface MachineModelProps {
  color: string;
  metalness: number;
  roughness: number;
  scale: number;
}

function MachineModel({ color, metalness, roughness, scale }: MachineModelProps) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={meshRef} scale={scale}>
      {/* Base platform */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[3, 0.2, 2]} />
        <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
      </mesh>

      {/* Main body */}
      <mesh position={[0, 0.8, 0]} castShadow>
        <boxGeometry args={[2.5, 1.2, 1.8]} />
        <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
      </mesh>

      {/* Top mechanism */}
      <mesh position={[0, 1.8, 0]} castShadow>
        <cylinderGeometry args={[0.4, 0.4, 0.8, 32]} />
        <meshStandardMaterial color="#d97706" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Side arms */}
      <mesh position={[-1.2, 0.8, 0]} rotation={[0, 0, Math.PI / 4]} castShadow>
        <boxGeometry args={[0.3, 1.5, 0.3]} />
        <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[1.2, 0.8, 0]} rotation={[0, 0, -Math.PI / 4]} castShadow>
        <boxGeometry args={[0.3, 1.5, 0.3]} />
        <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
      </mesh>

      {/* Details */}
      {[...Array(8)].map((_, i) => (
        <mesh key={i} position={[-1 + i * 0.3, 0.2, 1]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 0.3, 16]} />
          <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.2} />
        </mesh>
      ))}

      {/* LED indicators */}
      <mesh position={[1, 1.5, 0.95]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={2} />
        <pointLight color="#10b981" intensity={2} distance={2} />
      </mesh>
    </group>
  );
}

export default function ProductConfigurator3D() {
  const [color, setColor] = useState('#1e293b');
  const [metalness, setMetalness] = useState(0.8);
  const [roughness, setRoughness] = useState(0.2);
  const [scale, setScale] = useState(1);
  const [activePanel, setActivePanel] = useState<'color' | 'material' | 'size' | null>('color');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const colors = [
    { name: 'Slate', value: '#1e293b' },
    { name: 'Black', value: '#0f172a' },
    { name: 'Steel', value: '#475569' },
    { name: 'Amber', value: '#f59e0b' },
    { name: 'Red', value: '#dc2626' },
    { name: 'Blue', value: '#2563eb' },
  ];

  const resetView = () => {
    setColor('#1e293b');
    setMetalness(0.8);
    setRoughness(0.2);
    setScale(1);
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      <Card className="bg-slate-900/50 border-slate-800 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
          {/* 3D Viewer */}
          <div className="lg:col-span-2 relative bg-gradient-to-br from-slate-950 to-slate-900 min-h-[600px]">
            <Canvas shadows>
              <PerspectiveCamera makeDefault position={[5, 3, 5]} fov={50} />
              <OrbitControls
                enableZoom={true}
                enablePan={true}
                minDistance={3}
                maxDistance={15}
                minPolarAngle={0}
                maxPolarAngle={Math.PI / 2}
              />

              <ambientLight intensity={0.5} />
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

              <Suspense fallback={null}>
                <MachineModel
                  color={color}
                  metalness={metalness}
                  roughness={roughness}
                  scale={scale}
                />
                <ContactShadows position={[0, -0.1, 0]} opacity={0.5} scale={10} blur={2} far={4} />
                <Environment preset="city" />
              </Suspense>
            </Canvas>

            {/* Overlay Controls */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
              <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-lg px-4 py-2">
                <h3 className="text-white font-semibold">X-pert Line Pro</h3>
                <p className="text-slate-400 text-sm">Interactive 3D Model</p>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-slate-900/80 backdrop-blur-md border border-slate-700 text-white hover:bg-slate-800"
                  onClick={resetView}
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-slate-900/80 backdrop-blur-md border border-slate-700 text-white hover:bg-slate-800"
                  onClick={() => setIsFullscreen(!isFullscreen)}
                >
                  <Maximize2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-4">
              <Button
                variant="primary"
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
              >
                <Eye className="h-4 w-4 mr-2" />
                View in AR
              </Button>
              <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-800">
                <Download className="h-4 w-4 mr-2" />
                Download Specs
              </Button>
            </div>

            {/* Loading Fallback */}
            <Suspense
              fallback={
                <div className="absolute inset-0 flex items-center justify-center bg-slate-950">
                  <LoadingSpinner />
                </div>
              }
            />
          </div>

          {/* Configuration Panel */}
          <div className="bg-slate-900 p-6 overflow-y-auto max-h-[600px]">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white mb-2">Configure Your Machine</h3>
              <p className="text-slate-400 text-sm">Customize appearance and specifications</p>
            </div>

            {/* Configuration Tabs */}
            <div className="flex gap-2 mb-6">
              {[
                { id: 'color', icon: Palette, label: 'Color' },
                { id: 'material', icon: Layers, label: 'Finish' },
                { id: 'size', icon: Settings, label: 'Size' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActivePanel(tab.id as any)}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all ${
                    activePanel === tab.id
                      ? 'bg-amber-500/20 border border-amber-500/50 text-amber-400'
                      : 'bg-slate-800 border border-slate-700 text-slate-400 hover:bg-slate-750'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Configuration Options */}
            <AnimatePresence mode="wait">
              {activePanel === 'color' && (
                <motion.div
                  key="color"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-3">
                      Choose Color
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {colors.map((c) => (
                        <button
                          key={c.value}
                          onClick={() => setColor(c.value)}
                          className={`relative aspect-square rounded-lg border-2 transition-all overflow-hidden group ${
                            color === c.value
                              ? 'border-amber-500 scale-105'
                              : 'border-slate-700 hover:border-slate-600'
                          }`}
                          style={{ backgroundColor: c.value }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-2">
                            <span className="text-white text-xs font-medium">{c.name}</span>
                          </div>
                          {color === c.value && (
                            <motion.div
                              layoutId="selected-color"
                              className="absolute inset-0 border-2 border-amber-500 rounded-lg"
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activePanel === 'material' && (
                <motion.div
                  key="material"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-3">
                      Metalness: {(metalness * 100).toFixed(0)}%
                    </label>
                    <input
                      type="range"
                      value={metalness}
                      onChange={(e) => setMetalness(Number(e.target.value))}
                      min="0"
                      max="1"
                      step="0.01"
                      className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-3">
                      Roughness: {(roughness * 100).toFixed(0)}%
                    </label>
                    <input
                      type="range"
                      value={roughness}
                      onChange={(e) => setRoughness(Number(e.target.value))}
                      min="0"
                      max="1"
                      step="0.01"
                      className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-4">
                    {[
                      { name: 'Polished', m: 0.9, r: 0.1 },
                      { name: 'Brushed', m: 0.7, r: 0.3 },
                      { name: 'Matte', m: 0.5, r: 0.6 },
                      { name: 'Textured', m: 0.3, r: 0.8 },
                    ].map((preset) => (
                      <button
                        key={preset.name}
                        onClick={() => {
                          setMetalness(preset.m);
                          setRoughness(preset.r);
                        }}
                        className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 hover:bg-slate-750 hover:border-amber-500/50 transition-all text-sm font-medium"
                      >
                        {preset.name}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {activePanel === 'size' && (
                <motion.div
                  key="size"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-3">
                      Scale: {(scale * 100).toFixed(0)}%
                    </label>
                    <input
                      type="range"
                      value={scale}
                      onChange={(e) => setScale(Number(e.target.value))}
                      min="0.5"
                      max="1.5"
                      step="0.1"
                      className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                    />
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-slate-300">Size Presets</h4>
                    {[
                      { name: 'Compact', value: 0.7, desc: 'Perfect for tight spaces' },
                      { name: 'Standard', value: 1.0, desc: 'Most popular size' },
                      { name: 'Industrial', value: 1.3, desc: 'Maximum capacity' },
                    ].map((preset) => (
                      <button
                        key={preset.name}
                        onClick={() => setScale(preset.value)}
                        className={`w-full px-4 py-3 rounded-lg border transition-all text-left ${
                          Math.abs(scale - preset.value) < 0.05
                            ? 'bg-amber-500/20 border-amber-500/50 text-amber-400'
                            : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-600'
                        }`}
                      >
                        <div className="font-medium">{preset.name}</div>
                        <div className="text-xs opacity-75 mt-1">{preset.desc}</div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Summary */}
            <div className="mt-8 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
              <h4 className="text-sm font-medium text-slate-300 mb-3">Configuration Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-slate-400">
                  <span>Color:</span>
                  <span className="text-white">{colors.find((c) => c.value === color)?.name}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Finish:</span>
                  <span className="text-white">
                    {roughness < 0.3 ? 'Polished' : roughness < 0.5 ? 'Brushed' : 'Matte'}
                  </span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Size:</span>
                  <span className="text-white">
                    {scale < 0.85 ? 'Compact' : scale < 1.15 ? 'Standard' : 'Industrial'}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 space-y-3">
              <Button
                variant="primary"
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
              >
                Request Quote for This Configuration
              </Button>
              <Button
                variant="outline"
                className="w-full border-slate-700 text-slate-300 hover:bg-slate-800"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share Configuration
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
