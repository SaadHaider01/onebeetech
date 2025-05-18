import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, PerspectiveCamera, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { useMouse } from '../../hooks/useMouse';

function TechSphere() {
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useMouse();

  useFrame(() => {
    if (groupRef.current) {
      // Slow rotation
      groupRef.current.rotation.y += 0.002;
      
      // Subtle movement based on mouse position
      const targetX = (mouse.x * 0.3);
      const targetY = (-mouse.y * 0.3);
      
      groupRef.current.rotation.x += (targetY - groupRef.current.rotation.x) * 0.05;
      groupRef.current.rotation.z += (targetX - groupRef.current.rotation.z) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Core */}
      <Sphere args={[1, 32, 32]} position={[0, 0, 0]}>
        <meshPhongMaterial color="#FFB703" emissive="#FFB703" emissiveIntensity={0.2} />
      </Sphere>
      
      {/* Orbiting particles */}
      <group rotation={[Math.PI / 6, 0, 0]}>
        <Particles count={20} radius={2} speed={0.1} size={0.08} color="#FFB703" />
      </group>
      
      <group rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <Particles count={15} radius={2.5} speed={0.05} size={0.1} color="#FB8500" />
      </group>
      
      {/* Rings */}
      <group rotation={[Math.PI / 2, 0, 0]}>
        <Ring radius={1.8} thickness={0.04} color="#FFB703" />
      </group>
      
      <group rotation={[Math.PI / 4, Math.PI / 6, 0]}>
        <Ring radius={2.2} thickness={0.02} color="#FB8500" />
      </group>
    </group>
  );
}

function Ring({ radius, thickness, color }: { radius: number; thickness: number; color: string }) {
  return (
    <mesh>
      <torusGeometry args={[radius, thickness, 16, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0.6} />
    </mesh>
  );
}

function Particles({ count, radius, speed, size, color }: { count: number; radius: number; speed: number; size: number; color: string }) {
  const points = useRef<THREE.Points>(null);
  
  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y += speed * 0.01;
    }
  });
  
  const particlePositions = React.useMemo(() => {
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = (Math.random() - 0.5) * 0.5;
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }
    
    return positions;
  }, [count, radius]);
  
  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particlePositions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color={color} size={size} sizeAttenuation transparent opacity={0.8} />
    </points>
  );
}

const AboutScene: React.FC = () => {
  return (
    <Canvas>
      <color attach="background" args={['#ffffff']} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={45} />
      <TechSphere />
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
    </Canvas>
  );
};

export default AboutScene;