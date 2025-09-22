'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, useGLTF } from '@react-three/drei';

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <VideoSection />
      <RenderSection />
      <HistorySection />
      <CreationProcessSection />
      <FooterAuthor />
    </div>
  );
}

function Navbar() {
  return (
    <nav className='absolute top-0 left-0 w-full z-20 bg-transparent px-8 py-4 flex justify-between items-center'>
      <div className='text-white text-2xl font-bold'></div>
      <ul className='flex space-x-6 text-white text-lg'>
        <li>
          <Link href='/' className='hover:underline'>
            Home
          </Link>
        </li>
        <li>
          <Link href='/#about' className='hover:underline'>
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
}

function Hero() {
  return (
    <section className='relative h-screen w-full'>
      {/* Background image */}
      <Image
        src='/static/cover_01_1280x720.jpg'
        alt='Hero background'
        fill
        priority
        className='object-cover'
      />

      {/* Overlay for readability */}
      <div className='absolute inset-0 bg-black/20' />

      {/* Content */}
      <div className='relative flex h-full items-center pl-12 md:pl-24'>
        <div className='text-white max-w-xl'>
          <h1 className='text-2xl md:text-4xl font-bold mb-6'>
            Fort Provintia, 1653
          </h1>
          <p className='text-lg md:text-xl mb-8'>
            A Dutch stronghold at the heart of Tainan’s history.
          </p>
          <button className='px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-2xl shadow-lg transition'>
            <a
              href='https://www.youtube.com/watch?v=e_rLiD7bTkY'
              target='_blank'
              rel='noopener noreferrer'
            >
              Get Started
            </a>
          </button>
        </div>
      </div>
    </section>
  );
}

const Model = (props) => {
  const { path } = props;
  const gltf = useGLTF(path);
  return <primitive object={gltf.scene} scale={1} position={[0.75, 0, 4]} />;
};

function VideoSection() {
  return (
    <section className='py-20 bg-black'>
      <div className='max-w-4xl mx-auto px-6 text-center'>
        <h2 className='text-3xl md:text-4xl font-bold mb-6 text-white'>
          Explore the Story
        </h2>
        <p className='text-gray-300 mb-8'>
          Dive into history and discover how this iconic landmark shaped
          Taiwan’s past.
        </p>

        {/* Responsive iframe */}
        <div className='flex justify-center'>
          <iframe
            className='w-full sm:w-4/5 md:w-3/4 lg:w-2/3 aspect-video shadow-lg'
            src='https://www.youtube.com/embed/e_rLiD7bTkY?si=1FUpmv7i1nmj_u1Q&rel=0&modestbranding=1&controls=1'
            title='YouTube video player'
            frameBorder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            referrerPolicy='strict-origin-when-cross-origin'
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}

function RenderSection() {
  const renders = [
    '/static/photo_01.png',
    '/static/photo_02.png',
    '/static/photo_03.png',
    '/static/photo_04.png',
    '/static/photo_05.png',
  ];

  // Array of small rotation angles for a natural “tilted photo” look
  const rotations = ['-3', '2', '-2', '3', '-1'];

  return (
    <section className='py-20 bg-gray-50' id='about'>
      <div className='max-w-6xl mx-auto px-6 text-center'>
        <h2 className='text-3xl md:text-4xl font-bold mb-12 text-black'>
          Around the Tower
        </h2>
        <p className='text-gray-600 mb-16'>
          Explore Fort Provintia from every angle, revealing a new perspective,
          uncovering hidden details, and bringing the tower’s layered history to
          life.
        </p>

        <div className='flex flex-wrap justify-center gap-8'>
          {renders.map((src, idx) => (
            <div
              key={idx}
              className={`w-48 h-48 rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 rotate-${rotations[idx]} transition`}
            >
              <Image
                src={src}
                alt={`Render ${idx + 1}`}
                width={192}
                height={192}
                className='object-cover w-full h-full'
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HistorySection() {
  const items = [
    {
      id: 'canvas1',
      era: 'Dutch Formosa (1624 – 1662)',
      name: 'Fort Provintia, 1653',
      text: 'Built by the Dutch East India Company, Fort Provintia became a key trading and military hub in Tainan.',
      path: '/static/provintia_1.gltf',
    },
    {
      id: 'canvas2',
      era: 'Qing Dynasty Taiwan (1683 – 1895)',
      name: 'Chhiah Khàm Lâu',
      text: 'A landmark reflecting Tainan’s evolution during the Qing Dynasty, when Taiwan became fully integrated into the empire.',
      path: '/static/provintia_2.gltf',
    },
    {
      id: 'canvas3',
      era: 'Modern Taiwan',
      name: 'Chihkan Tower',
      text: 'Now a vibrant cultural landmark, this historic site brings Taiwan’s layered history to life through its architecture, exhibitions, and the stories preserved within its walls.',
      path: '/static/provintia_3.gltf',
    },
  ];

  return (
    <section className='py-20 bg-gray-50'>
      <div className='max-w-6xl mx-auto px-6 space-y-24'>
        {items.map((item, idx) => (
          <div
            key={item.id}
            className={`flex flex-col md:flex-row ${
              idx % 2 === 1 ? 'md:flex-row-reverse' : ''
            } items-center gap-12`}
          >
            {/* Canvas Placeholder */}
            <div className='w-full md:w-1/2 h-64 md:h-96 bg-gray-200 rounded-2xl shadow-lg flex items-center justify-center'>
              <Canvas shadows camera={{ position: [-6, 2, 6] }}>
                <Suspense fallback={null}>
                  <Model path={item.path} />
                  <OrbitControls enableZoom={false} />
                  <Environment preset='sunset' />
                </Suspense>
              </Canvas>
            </div>

            {/* Text */}
            <div className='w-full md:w-1/2 space-y-3'>
              <h3 className='text-sm uppercase tracking-wide text-gray-500'>
                {item.era}
              </h3>
              <h2 className='text-2xl md:text-3xl font-bold text-gray-800'>
                {item.name}
              </h2>
              <p className='text-gray-600 text-lg'>{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CreationProcessSection() {
  const steps = [
    {
      id: 'step1',
      title: 'Drawing',
      description:
        'Starting with sketches and concept drawings to plan the composition and design of each scene.',
      img: '/static/step_01.jpg',
    },
    {
      id: 'step2',
      title: 'Modeling',
      description:
        'Building detailed 3D models using software, focusing on geometry, scale, and accurate proportions.',
      img: '/static/step_02.jpg',
    },
    {
      id: 'step3',
      title: 'Rendering',
      description:
        'Final render output with post-processing for presentation, capturing the complete vision.',
      img: '/static/step_03.jpg',
    },
  ];

  return (
    <section className='py-20 bg-black'>
      <div className='max-w-6xl mx-auto px-6 space-y-24'>
        <h2 className='text-3xl md:text-4xl font-bold text-center text-white mb-12'>
          How I Created This
        </h2>

        {steps.map((step, idx) => (
          <div
            key={step.id}
            className={`flex flex-col md:flex-row ${
              idx % 2 === 1 ? '' : 'md:flex-row-reverse'
            } items-center gap-12`}
          >
            {/* Image */}
            <div className='relative w-full md:w-1/2 h-64 md:h-96 rounded-2xl overflow-hidden shadow-lg'>
              <Image
                src={step.img}
                alt={step.title}
                fill
                className='object-cover w-full h-full'
              />
            </div>

            {/* Text */}
            <div className='w-full md:w-1/2 space-y-4'>
              <h3 className='text-sm uppercase tracking-wide text-gray-400'>
                Step {idx + 1}
              </h3>
              <h2 className='text-2xl md:text-3xl font-bold text-white'>
                {step.title}
              </h2>
              <p className='text-gray-300 text-lg'>{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FooterAuthor() {
  return (
    <footer className='py-12 bg-black'>
      <div className='max-w-4xl mx-auto px-6 text-center'>
        <p className='text-gray-400 text-lg'>&copy; 2020 Po-Lin Chiang</p>
      </div>
    </footer>
  );
}
