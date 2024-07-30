'use client'

import React, { useEffect, useState } from 'react'
import { getAllEvents } from '@/utils/eventsUtils';
import { getAllPreferences, getPreferenceId, getPreferenceName } from '@/utils/preferencesUtils';
import { Inter } from "next/font/google";
import { Input } from '@/components/ui/input';
import CustomDropdown from '@/components/ui/customDropdown';
import ScheduledEventCard from '@/components/ui/scheduledEventCard';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import Image from 'next/image';
const inter = Inter({ subsets: ["latin"] });


const Page = () => {
    const [loading, setLoading] = useState(true);
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [allPrefs, setAllPrefs] = useState([]);
    const [query, setQuery] = useState("");
    const [preferences, setPreferences] = useState<any>([]);
    const [prefFilters, setPrefFilters] = useState<any>([]);
    const [cities, setCities] = useState<any>([]);
    const [cityFilters, setCityFilters] = useState<any>([]);
    const [dates, setDates] = useState<any>([]);
    const [dateFilters, setDateFilters] = useState<any>([]);

    useEffect(() => {
        if (events.length === 0) {
            getData();
        }
    }, [events])

    async function getData() {
        const res: any = await getAllEvents();
        const res2: any = await getAllPreferences();
        if (res && res.status === "success" && res2 && res2.status === "success") {
            const allEvents = res.data;
            setEvents(allEvents);
            setFilteredEvents(allEvents);
            setAllPrefs(res2.data);
            // get app possible preference codes, cities and dates
            let prefSet = new Set();
            let citySet = new Set();
            let dateSet = new Set();
            allEvents.forEach((x: any) => {
                const prefArr = x.preferenceListIds;
                if (prefArr && prefArr.length > 0) {
                    prefArr.forEach((y: any) => {
                        prefSet.add(y);
                    })
                }
                citySet.add(x.city);
                const currentDateArr = x.startDate.split('T');
                dateSet.add(currentDateArr[0]);
            })
            const prefArray = Array.from(prefSet);
            const prefNameArray: any[] = [];
            prefArray.forEach((x: any) => {
                prefNameArray.push(getPreferenceName(res2.data, x));
            })
            const cityArray = Array.from(citySet);
            const dateArray = Array.from(dateSet);
            setPreferences(prefNameArray);
            setCities(cityArray);
            setDates(dateArray);
            setLoading(false);

        }
    }

    useEffect(() => {
        filterDataByQuery();
    }, [query])

    //Filter Data By Query
    function filterDataByQuery() {
        let resultIdSet = new Set();
        if (query) {
            const queryLen = query.length;
            filteredEvents.forEach((x: any) => {
                // Filter by title substring match
                const titleSubString = x.title.slice(0, queryLen);
                if (query.toLocaleLowerCase() === titleSubString.toLocaleLowerCase()) {
                    resultIdSet.add(x._id);
                }
                // Filter by location
                const locationSubString = x.city.slice(0, queryLen);
                if (query.toLocaleLowerCase() === locationSubString.toLocaleLowerCase()) {
                    resultIdSet.add(x._id);
                }
                // Filter by Event ID
                const idSubString = x._id.slice(0, queryLen);
                if (query === idSubString) {
                    resultIdSet.add(x._id);
                }
            })
            const resultIdArray = Array.from(resultIdSet);
            const filteredResults = events.filter((x: any) => resultIdArray.includes(x._id));
            console.log('filtered results:');
            console.log(filteredResults);
            setFilteredEvents(filteredResults);

        } else {
            setFilteredEvents(events);
        }
    }

    useEffect(() => {
        filterDataByFilters();
    }, [prefFilters, cityFilters, dateFilters])

    //Filter Data By Filters
    function filterDataByFilters() {
        let resultIdSet = new Set();
        if (prefFilters.length > 0 || cityFilters.length > 0 || dateFilters.length > 0) {
            if (prefFilters.length > 0 && cityFilters.length === 0 && dateFilters.length === 0) {
                events.forEach((x: any) => {
                    // filter by preference filter
                    const prefIds: any[] = [];
                    prefFilters.forEach((y: any) => {
                        prefIds.push(getPreferenceId(allPrefs, y));
                    })
                    const includesElement = x.preferenceListIds.some((element: any) => prefIds.includes(element))
                    if (includesElement) {
                        resultIdSet.add(x._id);
                    }
                })
            }
            if (cityFilters.length > 0 && prefFilters.length === 0 && dateFilters.length === 0) {
                events.forEach((x: any) => {
                    // filter by city filter
                    const includesElement = cityFilters.includes(x.city);
                    if (includesElement) {
                        resultIdSet.add(x._id);
                    }
                })
            }
            if (dateFilters.length > 0 && prefFilters.length === 0 && cityFilters.length === 0) {
                events.forEach((x: any) => {
                    // filter by date filter
                    const currentDate = x.startDate.split("T")[0];
                    const includesElement = dateFilters.includes(currentDate);
                    if (includesElement) {
                        resultIdSet.add(x._id);
                    }
                })
            }
            // combine 1 & 2
            if (prefFilters.length > 0 && cityFilters.length > 0 && dateFilters.length === 0) {
                events.forEach((x: any) => {
                    // filter by preference filter
                    const prefIds: any[] = [];
                    prefFilters.forEach((y: any) => {
                        prefIds.push(getPreferenceId(allPrefs, y));
                    })
                    const includesPref = x.preferenceListIds.some((element: any) => prefIds.includes(element))
                    const includesCity = cityFilters.includes(x.city);
                    if (includesPref && includesCity) {
                        resultIdSet.add(x._id);
                    }
                })
            }
            // combine 1 & 3
            if (prefFilters.length > 0 && cityFilters.length === 0 && dateFilters.length > 0) {
                events.forEach((x: any) => {
                    // filter by preference filter
                    const prefIds: any[] = [];
                    prefFilters.forEach((y: any) => {
                        prefIds.push(getPreferenceId(allPrefs, y));
                    })
                    const includesPref = x.preferenceListIds.some((element: any) => prefIds.includes(element))
                    const currentDate = x.startDate.split("T")[0];
                    const includesDate = dateFilters.includes(currentDate);
                    if (includesPref && includesDate) {
                        resultIdSet.add(x._id);
                    }
                })
            }
            // combine 2 & 3
            if (prefFilters.length === 0 && cityFilters.length > 0 && dateFilters.length > 0) {
                events.forEach((x: any) => {
                    // filter by preference filter
                    const includesCity = cityFilters.includes(x.city);
                    const currentDate = x.startDate.split("T")[0];
                    const includesDate = dateFilters.includes(currentDate);
                    if (includesCity && includesDate) {
                        resultIdSet.add(x._id);
                    }
                })
            }
            // combine 1 & 2 & 3
            if (prefFilters.length > 0 && cityFilters.length > 0 && dateFilters.length > 0) {
                events.forEach((x: any) => {
                    // filter by preference filter
                    const prefIds: any[] = [];
                    prefFilters.forEach((y: any) => {
                        prefIds.push(getPreferenceId(allPrefs, y));
                    })
                    const includesPref = x.preferenceListIds.some((element: any) => prefIds.includes(element))
                    const currentDate = x.startDate.split("T")[0];
                    const includesCity = cityFilters.includes(x.city);
                    const includesDate = dateFilters.includes(currentDate);
                    if (includesPref && includesDate && includesCity) {
                        resultIdSet.add(x._id);
                    }
                })
            }
            const resultIdArray = Array.from(resultIdSet);
            const filteredResults = events.filter((x: any) => resultIdArray.includes(x._id));
            console.log('filtered results:');
            console.log(filteredResults);
            setFilteredEvents(filteredResults);

        } else {
            setFilteredEvents(events);
        }
    }

    return (
        <div className='flex flex-col justify-center items-center relative  overflow-visible'>
            {!loading && (
                <>
                    {/* Background Images */}
                    <div className='w-screen h-auto relative top-0 left-0 overflow-hidden z-[10]'>
                        <Image
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
                        />
                        <MaxWidthWrapper className='px-16 overflow-visible'>
                            <div className='w-full flex flex-col mt-14 z-10 justify-center items-center mb-32 z-[20]'>
                                <h2 className='text-white-1 text-3xl md:text-4xl mb-8 text-center'>Your Event Matches</h2>
                                {/* Search Bar */}
                                <div className='min-w-full h-auto grid grid-cols-4 gap-10'>
                                    <div className='w-full h-auto relative'>
                                        <Input placeholder='Search' className='h-[45px] absolute top-0' type='text' value={query} onChange={(e: any) => setQuery(e.target.value)} />
                                        <img src={"/icons/search.svg"} alt="" width={17} height={17} className='absolute top-3.5 right-4' />
                                    </div>
                                    <CustomDropdown options={preferences} label={"preferences"} handleChange={setPrefFilters} type={"default"} />
                                    <CustomDropdown options={cities} label={"city"} handleChange={setCityFilters} type={"default"} />
                                    <CustomDropdown options={dates} label={"date"} handleChange={setDateFilters} type={"date"} />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-center gap-4 mt-14">
                                    {filteredEvents.length > 0 && filteredEvents.map((event: any, key: number) => {
                                        return (
                                            <ScheduledEventCard key={`item_${key}_${event._id}`} allPrefs={allPrefs} event={event} />
                                        )
                                    })}
                                </div>
                                {filteredEvents.length === 0 && (
                                    <div className='w-full h-auto mt-[5px] text-xl text-[#ffffff] flex flex-col items-center font-normal'>
                                        <p>No Events Available</p>
                                    </div>
                                )}

                            </div>
                        </MaxWidthWrapper>
                    </div>

                </>
            )}

        </div>
    )
}

export default Page