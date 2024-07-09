import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { LayoutProviders } from './LayoutProviders';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'コーディングテスト | 株式会社ゆめみ',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ja-JP'>
      <body className={inter.className}>
        <LayoutProviders>{children}</LayoutProviders>
      </body>
    </html>
  );
}
