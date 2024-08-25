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
import GreenBlobMobile1 from '@/public/svgs/green-blob-mobile-1.svg';
import GreenBlobMobile2 from '@/public/svgs/green-blob-mobile-2.svg';
import BlueBlobMobile1 from '@/public/svgs/blue-blob-mobile-1.svg';
import BlueBlobMobile2 from '@/public/svgs/blue-blob-mobile-2.svg';
import GrayBlobMobile from '@/public/svgs/gray-blob-mobile.svg';
import Image from 'next/image';
import { toast } from 'sonner';
import { sendPasswordRecoveryEmail } from '@/utils/authUtils';


const ForgotPassword = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");

    // Yup validation rules
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .matches(emailRegex, "Invalid email")
            .email('Email is invalid'),
    });
    //Form options
    const formOptions: any = {
        resolver: yupResolver(validationSchema),
        mode: 'onChange',
    };
    //react-hook-forms 
    const { control, register, handleSubmit, formState: { errors } } = useForm(formOptions);


    //Submission handler
    async function onSubmit(data: any) {
        setLoading(true);
        console.log(data);
        const res: any = await sendPasswordRecoveryEmail(data.email);
        console.log(res);
        if (res.status === "success") {
            setLoading(false);
            toast.success("Message sent. Please, check your email")
        } else {
            setLoading(false);
            toast.error(res.error.response.data.message)
        }

    }


    return (
        <div className='w-full bg-[#030614]  relative overflow-x-hidden overflow-hidden'>
            <div className='w-full md:w-[100vw]'>
                <div className='pt-[40px] h-[110vh] pb-[114px] px-3.5 xl:pt-20 xl:pb-32 xl:px-36 flex flex-col items-center gap-[40px] xl:gap-[100px]'>

                    {/* Standard Login */}
                    <div className='flex flex-col xl:flex-row gap-[40px] md:gap-[40px] xl:gap-[80px] z-[90] w-[350px] md:w-[80vw]  xl:w-full '>
                        <div className='w-full flex flex-col xl:items-left xl:w-[40vw] gap-5'>
                            <h1 className='text-2xl md:text-5xl font-normal text-center xl:text-left text-[#ffffff]'>Forgot Password</h1>
                            <p className={`text-[#ffffff] text-base md:text-2xl text-center xl:text-left font-normal ${inter.className}`} >Please, enter your registered email. <br /> We will send you a link for you to reset your password</p>
                        </div>
                        <div
                            style={{ boxShadow: "0px 4px 10px -1px #000000 !important" }}
                            className='w-full xl:w-[45vw] h-auto overflow-hidden border rounded-xl border-[rgba(255,255,255,0.2)] bg-[#ffffff]/10 relative'>
                            <img style={{ opacity: 0.4 }} alt="" src='/images/card-bg.png' className='absolute top-0 w-full h-[330px] left-0 z-[1]' />
                            <div className='w-full flex flex-col h-auto pt-[46px] pb-7 xl:pb-[49px] pl-[21px] pr-[21px] xl:pr-[60px] z-[90] gap-[20px]'>
                                <form className='w-full flex flex-col h-auto z-[90] gap-[20px]' onSubmit={handleSubmit(onSubmit)}>
                                    <div className="flex flex-col items-left gap-[5px]">
                                        <Input
                                            value={email}
                                            {...register('email', {
                                                onChange: (e) => {
                                                    setEmail(e.target.value);
                                                },
                                            })}
                                            type="text"
                                            placeholder='Email'
                                            autoComplete='off'
                                        />
                                        {!errors.email && (
                                            <p className={`pl-2 text-[#ffffff] font-normal ${inter.className} text-sm`}>Enter your registered email</p>
                                        )}
                                        {errors.email && errors.email.message && (
                                            <p className={`pl-2 text-red-300 font-bold ${inter.className} text-sm`}>{`${errors.email.message}`}</p>
                                        )}
                                    </div>
                                    <Button disabled={!email || errors.email ? true : false} type="submit" variant="default" size="sm" className={`z-[90] w-full xl:w-[95px] h-[36px] px-4 py-2 text-sm font-normal ${inter.className}`}>
                                        {loading ? "..." : "Send Email"}
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* svg assets */}
            <Image className='flex xl:hidden absolute top-0 left-0' src={BlueBlobMobile1} alt="blue-blob-mobile-1" />
            <Image className='flex xl:hidden absolute top-0 right-0' src={GreenBlobMobile1} alt="green-blob-mobile-1" />
            <Image className='flex xl:hidden absolute bottom-0 right-0' src={GreenBlobMobile2} alt="green-blob-mobile-2" />
            <Image className='flex xl:hidden absolute bottom-0 left-0' src={GrayBlobMobile} alt="gray-blob-mobile" />
            <Image className='flex xl:hidden absolute bottom-0' src={BlueBlobMobile2} alt="blue-blob-mobile-2" />
            <Image className='hidden xl:flex absolute top-0 right-0' src={GreenBlob} alt="green-blob" />
            <Image className='hidden xl:flex absolute bottom-[-600px]' src={BlueBlob} alt="blue-blob" />
            <Image className='hidden xl:flex absolute top-[160px] left-[100px]' src={GrayBlob} alt="gray-blob" />
            <Image className='hidden xl:flex absolute bottom-[-160px] right-0' src={GreenBlob2} alt="green-blob-2" />
        </div>
    )
}

export default ForgotPassword