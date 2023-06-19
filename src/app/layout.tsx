import NavBar from '@/components/NavBar'
import './globals.css'

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <main className="bg-slate-600 flex min-h-screen flex-col items-center p-24 text-white">
          {children}
        </main>
      </body>
    </html>
  )
}
