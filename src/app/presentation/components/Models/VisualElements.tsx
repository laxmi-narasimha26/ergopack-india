'use client';

import { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

// =====================================================
// HOLOGRAPHIC PRODUCT LABEL
// =====================================================

interface HolographicLabelProps {
    text: string;
    subText?: string;
    position?: [number, number, number];
    color?: string;
    scale?: number;
}

export function HolographicLabel({
    text,
    subText,
    position = [0, 0, 0],
    color = '#FFB81C',
    scale = 1,
}: HolographicLabelProps) {
    const groupRef = useRef<THREE.Group>(null);
    const lineRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (groupRef.current) {
            // Face camera
            groupRef.current.lookAt(state.camera.position);

            // Pulse effect on line
            if (lineRef.current) {
                const pulse = Math.sin(state.clock.elapsedTime * 3) * 0.2 + 0.8;
                (lineRef.current.material as THREE.MeshBasicMaterial).opacity = pulse;
            }
        }
    });

    return (
        <group ref={groupRef} position={position} scale={scale}>
            {/* Connection line */}
            <mesh ref={lineRef} position={[-0.8, -0.5, 0]}>
                <planeGeometry args={[0.02, 1]} />
                <meshBasicMaterial color={color} transparent opacity={0.8} />
            </mesh>

            {/* Label background */}
            <mesh position={[0, 0, -0.01]}>
                <planeGeometry args={[1.6, 0.5]} />
                <meshBasicMaterial color="#000000" transparent opacity={0.7} />
            </mesh>

            {/* Border */}
            <lineLoop>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={5}
                        array={new Float32Array([
                            -0.8, -0.25, 0, 0.8, -0.25, 0, 0.8, 0.25, 0, -0.8, 0.25, 0, -0.8, -0.25, 0
                        ])}
                        itemSize={3}
                    />
                </bufferGeometry>
                <lineBasicMaterial color={color} />
            </lineLoop>

            {/* Main text */}
            <Text
                position={[0, subText ? 0.05 : 0, 0.01]}
                fontSize={0.15}
                color={color}
                anchorX="center"
                anchorY="middle"
                font="/fonts/inter-bold.woff"
            >
                {text}
            </Text>

            {/* Sub text */}
            {subText && (
                <Text
                    position={[0, -0.1, 0.01]}
                    fontSize={0.08}
                    color="#FFFFFF"
                    anchorX="center"
                    anchorY="middle"
                >
                    {subText}
                </Text>
            )}

            {/* Corner accents */}
            {[[-0.8, 0.25], [0.8, 0.25], [0.8, -0.25], [-0.8, -0.25]].map(([x, y], i) => (
                <mesh key={i} position={[x, y, 0.01]}>
                    <circleGeometry args={[0.02, 8]} />
                    <meshBasicMaterial color={color} />
                </mesh>
            ))}
        </group>
    );
}

// =====================================================
// EXPLODED VIEW CONTROLLER
// =====================================================

interface ExplodedViewProps {
    children: React.ReactNode;
    exploded: boolean;
    spread?: number;
}

export function ExplodedViewContainer({
    children,
    exploded,
    spread = 1.5,
}: ExplodedViewProps) {
    const groupRef = useRef<THREE.Group>(null);

    useFrame(() => {
        if (!groupRef.current) return;

        groupRef.current.children.forEach((child, i) => {
            const targetY = exploded ? (i - groupRef.current!.children.length / 2) * spread : 0;
            child.position.y = THREE.MathUtils.lerp(child.position.y, targetY, 0.05);
        });
    });

    return <group ref={groupRef}>{children}</group>;
}

// =====================================================
// GLOWING SPECIFICATION LINE
// =====================================================

interface SpecLineProps {
    start: [number, number, number];
    end: [number, number, number];
    label: string;
    value: string;
    color?: string;
}

export function SpecLine({
    start,
    end,
    label,
    value,
    color = '#FFB81C',
}: SpecLineProps) {
    const lineRef = useRef<THREE.Line>(null);
    const labelGroupRef = useRef<THREE.Group>(null);

    const geometry = useMemo(() => {
        const points = [
            new THREE.Vector3(...start),
            new THREE.Vector3(...end),
        ];
        return new THREE.BufferGeometry().setFromPoints(points);
    }, [start, end]);

    useFrame((state) => {
        if (labelGroupRef.current) {
            labelGroupRef.current.lookAt(state.camera.position);
        }
    });

    return (
        <group>
            {/* Line */}
            <line ref={lineRef}>
                <primitive object={geometry} attach="geometry" />
                <lineBasicMaterial color={color} transparent opacity={0.6} />
            </line>

            {/* Start point */}
            <mesh position={start}>
                <sphereGeometry args={[0.03, 8, 8]} />
                <meshBasicMaterial color={color} />
            </mesh>

            {/* End point with label */}
            <group ref={labelGroupRef} position={end}>
                <mesh>
                    <sphereGeometry args={[0.05, 16, 16]} />
                    <meshBasicMaterial color={color} />
                </mesh>

                {/* Label */}
                <mesh position={[0.4, 0, 0]}>
                    <planeGeometry args={[0.7, 0.25]} />
                    <meshBasicMaterial color="#000000" transparent opacity={0.8} />
                </mesh>

                <Text
                    position={[0.4, 0.04, 0.01]}
                    fontSize={0.06}
                    color="#FFFFFF"
                    anchorX="center"
                    anchorY="middle"
                >
                    {label}
                </Text>

                <Text
                    position={[0.4, -0.04, 0.01]}
                    fontSize={0.08}
                    color={color}
                    anchorX="center"
                    anchorY="middle"
                    font="/fonts/inter-bold.woff"
                >
                    {value}
                </Text>
            </group>
        </group>
    );
}

// =====================================================
// ANIMATED MEASUREMENT ARROWS
// =====================================================

interface MeasurementArrowProps {
    start: [number, number, number];
    end: [number, number, number];
    value: string;
    unit?: string;
    color?: string;
}

export function MeasurementArrow({
    start,
    end,
    value,
    unit = 'mm',
    color = '#00ffff',
}: MeasurementArrowProps) {
    const groupRef = useRef<THREE.Group>(null);

    const midpoint = useMemo(() => {
        return [
            (start[0] + end[0]) / 2,
            (start[1] + end[1]) / 2,
            (start[2] + end[2]) / 2,
        ] as [number, number, number];
    }, [start, end]);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.lookAt(state.camera.position);
        }
    });

    return (
        <group>
            {/* Line */}
            <line>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={2}
                        array={new Float32Array([...start, ...end])}
                        itemSize={3}
                    />
                </bufferGeometry>
                <lineBasicMaterial color={color} />
            </line>

            {/* Arrow heads */}
            <mesh position={start}>
                <coneGeometry args={[0.03, 0.06, 8]} />
                <meshBasicMaterial color={color} />
            </mesh>

            <mesh position={end} rotation={[0, 0, Math.PI]}>
                <coneGeometry args={[0.03, 0.06, 8]} />
                <meshBasicMaterial color={color} />
            </mesh>

            {/* Value label */}
            <group ref={groupRef} position={midpoint}>
                <mesh>
                    <planeGeometry args={[0.5, 0.2]} />
                    <meshBasicMaterial color="#000000" transparent opacity={0.8} />
                </mesh>

                <Text
                    position={[0, 0, 0.01]}
                    fontSize={0.1}
                    color={color}
                    anchorX="center"
                    anchorY="middle"
                    font="/fonts/inter-bold.woff"
                >
                    {value} {unit}
                </Text>
            </group>
        </group>
    );
}

// =====================================================
// ROTATING PRODUCT PLATFORM
// =====================================================

interface RotatingPlatformProps {
    children: React.ReactNode;
    radius?: number;
    height?: number;
    color?: string;
    speed?: number;
}

export function RotatingPlatform({
    children,
    radius = 1.5,
    height = 0.1,
    color = '#FFB81C',
    speed = 0.2,
}: RotatingPlatformProps) {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.elapsedTime * speed;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Platform */}
            <mesh position={[0, -height / 2, 0]}>
                <cylinderGeometry args={[radius, radius * 1.1, height, 32]} />
                <meshStandardMaterial
                    color="#111111"
                    metalness={0.9}
                    roughness={0.3}
                />
            </mesh>

            {/* Ring */}
            <mesh position={[0, 0, 0]}>
                <torusGeometry args={[radius * 0.95, 0.02, 8, 64]} />
                <meshBasicMaterial color={color} />
            </mesh>

            {/* Grid pattern */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
                <circleGeometry args={[radius * 0.9, 32]} />
                <meshBasicMaterial
                    color={color}
                    transparent
                    opacity={0.1}
                    wireframe
                />
            </mesh>

            {/* Children (product) */}
            {children}
        </group>
    );
}

// =====================================================
// SPOTLIGHT CONE
// =====================================================

interface SpotlightConeProps {
    position?: [number, number, number];
    targetPosition?: [number, number, number];
    color?: string;
    angle?: number;
    intensity?: number;
}

export function SpotlightCone({
    position = [0, 5, 0],
    targetPosition = [0, 0, 0],
    color = '#FFFFFF',
    angle = 0.5,
    intensity = 1,
}: SpotlightConeProps) {
    const coneRef = useRef<THREE.Mesh>(null);

    const coneHeight = useMemo(() => {
        const dy = position[1] - targetPosition[1];
        return dy;
    }, [position, targetPosition]);

    useFrame((state) => {
        if (coneRef.current) {
            const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.1 + 0.9;
            (coneRef.current.material as THREE.MeshBasicMaterial).opacity = 0.1 * intensity * pulse;
        }
    });

    return (
        <group position={position}>
            {/* Light source */}
            <spotLight
                position={[0, 0, 0]}
                target-position={targetPosition}
                angle={angle}
                penumbra={0.5}
                intensity={intensity}
                color={color}
            />

            {/* Visible cone */}
            <mesh ref={coneRef} position={[0, -coneHeight / 2, 0]}>
                <coneGeometry args={[Math.tan(angle) * coneHeight, coneHeight, 32, 1, true]} />
                <meshBasicMaterial
                    color={color}
                    transparent
                    opacity={0.1}
                    side={THREE.DoubleSide}
                    depthWrite={false}
                />
            </mesh>
        </group>
    );
}

// =====================================================
// INFO HOTSPOT
// =====================================================

interface InfoHotspotProps {
    position: [number, number, number];
    label: string;
    description: string;
    color?: string;
}

export function InfoHotspot({
    position,
    label,
    description,
    color = '#FFB81C',
}: InfoHotspotProps) {
    const [isHovered, setIsHovered] = useState(false);
    const groupRef = useRef<THREE.Group>(null);
    const pulseRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.lookAt(state.camera.position);
        }

        if (pulseRef.current) {
            const pulse = Math.sin(state.clock.elapsedTime * 3) * 0.3 + 1;
            pulseRef.current.scale.setScalar(pulse);
            (pulseRef.current.material as THREE.MeshBasicMaterial).opacity = 0.5 / pulse;
        }
    });

    return (
        <group
            ref={groupRef}
            position={position}
            onPointerEnter={() => setIsHovered(true)}
            onPointerLeave={() => setIsHovered(false)}
        >
            {/* Main dot */}
            <mesh>
                <sphereGeometry args={[0.08, 16, 16]} />
                <meshBasicMaterial color={color} />
            </mesh>

            {/* Pulse ring */}
            <mesh ref={pulseRef}>
                <sphereGeometry args={[0.12, 16, 16]} />
                <meshBasicMaterial
                    color={color}
                    transparent
                    opacity={0.5}
                    depthWrite={false}
                />
            </mesh>

            {/* Info panel (shown on hover) */}
            {isHovered && (
                <group position={[0.8, 0, 0]}>
                    <mesh>
                        <planeGeometry args={[1.2, 0.6]} />
                        <meshBasicMaterial color="#000000" transparent opacity={0.9} />
                    </mesh>

                    <Text
                        position={[0, 0.15, 0.01]}
                        fontSize={0.1}
                        color={color}
                        anchorX="center"
                        anchorY="middle"
                        font="/fonts/inter-bold.woff"
                    >
                        {label}
                    </Text>

                    <Text
                        position={[0, -0.05, 0.01]}
                        fontSize={0.06}
                        color="#FFFFFF"
                        anchorX="center"
                        anchorY="middle"
                        maxWidth={1}
                    >
                        {description}
                    </Text>
                </group>
            )}
        </group>
    );
}

// =====================================================
// AMBIENT DUST PARTICLES
// =====================================================

interface AmbientDustProps {
    count?: number;
    volume?: [number, number, number];
    color?: string;
    speed?: number;
}

export function AmbientDust({
    count = 100,
    volume = [10, 10, 10],
    color = '#FFFFFF',
    speed = 0.01,
}: AmbientDustProps) {
    const pointsRef = useRef<THREE.Points>(null);

    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * volume[0];
            pos[i * 3 + 1] = (Math.random() - 0.5) * volume[1];
            pos[i * 3 + 2] = (Math.random() - 0.5) * volume[2];
        }
        return pos;
    }, [count, volume]);

    useFrame((state, delta) => {
        if (!pointsRef.current) return;

        const positionAttribute = pointsRef.current.geometry.attributes.position;
        const array = positionAttribute.array as Float32Array;

        for (let i = 0; i < count; i++) {
            // Slow upward drift
            array[i * 3 + 1] += speed * delta * 60;

            // Reset when too high
            if (array[i * 3 + 1] > volume[1] / 2) {
                array[i * 3 + 1] = -volume[1] / 2;
            }

            // Gentle horizontal wobble
            array[i * 3] += Math.sin(state.clock.elapsedTime + i) * 0.001;
        }

        positionAttribute.needsUpdate = true;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                color={color}
                size={0.02}
                transparent
                opacity={0.3}
                sizeAttenuation
                depthWrite={false}
            />
        </points>
    );
}

// =====================================================
// CAMERA PATH VISUALIZATION (for debug)
// =====================================================

interface CameraPathDebugProps {
    points: [number, number, number][];
    color?: string;
    visible?: boolean;
}

export function CameraPathDebug({
    points,
    color = '#FF0000',
    visible = false,
}: CameraPathDebugProps) {
    if (!visible) return null;

    const curve = useMemo(() => {
        const vec3Points = points.map(p => new THREE.Vector3(...p));
        return new THREE.CatmullRomCurve3(vec3Points, false);
    }, [points]);

    const geometry = useMemo(() => {
        const curvePoints = curve.getPoints(100);
        return new THREE.BufferGeometry().setFromPoints(curvePoints);
    }, [curve]);

    return (
        <group>
            {/* Path line */}
            <line>
                <primitive object={geometry} attach="geometry" />
                <lineBasicMaterial color={color} transparent opacity={0.5} />
            </line>

            {/* Control points */}
            {points.map((point, i) => (
                <mesh key={i} position={point}>
                    <sphereGeometry args={[0.1, 8, 8]} />
                    <meshBasicMaterial color={color} />
                </mesh>
            ))}
        </group>
    );
}
