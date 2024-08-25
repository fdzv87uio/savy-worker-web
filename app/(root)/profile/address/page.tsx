'use client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Inter } from 'next/font/google';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getProfile, updateUserProfile } from '@/utils/profileUtils';
import { getCookie } from 'cookies-next';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';

const inter = Inter({ subsets: ["latin"] });

type Inputs = {
  street?: string;
  address?: string;
  optional?: string;
  city?: string;
  postalCode?: string;
};

const validationSchema: Yup.ObjectSchema<Inputs> = Yup.object({
  street: Yup.string()
    // .min(10, "Address is too small")
    .optional(),
  address: Yup.string()
    .min(10, "Address is too small")
    .optional(),
  optional: Yup.string()
    .optional(),
  city: Yup.string()
    .min(3, "City is too small")
    .optional(),
  postalCode: Yup.string()
    .min(5, "Postal Code is too small")
    .optional(),
});

const Address = () => {
  const [email, setEmail] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isGettingUserInfo, setIsGettingUserInfo] = useState(false);

  const token = getCookie('curcle-auth-token') as string;

  const { control, handleSubmit, reset, formState: { errors } } = useForm<Inputs>({
    defaultValues: {
      street: '',
      address: '',
      optional: '',
      city: '',
      postalCode: '',
    },
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  useEffect(() => {
    async function getUserInfo(token: string) {
      setIsGettingUserInfo(true);
      const res: any = await getProfile(token);
      if (res && res.status === 'success') {
        setEmail(res.data.email);
        reset({
          street: res.data.street || '',
          address: res.data.address || '',
          optional: res.data.addressDetails || '',
          city: res.data.city || '',
          postalCode: res.data.postalCode || '',
        });
        setIsGettingUserInfo(false);
      }
    }
    getUserInfo(token);
  }, [token, reset]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsUploading(true)
    try {
      const updateData = {
        street: data.street,
        address: data.address,
        optional: data.optional,
        city: data.city,
        postalCode: data.postalCode,
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
      <div className="flex flex-col xl:flex-row justify-center items-center gap-5 md:gap-x-36 text-white-1 mt-10 md:mt-20 w-[350px] md:w-[750px] xl:w-[1123px] md:min-h-[550px] z-10">
        <div className='flex'>
          <h2 className="text-2xl md:text-5xl font-normal text-center md:text-start">Address</h2>
        </div>
        <div className='w-[350px] md:min-w-[543px] min-h-[516px] border relative rounded-2xl border-[rgba(255,255,255,0.2)] bg-[#ffffff]/10'>
          <div className="flex items-center bg-[url('/images/card-bg.png')] bg-cover bg-left-bottom opacity-10 min-h-[550px]">
          </div>
          <div className='absolute w-[250px] md:w-[450px] top-10 left-10 flex flex-col'>
            <form className={`absolute w-[250px] md:w-[450px] flex flex-col gap-4`} onSubmit={handleSubmit(onSubmit)}>

              {/* street */}
              <div className="flex flex-col items-left gap-[5px]">
                <Controller
                  control={control}
                  name="street"
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="text"
                      placeholder='Enter your street address'
                    />
                  )}
                />
                {!errors.street && (
                  <p className={`pl-2 text-[#ffffff] font-normal ${inter.className} text-sm`}>Include house number</p>
                )}
                {errors.street && errors.street.message && (
                  <p className={`pl-2 text-red-300 font-bold ${inter.className} text-sm`}>{errors.street.message}</p>
                )}
              </div>

              {/* address */}
              <div className="flex flex-col items-left gap-[5px]">
                <Controller
                  control={control}
                  name="address"
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="text"
                      placeholder='Enter your address'
                    />
                  )}
                />
                {!errors.address && (
                  <p className={`pl-2 text-[#ffffff] font-normal ${inter.className} text-sm`}>Street address, P.O. box, company name, c/o</p>
                )}
                {errors.address && errors.address.message && (
                  <p className={`pl-2 text-red-300 font-bold ${inter.className} text-sm`}>{errors.address.message}</p>
                )}
              </div>

              {/* optional */}
              <div className="flex flex-col items-left gap-[5px]">
                <Controller
                  control={control}
                  name="optional"
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="text"
                      placeholder='Apartment, suite, unit, floor, building, etc.'
                    />
                  )}
                />
                {!errors.optional && (
                  <p className={`pl-2 text-[#ffffff] font-normal ${inter.className} text-sm`}>Optional</p>
                )}
                {errors.optional && errors.optional.message && (
                  <p className={`pl-2 text-red-300 font-bold ${inter.className} text-sm`}>{errors.optional.message}</p>
                )}
              </div>

              {/* city */}
              <div className="flex flex-col items-left gap-[5px]">
                <Controller
                  control={control}
                  name="city"
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="text"
                      placeholder='Enter your city'
                    />
                  )}
                />
                {!errors.city && (
                  <p className={`pl-2 text-[#ffffff] font-normal ${inter.className} text-sm`}>Enter your city name</p>
                )}
                {errors.city && errors.city.message && (
                  <p className={`pl-2 text-red-300 font-bold ${inter.className} text-sm`}>{errors.city.message}</p>
                )}
              </div>

              {/* postalCode */}
              <div className="flex flex-col items-left gap-[5px]">
                <Controller
                  control={control}
                  name="postalCode"
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="text"
                      placeholder='Enter your postal code'
                    />
                  )}
                />
                {!errors.postalCode && (
                  <p className={`pl-2 text-[#ffffff] font-normal ${inter.className} text-sm`}>Enter your postal code</p>
                )}
                {errors.postalCode && errors.postalCode.message && (
                  <p className={`pl-2 text-red-300 font-bold ${inter.className} text-sm`}>{errors.postalCode.message}</p>
                )}
              </div>

              <div className='w-full flex'>
                <Button disabled={isUploading || isGettingUserInfo} type="submit" variant="default" size="sm" className={`w-[200px] h-[36px] px-4 py-2 text-sm font-normal ${inter.className} mt-3`}>
                  Save
                  {isUploading && <Spinner className="ml-3 w-5 h-5" />}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Address;
