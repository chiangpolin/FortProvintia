import { Suspense } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Canvas, useLoader } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import Layout from '@/components/layout';

const Icon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='20'
      height='20'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      className='absolute left-1 top-1 h-5 w-5 text-indigo-600'
    >
      <path d='M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z'></path>
      <path d='M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z'></path>
    </svg>
  );
}

const Model = (props: { path: string }) => {
  const { path } = props;
  const gltf = useLoader(GLTFLoader, path);
  return <primitive object={gltf.scene} scale={1} position={[0.75, 0, 4]} />;
};

export default function About() {
  return (
    <Layout>
      <div className='overflow-hidden bg-white py-24 sm:py-32'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2'>
            <div className='lg:pr-8 lg:pt-4'>
              <div className='lg:max-w-lg'>
                <h2 className='text-base font-semibold leading-7 text-indigo-600'>
                  Dutch Formosa (1624 - 1668)
                </h2>
                <p className='mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
                  Fort Provintia
                </p>
                <p className='mt-6 text-lg leading-8 text-gray-600'>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Maiores impedit perferendis suscipit eaque, iste dolor
                  cupiditate blanditiis ratione.
                </p>
                <dl className='mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none'>
                  <div className='relative pl-9'>
                    <dt className='inline font-semibold text-gray-900'>
                      <Icon />
                      Status.
                    </dt>
                    <dd className='inline'>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Maiores impedit perferendis suscipit eaque, iste dolor
                      cupiditate blanditiis ratione.
                    </dd>
                  </div>
                  <div className='relative pl-9'>
                    <dt className='inline font-semibold text-gray-900'>
                      <Icon />
                      Government.
                    </dt>
                    <dd className='inline'>
                      Anim aute id magna aliqua ad ad non deserunt sunt. Qui
                      irure qui lorem cupidatat commodo.
                    </dd>
                  </div>
                  <div className='relative pl-9'>
                    <dt className='inline font-semibold text-gray-900'>
                      <Icon />
                      Historical era.
                    </dt>
                    <dd className='inline'>
                      Ac tincidunt sapien vehicula erat auctor pellentesque
                      rhoncus. Et magna sit morbi lobortis.
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            <Canvas shadows camera={{ position: [-6, 2, 6] }}>
              <Suspense fallback={null}>
                <Model path={'/static/provintia_1.gltf'} />
                <OrbitControls enableZoom={false} />
                <Environment preset='sunset' />
              </Suspense>
            </Canvas>
            <Canvas shadows camera={{ position: [-6, 2, 6] }}>
              <Suspense fallback={null}>
                <Model path={'/static/provintia_2.gltf'} />
                <OrbitControls enableZoom={false} />
                <Environment preset='sunset' />
              </Suspense>
            </Canvas>
            <div className='lg:pr-8 lg:pt-4'>
              <div className='lg:max-w-lg'>
                <h2 className='text-base font-semibold leading-7 text-indigo-600'>
                  Taiwan under Qing rule (1683 - 1895)
                </h2>
                <p className='mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
                  Chhiah Khàm Lâu
                </p>
                <p className='mt-6 text-lg leading-8 text-gray-600'>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Maiores impedit perferendis suscipit eaque, iste dolor
                  cupiditate blanditiis ratione.
                </p>
                <dl className='mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none'>
                  <div className='relative pl-9'>
                    <dt className='inline font-semibold text-gray-900'>
                      <Icon />
                      Status.
                    </dt>
                    <dd className='inline'>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Maiores impedit perferendis suscipit eaque, iste dolor
                      cupiditate blanditiis ratione.
                    </dd>
                  </div>
                  <div className='relative pl-9'>
                    <dt className='inline font-semibold text-gray-900'>
                      <Icon />
                      Government.
                    </dt>
                    <dd className='inline'>
                      Anim aute id magna aliqua ad ad non deserunt sunt. Qui
                      irure qui lorem cupidatat commodo.
                    </dd>
                  </div>
                  <div className='relative pl-9'>
                    <dt className='inline font-semibold text-gray-900'>
                      <Icon />
                      Historical era.
                    </dt>
                    <dd className='inline'>
                      Ac tincidunt sapien vehicula erat auctor pellentesque
                      rhoncus. Et magna sit morbi lobortis.
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            <div className='lg:pr-8 lg:pt-4'>
              <div className='lg:max-w-lg'>
                <h2 className='text-base font-semibold leading-7 text-indigo-600'>
                  Taiwan R.O.C. (1945 - now)
                </h2>
                <p className='mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
                  Chihkan Tower
                </p>
                <p className='mt-6 text-lg leading-8 text-gray-600'>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Maiores impedit perferendis suscipit eaque, iste dolor
                  cupiditate blanditiis ratione.
                </p>
                <dl className='mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none'>
                  <div className='relative pl-9'>
                    <dt className='inline font-semibold text-gray-900'>
                      <Icon />
                      Status.
                    </dt>
                    <dd className='inline'>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Maiores impedit perferendis suscipit eaque, iste dolor
                      cupiditate blanditiis ratione.
                    </dd>
                  </div>
                  <div className='relative pl-9'>
                    <dt className='inline font-semibold text-gray-900'>
                      <Icon />
                      Government.
                    </dt>
                    <dd className='inline'>
                      Anim aute id magna aliqua ad ad non deserunt sunt. Qui
                      irure qui lorem cupidatat commodo.
                    </dd>
                  </div>
                  <div className='relative pl-9'>
                    <dt className='inline font-semibold text-gray-900'>
                      <Icon />
                      Historical era.
                    </dt>
                    <dd className='inline'>
                      Ac tincidunt sapien vehicula erat auctor pellentesque
                      rhoncus. Et magna sit morbi lobortis.
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            <Canvas shadows camera={{ position: [-6, 2, 6] }}>
              <Suspense fallback={null}>
                <Model path={'/static/provintia_3.gltf'} />
                <OrbitControls enableZoom={false} />
                <Environment preset='sunset' />
              </Suspense>
            </Canvas>
          </div>
        </div>
      </div>
    </Layout>
  );
}
