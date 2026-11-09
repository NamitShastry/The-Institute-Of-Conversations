"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";

interface SceneProps {
  scrollProgress: number; // 0 to 1
  mouse: { x: number; y: number };
  isDesktop?: boolean;
}

// Flowing Silk Ribbon that behaves like an audio waveform
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
      uColorCream: { value: new THREE.Color("#F3ECE0") },
      uColorPeach: { value: new THREE.Color("#F7B58A") },
      uColorOrange: { value: new THREE.Color("#F26A1B") },
      uColorRust: { value: new THREE.Color("#7A2E12") },
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

      float waveSpeed = uTime * 1.4 + uIndex * 1.8;
      // Fluid audio waveform displacement
      float wave = sin(pos.x * 2.2 + waveSpeed) * 0.22;
      wave += cos(pos.x * 1.4 - waveSpeed * 0.8) * 0.14;
      pos.y += wave;
      pos.z += sin(pos.x * 3.0 + uTime) * 0.15;

      vNormal = normalMatrix * normal;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    uniform vec3 uColorCream;
    uniform vec3 uColorPeach;
    uniform vec3 uColorOrange;
    uniform vec3 uColorRust;
    varying vec2 vUv;
    varying vec3 vNormal;

    void main() {
      // Signature silk gradient interpolation across ribbon width & length
      float t = vUv.x * 0.7 + vUv.y * 0.3;
      vec3 color = mix(uColorCream, uColorPeach, smoothstep(0.0, 0.35, t));
      color = mix(color, uColorOrange, smoothstep(0.35, 0.75, t));
      color = mix(color, uColorRust, smoothstep(0.75, 1.0, t));

      // Specular sheen
      float sheen = pow(max(dot(vNormal, vec3(0.0, 0.7, 0.7)), 0.0), 3.0);
      color += sheen * 0.25;

      gl_FragColor = vec4(color, 0.85);
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
      position={[0, index === 0 ? 0.3 : -0.7, -0.6]}
      rotation={[0, 0, index === 0 ? -0.1 : 0.08]}
    >
      <planeGeometry args={[9, 0.55, 64, 16]} />
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

// Satin Silk Drapes framing the edges and closing on scroll
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
      uColorCream: { value: new THREE.Color("#F3ECE0") },
      uColorPeach: { value: new THREE.Color("#F7B58A") },
      uColorOrange: { value: new THREE.Color("#F26A1B") },
      uColorRust: { value: new THREE.Color("#7A2E12") },
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

      // When scrollProgress 0..0.4: drapes sweep from side edges inward to meet in the middle
      // When scrollProgress 0.4..0.8: drapes part again to reveal About stage
      float meetProgress = smoothstep(0.0, 0.45, uProgress);
      float partProgress = smoothstep(0.45, 0.9, uProgress);

      float sweep = meetProgress * (1.0 - partProgress);

      // Smooth flowing satin folds
      float folds = sin(uv.x * 14.0) * 0.18 * (1.0 - sweep * 0.5);
      pos.z += folds;

      // Lateral motion: start gathered at far sides, meet in center, then part wide
      if (uSide < 0.0) {
        // Left drape
        pos.x += sweep * 2.8 - partProgress * 4.2;
      } else {
        // Right drape
        pos.x -= sweep * 2.8 - partProgress * 4.2;
      }

      vNormal = normalMatrix * normal;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    uniform vec3 uColorCream;
    uniform vec3 uColorPeach;
    uniform vec3 uColorOrange;
    uniform vec3 uColorRust;
    varying vec2 vUv;
    varying vec3 vNormal;

    void main() {
      float light = max(dot(normalize(vNormal), vec3(0.2, 0.6, 0.8)), 0.0);
      vec3 color = mix(uColorRust, uColorOrange, light);
      color = mix(color, uColorPeach, pow(light, 2.0));
      color = mix(color, uColorCream, pow(light, 4.0) * 0.6);

      gl_FragColor = vec4(color, 0.96);
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
      position={[side === "left" ? -4.2 : 4.2, 0, -0.1]}
    >
      <planeGeometry args={[3.8, 7.5, 48, 48]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// 3D Logo Medallion in original colours, floating on the right hero stage
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
    const idleY = Math.sin(t * 1.2) * 0.08;
    const idleRotY = Math.sin(t * 0.7) * 0.1;

    // Desktop: positioned on right side (+1.65); Mobile: centered (0)
    const baseX = isDesktop ? 1.65 : 0;
    const baseY = isDesktop ? 0.05 : -0.2;

    const targetRotX = mouse.y * 0.18;
    const targetRotY = mouse.x * 0.25 + idleRotY;

    // On scroll: recedes in depth as silk drapes gather
    const scale = THREE.MathUtils.lerp(isDesktop ? 1.15 : 0.95, 0.6, scrollProgress * 1.5);
    const posX = THREE.MathUtils.lerp(baseX, isDesktop ? 0.8 : 0, scrollProgress);
    const posY = baseY + idleY;
    const posZ = THREE.MathUtils.lerp(0.2, -1.2, scrollProgress * 1.5);
    const opacity = THREE.MathUtils.lerp(1, 0, Math.min(scrollProgress * 2.2, 1));

    groupRef.current.position.set(posX, posY, posZ);
    groupRef.current.scale.set(scale, scale, scale);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.06);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.06);
  });

  return (
    <group ref={groupRef} position={[isDesktop ? 1.65 : 0, 0.05, 0.2]}>
      {/* Sand pedestal disc behind logo */}
      <mesh position={[0, 0, -0.06]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.38, 1.38, 0.03, 64]} />
        <meshStandardMaterial
          color="#D9C3A5"
          roughness={0.4}
          metalness={0.1}
        />
      </mesh>

      {/* Thin Orange Rim Ring */}
      <mesh position={[0, 0, -0.04]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.32, 1.32, 0.02, 64]} />
        <meshStandardMaterial
          color="#F26A1B"
          roughness={0.3}
          metalness={0.2}
        />
      </mesh>

      {/* Front Face with Emblem Texture (Original Navy & Gold untouched) */}
      <mesh position={[0, 0, 0.02]}>
        <circleGeometry args={[1.26, 64]} />
        <meshBasicMaterial
          map={texture}
          transparent
          toneMapped={false}
        />
      </mesh>

      {/* Warm peach key glow behind medallion */}
      <pointLight
        position={[0, 0, 0.5]}
        color="#F7B58A"
        intensity={1.8}
        distance={3.2}
      />
    </group>
  );
}

// Drifting Marigold Petals Particles
function MarigoldPetals({ count = 35 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, speeds } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 2 + 0.1;
      spd[i] = 0.15 + Math.random() * 0.25;
    }
    return { positions: pos, speeds: spd };
  }, [count]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      posArray[i * 3 + 1] -= speeds[i] * delta;
      // Gentle drift X
      posArray[i * 3] += Math.sin(posArray[i * 3 + 1] * 2.0) * 0.002;
      if (posArray[i * 3 + 1] < -2.6) {
        posArray[i * 3 + 1] = 2.6;
        posArray[i * 3] = (Math.random() - 0.5) * 8;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
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
        size={0.065}
        color="#F26A1B"
        transparent
        opacity={0.8}
      />
    </points>
  );
}

function StudioLighting() {
  return (
    <>
      <ambientLight intensity={0.8} color="#F3ECE0" />
      <directionalLight position={[2, 4, 3]} intensity={1.2} color="#FFF8F0" />
      <directionalLight position={[-3, -1, 2]} intensity={0.5} color="#F7B58A" />
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
      <MarigoldPetals count={isDesktop ? 30 : 15} />
    </Canvas>
  );
};

