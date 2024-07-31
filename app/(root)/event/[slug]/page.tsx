"use client"

import { getEventBySlug } from '@/utils/eventsUtils';
import { getProfile } from '@/utils/profileUtils';
import { getCookie } from 'cookies-next';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { Inter } from "next/font/google";
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, CustomCarouselNext, CustomCarouselPrevious } from '@/components/ui/carousel';
import { getSignedImageUrl } from '@/utils/imageFetchUtils';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { getAllPreferences, getPreferenceName } from '@/utils/preferencesUtils';
const inter = Inter({ subsets: ["latin"] });

const EventDetails = ({ params }: { params: { slug: string } }) => {
  const initiallySelectedDate = new Date();
  const [selectedDate, setSelectedDate] = useState(initiallySelectedDate);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
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
    const cookieToken = getCookie('curcle-auth-token');
    if (cookieToken) {
      getUserInfo(cookieToken);
      getEventData();
    } else {
      router.push('/signIn')
    }

  }, [])

  return (
    <>
      {!loading && event && signedUrls.length > 0 && (

        <MaxWidthWrapper className='oveflow-visible'>
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

            <div className='w-full h-auto grid grid-cols-2 z-[20]'>
              <div className='w-full col-span-1 flex flex-col items-left mt-16 gap-6'>
                <h2 className="text-[#ffffff] text-2xl md:text-5xl font-normal text-center md:text-start">{event.title}</h2>
                <p className={`${inter.className} text-[#ffffff]`}>{event.description}</p>
                <div className='w-full h-auto flex flex-row gap-5'>
                  <Button variant="secondary" size="sm" className='w-[176px] h-[41px]'>Attend</Button>
                  <Button variant="primary" size="sm" className='w-[176px] h-[41px]'>Ignore</Button>
                  <div className='cursor-pointer w-[44px] h-[44px] flex flex-col justify-center items-center rounded-full bg-[#EBEBEB] hover:bg-[#EBEBEB]/50'>
                    <img src="/icons/share-icon.svg" width={25} height={29} />
                  </div>
                </div>
              </div>
              <div className='w-[480px] col-span-1'>
                <Carousel
                  opts={{
                    align: "start",
                  }}
                  className="w-[480px] h-[350px] relative right-8"
                >
                  <CarouselContent>
                    {signedUrls.map((image: any, key: number) => {

                      return (
                        <CarouselItem key={`image_${key}`}>
                          <div className='w-full flex flex-col items-center h-[350px]'>
                            <img alt='' src={image} width={600} height={350} className='object-cover' />
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
            <img src="/images/event-separator-large.png" className='mt-7' />
            <div className="flex flex-col  z-[20] xl:flex-row justify-center items-center gap-5 md:gap-x-36 text-white-1 mt-10 md:mt-20 w-[350px] md:w-[750px] xl:w-[1123px] md:min-h-[850px]">
              <div className='flex'>
                <h2 className="text-2xl md:text-5xl font-normal z-[20] text-center md:text-start">Event Info</h2>
              </div>
              <div className='w-[350px] md:min-w-[543px] min-h-[516px] border relative rounded-2xl border-[rgba(255,255,255,0.2)] bg-[#ffffff]/10'>
                <div className="flex items-center bg-[url('/images/card-bg.png')] bg-cover bg-left-bottom opacity-10 min-h-[850px] ">
                </div>
                <div className='absolute w-[250px] md:w-[450px] top-10 left-10 flex flex-col'>
                  <div className='w-full flex flex-col mb-12'>
                    <div className='flex flex-row gap-[15px] items-center'>
                      <img src="/icons/event-type-icon.svg" width={46} height={46} />
                      <h3 className='text-[#fffff] text-[24px]'>
                        Event type
                      </h3>
                    </div>
                    <p className={`${inter.className} text-[18px] text-white mt-[14px]`}>
                      {event.eventType}
                    </p>
                    <img src="/images/event-separator-small.png" className='pt-2' />
                  </div>
                  <div className='w-full flex flex-col mb-12'>
                    <div className='flex flex-row gap-[15px] items-center'>
                      <img src="/icons/event-calendar-icon.svg" width={46} height={46} />
                      <h3 className='text-[#fffff] text-[24px]'>
                        Event Date
                      </h3>
                    </div>
                    <p className={`${inter.className} text-[18px] text-white mt-[14px]`}>
                      {event.startDate.split("T")[0]}
                    </p>
                    <p className={`${inter.className} text-[18px] text-white`}>
                      {event.startTime.split(".")[0]} - {event.endTime.split(".")[0]}
                    </p>
                    <img src="/images/event-separator-small.png" className='pt-2' />
                  </div>
                  <div className='w-full flex flex-col mb-12'>
                    <div className='flex flex-row gap-[15px] items-center'>
                      <img src="/icons/event-location-icon.svg" width={46} height={46} />
                      <h3 className='text-[#fffff] text-[24px]'>
                        Event Location
                      </h3>
                    </div>
                    <p className={`${inter.className} text-[18px] text-white mt-[14px]`}>
                      {event.location}
                    </p>
                    <p className={`${inter.className} text-[18px] text-white`}>
                      {event.address}
                    </p>
                    <img src="/images/event-separator-small.png" className='pt-2' />
                  </div>
                  <div className='w-full flex flex-col mb-12'>
                    <div className='flex flex-row gap-[15px] items-center'>
                      <img src="/icons/event-host-icon.svg" width={46} height={46} />
                      <h3 className='text-[#fffff] text-[24px]'>
                        Hosted by
                      </h3>
                    </div>
                    <p className={`${inter.className} text-[18px] text-white mt-[14px]`}>
                      {event.author}
                    </p>
                    <img src="/images/event-separator-small.png" className='pt-2' />
                  </div>
                  <div className='w-full flex flex-col mb-12'>
                    <div className='flex flex-row gap-[15px] items-center'>
                      <img src="/icons/event-pref-icon.svg" width={46} height={46} />
                      <h3 className='text-[#fffff] text-[24px]'>
                        Preferences
                      </h3>
                    </div>
                    <div className='w-full h-auto flex flex-row gap-1 mt-[14px]'>
                      {event.preferenceListIds.map((y: any, key: number) => {
                        return (
                          <span key={`pref_${key}`} className='bg-primary-1 rounded-xl px-2'>
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