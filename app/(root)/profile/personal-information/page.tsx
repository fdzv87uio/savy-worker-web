'use client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getProfile, updateUserProfile } from '@/utils/profileUtils';
import { getCookie } from 'cookies-next';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Spinner } from '@/components/ui/spinner';
import { toast } from 'sonner';

type Inputs = {
  profileType: string;
  name: string;
  lastname: string;
  // id: number;
  birthDate: Date;
  email: string;
  // password: string;
}

const PersonalInformation = () => {
  const [email, setEmail] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isGettingUserInfo, setIsGettingUserInfo] = useState(false);

  const token = getCookie('curcle-auth-token') as string;

  // Yup validation rules
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const validationSchema = Yup.object().shape({
    profileType: Yup.string()
      .required('Profile type is required'),
    name: Yup.string()
      .required('Name is required'),
    lastname: Yup.string()
      .required('Lastname is required'),
    // id: Yup.number()
    //   .required('Id is required'),
    birthDate: Yup.date()
      .max(new Date(), 'Future date not allowed')
      .required('Date of Birth is required')
      .test('is-adult', 'You must be at least 18 years old', (value) => {
        const currentDate = new Date();
        const eighteenYearsAgo = new Date(currentDate);
        eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
        return value <= eighteenYearsAgo;
      }),
    email: Yup.string()
      .matches(emailRegex, 'Invalid email')
      .email('Email is invalid')
      .required('Email is required'),
    // password: Yup.string()
    //   .min(8, 'Password must be at least 8 characters long')
    //   .required('Password is required'),
  });

  // Form options
  const formOptions = {
    resolver: yupResolver(validationSchema),
    mode: 'onChange' as const,
  };

  const { control, handleSubmit, reset, formState: { errors } } = useForm<Inputs>({
    ...formOptions,
    defaultValues: {
      profileType: 'private',
      name: '',
      lastname: '',
      // id:0,
      // birthDate:new Date(),
      email: '',
      // password: '',
    }
  });

  useEffect(() => {
    async function getUserInfo(token: string) {
      setIsGettingUserInfo(true)
      const res: any = await getProfile(token);
      if (res && res.status === 'success') {
        setEmail(res.data.email);
        reset({
          name: res.data.name || '',
          lastname: res.data.lastname || '',
          email: res.data.email || '',
          birthDate: new Date(res.data.birthDate) || '',
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
        type: data.profileType,
        name: data.name,
        lastname: data.lastname,
        email: data.email,
        birthDate: data.birthDate
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
      <div className="flex flex-col xl:flex-row justify-center items-center gap-5 md:gap-x-36 text-white-1 mt-10 md:mt-20 w-[350px] md:w-[750px] xl:w-[1123px] md:min-h-[650px] z-10">
        <div className='flex'>
          <h2 className="text-2xl md:text-5xl font-normal text-center md:text-start">Personal Information</h2>
        </div>
        <div className='w-[350px] md:min-w-[543px] min-h-[516px] border relative rounded-2xl border-[rgba(255,255,255,0.2)] bg-[#ffffff]/10'>
          <div className="flex items-center bg-[url('/images/card-bg.png')] bg-cover bg-left-bottom opacity-10 min-h-[650px]"></div>
          <div className='absolute w-[250px] md:w-[450px] top-10 left-10 flex flex-col'>
            <form className='absolute w-[250px] md:w-[450px] flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
              {/* Profile type */}
              <div className='flex flex-col gap-[5px]'>
                <Label className={`font-mono text-base`}>Profile type</Label>
                <Controller
                  name="profileType"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup {...field} onValueChange={field.onChange} className='flex'>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="private" />
                        <Label className={"font-mono"}>Private</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="public" />
                        <Label className={"font-mono"}>Public</Label>
                      </div>
                    </RadioGroup>
                  )}
                />
                {errors.profileType && <span className="text-red-500">{errors.profileType.message}</span>}
              </div>

              {/* Name */}
              <div className="flex flex-col items-left gap-[5px]">
                <Controller
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="text"
                    />
                  )}
                />
                {!errors.name && (
                  <p className={`pl-2 text-[#ffffff] font-normal font-mono text-sm`}>Enter your name</p>
                )}
                {errors.name && (
                  <p className={`pl-2 text-red-300 font-bold font-mono text-sm`}>{errors.name.message}</p>
                )}
              </div>

              {/* Lastname */}
              <div className="flex flex-col items-left gap-[5px]">
                <Controller
                  control={control}
                  name="lastname"
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="text"
                    />
                  )}
                />
                {!errors.lastname && (
                  <p className={`pl-2 text-[#ffffff] font-normal font-mono text-sm`}>Enter your lastname</p>
                )}
                {errors.lastname && (
                  <p className={`pl-2 text-red-300 font-bold font-mono text-sm`}>{errors.lastname.message}</p>
                )}
              </div>

              {/* id */}
              {/* <div className="flex flex-col items-left gap-[5px]">
                <Controller
                  control={control}
                  name="id"
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="text"
                    />
                  )}
                />
                {!errors.id && (
                  <p className={`pl-2 text-[#ffffff] font-normal font-mono text-sm`}>Enter your ID</p>
                )}
                {errors.id && (
                  <p className={`pl-2 text-red-300 font-bold font-mono text-sm`}>{errors.id.message}</p>
                )}
              </div> */}

              {/* birthDate */}
              <div className="flex flex-col items-left gap-[5px]">
                <Controller
                  control={control}
                  name="birthDate"
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="date"
                      value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''} // Formatea la fecha como string
                      onChange={(e) => field.onChange(e.target.value)} // Asegura que los cambios se manejen como string
                    />
                  )}
                />
                {!errors.birthDate && (
                  <p className={`pl-2 text-[#ffffff] font-normal font-mono text-sm`}>Enter your Date of Birth</p>
                )}
                {errors.birthDate && (
                  <p className={`pl-2 text-red-300 font-bold font-mono text-sm`}>{errors.birthDate.message}</p>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col items-left gap-[5px]">
                <Controller
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="email"
                    />
                  )}
                />
                {!errors.email && (
                  <p className={`pl-2 text-[#ffffff] font-normal font-mono text-sm`}>Enter your email address</p>
                )}
                {errors.email && (
                  <p className={`pl-2 text-red-300 font-bold font-mono text-sm`}>{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              {/* <div className="flex flex-col items-left gap-[5px]">
                <Controller
                  control={control}
                  name="password"
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="password"
                    />
                  )}
                />
                {!errors.password && (
                  <p className={`pl-2 text-[#ffffff] font-normal font-mono text-sm`}>Your password must be at least 8 characters</p>
                )}
                {errors.password && (
                  <p className={`pl-2 text-red-300 font-bold font-mono text-sm`}>{errors.password.message}</p>
                )}
              </div> */}

              {/* <Button type="submit" variant="default" size="sm" className={`w-[95px] h-[36px] px-4 py-2 text-sm font-normal font-mono mt-3`}>
                Save
              </Button> */}
              <div className='w-full flex'>
                <Button disabled={isUploading || isGettingUserInfo} type="submit" variant="default" size="sm" className={`w-[200px] h-[36px] px-4 py-2 text-sm font-normal font-mono mt-3`}>
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
};

export default PersonalInformation;