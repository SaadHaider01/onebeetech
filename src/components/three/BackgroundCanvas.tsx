import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useMouse } from '../../hooks/useMouse';

function Particles({ count, mouse }: { count: number; mouse: { x: number; y: number } }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const { viewport } = useThree();
  
  const dummy = useRef(new THREE.Object3D());
  const particles = useRef<{ position: THREE.Vector3; velocity: THREE.Vector3; acceleration: THREE.Vector3; size: number }[]>([]);
  
  useEffect(() => {
    if (!mesh.current) return;
    
    particles.current = Array.from({ length: count }, () => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * viewport.width * 2,
        (Math.random() - 0.5) * viewport.height * 2,
        (Math.random() - 0.5) * 10
      ),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02
      ),
      acceleration: new THREE.Vector3(0, 0, 0),
      size: Math.random() * 0.3 + 0.2 // Smaller particles
    }));
    
    particles.current.forEach((particle, i) => {
      const { position, size } = particle;
      dummy.current.position.set(position.x, position.y, position.z);
      dummy.current.scale.set(size, size, size);
      dummy.current.updateMatrix();
      mesh.current?.setMatrixAt(i, dummy.current.matrix);
    });
    
    mesh.current.instanceMatrix.needsUpdate = true;
  }, [count, viewport]);
  
  useFrame(() => {
    if (!mesh.current) return;
    
    particles.current.forEach((particle, i) => {
      // Random movement instead of lines
      particle.velocity.x += (Math.random() - 0.5) * 0.001;
      particle.velocity.y += (Math.random() - 0.5) * 0.001;
      particle.velocity.z += (Math.random() - 0.5) * 0.001;
      
      // Add slight mouse attraction
      const mouseInfluence = new THREE.Vector3(
        (mouse.x * viewport.width / 2 - particle.position.x) * 0.00005,
        (-mouse.y * viewport.height / 2 - particle.position.y) * 0.00005,
        0
      );
      
      particle.acceleration.copy(mouseInfluence);
      particle.velocity.add(particle.acceleration);
      particle.velocity.multiplyScalar(0.99); // Add some damping
      particle.position.add(particle.velocity);
      
      // Wrap around edges with random offset
      if (particle.position.x < -viewport.width) particle.position.x = viewport.width + Math.random();
      if (particle.position.x > viewport.width) particle.position.x = -viewport.width - Math.random();
      if (particle.position.y < -viewport.height) particle.position.y = viewport.height + Math.random();
      if (particle.position.y > viewport.height) particle.position.y = -viewport.height - Math.random();
      
      dummy.current.position.copy(particle.position);
      dummy.current.scale.set(particle.size, particle.size, particle.size);
      dummy.current.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.current.matrix);
    });
    
    mesh.current.instanceMatrix.needsUpdate = true;
  });
  
  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <circleGeometry args={[0.15, 16]} />
      <meshBasicMaterial color="#FFB703" transparent opacity={0.4} />
    </instancedMesh>
  );
}

function Scene() {
  const mouse = useMouse();
  
  return (
    <>
      <ambientLight intensity={0.5} />
      <Particles count={150} mouse={mouse} />
      <EffectComposer>
        <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} />
      </EffectComposer>
    </>
  );
}

const BackgroundCanvas: React.FC = () => {
  return (
    <div className="canvas-container">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 10], fov: 50 }}>
        <color attach="background" args={['#023047']} />
        <Scene />
      </Canvas>
    </div>
  );
};

export default BackgroundCanvas;