'use client'
import './globals.css'
import { Roboto_Mono } from 'next/font/google'

const roboto_Mono = Roboto_Mono({ subsets: ['latin'] })

export const metadata = {
  title: {
    default: 'Nandani Koli - Portfolio website',
    template: '%s',
  },
  description: 'this is the portfolio website created using NextJS',
}

export default function RootLayout({ children }) {

  return (
    <html lang="en">

      <body className={roboto_Mono.className}>

        {children}

      </body>
    </html>
  )
}
