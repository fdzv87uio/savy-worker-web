'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import { Progress } from '@/components/ui/progress';
import StepOne from '@/components/forms/createEvent/StepOne';
import StepTwo from '@/components/forms/createEvent/StepTwo';
import StepThree from '@/components/forms/createEvent/StepThree';
import StepFour from '@/components/forms/createEvent/StepFour';
import { createEventFormStore } from '@/stores/createEventFormStore'

const CreateEvent = () => {
  const [loading, setLoading] = useState(false);
  const { inputs } = createEventFormStore();

  return (
    <div className='flex flex-col h-auto justify-center items-center relative'>
      <Image
        src="/images/vector7.2.svg"
        alt="Ellipse"
        width={400}
        height={229}
        className="hidden xl:flex absolute top-[30px] left-[650px] object-cover blur-xl w-[400px] h-[229px]"
      />
      <div className="flex flex-col xl:flex-row justify-center items-center gap-5 md:gap-x-36 text-white-1 mt-10 md:mt-20 w-[350px] md:w-[750px] xl:w-[1123px] md:min-h-[850px] md:h-auto z-10 ">
        <div className='flex'>
          <h2 className="text-2xl md:text-5xl font-normal text-center md:text-start">Host event</h2>
        </div>
        <div className='w-[350px] max-h-[850px] overflow-scroll md:min-w-[543px] min-h-[850px] pb-6 border relative rounded-2xl border-[rgba(255,255,255,0.2)] bg-[#ffffff]/10'>
          <div className='absolute w-[250px] md:w-[450px] h-auto mb-4 top-10 left-10 flex flex-col'>
            <Progress value={inputs.progress} max={100} className='z-[99]' id="progress" />
            {inputs.step === 1 && (
              <StepOne />
            )}
            {inputs.step === 2 && (
              <StepTwo />
            )}
            {inputs.step === 3 && (
              <StepThree />
            )}
            {inputs.step === 4 && (
              <StepFour />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateEvent