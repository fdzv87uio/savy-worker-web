'use client';
import { Input } from '@/components/ui/input';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Inter } from "next/font/google";
import { Button, buttonVariants } from '@/components/ui/button';
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
import platform from 'platform';
import { TransactionType } from '@/interfaces/transactionInterfaces';
import { getIpData } from '@/utils/ipUtils';
import { createTransaction } from '@/utils/transactionUtils';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Loader2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  // Form props


  // Yup validation rules
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .matches(emailRegex, "Invalid email")
      .email('Email is invalid'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters long')
      .required('Password is required'),
  });
  //Form options
  const formOptions: any = {
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  };
  //react-hook-forms 
  const { handleSubmit, register, formState: { errors } } = useForm<any>(formOptions);


  const [ip, setIp] = useState('');
  const router = useRouter();
  const { setAuthToken } = useAuthTokenStore();
  // Effect to retrieve IP Address
  useEffect(() => {
    getData();
  }, [])

  async function getData() {
    const ipData = await getIpData();
    setIp(ipData.ip)

  }


  // Submission handler
  async function onSubmit(info: any) {
    const data: any = {
      email: info.email,
      password: info.password,
    };
    setLoading(true);
    if (data.email && data.password) {
      // Set Info for new Transaction
      const os = platform.os?.family ? platform.os?.family : "n/a";
      const browser = platform.name ? platform.name : "n/a";
      const version = platform.version ? platform.version : "n/a";
      const device = platform.product ? platform.product : "n/a";
      const location = "Miami, USA"; // This is a Provisional Prop
      const now = new Date().toUTCString();
      const newData: TransactionType = {
        userEmail: data.email,
        transactionType: "register",
        os: os,
        browser: browser,
        version: version,
        device: device,
        location: location,
        ip: ip,
        datetime: now,
      }
      const salt = bcrypt.genSaltSync(12);
      const hashedPassword = bcrypt.hashSync(data.password, salt);
      const res: any = await createAccount(data.email, hashedPassword);
      if (res.status === 'error') {
        setLoading(false);
        const msg = res.error.response.data.message ? res.error.response.data.message : 'Invalid Credentials';
        toast.error("Error: " + msg);
      } else if (res.status === "success") {
        // Create User Register Transaction
        await createTransaction(newData);
        const newToken = res.data.dataAuthRegister.accessToken;
        setCookie('savy-auth-token', newToken, {
          maxAge: 604800,
          path: '/',
        });
        setCookie('savy-user-email', data.email, {
          maxAge: 604800,
          path: '/',
        });


        setAuthToken(newToken);
        setLoading(false);
        toast.success("Login Successful!");
        router.push('/');
      }
    }
  }

  const variants = {
    hidden: { opacity: 0, x: -200, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
  }


  return (
    <div>
      <motion.main
        variants={variants}
        initial="hidden"
        animate="enter"
        transition={{ type: "linear" }}
      >
        <div className='container overflow-visible z-[99] h-screen relative flex flex-col items-center lg:px-0'>
          <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
            <div className='flex flex-col items-center text-center'>
              <h1 className='text-2xl font-semibold tracking-tight'>
                Register Your Account
              </h1>

              <Link
                className={`${buttonVariants({
                  variant: 'link',
                  className: 'gap-1.5',
                })} font-mono text-normal`}
                href='/sign-in'>
                Already Have an Account? LOGIN
                <ArrowRight className='h-4 w-4' />
              </Link>
            </div>

            <div className='grid gap-3'>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className='grid gap-2'>
                  <div className='grid gap-1 py-1'>
                    <Label htmlFor='email'>Email</Label>
                    <Input
                      {...register('email')}
                      className={cn({
                        'focus-visible:ring-red-500':
                          errors.email,
                      })}
                      placeholder='example@email.com'
                    />
                    {errors?.email && (
                      <p className='text-sm text-red-500 font-mono text-normal'>
                        {errors.email.message?.toString()}
                      </p>
                    )}
                  </div>

                  <div className='grid gap-1 py-1'>
                    <Label htmlFor='password'>Password</Label>
                    <Input
                      {...register('password')}
                      type='password'
                      className={cn({
                        'focus-visible:ring-red-500':
                          errors.password,
                      })}
                      placeholder='Password'
                    />
                    {errors?.password && (
                      <p className='text-sm text-red-500 font-mono text-normal'>
                        {errors.password.message?.toString()}
                      </p>
                    )}
                  </div>
                  <div className='w-full text-xs font-mono text-normal mb-3'>
                    By creating this account, you accept out <a className='text-blue-600' href='/terms-and-conditions'>Terms and Conditions</a>, as well as our <a className='text-blue-600' href="/privacy-policy">Privacy Policy</a>.
                  </div>

                  <Button className='bg-secondary' disabled={loading}>
                    {loading && (
                      <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    )}
                    Register
                  </Button>
                </div>
              </form>
            </div>
          </div>
          <Footer />
        </div>
      </motion.main>
    </div>
  )
}

export default SignUp;
