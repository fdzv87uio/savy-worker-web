/* eslint-disable @next/next/no-img-element */
"use client"

import React, { useEffect, useState } from 'react'
import { Button, buttonVariants } from '@/components/ui/button';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import BlueBlob from '@/public/svgs/blue-blob.svg';
import GrayBlob from '@/public/svgs/gray-blob.svg';
import GreenBlob from '@/public/svgs/green-blob.svg';
import GreenBlob2 from '@/public/svgs/green-blob-2.svg';
import GreenBlobMobile1 from '@/public/svgs/green-blob-mobile-1.svg';
import GreenBlobMobile2 from '@/public/svgs/green-blob-mobile-2.svg';
import BlueBlobMobile1 from '@/public/svgs/blue-blob-mobile-1.svg';
import BlueBlobMobile2 from '@/public/svgs/blue-blob-mobile-2.svg';
import GrayBlobMobile from '@/public/svgs/gray-blob-mobile.svg';
import Image from 'next/image';
import { standardLogin } from '@/utils/authUtils';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';
import platform from 'platform';
import { createTransaction, getAllTransactionsByEmail } from '@/utils/transactionUtils';
import { getIpData } from '@/utils/ipUtils';
import { TransactionType } from '@/interfaces/transactionInterfaces';
import { NewDeviceModal } from '@/components/NewDeviceModal';

import { useAuthTokenStore } from '@/stores/authTokenStore';
import { Spinner } from '@/components/ui/spinner';
import Link from 'next/link';
import { ArrowRight, Loader2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';
import { useSetRecoilState } from 'recoil';
import { authState } from '@/atoms/authAtom';


const SignIn = () => {
  const setCAuth = useSetRecoilState(authState);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [ip, setIp] = useState('');
  const [transactionData, setTransactionData] = useState<any>({});
  const router = useRouter();
  // Effect to retrieve IP Address
  useEffect(() => {
    getIpAddress();
  }, [])

  async function getIpAddress() {
    const data = await getIpData();
    console.log(data);
    setIp(data.ip)

  }

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
  const { control, handleSubmit, register, formState: { errors } } = useForm<any>(formOptions);


  //Submission handler
  async function onSubmit(data: any) {
    setLoading(true);
    if (data.email && data.password) {
      // Set Info for new Transaction
      const os = platform.os?.family ? platform.os?.family : "n/a";
      const browser = platform.name ? platform.name : "n/a";
      const version = platform.version ? platform.version : "n/a";
      const device = platform.product ? platform.product : "n/a";
      const location = "N/A"; // This is a Provisional Prop
      const now = new Date().toUTCString();
      const newData: TransactionType = {
        userEmail: data.email,
        transactionType: "login",
        os: os,
        browser: browser,
        version: version,
        device: device,
        location: location,
        ip: ip,
        datetime: now,
      }
      setTransactionData(newData);
      // Get Login transactions by User
      const TransactionList: any = await getAllTransactionsByEmail(data.email);
      // If there are no transactions, proceed creating new Transaction and login
      if (TransactionList.data.length === 0) {
        console.log("no transactions available");
        const res: any = await standardLogin(data.email, data.password);
        console.log(res);
        if (res.status === 'error') {
          setLoading(false);
          const msg = res.error.response.data.message ? res.error.response.data.message : 'Invalid Credentials';
          toast.error("Error: " + msg);
        } else if (res.status === "success") {
          // create new Transaction

          const newTransaction = await createTransaction(newData);
          if (newTransaction.status === 'success') {
            setLoading(false);
            // set token cookie
            const newToken = res.data.dataAuth.accessToken;
            setCookie('savy-auth-token', newToken, {
              maxAge: 604800,
              path: '/',
            });
            //set Email Cookie
            const newEmail = data.email;
            console.log(newEmail);
            setCookie('savy-user-email', newEmail, {
              maxAge: 604800,
              path: '/',
            });
            setCAuth(newToken);
            toast.success("Login Successful!");
            router.push('/control-panel');
          } else {
            setLoading(false);
            toast.error("Error: Failed to create transaction");
          }

        }


      } else if (TransactionList.data.length > 0) {
        // If there are previous transactions, compare IPs to detect new device
        const latestTransaction = TransactionList.data[0];
        const equalIps = latestTransaction.ip === ip;
        // If IPs are the same proceed with login
        if (equalIps === true) {
          const res: any = await standardLogin(data.email, data.password);
          console.log(res);
          if (res.status === 'error') {
            setLoading(false);
            const msg = res.error.response.data.message ? res.error.response.data.message : 'Invalid Credentials';
            toast.error("Error: " + msg);
          } else if (res.status === "success") {
            // create new Transaction
            const newTransaction = await createTransaction(newData);
            if (newTransaction.status === 'success') {
              setLoading(false);
              const newToken = res.data.dataAuth.accessToken;
              setCookie('savy-auth-token', newToken, {
                maxAge: 604800,
                path: '/',
              });
              //set Email Cookie
              const newEmail = data.email;
              setCookie('savy-user-email', newEmail, {
                maxAge: 604800,
                path: '/',
              });
              setCAuth(newToken);
              setLoading(false);
              toast.success("Login Successful!");
              router.push('/control-panel');
            } else {
              setLoading(false);
              toast.error("Error: Failed to create transaction");
            }
          }
        } else {
          // If IPs are different, activate new device modal
          setLoading(false);
          setModalOpen(true);
        }
      }
    }
  }

  //modal submit function
  async function onModalSubmit() {
    const formData = control._formValues;
    const res: any = await standardLogin(formData.email, formData.password);
    console.log(res);
    if (res.status === 'error') {
      setLoading(false);
      const msg = res.error.response.data.message ? res.error.response.data.message : 'Invalid Credentials';
      toast.error("Error: " + msg);
    } else if (res.status === "success") {
      // create new Transaction
      const newTransaction = await createTransaction(transactionData);
      if (newTransaction.status === 'success') {
        setLoading(false);
        //set Token Cookie
        const newToken = res.data.dataAuth.accessToken;
        setCookie('savy-auth-token', newToken, {
          maxAge: 604800,
          path: '/',
        });
        //set Email Cookie
        const newEmail = formData.email;
        setCookie('savy-user-email', newEmail, {
          maxAge: 604800,
          path: '/',
        });
        setModalOpen(false);
        setCAuth(newToken);
        toast.success("Login Successful!");
        router.push('/control-panel');
      } else {
        setLoading(false);
        setModalOpen(false);
        toast.error("Error: Failed to create transaction");
      }

    }
  }

  const variants = {
    hidden: { opacity: 0, x: -200, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
  }


  return (
    <>
      <motion.div
        variants={variants}
        initial="hidden"
        animate="enter"
        transition={{ type: "linear" }}
      >
        <>
          <div className='container h-screen relative flex flex-col items-center lg:px-0'>
            <div className='flex w-full flex-col justify-center sm:w-[350px]'>
              <div className='flex flex-col items-center text-center'>
                <h1 className='text-2xl font-semibold tracking-tight'>
                  User Login
                </h1>
                <Link
                  className={`${buttonVariants({
                    variant: 'link',
                    className: 'gap-1.5',
                  })} text-sm font-mono`}
                  href='/signUp'>
                  Still Don&apos;t Have an Account? SIGN UP
                  <ArrowRight className='h-4 w-4' />
                </Link>
              </div>
              <div className='grid gap-6'>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className='grid gap-2'>
                    <div className='grid gap-1 py-2'>
                      <Label htmlFor='email'>Email</Label>
                      <Input
                        {...register('email')}
                        className={cn({
                          'focus-visible:ring-red-500':
                            errors.email,
                        })}
                        placeholder='email@ejemplo.com'
                      />
                      {errors?.email && (
                        <p className='text-sm text-red-500'>
                          {errors.email.message?.toString()}
                        </p>
                      )}
                    </div>

                    <div className='grid gap-1 py-2'>
                      <Label htmlFor='password'>Contraseña</Label>
                      <Input
                        {...register('password')}
                        type='password'
                        className={cn({
                          'focus-visible:ring-red-500':
                            errors.password,
                        })}
                        placeholder='Contraseña'
                      />
                      {errors?.password && (
                        <p className='text-sm text-red-500'>
                          {errors.password.message?.toString()}
                        </p>
                      )}
                    </div>

                    <Button className='bg-secondary hover:bg-secondary/70' disabled={loading}>
                      {loading && (
                        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                      )}
                      Access Now
                    </Button>
                  </div>
                </form>
              </div>
            </div>
            <Footer />
          </div>
        </>

      </motion.div>
      {modalOpen && (
        <NewDeviceModal setModalOpen={setModalOpen} modalOpen={modalOpen} onClick={onModalSubmit} modalData={transactionData} />
      )}
    </>

  )
}

export default SignIn