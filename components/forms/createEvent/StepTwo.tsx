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
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Image from "next/image";
const inter = Inter({ subsets: ["latin"] });

type Inputs = {
    startDate: Date;
    startHours?: number;
    startMinutes?: number;
    startAmPm?: string;
    finishDate: Date;
    finishHours?: number;
    finishMinutes?: number;
    finishAmPm?: string;
    repeatNumber?: number;
    repeatType?: string;
    repeatOn?: string[];
    recurring?: string;
    // frequency: string;
    eventEnds?: string;
    datePick?: Date;
    ocurrences?: number;
};

const validationSchema: Yup.ObjectSchema<Inputs> = Yup.object({
    startDate: Yup.date().required('Start date is required'),
    startHours: Yup.number().optional(),
    startMinutes: Yup.number().optional(),
    startAmPm: Yup.string().optional(),
    finishDate: Yup.date().required('Finish date is required'),
    finishHours: Yup.number()
        .optional(),
    finishMinutes: Yup.number()
        .optional(),
    finishAmPm: Yup.string().optional(),
    repeatNumber: Yup.number()
        .min(1, 'Repeat number must be at least 1')
        .optional(),
    repeatType: Yup.string().optional(),
    repeatOn: Yup.array().of(
        Yup.string().oneOf(['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']).required()
    ).optional(),
    recurring: Yup.string()
        .oneOf(['yes', 'no'], 'Invalid recurring value')
        .optional(),
    eventEnds: Yup.string()
        .oneOf(['on', 'after', 'never'], 'Invalid event ends value')
        .optional(),
    datePick: Yup.date().optional(),
    ocurrences: Yup.number()
        .min(1, 'Occurrences must be at least 1')
        .optional(),
});
export default function StepTwo() {

    const { inputs, setInputs } = createEventFormStore();

    const defaultValues: Inputs = {
        startDate: inputs.startDate || new Date(),
        startHours: inputs.startHours || 10,
        startMinutes: inputs.startMinutes || 30,
        startAmPm: inputs.startAmPm || "am",
        finishDate: inputs.finishDate || new Date(),
        finishHours: inputs.finishHours || 10,
        finishMinutes: inputs.finishMinutes || 30,
        finishAmPm: inputs.finishAmPm || "am",
        recurring: inputs.recurring || "no",
        // frequency: inputs.frequency || "Day",
        repeatNumber: inputs.repeatNumber || 1,
        repeatType: inputs.repeatType || "Day",
        repeatOn: inputs.repeatOn || ['monday'],
        eventEnds: inputs.eventEnds || "never",
        datePick: inputs.datePick || new Date(),
        ocurrences: inputs.ocurrences || 2,
    };

    const daysOfWeek = [
        { value: "sunday", label: "S" },
        { value: "monday", label: "M" },
        { value: "tuesday", label: "T" },
        { value: "wednesday", label: "W" },
        { value: "thursday", label: "T" },
        { value: "friday", label: "F" },
        { value: "saturday", label: "S" },
    ];

    const { control, handleSubmit, watch, formState: { errors } } = useForm<Inputs>({
        defaultValues,
        resolver: yupResolver(validationSchema),
        mode: 'onChange',
    });
    const [date, setDate] = React.useState<Date>()

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const updatedData = { ...inputs, ...data, step: 3, progress: 50 };
        setInputs(updatedData);
    };

    const handleBackClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setInputs({ ...inputs, step: 1, progress: 10 });
    };

    const recurringValue = watch("recurring");
    const repeatTypeValue = watch("repeatType");

    return (
        <form className={`absolute w-[250px] md:w-[450px] mt-12 flex flex-col gap-4`} onSubmit={handleSubmit(onSubmit)}>

            {(errors.repeatNumber) && (
                <div className="flex gap-3">
                    <Image
                        src="/icons/error.svg"
                        alt="Error"
                        width={15}
                        height={15}
                    />
                    <div>
                        <p className="text-red-500 text-base">Required Information Missing</p>
                        <p className="text-red-500 text-xs">Please review your form and ensure all required fields are filled out.</p>
                    </div>
                </div>
            )}

            {/* recurring */}
            <div className='flex flex-col gap-[5px]'>
                <Label className={`${inter.className} text-base`}>Is this event recurring?</Label>
                <Controller
                    name="recurring"
                    control={control}
                    render={({ field }) => (
                        <RadioGroup {...field} onValueChange={field.onChange} className='flex'>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="yes" />
                                <Label className={inter.className}>Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="no" />
                                <Label className={inter.className}>No</Label>
                            </div>
                        </RadioGroup>
                    )}
                />
                {errors.recurring && <span className="text-red-500">{errors.recurring.message}</span>}
            </div>

            {/* frequency */}
            {/* <div className='flex flex-col gap-[5px]'>
                <Label className={`${inter.className} text-base`}>Frequency</Label>
                <Controller
                    name="frequency"
                    control={control}
                    render={({ field }) => (
                        <RadioGroup {...field} onValueChange={field.onChange} className='flex'>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Day" id="r1" />
                                <Label className={inter.className}>Day</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Weekly" id="r1" />
                                <Label className={inter.className}>Weekly</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Monthly" id="r2" />
                                <Label className={inter.className}>Monthly</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Anually" id="r1" />
                                <Label className={inter.className}>Annually</Label>
                            </div>
                        </RadioGroup>
                    )}
                />
                {errors.frequency && <span className="text-red-500">{errors.frequency.message}</span>}
            </div> */}

            {/* repeat group */}
            {recurringValue === "yes" && (
                <div className="flex flex-col gap-3">
                    <Label className={`${inter.className} text-base`}>Frequency</Label>
                    <div className="flex gap-3">
                        <Label className={`${inter.className} text-base`}>Repeat every</Label>
                        {/* repeatNumber */}
                        <div className="flex flex-col items-left gap-[5px]">
                            <Controller
                                control={control}
                                name="repeatNumber"
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        type="number"
                                        min={0}
                                        placeholder='Repeat number'
                                        className="bg-transparent text-white-1 w-[100px]"
                                    />
                                )}
                            />
                            {errors.repeatNumber && errors.repeatNumber.message && (
                                <p className={`pl-2 text-red-300 font-bold ${inter.className} text-sm`}>{errors.repeatNumber.message}</p>
                            )}
                        </div>

                        {/* repeatType */}
                        <div className="flex flex-col items-left gap-[5px]">
                            <Controller
                                name="repeatType"
                                control={control}
                                render={({ field }) => (
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger className={`w-[100px] text-white-1 ${inter.className}`}>
                                            <SelectValue placeholder="Day" />
                                        </SelectTrigger>
                                        <SelectContent className="text-white-1 bg-black-1">
                                            <SelectGroup>
                                                <SelectItem value="Day">Day</SelectItem>
                                                <SelectItem value="Week">Week</SelectItem>
                                                <SelectItem value="Month">Month</SelectItem>
                                                <SelectItem value="Year">Year</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.repeatType && errors.repeatType.message && (
                                <p className={`pl-2 text-red-300 font-bold ${inter.className} text-sm`}>{errors.repeatType.message}</p>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* repeatOn */}
            {(recurringValue === "yes" && repeatTypeValue === "Week") && (
                <div className="flex flex-col items-left gap-[5px]">
                    <Label className={`${inter.className} text-base`}>Repeat on</Label>
                    <div className='flex gap-2'>
                        {daysOfWeek.map((day) => (
                            <Controller
                                key={day.value}
                                name="repeatOn"
                                control={control}
                                render={({ field }) => (
                                    <div className={`flex items-center space-x-2 ${inter.className}`}>
                                        <Checkbox
                                            id={day.value}
                                            checked={field.value?.includes(day.value) ?? false}
                                            onCheckedChange={(checked) => {
                                                const value = field.value ?? [];
                                                if (checked) {
                                                    field.onChange([...value, day.value]);
                                                } else {
                                                    field.onChange(value.filter((v: string) => v !== day.value));
                                                }
                                            }}
                                        />
                                        <Label htmlFor={day.value}>{day.label}</Label>
                                    </div>
                                )}
                            />
                        ))}
                    </div>
                </div>
            )}


            {/* Event ends */}
            {recurringValue === "yes" && (

                <div className='flex flex-col gap-[5px]'>
                    <Label className={`${inter.className} text-base`}>Events Ends {repeatTypeValue}</Label>
                    <div className="flex">
                        <Controller
                            name="eventEnds"
                            control={control}
                            render={({ field }) => (
                                <RadioGroup {...field} onValueChange={field.onChange} className='flex flex-col gap-[35px] mt-[20px]'>
                                    {/* <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="never" />
                                    <Label className={inter.className}>Never</Label>
                                </div> */}
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="on" />
                                        <Label className={inter.className}>On</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="after" />
                                        <Label className={inter.className}>After</Label>
                                    </div>
                                </RadioGroup>
                            )}
                        />
                        <div>
                            {/* datePick */}
                            <div className="flex flex-col items-left gap-[5px] mt-[10px] ml-5">
                                <Controller
                                    control={control}
                                    name="datePick"
                                    render={({ field }) => (
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[280px] justify-start text-left font-normal",
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

                            </div>
                            {/* ocurences */}
                            <div className="flex flex-col items-left gap-[5px] mt-3 ml-5">
                                <Controller
                                    control={control}
                                    name="ocurrences"
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            type="number"
                                            placeholder='Hours'
                                            min={0}
                                            max={12}
                                            className="bg-transparent text-white-1 w-[80px]"
                                        />
                                    )}
                                />

                            </div>
                        </div>
                    </div>

                    {errors.recurring && <span className="text-red-500">{errors.recurring.message}</span>}
                </div>
            )}

            <div className="flex w-full gap-8">
                <div className="flex flex-col  w-1/2">

                    {/* start date */}
                    <div className="flex flex-col items-left gap-[5px]">
                        <Label className={`${inter.className} text-base`}>Event start date</Label>
                        <Controller
                            control={control}
                            name="startDate"
                            render={({ field }) => (
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[220px] justify-start text-left font-normal",
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
                        {/* {!errors.startDate && (
                            <p className={`pl-2 text-[#ffffff] font-normal ${inter.className} text-sm`}>Select start date and time</p>
                        )} */}
                        {errors.startDate && errors.startDate.message && (
                            <p className={`pl-2 text-red-300 font-bold ${inter.className} text-sm`}>{`${errors.startDate.message}`}</p>
                        )}
                    </div>

                    {/* start time */}
                    <div className="flex flex-col items-left gap-[5px] mt-3">
                        <Label className={`${inter.className} text-base`}>Event start time</Label>
                        <div className="flex gap-3">
                            {/* hours */}
                            <div className="flex flex-col items-left gap-[5px]">
                                <Controller
                                    control={control}
                                    name="startHours"
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            type="number"
                                            placeholder='Hours'
                                            min={0}
                                            max={12}
                                            className="bg-transparent text-white-1 w-[60px]"
                                        />
                                    )}
                                />
                                {errors.startHours && errors.startHours.message && (
                                    <p className={`pl-2 text-red-300 font-bold ${inter.className} text-sm`}>{errors.startHours.message}</p>
                                )}
                            </div>

                            <div className="flex justify-center items-center">:</div>

                            {/* minutes */}
                            <div className="flex flex-col items-left gap-[5px]">
                                <Controller
                                    control={control}
                                    name="startMinutes"
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            type="number"
                                            placeholder='Minutes'
                                            min={0}
                                            max={59}
                                            className="bg-transparent text-white-1 w-[60px]"
                                        />
                                    )}
                                />
                                {errors.startMinutes && errors.startMinutes.message && (
                                    <p className={`pl-2 text-red-300 font-bold ${inter.className} text-sm`}>{errors.startMinutes.message}</p>
                                )}
                            </div>

                            {/* am-pm */}
                            <div className="flex flex-col items-left gap-[5px]">
                                <Controller
                                    name="startAmPm"
                                    control={control}
                                    render={({ field }) => (
                                        <Select>
                                            <SelectTrigger className={`w-[60px] text-white-1 ${inter.className}`}>
                                                <SelectValue placeholder="am" />
                                            </SelectTrigger>
                                            <SelectContent className="text-white-1 bg-black-1">
                                                <SelectGroup>
                                                    <SelectItem value="am">am</SelectItem>
                                                    <SelectItem value="pm">pm</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.startAmPm && errors.startAmPm.message && (
                                    <p className={`pl-2 text-red-300 font-bold ${inter.className} text-sm`}>{errors.startAmPm.message}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col  w-1/2">

                    {/* finish date */}
                    <div className="flex flex-col items-left gap-[5px]">
                        <Label className={`${inter.className} text-base`}>Event finish date</Label>
                        <Controller
                            control={control}
                            name="finishDate"
                            render={({ field }) => (
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[220px] justify-start text-left font-normal",
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
                        {/* {!errors.startDate && (
                            <p className={`pl-2 text-[#ffffff] font-normal ${inter.className} text-sm`}>Select start date and time</p>
                        )} */}
                        {errors.startDate && errors.startDate.message && (
                            <p className={`pl-2 text-red-300 font-bold ${inter.className} text-sm`}>{`${errors.startDate.message}`}</p>
                        )}
                    </div>

                    {/* finish time */}
                    <div className="flex flex-col items-left gap-[5px] mt-3">
                        <Label className={`${inter.className} text-base`}>Event finish time</Label>
                        <div className="flex gap-3">
                            {/* hours */}
                            <div className="flex flex-col items-left gap-[5px]">
                                <Controller
                                    control={control}
                                    name="finishHours"
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            type="number"
                                            placeholder='Hours'
                                            min={0}
                                            max={12}
                                            className="bg-transparent text-white-1 w-[60px]"
                                        />
                                    )}
                                />
                                {errors.finishHours && errors.finishHours.message && (
                                    <p className={`pl-2 text-red-300 font-bold ${inter.className} text-sm`}>{errors.finishHours.message}</p>
                                )}
                            </div>

                            <div className="flex justify-center items-center">:</div>

                            {/* minutes */}
                            <div className="flex flex-col items-left gap-[5px]">
                                <Controller
                                    control={control}
                                    name="finishMinutes"
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            type="number"
                                            placeholder='Minutes'
                                            min={0}
                                            max={59}
                                            className="bg-transparent text-white-1 w-[60px]"
                                        />
                                    )}
                                />
                                {errors.finishMinutes && errors.finishMinutes.message && (
                                    <p className={`pl-2 text-red-300 font-bold ${inter.className} text-sm`}>{errors.finishMinutes.message}</p>
                                )}
                            </div>

                            {/* am-pm */}
                            <div className="flex flex-col items-left gap-[5px]">
                                <Controller
                                    name="finishAmPm"
                                    control={control}
                                    render={({ field }) => (
                                        <Select>
                                            <SelectTrigger className={`w-[60px] text-white-1 ${inter.className}`}>
                                                <SelectValue placeholder="am" />
                                            </SelectTrigger>
                                            <SelectContent className="text-white-1 bg-black-1">
                                                <SelectGroup>
                                                    <SelectItem value="am">am</SelectItem>
                                                    <SelectItem value="pm">pm</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.finishAmPm && errors.finishAmPm.message && (
                                    <p className={`pl-2 text-red-300 font-bold ${inter.className} text-sm`}>{errors.finishAmPm.message}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className='w-full flex flex-row justify-between'>
                <Button variant="secondary" size="sm" className={`w-[200px] h-[36px] px-4 py-2 text-sm font-normal ${inter.className} mt-3`} onClick={handleBackClick}>
                    Back
                </Button>
                <Button type="submit" variant="default" size="sm" className={`w-[200px] h-[36px] px-4 py-2 text-sm font-normal ${inter.className} mt-3`}>
                    Next
                </Button>
            </div>
        </form>
    );
}
