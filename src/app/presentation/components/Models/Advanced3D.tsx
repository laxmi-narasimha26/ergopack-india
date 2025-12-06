'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Center } from '@react-three/drei';
import * as THREE from 'three';

// =====================================================
// 3D TEXT WITH EFFECTS
// =====================================================

interface GlowingTextProps {
    text: string;
    position?: [number, number, number];
    size?: number;
    color?: string;
    glowColor?: string;
    glowIntensity?: number;
}

export function GlowingText({
    text,
    position = [0, 0, 0],
    size = 1,
    color = '#FFFFFF',
    glowColor = '#FFB81C',
    glowIntensity = 0.5,
}: GlowingTextProps) {
    const textRef = useRef<THREE.Mesh>(null);
    const glowRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (glowRef.current) {
            // Pulse glow
            const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.3 + 0.7;
            glowRef.current.material.opacity = glowIntensity * pulse;
        }
    });

    return (
        <group position={position}>
            {/* Glow layer (behind) */}
            <Text
                ref={glowRef}
                fontSize={size * 1.02}
                color={glowColor}
                anchorX="center"
                anchorY="middle"
                font="/fonts/inter-bold.woff"
            >
                {text}
                <meshBasicMaterial
                    color={glowColor}
                    transparent
                    opacity={glowIntensity}
                    depthWrite={false}
                />
            </Text>

            {/* Main text */}
            <Text
                ref={textRef}
                fontSize={size}
                color={color}
                anchorX="center"
                anchorY="middle"
                font="/fonts/inter-bold.woff"
            >
                {text}
                <meshStandardMaterial color={color} metalness={0.3} roughness={0.5} />
            </Text>
        </group>
    );
}

// =====================================================
// ANIMATED STRAPPING SEQUENCE
// =====================================================

interface StrappingSequenceProps {
    position?: [number, number, number];
    palletSize?: [number, number, number];
    strapColor?: string;
    speed?: number;
    active?: boolean;
}

export function StrappingSequence({
    position = [0, 0, 0],
    palletSize = [1.2, 0.8, 1],
    strapColor = '#FFB81C',
    speed = 1,
    active = true,
}: StrappingSequenceProps) {
    const strapRef = useRef<THREE.Group>(null);
    const progressRef = useRef(0);

    // Generate strap path points
    const strapPath = useMemo(() => {
        const [width, height, depth] = palletSize;
        const hw = width / 2;
        const hh = height / 2;
        const hd = depth / 2;

        // Create a rectangular path around the pallet
        const points = [
            new THREE.Vector3(-hw, hh + 0.1, -hd),
            new THREE.Vector3(hw, hh + 0.1, -hd),
            new THREE.Vector3(hw, -hh - 0.1, -hd),
            new THREE.Vector3(hw, -hh - 0.1, hd),
            new THREE.Vector3(hw, hh + 0.1, hd),
            new THREE.Vector3(-hw, hh + 0.1, hd),
            new THREE.Vector3(-hw, -hh - 0.1, hd),
            new THREE.Vector3(-hw, -hh - 0.1, -hd),
            new THREE.Vector3(-hw, hh + 0.1, -hd),
        ];

        return new THREE.CatmullRomCurve3(points, true);
    }, [palletSize]);

    // Create tube geometry based on progress
    const tubeGeometry = useMemo(() => {
        return new THREE.TubeGeometry(strapPath, 100, 0.015, 8, false);
    }, [strapPath]);

    useFrame((state, delta) => {
        if (!active || !strapRef.current) return;

        progressRef.current += delta * speed * 0.3;
        if (progressRef.current > 1) progressRef.current = 0;

        // Update visible portion
        const drawRange = Math.floor(progressRef.current * tubeGeometry.index!.count);
        tubeGeometry.setDrawRange(0, drawRange);
    });

    return (
        <group ref={strapRef} position={position}>
            {/* Strap tube */}
            <mesh geometry={tubeGeometry}>
                <meshStandardMaterial
                    color={strapColor}
                    metalness={0.3}
                    roughness={0.6}
                    emissive={strapColor}
                    emissiveIntensity={0.2}
                />
            </mesh>

            {/* Strap head indicator (glowing point) */}
            <mesh position={strapPath.getPoint(progressRef.current)}>
                <sphereGeometry args={[0.03, 16, 16]} />
                <meshBasicMaterial color="#FFFFFF" />
            </mesh>
        </group>
    );
}

// =====================================================
// DATA VISUALIZATION SPHERE
// =====================================================

interface DataSpheresProps {
    data: { label: string; value: number; color: string }[];
    position?: [number, number, number];
    radius?: number;
}

export function DataSpheres({
    data,
    position = [0, 0, 0],
    radius = 2,
}: DataSpheresProps) {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
        }
    });

    const spherePositions = useMemo(() => {
        return data.map((_, i) => {
            const angle = (i / data.length) * Math.PI * 2;
            const y = Math.sin(angle * 0.5) * radius * 0.3;
            return {
                x: Math.cos(angle) * radius,
                y,
                z: Math.sin(angle) * radius,
            };
        });
    }, [data, radius]);

    return (
        <group ref={groupRef} position={position}>
            {data.map((item, i) => {
                const pos = spherePositions[i];
                const sphereSize = 0.2 + (item.value / 1500) * 0.3; // Size based on value

                return (
                    <group key={i} position={[pos.x, pos.y, pos.z]}>
                        {/* Data sphere */}
                        <mesh>
                            <sphereGeometry args={[sphereSize, 16, 16]} />
                            <meshStandardMaterial
                                color={item.color}
                                metalness={0.7}
                                roughness={0.2}
                                transparent
                                opacity={0.8}
                            />
                        </mesh>

                        {/* Glow */}
                        <mesh scale={1.5}>
                            <sphereGeometry args={[sphereSize, 16, 16]} />
                            <meshBasicMaterial
                                color={item.color}
                                transparent
                                opacity={0.3}
                                depthWrite={false}
                            />
                        </mesh>

                        {/* Connecting line to center */}
                        <Line
                            start={[0, 0, 0]}
                            end={[-pos.x, -pos.y, -pos.z]}
                            color={item.color}
                            lineWidth={1}
                            opacity={0.3}
                        />
                    </group>
                );
            })}

            {/* Central hub */}
            <mesh>
                <icosahedronGeometry args={[0.3, 0]} />
                <meshStandardMaterial
                    color="#FFB81C"
                    metalness={0.9}
                    roughness={0.1}
                    wireframe
                />
            </mesh>
        </group>
    );
}

// =====================================================
// SIMPLE LINE COMPONENT
// =====================================================

interface LineProps {
    start: [number, number, number];
    end: [number, number, number];
    color?: string;
    lineWidth?: number;
    opacity?: number;
}

function Line({
    start,
    end,
    color = '#ffffff',
    lineWidth = 1,
    opacity = 1,
}: LineProps) {
    const geometry = useMemo(() => {
        const geo = new THREE.BufferGeometry();
        const positions = new Float32Array([...start, ...end]);
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        return geo;
    }, [start, end]);

    return (
        <line>
            <primitive object={geometry} attach="geometry" />
            <lineBasicMaterial
                color={color}
                linewidth={lineWidth}
                transparent
                opacity={opacity}
            />
        </line>
    );
}

// =====================================================
// GRID FLOOR
// =====================================================

interface GridFloorProps {
    size?: number;
    divisions?: number;
    color?: string;
    fadeDistance?: number;
}

export function GridFloor({
    size = 50,
    divisions = 50,
    color = '#FFB81C',
    fadeDistance = 25,
}: GridFloorProps) {
    const gridRef = useRef<THREE.GridHelper>(null);

    return (
        <group position={[0, -2.5, 0]}>
            <gridHelper
                ref={gridRef}
                args={[size, divisions, color, color]}
                rotation={[0, 0, 0]}
            >
                <meshBasicMaterial
                    attach="material"
                    color={color}
                    transparent
                    opacity={0.15}
                    depthWrite={false}
                />
            </gridHelper>

            {/* Ground plane for shadows */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[size, size]} />
                <shadowMaterial transparent opacity={0.3} />
            </mesh>
        </group>
    );
}

// =====================================================
// FLOATING SPECS CARD (3D version)
// =====================================================

interface FloatingSpecCardProps {
    title: string;
    value: string;
    unit?: string;
    position?: [number, number, number];
    color?: string;
    delay?: number;
}

export function FloatingSpecCard({
    title,
    value,
    unit = '',
    position = [0, 0, 0],
    color = '#FFB81C',
    delay = 0,
}: FloatingSpecCardProps) {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            // Float animation
            groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + delay) * 0.1;
            // Look at camera
            groupRef.current.lookAt(state.camera.position);
        }
    });

    return (
        <group ref={groupRef} position={position}>
            {/* Background plane */}
            <mesh>
                <planeGeometry args={[1.2, 0.6]} />
                <meshBasicMaterial
                    color="#000000"
                    transparent
                    opacity={0.5}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Border */}
            <mesh position={[0, 0, 0.001]}>
                <planeGeometry args={[1.22, 0.62]} />
                <meshBasicMaterial
                    color={color}
                    transparent
                    opacity={0.3}
                    side={THREE.DoubleSide}
                    wireframe
                />
            </mesh>

            {/* Title */}
            <Text
                position={[0, 0.15, 0.01]}
                fontSize={0.08}
                color="#FFFFFF"
                anchorX="center"
                anchorY="middle"
                maxWidth={1}
            >
                {title}
            </Text>

            {/* Value */}
            <Text
                position={unit ? [-0.1, -0.1, 0.01] : [0, -0.1, 0.01]}
                fontSize={0.2}
                color={color}
                anchorX="center"
                anchorY="middle"
                font="/fonts/inter-bold.woff"
            >
                {value}
            </Text>

            {/* Unit */}
            {unit && (
                <Text
                    position={[0.3, -0.12, 0.01]}
                    fontSize={0.1}
                    color="#FFFFFF"
                    anchorX="center"
                    anchorY="middle"
                >
                    {unit}
                </Text>
            )}
        </group>
    );
}

// =====================================================
// ENERGY BEAM
// =====================================================

interface EnergyBeamProps {
    start?: [number, number, number];
    end?: [number, number, number];
    color?: string;
    width?: number;
    speed?: number;
}

export function EnergyBeam({
    start = [0, 0, 0],
    end = [0, 5, 0],
    color = '#FFB81C',
    width = 0.05,
    speed = 2,
}: EnergyBeamProps) {
    const beamRef = useRef<THREE.Mesh>(null);

    // Calculate beam properties
    const { length, midpoint, rotation } = useMemo(() => {
        const startVec = new THREE.Vector3(...start);
        const endVec = new THREE.Vector3(...end);
        const length = startVec.distanceTo(endVec);
        const midpoint = startVec.clone().add(endVec).multiplyScalar(0.5);

        // Calculate rotation to align cylinder with the line
        const direction = endVec.clone().sub(startVec).normalize();
        const quaternion = new THREE.Quaternion().setFromUnitVectors(
            new THREE.Vector3(0, 1, 0),
            direction
        );
        const euler = new THREE.Euler().setFromQuaternion(quaternion);

        return {
            length,
            midpoint: midpoint.toArray() as [number, number, number],
            rotation: [euler.x, euler.y, euler.z] as [number, number, number],
        };
    }, [start, end]);

    useFrame((state) => {
        if (beamRef.current) {
            // Pulse opacity
            const material = beamRef.current.material as THREE.MeshBasicMaterial;
            const pulse = Math.sin(state.clock.elapsedTime * speed) * 0.3 + 0.7;
            material.opacity = pulse * 0.5;
        }
    });

    return (
        <group>
            {/* Main beam */}
            <mesh ref={beamRef} position={midpoint} rotation={rotation}>
                <cylinderGeometry args={[width, width, length, 8]} />
                <meshBasicMaterial color={color} transparent opacity={0.5} />
            </mesh>

            {/* Glow */}
            <mesh position={midpoint} rotation={rotation}>
                <cylinderGeometry args={[width * 3, width * 3, length, 8]} />
                <meshBasicMaterial
                    color={color}
                    transparent
                    opacity={0.1}
                    depthWrite={false}
                />
            </mesh>

            {/* Start point */}
            <mesh position={start}>
                <sphereGeometry args={[width * 2, 16, 16]} />
                <meshBasicMaterial color={color} />
            </mesh>

            {/* End point */}
            <mesh position={end}>
                <sphereGeometry args={[width * 2, 16, 16]} />
                <meshBasicMaterial color={color} />
            </mesh>
        </group>
    );
}
