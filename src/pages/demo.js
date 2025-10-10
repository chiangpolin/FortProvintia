import { useRef, Suspense, memo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  Environment,
  OrbitControls,
  useProgress,
  Html,
  useGLTF,
} from '@react-three/drei';
import * as THREE from 'three';
import '../app/globals.css';
import './demo.css';

// ------------------------
// Loader (optimized)
// ------------------------
const LoaderComponent = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className='loader'>
        <p>Loading {progress.toFixed(0)} %</p>
      </div>
    </Html>
  );
};

const Loader = memo(LoaderComponent);

// ------------------------
// Reusable GLTF Model Loader
// ------------------------
function Model({ path, scale = 1, position = [0, 0, 0] }) {
  const { scene } = useGLTF(path);
  return <primitive object={scene} scale={scale} position={position} />;
}

function Boat({ path, scale = 1, position = [0, 0, 0] }) {
  const { scene } = useGLTF(path);
  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.position.y =
        -2 + Math.sin(clock.getElapsedTime() - 0.3) * 0.8;
    }
  });

  return (
    <primitive ref={ref} object={scene} scale={scale} position={position} />
  );
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
      <boxGeometry args={[350, 195, 20, 1, 1, 1]} />
      <meshStandardMaterial color='#003366' metalness={0.1} roughness={0.3} />
    </mesh>
  );
}

function CameraController({
  targetPosition,
  flyIn,
  setFlyIn,
  moving,
  setMoving,
}) {
  const { camera } = useThree();
  const controlsRef = useRef();
  const targetRef = useRef(new THREE.Object3D());
  const startPosition = new THREE.Vector3(-120, 12, 80);

  useFrame(() => {
    if (flyIn) return;

    camera.position.lerp(startPosition, 0.02);
    camera.lookAt(targetRef.current.position);

    if (camera.position.distanceTo(startPosition) < 0.05) {
      setFlyIn(true);
    }
  });

  useFrame(() => {
    if (!controlsRef.current) return;

    if (moving) {
      camera.position.lerp(targetPosition, 0.05);
      controlsRef.current.target.lerp(new THREE.Vector3(0, 0, 0), 0.05);
      controlsRef.current.update();

      if (camera.position.distanceTo(targetPosition) < 0.05) {
        setMoving(false);
      }
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan
      enableZoom
      enableRotate
      maxPolarAngle={Math.PI / 2}
      minPolarAngle={0}
    />
  );
}

// ------------------------
// Main Page
// ------------------------
export default function ModelsPage() {
  const models = ['/models/fort_4.glb', '/models/land_2.glb'];
  const boats = [
    '/models/boat.glb',
    '/models/boat_2.glb',
    '/models/boat_3.glb',
    '/models/boat_4.glb',
  ];
  const cameraViews = [
    { label: 'View 1', position: new THREE.Vector3(-120, 12, 80) },
    { label: 'View 2', position: new THREE.Vector3(-20, 6, 80) },
    { label: 'View 3', position: new THREE.Vector3(100, 8, -160) },
  ];

  const [targetPosition, setTargetPosition] = useState(cameraViews[0].position);
  const [flyIn, setFlyIn] = useState(false);
  const [moving, setMoving] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = (pos) => {
    setTargetPosition(pos);
    setMoving(true);
  };

  const handleInteraction = () => {
    setFlyIn(true);
    setMoving(false);
  };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas
        shadows
        camera={{ position: [-60, 8, -80], fov: 50 }}
        style={{
          width: '100vw',
          height: '100vh',
          display: 'block',
          margin: 0,
          padding: 0,
          background: 'black',
        }}
        onPointerDown={handleInteraction}
        onWheel={handleInteraction}
      >
        {/* Lights */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />

        {/* Models and Forest */}
        <Suspense fallback={<Loader />}>
          <Environment files='/models/qwantani_4k.hdr' background />
          <group rotation={[0, Math.PI / 2, 0]}>
            <Sea boats={boats} />
            {boats.map((path, i) => (
              <Boat key={i} path={path} scale={1} position={[0, -2, 0]} />
            ))}
            {models.map((path, i) => (
              <Model key={i} path={path} scale={1} position={[0, 0, 0]} />
            ))}
          </group>
        </Suspense>

        {/* Camera Control */}
        <CameraController
          targetPosition={targetPosition}
          flyIn={flyIn}
          setFlyIn={setFlyIn}
          moving={moving}
          setMoving={setMoving}
        />
        {/* <CameraIntro /> */}
      </Canvas>

      {/* Buttons UI */}
      <div className='absolute bottom-10 w-full flex justify-center gap-4'>
        {cameraViews.map((view, idx) => (
          <button
            key={idx}
            onClick={() => handleButtonClick(view.position)}
            className='px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-600 transition'
          >
            {view.label}
          </button>
        ))}
        <button
          onClick={() => setIsOpen(true)}
          className='px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition'
        >
          Photo
        </button>
      </div>

      {/* === Modal === */}
      {isOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-black/70 z-50'>
          <div className='bg-white rounded-3xl overflow-hidden shadow-2xl w-full h-full max-w-xl max-h-[90vh] mx-4 relative'>
            {/* Image */}
            <div className='w-full flex justify-center'>
              <img
                className='h-[500px] sm:h-[600px] object-cover'
                src='/static/snapshot_01.png'
              />
            </div>
            {/* Button */}
            <div className='p-4 flex justify-center'>
              <button
                onClick={() => setIsOpen(false)}
                className='px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition'
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
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
