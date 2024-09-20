import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const Hero = () => {
  return (
    <div className='text-white-1 min-h-[605px] relative w-full'>
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center h-full z-10'>
        <div className='flex flex-col max-w-[787px] text-center'>
          <h1 className='text-4xl md:text-5xl '>Join Curcleup to Personalize Your Experience</h1>
          <h3 className={`text-xs md:text-sm font-normal font-mono mt-3`}>At Curcleup, we want you to find sports and gaming events that suit you best.</h3>
        </div>
        <div className='flex gap-3 mt-3'>
          <Link href="/signUp">
            <Button variant="default" size="sm" className={`text-xs font-normal font-mono`}>
              Sign Up
            </Button>
          </Link>
          <Link href="/signIn">
            <Button variant="secondary" size="sm" className={`text-xs font-normal font-mono`}>
              Sign In
            </Button>
          </Link>
        </div>
      </div>
      <div className='absolute h-[60] top-[-10px] left-1/2 transform -translate-x-1/2 w-full'>
        {/* <Image src="/images/hero.png" alt='hero' width={2201} height={1467} />*/}
        <img src="/images/hero.png" alt="hero" className='object-none opacity-30 h-[605px] w-full' />
      </div>
    </div>
  )
}

export default Hero