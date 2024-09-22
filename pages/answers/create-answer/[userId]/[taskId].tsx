'use client'
import React, { createRef, useEffect, useState } from 'react'
import { Progress } from '@/components/ui/progress';
import { createTaskFormStore } from '@/stores/createTaskFormStore'
import Footer from '@/components/Footer';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import Link from 'next/link';

import StepOne from '@/components/forms/createAnswer/StepOne';
import StepTwo from '@/components/forms/createAnswer/StepTwo';
import StepThree from '@/components/forms/createAnswer/StepThree';
import { createAnswerFormStore } from '@/stores/createAnswerFormStore';
// import { useParams } from 'next/navigation';
import { getTaskById } from '@/utils/taskUtils';
import { useRouter } from 'next/router';
import { usePathname } from 'next/navigation';

const CreateAnswer = () => {
    const { inputs } = createAnswerFormStore();

    const pathname = usePathname();
    console.log(pathname);
    const [currentTitle, setCurrentTitle] = useState("");
    const [currentClasses, setCurrentClasses] = useState([]);

    useEffect(() => {
        if (pathname) {
            const pathArray = pathname.split("/");
            const taskId = pathArray[4];
            getTaskData(taskId)
        }
    }, [pathname])

    async function getTaskData(id: string) {
        const res: any = await getTaskById(id);
        if (res.status === "success") {
            console.log(res.data);
            setCurrentTitle(res.data.title);
            setCurrentClasses(res.data.classes);
        }
    }

    return (
        <div id='top' className='flex flex-col h-full w-full pt-[30px] justify-center relative'>
            <div className="grid grid-cols-2 w-full h-[100vh]">
                <div className='flex flex-col col-span-1 w-full relative justify-center item-center'>
                    <div className="flex flex-col mt-[5rem] items-left h-[400px] ml-[12rem] text-secondary md:text-5xl relative font-normal">
                        <h3 className='text-2xl text-[#000000]/30'>Create Answer</h3>
                        {inputs.step === 1 && (
                            <h1 className="mt-3 text-secondary font-normal" >1. Time & Location</h1>
                        )}
                        {inputs.step === 2 && (
                            <h1 className="mt-3 text-secondary font-normal">2. Description</h1>
                        )}
                        {inputs.step === 3 && (
                            <h1 className="mt-3 text-secondary font-normal">3. Sample Upload </h1>
                        )}
                    </div>
                </div>
                <div className='w-full col-span-1 flex flex-col items-center overflow-scroll pt-[50px] pb-[100px] md:min-w-[543px] flex-grow h-auto'>
                    {inputs.step === 1 && (
                        <StepOne />
                    )}
                    {inputs.step === 2 && (
                        <StepTwo />
                    )}
                    {inputs.step === 3 && (
                        <StepThree title={currentTitle} classes={currentClasses} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default CreateAnswer