'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Holographic shader for futuristic effect
const holographicVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  
  void main() {
    vUv = uv;
    vPosition = position;
    vNormal = normalize(normalMatrix * normal);
    
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewPosition = -mvPosition.xyz;
    
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const holographicFragmentShader = `
  uniform float uTime;
  uniform vec3 uColor;
  uniform float uOpacity;
  uniform float uScanlineSpeed;
  uniform float uScanlineCount;
  uniform float uFresnelPower;
  uniform float uGlitchIntensity;
  
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  
  // Pseudo-random function
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }
  
  void main() {
    // Fresnel effect for edge glow
    vec3 viewDir = normalize(vViewPosition);
    float fresnel = pow(1.0 - abs(dot(viewDir, vNormal)), uFresnelPower);
    
    // Animated scanlines
    float scanline = sin((vUv.y * uScanlineCount) + (uTime * uScanlineSpeed)) * 0.5 + 0.5;
    scanline = pow(scanline, 8.0) * 0.3;
    
    // Horizontal scan bar
    float scanBar = smoothstep(0.0, 0.02, abs(fract(vUv.y - uTime * 0.1) - 0.5));
    scanBar = 1.0 - (1.0 - scanBar) * 0.5;
    
    // Glitch effect
    float glitch = 0.0;
    if (uGlitchIntensity > 0.0) {
      float glitchTime = floor(uTime * 10.0);
      glitch = step(0.95, random(vec2(glitchTime, floor(vUv.y * 20.0)))) * uGlitchIntensity;
    }
    
    // Rainbow iridescence based on view angle
    vec3 rainbow = vec3(
      sin(fresnel * 3.14159 + uTime) * 0.5 + 0.5,
      sin(fresnel * 3.14159 + uTime + 2.094) * 0.5 + 0.5,
      sin(fresnel * 3.14159 + uTime + 4.188) * 0.5 + 0.5
    );
    
    // Combine effects
    vec3 baseColor = uColor;
    vec3 finalColor = mix(baseColor, rainbow, fresnel * 0.3);
    finalColor += scanline * vec3(1.0);
    finalColor *= scanBar;
    finalColor += glitch * vec3(1.0, 0.0, 0.5);
    
    // Edge glow
    float edgeGlow = fresnel * 2.0;
    finalColor += uColor * edgeGlow;
    
    // Alpha with fresnel
    float alpha = uOpacity * (0.3 + fresnel * 0.7);
    
    gl_FragColor = vec4(finalColor, alpha);
  }
`;

interface HolographicMaterialProps {
    color?: string;
    opacity?: number;
    scanlineSpeed?: number;
    scanlineCount?: number;
    fresnelPower?: number;
    glitchIntensity?: number;
}

export function HolographicMaterial({
    color = '#00ffff',
    opacity = 0.8,
    scanlineSpeed = 2.0,
    scanlineCount = 100.0,
    fresnelPower = 2.0,
    glitchIntensity = 0.0,
}: HolographicMaterialProps) {
    const materialRef = useRef<THREE.ShaderMaterial>(null);

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uColor: { value: new THREE.Color(color) },
            uOpacity: { value: opacity },
            uScanlineSpeed: { value: scanlineSpeed },
            uScanlineCount: { value: scanlineCount },
            uFresnelPower: { value: fresnelPower },
            uGlitchIntensity: { value: glitchIntensity },
        }),
        [color, opacity, scanlineSpeed, scanlineCount, fresnelPower, glitchIntensity]
    );

    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
        }
    });

    return (
        <shaderMaterial
            ref={materialRef}
            vertexShader={holographicVertexShader}
            fragmentShader={holographicFragmentShader}
            uniforms={uniforms}
            transparent
            side={THREE.DoubleSide}
            depthWrite={false}
        />
    );
}

// Energy flow shader for strapping chain
const energyVertexShader = `
  varying vec2 vUv;
  varying float vProgress;
  
  attribute float progress;
  
  void main() {
    vUv = uv;
    vProgress = progress;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const energyFragmentShader = `
  uniform float uTime;
  uniform vec3 uColor;
  uniform float uSpeed;
  uniform float uPulseWidth;
  
  varying vec2 vUv;
  varying float vProgress;
  
  void main() {
    // Animated energy pulse along UV.x
    float pulse = fract(vUv.x - uTime * uSpeed);
    pulse = smoothstep(0.0, uPulseWidth, pulse) * smoothstep(uPulseWidth * 2.0, uPulseWidth, pulse);
    
    // Add glow
    vec3 color = uColor * (1.0 + pulse * 2.0);
    float alpha = 0.5 + pulse * 0.5;
    
    gl_FragColor = vec4(color, alpha);
  }
`;

interface EnergyMaterialProps {
    color?: string;
    speed?: number;
    pulseWidth?: number;
}

export function EnergyMaterial({
    color = '#FFB81C',
    speed = 0.5,
    pulseWidth = 0.1,
}: EnergyMaterialProps) {
    const materialRef = useRef<THREE.ShaderMaterial>(null);

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uColor: { value: new THREE.Color(color) },
            uSpeed: { value: speed },
            uPulseWidth: { value: pulseWidth },
        }),
        [color, speed, pulseWidth]
    );

    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
        }
    });

    return (
        <shaderMaterial
            ref={materialRef}
            vertexShader={energyVertexShader}
            fragmentShader={energyFragmentShader}
            uniforms={uniforms}
            transparent
            side={THREE.DoubleSide}
        />
    );
}

// Dissolve shader for materialize effect
const dissolveVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  
  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const dissolveFragmentShader = `
  uniform float uTime;
  uniform float uProgress;
  uniform vec3 uColor;
  uniform vec3 uEdgeColor;
  uniform float uEdgeWidth;
  
  varying vec2 vUv;
  varying vec3 vPosition;
  
  // 3D Noise function
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  
  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }
  
  void main() {
    // Noise-based dissolve pattern
    float noise = snoise(vPosition * 3.0 + uTime * 0.5) * 0.5 + 0.5;
    
    // Progress controls dissolve
    float dissolve = smoothstep(uProgress - uEdgeWidth, uProgress, noise);
    float edge = smoothstep(uProgress - uEdgeWidth, uProgress - uEdgeWidth * 0.5, noise) 
               - smoothstep(uProgress - uEdgeWidth * 0.5, uProgress, noise);
    
    // Discard dissolved fragments
    if (dissolve < 0.01) discard;
    
    // Mix colors
    vec3 finalColor = mix(uColor, uEdgeColor, edge * 2.0);
    
    gl_FragColor = vec4(finalColor, dissolve);
  }
`;

interface DissolveMaterialProps {
    color?: string;
    edgeColor?: string;
    progress?: number;
    edgeWidth?: number;
}

export function DissolveMaterial({
    color = '#ffffff',
    edgeColor = '#FFB81C',
    progress = 1.0,
    edgeWidth = 0.1,
}: DissolveMaterialProps) {
    const materialRef = useRef<THREE.ShaderMaterial>(null);

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uProgress: { value: progress },
            uColor: { value: new THREE.Color(color) },
            uEdgeColor: { value: new THREE.Color(edgeColor) },
            uEdgeWidth: { value: edgeWidth },
        }),
        [color, edgeColor, progress, edgeWidth]
    );

    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
            materialRef.current.uniforms.uProgress.value = progress;
        }
    });

    return (
        <shaderMaterial
            ref={materialRef}
            vertexShader={dissolveVertexShader}
            fragmentShader={dissolveFragmentShader}
            uniforms={uniforms}
            transparent
            side={THREE.DoubleSide}
        />
    );
}

export { holographicVertexShader, holographicFragmentShader };
