import Image from 'next/image';
import Layout from '@/components/layout';

export default function Home() {
  return (
    <Layout>
      <div className='relative flex items-center justify-center h-screen overflow-hidden'>
        <Image
          src='/static/cover_01_1280x720.jpg'
          layout='fill'
          objectFit='contain'
          alt='Fort Provintia'
        />
      </div>
      <div className='fixed top-1/2 right-1/2 z-20'>
        <p className='text-white text-4xl font-mono text-center'>
          Fort Provintia 1653
        </p>
      </div>
    </Layout>
  );
}
