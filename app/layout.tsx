import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PepperBall Reporting Platform | Thomas Ryan',
  description: 'A sanitized end-to-end case study of governed data intake, deterministic operational reporting, bounded self-healing, exact readback, and rollback-safe delivery.',
  openGraph: {
    title: 'PepperBall Reporting Platform | Thomas Ryan',
    description: 'From changing documents to deterministic reports, bounded recovery, and one-writer delivery.',
    type: 'website',
    images: [{ url: '/social-preview.png', width: 1743, height: 897, alt: 'Reporting Reliability by Thomas Ryan' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PepperBall Reporting Platform | Thomas Ryan',
    description: 'From changing documents to deterministic reports, bounded recovery, and one-writer delivery.',
    images: ['/social-preview.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
