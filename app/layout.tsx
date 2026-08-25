import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import './assistant.css';
import './experience.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PepperBall Reporting Platform | Thomas Ryan',
  description: 'How Thomas Ryan turned a manual manufacturing-reporting process into a production platform and completed its handoff.',
  openGraph: {
    title: 'PepperBall Reporting Platform | Thomas Ryan',
    description: 'A completed internship case study: the reporting problem, the system Thomas built, the results, and the handoff.',
    type: 'website',
    images: [{ url: '/social-preview.png', width: 1743, height: 897, alt: 'Reporting Reliability by Thomas Ryan' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PepperBall Reporting Platform | Thomas Ryan',
    description: 'A completed internship case study: the reporting problem, the system Thomas built, the results, and the handoff.',
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
