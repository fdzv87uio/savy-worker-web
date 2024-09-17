import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Inter } from "next/font/google";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createEventFormStore } from '@/stores/createEventFormStore';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import React, { useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Image from "next/image";
import { createTaskFormStore } from "@/stores/createTaskFormStore";
import { Progress } from "@/components/ui/progress";
import CustomFormCard from "@/components/ui/CustomFormCard";
const inter = Inter({ subsets: ["latin"] });

type Inputs = {
    startDate: Date;
    endDate: Date;
};

const validationSchema: Yup.ObjectSchema<Inputs> = Yup.object({
    startDate: Yup.date().required('Start date is required'),
    endDate: Yup.date().required('Finish date is required'),
});
export default function StepThree() {

    const { inputs, setInputs } = createTaskFormStore();

    const defaultValues: Inputs = {
        startDate: inputs.startDate || new Date(),
        endDate: inputs.endDate || new Date()
    };


    const { control, handleSubmit, watch, formState: { errors } } = useForm<Inputs>({
        defaultValues,
        resolver: yupResolver(validationSchema),
        mode: 'onChange',
    });


    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log('data:');
        console.log(data);
        const updatedData = { ...inputs, ...data, step: 4, progress: 80 };
        setInputs(updatedData);
    };

    const handleBackClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setInputs({ ...inputs, step: 2, progress: 40 });
    };

    return (
        <CustomFormCard>
            <Progress value={inputs.progress} max={100} className='z-[20]' id="progress" />
            <form className={`h-auto w-[250px] md:w-[100%] mt-12 flex flex-col gap-4`} onSubmit={handleSubmit(onSubmit)}>
                {/* Dates */}
                <div className="flex w-full grid grid-cols-2 gap-8">
                    <div className="flex flex-col col-span-1">
                        <div className="flex flex-col items-left gap-[5px]">
                            <Label className={`${inter.className} text-base`}>Event Start Date</Label>
                            <Controller
                                control={control}
                                name="startDate"
                                render={({ field }) => (
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[220px] justify-start text-left font-normal flex h-10 w-full rounded-md border border-[2px] border-primary bg-background px-3 py-2 font-mono text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {field.value ?
                                                    <span className={`${inter.className}`}>{format(field.value, "PPP")}</span>
                                                    : <span className={`${inter.className}`}>Pick a date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className={`${inter.className} w-auto p-0`}>
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                initialFocus
                                                className={`${inter.className} bg-white-1`}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                )}
                            />
                            {errors.startDate && errors.startDate.message && (
                                <p className={`pl-2 text-red-300 font-bold ${inter.className} text-sm`}>{`${errors.startDate.message}`}</p>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col col-span-1">
                        <div className="flex flex-col items-left gap-[5px]">
                            <Label className={`${inter.className} text-base`}>Event End Date</Label>
                            <Controller
                                control={control}
                                name="endDate"
                                render={({ field }) => (
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[220px] justify-start text-left font-normal flex h-10 w-full rounded-md border border-[2px] border-primary bg-background px-3 py-2 font-mono text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {field.value ?
                                                    <span className={`${inter.className}`}>{format(field.value, "PPP")}</span>
                                                    : <span className={`${inter.className}`}>Pick a date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className={`${inter.className} w-auto p-0`}>
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                initialFocus
                                                className={`${inter.className} bg-white-1`}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                )}
                            />
                            {errors.startDate && errors.startDate.message && (
                                <p className={`pl-2 text-red-300 font-bold ${inter.className} text-sm`}>{`${errors.startDate.message}`}</p>
                            )}
                        </div>
                    </div>
                </div>
                {/* Important Info */}
                <div className={`${inter.className} w-full text-[#000000]/40 h-auto mt-8 flex gap-4 flex-col justify-left`}>
                    <p><strong>* IMPORTANT NOTE * </strong></p>
                    <p>Tasks will only be available during the interval between start date and end date, and if they have been approved by the administrator. This process takes around 24 hours in total so make sure to schedule your tasks in advance.
                        Once your task has been verified, it will be immediately displayed in the dashboard once the author adds you to the participants list.
                    </p>
                </div>
                {/* Controls */}
                <div className='w-full flex flex-row mt-[13px] mb-[30px] justify-between'>
                    <Button variant="default" size="sm" className={`w-[200px] h-[36px] px-4 py-2 text-sm font-normal ${inter.className} mt-3`} onClick={handleBackClick}>
                        Back
                    </Button>
                    <Button type="submit" variant="secondary" size="sm" className={`w-[200px] h-[36px] px-4 py-2 text-sm font-normal ${inter.className} mt-3`}>
                        Next
                    </Button>
                </div>
            </form>
        </CustomFormCard>
    );
}
