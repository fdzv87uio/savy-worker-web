'use client'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import { Calendar } from "@/components/ui/calendar"
import { findUserByEmail } from '@/utils/authUtils';
import { getCookie } from 'cookies-next';


const Profile = () => {
  const initiallySelectedDate = new Date();
  const [selectedDate, setSelectedDate] = useState(initiallySelectedDate);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [preferences, setPreferences] = useState([]);

  // Get User info
  async function getUserInfo(email: string, token: string) {
    const res: any = await findUserByEmail(email, token);
    if (res && res.status === "success") {
      setName(res.data.name);
      setEmail(res.data.email);
      setAddress(res.data.address);
      setPreferences(res.data.preferences);
    }
  }


  useEffect(() => {
    const cookieToken = getCookie('curcle-auth-token');
    const userEmail = getCookie('curcle-user-email')
    if (cookieToken && userEmail) {
      getUserInfo(userEmail, cookieToken);
    }

  }, [])

  return (
    <div className='flex flex-col justify-center items-center relative'>
      <Image
        src="/images/vector7.2.svg"
        alt="Ellipse"
        width={400}
        height={200}
        className="hidden xl:flex absolute top-[10px] left-[600px] object-cover blur-xl"
      />
      <div className="flex flex-col justify-center items-center gap-10 md:gap-x-36 text-white-1 mt-10 md:mt-20 w-[350px] md:w-[550px] xl:w-[1000px] md:min-h-[400px] z-10">
        <div className='flex flex-col xl:flex-row justify-around items-center w-full'>
          <div className='flex w-full xl:w-[355px] justify-center'>
            <h2 className="text-2xl md:text-4xl font-normal text-center md:text-start ">Personal Information</h2>
          </div>
          <div className='w-[350px] mt-10 xl:mt-0 md:min-w-[543px] min-h-[400px] border relative rounded-2xl border-[rgba(255,255,255,0.2)] bg-[#ffffff]/10'>
            <div className="flex items-center bg-[url('/images/card-bg.png')] bg-cover bg-left-bottom opacity-10 min-h-[400px] ">
            </div>
            <div className='absolute w-[250px] md:w-[450px] top-10 left-10 flex flex-col gap-4'>

              {/* username */}
              <div className='flex gap-3'>
                <Image src="/icons/username.svg" alt="username icon" width={45} height={45} />
                <div>
                  <h3>Unsername</h3>
                  <p className={`${inter.className} text-[#768192]`}>{name}</p>
                </div>
              </div>
              <div className='h-[1px] w-full bg-gradient-to-r from-[#3772AD00] via-[#9BAEC0] to-[#3772AD00] opacity-60'></div>

              {/* email */}
              <div className='flex gap-3'>
                <Image src="/icons/mail.svg" alt="mail icon" width={45} height={45} />
                <div>
                  <h3>Email</h3>
                  <p className={`${inter.className} text-[#768192]`}>{email}</p>
                </div>
              </div>
              <div className='h-[1px] w-full bg-gradient-to-r from-[#3772AD00] via-[#9BAEC0] to-[#3772AD00] opacity-60'></div>

              {/* address */}
              <div className='flex gap-3'>
                <Image src="/icons/mail.svg" alt="mail icon" width={45} height={45} />
                <div>
                  <h3>Address</h3>
                  <p className={`${inter.className} text-[#768192]`}>{address}</p>
                </div>
              </div>
              <div className='h-[1px] w-full bg-gradient-to-r from-[#3772AD00] via-[#9BAEC0] to-[#3772AD00] opacity-60'></div>

              {/* preferences */}
              <div className='flex gap-3'>
                <Image src="/icons/mail.svg" alt="mail icon" width={45} height={45} />
                <div>
                  <h3>Preferences</h3>
                  <div className='flex gap-3'>
                    {preferences &&  preferences.map(preference => (
                      <p key={preference} className={`bg-primary-1 rounded-full ${inter.className} text-center px-3`}>{preference}</p>
                    ))}
                  </div>
                </div>
              </div>
              <div className='h-[1px] w-full bg-gradient-to-r from-[#3772AD00] via-[#9BAEC0] to-[#3772AD00] opacity-60'></div>

            </div>
          </div>
        </div>
        <div className='flex justify-around items-center w-full flex-col xl:flex-row'>
          <div className='flex w-full xl:w-[355px] justify-center'>
            <h2 className="text-2xl md:text-4xl font-normal text-center md:text-start">Your scheduled events</h2>
          </div>
          <div className='flex flex-col mt-10 xl:mt-0'>
            <div className='flex min-h-[380px]  justify-center items-center md:justify-start md:items-start'>
              <Calendar
                mode="single"
                numberOfMonths={2}
                selected={selectedDate}
                className="rounded-2xl border border-[rgba(255,255,255,0.2)] bg-[#ffffff]/10"
              />
            </div>
            <div className='flex flex-col xl:flex-row gap-5 my-5 xl:mt-0'>
              <div className='flex gap-2 justify-center items-center'>
                <div className='w-[18px] h-[18px] bg-primary-1 rounded-full'></div>
                <p className={`${inter.className}`}>
                  Attended event
                </p>
              </div>
              <div className='flex gap-2 justify-center items-center'>
                <div className='w-[18px] h-[18px] bg-[#E8B126] rounded-full'></div>
                <p className={`${inter.className}`}>
                  Hosted event
                </p>
              </div>
              <div className='flex gap-2 justify-center items-center'>
                <div className='w-[18px] h-[18px] bg-primary-1 rounded-full'></div>
                <p className={`${inter.className}`}>
                  Upcomming event
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile