import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function Globe() {
  const meshRef = useRef<THREE.Mesh>(null);
  const pointsRef = useRef<THREE.Points>(null);

  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.15;
    if (pointsRef.current) pointsRef.current.rotation.y += delta * 0.15;
  });

  const pointsGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions: number[] = [];
    for (let i = 0; i < 2000; i++) {
      const phi = Math.acos(-1 + (2 * i) / 2000);
      const theta = Math.sqrt(2000 * Math.PI) * phi;
      const r = 1.52;
      positions.push(
        r * Math.cos(theta) * Math.sin(phi),
        r * Math.sin(theta) * Math.sin(phi),
        r * Math.cos(phi)
      );
    }
    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, []);

  return (
    <group>
      <Sphere ref={meshRef} args={[1.5, 64, 64]}>
        <meshStandardMaterial
          color="#1a6b52"
          transparent
          opacity={0.15}
          wireframe
        />
      </Sphere>
      <points ref={pointsRef} geometry={pointsGeometry}>
        <pointsMaterial color="#2dd4a8" size={0.015} transparent opacity={0.6} />
      </points>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 3, 5]} intensity={0.8} />
    </group>
  );
}

export default function GlobeScene() {
  return (
    <div className="w-full h-64 md:h-72 rounded-xl overflow-hidden gradient-hero relative">
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
        <Globe />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
      <div className="absolute inset-0 flex items-center justify-start p-6 md:p-8 pointer-events-none">
        <div>
          <h2 className="text-xl md:text-2xl font-heading font-bold text-primary-foreground">Environmental Intelligence</h2>
          <p className="text-sm text-primary-foreground/70 mt-1 max-w-xs">
            Real-time monitoring of your environmental report operations
          </p>
        </div>
      </div>
    </div>
  );
}
