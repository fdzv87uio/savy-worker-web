"use client"
/* eslint-disable @next/next/no-img-element */

import React, { useState } from 'react'
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import CustomInput from '@/components/ui/customInput';
import { Button } from '@/components/ui/button';


const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authID, setAuthID] = useState("");
  return (
    <div className='w-full bg-[#030614] relative'>
      <div className='w-[100vw] bg-[url("/images/gradient-bg-1.png")] bg-cover bg-no-repeat z-[1]'>
        <div className='pt-20 pb-32 px-36 flex flex-col gap-[100px]'>
          <div className='flex flex-row gap-[10px] w-full'>
            <div className='flex flex-col items-left w-[50vw] gap-5'>
              <h1 className='text-5xl font-normal text-[#ffffff]'>Log In</h1>
              <p className={`text-[#ffffff] text-2xl font-normal ${inter.className}`} >Join exciting sporting events and meetings with gamers</p>
            </div>
            <div
              style={{ boxShadow: "0px 4px 10px -1px #000000 !important" }}
              className='w-[50vw] h-auto overflow-hidden border rounded-xl border-[rgba(255,255,255,0.2)] bg-[#ffffff]/10 relative'>
              <img style={{ opacity: 0.4 }} alt="" src='/images/card-bg.png' className='absolute top-0 w-full h-[300px] left-0 z-10' />
              <div className='w-full flex flex-col h-auto pt-[46px] pb-[49px] pl-[21px] pr-[60px] z-50 gap-[20px]'>
                <CustomInput placeholder={'Email'} value={email} onChange={setEmail} disabled={false} instructions={'Enter your email address'} />
                <CustomInput placeholder={'Password'} value={password} onChange={setPassword} disabled={false} instructions={'Enter your password'} />
                <Button variant="primary" size="sm" className={`w-[95px] z-[90] h-[36px] px-4 py-2 text-sm font-normal ${inter.className}`}>
                  Log In
                </Button>
              </div>
            </div>
          </div>
          <div className='flex flex-row gap-[10px] w-full '>
            <div className='flex flex-col items-left w-[50vw] gap-5'>
              <h1 className='text-5xl font-normal text-[#ffffff]'>AuthID Verification</h1>
              <p className={`text-[#ffffff] text-2xl font-normal ${inter.className}`} >Use AuthID for enhanced security</p>
            </div>
            <div
              style={{ boxShadow: "0px 4px 10px -1px #000000 !important" }}
              className='w-[50vw] h-auto overflow-hidden border rounded-xl border-[rgba(255,255,255,0.2)] bg-[#ffffff]/10 relative'>
              <img style={{ opacity: 0.4 }} alt="" src='/images/card-bg.png' className='absolute top-0 w-full h-[300px] left-0 z-[1]' />
              <div className='w-full flex flex-col h-auto pt-[46px] pb-[49px] pl-[21px] pr-[60px] z-[90] gap-[20px]'>
                <CustomInput placeholder={'Enter your 6-digit code'} value={authID} onChange={setAuthID} disabled={false} instructions={'Check your AuthID device for the code'} />
                <Button variant="primary" size="sm" className={`z-[90] w-[95px] h-[36px] px-4 py-2 text-sm font-normal ${inter.className}`}>
                  Log In
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn