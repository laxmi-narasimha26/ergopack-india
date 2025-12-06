'use client';

import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
    PerspectiveCamera,
    OrbitControls,
    Stars,
    Sparkles,
    Float,
    Text3D,
    Center,
} from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration, Vignette, Noise } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { ParticleField, ConvergingParticles, EnergyRings } from '../Effects/Particles';
import { StrappingMachine, Pallet, AnimatedStrap } from '../Models/StrappingMachine';
import {
    OrbitRings,
    NeuralNetwork,
    PulsingCore,
    HexagonGrid,
    ScanLineEffect,
} from '../Effects/AdvancedEffects';

// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// =====================================================
// CAMERA RIG - Scroll-controlled camera movement
// =====================================================

interface CameraRigProps {
    scrollProgress: number;
}

function CameraRig({ scrollProgress }: CameraRigProps) {
    const { camera } = useThree();
    const targetPosition = useRef(new THREE.Vector3(0, 2, 15));
    const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));

    useFrame(() => {
        // Define camera positions for each scroll section
        const sections = [
            { pos: [0, 2, 20], lookAt: [0, 0, 0] },      // 0: Far view - intro
            { pos: [0, 1, 12], lookAt: [0, 0, 0] },      // 10: Approaching
            { pos: [3, 2, 8], lookAt: [0, 0.5, 0] },     // 20: Brand reveal
            { pos: [0, 1, 5], lookAt: [0, 0.3, 0] },     // 30: Machine focus
            { pos: [-2, 0.5, 4], lookAt: [0, 0, 0] },    // 40: Strapping demo
            { pos: [2, 1, 6], lookAt: [0, 0, 0] },       // 50: Model 700
            { pos: [-2, 1, 6], lookAt: [0, 0, 0] },      // 60: Model GO
            { pos: [0, 2, 5], lookAt: [0, 0.5, 0] },     // 70: Model 726X (premium)
            { pos: [0, 3, 10], lookAt: [0, 0, 0] },      // 80: Comparison overview
            { pos: [0, 1.5, 8], lookAt: [0, 0, 0] },     // 90: ROI section
            { pos: [0, 2, 15], lookAt: [0, 0, 0] },      // 100: Final CTA - pull back
        ];

        // Find current section
        const sectionIndex = Math.min(
            Math.floor(scrollProgress * (sections.length - 1)),
            sections.length - 2
        );
        const sectionProgress = (scrollProgress * (sections.length - 1)) % 1;

        const currentSection = sections[sectionIndex];
        const nextSection = sections[sectionIndex + 1];

        // Smooth interpolation between sections
        const eased = 1 - Math.pow(1 - sectionProgress, 3); // Ease out cubic

        targetPosition.current.set(
            THREE.MathUtils.lerp(currentSection.pos[0], nextSection.pos[0], eased),
            THREE.MathUtils.lerp(currentSection.pos[1], nextSection.pos[1], eased),
            THREE.MathUtils.lerp(currentSection.pos[2], nextSection.pos[2], eased)
        );

        targetLookAt.current.set(
            THREE.MathUtils.lerp(currentSection.lookAt[0], nextSection.lookAt[0], eased),
            THREE.MathUtils.lerp(currentSection.lookAt[1], nextSection.lookAt[1], eased),
            THREE.MathUtils.lerp(currentSection.lookAt[2], nextSection.lookAt[2], eased)
        );

        // Smooth camera movement
        camera.position.lerp(targetPosition.current, 0.05);

        // Look at target
        const lookAtVector = new THREE.Vector3();
        lookAtVector.lerpVectors(
            new THREE.Vector3(...camera.position.toArray()),
            targetLookAt.current,
            0.05
        );
        camera.lookAt(targetLookAt.current);
    });

    return null;
}

// =====================================================
// MAIN 3D SCENE
// =====================================================

interface Scene3DContentProps {
    scrollProgress: number;
    currentSection: number;
}

function Scene3DContent({ scrollProgress, currentSection }: Scene3DContentProps) {
    const [strappingProgress, setStrappingProgress] = useState(0);

    // Animate strapping when in strapping demo section
    useFrame((state) => {
        if (currentSection === 4) {
            // Strapping demo section
            const progress = (Math.sin(state.clock.elapsedTime * 0.5) + 1) / 2;
            setStrappingProgress(progress);
        }
    });

    // Calculate section-based visibility
    const showMachine = scrollProgress > 0.15;
    const showPallet = scrollProgress > 0.25;
    const explodedView = currentSection === 5 || currentSection === 6 || currentSection === 7;
    const holographicMode = currentSection >= 5 && currentSection <= 7;

    return (
        <>
            {/* Camera */}
            <PerspectiveCamera makeDefault position={[0, 2, 15]} fov={50} />
            <CameraRig scrollProgress={scrollProgress} />

            {/* Environment - using lights instead of HDR preset to avoid external loading */}
            <color attach="background" args={['#000000']} />
            <fog attach="fog" args={['#000000', 10, 50]} />

            {/* Ambient lighting */}
            <ambientLight intensity={0.3} />

            {/* Hemisphere light for soft fill */}
            <hemisphereLight args={['#1a1a2e', '#000000', 0.5]} />

            {/* Main spot light */}
            <spotLight
                position={[5, 10, 5]}
                angle={0.3}
                penumbra={1}
                intensity={1.5}
                castShadow
                shadow-mapSize={[2048, 2048]}
                color="#FFB81C"
            />

            {/* Fill lights */}
            <pointLight position={[-5, 5, -5]} intensity={0.5} color="#C8102E" />
            <pointLight position={[5, -5, 5]} intensity={0.3} color="#4A90D9" />

            {/* Stars background */}
            <Stars
                radius={100}
                depth={50}
                count={5000}
                factor={4}
                saturation={0}
                fade
                speed={0.5}
            />

            {/* Particle field */}
            <ParticleField
                count={1500}
                spread={30}
                color="#FFB81C"
                opacity={0.3}
                speed={0.02}
            />

            {/* Sparkles around main area */}
            <Sparkles
                count={100}
                size={2}
                scale={10}
                color="#FFB81C"
                speed={0.3}
            />

            {/* MAIN STRAPPING MACHINE */}
            {showMachine && (
                <Float
                    speed={1}
                    rotationIntensity={holographicMode ? 0.5 : 0.1}
                    floatIntensity={0.5}
                >
                    <StrappingMachine
                        position={[0, 0, 0]}
                        scale={2}
                        color="#C8102E"
                        accentColor="#FFB81C"
                        animate={true}
                        exploded={explodedView}
                        holographic={holographicMode}
                    />
                </Float>
            )}

            {/* PALLET with strapping animation */}
            {showPallet && (
                <Pallet
                    position={[0, -1.5, 2]}
                    scale={1.5}
                    strapped={currentSection >= 4}
                    strapProgress={strappingProgress}
                />
            )}

            {/* Animated strapping (during demo section) */}
            {currentSection === 4 && (
                <AnimatedStrap
                    palletPosition={[0, -1.5, 2]}
                    progress={strappingProgress}
                    color="#FFB81C"
                />
            )}

            {/* Energy Rings around machine during holographic mode */}
            {holographicMode && (
                <EnergyRings
                    count={5}
                    baseRadius={1.5}
                    color="#FFB81C"
                    position={[0, 0.5, 0]}
                />
            )}

            {/* Orbit rings decorating the scene */}
            {currentSection >= 2 && (
                <OrbitRings
                    count={4}
                    baseRadius={3}
                    color="#C8102E"
                    position={[0, 0, 0]}
                />
            )}

            {/* Neural network background during comparison section */}
            {currentSection === 8 && (
                <NeuralNetwork
                    nodeCount={25}
                    radius={5}
                    color="#FFB81C"
                    position={[0, 0, -5]}
                />
            )}

            {/* Pulsing core during ROI section */}
            {currentSection === 9 && (
                <PulsingCore
                    position={[0, 1, 0]}
                    color="#FFB81C"
                    size={0.4}
                    pulseSpeed={2}
                />
            )}

            {/* Hexagon grid background */}
            {currentSection <= 3 && (
                <HexagonGrid
                    radius={15}
                    size={0.8}
                    color="#FFB81C"
                    position={[0, 0, -15]}
                />
            )}

            {/* Scan line effect during intro */}
            {currentSection <= 2 && (
                <ScanLineEffect
                    width={10}
                    height={6}
                    color="#00ffff"
                    speed={0.8}
                    position={[0, 0, 3]}
                />
            )}

            {/* Converging particles for finale */}
            {currentSection >= 9 && (
                <ConvergingParticles
                    count={300}
                    targetPosition={[0, 0, 0]}
                    color="#C8102E"
                    active={true}
                />
            )}

            {/* Ground plane with grid */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]} receiveShadow>
                <planeGeometry args={[50, 50, 50, 50]} />
                <meshStandardMaterial
                    color="#111111"
                    metalness={0.9}
                    roughness={0.5}
                    wireframe
                    transparent
                    opacity={0.3}
                />
            </mesh>

            {/* Post-processing effects */}
            <EffectComposer>
                <Bloom
                    intensity={0.5}
                    luminanceThreshold={0.8}
                    luminanceSmoothing={0.9}
                />
                <ChromaticAberration
                    offset={new THREE.Vector2(0.001, 0.001)}
                    blendFunction={BlendFunction.NORMAL}
                    radialModulation={false}
                    modulationOffset={0}
                />
                <Vignette
                    offset={0.3}
                    darkness={0.5}
                    blendFunction={BlendFunction.NORMAL}
                />
                <Noise
                    opacity={0.02}
                    blendFunction={BlendFunction.OVERLAY}
                />
            </EffectComposer>
        </>
    );
}

// =====================================================
// MAIN SCENE COMPONENT
// =====================================================

interface MainSceneProps {
    scrollProgress: number;
    currentSection: number;
}

export default function MainScene({ scrollProgress, currentSection }: MainSceneProps) {
    return (
        <div className="fixed inset-0 z-0">
            <Canvas
                shadows
                dpr={[1, 2]}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: 'high-performance',
                }}
                style={{ background: 'black' }}
            >
                <Scene3DContent
                    scrollProgress={scrollProgress}
                    currentSection={currentSection}
                />
            </Canvas>
        </div>
    );
}

// =====================================================
// LOADING SCREEN
// =====================================================

export function LoadingScreen({ progress }: { progress: number }) {
    return (
        <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
            <div className="text-center">
                {/* Animated logo */}
                <div className="relative w-32 h-32 mx-auto mb-8">
                    <div
                        className="absolute inset-0 border-2 border-[#C8102E] rounded-full animate-spin"
                        style={{ animationDuration: '3s' }}
                    />
                    <div
                        className="absolute inset-2 border-2 border-[#FFB81C] rounded-full animate-spin"
                        style={{ animationDuration: '2s', animationDirection: 'reverse' }}
                    />
                    <div
                        className="absolute inset-4 border-2 border-white/30 rounded-full animate-pulse"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-4xl font-black text-white">E</span>
                    </div>
                </div>

                {/* Progress bar */}
                <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden mx-auto">
                    <div
                        className="h-full bg-gradient-to-r from-[#C8102E] to-[#FFB81C] transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <p className="text-white/60 mt-4 tracking-[0.3em] text-sm uppercase">
                    Loading Experience
                </p>

                <p className="text-[#FFB81C] mt-2 text-2xl font-mono">
                    {Math.round(progress)}%
                </p>
            </div>
        </div>
    );
}
