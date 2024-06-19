"use client"

import React from 'react'
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import { Button } from '@/components/ui/button';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import BlueBlob from '@/public/svgs/blue-blob.svg';
import GreenBlob from '@/public/svgs/green-blob.svg';


const SignIn = () => {
  // Yup validation rules
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
  });
  //Form options
  const formOptions: any = {
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  };
  //react-hook-forms 
  const { control, handleSubmit, formState: { errors } } = useForm(formOptions);


  //Submission handler
  function onSubmit(data: any) {
    alert('Your email is: ' + data.email);
  }

  return (
    <div className='w-full bg-[#030614] relative overflow-x-hidden overflow-hidden'>
      <div className='w-[100vw]'>
        <div className='pt-20 pb-32 px-36 flex flex-col gap-[100px]'>
          {/* AUTHID Login */}
          <div className='flex flex-row gap-[10px] z-[90] w-full '>
            <div className='flex flex-col items-left w-[50vw] gap-5'>
              <h1 className='text-5xl font-normal text-[#ffffff]'>AuthID Verification</h1>
              <p className={`text-[#ffffff] text-2xl font-normal ${inter.className}`} >Use AuthID for enhanced security</p>
            </div>
            <div
              style={{ boxShadow: "0px 4px 10px -1px #000000 !important" }}
              className='w-[50vw] h-auto overflow-hidden border rounded-xl border-[rgba(255,255,255,0.2)] bg-[#ffffff]/10 relative'>
              <Image layout='fill' style={{ opacity: 0.4 }} alt="" src='/images/card-bg.png' className='absolute top-0 w-full h-[300px] left-0 z-[1]' />
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
                      <p className={`pl-2 text-[#ffffff] font-normal ${inter.className} text-sm`}>Enter your AuthID email</p>
                    )}
                    {errors.email && errors.email.message && (
                      <p className={`pl-2 text-red-400 font-bold ${inter.className} text-sm`}>{`${errors.email.message}`}</p>
                    )}
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
    </div>
  )
}

export default SignIn