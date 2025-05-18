import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { useMouse } from '../../hooks/useMouse';

function FloatingShapes() {
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useMouse();
  
  useFrame(() => {
    if (groupRef.current) {
      const targetRotationY = mouse.x * 0.2;
      const targetRotationX = -mouse.y * 0.2;
      
      groupRef.current.rotation.y += (targetRotationY - groupRef.current.rotation.y) * 0.05;
      groupRef.current.rotation.x += (targetRotationX - groupRef.current.rotation.x) * 0.05;
    }
  });
  
  return (
    <group ref={groupRef}>
      <mesh position={[-2, 0, 0]} rotation={[Math.PI / 6, 0, 0]}>
        <octahedronGeometry args={[1]} />
        <meshPhongMaterial color="#FFB703" specular="#ffffff" shininess={50} />
      </mesh>
      
      <mesh position={[2, 0, 0]} rotation={[0, Math.PI / 4, 0]}>
        <dodecahedronGeometry args={[0.8]} />
        <meshPhongMaterial color="#FB8500" specular="#ffffff" shininess={50} />
      </mesh>
      
      <mesh position={[0, 1.5, 0]}>
        <icosahedronGeometry args={[0.6]} />
        <meshPhongMaterial color="#FFB703" specular="#ffffff" shininess={50} />
      </mesh>
    </group>
  );
}

const WhyUsScene: React.FC = () => {
  return (
    <Canvas>
      <color attach="background" args={['#ffffff']} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={45} />
      <FloatingShapes />
    </Canvas>
  );
};

export default WhyUsScene;