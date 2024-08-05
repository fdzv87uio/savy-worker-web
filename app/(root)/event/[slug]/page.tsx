"use client"

import { getEventBySlug } from '@/utils/eventsUtils';
import { getProfile } from '@/utils/profileUtils';
import { getCookie } from 'cookies-next';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { Inter } from "next/font/google";
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CustomCarouselNext, CustomCarouselPrevious } from '@/components/ui/carousel';
import { getSignedImageUrl } from '@/utils/imageFetchUtils';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { getAllPreferences, getPreferenceName } from '@/utils/preferencesUtils';
import QrModal from '@/components/ui/qrModal';
const inter = Inter({ subsets: ["latin"] });

const EventDetails = ({ params }: { params: { slug: string } }) => {
  const initiallySelectedDate = new Date();
  const [selectedDate, setSelectedDate] = useState(initiallySelectedDate);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [isUser, setIsUser] = useState(false);
  const [preferences, setPreferences] = useState([]);
  const [event, setEvent] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [signedUrls, setSignedUrls] = useState([]);
  const router = useRouter();

  // Get User info
  async function getUserInfo(token: string) {
    const res: any = await getProfile(token);
    console.log(res)
    if (res && res.status === "success") {
      setName(res.data.name);
      setEmail(res.data.email);
      setAddress(res.data.address);
      setIsUser(true);
    }
  }

  // Get Event Data
  async function getEventData() {
    const res: any = await getEventBySlug(params.slug);
    const allprefs: any = await getAllPreferences();
    if (allprefs && allprefs.status === "success") {
      setPreferences(allprefs.data);
    }
    console.log(res);
    if (res && res.status === "success") {
      setEvent(res.data);
      const imageArr = res.data.images;
      let signedArr: any = [];
      imageArr.forEach(async (x: any, key: number) => {
        const result: any = await getSignedImageUrl(x);
        if (result.status === "success") {
          signedArr.push(result.data.signedUrl);
        } else {
          signedArr.push("/images/basketball.png");
        }
        if (imageArr.length === (key + 1)) {
          console.log(signedArr);
          setSignedUrls(signedArr);
          setLoading(false);
        }
      })


    }

  }

  useEffect(() => {
    const token = getCookie('curcle-auth-token')
    const userEmail = getCookie('curcle-user-email')
    if (token && userEmail) {
      getUserInfo(token);
      getEventData();
    } else {
      getEventData();
    }

  }, [])

  return (
    <>
      {!loading && event && signedUrls.length > 0 && (

        <MaxWidthWrapper className={`overflow-visible mb-10 ${isUser === true ? "pl-0" : "pl-0 md:pl-28 flex flex-col items-center"}`}>
          <div className='flex flex-col oveflow-visible justify-center items-center relative'>
            <Image
              src="/images/vector7.2.svg"
              alt="Ellipse"
              width={600}
              height={429}
              className="hidden xl:flex absolute top-[30px] left-[650px] object-cover blur-xl w-[600px] h-[429px]"
            />
            <Image
              src="/images/vector7.svg"
              alt="Ellipse"
              width={400}
              height={229}
              className="hidden xl:flex absolute top-[900px] left-[-60px] object-cover blur-xl w-[400px] h-[229px]"
            />
            <Image
              src="/images/vector2.svg"
              alt="Ellipse"
              width={600}
              height={600}
              className="hidden xl:flex absolute top-[900px] left-[60px] object-cover blur-xl w-[600px] h-[600px]"
            />
            <Image
              src="/images/vector3.svg"
              alt="Ellipse"
              width={400}
              height={229}
              className="hidden xl:flex absolute top-[900px] right-[0px] object-cover blur-xl w-[400px] h-[229px]"
            />
            {/* Desktop Header */}
            <div className='hidden w-full h-auto md:grid grid-cols-2 z-[20]'>
              <div className=' w-full col-span-1 flex flex-col items-left mt-16 gap-6'>
                <h2 className="text-[#ffffff] text-2xl md:text-5xl font-normal text-center md:text-start">{event.title}</h2>
                <p className={`${inter.className} text-[#ffffff]`}>{event.description}</p>
                <div className='w-full h-auto flex flex-row gap-5'>
                  {isUser && (
                    <>
                      <Button variant="secondary" size="sm" className='w-[176px] h-[41px]'>Attend</Button>
                      <Button variant="primary" size="sm" className='w-[176px] h-[41px]'>Ignore</Button>
                      <QrModal url={event.url} />
                    </>
                  )}
                  {!isUser && (
                    <>
                      <Button onClick={() => router.push('/signUp')} variant="secondary" size="sm" className='w-[176px] h-[41px]'>Interested? SignUp</Button>
                      <Button onClick={() => router.push('/search')} variant="primary" size="sm" className='w-[176px] h-[41px]'>More Events</Button>
                      <QrModal url={event.url} />
                    </>
                  )}
                </div>
              </div>
              <div className='w-[520px] col-span-1'>
                <Carousel
                  opts={{
                    align: "start",
                  }}
                  className="w-[520px] h-[410px] relative right-14"
                >
                  <CarouselContent>
                    {signedUrls.map((image: any, key: number) => {

                      return (
                        <CarouselItem key={`image_${key}`}>
                          <div className='w-full flex flex-col items-center h-[410px]'>
                            <img alt='' src={image} width={650} height={410} className='object-cover object-center object-top' />
                          </div>
                        </CarouselItem>
                      )

                    })}
                  </CarouselContent>
                  <CustomCarouselPrevious />
                  <CustomCarouselNext />
                </Carousel>
              </div>
            </div>
            {/* Mobile Header */}
            <div className='w-full h-auto flex flex-col md:hidden items-center z-[20]'>
              <div className='w-[280px] relative col-span-1'>
                <Carousel
                  opts={{
                    align: "start",
                  }}
                  className="w-[280px] h-[225px] relative"
                >
                  <CarouselContent>
                    {signedUrls.map((image: any, key: number) => {

                      return (
                        <CarouselItem key={`image_${key}`}>
                          <div className='w-full flex flex-col items-center h-[225px]'>
                            <img alt='' src={image} width={270} height={225} className='object-cover object-center object-top' />
                          </div>
                        </CarouselItem>
                      )

                    })}
                  </CarouselContent>
                  <CustomCarouselPrevious />
                  <CustomCarouselNext />
                </Carousel>
                <div className="w-full px-7 h-auto absolute bottom-[-20px] grid grid-cols-3 items-center z-[25]">
                  <div className="w-full h-auto flex flex-col items-center gap-7">
                    <div className='cursor-pointer w-[44px] h-[44px] flex flex-col justify-center items-center rounded-full bg-[#EBEBEB] hover:bg-[#EBEBEB]/50'>
                      <img src="/icons/heart-icon.svg" width={25} height={25} />
                    </div>
                  </div>
                  <div className="w-full h-auto flex flex-col items-center gap-2.5">
                    <div className='cursor-pointer w-[44px] h-[44px] flex flex-col justify-center items-center rounded-full bg-[#EBEBEB] hover:bg-[#EBEBEB]/50'>
                      <img src="/icons/calendar-mobile-icon.svg" width={25} height={25} />
                    </div>
                  </div>
                  <div className="w-full h-auto flex flex-col items-center gap-2.5">
                    <QrModal url={event.url} />
                  </div>
                </div>
              </div>
              <div className=' w-full col-span-1 flex flex-col items-center mt-7 gap-2.5'>
                <h2 className="text-[#ffffff] text-[28px] font-normal text-center md:text-start">{event.title}</h2>
                <p className={`${inter.className} text-[12px] text-[#ffffff]`}>{event.description}</p>
              </div>
            </div>
            <img src="/images/event-separator-large.png" className='flex mt-4 md:mt-7' />
            <div className="flex flex-col  z-[20] xl:flex-row justify-center items-center gap-5 md:gap-x-36 text-white-1 mt-4 md:mt-20 w-[350px] md:w-[750px] xl:w-[1123px] md:min-h-[850px]">
              <div className='hidden md:flex'>
                <h2 className="text-2xl md:text-5xl font-normal z-[20] text-center md:text-start">Event Info</h2>
              </div>
              <div className='w-[350px] md:min-w-[543px] h-auto border relative rounded-2xl border-[rgba(255,255,255,0.2)] bg-[#ffffff]/10'>
                <div className="flex items-center bg-[url('/images/card-bg.png')] bg-cover bg-left-bottom opacity-10 h-auto min-h-[480px] md:min-h-[850px] ">
                </div>
                <div className='absolute w-[250px] md:w-[450px] top-10 left-10 flex flex-col'>
                  <div className='w-full flex flex-col items-center md:items-left mb-2.5 md:mb-12'>
                    <div className='flex flex-row gap-[15px] items-center'>
                      <img src="/icons/event-type-icon.svg" className='w-[20px] h-[20px] md:w-[46px] md:h-[46px]' />
                      <h3 className='text-[#fffff] text-[19px] md:text-[24px]'>
                        Event type
                      </h3>
                    </div>
                    <p className={`${inter.className} text-[14px] md:text-[18px] text-white mt-1 md:mt-[14px]`}>
                      {event.eventType}
                    </p>
                    <img src="/images/event-separator-small.png" className='mt-2.5  md:pt-2' />
                  </div>
                  <div className='w-full flex flex-col items-center md:items-left mb-2.5 md:mb-12'>
                    <div className='flex flex-row gap-[15px] items-center'>
                      <img src="/icons/event-calendar-icon.svg" className='w-[20px] h-[20px] md:w-[46px] md:h-[46px]' />
                      <h3 className='text-[#fffff] text-[19px] md:text-[24px]'>
                        Event Date
                      </h3>
                    </div>
                    <p className={`${inter.className} text-[14px] md:text-[18px] text-white mt-1 md:mt-[14px]`}>
                      {event.startDate.split("T")[0]}
                    </p>
                    <p className={`${inter.className} text-[14px] md:text-[18px] text-white`}>
                      {event.startTime.split(".")[0]} - {event.endTime.split(".")[0]}
                    </p>
                    <img src="/images/event-separator-small.png" className='mt-2.5  md:pt-2' />
                  </div>
                  <div className='w-full flex flex-col items-center md:items-left mb-2.5 md:mb-12'>
                    <div className='flex flex-row gap-[15px] items-center'>
                      <img src="/icons/event-location-icon.svg" className='w-[20px] h-[20px] md:w-[46px] md:h-[46px]' />
                      <h3 className='text-[#fffff] text-[19px] md:text-[24px]'>
                        Event Location
                      </h3>
                    </div>
                    <p className={`${inter.className} text-[14px] md:text-[18px] text-white mt-1 md:mt-[14px]`}>
                      {event.location}
                    </p>
                    <p className={`${inter.className} text-[14px] md:text-[18px] text-white`}>
                      {event.address}
                    </p>
                    <img src="/images/event-separator-small.png" className='mt-2.5  md:pt-2' />
                  </div>
                  <div className='w-full flex flex-col items-center md:items-left mb-2.5 md:mb-12'>
                    <div className='flex flex-row gap-[15px] items-center'>
                      <img src="/icons/event-host-icon.svg" className='w-[20px] h-[20px] md:w-[46px] md:h-[46px]' />
                      <h3 className='text-[#fffff] text-[19px] md:text-[24px]'>
                        Hosted by
                      </h3>
                    </div>
                    <p className={`${inter.className} text-[18px] text-white mt-1 md:mt-[14px]`}>
                      {event.author}
                    </p>
                    <img src="/images/event-separator-small.png" className='mt-2.5  md:pt-2' />
                  </div>
                  <div className='w-full flex flex-col items-center md:items-left mb-2.5 md:mb-12'>
                    <div className='flex flex-row gap-[15px] items-center'>
                      <img src="/icons/event-pref-icon.svg" className='w-[20px] h-[20px] md:w-[46px] md:h-[46px]' />
                      <h3 className='text-[#fffff] text-[19px] md:text-[24px]'>
                        Preferences
                      </h3>
                    </div>
                    <div className='w-full h-auto flex justify-center  md:justify-left flex-row gap-1 mt-5 md:mt-[14px]'>
                      {event.preferenceListIds.map((y: any, key: number) => {
                        return (
                          <span key={`pref_${key}`} className={` ${inter.className} bg-primary-1 rounded-xl text-[12px] md:text-[16px] px-2`}>
                            {getPreferenceName(preferences, y)}
                          </span>
                        )
                      })}
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div >
        </MaxWidthWrapper>
      )}
    </>
  )
}

export default EventDetails