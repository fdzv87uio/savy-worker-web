/* eslint-disable @next/next/no-img-element */
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Inter } from "next/font/google";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createEventFormStore } from '@/stores/createEventFormStore'
import { useEffect, useState } from "react";
import { getAllPreferences, getAllPreferencesByCategory } from "@/utils/preferencesUtils";

const inter = Inter({ subsets: ["latin"] });

type Inputs = {
    eventType: string;
    title: string;
    description: string;
    recurring: string;
    frequency: string;
    date: string;
    online: string;
    location: string;
}

const defaultValues: Inputs = {
    eventType: "",
    title: "",
    description: "",
    recurring: "",
    frequency: "",
    date: "",
    online: "",
    location: ""
};

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

export default function StepThree() {
    const { inputs, setInputs } = createEventFormStore();
    const [prefOptions, setPrefOptions] = useState<any>({})
    const [preferences, setPreferences] = useState('');
    const [categories, setCategories] = useState<any[]>([]);
    const [currentPrefs, setCurrentPrefs] = useState<any[]>([])
    const [currentPrefsIds, setCurrentPrefsIds] = useState<any[]>([])

    useEffect(() => {
        async function getData() {
            const allPrefs: any = await getAllPreferencesByCategory();
            const allPrefsList: any = await getAllPreferences();
            if (allPrefs?.status === "success" && allPrefsList?.status === "success") {
                setPrefOptions(allPrefs.data);
                const keysArray = Object.keys(allPrefs.data);
                setCategories(keysArray);
            }
        }
        getData();
    }, [])

    const handlePreferenceClick = (preference: string, id: string) => {
        // Clonar el array actual de preferencias para trabajar con una copia
        let updatedPrefs = [...currentPrefs];
        let updatedPrefsIds = [...currentPrefsIds];

        if (!updatedPrefs.includes(preference)) {
            // Agregar la preferencia si no está presente
            updatedPrefs.push(preference);
            updatedPrefsIds.push(id);
        } else {
            // Quitar la preferencia si ya está presente
            updatedPrefs = updatedPrefs.filter((pref: string) => pref !== preference);
            updatedPrefsIds = updatedPrefsIds.filter((idx: string) => idx !== id);
        }

        setCurrentPrefs(updatedPrefs);
        setCurrentPrefsIds(updatedPrefsIds);

        setInputs({ ...inputs, prefe: updatedPrefs, prefeIds: updatedPrefsIds });

    }

    const { control, handleSubmit, watch, formState: { errors } } = useForm<Inputs>({ defaultValues });
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const updatedData = { ...inputs, step: 4, progress: 75 };
        setInputs(updatedData);
    };

    const handleBackClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const updatedData = { ...inputs, step: 2, progress: 25 };
        setInputs(updatedData);
    };

    return (
        <form className={`absolute w-[250px] md:w-[450px] mt-12 flex flex-col gap-4`} onSubmit={handleSubmit(onSubmit)}>
            <h1 className='text-2xl'>Select Your Preferences</h1>
            <div className='w-full flex flex-col'>
                {categories.length > 0 && categories.map((x: any, key: number) => {
                    let Prefs = prefOptions[x];
                    return (
                        <div className='w-full h-auto flex flex-col items-left mb-[20px]' key={`category_${key}`}>
                            <div className='flex flex-row gap-[10px] items-center mb-[10px]'>
                                <div className='w-[59px] h-[59px] bg-primary-1 rounded-full flex flex-col justify-center items-center'>
                                    <img src="/images/gaming-icon.png" width={36} height={36} alt="icon" />
                                </div>
                                <p className='text-2xl'>{x}</p>
                            </div>
                            <div className='w-full h-auto flex flex-row border border-[#C4C4C4] rounded-lg gap-[10px] py-[17px] px-[10px]'>
                                {Prefs.map((item: any, k: number) => {
                                    return (
                                        < div key={`pref_${k}`}>
                                            <div onClick={() => handlePreferenceClick(item.name, item.id)} className={`cursor-pointer h-[25px] px-[10px] ${inter.className} w-auto rounded-2xl ${inputs.prefe && inputs.prefe.includes(item.name) ? "bg-secondary-1" : "bg-primary-1"}`}>{item.name}</div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
                <div className='w-full flex flex-row justify-between'>
                    <Button variant="secondary" size="sm" className={`w-[200px] h-[36px] px-4 py-2 text-sm font-normal ${inter.className} mt-3`} onClick={handleBackClick}>
                        Back
                    </Button>
                    <Button type="submit" variant="primary" size="sm" className={`w-[200px] h-[36px] px-4 py-2 text-sm font-normal ${inter.className} mt-3`}>
                        Next
                    </Button>
                </div>
            </div>

        </form>
    );
}
