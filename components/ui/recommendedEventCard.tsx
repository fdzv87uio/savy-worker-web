import Image from "next/image";
import { useEffect, useState } from "react";
import { getSignedImageUrl } from "@/utils/imageFetchUtils";
import { useRouter } from "next/navigation";

interface RecommendedEventCardProps {
    event: any;
    isUser?: boolean;
}

export default function RecommendedEventCard({ event, isUser }: RecommendedEventCardProps) {
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
        <div key={event.id} className="min-h-[407px] w-[350px] md:w-[359px] bg-white-1 rounded-xl overflow-hidden shadow-xl transform transition-all hover:scale-105">
            <div className="relative">
                {signedUrl && (
                    <img onClick={() => router.push(`/event/${event.slug}`)} src={signedUrl} alt={event.title} className="w-full h-64 bg-black cursor-pointer object-cover rounded-xl" />
                )}
                <div className="absolute bottom-[-30px] left-0 bg-green-600 p-2 rounded-full m-4">
                    {/* <img src={getIcon(event.categoryList)} alt={event.title} className="w-6 h-6" /> */}
                </div>
            </div>
            <div className="p-4">
                <div className="relative mb-4">
                    <div onClick={() => router.push(`/event/${event.slug}`)} className="cursor-pointer bg-secondary-1 py-2 px-4 transform -skew-x-12 shadow-custom-primary">
                        <h3 className="text-xl md:text-2xl text-center transform  skew-x-12 text-white-1">{event.title}</h3>
                    </div>
                </div>
                {isUser &&
                    <div className='flex flex-col justify-center items-center gap-3'>
                        <Image src="/images/user-icon.png" alt="Profile photo" className="rounded-full" width={53} height={53} />
                        <h2 className='text-black-1 text-xl md:text-2xl'>{event.author}</h2>
                    </div>
                }
                <div className="text-center mt-4">
                    {event.eventMode !== "online" && (
                        <>
                            <p className={`font-mono text-black-1 text-sm md:text-base`}>Location: {event.location}</p>
                            <p className={`font-mono text-black-1 text-sm md:text-base`}>{event.city}, USA</p>
                        </>
                    )}
                    {event.eventMode === "online" && (
                        <>
                            <p className={`font-mono text-black-1 font-bold text-lg md:text-base`}>Online Event</p>
                        </>
                    )}
                </div>
                {isUser &&
                    <div className='flex justify-center gap-10 mt-3'>
                        <Image src="/icons/heart.svg" alt="heart" className="rounded-full w-[53px] h-[53px]" width={53} height={53} />
                        <Image src="/icons/calendar.svg" alt="calendat" className="rounded-full w-[53px] h-[53px]" width={53} height={53} />
                        <Image src="/icons/dislike.svg" alt="thumb" className="rounded-full w-[53px] h-[53px]" width={53} height={53} />
                    </div>
                }
            </div>
        </div>
    )
}