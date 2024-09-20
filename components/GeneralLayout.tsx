/* eslint-disable @next/next/no-page-custom-font */
'use client'

// import Navbar from '@/components/Navbar'
// import Providers from '@/components/Providers'
// import { cn, constructMetadata } from '@/lib/utils'
import { Toaster } from 'sonner'
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


export default function GeneralLayout({
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
            <body className={`relative h-auto top-[40px] lg:m-0 overflow-y-hidden overflow-x-hidden  font-sans antialiased overflow-y-hidden`}>
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
