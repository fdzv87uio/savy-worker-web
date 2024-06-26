'use client'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { Inter } from "next/font/google";
import Image from 'next/image';
import { Input } from './ui/input';
const inter = Inter({ subsets: ["latin"] });


const SignUpForFree = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isUser = false;
  return (
    <div className='flex gap-8 mt-32 relative flex-col md:flex-row'>
      {isUser ? (
        <div className='md:min-h-[331px] w-[350px] md:w-[543px] border rounded-xl border-[rgba(255,255,255,0.2)] bg-[#ffffff]/10'>
          <div className="flex items-center bg-[url('/images/card-bg.png')] bg-cover bg-left-bottom opacity-10 h-[400px] md:h-[331px]">
          </div>
          <div className='absolute w-[350px] md:w-[543px] md:h-[331px] top-0 flex flex-col pt-[46px] pb-[49px] pl-[21px] pr-[60px] gap-[20px] text-white-1'>
            <h1 className='text-3xl md:text-4xl'>Join an Event</h1>
            <h3 className={`text-xl md:text-2xl ${inter.className}`}>Fill in the details to join an event</h3>
            <div className='flex flex-col gap-3 mt-3'>
              <Input placeholder={'Category'} disabled={false} />
              <p className={`pl-2 text-[#ffffff] font-normal ${inter.className} text-sm`}>Search by name or category</p>
              <Button variant="primary" size="sm" className={`w-[95px] z-[90] h-[36px] px-4 mt-5 text-sm font-normal ${inter.className}`}>
                Sign up
              </Button>
            </div>
          </div>
        </div>
      ) : (
          <div className='min-h-[420px] w-[350px] md:w-[543px] border rounded-xl border-[rgba(255,255,255,0.2)] bg-[#ffffff]/10'>
          <div className="flex items-center bg-[url('/images/card-bg.png')] bg-cover bg-left-bottom opacity-10 h-[450px] md:h-[420px]">
          </div>
          <div className='absolute w-[350px] md:w-[543px] h-[450px] md:h-[420px] top-0 flex flex-col pt-[46px] pb-[49px] pl-[21px] pr-[60px] gap-[20px] text-white-1'>
            <h1 className='text-3xl md:text-4xl'>Sign Up for Free</h1>
            <h3 className={`text-sm md:text-base ${inter.className}`}>Create your account to access all event features</h3>
            <div className='flex flex-col gap-3 mt-3'>
              <Input placeholder={'Email'} value={email} onChange={(e) => setEmail(e.target.value)} disabled={false} />
              <p className={`pl-2 text-[#ffffff] font-normal ${inter.className} text-sm`}>Enter your email address</p>
              <Input placeholder={'Password'} value={password} onChange={(e) => setPassword(e.target.value)} disabled={false} />
              <p className={`pl-2 text-[#ffffff] font-normal ${inter.className} text-sm`}>Enter your password</p>
              <Button variant="primary" size="sm" className={`w-[95px] z-[90] h-[36px] px-4 mt-5 text-sm font-normal ${inter.className}`}>
                Sign up
              </Button>
            </div>
          </div>
        </div>)}

      <div className="hidden xl:flex xl:w-[694px]">
        <div className='relative'>
          <div className='absolute w-[388px] h-[278px]'>
            <Image
              src="/images/basketball.jfif"
              alt="Basketball"
              fill
              className="rounded-lg object-cover"
            />
          </div>
          <div className="absolute h-[278px] w-[388px] bg-gradient-to-t from-black-1 to-transparent rounded-lg">
          </div>
        </div>
        <div className='relative'>
          <div className='absolute w-[388px] h-[278px] top-24 left-56'>
            <Image
              src="/images/gamer.png"
              alt="Basketball"
              fill
              className="rounded-lg object-cover"
            />
          </div>
          <div className="absolute h-[278px] w-[388px] bg-gradient-to-t from-black-1 to-transparent rounded-lg top-24 left-56">
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpForFree