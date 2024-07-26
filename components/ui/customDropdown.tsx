"use client"
import { useEffect, useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./dropdown-menu";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });


interface CustomDropdownProps {
    label: string;
    handleChange: any;
    options: string[];
    type: string;
    filterValue: string;
}

export default function CustomDropdown({ label, handleChange, options, type, filterValue }: CustomDropdownProps) {
    const [selected, setSelected] = useState("");

    function handleSelection(value: string) {
        setSelected(value);
        handleChange(label, value);
    }

    useEffect(() => {
        if (filterValue !== selected) {
            setSelected("");
        }
    }, [filterValue])

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className={`h-full placeholder-[#ffffff] pl-3 py-1.5 pr-2 w-full z-[90] h-[36px] hover:outline hover:outline-offset-2 hover:outline-2 hover:outline-[#ffffff] hover:border-[#32A852] focus:outline focus:outline-offset-2 focus:outline-2 focus:outline-[#ffffff] focus:border-[#32A852]  bg-transparent border-spacing-[2px] border-[2px] border-[#C4C4C4] rounded-xl ${inter.className} font-normal text-[#ffffff] text-sm flex flex-row justify-between items-center`}>
                {!selected && (
                    <span className={`${inter.className}`}>{`Select ${label}`}</span>
                )}
                {selected && (
                    <div className="flex flex-row justify-between gap-2 items-center bg-primary-1 rounded-xl px-3">
                        <span className={`${inter.className}`}>{selected}</span>
                    </div>
                )}

                {type === "default" && (
                    <img src={"/icons/chevrons-up-down.svg"} width={17} height={17} />
                )}
                {type === "date" && (
                    <img src={"/icons/calendar-white.svg"} width={14} height={14} />
                )}
            </DropdownMenuTrigger>
            <DropdownMenuContent className={`${inter.className} w-52 bg-yellow-100`}>
                {options.map((x: any, key: number) => {
                    return (
                        <DropdownMenuItem onClick={() => handleSelection(x)} key={`option_${key}`}>{x}</DropdownMenuItem>
                    )
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}