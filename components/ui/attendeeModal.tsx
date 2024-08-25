'use client'

import { Audiowide, Inter } from "next/font/google";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./dialog";
const inter = Inter({ subsets: ["latin"] });
const audiowide = Audiowide({ subsets: ["latin"], weight: "400" });
import QRCode from "react-qr-code";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "./button";
import { useEffect, useState } from "react";
import { Input } from "./input";
import { getLocationByQuery } from "@/utils/locationUtils";
import { getAllUsers } from "@/utils/authUtils";

interface AttendeeModalProps {
    onChange: any;
    token?: string;
}

export default function AttendeeModal({ onChange, token }: AttendeeModalProps) {
    const [results, setResults] = useState<any[]>([]);
    const [query, setQuery] = useState("");
    const [selection, setSelection] = useState<string[]>([]);
    const [users, setUsers] = useState<any>();

    useEffect(() => {
        const q = query;
        if (q.length > 0) {
            getLocations(q);
        } else {
            setResults([])
        }
    }, [query])

    useEffect(() => {
        if (!users && token) {
            getUsers(token);
        }
    }, [users])

    useEffect(() => {
        //reload if selection changes
    }, [selection])

    async function getUsers(userToken: string) {
        const res: any = await getAllUsers(userToken);
        if (res.status === "success") {
            console.log(res.data);
            if (res.data.length > 0) {
                setUsers(res.data);
            }

        }
    }


    async function getLocations(q: string) {
        const res: any = [];
        users.forEach((item: any) => {
            // filter by name
            const qlen = q.length;
            const nameq = item.name.slice(0, qlen);
            const lastnameq = item.lastname.slice(0, qlen);
            const emailq = item.email.slice(0, qlen);

            if (q === nameq || q === lastnameq || q === emailq) {
                res.push(item)
            }
        })
        if (res.length > 0) {
            setResults(res);
        } else {
            setResults([]);
        }
    }

    function handleSelect(value: any) {
        if (!selection.includes(value.email)) {
            setSelection(prev => [...prev, value.email]);
        }
    }

    function handleDeselect(value: any) {
        if (selection.includes(value)) {
            const filter = selection.filter((x) => x !== value);
            setSelection(filter)
        }
    }

    function setData() {
        console.log(selection);
        onChange(selection);
    }

    return (
        <Dialog>
            <DialogTrigger>
                <div className="w-full h-[38px] relative mb-2">
                    <div
                        className={`placeholder-[#ffffff] flex flex-col justify-center p-2.5 w-full z-[90] h-[38px] hover:outline hover:outline-offset-2 hover:outline-2 hover:outline-[#ffffff] hover:border-[#32A852] bg-transparent border-spacing-[2px] border-[2px] border-[#C4C4C4] rounded-xl ${inter.className} font-normal text-[#ffffff] text-sm`}
                    >
                        <span className="w-full text-left">{selection.length > 0 ? `${selection.length} Users Selected` : "Select Users"}</span>
                    </div>
                    <img src={"/images/user-icon.png"} alt="" width={17} height={17} className='absolute top-2.5 right-4' />
                </div>
            </DialogTrigger>
            <DialogContent>
                <div className="w-full h-auto flex flex-col items-left">
                    <div className="w-[96%] pl-1 mt-2.5 h-auto flex flex-row items-center gap-3">
                        <p><strong>Search:</strong></p>
                        <Input
                            type="text"
                            value={query}
                            name="query"
                            placeholder="search by user Email, Name, Lastname..."
                            onChange={(e: any) => setQuery(e.target.value)}
                        />
                    </div>
                    <div className={`w-full h-[150px] md:h-[170px] mt-4 flex overflow-y-scroll ${results?.length === 0 ? "justify-center items-center" : ""} flex-col gap-1`}>
                        {results.length > 0 && results.map((x: any, key: number) => {
                            const label = x.name + " " + x.lastname;
                            const detail = x.email;
                            return (
                                <div onClick={() => handleSelect(x)} key={`location_${key}`} className="flex flex-col w-full">
                                    <div className={`cursor-pointer py-2 flex flex-col justify-center items-left p-1 w-[95%] m-1 min-h-[40px] h-auto hover:outline hover:outline-offset-2 hover:outline-2 hover:outline-[#ffffff] hover:border-[#32A852] bg-transparent border-spacing-[2px] border-[2px] border-[#C4C4C4] rounded-xl ${inter.className} font-normal text-[#ffffff] hover:text-[#32A852]`}>
                                        <div className="flex flex-row items-center px-2.5 gap-2">
                                            <img src={"/images/user-icon.png"} alt="" width={17} height={17} />
                                            <div className="flex flex-col md:flex-row items-left mr-4 md:mr-0 md:items-center items-left gap-1 md:gap-2">
                                                <span className=" text-base text-left"><strong>{label}</strong></span>
                                                <span className=" hidden md:flex text-base text-left"><strong>-</strong></span>
                                                <span className=" text-xs text-left text-[#ffffff]/80"><strong>{detail}</strong></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                        {results.length === 0 && (
                            <p>No Users Found</p>
                        )}

                    </div>
                    <p className="pl-2 my-2 text-base text-left"><strong>{selection.length} Users Selected: ⤵</strong></p>
                    <div className={`w-full h-[170px] mt-4 flex flex-col overflow-y-scroll ${selection?.length === 0 ? "justify-center items-center" : ""} flex-col gap-1`}>
                        {selection && selection.length > 0 && selection.map((x: any, key: number) => {
                            return (
                                <div key={`attendee_${key}`} className="px-2 w-full flex flex-row h-[30px] items-center justify-between bg-gray-500/50 hover:bg-gray-500 text-[#ffffff] border border-[#ffffff] rounded-lg">
                                    <span>{x}</span>
                                    <img onClick={() => handleDeselect(x)} src="/icons/x.svg" width={20} height={20} alt="" className="cursor-pointer" />
                                </div>
                            )
                        })}
                        {selection.length === 0 && (
                            <p>No Users Selected Yet</p>
                        )}

                    </div>
                    <div className="w-full h-auto flex flex-col items-center">
                        <div className="w-auto flex flex-col md:flex-row gap-1 md:gap-3">
                            <DialogClose onClick={() => setData()} className="flex w-[150px] p-0">
                                <Button variant="secondary" size="sm" className="mb-4 md:mt-5 w-[250px]">Finish</Button>
                            </DialogClose>
                            <DialogClose className="flex w-[150px] p-0">
                                <Button variant="default" size="sm" className="mb-4 md:mt-5 w-[250px]">Close</Button>
                            </DialogClose>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog >
    )
}