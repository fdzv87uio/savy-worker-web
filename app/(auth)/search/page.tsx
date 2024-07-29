'use client'

import React, { useEffect, useState } from 'react'
import Hero from '@/components/Hero';
import RecommendedEvents from '@/components/RecommendedEvents';
import SignUpForFree from '@/components/SignUpForFree';
import Image from 'next/image';
import PopularCategories from '@/components/PopularCategories';
import UserReviews from '@/components/UserReviews';
import { getCookie } from 'cookies-next';
import UserBanner from '@/components/UserBanner';
import ScheduledEvents from '@/components/ScheduledEvents';
import { Skeleton } from '@/components/ui/skeleton';
import { findUserByEmail } from '@/utils/authUtils';
import { useAuthTokenStore } from '@/stores/authTokenStore';
import { getAllEvents } from '@/utils/eventsUtils';
import { getAllPreferences, getPreferenceName } from '@/utils/preferencesUtils';
import { Inter } from "next/font/google";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import CustomDropdown from '@/components/ui/customDropdown';
import ScheduledEventCard from '@/components/ui/ScheduledEventCard';
const inter = Inter({ subsets: ["latin"] });


const Page = () => {
    const [isUser, setIsUser] = useState<boolean>(false);
    const [userInfo, setUserInfo] = useState()
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(true);
    const { authToken, setAuthToken } = useAuthTokenStore();
    const [events, setEvents] = useState([]);
    const [allPrefs, setAllPrefs] = useState([]);
    const [query, setQuery] = useState("");
    const [preferences, setPreferences] = useState(["uno", "dos", "tres"]);
    const [cities, setCities] = useState(["Houston", "Miami"]);
    const [filterType, setFilterType] = useState("");
    const [filterValue, setFilterValue] = useState("");

    function handleFilterChange(type: string, value: string) {
        setFilterType(type);
        setFilterValue(value);
    }

    useEffect(() => {
        if (events.length === 0) {
            getData();
        }
    }, [events, allPrefs])

    async function getData() {
        const res: any = await getAllEvents();
        const res2: any = await getAllPreferences();
        if (res && res.status === "success" && res2 && res2.status === "success") {
            const allEvents = res.data;
            setEvents(allEvents);
            setAllPrefs(res2.data);
        }
    }

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.scrollTo(0, 0)
        }
        const token = getCookie('curcle-auth-token')
        const userEmail = getCookie('curcle-user-email')
        if (authToken) {
            if (token && userEmail) {
                // Si existe token, traer la info del usuario con email
                getUserInfo(userEmail, token);
            } else {
                setIsUser(false);
                setLoading(false)
            }
        } else {
            if (token && userEmail) {
                setAuthToken(token);
                getUserInfo(userEmail, token);
            } else {
                setIsUser(false);
                setLoading(false);
            }
        }

    }, [isUser, setIsUser, authToken, loading])

    // Get User info
    async function getUserInfo(email: string, token: string) {
        const res: any = await findUserByEmail(email, token);
        if (res && res.status === "success") {
            setUserInfo(res.data);
            setName(res.data.name);
            setLastname(res.data.lastname);
            setEmail(res.data.email);
            setIsUser(true);
            setLoading(false);
        } else {
            setIsUser(false);
            setLoading(false);
        }

    }

    return (
        <div className='flex flex-col justify-center items-center relative'>
            {!loading && (
                <>
                    {/* <Image
                        src="/images/vector1.svg"
                        alt="Ellipse"
                        width={581}
                        height={307}
                        className="absolute top-[700px] left-[0] object-cover blur-xl w-[581px] h-[307px]"
                    />
                    <Image
                        src="/images/vector2.svg"
                        alt="Ellipse"
                        width={699}
                        height={430}
                        className="hidden xl:flex absolute top-[630px] left-[400px] md:left-[700px] object-cover blur-xl"
                    />
                    <Image
                        src="/images/vector3.svg"
                        alt="Ellipse"
                        width={238}
                        height={227}
                        className="absolute top-[1800px] left-[100px] object-cover blur-xl w-[238px] h-[227px]"
                    />
                    <Image
                        src="/images/vector4.svg"
                        alt="Ellipse"
                        width={324}
                        height={364}
                        className="hidden xl:flex absolute top-[1750px] md:left-[1000px] object-cover blur-md"
                    /> */}


                    <div className='flex flex-col mt-14 z-10 justify-center items-center mb-32'>
                        <h2 className='text-white-1 text-3xl md:text-4xl mb-8 text-center'>Your Event Matches</h2>
                        <div className='w-full h-auto flex flex-row gap-10'>
                            <div className='flex flex-row w-96 gap-2.5'>
                                <Input className='h-[45px]' type='text' value={query} onChange={(e: any) => setQuery(e.target.value)} />
                                <Button variant="primary" size="sm" className={`text-xs font-normal ${inter.className} h-[45px] px-5 py-1`}>
                                    Search
                                </Button>
                            </div>
                            <div className='w-56'>
                                <CustomDropdown filterValue={filterValue} options={preferences} label={"preferences"} handleChange={handleFilterChange} type={"default"} />
                            </div>
                            <div className='w-44'>
                                <CustomDropdown filterValue={filterValue} options={cities} label={"city"} handleChange={handleFilterChange} type={"default"} />
                            </div>
                            <div className='w-56 h-[45px]'>
                                <CustomDropdown filterValue={filterValue} options={preferences} label={"date"} handleChange={handleFilterChange} type={"date"} />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-center gap-4 mt-20">
                            {events.length > 0 && events.map((event: any, key: number) => {
                                return (
                                    <ScheduledEventCard key={`item_${key}`} allPrefs={allPrefs} event={event} />
                                )
                            })}
                        </div>
                        {events.length === 0 && (
                            <div className='w-full h-auto mt-[5px] text-xl text-[#ffffff] flex flex-col items-center font-normal'>
                                <p>No Events Available</p>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    )
}

export default Page