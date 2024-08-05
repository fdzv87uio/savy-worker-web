'use client'
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
import { getProfile, updateUserProfile } from '@/utils/profileUtils';
import Image from "next/image";
import { getCookie } from "cookies-next";
import { Spinner } from '@/components/ui/spinner';
import { toast } from 'sonner';

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

const Preference = () => {
  const [prefOptions, setPrefOptions] = useState<any>({})
  const [categories, setCategories] = useState<any[]>([]);
  const [currentPrefs, setCurrentPrefs] = useState<any[]>([])
  const [currentPrefsIds, setCurrentPrefsIds] = useState<any[]>([])

  const [email, setEmail] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isGettingUserInfo, setIsGettingUserInfo] = useState(false);

  const token = getCookie('curcle-auth-token') as string;

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

  useEffect(() => {
    async function getUserInfo(token: string) {
      setIsGettingUserInfo(true)
      const res: any = await getProfile(token);
      if (res && res.status === 'success') {
        setEmail(res.data.email);
        setIsGettingUserInfo(false);
        setCurrentPrefs(res.data.preferences.map((p: any) => p.name));
        setCurrentPrefsIds(res.data.preferences.map((p: any) => p._id));
      }
    }
    getUserInfo(token);
  }, [token]);

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

  }

  const { control, handleSubmit, watch, formState: { errors } } = useForm<Inputs>({ defaultValues });
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsUploading(true)
    try {
      const updateData = {
        preferences: currentPrefsIds
      };
      await updateUserProfile(token, email, updateData);
      setIsUploading(false);
      toast.success("Update Success");
    } catch (error) {
      if (error instanceof Error) {
        const errorMsg = error.message || 'Error uploading profile';
        toast.error("Error: " + errorMsg);
      } else {
        toast.error("An unknown error occurred");
      }
      setIsUploading(false);
    }
  };

  return (
    <div className='flex flex-col justify-center items-center relative'>
      <Image
        src="/images/vector7.2.svg"
        alt="Ellipse"
        width={400}
        height={229}
        className="hidden xl:flex absolute top-[30px] left-[850px] object-cover blur-xl w-[400px] h-[229px]"
      />
      <div className="flex flex-col xl:flex-row justify-center items-center gap-5 md:gap-x-36 text-white-1 mt-10 md:mt-20 w-[350px] md:w-[750px] xl:w-[1123px] md:min-h-[550px] z-10 ">
        <div className='flex'>
          <h2 className="text-2xl md:text-5xl font-normal text-center md:text-start">Preferences</h2>
        </div>
        <div className='w-[350px] md:min-w-[543px] min-h-[516px] border relative rounded-2xl border-[rgba(255,255,255,0.2)] bg-[#ffffff]/10'>
          <div className="flex items-center bg-[url('/images/card-bg.png')] bg-cover bg-left-bottom opacity-10 min-h-[550px] ">
          </div>
          <div className='absolute w-[250px] md:w-[450px] top-10 left-10 flex flex-col'>
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
                              <div onClick={() => handlePreferenceClick(item.name, item.id)} className={`cursor-pointer h-[25px] px-[10px] ${inter.className} w-auto rounded-2xl ${currentPrefs.includes(item.name) ? "bg-secondary-1" : "bg-primary-1"}`}>{item.name}</div>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                  )
                })}
              </div>
              <div className='w-full flex'>
                <Button disabled={isUploading || isGettingUserInfo} type="submit" variant="primary" size="sm" className={`w-[200px] h-[36px] px-4 py-2 text-sm font-normal ${inter.className} mt-3`}>
                  Save
                  {isUploading && <Spinner className="ml-3 w-5 h-5" />}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Preference