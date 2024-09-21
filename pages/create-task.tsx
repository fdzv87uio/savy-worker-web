'use client'
import React, { createRef, useEffect, useState } from 'react'
import { Progress } from '@/components/ui/progress';
import { createTaskFormStore } from '@/stores/createTaskFormStore'
import Footer from '@/components/Footer';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import Link from 'next/link';
import StepOne from '@/components/forms/createTask/StepOne';
import StepTwo from '@/components/forms/createTask/StepTwo';
import StepThree from '@/components/forms/createTask/StepThree';
import StepFour from '@/components/forms/createTask/StepFour';
import GeneralLayout from '@/components/GeneralLayout';

const CreateTask = () => {
    const { inputs } = createTaskFormStore();

    return (
        <div id='top' className='flex flex-col h-full mt-[20px] w-full justify-center relative'>
            <div className="grid grid-cols-2 w-full h-[100vh]">
                <div className='flex flex-col col-span-1 w-full relative justify-center item-center'>
                    <div className="flex flex-col mt-[5rem] items-left h-[400px] ml-[12rem] text-secondary md:text-5xl relative font-normal">
                        <h3 className='text-2xl text-[#000000]/30'>Create Task</h3>
                        {inputs.step === 1 && (
                            <h1 className="mt-3 text-secondary font-normal" >1. General Information</h1>
                        )}
                        {inputs.step === 2 && (
                            <h1 className="mt-3 text-secondary font-normal">2. Location</h1>
                        )}
                        {inputs.step === 3 && (
                            <h1 className="mt-3 text-secondary font-normal">3. Schedule</h1>
                        )}
                        {inputs.step === 4 && (
                            <h1 className="mt-3 text-secondary font-normal">4. Other Information</h1>
                        )}
                    </div>
                </div>
                <div className='w-full col-span-1 flex flex-col items-center overflox-x-hidden overflow-y-scroll mb-[100px] md:min-w-[543px] flex-grow h-auto'>
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
    )
}

export default CreateTask