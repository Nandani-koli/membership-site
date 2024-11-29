'use client'
import { Roboto_Mono } from 'next/font/google'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

import { usePathname } from 'next/navigation'

const roboto_Mono = Roboto_Mono({ subsets: ['latin'] })

export const metadata = {
  title: {
    default : 'Nandani Koli - Portfolio website',
    template : '%s',
  },
  description: 'this is the portfolio website created using NextJS',
}

export default function RootLayout({ children }) {

  const pathname = usePathname();

  return (
    <html lang="en">
  
      <body className={roboto_Mono.className}>


       <Navbar />
        
        {children}

        <Footer />

        </body>
    </html>
  )
}
