'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

// =====================================================
// ANIMATED CHAIN WITH PHYSICS-LIKE MOVEMENT
// =====================================================

interface AnimatedChainSystemProps {
    pathPoints?: THREE.Vector3[];
    linkCount?: number;
    linkSize?: [number, number, number];
    color?: string;
    speed?: number;
    position?: [number, number, number];
}

export function AnimatedChainSystem({
    linkCount = 40,
    linkSize = [0.04, 0.02, 0.01],
    color = '#FFB81C',
    speed = 1,
    position = [0, 0, 0],
}: AnimatedChainSystemProps) {
    const groupRef = useRef<THREE.Group>(null);
    const linksRef = useRef<THREE.InstancedMesh>(null);
    const progressRef = useRef(0);

    // Create path for chain to follow
    const chainPath = useMemo(() => {
        const points = [
            new THREE.Vector3(-0.5, 0.3, 0),
            new THREE.Vector3(0.5, 0.3, 0),
            new THREE.Vector3(0.7, 0, 0.5),
            new THREE.Vector3(0.5, -0.3, 1),
            new THREE.Vector3(-0.5, -0.3, 1),
            new THREE.Vector3(-0.7, 0, 0.5),
        ];
        return new THREE.CatmullRomCurve3(points, true);
    }, []);

    // Dummy for matrix updates
    const dummy = useMemo(() => new THREE.Object3D(), []);

    useFrame((state, delta) => {
        if (!linksRef.current) return;

        progressRef.current += delta * speed * 0.2;

        for (let i = 0; i < linkCount; i++) {
            const t = (i / linkCount + progressRef.current) % 1;
            const point = chainPath.getPoint(t);
            const tangent = chainPath.getTangent(t);

            dummy.position.copy(point);
            dummy.lookAt(point.clone().add(tangent));
            dummy.rotation.z = (i % 2) * Math.PI / 2; // Alternate link rotation
            dummy.updateMatrix();

            linksRef.current.setMatrixAt(i, dummy.matrix);
        }

        linksRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <group ref={groupRef} position={position}>
            <instancedMesh ref={linksRef} args={[undefined, undefined, linkCount]}>
                <boxGeometry args={linkSize} />
                <meshStandardMaterial
                    color={color}
                    metalness={0.8}
                    roughness={0.2}
                />
            </instancedMesh>
        </group>
    );
}

// =====================================================
// STRAPPING PROCESS VISUALIZATION
// =====================================================

interface StrappingProcessProps {
    position?: [number, number, number];
    active?: boolean;
    color?: string;
}

export function StrappingProcess({
    position = [0, 0, 0],
    active = true,
    color = '#FFB81C',
}: StrappingProcessProps) {
    const groupRef = useRef<THREE.Group>(null);
    const strapRef = useRef<THREE.Mesh>(null);
    const [phase, setPhase] = useState<'feed' | 'wrap' | 'tension' | 'seal' | 'cut'>('feed');
    const progressRef = useRef(0);

    useFrame((state, delta) => {
        if (!active) return;

        progressRef.current += delta * 0.3;

        // Cycle through phases
        const phaseProgress = progressRef.current % 5;
        if (phaseProgress < 1) setPhase('feed');
        else if (phaseProgress < 2) setPhase('wrap');
        else if (phaseProgress < 3) setPhase('tension');
        else if (phaseProgress < 4) setPhase('seal');
        else setPhase('cut');

        // Animate strap based on phase
        if (strapRef.current) {
            const scale = strapRef.current.scale;
            switch (phase) {
                case 'feed':
                    scale.x = Math.min(1, (phaseProgress % 1) * 2);
                    break;
                case 'wrap':
                    scale.y = 1 + Math.sin((phaseProgress % 1) * Math.PI) * 0.1;
                    break;
                case 'tension':
                    scale.z = 1 - (phaseProgress % 1) * 0.2;
                    break;
                default:
                    break;
            }
        }
    });

    return (
        <group ref={groupRef} position={position}>
            {/* Pallet representation */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[1.2, 0.15, 1]} />
                <meshStandardMaterial color="#8B4513" metalness={0.1} roughness={0.9} />
            </mesh>

            {/* Animated strap */}
            <mesh ref={strapRef} position={[0, 0.4, 0]}>
                <torusGeometry args={[0.65, 0.015, 8, 32]} />
                <meshStandardMaterial
                    color={color}
                    metalness={0.3}
                    roughness={0.5}
                    emissive={color}
                    emissiveIntensity={phase === 'tension' ? 0.3 : 0.1}
                />
            </mesh>

            {/* Phase indicator */}
            <Text
                position={[0, 1, 0]}
                fontSize={0.15}
                color="#FFFFFF"
                anchorX="center"
                anchorY="middle"
            >
                {phase.toUpperCase()}
            </Text>

            {/* Tension visualization */}
            {phase === 'tension' && (
                <mesh position={[0, 0.4, 0]}>
                    <torusGeometry args={[0.7, 0.005, 8, 32]} />
                    <meshBasicMaterial
                        color="#FF4444"
                        transparent
                        opacity={0.5}
                    />
                </mesh>
            )}
        </group>
    );
}

// =====================================================
// TECHNICAL SPECIFICATIONS PANEL (3D)
// =====================================================

interface TechSpecsPanelProps {
    specs: { label: string; value: string }[];
    position?: [number, number, number];
    color?: string;
    width?: number;
}

export function TechSpecsPanel({
    specs,
    position = [0, 0, 0],
    color = '#FFB81C',
    width = 2,
}: TechSpecsPanelProps) {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            // Slight wave animation
            groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
            // Face camera
            groupRef.current.lookAt(state.camera.position);
        }
    });

    const lineHeight = 0.25;
    const panelHeight = specs.length * lineHeight + 0.4;

    return (
        <group ref={groupRef} position={position}>
            {/* Background panel */}
            <mesh>
                <planeGeometry args={[width, panelHeight]} />
                <meshBasicMaterial
                    color="#000000"
                    transparent
                    opacity={0.7}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Border */}
            <mesh position={[0, 0, 0.001]}>
                <planeGeometry args={[width + 0.02, panelHeight + 0.02]} />
                <meshBasicMaterial
                    color={color}
                    transparent
                    opacity={0.5}
                    wireframe
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Specs list */}
            {specs.map((spec, i) => (
                <group key={i} position={[0, (specs.length / 2 - i - 0.5) * lineHeight, 0.01]}>
                    <Text
                        position={[-width / 2 + 0.1, 0, 0]}
                        fontSize={0.1}
                        color="#FFFFFF"
                        anchorX="left"
                        anchorY="middle"
                    >
                        {spec.label}
                    </Text>
                    <Text
                        position={[width / 2 - 0.1, 0, 0]}
                        fontSize={0.12}
                        color={color}
                        anchorX="right"
                        anchorY="middle"
                        font="/fonts/inter-bold.woff"
                    >
                        {spec.value}
                    </Text>
                </group>
            ))}

            {/* Corner accents */}
            {[
                [-width / 2, panelHeight / 2],
                [width / 2, panelHeight / 2],
                [-width / 2, -panelHeight / 2],
                [width / 2, -panelHeight / 2],
            ].map(([x, y], i) => (
                <mesh key={i} position={[x, y, 0.002]}>
                    <circleGeometry args={[0.03, 8]} />
                    <meshBasicMaterial color={color} />
                </mesh>
            ))}
        </group>
    );
}

// =====================================================
// PRODUCT COMPARISON CARDS (3D Floating)
// =====================================================

interface Product3DCardProps {
    title: string;
    model: string;
    color: string;
    features: string[];
    position?: [number, number, number];
    rotation?: [number, number, number];
    active?: boolean;
}

export function Product3DCard({
    title,
    model,
    color,
    features,
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    active = false,
}: Product3DCardProps) {
    const groupRef = useRef<THREE.Group>(null);
    const glowRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (groupRef.current) {
            // Float animation
            groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.1;

            // Rotate toward camera slightly
            groupRef.current.lookAt(state.camera.position);
        }

        if (glowRef.current && active) {
            const pulse = Math.sin(state.clock.elapsedTime * 3) * 0.3 + 0.7;
            (glowRef.current.material as THREE.MeshBasicMaterial).opacity = pulse * 0.3;
        }
    });

    const cardWidth = 1.5;
    const cardHeight = 2;

    return (
        <group ref={groupRef} position={position} rotation={rotation}>
            {/* Glow (when active) */}
            {active && (
                <mesh ref={glowRef} position={[0, 0, -0.1]}>
                    <planeGeometry args={[cardWidth + 0.2, cardHeight + 0.2]} />
                    <meshBasicMaterial
                        color={color}
                        transparent
                        opacity={0.3}
                        depthWrite={false}
                    />
                </mesh>
            )}

            {/* Card background */}
            <mesh>
                <planeGeometry args={[cardWidth, cardHeight]} />
                <meshBasicMaterial
                    color="#111111"
                    transparent
                    opacity={0.9}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Border */}
            <lineLoop>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={5}
                        array={new Float32Array([
                            -cardWidth / 2, -cardHeight / 2, 0.001,
                            cardWidth / 2, -cardHeight / 2, 0.001,
                            cardWidth / 2, cardHeight / 2, 0.001,
                            -cardWidth / 2, cardHeight / 2, 0.001,
                            -cardWidth / 2, -cardHeight / 2, 0.001,
                        ])}
                        itemSize={3}
                    />
                </bufferGeometry>
                <lineBasicMaterial color={color} />
            </lineLoop>

            {/* Title */}
            <Text
                position={[0, cardHeight / 2 - 0.2, 0.01]}
                fontSize={0.15}
                color={color}
                anchorX="center"
                anchorY="middle"
                font="/fonts/inter-bold.woff"
            >
                {title}
            </Text>

            {/* Model number */}
            <Text
                position={[0, cardHeight / 2 - 0.5, 0.01]}
                fontSize={0.3}
                color="#FFFFFF"
                anchorX="center"
                anchorY="middle"
                font="/fonts/inter-bold.woff"
            >
                {model}
            </Text>

            {/* Features */}
            {features.slice(0, 5).map((feature, i) => (
                <group key={i} position={[0, 0.1 - i * 0.25, 0.01]}>
                    {/* Bullet */}
                    <mesh position={[-cardWidth / 2 + 0.15, 0, 0]}>
                        <circleGeometry args={[0.03, 8]} />
                        <meshBasicMaterial color={color} />
                    </mesh>

                    {/* Feature text */}
                    <Text
                        position={[-cardWidth / 2 + 0.25, 0, 0]}
                        fontSize={0.08}
                        color="#CCCCCC"
                        anchorX="left"
                        anchorY="middle"
                        maxWidth={cardWidth - 0.3}
                    >
                        {feature}
                    </Text>
                </group>
            ))}

            {/* Active indicator */}
            {active && (
                <mesh position={[0, -cardHeight / 2 + 0.15, 0.01]}>
                    <boxGeometry args={[0.8, 0.05, 0.01]} />
                    <meshBasicMaterial color={color} />
                </mesh>
            )}
        </group>
    );
}

// =====================================================
// TIMELINE VISUALIZATION (3D)
// =====================================================

interface Timeline3DProps {
    events: { year: string; title: string }[];
    position?: [number, number, number];
    color?: string;
}

export function Timeline3D({
    events,
    position = [0, 0, 0],
    color = '#FFB81C',
}: Timeline3DProps) {
    const groupRef = useRef<THREE.Group>(null);
    const progressRef = useRef(0);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
        }
        progressRef.current = (Math.sin(state.clock.elapsedTime * 0.3) + 1) / 2;
    });

    const radius = 3;

    return (
        <group ref={groupRef} position={position}>
            {/* Central line */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.02, 0.02, 0.5, 8]} />
                <meshBasicMaterial color={color} />
            </mesh>

            {/* Events around circle */}
            {events.map((event, i) => {
                const angle = (i / events.length) * Math.PI * 2;
                const x = Math.cos(angle) * radius;
                const z = Math.sin(angle) * radius;
                const isActive = Math.floor(progressRef.current * events.length) === i;

                return (
                    <group key={i} position={[x, 0, z]}>
                        {/* Event node */}
                        <mesh>
                            <sphereGeometry args={[isActive ? 0.15 : 0.1, 16, 16]} />
                            <meshStandardMaterial
                                color={color}
                                emissive={color}
                                emissiveIntensity={isActive ? 0.5 : 0.1}
                            />
                        </mesh>

                        {/* Connection line */}
                        <line>
                            <bufferGeometry>
                                <bufferAttribute
                                    attach="attributes-position"
                                    count={2}
                                    array={new Float32Array([0, 0, 0, -x, 0, -z])}
                                    itemSize={3}
                                />
                            </bufferGeometry>
                            <lineBasicMaterial color={color} transparent opacity={0.3} />
                        </line>

                        {/* Year label */}
                        <Text
                            position={[0, 0.3, 0]}
                            fontSize={0.2}
                            color={color}
                            anchorX="center"
                            anchorY="middle"
                            font="/fonts/inter-bold.woff"
                        >
                            {event.year}
                        </Text>

                        {/* Title */}
                        <Text
                            position={[0, -0.3, 0]}
                            fontSize={0.1}
                            color="#FFFFFF"
                            anchorX="center"
                            anchorY="middle"
                            maxWidth={1.5}
                        >
                            {event.title}
                        </Text>
                    </group>
                );
            })}
        </group>
    );
}

// =====================================================
// ROTATING PRODUCT SHOWCASE
// =====================================================

interface RotatingShowcaseProps {
    products: { name: string; color: string }[];
    position?: [number, number, number];
    radius?: number;
}

export function RotatingShowcase({
    products,
    position = [0, 0, 0],
    radius = 3,
}: RotatingShowcaseProps) {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
        }
    });

    return (
        <group ref={groupRef} position={position}>
            {products.map((product, i) => {
                const angle = (i / products.length) * Math.PI * 2;
                const x = Math.cos(angle) * radius;
                const z = Math.sin(angle) * radius;

                return (
                    <group key={i} position={[x, 0, z]}>
                        {/* Simplified machine representation */}
                        <mesh position={[0, 0.4, 0]}>
                            <boxGeometry args={[0.4, 0.8, 0.3]} />
                            <meshStandardMaterial
                                color={product.color}
                                metalness={0.7}
                                roughness={0.3}
                            />
                        </mesh>

                        {/* Base */}
                        <mesh position={[0, -0.1, 0]}>
                            <cylinderGeometry args={[0.3, 0.35, 0.2, 16]} />
                            <meshStandardMaterial color="#333333" metalness={0.5} roughness={0.5} />
                        </mesh>

                        {/* Name label */}
                        <Text
                            position={[0, -0.4, 0]}
                            fontSize={0.15}
                            color={product.color}
                            anchorX="center"
                            anchorY="middle"
                            font="/fonts/inter-bold.woff"
                        >
                            {product.name}
                        </Text>

                        {/* Spotlight effect */}
                        <pointLight position={[0, 2, 0]} intensity={0.5} color={product.color} />
                    </group>
                );
            })}
        </group>
    );
}

// =====================================================
// STAT COUNTER (3D Animated)
// =====================================================

interface StatCounter3DProps {
    value: number;
    label: string;
    suffix?: string;
    color?: string;
    position?: [number, number, number];
}

export function StatCounter3D({
    value,
    label,
    suffix = '',
    color = '#FFB81C',
    position = [0, 0, 0],
}: StatCounter3DProps) {
    const groupRef = useRef<THREE.Group>(null);
    const [displayValue, setDisplayValue] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);

    useFrame((state) => {
        if (groupRef.current) {
            // Check if in view
            const distance = groupRef.current.position.distanceTo(state.camera.position);

            if (distance < 10 && !hasAnimated) {
                setHasAnimated(true);
                // Animate value
                let current = 0;
                const step = value / 60; // 60 frames
                const interval = setInterval(() => {
                    current += step;
                    if (current >= value) {
                        setDisplayValue(value);
                        clearInterval(interval);
                    } else {
                        setDisplayValue(Math.floor(current));
                    }
                }, 16);
            }

            // Float animation
            groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.05;
        }
    });

    return (
        <group ref={groupRef} position={position}>
            {/* Background circle */}
            <mesh>
                <circleGeometry args={[0.8, 32]} />
                <meshBasicMaterial color="#111111" transparent opacity={0.8} />
            </mesh>

            {/* Border ring */}
            <mesh>
                <torusGeometry args={[0.8, 0.02, 8, 32]} />
                <meshBasicMaterial color={color} />
            </mesh>

            {/* Value */}
            <Text
                position={[0, 0.1, 0.01]}
                fontSize={0.35}
                color={color}
                anchorX="center"
                anchorY="middle"
                font="/fonts/inter-bold.woff"
            >
                {displayValue}{suffix}
            </Text>

            {/* Label */}
            <Text
                position={[0, -0.25, 0.01]}
                fontSize={0.1}
                color="#FFFFFF"
                anchorX="center"
                anchorY="middle"
                maxWidth={1.4}
            >
                {label}
            </Text>
        </group>
    );
}
