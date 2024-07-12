'use-client'
import React, { useEffect, useState } from 'react'
import { Inter } from "next/font/google";
import { Button } from '@/components/ui/button';
const inter = Inter({ subsets: ["latin"] });

interface StepThreeProps {
    step: number;
    setStep: any;
    setProgress: any;
    setPreferences: any;
    preferences: string;
    handleSubmit: any;
    prefOptions: any;
    loading: boolean;
}

export default function StepThree({ step, setStep, setProgress, setPreferences, preferences, handleSubmit, prefOptions, loading }: StepThreeProps) {
    const [categories, setCategories] = useState<any[]>([]);
    const [currentPrefs, setCurrentPrefs] = useState<any[]>([])

    useEffect(() => {
        const keysArray = Object.keys(prefOptions);
        setCategories(keysArray);
    }, [])

    useEffect(() => {
        //Reload upon selection
    }, [currentPrefs, preferences])


    //backtrack function
    function backtrack() {
        setProgress(33);
        setStep(2);
    }

    const handlePreferenceClick = (preference: string) => {
        if (!currentPrefs.includes(preference)) {
            const current = currentPrefs;
            current.push(preference);
            console.log(current);
            setCurrentPrefs(currentPrefs)
            const newString = current.join(',');
            console.log(newString);
            setPreferences(newString);
        } else {
            const filtered = currentPrefs.filter((x: any) => x !== preference);
            console.log(filtered);
            setCurrentPrefs(filtered);
            const newString = filtered.join(',');
            console.log(newString);
            setPreferences(newString);
        }

    }

    return (
        <form className='absolute w-[250px] md:w-[450px] mt-12 flex flex-col gap-4'>
            <h1 className='text-2xl'>Select Your Preferences</h1>
            <div className='w-full flex flex-col'>
                {categories.length > 0 && categories.map((x: any, key: number) => {
                    let Prefs = prefOptions[x];
                    return (
                        <div className='w-full h-auto flex flex-col items-left mb-[20px]' key={`category_${key}`}>
                            <div className='flex flex-row gap-[10px] items-center mb-[10px]'>
                                <div className='w-[59px] h-[59px] bg-primary-1 rounded-full flex flex-col justify-center items-center'>
                                    <img src="/images/gaming-icon.png" width={36} height={36} />
                                </div>
                                <p className='text-2xl'>{x}</p>
                            </div>
                            <div className='w-full h-auto flex flex-row border border-[#C4C4C4] rounded-lg gap-[10px] py-[17px] px-[10px]'>
                                {Prefs.map((item: any, k: number) => {
                                    return (
                                        < div key={`pref_${k}`}>
                                            <div onClick={() => handlePreferenceClick(item.name)} className={`cursor-pointer h-[25px] px-[10px] w-auto rounded-2xl ${currentPrefs.includes(item.name) ? "bg-secondary-1" : "bg-primary-1"}`}>{item.name}</div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
                <div className='w-full flex flex-row justify-between'>
                    <Button disabled={preferences === ""} variant="primary" onClick={() => handleSubmit()} size="sm" className={`w-[95px] h-[36px] px-4 py-2 text-sm font-normal ${inter.className} mt-3`}>
                        {loading ? "..." : "Submit"}
                    </Button>
                    <Button onClick={() => { backtrack() }} variant="ghost" className={`w-[95px] h-[36px] px-4 py-2 text-sm font-normal ${inter.className} mt-3`}>
                        {`< Back`}
                    </Button>
                </div>
            </div>
        </form >
    )
}