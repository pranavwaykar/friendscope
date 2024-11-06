import './globals.css'
import type { Metadata } from 'next'
import { inter } from '@/lib/fonts'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'FriendScope - Evaluate Your Friendships',
  description: 'A simple and intuitive tool to assess and improve your friendships through scientific questionnaires.',
    icons: {
        icon: '/friendscope-logo.svg',
    },
}

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
      <html lang="en">
      <body className={inter.className}>
      <div className="flex flex-col min-h-screen">
          <Header/>
          <main className="flex-grow pt-16">{children}</main>
          <Footer/>
      </div>
      </body>
      </html>
  )
}
