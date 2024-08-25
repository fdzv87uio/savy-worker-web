'use client'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Inter } from "next/font/google";
import Image from 'next/image';
import { Input } from './ui/input';
const inter = Inter({ subsets: ["latin"] });
import { getCookie, setCookie } from 'cookies-next';
import platform from 'platform';
import { TransactionType } from '@/interfaces/transactionInterfaces';
import { createTransaction, getAllTransactionsByEmail } from '@/utils/transactionUtils';
import { standardLogin } from '@/utils/authUtils';
import { toast } from 'sonner';
import { NewDeviceModal } from './NewDeviceModal';
import { getIpData } from '@/utils/ipUtils';
import { useAuthTokenStore } from '@/stores/authTokenStore';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';

interface SignUpForFreeProps {
  isUser?: boolean
  setIsUser?: any
}

function SignUpForFree({ isUser, setIsUser }: SignUpForFreeProps) {
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [ip, setIp] = useState('');
  const [transactionData, setTransactionData] = useState<any>({});
  const router = useRouter();
  const [query, setQuery] = useState("");

  // Effect to retrieve IP Address
  useEffect(() => {
    getIpAddress();
  }, [])

  async function getIpAddress() {
    const data = await getIpData();
    console.log(data);
    setIp(data.ip)

  }

  const { setAuthToken } = useAuthTokenStore();
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
  const { control, handleSubmit, formState: { errors } } = useForm(formOptions);


  //Submission handler
  async function onSubmit(data: any) {
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
            setCookie('curcle-auth-token', newToken, {
              maxAge: 604800,
              path: '/',
            });
            //set Email Cookie
            const newEmail = data.email;
            console.log(newEmail);
            setCookie('curcle-user-email', newEmail, {
              maxAge: 604800,
              path: '/',
            });
            toast.success("Login Successful!");
            setIsUser(true);
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
              setAuthToken(newToken);
              setCookie('curcle-auth-token', newToken, {
                maxAge: 604800,
                path: '/',
              });
              //set Email Cookie
              const newEmail = data.email;
              setCookie('curcle-user-email', newEmail, {
                maxAge: 604800,
                path: '/',
              });
              setLoading(false);
              toast.success("Login Successful!");
              setIsUser(true);
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
        setCookie('curcle-auth-token', newToken, {
          maxAge: 604800,
          path: '/',
        });
        //set Email Cookie
        const newEmail = formData.email;
        setCookie('curcle-user-email', newEmail, {
          maxAge: 604800,
          path: '/',
        });
        setModalOpen(false);
        setAuthToken(newToken);
        toast.success("Login Successful!");
        setIsUser(true);
      } else {
        setLoading(false);
        setModalOpen(false);
        toast.error("Error: Failed to create transaction");
      }

    }
  }

  return (
    <>
      <div className='flex gap-8 mt-32 relative flex-col md:flex-row'>
        {isUser ? (
          <div className='md:min-h-[331px] w-[350px] md:w-[543px] relative border rounded-xl border-[rgba(255,255,255,0.2)] bg-[#ffffff]/10'>
            <div className="flex items-center bg-[url('/images/card-bg.png')] bg-cover bg-left-bottom opacity-10 h-[400px] md:h-[331px]">
            </div>
            <div className='absolute w-[350px] md:w-[543px] md:h-[331px] top-0 flex flex-col pt-[46px] pb-[49px] pl-[21px] pr-[60px] gap-[20px] text-white-1'>
              <h1 className='text-3xl md:text-4xl'>Find an Event</h1>
              <h3 className={`text-xl md:text-2xl ${inter.className}`}>Fill in the details to find an event</h3>
              <div className='flex flex-col gap-3 mt-3'>
                <Input value={query} type='text' onChange={(e: any) => setQuery(e.target.value)} placeholder={'Search'} />
                <p className={`pl-2 text-[#ffffff] font-normal ${inter.className} text-sm`}>Search by name or preference</p>
                <Button disabled={!query} onClick={() => router.push(`/search?search=${query}`)} variant="default" size="sm" className={`w-[95px] z-[90] h-[36px] px-4 mt-5 text-sm font-normal ${inter.className}`}>
                  Search
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className='min-h-[420px] w-[350px] md:w-[543px] border rounded-xl border-[rgba(255,255,255,0.2)] bg-[#ffffff]/10'>
            <div className="flex items-center bg-[url('/images/card-bg.png')] bg-cover bg-left-bottom opacity-10 h-[450px] md:h-[420px]">
            </div>
            <div className='absolute w-[350px] md:w-[543px] h-[450px] md:h-[420px] top-0 flex flex-col pt-[46px] pb-[49px] pl-[21px] pr-[60px] gap-[20px] text-white-1'>
              <h1 className='text-3xl md:text-4xl'>Sign In</h1>
              <h3 className={`text-sm md:text-base ${inter.className}`}>You don&apos;t have an account? <span onClick={() => router.push('/signUp')} className='text-primary-1 hover:text-primary-2 cursor-pointer'><u>Sign Up Here!</u></span></h3>
              <div className='flex flex-col mt-3'>
                <form className='w-full flex flex-col h-auto z-[90] gap-[20px]' onSubmit={handleSubmit(onSubmit)}>
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
                      <p className={`pl-2 text-[#ffffff] font-normal ${inter.className} text-sm`}>Enter your email</p>
                    )}
                    {errors.email && errors.email.message && (
                      <p className={`pl-2 text-red-300 font-bold ${inter.className} text-sm`}>{`${errors.email.message}`}</p>
                    )}
                  </div>
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
                      <p className={`pl-2 text-[#ffffff] font-normal ${inter.className} text-sm`}>Enter your password</p>
                    )}
                    {errors.password && errors.password.message && (
                      <p className={`pl-2 text-red-300 font-bold ${inter.className} text-sm`}>{`${errors.password.message}`}</p>
                    )}
                  </div>
                  <Button type="submit" variant="default" size="sm" className={`z-[90] w-full xl:w-[95px] h-[36px] px-4 py-2 text-sm font-normal ${inter.className}`}>
                    {loading ? "..." : "Log In"}
                  </Button>
                </form>
              </div>
            </div>
          </div>)}

        <div className="hidden xl:flex xl:w-[694px]">
          <div className='relative'>
            <div className='absolute w-[388px] h-[278px]'>
              <Image
                src="/images/basketball.jfif"
                alt="Basketball"
                fill
                className="rounded-lg object-cover"
              />
            </div>
            <div className="absolute h-[278px] w-[388px] bg-gradient-to-t from-black-1 to-transparent rounded-lg">
            </div>
          </div>
          <div className='relative'>
            <div className='absolute w-[388px] h-[278px] top-24 left-56'>
              <Image
                src="/images/gamer.png"
                alt="Basketball"
                fill
                className="rounded-lg object-cover"
              />
            </div>
            <div className="absolute h-[278px] w-[388px] bg-gradient-to-t from-black-1 to-transparent rounded-lg top-24 left-56">
            </div>
          </div>
        </div>
      </div>
      {modalOpen && (
        <NewDeviceModal setModalOpen={setModalOpen} modalOpen={modalOpen} onClick={onModalSubmit} modalData={transactionData} />
      )}
    </>
  )
}

export default SignUpForFree