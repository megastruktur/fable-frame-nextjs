import NavBar from '@/components/NavBar'
import './globals.css'

import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Welcome to Fable Frame!',
  description: 'WIP Digital Character Sheet prototype',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-slate-800 flex flex-col`}>
        <NavBar />
        <main className="flex flex-col items-center justify-center p-24 text-white">
          {children}
        </main>
      </body>
    </html>
  )
}
