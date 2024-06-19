'use client'
import React, { useState } from 'react'
// import CustomInput from './ui/customInput'
import { Button } from './ui/button'
import { Inter } from "next/font/google";
import Image from 'next/image';
import { Input } from './ui/input';
const inter = Inter({ subsets: ["latin"] });


const SignUpForFree = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className='flex gap-8 mt-32'>
      <div
        style={{ boxShadow: "0px 4px 10px -1px #000000 !important" }}
        className='min-h-[420px] w-[543px] border rounded-xl border-[rgba(255,255,255,0.2)] bg-[#ffffff]/10'>
        <img style={{ opacity: 0.4 }} alt="" src='/images/card-bg.png' className='absolute top-0 w-full h-[300px] left-0 z-10' />
        <div className='w-full flex flex-col h-auto pt-[46px] pb-[49px] pl-[21px] pr-[60px] z-50 gap-[20px] text-white-1'>
          <h1 className='text-4xl'>Sign Up for Free</h1>
          <h3 className={`text-base ${inter.className}`}>Create your account to access all event features</h3>
          <div className='flex flex-col gap-3 mt-3'>
            {/* <CustomInput placeholder={'Email'} value={email} onChange={setEmail} disabled={false} instructions={'Enter your email address'} /> */}
            {/* <CustomInput placeholder={'Password'} value={password} onChange={setPassword} disabled={false} instructions={'Enter your password'} /> */}
            <Input placeholder={'Email'} value={email}  disabled={false}  />
            <Input placeholder={'Password'} value={password}  disabled={false}  />
            <Button variant="primary" size="sm" className={`w-[95px] z-[90] h-[36px] px-4 mt-5 text-sm font-normal ${inter.className}`}>
              Sign up
            </Button>
          </div>
        </div>
      </div>
      <div className="w-[694px]">
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