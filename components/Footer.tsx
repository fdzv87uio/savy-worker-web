import React from 'react'

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import Image from 'next/image';
import { Button } from './ui/button';


const Footer = () => {
  return (
    <div className="flex h-[138px] bg-blue-1 relative">
      <section className="flex justify-between items-center w-full gap-10 px-16">
        <p className={`text-base ${inter.className} text-primary-1`}>
          Copyright 2024 Curcleup
        </p>
        <div className='flex max-w-[485px] w-full justify-between'>
          <div className='flex gap-4 text-xs text-white-2'>
            <p>Terms & Conditions</p>
            <p>Privacy Policy</p>
          </div>
          <div className='flex gap-3 text-white-2'>
            <Image src="/icons/facebook.svg" alt='icon' width={5} height={8} />
            <Image src="/icons/twitter.svg" alt='icon' width={8} height={8} />
            <Image src="/icons/instagram.svg" alt='icon' width={8} height={8} />
          </div>
        </div>
        <div className='flex gap-2 items-center max-w-[198px] w-full justify-between'>
          <p className='text-xs text-white-2 w-full'>
            Ready to explore?
          </p>
          <Button variant="primary" size="xsm" className={`text-[6px] text-white-1 ${inter.className}`}>
            Get Started
          </Button>
        </div>
        <p className='text-xs text-white-2 max-w-[145px]'>
          Get updates on your favourite games
        </p>
        <div className='flex gap-4'>
          <div className='flex flex-col gap-3'>
            <p className='text-xs text-primary-3'>
              About
            </p>
            <div className='flex flex-col'>
              <ul className={`flex flex-col gap-2 text-xs text-white-2 ${inter.className} text-white-2`}>
                <li>Our Story</li>
                <li>Benefits</li>
                <li>Team</li>
                <li>Careers</li>
              </ul>
            </div>
          </div>
          <div className='flex flex-col gap-3'>
            <p className='text-xs text-primary-3'>
              Help
            </p>
            <div className='flex flex-col'>
              <ul className={`flex flex-col gap-2 text-xs text-white-2 ${inter.className} text-white-2`}>
                <li>FAQs</li>
                <li>Contact Us</li>
              </ul>
            </div>
          </div>
        </div>

      </section>
    </div>
  )
}

export default Footer