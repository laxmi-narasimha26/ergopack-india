'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { HolographicMaterial } from '../Effects/Shaders';

// =====================================================
// PROCEDURAL STRAPPING MACHINE - Built from primitives
// =====================================================

interface StrappingMachineProps {
    position?: [number, number, number];
    scale?: number;
    color?: string;
    accentColor?: string;
    animate?: boolean;
    wireframe?: boolean;
    exploded?: boolean;
    holographic?: boolean;
}

export function StrappingMachine({
    position = [0, 0, 0],
    scale = 1,
    color = '#C8102E',
    accentColor = '#FFB81C',
    animate = true,
    wireframe = false,
    exploded = false,
    holographic = false,
}: StrappingMachineProps) {
    const groupRef = useRef<THREE.Group>(null);
    const chainRef = useRef<THREE.Group>(null);
    const wheelsRef = useRef<THREE.Group>(null);

    // Animation
    useFrame((state) => {
        if (!animate || !groupRef.current) return;

        // Subtle hover animation
        groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;

        // Rotate wheels
        if (wheelsRef.current) {
            wheelsRef.current.children.forEach((wheel) => {
                wheel.rotation.z -= 0.02;
            });
        }

        // Animate chain
        if (chainRef.current) {
            chainRef.current.rotation.y = state.clock.elapsedTime * 0.5;
        }
    });

    const explosionOffset = exploded ? 1.5 : 0;

    return (
        <group ref={groupRef} position={position} scale={scale}>
            {/* MAIN FRAME */}
            <group position={[0, exploded ? explosionOffset : 0, 0]}>
                {/* Central column */}
                <mesh position={[0, 0.6, 0]}>
                    <boxGeometry args={[0.4, 1.2, 0.3]} />
                    {holographic ? (
                        <HolographicMaterial color={color} opacity={0.8} fresnelPower={3} />
                    ) : (
                        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} wireframe={wireframe} />
                    )}
                </mesh>

                {/* Top cap */}
                <mesh position={[0, 1.25, 0]}>
                    <cylinderGeometry args={[0.25, 0.2, 0.1, 16]} />
                    {holographic ? (
                        <HolographicMaterial color={accentColor} opacity={0.9} />
                    ) : (
                        <meshStandardMaterial color={accentColor} metalness={0.9} roughness={0.1} />
                    )}
                </mesh>

                {/* Control panel */}
                <mesh position={[0.25, 0.9, 0]}>
                    <boxGeometry args={[0.1, 0.3, 0.2]} />
                    <meshStandardMaterial color="#1a1a1a" metalness={0.5} roughness={0.5} />
                </mesh>

                {/* LED indicators */}
                {[0, 0.08, 0.16].map((y, i) => (
                    <mesh key={i} position={[0.31, 0.8 + y, 0]}>
                        <sphereGeometry args={[0.015, 8, 8]} />
                        <meshBasicMaterial color={i === 0 ? '#00ff00' : i === 1 ? accentColor : color} />
                    </mesh>
                ))}
            </group>

            {/* CHAIN TRACK SYSTEM */}
            <group ref={chainRef} position={[0, exploded ? -explosionOffset : 0, 0]}>
                {/* Main chain track - horizontal */}
                <mesh position={[0, -0.1, 0.8]} rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[0.6, 0.03, 8, 32, Math.PI]} />
                    {holographic ? (
                        <HolographicMaterial color={accentColor} scanlineCount={50} />
                    ) : (
                        <meshStandardMaterial color="#333" metalness={0.9} roughness={0.3} wireframe={wireframe} />
                    )}
                </mesh>

                {/* Chain links - instanced */}
                <ChainLinks
                    radius={0.6}
                    linkCount={24}
                    color={accentColor}
                    animate={animate}
                    holographic={holographic}
                />
            </group>

            {/* SEALING HEAD */}
            <group position={[exploded ? explosionOffset * 0.5 : 0, exploded ? explosionOffset * 0.3 : 0, 0.4]}>
                <mesh position={[0, 0.3, 0]}>
                    <boxGeometry args={[0.2, 0.15, 0.15]} />
                    {holographic ? (
                        <HolographicMaterial color={color} glitchIntensity={0.1} />
                    ) : (
                        <meshStandardMaterial color={color} metalness={0.7} roughness={0.2} />
                    )}
                </mesh>

                {/* Tension arm */}
                <mesh position={[0.15, 0.25, 0]} rotation={[0, 0, -0.3]}>
                    <cylinderGeometry args={[0.02, 0.02, 0.2, 8]} />
                    <meshStandardMaterial color="#666" metalness={0.8} roughness={0.3} />
                </mesh>
            </group>

            {/* BATTERY COMPARTMENT */}
            <group position={[exploded ? -explosionOffset * 0.5 : 0, -0.3, exploded ? -explosionOffset * 0.3 : 0]}>
                <mesh>
                    <boxGeometry args={[0.25, 0.2, 0.15]} />
                    {holographic ? (
                        <HolographicMaterial color="#222" opacity={0.7} />
                    ) : (
                        <meshStandardMaterial color="#222" metalness={0.6} roughness={0.4} />
                    )}
                </mesh>

                {/* Battery glow */}
                <mesh position={[0, 0, 0.08]}>
                    <planeGeometry args={[0.15, 0.1]} />
                    <meshBasicMaterial color={accentColor} transparent opacity={0.5} />
                </mesh>
            </group>

            {/* WHEELS */}
            <group ref={wheelsRef} position={[0, exploded ? -explosionOffset * 1.5 : 0, 0]}>
                {/* Front wheels */}
                {[-0.25, 0.25].map((x, i) => (
                    <group key={i} position={[x, -0.5, 0.2]}>
                        <mesh rotation={[0, 0, Math.PI / 2]}>
                            <cylinderGeometry args={[0.1, 0.1, 0.05, 16]} />
                            {holographic ? (
                                <HolographicMaterial color="#333" />
                            ) : (
                                <meshStandardMaterial color="#333" metalness={0.3} roughness={0.8} />
                            )}
                        </mesh>
                        {/* Wheel rim */}
                        <mesh rotation={[0, 0, Math.PI / 2]}>
                            <torusGeometry args={[0.08, 0.02, 8, 16]} />
                            <meshStandardMaterial color="#666" metalness={0.8} roughness={0.2} />
                        </mesh>
                    </group>
                ))}

                {/* Rear caster */}
                <group position={[0, -0.5, -0.3]}>
                    <mesh rotation={[0, 0, Math.PI / 2]}>
                        <cylinderGeometry args={[0.06, 0.06, 0.04, 16]} />
                        <meshStandardMaterial color="#333" metalness={0.3} roughness={0.8} />
                    </mesh>
                </group>
            </group>

            {/* HANDLE */}
            <group position={[0, exploded ? explosionOffset * 0.8 : 0, -0.3]}>
                {/* Handle tube */}
                <mesh position={[0, 0.8, 0]} rotation={[0.3, 0, 0]}>
                    <cylinderGeometry args={[0.02, 0.02, 0.6, 8]} />
                    <meshStandardMaterial color="#666" metalness={0.7} roughness={0.3} />
                </mesh>

                {/* Handle grip */}
                <mesh position={[0, 1.05, -0.1]}>
                    <capsuleGeometry args={[0.03, 0.15, 4, 8]} />
                    <meshStandardMaterial color="#222" metalness={0.2} roughness={0.8} />
                </mesh>
            </group>

            {/* STRAP COIL */}
            <group position={[exploded ? explosionOffset : 0, 0.2, -0.2]}>
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[0.12, 0.04, 8, 24]} />
                    {holographic ? (
                        <HolographicMaterial color={accentColor} scanlineSpeed={5} />
                    ) : (
                        <meshStandardMaterial color={accentColor} metalness={0.2} roughness={0.6} />
                    )}
                </mesh>
            </group>
        </group>
    );
}

// Animated chain links
interface ChainLinksProps {
    radius: number;
    linkCount: number;
    color: string;
    animate: boolean;
    holographic: boolean;
}

function ChainLinks({ radius, linkCount, color, animate, holographic }: ChainLinksProps) {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!animate || !groupRef.current) return;

        // Rotate chain links around the track
        groupRef.current.children.forEach((link, i) => {
            const angle = (i / linkCount) * Math.PI + state.clock.elapsedTime * 0.5;
            link.position.x = Math.cos(angle) * radius;
            link.position.z = Math.sin(angle) * radius * 0.6 + 0.5;
            link.rotation.y = angle + Math.PI / 2;
        });
    });

    return (
        <group ref={groupRef}>
            {Array.from({ length: linkCount }).map((_, i) => {
                const angle = (i / linkCount) * Math.PI;
                return (
                    <mesh
                        key={i}
                        position={[Math.cos(angle) * radius, -0.1, Math.sin(angle) * radius * 0.6 + 0.5]}
                        rotation={[0, angle + Math.PI / 2, 0]}
                    >
                        <boxGeometry args={[0.04, 0.02, 0.01]} />
                        {holographic ? (
                            <HolographicMaterial color={color} opacity={0.9} />
                        ) : (
                            <meshStandardMaterial color={color} metalness={0.8} roughness={0.3} />
                        )}
                    </mesh>
                );
            })}
        </group>
    );
}

// Simplified version for performance when showing multiple machines
export function StrappingMachineSimple({
    position = [0, 0, 0] as [number, number, number],
    scale = 1,
    color = '#C8102E',
}: {
    position?: [number, number, number];
    scale?: number;
    color?: string;
}) {
    return (
        <group position={position} scale={scale}>
            {/* Main body */}
            <mesh position={[0, 0.4, 0]}>
                <boxGeometry args={[0.4, 0.8, 0.3]} />
                <meshStandardMaterial color={color} metalness={0.7} roughness={0.3} />
            </mesh>

            {/* Track */}
            <mesh position={[0, 0, 0.4]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.5, 0.02, 8, 24, Math.PI]} />
                <meshStandardMaterial color="#444" metalness={0.8} roughness={0.3} />
            </mesh>

            {/* Wheels */}
            <mesh position={[0, -0.3, 0]}>
                <cylinderGeometry args={[0.08, 0.08, 0.5, 8]} />
                <meshStandardMaterial color="#333" />
            </mesh>
        </group>
    );
}

// 3D Pallet model
interface PalletProps {
    position?: [number, number, number];
    scale?: number;
    strapped?: boolean;
    strapProgress?: number;
    strapColor?: string;
}

export function Pallet({
    position = [0, 0, 0],
    scale = 1,
    strapped = false,
    strapProgress = 1,
    strapColor = '#FFB81C',
}: PalletProps) {
    const strapRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (strapRef.current && strapped) {
            // Pulse strap
            const pulse = Math.sin(state.clock.elapsedTime * 3) * 0.1 + 1;
            strapRef.current.scale.y = pulse;
        }
    });

    return (
        <group position={position} scale={scale}>
            {/* Pallet base */}
            <mesh position={[0, -0.1, 0]}>
                <boxGeometry args={[1.2, 0.15, 1]} />
                <meshStandardMaterial color="#8B4513" metalness={0.1} roughness={0.9} />
            </mesh>

            {/* Pallet slats */}
            {[-0.4, 0, 0.4].map((z, i) => (
                <mesh key={i} position={[0, -0.02, z]}>
                    <boxGeometry args={[1.2, 0.02, 0.2]} />
                    <meshStandardMaterial color="#A0522D" metalness={0.1} roughness={0.9} />
                </mesh>
            ))}

            {/* Cargo boxes */}
            {[
                [0, 0.2, 0],
                [-0.3, 0.2, -0.2],
                [0.25, 0.2, 0.15],
                [0, 0.5, -0.1],
            ].map((pos, i) => (
                <mesh key={i} position={pos as [number, number, number]}>
                    <boxGeometry args={[0.4, 0.25, 0.35]} />
                    <meshStandardMaterial
                        color={['#4a90d9', '#e74c3c', '#27ae60', '#f39c12'][i % 4]}
                        metalness={0.1}
                        roughness={0.7}
                    />
                </mesh>
            ))}

            {/* Strap (when strapped) */}
            {strapped && (
                <mesh ref={strapRef} position={[0, 0.35, 0]}>
                    <torusGeometry args={[0.7, 0.02, 8, 32]} />
                    <meshStandardMaterial
                        color={strapColor}
                        metalness={0.3}
                        roughness={0.4}
                        transparent
                        opacity={strapProgress}
                    />
                </mesh>
            )}
        </group>
    );
}

// Animated strapping strap going around pallet
interface AnimatedStrapProps {
    palletPosition?: [number, number, number];
    progress?: number;
    color?: string;
}

export function AnimatedStrap({
    palletPosition = [0, 0, 0],
    progress = 0,
    color = '#FFB81C',
}: AnimatedStrapProps) {
    const strapRef = useRef<THREE.Line>(null);

    // Create strap path
    const points = useMemo(() => {
        const pts: THREE.Vector3[] = [];
        const segments = 64;

        for (let i = 0; i <= segments; i++) {
            const t = i / segments;
            const angle = t * Math.PI * 2;

            // Elliptical path around pallet
            const x = Math.cos(angle) * 0.7;
            const y = 0.35 + Math.sin(angle * 2) * 0.05;
            const z = Math.sin(angle) * 0.5;

            pts.push(new THREE.Vector3(x, y, z));
        }

        return pts;
    }, []);

    const geometry = useMemo(() => {
        const visiblePoints = points.slice(0, Math.floor(points.length * progress));
        if (visiblePoints.length < 2) return null;

        const geo = new THREE.BufferGeometry().setFromPoints(visiblePoints);
        return geo;
    }, [points, progress]);

    if (!geometry || progress <= 0) return null;

    return (
        <group position={palletPosition}>
            <line ref={strapRef}>
                <primitive object={geometry} attach="geometry" />
                <lineBasicMaterial color={color} linewidth={3} />
            </line>
        </group>
    );
}
