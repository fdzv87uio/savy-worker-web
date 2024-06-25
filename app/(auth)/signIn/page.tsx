/* eslint-disable @next/next/no-img-element */
"use client"

import React, { useState } from 'react'
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import { Button } from '@/components/ui/button';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Input } from '@/components/ui/input';
import BlueBlob from '@/public/svgs/blue-blob.svg';
import GrayBlob from '@/public/svgs/gray-blob.svg';
import GreenBlob from '@/public/svgs/green-blob.svg';
import GreenBlob2 from '@/public/svgs/green-blob-2.svg';
import Image from 'next/image';
import { standardLogin } from '@/utils/authUtils';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';


const SignIn = () => {
  const [authId, setAuthId] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // Yup validation rules

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .matches(emailRegex, "Invalid email")
      .email('Email is invalid'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters long')
      .required('Password is required'),
  });
  //Form options
  const formOptions: any = {
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  };
  //react-hook-forms 
  const { control, handleSubmit, formState: { errors } } = useForm(formOptions);


  //Submission handler
  async function onSubmit(data: any) {
    setLoading(true);
    if (data.email && data.password) {
      const res: any = await standardLogin(data.email, data.password);
      console.log(res);
      if (res.status === 'error') {
        setLoading(false);
        const msg = res.error.response.data.message ? res.error.response.data.message : 'Invalid Credentials';
        toast.error("Error: " + msg);
      } else if (res.status === "success") {
        setLoading(false);
        const newToken = res.data.dataAuth.accessToken;
        setCookie('curcle-auth-token', newToken, {
          maxAge: 604800,
          path: '/',
        });
        toast.success("Login Successful!");
        router.push('/');
      }
    }
  }

  return (
    <div className='w-full bg-[#030614] relative overflow-x-hidden overflow-hidden'>
      <div className='w-[100vw]'>
        <div className='pt-20 pb-32 px-36 flex flex-col gap-[100px]'>

          {/* Standard Login */}
          <div className='flex flex-row gap-[10px] z-[90] w-full '>
            <div className='flex flex-col items-left w-[50vw] gap-5'>
              <h1 className='text-5xl font-normal text-[#ffffff]'>Log In</h1>
              <p className={`text-[#ffffff] text-2xl font-normal ${inter.className}`} >Join exciting sporting events and meetings with gamers</p>
            </div>
            <div
              style={{ boxShadow: "0px 4px 10px -1px #000000 !important" }}
              className='w-[50vw] h-auto overflow-hidden border rounded-xl border-[rgba(255,255,255,0.2)] bg-[#ffffff]/10 relative'>
              <img style={{ opacity: 0.4 }} alt="" src='/images/card-bg.png' className='absolute top-0 w-full h-[300px] left-0 z-[1]' />
              <div className='w-full flex flex-col h-auto pt-[46px] pb-[49px] pl-[21px] pr-[60px] z-[90] gap-[20px]'>
                <form className='w-full flex flex-col h-auto z-[90] gap-[20px]' onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex flex-col items-left gap-[5px]">
                    <Controller
                      control={control}
                      name="email"
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="text"
                          placeholder='Email'
                        />
                      )}
                    />
                    {!errors.email && (
                      <p className={`pl-2 text-[#ffffff] font-normal ${inter.className} text-sm`}>Enter your email</p>
                    )}
                    {errors.email && errors.email.message && (
                      <p className={`pl-2 text-red-300 font-bold ${inter.className} text-sm`}>{`${errors.email.message}`}</p>
                    )}
                  </div>
                  <div className="flex flex-col items-left gap-[5px]">
                    <Controller
                      control={control}
                      name="password"
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="password"
                          placeholder='Password'
                        />
                      )}
                    />
                    {!errors.password && (
                      <p className={`pl-2 text-[#ffffff] font-normal ${inter.className} text-sm`}>Enter your password</p>
                    )}
                    {errors.password && errors.password.message && (
                      <p className={`pl-2 text-red-300 font-bold ${inter.className} text-sm`}>{`${errors.password.message}`}</p>
                    )}
                  </div>
                  <Button type="submit" variant="primary" size="sm" className={`z-[90] w-[95px] h-[36px] px-4 py-2 text-sm font-normal ${inter.className}`}>
                    {loading ? "..." : "Log In"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
          {/* AUTHID Login */}
          <div className='flex flex-row gap-[10px] z-[90] w-full '>
            <div className='flex flex-col items-left w-[50vw] gap-5'>
              <h1 className='text-5xl font-normal text-[#ffffff]'>AuthID Verification</h1>
              <p className={`text-[#ffffff] text-2xl font-normal ${inter.className}`} >Use AuthID for enhanced security</p>
            </div>
            <div
              style={{ boxShadow: "0px 4px 10px -1px #000000 !important" }}
              className='w-[50vw] h-auto overflow-hidden border rounded-xl border-[rgba(255,255,255,0.2)] bg-[#ffffff]/10 relative'>
              <img style={{ opacity: 0.4 }} alt="" src='/images/card-bg.png' className='absolute top-0 w-full h-[300px] left-0 z-[1]' />
              <div className='w-full flex flex-col h-auto pt-[46px] pb-[49px] pl-[21px] pr-[60px] z-[90] gap-[20px]'>
                <form className='w-full flex flex-col h-auto z-[90] gap-[20px]'>
                  <div className="flex flex-col items-left gap-[5px]">
                    <Input
                      type="text"
                      name="authId"
                      value={authId}
                      onChange={(e) => { setAuthId(e.target.value) }}
                      placeholder='Enter your 6-digit code'
                    />
                    <p className={`pl-2 text-[#ffffff] font-normal ${inter.className} text-sm`}>Enter your AuthID email</p>
                  </div>
                  <Button type="submit" variant="primary" size="sm" className={`z-[90] w-[95px] h-[36px] px-4 py-2 text-sm font-normal ${inter.className}`}>
                    Log In
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* svg assets */}
      <Image className='absolute top-0 right-0' src={GreenBlob} alt="green-blob" />
      <Image className='absolute bottom-[-600px]' src={BlueBlob} alt="blue-blob" />
      <Image className='absolute top-[160px] left-[100px]' src={GrayBlob} alt="gray-blob" />
      <Image className='absolute bottom-[-160px] right-0' src={GreenBlob2} alt="green-blob-2" />
    </div>
  )
}

export default SignIn