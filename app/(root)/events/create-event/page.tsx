'use client'
import { Input } from '@/components/ui/input';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Inter } from "next/font/google";
import { Button } from '@/components/ui/button';
import { useForm, Controller } from 'react-hook-form';
const inter = Inter({ subsets: ["latin"] });
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { toast } from 'sonner';
import { InputFile } from '@/components/ui/inputFile';

const CreateEvent = () => {
  const [loading, setLoading] = useState(false);

  // Yup validation rules
  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required('Title is required'),
    description: Yup.string()
      .required('Description is required'),
    date: Yup.date()
      .required('Date and Time is required')
    ,
    location: Yup.string()
      .min(2, 'Location is too small')
      .required('Location is required'),
  });

  // Form options
  const formOptions: any = {
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  };

  //Submit button activator
  function isButtonDisabled() {
    const formData = control._formValues;
    if (!formData.title || !formData.description || !formData.date || !formData.location) {
      return true;
    } else {
      return false;
    }
  }

  // React Hook Form
  const { control, handleSubmit, setValue, formState: { errors } } = useForm(formOptions);

  // Submission handler
  async function onSubmit(data: any) {
    console.log('data', data);

    // setLoading(true);
    // setLoading(false);
    toast.success("Login Successful!");
  }

  return (
    <div className='flex flex-col justify-center items-center relative'>
      <Image
        src="/images/vector7.2.svg"
        alt="Ellipse"
        width={800}
        height={429}
        className="hidden xl:flex absolute top-[0px] left-[550px] object-cover blur-xl"
      />
      <div className="flex flex-col xl:flex-row justify-center items-center gap-5 md:gap-x-36 text-white-1 mt-10 md:mt-20 w-[350px] md:w-[750px] xl:w-[1123px] md:min-h-[650px] z-10 ">
        <div className='flex'>
          <h2 className="text-2xl md:text-5xl font-normal text-center md:text-start">Host event</h2>
        </div>
        <div className='w-[350px] md:min-w-[543px] min-h-[516px] border relative rounded-2xl border-[rgba(255,255,255,0.2)] bg-[#ffffff]/10'>
          <div className="flex items-center bg-[url('/images/card-bg.png')] bg-cover bg-left-bottom opacity-10 min-h-[650px] ">
          </div>
          <form className='absolute w-[250px] md:w-[450px] top-10 left-10 flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
            <div className='flex gap-5'>
              <Button variant="primary" size="sm" className={`text-xs font-normal ${inter.className} gap-1 px-2 py-1`}>
                <Image src="/icons/privacy.svg" alt='icon' width={15} height={15} className='w-[18px] h-[18px]' />
                PRIVATE
              </Button>
              <Button variant="secondary" size="sm" className={`text-xs font-normal ${inter.className} gap-1 px-2 py-1`}>
                PUBLIC
                <Image src="/icons/public.svg" alt='icon' width={15} height={15} className='w-[18px] h-[18px]' />
              </Button>
            </div>
            {/* title */}
            <div className="flex flex-col items-left gap-[5px]">
              <Controller
                control={control}
                name="title"
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    placeholder='Event title'
                  />
                )}
              />
              {!errors.title && (
                <p className={`pl-2 text-[#ffffff] font-normal ${inter.className} text-sm`}>Enter your event title</p>
              )}
              {errors.title && errors.title.message && (
                <p className={`pl-2 text-red-300 font-bold ${inter.className} text-sm`}>{`${errors.title.message}`}</p>
              )}
            </div>
            {/* description*/}
            <div className="flex flex-col items-left gap-[5px]">
              <Controller
                control={control}
                name="description"
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    placeholder='Event description'
                  />
                )}
              />
              {!errors.description && (
                <p className={`pl-2 text-[#ffffff] font-normal ${inter.className} text-sm`}>Enter your event description</p>
              )}
              {errors.description && errors.description.message && (
                <p className={`pl-2 text-red-300 font-bold ${inter.className} text-sm`}>{`${errors.description.message}`}</p>
              )}
            </div>
            {/* file*/}
            <div className="flex flex-col items-left gap-[5px]">
              <p className={`pl-2 text-[#ffffff] font-normal ${inter.className} text-sm`}>Upload files</p>
              <Controller
                control={control}
                name="file"
                render={({ field }) => (
                  <InputFile
                    {...field}
                    placeholder='Event file'
                  />
                )}
              />
              {!errors.file && (
                <p className={`pl-2 text-[#ffffff] font-normal ${inter.className} text-sm`}>Share any relevant documents or media</p>
              )}
              {errors.file && errors.file.message && (
                <p className={`pl-2 text-red-300 font-bold ${inter.className} text-sm`}>{`${errors.file.message}`}</p>
              )}
            </div>
            {/* date*/}
            <div className="flex flex-col items-left gap-[5px]">
              <Controller
                control={control}
                name="date"
                render={({ field }) => (
                  <Input
                    {...field}
                    type="datetime-local"
                    placeholder='Event Date and Time'
                  />
                )}
              />
              {!errors.date && (
                <p className={`pl-2 text-[#ffffff] font-normal ${inter.className} text-sm`}>Select date and time</p>
              )}
              {errors.date && errors.date.message && (
                <p className={`pl-2 text-red-300 font-bold ${inter.className} text-sm`}>{`${errors.date.message}`}</p>
              )}
            </div>
            {/* location */}
            <div className="flex flex-col items-left gap-[5px]">
              <Controller
                control={control}
                name="location"
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    placeholder='Event Location'
                  />
                )}
              />
              {!errors.location && (
                <p className={`pl-2 text-[#ffffff] font-normal ${inter.className} text-sm`}>Enter event location</p>
              )}
              {errors.location && errors.location.message && (
                <p className={`pl-2 text-red-300 font-bold ${inter.className} text-sm`}>{`${errors.location.message}`}</p>
              )}
            </div>
            <Button disabled={isButtonDisabled()} type="submit" variant="primary" size="sm" className={`w-[95px] h-[36px] px-4 py-2 text-sm font-normal ${inter.className} mt-3`}>
              {loading ? "..." : "Create"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateEvent