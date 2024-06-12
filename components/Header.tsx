import React from 'react'
import { Button } from './ui/button'

import { Inter } from "next/font/google";
import Image from 'next/image';
const inter = Inter({ subsets: ["latin"] });

const Header = () => {
  return (
    <div className="sticky top-0 flex size-full z-50 w-full bg-black-1 border-spacing-0">
      <section className="flex h-[83px] w-full items-center justify-between px-4">
        <div className="flex items-center w-full">
          <div className="flex justify-between w-full px-16">
            <div className='flex justify-center items-center gap-3'>
              <h1 className="text-4xl font-normal text-gray-1 uppercase">
                Curcleup
              </h1>
              <div className='w-[7px] h-[7px] bg-primary-1 rounded-full'></div>
            </div>
            <li className='flex gap-7'>
              <ul className='text-2xl font-normal text-green-1 uppercase'>Home</ul>
              <ul className='text-2xl font-normal text-white-1 uppercase'>Events</ul>
              <ul className='text-2xl font-normal text-white-1 uppercase'>Tournaments</ul>
            </li>
            <div className='flex gap-5'>
              <Button variant="primary" className={`uppercase text-sm ${inter.className} gap-3`}>
                <Image src="/icons/signUp.svg" alt='icon' width={20} height={20} />
                Sign Up
              </Button>
              <Button variant="secondary" className={`uppercase text-sm ${inter.className} gap-3`}>
                Sign In
                <Image src="/icons/signIn.svg" alt='icon' width={20} height={20} />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Header