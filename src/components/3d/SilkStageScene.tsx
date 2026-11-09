"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";

interface SceneProps {
  scrollProgress: number; // 0 to 1
  mouse: { x: number; y: number };
  isDesktop?: boolean;
}

// Flowing Silk Ribbon waveform in Revision 3 burnt orange palette
function SilkRibbon({
  index,
  scrollProgress,
}: {
  index: number;
  scrollProgress: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uIndex: { value: index },
      uColorSheen: { value: new THREE.Color("#F3EEE3") },
      uColorHighlight: { value: new THREE.Color("#F2A57F") },
      uColorMid: { value: new THREE.Color("#D9541E") },
      uColorShadow: { value: new THREE.Color("#7A2A0E") },
    }),
    [index]
  );

  const vertexShader = `
    uniform float uTime;
    uniform float uIndex;
    varying vec2 vUv;
    varying vec3 vNormal;

    void main() {
      vUv = uv;
      vec3 pos = position;

      float waveSpeed = uTime * 1.2 + uIndex * 1.5;
      float wave = sin(pos.x * 2.0 + waveSpeed) * 0.18;
      wave += cos(pos.x * 1.2 - waveSpeed * 0.7) * 0.12;
      pos.y += wave;
      pos.z += sin(pos.x * 2.8 + uTime) * 0.12;

      vNormal = normalMatrix * normal;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    uniform vec3 uColorSheen;
    uniform vec3 uColorHighlight;
    uniform vec3 uColorMid;
    uniform vec3 uColorShadow;
    varying vec2 vUv;
    varying vec3 vNormal;

    void main() {
      float t = vUv.x * 0.65 + vUv.y * 0.35;
      vec3 color = mix(uColorSheen, uColorHighlight, smoothstep(0.0, 0.35, t));
      color = mix(color, uColorMid, smoothstep(0.35, 0.75, t));
      color = mix(color, uColorShadow, smoothstep(0.75, 1.0, t));

      float sheen = pow(max(dot(vNormal, vec3(0.0, 0.7, 0.7)), 0.0), 3.0);
      color += sheen * 0.2;

      gl_FragColor = vec4(color, 0.35);
    }
  `;

  useFrame((state) => {
    if (meshRef.current) {
      uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={[0, index === 0 ? 0.25 : -0.65, -1.2]}
      rotation={[0, 0, index === 0 ? -0.06 : 0.05]}
    >
      <planeGeometry args={[9, 0.5, 64, 16]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        side={THREE.DoubleSide}
        transparent
      />
    </mesh>
  );
}

// Satin Silk Drapes framing the edges and sweeping inward on scroll (Revision 3)
function SilkDrape({
  side,
  scrollProgress,
}: {
  side: "left" | "right";
  scrollProgress: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      uProgress: { value: 0 },
      uSide: { value: side === "left" ? -1.0 : 1.0 },
      uColorSheen: { value: new THREE.Color("#F3EEE3") },
      uColorHighlight: { value: new THREE.Color("#F2A57F") },
      uColorMid: { value: new THREE.Color("#D9541E") },
      uColorShadow: { value: new THREE.Color("#7A2A0E") },
    }),
    [side]
  );

  const vertexShader = `
    uniform float uProgress;
    uniform float uSide;
    varying vec2 vUv;
    varying vec3 vNormal;

    void main() {
      vUv = uv;
      vec3 pos = position;

      // 0..0.45: drapes sweep from far off-screen inward to meet
      // 0.45..0.9: drapes part to reveal About section
      float meetProgress = smoothstep(0.02, 0.45, uProgress);
      float partProgress = smoothstep(0.45, 0.9, uProgress);
      float sweep = meetProgress * (1.0 - partProgress);

      float folds = sin(uv.x * 12.0) * 0.16 * (1.0 - sweep * 0.5);
      pos.z += folds;

      if (uSide < 0.0) {
        // Start completely off-screen at -5.6, sweep in to meet, then part to -6.0
        pos.x += sweep * 4.2 - partProgress * 3.5;
      } else {
        // Start completely off-screen at +5.6, sweep in to meet, then part to +6.0
        pos.x -= sweep * 4.2 - partProgress * 3.5;
      }

      vNormal = normalMatrix * normal;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    uniform vec3 uColorSheen;
    uniform vec3 uColorHighlight;
    uniform vec3 uColorMid;
    uniform vec3 uColorShadow;
    varying vec2 vUv;
    varying vec3 vNormal;

    void main() {
      float light = max(dot(normalize(vNormal), vec3(0.2, 0.6, 0.8)), 0.0);
      vec3 color = mix(uColorShadow, uColorMid, light);
      color = mix(color, uColorHighlight, pow(light, 2.0));
      color = mix(color, uColorSheen, pow(light, 4.0) * 0.5);

      gl_FragColor = vec4(color, 0.98);
    }
  `;

  useFrame(() => {
    if (meshRef.current) {
      uniforms.uProgress.value = scrollProgress;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={[side === "left" ? -5.6 : 5.6, 0, -0.1]}
    >
      <planeGeometry args={[4.2, 7.5, 48, 48]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// 3D Logo Medallion in original colours, floating over the right hero panel
function FloatingLogoMedallion({
  scrollProgress,
  mouse,
  isDesktop = true,
}: {
  scrollProgress: number;
  mouse: { x: number; y: number };
  isDesktop?: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const texture = useTexture("/assets/ioc-logo-transparent.png");

  useFrame((state) => {
    if (!groupRef.current) return;

    const t = state.clock.getElapsedTime();
    const idleY = Math.sin(t * 1.0) * 0.03;
    const idleRotY = Math.sin(t * 0.6) * 0.05;

    // Desktop: centered over right visual panel (+1.52); Mobile: lower center (+0.55 below text)
    const baseX = isDesktop ? 1.52 : 0;
    const baseY = isDesktop ? 0.02 : -0.55;

    const targetRotX = mouse.y * 0.08;
    const targetRotY = mouse.x * 0.12 + idleRotY;

    // On scroll: recedes in depth as satin drapes close
    const scale = THREE.MathUtils.lerp(isDesktop ? 1.0 : 0.65, 0.45, scrollProgress * 1.5);
    const posX = THREE.MathUtils.lerp(baseX, isDesktop ? 0.8 : 0, scrollProgress);
    const posY = baseY + idleY;
    const posZ = THREE.MathUtils.lerp(0.2, -1.2, scrollProgress * 1.5);

    groupRef.current.position.set(posX, posY, posZ);
    groupRef.current.scale.set(scale, scale, scale);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.05);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.05);
  });

  return (
    <group ref={groupRef} position={[isDesktop ? 1.52 : 0, isDesktop ? 0.02 : -0.55, 0.2]}>
      {/* Paper/Cream pedestal backing disc behind logo */}
      <mesh position={[0, 0, -0.04]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.56, 0.56, 0.02, 64]} />
        <meshStandardMaterial
          color="#EAE3D3"
          roughness={0.4}
          metalness={0.08}
        />
      </mesh>

      {/* Thin Orange Rim Ring */}
      <mesh position={[0, 0, -0.02]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.53, 0.53, 0.015, 64]} />
        <meshStandardMaterial
          color="#D9541E"
          roughness={0.3}
          metalness={0.15}
        />
      </mesh>

      {/* Front Face with Emblem Texture (Original Navy & Gold untouched, ≈40% panel height) */}
      <mesh position={[0, 0, 0.01]}>
        <circleGeometry args={[0.50, 64]} />
        <meshBasicMaterial
          map={texture}
          transparent
          toneMapped={false}
        />
      </mesh>

      {/* Soft key glow behind medallion */}
      <pointLight
        position={[0, 0, 0.3]}
        color="#F2A57F"
        intensity={0.9}
        distance={2.2}
      />
    </group>
  );
}

function StudioLighting() {
  return (
    <>
      <ambientLight intensity={0.9} color="#F3EEE3" />
      <directionalLight position={[2, 4, 3]} intensity={1.1} color="#FFF8F0" />
      <directionalLight position={[-3, -1, 2]} intensity={0.4} color="#F2A57F" />
    </>
  );
}

export const SilkStageScene: React.FC<SceneProps> = ({
  scrollProgress,
  mouse,
  isDesktop = true,
}) => {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 4.6], fov: 46 }}
      gl={{ antialias: true, alpha: true }}
      className="w-full h-full pointer-events-none"
    >
      <StudioLighting />
      <SilkRibbon index={0} scrollProgress={scrollProgress} />
      <SilkRibbon index={1} scrollProgress={scrollProgress} />
      <SilkDrape side="left" scrollProgress={scrollProgress} />
      <SilkDrape side="right" scrollProgress={scrollProgress} />
      <FloatingLogoMedallion
        scrollProgress={scrollProgress}
        mouse={mouse}
        isDesktop={isDesktop}
      />
    </Canvas>
  );
};
