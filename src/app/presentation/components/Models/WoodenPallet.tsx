'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTexture } from '@react-three/drei';

// =====================================================
// PROCEDURAL WOODEN PALLET (REALISTIC)
// =====================================================

interface WoodenPalletProps {
    position?: [number, number, number];
    scale?: number;
    strapped?: boolean;
    strapProgress?: number;
}

export function WoodenPallet({
    position = [0, 0, 0],
    scale = 1,
    strapped = false,
    strapProgress = 0,
}: WoodenPalletProps) {
    const groupRef = useRef<THREE.Group>(null);
    const strapRef = useRef<THREE.Mesh>(null);

    // Pallet Dimensions (Standard Euro Pallet: 1200x800x144mm)
    // Normalized to approx 1.2 x 0.8 x 0.144 in Scene Units
    const length = 1.2;
    const width = 0.8;
    const height = 0.144;

    // Wood Material (Procedural fallback)
    const woodMaterial = useMemo(() => {
        return new THREE.MeshStandardMaterial({
            color: '#d2b48c', // Tan/Wood color
            roughness: 0.9,
            metalness: 0.0,
            map: null // Ideally we'd load a texture here, but using color for procedural
        });
    }, []);

    const blockMaterial = useMemo(() => {
        return new THREE.MeshStandardMaterial({
            color: '#8b5a2b', // Darker compressed wood block
            roughness: 1.0,
        });
    }, []);

    // Animate Strap Visibility
    useFrame(() => {
        if (strapRef.current) {
            if (strapped) {
                // Calculate visible length based on progress (wrapping around)
                const circumference = (width + height) * 2;
                const currentLen = circumference * strapProgress;
                // Simple visual hack: scale the torus/tube or unhide segments
                // For now, simpler: opacity fade in final position if strapped
                (strapRef.current.material as THREE.MeshStandardMaterial).opacity = strapProgress > 0.9 ? 1 : 0;
            } else {
                (strapRef.current.material as THREE.MeshStandardMaterial).opacity = 0;
            }
        }
    });

    return (
        <group ref={groupRef} position={position} scale={scale}>
            {/* --- Top Deck Boards (Lengthwise) --- */}
            {[0, 1, 2, 3, 4].map((i) => {
                // 5 boards, distributed across width
                // Outer boards are wider (0.145m), inner are narrower (0.100m)
                const boardWidth = (i === 0 || i === 4) ? 0.145 : 0.100;
                const zPos = (i - 2) * (width / 4);
                return (
                    <mesh key={`top-${i}`} position={[0, height / 2 - 0.011, zPos]} castShadow receiveShadow>
                        <boxGeometry args={[length, 0.022, boardWidth]} />
                        <primitive object={woodMaterial} attach="material" />
                    </mesh>
                );
            })}

            {/* --- Stringer Boards (Crosswise) --- */}
            {[-0.5, 0, 0.5].map((pos, i) => (
                <mesh key={`stringer-${i}`} position={[pos * (length - 0.145), height / 2 - 0.022 - 0.011, 0]} castShadow receiveShadow>
                    <boxGeometry args={[0.145, 0.022, width]} />
                    <primitive object={woodMaterial} attach="material" />
                </mesh>
            ))}

            {/* --- Blocks (9 blocks) --- */}
            {[-0.5, 0, 0.5].map((xPos, xi) =>
                [-0.5, 0, 0.5].map((zPos, zi) => (
                    <mesh key={`block-${xi}-${zi}`} position={[xPos * (length - 0.145), 0, zPos * (width - 0.145)]} castShadow receiveShadow>
                        <boxGeometry args={[0.145, 0.078, 0.145]} />
                        <primitive object={blockMaterial} attach="material" />
                    </mesh>
                ))
            )}

            {/* --- Bottom Deck Boards (Lengthwise) --- */}
            {/* 3 Skids */}
            {[-0.5, 0, 0.5].map((zPos, i) => (
                <mesh key={`bottom-${i}`} position={[0, -height / 2 + 0.011, zPos * (width - 0.145)]} castShadow receiveShadow>
                    <boxGeometry args={[length, 0.022, 0.145]} />
                    <primitive object={woodMaterial} attach="material" />
                </mesh>
            ))}

            {/* --- Finished Strap (Visual Only) --- */}
            {/* Appears after strapping cycle is complete */}
            <mesh ref={strapRef} position={[0, height / 2 + 0.002, 0]}>
                <boxGeometry args={[0.015, 0.002, width + 0.1]} /> {/* Simplified strap on top */}
                <meshStandardMaterial color="#000000" roughness={0.5} transparent opacity={0} />
            </mesh>

        </group>
    );
}

// =====================================================
// PRELOAD
// =====================================================
// We could useTexture.preload here if we had textures
