'use client';

import { useRef, useEffect, useLayoutEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
    PerspectiveCamera,
    Center,
    SoftShadows,
} from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, Noise, TiltShift } from '@react-three/postprocessing';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { StrappingMachine } from '../Models/StrappingMachine';
import { WoodenPallet } from '../Models/WoodenPallet';

// =====================================================
// CINEMATIC MAIN SCENE (OPTIMIZED)
// =====================================================
// Uses GSAP Timeline for deterministic, stutter-free camera movement.

const CinematicCameraRig = ({ scrollProgress }: { scrollProgress: number }) => {
    const { camera } = useThree();
    const tl = useRef<gsap.core.Timeline | null>(null);

    // Initial Camera Pos
    const startPos = new THREE.Vector3(2.5, 1.5, 4);
    const startTarget = new THREE.Vector3(0, 0.5, 0);

    useLayoutEffect(() => {
        // SETUP GSAP TIMELINE
        // We map the "Time" of the timeline to the "Scroll Progress" manually or via ScrollTrigger proxy
        // Since we receive 'scrollProgress' as a prop (0-1), we can .progress() the timeline.

        // Define Keyframes
        // 1. Intro -> Lance View
        // 2. Lance View -> Under Pallet
        // 3. Under Pallet -> Operator View
        // 4. Operator View -> Top Down

        // We animate a dummy object to hold values, then apply to camera
        const camParams = {
            x: startPos.x, y: startPos.y, z: startPos.z,
            tx: startTarget.x, ty: startTarget.y, tz: startTarget.z
        };

        const ctx = gsap.context(() => {
            tl.current = gsap.timeline({ paused: true })
                // 0.0 -> 0.2: INTRO -> LANCE NOZZLE
                .to(camParams, {
                    x: 0.8, y: 0.3, z: 1.5,
                    tx: 0, ty: 0.1, tz: 0,
                    ease: "power1.inOut",
                    duration: 0.2
                })
                // 0.2 -> 0.45: STAY AT NOZZLE (Chain Extends)
                .to(camParams, {
                    x: 0.5, y: 0.2, z: 1.2, // Visual push in
                    duration: 0.25,
                    ease: "none"
                })
                // 0.45 -> 0.7: DIVE UNDER PALLET (The Tunnel)
                .to(camParams, {
                    x: -0.5, y: 0.1, z: -0.8,
                    tx: 0, ty: 0.1, tz: -1.0,
                    ease: "power1.inOut",
                    duration: 0.25
                })
                // 0.7 -> 0.9: RISE TO OPERATOR
                .to(camParams, {
                    x: 0.5, y: 1.5, z: 0.2,
                    tx: 0, ty: 0.5, tz: 0,
                    ease: "power2.out",
                    duration: 0.2
                })
                // 0.9 -> 1.0: TOP DOWN FINISH
                .to(camParams, {
                    x: 0, y: 5, z: 0,
                    tx: 0, ty: 0, tz: 0,
                    ease: "power2.inOut",
                    duration: 0.1
                });
        });

        return () => ctx.revert();
    }, []);

    // FRAME LOOP: SYNC SCROLL TO TIMELINE
    useFrame(() => {
        if (tl.current) {
            // Smoothly interpolate timeline progress to avoid scroll wheel jitter
            // But for "cinematic" snappy feel, direct mapping is often cleaner if Lenis is used.
            // We rely on the parent 'scrollProgress' being Lenis-smoothed already.
            tl.current.progress(scrollProgress);

            // Extract values from the timeline's internal animated object (accessing targets[0] is hacky, 
            // better to keep ref to the 'camParams' object we created in effect? 
            // Actually, we need to store camParams in a ref so we can read it here.
        }
    });

    // We need a way to read the animated values. 
    // Re-writing logic to use a ref for values and GSAP to animate that ref.
    const camValues = useRef({
        x: startPos.x, y: startPos.y, z: startPos.z,
        tx: startTarget.x, ty: startTarget.y, tz: startTarget.z
    });

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            tl.current = gsap.timeline({ paused: true })
                .to(camValues.current, {
                    x: 0.8, y: 0.3, z: 1.5,
                    tx: 0, ty: 0.1, tz: 0,
                    ease: "power1.inOut",
                    duration: 0.2
                })
                .to(camValues.current, {
                    x: 0.5, y: 0.2, z: 1.2,
                    duration: 0.25,
                    ease: "none"
                })
                .to(camValues.current, {
                    x: -0.5, y: 0.1, z: -0.8,
                    tx: 0, ty: 0.1, tz: -1.5, // Look further back
                    ease: "power1.inOut",
                    duration: 0.25
                })
                .to(camValues.current, {
                    x: 0.5, y: 1.5, z: 0.2,
                    tx: 0, ty: 0.5, tz: 0,
                    ease: "power2.out",
                    duration: 0.2
                })
                .to(camValues.current, {
                    x: 0, y: 5, z: 0,
                    tx: 0, ty: 0, tz: 0,
                    ease: "power2.inOut",
                    duration: 0.1
                });
        });
        return () => ctx.revert();
    }, []);

    useFrame(() => {
        if (tl.current) {
            tl.current.progress(scrollProgress);

            // Apply to ThreeJS Camera
            camera.position.set(camValues.current.x, camValues.current.y, camValues.current.z);
            camera.lookAt(camValues.current.tx, camValues.current.ty, camValues.current.tz);
        }
    });

    return null;
}

export default function MainScene({ currentSection, scrollProgress }: { currentSection: number, scrollProgress: number }) {

    // Cycle logic: Mapped to responsive scroll
    const cycleProgress = Math.min(Math.max((scrollProgress - 0.15) * 1.5, 0), 1);

    // Machine Movement: Smooth interpolate
    const machineZ = scrollProgress < 0.2 ? 3 - (scrollProgress * 12) : 0.6;

    return (
        <div className="w-full h-screen fixed inset-0 z-0 bg-[#e0e0e0]">
            <Canvas shadows dpr={[1, 1.5]} gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}>
                {/* Reduced Max DPR to 1.5 for performance on high-res screens */}

                {/* --- CINEMATIC LIGHTING --- */}
                <spotLight
                    position={[8, 10, 5]}
                    angle={0.4}
                    penumbra={0.2}
                    intensity={2.5}
                    castShadow
                    shadow-bias={-0.0001}
                />
                <spotLight position={[-5, 2, -5]} intensity={3} color="#ffffff" />
                <hemisphereLight intensity={0.6} color="#ffffff" groundColor="#a0a0a0" />

                <SoftShadows size={8} samples={12} /> {/* Reduced samples slightly for perf */}

                <color attach="background" args={['#d0d0d0']} />
                <fog attach="fog" args={['#d0d0d0', 5, 20]} />


                {/* --- SCENE CONTENT --- */}
                <PerspectiveCamera makeDefault position={[3, 2, 5]} fov={50} />
                <CinematicCameraRig scrollProgress={scrollProgress} />

                <group position={[0, -1, 0]}>
                    <Center>
                        {/* Floor Plane */}
                        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
                            <planeGeometry args={[100, 100]} />
                            <shadowMaterial transparent opacity={0.3} />
                        </mesh>

                        <StrappingMachine
                            position={[1.2, 0, machineZ]}
                            rotation={[0, Math.PI, 0]}
                            scale={2}
                            cycleProgress={cycleProgress}
                            modelType="726X"
                        />

                        <WoodenPallet
                            position={[0, 0.144, 0]}
                            scale={2}
                            strapped={cycleProgress > 0.9}
                            strapProgress={cycleProgress}
                        />
                    </Center>
                </group>

                {/* --- POST PROCESSING --- */}
                <EffectComposer enabled={true} multisampling={0}>
                    {/* Disable multisampling in composer for perf */}
                    <Vignette darkness={0.5} />
                    <Noise opacity={0.03} />
                    <Bloom luminanceThreshold={0.8} intensity={0.4} mipmapBlur />
                </EffectComposer>

            </Canvas>
        </div>
    );
}
