import './globals.css';
import Link from 'next/link';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header>
        <nav class='bg-gray-800 bg-opacity-85 fixed top-0 z-50 w-full'>
          <div class='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
            <div class='relative flex h-16 items-center justify-between'>
              <div class='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
                <div class='hidden sm:ml-6 sm:block'>
                  <div class='flex space-x-4'>
                    <Link
                      href='/'
                      class='text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'
                      aria-current='page'
                    >
                      Home
                    </Link>
                    <Link
                      href='/about'
                      class='text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'
                    >
                      About
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <main>{children}</main>
    </>
  );
}
