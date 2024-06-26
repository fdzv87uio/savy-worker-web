import React from 'react'
import { Button } from './ui/button'

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  return (
    <div className="sticky top-0 flex size-full z-[94] w-full bg-blue-2 border-spacing-0">
      <section className="flex h-[83px] w-full items-center justify-between px-4">
        <div className="flex items-center w-full">
          <div className="flex justify-between w-full px-16">
            <div className='flex justify-center items-center gap-3'>
              <h1 className="text-4xl font-normal text-gray-1 uppercase">
                Curcleup
              </h1>
              <div className='w-[7px] h-[7px] bg-primary-1 rounded-full'></div>
            </div>
            <ul className='flex gap-7'>
              <Link href="/">
                <li className='text-2xl font-normal text-green-1 uppercase'>Home</li>
              </Link>
              <Link href="#">
                <li className='text-2xl font-normal text-white-1 uppercase'>Events</li>
              </Link>
              <Link href="#">
                <li className='text-2xl font-normal text-white-1 uppercase'>Tournaments</li>
              </Link>
            </ul>
            <div className='flex gap-5'>
              <Link href="/signUp">
                <Button variant="primary" size="sm" className={`uppercase text-sm font-normal ${inter.className} gap-3`}>
                  <Image src="/icons/signUp.svg" alt='icon' width={20} height={20} />
                  Sign Up
                </Button>
              </Link>
              <Link href="/signIn">
                <Button variant="secondary" size="sm" className={`uppercase text-sm font-normal ${inter.className} gap-3`}>
                  Sign In
                  <Image src="/icons/signIn.svg" alt='icon' width={20} height={20} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Header