"use client"

import Image from "next/image";
import { getPreferenceName } from "@/utils/preferencesUtils";
import { useEffect, useState } from "react";
import { getSignedImageUrl } from "@/utils/imageFetchUtils";
import { useRouter } from "next/navigation";

interface ScheduledEventCardProps {
    event: any;
    allPrefs: any[]
}


export default function ScheduledEventCard({ event, allPrefs }: ScheduledEventCardProps) {
    const [signedUrl, setSignedUrl] = useState("");
    const router = useRouter();

    useEffect(() => {
        if (!signedUrl) {
            getImageUrl();
        }
    }, [signedUrl])

    async function getImageUrl() {
        const res: any = await getSignedImageUrl(event.images[0]);
        if (res.status === "success") {
            setSignedUrl(res.data.signedUrl);
        } else {
            setSignedUrl("/images/basketball.png");
        }
    }

    return (
        <div key={event._id} className="bg-white rounded-lg shadow-lg w-[350px] md:w-[371px] h-[457px] relative border border-[rgba(255,255,255,0.2)] bg-[#ffffff]/10">
            <div className="flex items-center bg-[url('/images/card-bg.png')] bg-cover bg-left-bottom opacity-10 w-[350px] md:w-[371px] h-[457px]">
            </div>
            <div className='absolute top-0 left-0'>
                {signedUrl && (
                    <img onClick={() => router.push(`/event/${event.slug}`)} src={signedUrl} alt={""} width={371} height={236} className="h-[236px] cursor-pointer object-cover rounded-lg" />
                )}
                <div className="p-4 flex flex-col mt-5">
                    <h3 onClick={() => router.push(`/event/${event.slug}`)} className="cursor-pointer text-white-1 hover:underline hover:text-primary-1 text-xl md:text-2xl">{event.title}</h3>
                    <p className={`text-white-1 text-base md:text-lg font-mono`}>Date: {event.startDate.split("T")[0]}</p>
                    <div className='flex items-center gap-2'>
                        <Image src="/icons/star2.svg" alt="start" width={18} height={18} />
                        <p className={`text-white-1 text-base md:text-lg font-mono`}>{event.guestList.length} Guests</p>
                    </div>
                    <div className='flex gap-[10px]'>
                        {event.preferenceListIds.map((y: any, key: number) => {
                            return (
                                <div key={`pref_${key}`} className='bg-primary-1 px-3 rounded-full'>
                                    <p className={`text-white-1 text-base md:text-lg  font-mono`}>
                                        {getPreferenceName(allPrefs, y)}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}