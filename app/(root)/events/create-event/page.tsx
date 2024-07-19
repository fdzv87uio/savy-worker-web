'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import { Progress } from '@/components/ui/progress';
import StepOne from '@/components/forms/createEvent/StepOne';
import StepTwo from '@/components/forms/createEvent/StepTwo';
import { createEventFormStore } from '@/stores/createEventFormStore'

const CreateEvent = () => {
  const [loading, setLoading] = useState(false);
  const { inputs } = createEventFormStore();
  const [progress, setProgress] = useState(10);

  return (
    <div className='flex flex-col justify-center items-center relative'>
      <Image
        src="/images/vector7.2.svg"
        alt="Ellipse"
        width={800}
        height={429}
        className="hidden xl:flex absolute top-[0px] left-[850px] object-cover blur-xl"
      />
      <div className="flex flex-col xl:flex-row justify-center items-center gap-5 md:gap-x-36 text-white-1 mt-10 md:mt-20 w-[350px] md:w-[750px] xl:w-[1123px] md:min-h-[850px] z-10 ">
        <div className='flex'>
          <h2 className="text-2xl md:text-5xl font-normal text-center md:text-start">Host event</h2>
        </div>
        <div className='w-[350px] md:min-w-[543px] min-h-[516px] border relative rounded-2xl border-[rgba(255,255,255,0.2)] bg-[#ffffff]/10'>
          <div className="flex items-center bg-[url('/images/card-bg.png')] bg-cover bg-left-bottom opacity-10 min-h-[850px] ">
          </div>
          <div className='absolute w-[250px] md:w-[450px] top-10 left-10 flex flex-col'>
            <Progress value={progress} max={100} className='z-[99]' id="progress" />
            {inputs.step === 1 && (
              <StepOne />
            )}
            {inputs.step === 2 && (
              <StepTwo />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateEvent