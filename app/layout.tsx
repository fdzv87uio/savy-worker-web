/* eslint-disable @next/next/no-page-custom-font */
'use client'

// import Navbar from '@/components/Navbar'
// import Providers from '@/components/Providers'
// import { cn, constructMetadata } from '@/lib/utils'
import { Toaster } from 'sonner'
import './globals.css'
import Footer from '@/components/Footer'
import React from 'react'
// import { countries } from '@/constants/countries'
// import { recoilPersist } from 'recoil-persist';
import { RecoilRoot, useRecoilState } from 'recoil'
import { usePathname } from 'next/navigation'
import Navbar from '@/components/Navbar'
// import { useGeolocated } from 'react-geolocated'
// import { geolocationState } from '@/lib/atoms/geolocationAtom'
// import MaxWidthWrapper from '@/components/MaxWidthWrapper'


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element {
  const pathname = usePathname()

  return (

    <html lang='en' className='h-full bg-transparent overflow-y-hidden overflow-x-hidden'>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Archivo+Black&display=swap" rel="stylesheet" />
      </head>
      <body className={`relative h-[100vh] m-2 lg:m-0 top-[240px] md:top-60 ${pathname === "/task" || pathname === "/submit-answer" || pathname === "/" || pathname === '/control-panel' || pathname?.includes("/answers/create-answer/") || pathname === "/tasks/create-task" || pathname === "/improve-your-account" ? 'lg:top-[100px] lg:h-[100vh]' : 'lg:top-[160px] lg:h-[100vh]'} font-sans antialiased overflow-y-hidden`}>
        {/* <RecoilRoot>
          <Providers>
            <Navbar />
            {children}
          </Providers>
          <Toaster expand visibleToasts={1} position='top-center' richColors />
        </RecoilRoot> */}
        <RecoilRoot>
          <Navbar />
          {children}
          <Toaster expand visibleToasts={1} position='top-center' richColors />
        </RecoilRoot>
      </body>
    </html>
  )
}
