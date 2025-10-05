import { Canvas, useFrame } from '@react-three/fiber';
import {
  Environment,
  OrbitControls,
  useProgress,
  Html,
  useGLTF,
} from '@react-three/drei';
import { useRef, Suspense, memo, useMemo } from 'react';
import './demo.css';

// ------------------------
// Loader (optimized)
// ------------------------
const Loader = memo(() => {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className='loader'>
        <p>Loading {progress.toFixed(0)} %</p>
      </div>
    </Html>
  );
});

// ------------------------
// Reusable GLTF Model Loader
// ------------------------
function Model({ path, scale = 1, position = [0, 0, 0] }) {
  const { scene } = useGLTF(path);
  return <primitive object={scene} scale={scale} position={position} />;
}

// ------------------------
// Ocean Cube (animated)
// ------------------------
function Sea() {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.position.y = -14 + Math.sin(clock.getElapsedTime()) * 0.8;
    }
  });

  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[-60, 0, -20]}>
      <boxGeometry args={[360, 199, 20, 1, 1, 1]} />
      <meshStandardMaterial color='#003366' metalness={0.1} roughness={0.3} />
    </mesh>
  );
}

// ------------------------
// Low-Poly Tree
// ------------------------
function LowPolyTree({ position, scale = 1 }) {
  // Slightly vary the leaf color per tree
  const leafColor = `hsl(${Math.random() * 30 + 100}, 70%, 20%)`;

  return (
    <group position={position} scale={[scale, scale, scale]}>
      {/* Trunk */}
      <mesh>
        <cylinderGeometry args={[0.3, 0.4, 2, 6]} />
        <meshStandardMaterial color='#8B5A2B' flatShading />
      </mesh>
      {/* Round Leaves */}
      <mesh position={[0, 1.5, 0]}>
        <icosahedronGeometry args={[1.5, 0]} />
        <meshStandardMaterial color={leafColor} flatShading />
      </mesh>
    </group>
  );
}

// ------------------------
// Forest
// ------------------------
function Forest({ count = 100, areaSize = 200 }) {
  const trees = useMemo(() => {
    return new Array(count).fill().map(() => ({
      position: [
        (Math.random() - 0.5) * areaSize * 0.4 + 80, // X offset
        1,
        (Math.random() - 0.5) * areaSize * 0.8 - 20, // Z offset
      ],
      scale: 0.8 + Math.random() * 1.6, // Random tree scale 0.8~2.4
    }));
  }, [count, areaSize]);

  return (
    <>
      {trees.map((tree, i) => (
        <LowPolyTree key={i} position={tree.position} scale={tree.scale} />
      ))}
    </>
  );
}

// ------------------------
// Main Page
// ------------------------
export default function ModelsPage() {
  const models = [
    '/models/fort_4.glb',
    '/models/land_2.glb',
    '/models/boat.glb',
    '/models/boat_2.glb',
    '/models/boat_3.glb',
    '/models/boat_4.glb',
  ];

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas
        shadows
        camera={{ position: [-120, 12, 80], fov: 50 }}
        style={{
          width: '100vw',
          height: '100vh',
          display: 'block',
          margin: 0,
          padding: 0,
          background: 'black',
        }}
      >
        {/* Lights */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />

        {/* Models and Forest */}
        <Suspense fallback={<Loader />}>
          <Environment files='/models/qwantani_4k.hdr' background />
          <group rotation={[0, Math.PI / 2, 0]}>
            <Sea />
            {models.map((path, i) => (
              <Model key={i} path={path} scale={1} position={[0, 0, 0]} />
            ))}
            <Forest count={30} areaSize={200} />
          </group>
        </Suspense>

        {/* Controls */}
        <OrbitControls
          enablePan
          enableZoom
          enableDamping
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={0}
          target={[40, 0, -10]}
        />
      </Canvas>
    </div>
  );
}

// ------------------------
// Preload models for speed
// ------------------------
useGLTF.preload('/models/fort_4.glb');
useGLTF.preload('/models/land_2.glb');
useGLTF.preload('/models/boat.glb');
useGLTF.preload('/models/boat_2.glb');
useGLTF.preload('/models/boat_3.glb');
useGLTF.preload('/models/boat_4.glb');
