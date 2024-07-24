'use client';
import { Input } from '@/components/ui/input';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
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
import platform from 'platform';
import { TransactionType } from '@/interfaces/transactionInterfaces';
import { getIpData } from '@/utils/ipUtils';
import { createTransaction } from '@/utils/transactionUtils';
import { Progress } from '@/components/ui/progress';
import StepOne from './forms/StepOne';
import StepTwo from './forms/StepTwo';
import { getAllPreferences, getAllPreferencesByCategory } from '@/utils/preferencesUtils';
import StepThree from './forms/StepThree';

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);
  // Navigation Props 
  const [progress, setProgress] = useState(10);
  const [step, setStep] = useState(1);
  // Form props
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [address, setAddress] = useState("");
  const [addressDetails, setAddressDetails] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("USA");
  const [preferences, setPreferences] = useState('');
  const [prefOptions, setPrefOptions] = useState<any>({})
  const [prefList, setPrefList] = useState<any[]>([])

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
    const allPrefs: any = await getAllPreferencesByCategory();
    const allPrefsList: any = await getAllPreferences();
    if (allPrefs?.status === "success" && allPrefsList?.status === "success") {
      console.log("prefs:");
      console.log(allPrefs.data);
      setPrefOptions(allPrefs.data);
      setPrefList(allPrefsList.data);
    }
  }


  // Submission handler
  async function onSubmit(event: any) {
    event.preventDefault(); // Here's the hero!
    const data: any = {
      name: name,
      lastname: lastname,
      email: email,
      password: password,
      birthDate: birthDate,
      address: address,
      addressDetails: addressDetails,
      idNumber: idNumber,
      postalCode: postalCode,
      city: city,
      country: country,
    };
    const prefArray = preferences.split(',');
    const prefIdArray: any = [];
    prefArray.forEach((x: any) => {
      const filtered = prefList.filter((y: any) => y.name === x)[0];
      if (filtered) {
        prefIdArray.push(filtered._id);
      }
    })
    data.preferences = prefIdArray;
    data.documentType = 'Driver Licenses';
    console.log(data);
    setLoading(true);
    if (email && password) {
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
      const res: any = await createAccount(data.name, data.lastname, data.email, hashedPassword, data.address, data.addressDetails, data.postalCode, data.city, data.idNumber, data.birthDate, data.documentType, data.preferences);
      if (res.status === 'error') {
        setLoading(false);
        const msg = res.error.response.data.message ? res.error.response.data.message : 'Invalid Credentials';
        toast.error("Error: " + msg);
      } else if (res.status === "success") {
        // Create User Register Transaction
        await createTransaction(newData);
        const newToken = res.data.dataAuthRegister.accessToken;
        setCookie('curcle-auth-token', newToken, {
          maxAge: 604800,
          path: '/',
        });
        setCookie('curcle-user-email', data.email, {
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
      <div className="flex flex-col xl:flex-row justify-center items-center gap-5 text-white-1 mt-10 mb-4 md:mt-3 md:mb-20 w-[350px] md:w-[750px] xl:w-[1123px] md:min-h-[637px] z-10">
        <div className='flex flex-col'>
          <h2 className="text-2xl md:text-5xl font-normal text-center md:text-start">Create Your Account</h2>
          <p className={`text-lg md:text-2xl text-center md:text-start ${inter.className} mt-3`}>Join exciting sporting events and meetings with gamers</p>
        </div>
        <div className='w-[350px] md:min-w-[543px] h-auto border relative rounded-2xl border-[rgba(255,255,255,0.2)] bg-[#ffffff]/10'>
          <div className="flex items-center bg-[url('/images/card-bg.png')] bg-cover bg-left-bottom opacity-10 min-h-[637px] h-auto object-cover ">
          </div>
          <div className='absolute w-[270px] md:w-[450px] top-10 left-10 top-10 left-10 flex flex-col'>
            <Progress value={progress} max={100} className='z-[99]' id="progress" />
            {step === 1 && (
              <StepOne step={step} setStep={setStep} setProgress={setProgress} name={name} setName={setName} lastname={lastname} setLastname={setLastname} birthDate={birthDate} setBirthDate={setBirthDate} email={email} setEmail={setEmail} setPassword={setPassword} idNumber={idNumber} setIdNumber={setIdNumber} />
            )}
            {step === 2 && (
              <StepTwo step={step} setStep={setStep} setProgress={setProgress} address={address} setAddress={setAddress} addressDetails={addressDetails} setAddressDetails={setAddressDetails} postalCode={postalCode} setPostalCode={setPostalCode} city={city} setCity={setCity} />
            )}
            {step === 3 && (
              <StepThree loading={loading} step={step} prefOptions={prefOptions} setStep={setStep} setProgress={setProgress} setPreferences={setPreferences} preferences={preferences} handleSubmit={onSubmit} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp;
