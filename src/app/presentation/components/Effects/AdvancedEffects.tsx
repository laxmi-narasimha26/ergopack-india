'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame, extend, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// =====================================================
// HOLOGRAPHIC WIREFRAME OVERLAY
// =====================================================

interface HolographicWireframeProps {
    children: React.ReactNode;
    color?: string;
    opacity?: number;
    animate?: boolean;
}

export function HolographicWireframe({
    children,
    color = '#00ffff',
    opacity = 0.5,
    animate = true,
}: HolographicWireframeProps) {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!animate || !groupRef.current) return;
        // Subtle rotation
        groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    });

    return (
        <group ref={groupRef}>
            {children}
        </group>
    );
}

// =====================================================
// HEXAGON GRID BACKGROUND
// =====================================================

interface HexagonGridProps {
    radius?: number;
    size?: number;
    color?: string;
    position?: [number, number, number];
    rotation?: [number, number, number];
}

export function HexagonGrid({
    radius = 10,
    size = 0.5,
    color = '#FFB81C',
    position = [0, 0, -10],
    rotation = [0, 0, 0],
}: HexagonGridProps) {
    const gridRef = useRef<THREE.Group>(null);

    // Generate hexagon positions
    const hexPositions = useMemo(() => {
        const positions: [number, number][] = [];
        const rows = Math.ceil(radius * 2 / size);
        const cols = Math.ceil(radius * 2 / (size * 0.866));

        for (let row = -rows; row <= rows; row++) {
            for (let col = -cols; col <= cols; col++) {
                const x = col * size * 1.5;
                const y = row * size * 0.866 * 2 + (col % 2 ? size * 0.866 : 0);

                if (Math.sqrt(x * x + y * y) <= radius) {
                    positions.push([x, y]);
                }
            }
        }

        return positions;
    }, [radius, size]);

    // Create hexagon geometry
    const hexGeometry = useMemo(() => {
        const shape = new THREE.Shape();
        const sides = 6;
        const r = size * 0.4;

        for (let i = 0; i <= sides; i++) {
            const angle = (i / sides) * Math.PI * 2 - Math.PI / 2;
            const x = Math.cos(angle) * r;
            const y = Math.sin(angle) * r;

            if (i === 0) {
                shape.moveTo(x, y);
            } else {
                shape.lineTo(x, y);
            }
        }

        return new THREE.ShapeGeometry(shape);
    }, [size]);

    useFrame((state) => {
        if (gridRef.current) {
            // Subtle wave animation
            gridRef.current.children.forEach((hex, i) => {
                const [x, y] = hexPositions[i];
                const wave = Math.sin(state.clock.elapsedTime + x * 0.5 + y * 0.5) * 0.1;
                hex.position.z = wave;
                const mesh = hex as THREE.Mesh;
                if (mesh.material && 'opacity' in mesh.material) {
                    (mesh.material as THREE.MeshBasicMaterial).opacity = 0.2 + wave * 0.3;
                }
            });
        }
    });

    return (
        <group ref={gridRef} position={position} rotation={rotation}>
            {hexPositions.map(([x, y], i) => (
                <mesh key={i} position={[x, y, 0]} geometry={hexGeometry}>
                    <meshBasicMaterial
                        color={color}
                        transparent
                        opacity={0.3}
                        wireframe
                        side={THREE.DoubleSide}
                    />
                </mesh>
            ))}
        </group>
    );
}

// =====================================================
// SCANNING EFFECT
// =====================================================

interface ScanLineEffectProps {
    height?: number;
    width?: number;
    color?: string;
    speed?: number;
    position?: [number, number, number];
}

export function ScanLineEffect({
    height = 5,
    width = 8,
    color = '#00ffff',
    speed = 1,
    position = [0, 0, 0],
}: ScanLineEffectProps) {
    const lineRef = useRef<THREE.Mesh>(null);
    const progressRef = useRef(0);

    useFrame((state, delta) => {
        if (!lineRef.current) return;

        progressRef.current += delta * speed;
        if (progressRef.current > 1) progressRef.current = 0;

        // Move line up and down
        const y = (progressRef.current - 0.5) * height;
        lineRef.current.position.y = position[1] + y;

        // Fade at edges
        const opacity = 1 - Math.abs(progressRef.current - 0.5) * 2;
        (lineRef.current.material as THREE.MeshBasicMaterial).opacity = opacity * 0.8;
    });

    return (
        <group position={position}>
            {/* Scan line */}
            <mesh ref={lineRef}>
                <planeGeometry args={[width, 0.05]} />
                <meshBasicMaterial
                    color={color}
                    transparent
                    opacity={0.8}
                    side={THREE.DoubleSide}
                    depthWrite={false}
                />
            </mesh>

            {/* Scan area indicator */}
            <mesh>
                <planeGeometry args={[width, height]} />
                <meshBasicMaterial
                    color={color}
                    transparent
                    opacity={0.03}
                    side={THREE.DoubleSide}
                    depthWrite={false}
                />
            </mesh>
        </group>
    );
}

// =====================================================
// ORBIT RINGS
// =====================================================

interface OrbitRingsProps {
    count?: number;
    baseRadius?: number;
    color?: string;
    position?: [number, number, number];
}

export function OrbitRings({
    count = 3,
    baseRadius = 2,
    color = '#FFB81C',
    position = [0, 0, 0],
}: OrbitRingsProps) {
    const groupRef = useRef<THREE.Group>(null);
    const orbittersRefs = useRef<THREE.Mesh[]>([]);

    useFrame((state) => {
        if (!groupRef.current) return;

        // Rotate each ring at different speeds
        groupRef.current.children.forEach((ring, i) => {
            ring.rotation.z = state.clock.elapsedTime * (0.2 + i * 0.1);
            ring.rotation.x = Math.sin(state.clock.elapsedTime + i) * 0.2;
        });

        // Animate orbiters
        orbittersRefs.current.forEach((orbiter, i) => {
            if (orbiter) {
                const radius = baseRadius + i * 0.5;
                const speed = 1 + i * 0.3;
                const angle = state.clock.elapsedTime * speed;

                orbiter.position.x = Math.cos(angle) * radius;
                orbiter.position.z = Math.sin(angle) * radius;
            }
        });
    });

    return (
        <group ref={groupRef} position={position}>
            {Array.from({ length: count }).map((_, i) => {
                const radius = baseRadius + i * 0.5;
                return (
                    <group key={i}>
                        {/* Ring */}
                        <mesh rotation={[Math.PI / 2 + i * 0.3, 0, 0]}>
                            <torusGeometry args={[radius, 0.01, 8, 64]} />
                            <meshBasicMaterial
                                color={color}
                                transparent
                                opacity={0.3 - i * 0.05}
                            />
                        </mesh>

                        {/* Orbiting object */}
                        <mesh
                            ref={(el) => { if (el) orbittersRefs.current[i] = el; }}
                            position={[radius, 0, 0]}
                        >
                            <sphereGeometry args={[0.08, 16, 16]} />
                            <meshBasicMaterial color={color} />
                        </mesh>
                    </group>
                );
            })}
        </group>
    );
}

// =====================================================
// DIGITAL RAIN EFFECT (Matrix-style)
// =====================================================

interface DigitalRainProps {
    count?: number;
    width?: number;
    height?: number;
    color?: string;
    speed?: number;
    position?: [number, number, number];
}

export function DigitalRain({
    count = 50,
    width = 10,
    height = 10,
    color = '#00ff00',
    speed = 2,
    position = [0, 0, -5],
}: DigitalRainProps) {
    const groupRef = useRef<THREE.Group>(null);
    const dropsRef = useRef<{ y: number; speed: number; opacity: number }[]>([]);

    // Initialize drops
    useEffect(() => {
        dropsRef.current = Array.from({ length: count }).map(() => ({
            y: Math.random() * height,
            speed: 0.5 + Math.random() * speed,
            opacity: 0.3 + Math.random() * 0.7,
        }));
    }, [count, height, speed]);

    useFrame((state, delta) => {
        if (!groupRef.current) return;

        groupRef.current.children.forEach((drop, i) => {
            if (!dropsRef.current[i]) return;

            dropsRef.current[i].y -= dropsRef.current[i].speed * delta;

            if (dropsRef.current[i].y < -height / 2) {
                dropsRef.current[i].y = height / 2;
                dropsRef.current[i].speed = 0.5 + Math.random() * speed;
            }

            drop.position.y = dropsRef.current[i].y;
            const mesh = drop as THREE.Mesh;
            if (mesh.material && 'opacity' in mesh.material) {
                (mesh.material as THREE.MeshBasicMaterial).opacity = dropsRef.current[i].opacity;
            }
        });
    });

    return (
        <group ref={groupRef} position={position}>
            {Array.from({ length: count }).map((_, i) => {
                const x = (Math.random() - 0.5) * width;
                const z = Math.random() * 2;

                return (
                    <mesh key={i} position={[x, 0, z]}>
                        <boxGeometry args={[0.05, 0.3 + Math.random() * 0.3, 0.01]} />
                        <meshBasicMaterial
                            color={color}
                            transparent
                            opacity={0.5}
                            depthWrite={false}
                        />
                    </mesh>
                );
            })}
        </group>
    );
}

// =====================================================
// PULSING CORE
// =====================================================

interface PulsingCoreProps {
    position?: [number, number, number];
    color?: string;
    size?: number;
    pulseSpeed?: number;
}

export function PulsingCore({
    position = [0, 0, 0],
    color = '#FFB81C',
    size = 0.3,
    pulseSpeed = 2,
}: PulsingCoreProps) {
    const coreRef = useRef<THREE.Mesh>(null);
    const auraRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!coreRef.current || !auraRef.current) return;

        const pulse = Math.sin(state.clock.elapsedTime * pulseSpeed) * 0.3 + 1;

        coreRef.current.scale.setScalar(pulse);
        auraRef.current.scale.setScalar(pulse * 1.5);

        (auraRef.current.material as THREE.MeshBasicMaterial).opacity = 0.3 / pulse;
    });

    return (
        <group position={position}>
            {/* Core */}
            <mesh ref={coreRef}>
                <icosahedronGeometry args={[size, 1]} />
                <meshStandardMaterial
                    color={color}
                    metalness={0.9}
                    roughness={0.1}
                    emissive={color}
                    emissiveIntensity={0.5}
                />
            </mesh>

            {/* Aura */}
            <mesh ref={auraRef}>
                <icosahedronGeometry args={[size * 1.5, 0]} />
                <meshBasicMaterial
                    color={color}
                    transparent
                    opacity={0.2}
                    wireframe
                    depthWrite={false}
                />
            </mesh>

            {/* Outer ring */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[size * 2, 0.01, 8, 32]} />
                <meshBasicMaterial color={color} transparent opacity={0.5} />
            </mesh>
        </group>
    );
}

// =====================================================
// CONNECTING LINES / NEURAL NETWORK
// =====================================================

interface NeuralNetworkProps {
    nodeCount?: number;
    radius?: number;
    color?: string;
    position?: [number, number, number];
}

export function NeuralNetwork({
    nodeCount = 20,
    radius = 3,
    color = '#FFB81C',
    position = [0, 0, 0],
}: NeuralNetworkProps) {
    const groupRef = useRef<THREE.Group>(null);

    // Generate node positions
    const nodes = useMemo(() => {
        return Array.from({ length: nodeCount }).map(() => ({
            x: (Math.random() - 0.5) * radius * 2,
            y: (Math.random() - 0.5) * radius * 2,
            z: (Math.random() - 0.5) * radius * 2,
        }));
    }, [nodeCount, radius]);

    // Generate connections (closest neighbors)
    const connections = useMemo(() => {
        const conns: [number, number][] = [];
        const maxDist = radius * 0.8;

        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const dz = nodes[i].z - nodes[j].z;
                const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

                if (dist < maxDist && Math.random() > 0.5) {
                    conns.push([i, j]);
                }
            }
        }

        return conns;
    }, [nodes, radius]);

    useFrame((state) => {
        if (!groupRef.current) return;
        groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
        groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    });

    return (
        <group ref={groupRef} position={position}>
            {/* Nodes */}
            {nodes.map((node, i) => (
                <mesh key={`node-${i}`} position={[node.x, node.y, node.z]}>
                    <sphereGeometry args={[0.05, 8, 8]} />
                    <meshBasicMaterial color={color} />
                </mesh>
            ))}

            {/* Connections */}
            {connections.map(([i, j], idx) => {
                const start = nodes[i];
                const end = nodes[j];
                const points = [
                    new THREE.Vector3(start.x, start.y, start.z),
                    new THREE.Vector3(end.x, end.y, end.z),
                ];
                const geometry = new THREE.BufferGeometry().setFromPoints(points);

                return (
                    <line key={`conn-${idx}`}>
                        <primitive object={geometry} attach="geometry" />
                        <lineBasicMaterial
                            color={color}
                            transparent
                            opacity={0.3}
                        />
                    </line>
                );
            })}
        </group>
    );
}

// =====================================================
// HOLOGRAPHIC DISPLAY PLANE
// =====================================================

interface HolographicDisplayProps {
    width?: number;
    height?: number;
    color?: string;
    position?: [number, number, number];
    rotation?: [number, number, number];
    children?: React.ReactNode;
}

export function HolographicDisplay({
    width = 2,
    height = 1.5,
    color = '#00ffff',
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    children,
}: HolographicDisplayProps) {
    const groupRef = useRef<THREE.Group>(null);
    const frameRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!frameRef.current) return;

        // Flicker effect
        const flicker = Math.random() > 0.98 ? 0.5 : 1;
        (frameRef.current.material as THREE.MeshBasicMaterial).opacity = 0.1 * flicker;
    });

    return (
        <group ref={groupRef} position={position} rotation={rotation}>
            {/* Frame */}
            <mesh ref={frameRef}>
                <planeGeometry args={[width, height]} />
                <meshBasicMaterial
                    color={color}
                    transparent
                    opacity={0.1}
                    side={THREE.DoubleSide}
                    depthWrite={false}
                />
            </mesh>

            {/* Border */}
            <lineLoop>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={5}
                        array={new Float32Array([
                            -width / 2, -height / 2, 0,
                            width / 2, -height / 2, 0,
                            width / 2, height / 2, 0,
                            -width / 2, height / 2, 0,
                            -width / 2, -height / 2, 0,
                        ])}
                        itemSize={3}
                    />
                </bufferGeometry>
                <lineBasicMaterial color={color} transparent opacity={0.8} />
            </lineLoop>

            {/* Corner decorations */}
            {[
                [-width / 2, -height / 2],
                [width / 2, -height / 2],
                [width / 2, height / 2],
                [-width / 2, height / 2],
            ].map(([x, y], i) => (
                <mesh key={i} position={[x, y, 0]}>
                    <circleGeometry args={[0.05, 8]} />
                    <meshBasicMaterial color={color} />
                </mesh>
            ))}

            {/* Content */}
            <group position={[0, 0, 0.01]}>
                {children}
            </group>
        </group>
    );
}
