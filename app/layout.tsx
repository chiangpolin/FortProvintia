import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chihkan',
  description: 'A historical site in Tainan',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
