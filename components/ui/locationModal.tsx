'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./dialog";
import QRCode from "react-qr-code";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "./button";
import { useEffect, useState } from "react";
import { Input } from "./input";
import { getLocationByQuery } from "@/utils/locationUtils";

interface LocationModalProps {
    onChange: any;
    value: string;
}

export default function LocationModal({ onChange, value }: LocationModalProps) {
    const [results, setResults] = useState<any[]>([]);
    const [query, setQuery] = useState("");
    const [selection, setSelection] = useState(value);

    useEffect(() => {
        const q = query;
        if (q.length > 0) {
            getLocations(q);
        }
    }, [query])

    async function getLocations(q: string) {
        const res: any = await getLocationByQuery(q);
        if (res.status === "success") {
            if (res.data.data.length > 0) {
                console.log(res.data.data);
                setResults(res.data.data);
            } else {
                setResults([]);
            }

        }
    }

    function handleSelect(value: string) {
        setSelection(value)
        onChange(value);
    }

    return (
        <Dialog>
            <DialogTrigger>
                <div className="w-full h-[38px] relative mb-2">
                    <div
                        className={`placeholder-[#ffffff] flex flex-col justify-center p-2.5 w-full z-[90] h-[38px] hover:outline hover:outline-offset-2 hover:outline-2 hover:outline-[#ffffff] hover:border-[#32A852] bg-transparent border-spacing-[2px] border-[2px] border-[#C4C4C4] rounded-xl font-mono font-normal text-[#ffffff] text-sm`}
                    >
                        <span className="w-full text-left">{selection ? selection : "Select Location"}</span>
                    </div>
                    <img src={"/icons/event-location-icon.svg"} alt="" width={17} height={17} className='absolute top-2.5 right-4' />
                </div>
            </DialogTrigger>
            <DialogContent>
                <div className="w-full h-auto flex flex-col items-left">
                    <div className="w-[96%] pl-1 mt-2.5 h-auto flex flex-col">
                        <Input
                            type="text"
                            value={query}
                            name="query"
                            placeholder="search location..."
                            onChange={(e: any) => setQuery(e.target.value)}
                        />
                    </div>
                    <div className={`w-full h-[290px] mt-4 flex overflow-y-scroll ${results?.length === 0 ? "justify-center items-center" : ""} flex-col gap-2`}>
                        {results.length > 0 && results.map((x: any, key: number) => {
                            const labelArray = x.Place.Label.split(",");
                            const label = labelArray[0];
                            const detail = labelArray.slice(1).join(",");
                            return (
                                <DialogClose onClick={() => handleSelect(label)} key={`location_${key}`} className="flex flex-col w-full">
                                    <div className={`cursor-pointer flex flex-col justify-center items-left p-1 w-[95%] m-1 min-h-[80px] h-auto hover:outline hover:outline-offset-2 hover:outline-2 hover:outline-[#ffffff] hover:border-[#32A852] bg-transparent border-spacing-[2px] border-[2px] border-[#C4C4C4] rounded-xl font-mono font-normal text-[#ffffff] hover:text-[#32A852]`}>
                                        <div className="flex flex-row items-center px-2.5 gap-2">
                                            <img src={"/icons/event-location-icon.svg"} alt="" width={37} height={37} />
                                            <div className="flex flex-col items-left gap-1">
                                                <span className=" text-lg text-left"><strong>{label}</strong></span>
                                                <span className=" text-xs text-left text-[#ffffff]/80"><strong>{detail}</strong></span>
                                            </div>
                                        </div>
                                    </div>
                                </DialogClose>
                            )
                        })}
                        {results.length === 0 && (
                            <p>No Items Found</p>
                        )}

                    </div>
                    <div className="w-full h-auto flex flex-col items-center">
                        <DialogClose className="flex w-[150px] p-0">
                            <Button variant="default" size="sm" className="mb-4 mt-5 w-[250px]">Close</Button>
                        </DialogClose>
                    </div>

                </div>
            </DialogContent>
        </Dialog >
    )
}