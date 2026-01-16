import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'tidbit',
  description: 'Master anything through spaced repetition. Never cram again.',
  keywords: ['learning', 'education', 'spaced repetition', 'memory', 'study'],
  openGraph: {
    title: 'tidbit - never cram again',
    description: 'Master anything through spaced repetition. Never cram again.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
