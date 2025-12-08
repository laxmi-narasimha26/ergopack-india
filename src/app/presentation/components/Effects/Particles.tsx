'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
    count?: number;
    size?: number;
    color?: string;
    spread?: number;
    speed?: number;
    opacity?: number;
}

export function ParticleField({
    count = 2000,
    size = 0.02,
    color = '#FFB81C',
    spread = 20,
    speed = 0.1,
    opacity = 0.6,
}: ParticleFieldProps) {
    const pointsRef = useRef<THREE.Points>(null);
    const particlesRef = useRef<Float32Array | null>(null);

    const { positions, velocities, colors } = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const velocities = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        const colorObj = new THREE.Color(color);

        for (let i = 0; i < count; i++) {
            // Random initial positions
            positions[i * 3] = (Math.random() - 0.5) * spread;
            positions[i * 3 + 1] = (Math.random() - 0.5) * spread;
            positions[i * 3 + 2] = (Math.random() - 0.5) * spread;

            // Random velocities
            velocities[i * 3] = (Math.random() - 0.5) * speed;
            velocities[i * 3 + 1] = (Math.random() - 0.5) * speed;
            velocities[i * 3 + 2] = (Math.random() - 0.5) * speed;

            // Colors with slight variation
            colors[i * 3] = colorObj.r * (0.8 + Math.random() * 0.4);
            colors[i * 3 + 1] = colorObj.g * (0.8 + Math.random() * 0.4);
            colors[i * 3 + 2] = colorObj.b * (0.8 + Math.random() * 0.4);
        }

        return { positions, velocities, colors };
    }, [count, spread, speed, color]);

    useEffect(() => {
        particlesRef.current = positions.slice();
    }, [positions]);

    useFrame((state, delta) => {
        if (!pointsRef.current || !particlesRef.current) return;

        const positionAttribute = pointsRef.current.geometry.attributes.position;
        const posArray = positionAttribute.array as Float32Array;

        for (let i = 0; i < count; i++) {
            // Update positions with velocity
            posArray[i * 3] += velocities[i * 3] * delta * 60;
            posArray[i * 3 + 1] += velocities[i * 3 + 1] * delta * 60;
            posArray[i * 3 + 2] += velocities[i * 3 + 2] * delta * 60;

            // Wrap around boundaries
            const halfSpread = spread / 2;
            if (Math.abs(posArray[i * 3]) > halfSpread) posArray[i * 3] *= -0.9;
            if (Math.abs(posArray[i * 3 + 1]) > halfSpread) posArray[i * 3 + 1] *= -0.9;
            if (Math.abs(posArray[i * 3 + 2]) > halfSpread) posArray[i * 3 + 2] *= -0.9;

            // Add subtle wave motion
            posArray[i * 3 + 1] += Math.sin(state.clock.elapsedTime + i * 0.01) * 0.001;
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
                <bufferAttribute
                    attach="attributes-color"
                    count={count}
                    array={colors}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={size}
                vertexColors
                transparent
                opacity={opacity}
                sizeAttenuation
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

// Converging particles for dramatic effect
interface ConvergingParticlesProps {
    count?: number;
    targetPosition?: [number, number, number];
    color?: string;
    active?: boolean;
}

export function ConvergingParticles({
    count = 500,
    targetPosition = [0, 0, 0],
    color = '#C8102E',
    active = true,
}: ConvergingParticlesProps) {
    const pointsRef = useRef<THREE.Points>(null);
    const progressRef = useRef<Float32Array | null>(null);

    const { positions, initialPositions, colors } = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const initialPositions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        const colorObj = new THREE.Color(color);

        for (let i = 0; i < count; i++) {
            // Random sphere distribution
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const radius = 15 + Math.random() * 10;

            const x = radius * Math.sin(phi) * Math.cos(theta);
            const y = radius * Math.sin(phi) * Math.sin(theta);
            const z = radius * Math.cos(phi);

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            initialPositions[i * 3] = x;
            initialPositions[i * 3 + 1] = y;
            initialPositions[i * 3 + 2] = z;

            colors[i * 3] = colorObj.r;
            colors[i * 3 + 1] = colorObj.g;
            colors[i * 3 + 2] = colorObj.b;
        }

        return { positions, initialPositions, colors };
    }, [count, color]);

    useEffect(() => {
        progressRef.current = new Float32Array(count).fill(0);
    }, [count]);

    useFrame((state, delta) => {
        if (!pointsRef.current || !progressRef.current || !active) return;

        const positionAttribute = pointsRef.current.geometry.attributes.position;
        const posArray = positionAttribute.array as Float32Array;

        for (let i = 0; i < count; i++) {
            // Staggered progress
            const staggerDelay = i / count * 2;
            progressRef.current[i] = Math.min(1, progressRef.current[i] + delta * 0.3);

            const progress = Math.max(0, progressRef.current[i] - staggerDelay);
            const eased = 1 - Math.pow(1 - progress, 3); // Ease out cubic

            // Interpolate to target
            posArray[i * 3] = THREE.MathUtils.lerp(initialPositions[i * 3], targetPosition[0], eased);
            posArray[i * 3 + 1] = THREE.MathUtils.lerp(initialPositions[i * 3 + 1], targetPosition[1], eased);
            posArray[i * 3 + 2] = THREE.MathUtils.lerp(initialPositions[i * 3 + 2], targetPosition[2], eased);

            // Reset if reached target
            if (eased >= 0.99) {
                progressRef.current[i] = 0;
            }
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
                <bufferAttribute
                    attach="attributes-color"
                    count={count}
                    array={colors}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                vertexColors
                transparent
                opacity={0.8}
                sizeAttenuation
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

// Energy Ring that pulses
interface EnergyRingProps {
    radius?: number;
    color?: string;
    position?: [number, number, number];
    rotationSpeed?: number;
    pulseSpeed?: number;
}

export function EnergyRing({
    radius = 2,
    color = '#FFB81C',
    position = [0, 0, 0],
    rotationSpeed = 1,
    pulseSpeed = 2,
}: EnergyRingProps) {
    const ringRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<THREE.MeshBasicMaterial>(null);

    useFrame((state) => {
        if (ringRef.current) {
            ringRef.current.rotation.z = state.clock.elapsedTime * rotationSpeed;

            // Pulse effect
            const pulse = Math.sin(state.clock.elapsedTime * pulseSpeed) * 0.5 + 0.5;
            ringRef.current.scale.setScalar(1 + pulse * 0.1);

            if (materialRef.current) {
                materialRef.current.opacity = 0.3 + pulse * 0.4;
            }
        }
    });

    return (
        <mesh ref={ringRef} position={position}>
            <torusGeometry args={[radius, 0.02, 16, 100]} />
            <meshBasicMaterial
                ref={materialRef}
                color={color}
                transparent
                opacity={0.5}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
}

// Multiple concentric energy rings
interface EnergyRingsProps {
    count?: number;
    baseRadius?: number;
    color?: string;
    position?: [number, number, number];
}

export function EnergyRings({
    count = 5,
    baseRadius = 1.5,
    color = '#FFB81C',
    position = [0, 0, 0],
}: EnergyRingsProps) {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
            groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
        }
    });

    return (
        <group ref={groupRef} position={position}>
            {Array.from({ length: count }).map((_, i) => (
                <EnergyRing
                    key={i}
                    radius={baseRadius + i * 0.4}
                    color={color}
                    rotationSpeed={0.5 + i * 0.2}
                    pulseSpeed={1 + i * 0.3}
                />
            ))}
        </group>
    );
}

// Floating orbs that surround a product
interface FloatingOrbsProps {
    count?: number;
    radius?: number;
    orbSize?: number;
    color?: string;
    position?: [number, number, number];
}

export function FloatingOrbs({
    count = 8,
    radius = 2,
    orbSize = 0.1,
    color = '#FFB81C',
    position = [0, 0, 0],
}: FloatingOrbsProps) {
    const groupRef = useRef<THREE.Group>(null);
    const orbRefs = useRef<THREE.Mesh[]>([]);

    const orbPositions = useMemo(() => {
        return Array.from({ length: count }).map((_, i) => {
            const angle = (i / count) * Math.PI * 2;
            return {
                x: Math.cos(angle) * radius,
                y: Math.sin(angle) * radius,
                z: 0,
                phase: i * 0.5,
            };
        });
    }, [count, radius]);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
        }

        orbRefs.current.forEach((orb, i) => {
            if (orb) {
                const { phase } = orbPositions[i];
                // Floating motion
                orb.position.y = orbPositions[i].y + Math.sin(state.clock.elapsedTime * 2 + phase) * 0.2;
                // Scale pulse
                const scale = 1 + Math.sin(state.clock.elapsedTime * 3 + phase) * 0.2;
                orb.scale.setScalar(scale);
            }
        });
    });

    return (
        <group ref={groupRef} position={position}>
            {orbPositions.map((pos, i) => (
                <mesh
                    key={i}
                    ref={(el) => { if (el) orbRefs.current[i] = el; }}
                    position={[pos.x, pos.y, pos.z]}
                >
                    <sphereGeometry args={[orbSize, 16, 16]} />
                    <meshBasicMaterial color={color} transparent opacity={0.8} />
                </mesh>
            ))}
        </group>
    );
}
