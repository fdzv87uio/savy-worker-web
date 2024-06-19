"use client"
/* eslint-disable @next/next/no-img-element */

import React from 'react'
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import { Button } from '@/components/ui/button';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';


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
    <div className='w-full bg-[#030614] relative'>
      <div className='w-[100vw] bg-[url("/images/gradient-bg-1.png")] bg-cover bg-no-repeat z-[1]'>
        <div className='pt-20 pb-32 px-36 flex flex-col gap-[100px]'>
          {/* AUTHID Login */}
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
                <form className='w-full flex flex-col h-auto z-[90] gap-[20px]' onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex flex-col items-left gap-[5px]">
                    <Controller
                      control={control}
                      name="email"
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          placeholder='Email'
                          className={`placeholder-[#ffffff] p-2 w-full z-[90] h-[36px] focus:outline focus:outline-offset-2 focus:outline-2 focus:outline-[#ffffff] focus:border-[#32A852] bg-transparent border-spacing-[2px] border border-[#C4C4C4] rounded-xl ${inter.className} font-normal text-[#ffffff] text-sm`}
                        />
                      )}
                    />
                    {!errors.email && (
                      <p className={`pl-2 text-[#ffffff] font-normal ${inter.className} text-sm`}>Enter your AuthID email</p>
                    )}
                    {errors.email && errors.email.message && (
                      <p className={`pl-2 text-red-500 font-normal ${inter.className} text-sm`}>{`${errors.email.message}`}</p>
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
    </div>
  )
}

export default SignIn