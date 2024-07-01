'use client';
import { Input } from '@/components/ui/input';
import Image from 'next/image'
import React, { useState } from 'react'
import { Inter } from "next/font/google";
import { Button } from '@/components/ui/button';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
const inter = Inter({ subsets: ["latin"] });
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { toast } from 'sonner';
import { setCookie } from 'cookies-next';
import { createAccount } from '@/utils/createAccount';
import { useAuthTokenStore } from '@/stores/authTokenStore'
import bcrypt from 'bcryptjs';

const preferences = [
  {
    id: 1,
    title: "Running",
  },
  {
    id: 2,
    title: "Gaming",
  },
  {
    id: 3,
    title: "Soccer",
  },
  {
    id: 4,
    title: "Basketball",
  },
  {
    id: 5,
    title: "Swimming",
  },
];
const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setAuthToken } = useAuthTokenStore();
  // Yup validation rules

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Name is too small')
      .required('Name is required'),
    lastname: Yup.string()
      .min(2, 'Lastname is too small')
      .required('Lastname is required'),
    dateBirth: Yup.date()
      .max(new Date(), 'Future date not allowed')
      .required('Date of Birth is required')
      .test('is-adult', 'You must be at least 18 years old', (value) => {
        const currentDate = new Date();
        const eighteenYearsAgo = new Date(currentDate);
        eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
        return value <= eighteenYearsAgo;
      }),
    email: Yup.string()
      .matches(emailRegex, "Invalid email")
      .email('Email is invalid'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters long')
      .required('Password is required'),
    address: Yup.string()
      .min(2, 'Address is too small')
      .required('Address is required'),
  });
  //Form options
  const formOptions: any = {
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  };
  //react-hook-forms 
  const { control, handleSubmit, formState: { errors } } = useForm(formOptions);

  //Submit button activator
  function isButtonDisabled() {
    const formData = control._formValues;
    if (!formData.email || !formData.password || !formData.name || !formData.lastname || !formData.dateBirth || !formData.address) {
      return true;
    } else {
      return false;
    }
  }


  //Submission handler
  async function onSubmit(data: any) {
    console.log('data', data);
    data.birthDate = new Date();
    data.documentType = 'Driver Licenses';
    setLoading(true);
    if (data.email && data.password) {
      const salt = bcrypt.genSaltSync(12);
      const hashedPassword = bcrypt.hashSync(data.password, salt);
      const res: any = await createAccount(data.name, data.lastname, data.email, hashedPassword, data.address, data.birthDate, data.documentType);
      console.log(res);
      if (res.status === 'error') {
        setLoading(false);
        const msg = res.error.response.data.message ? res.error.response.data.message : 'Invalid Credentials';
        toast.error("Error: " + msg);
      } else if (res.status === "success") {
        setLoading(false);
        const newToken = res.data.dataAuthRegister.accessToken;
        setCookie('curcle-auth-token', newToken, {
          maxAge: 604800,
          path: '/',
        });
        setAuthToken(newToken);
        toast.success("Login Successful!");
        router.push('/');
      }
    }
  }

  return (
    <div className='flex flex-col justify-center items-center relative'>
      <Image
        src="/images/vector7.2.svg"
        alt="Ellipse"
        width={800}
        height={429}
        className="hidden xl:flex absolute top-[40px] left-[450px] object-cover blur-xl"
      />
      <Image
        src="/images/vector5.2.svg"
        alt="Ellipse"
        width={300}
        height={250}
        className="absolute top-[400px] left-[60px] object-cover blur-md"
      />
      <div className="flex flex-col xl:flex-row justify-center items-center gap-5 text-white-1 mt-10 md:mt-3 w-[350px] md:w-[750px] xl:w-[1123px] md:min-h-[750px] z-10">
        <div className='flex flex-col'>
          <h2 className="text-2xl md:text-5xl font-normal text-center md:text-start">Create Your Account</h2>
          <p className={`text-lg md:text-2xl text-center md:text-start ${inter.className} mt-3`}>Join exciting sporting events and meetings with gamers</p>
        </div>
        <div className='w-[350px] md:min-w-[543px] min-h-[516px] border relative rounded-2xl border-[rgba(255,255,255,0.2)] bg-[#ffffff]/10'>
          <div className="flex items-center bg-[url('/images/card-bg.png')] bg-cover bg-left-bottom opacity-10 min-h-[750px] ">
          </div>
          <form className='absolute w-[250px] md:w-[450px] top-10 left-10 flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
            {/* name */}
            <div className="flex flex-col items-left gap-[5px]">
              <Controller
                control={control}
                name="name"
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    placeholder='Name'
                  />
                )}
              />
              {!errors.name && (
                <p className={`pl-2 text-[#ffffff] font-normal ${inter.className} text-sm`}>Enter your name</p>
              )}
              {errors.name && errors.name.message && (
                <p className={`pl-2 text-red-300 font-bold ${inter.className} text-sm`}>{`${errors.name.message}`}</p>
              )}
            </div>
            {/* lastname*/}
            <div className="flex flex-col items-left gap-[5px]">
              <Controller
                control={control}
                name="lastname"
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    placeholder='Last Name'
                  />
                )}
              />
              {!errors.lastname && (
                <p className={`pl-2 text-[#ffffff] font-normal ${inter.className} text-sm`}>Enter your Last Name</p>
              )}
              {errors.lastname && errors.lastname.message && (
                <p className={`pl-2 text-red-300 font-bold ${inter.className} text-sm`}>{`${errors.lastname.message}`}</p>
              )}
            </div>
            {/* dateBirth*/}
            <div className="flex flex-col items-left gap-[5px]">
              <Controller
                control={control}
                name="dateBirth"
                render={({ field }) => (
                  <Input
                    {...field}
                    type="date"
                    placeholder='Date Birth'
                  />
                )}
              />
              {!errors.dateBirth && (
                <p className={`pl-2 text-[#ffffff] font-normal ${inter.className} text-sm`}>Enter your Date of Birth</p>
              )}
              {errors.dateBirth && errors.dateBirth.message && (
                <p className={`pl-2 text-red-300 font-bold ${inter.className} text-sm`}>{`${errors.dateBirth.message}`}</p>
              )}
            </div>
            {/* email */}
            <div className="flex flex-col items-left gap-[5px]">
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    placeholder='Email'
                  />
                )}
              />
              {!errors.email && (
                <p className={`pl-2 text-[#ffffff] font-normal ${inter.className} text-sm`}>Enter your email address</p>
              )}
              {errors.email && errors.email.message && (
                <p className={`pl-2 text-red-300 font-bold ${inter.className} text-sm`}>{`${errors.email.message}`}</p>
              )}
            </div>
            {/* password */}
            <div className="flex flex-col items-left gap-[5px]">
              <Controller
                control={control}
                name="password"
                render={({ field }) => (
                  <Input
                    {...field}
                    type="password"
                    placeholder='Password'
                  />
                )}
              />
              {!errors.password && (
                <p className={`pl-2 text-[#ffffff] font-normal ${inter.className} text-sm`}>Your password must be at least 8 characters</p>
              )}
              {errors.password && errors.password.message && (
                <p className={`pl-2 text-red-300 font-bold ${inter.className} text-sm`}>{`${errors.password.message}`}</p>
              )}
            </div>
            {/* Address */}
            <div className="flex flex-col items-left gap-[5px]">
              <Controller
                control={control}
                name="address"
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    placeholder='Address (US only)'
                  />
                )}
              />
              {!errors.address && (
                <p className={`pl-2 text-[#ffffff] font-normal ${inter.className} text-sm`}>Enter your location</p>
              )}
              {errors.address && errors.address.message && (
                <p className={`pl-2 text-red-300 font-bold ${inter.className} text-sm`}>{`${errors.address.message}`}</p>
              )}
            </div>
            {/* Preference */}
            <div className="flex flex-col items-left gap-[5px]">
              <Controller
                control={control}
                name="preferences"
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    placeholder='Preferences'
                  />
                )}
              />
              {!errors.preferences && (
                <p className={`pl-2 text-[#ffffff] font-normal ${inter.className} text-sm`}>Enter your preferences</p>
              )}
              {errors.preferences && errors.preferences.message && (
                <p className={`pl-2 text-red-300 font-bold ${inter.className} text-sm`}>{`${errors.preferences.message}`}</p>
              )}
              <div className='relative flex flex-wrap md:flex-nowrap w-[250px] gap-3 mt-1'>
                {preferences.map((preference) => (
                  <div key={preference.id} className={`${inter.className} text-sm bg-primary-1 rounded-full px-3`}>
                    <p >{preference.title}</p>
                  </div>
                )
                )}
              </div>
            </div>
            <Button disabled={isButtonDisabled()} type="submit" variant="primary" size="sm" className={`w-[95px] h-[36px] px-4 py-2 text-sm font-normal ${inter.className} mt-3`}>
              {loading ? "..." : "Sign Up"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp