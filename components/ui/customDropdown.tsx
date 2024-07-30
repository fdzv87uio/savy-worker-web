import { useEffect, useState } from "react";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./dropdown-menu";
import { Inter } from "next/font/google";
import { Input } from "./input";
import { Button } from "./button";
const inter = Inter({ subsets: ["latin"] });


interface CustomDropdownProps {
    label: string;
    handleChange: any;
    options?: string[];
    type: string;
}

export default function CustomDropdown({ label, handleChange, options, type }: CustomDropdownProps) {
    const [selected, setSelected] = useState<any[]>([]);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState<any>('');
    function handleSelection(value: string) {
        setSelected(prev => [...prev, value]);
    }
    function handleDeselection(value: string) {
        const current: any = selected;
        const newState = current.filter((x: any) => x !== value);
        setSelected(newState)
    }
    function clearDates() {
        setToDate("");
        setFromDate("");
        handleChange([]);
    }

    function selectDates() {
        if (fromDate && toDate) {
            const newInterval = [fromDate, toDate];
            console.log(newInterval);
            handleChange(newInterval);
        }
    }

    useEffect(() => {
        handleChange(selected)
    }, [selected, fromDate, toDate])



    return (
        <>
            {type !== 'date' && options && (
                <DropdownMenu>
                    <DropdownMenuTrigger className={`placeholder-[#ffffff] pl-3 py-1.5 pr-2 w-full z-[90] h-[45px] hover:outline hover:outline-offset-2 hover:outline-2 hover:outline-[#ffffff] hover:border-[#32A852] focus:outline focus:outline-offset-2 focus:outline-2 focus:outline-[#ffffff] focus:border-[#32A852]  bg-transparent border-spacing-[2px] border-[2px] border-[#C4C4C4] rounded-xl ${inter.className} font-normal text-[#ffffff] text-sm flex flex-row justify-between items-center`}>
                        {selected.length === 0 && (
                            <span className={`${inter.className}`}>{`Select ${label}`}</span>
                        )}
                        {selected.length > 0 && (
                            <span className={`${inter.className}`}>{selected.length} selected</span>
                        )}
                        <img src={"/icons/chevrons-up-down.svg"} width={17} height={17} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className={`${inter.className} w-52 bg-[#030614] px-2 py-2 text-[#ffffff] border-[2px] sshadow-[0_64px_64px_-32px_rgba(41, 15, 0, 0.56)]`}>
                        {options.length && options.map((x: any, key: number) => {
                            if (selected.includes(x)) {
                                return (
                                    <DropdownMenuCheckboxItem checked={true} onClick={() => handleDeselection(x)} key={`option_${key + label}_selected`}>{x}</DropdownMenuCheckboxItem>
                                )
                            } else {
                                return (
                                    <DropdownMenuCheckboxItem checked={false} onClick={() => handleSelection(x)} key={`option_${key + label}_not_selected`}>{x}</DropdownMenuCheckboxItem>
                                )
                            }
                        })}
                        {options.length === 0 && (
                            <p>No Options Available</p>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
            {type === 'date' && (
                <DropdownMenu>
                    <DropdownMenuTrigger className={`placeholder-[#ffffff] pl-3 py-1.5 pr-2 w-full z-[90] h-[45px] hover:outline hover:outline-offset-2 hover:outline-2 hover:outline-[#ffffff] hover:border-[#32A852] focus:outline focus:outline-offset-2 focus:outline-2 focus:outline-[#ffffff] focus:border-[#32A852]  bg-transparent border-spacing-[2px] border-[2px] border-[#C4C4C4] rounded-xl ${inter.className} font-normal text-[#ffffff] text-sm flex flex-row justify-between items-center`}>
                        {!fromDate && !toDate && (
                            <span className={`${inter.className}`}>{`Select ${label}`}</span>
                        )}
                        {fromDate && toDate && (
                            <span className={`${inter.className}`}>{fromDate} - {toDate}</span>
                        )}
                        <img src={"/icons/calendar-white.svg"} width={14} height={14} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className={`${inter.className} w-60 bg-[#030614] px-3 py-4 text-[#ffffff] border-[2px] sshadow-[0_64px_64px_-32px_rgba(41, 15, 0, 0.56)] flex flex-col items-left gap-5`}>
                        <div className="flex flex-row gap-2 h-[30px] items-center">
                            <span>From:</span>
                            <Input type="date" value={fromDate} onChange={(e: any) => { setFromDate(e.target.value) }} />
                        </div>
                        <div className="flex flex-row gap-2 h-[30px] items-center">
                            <span>From:</span>
                            <Input type="date" value={toDate} onChange={(e: any) => { setToDate(e.target.value) }} />
                        </div>
                        <DropdownMenuItem className="h-[30px]">
                            <Button className="h-[30px] w-full" onClick={() => selectDates()} size="xsm" variant="primary">Accept</Button>
                        </DropdownMenuItem>
                        <div className="h-[30px] px-2">
                            <Button className="h-[30px] w-full" onClick={() => clearDates()} size="xsm" variant="secondary">Clear</Button>
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </>
    )
}