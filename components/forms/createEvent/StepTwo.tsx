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
const inter = Inter({ subsets: ["latin"] });

type Inputs = {
    startDate: Date;
    hours: number;
    minutes: number;
    amPm: string;
    repeatNumber: number;
    repeatType: string;
    repeatOn: string;
    recurring: string;
    frequency: string;
    eventEnds: string;
    datePick: Date;
    ocurrences: number;
};

export default function StepTwo() {

    const { inputs, setInputs } = createEventFormStore();

    const defaultValues: Inputs = {
        startDate: inputs.startDate || new Date(),
        hours: inputs.hours || 10,
        minutes: inputs.minutes || 30,
        amPm: inputs.amPm || "am",
        recurring: inputs.recurring || "no",
        frequency: inputs.frequency || "daily",
        repeatNumber: inputs.repeatNumber || 1,
        repeatType: inputs.repeatType || "daily",
        repeatOn: inputs.repeatOn || "monday",
        eventEnds: inputs.eventEnds || "never",
        datePick: inputs.datePick || new Date(),
        ocurrences: inputs.ocurrences || 2,
    };

    const { control, handleSubmit, watch, formState: { errors } } = useForm<Inputs>({ defaultValues });
    const [date, setDate] = React.useState<Date>()

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const updatedData = { ...inputs, ...data, step: 3, progress: 50 };
        setInputs(updatedData);
    };

    const handleBackClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setInputs({ ...inputs, step: 1, progress: 10 });
    };

    return (
        <form className={`absolute w-[250px] md:w-[450px] mt-12 flex flex-col gap-4`} onSubmit={handleSubmit(onSubmit)}>
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
                {!errors.startDate && (
                    <p className={`pl-2 text-[#ffffff] font-normal ${inter.className} text-sm`}>Select start date and time</p>
                )}
                {errors.startDate && errors.startDate.message && (
                    <p className={`pl-2 text-red-300 font-bold ${inter.className} text-sm`}>{`${errors.startDate.message}`}</p>
                )}
            </div>

            {/* start time */}
            <div className="flex flex-col items-left gap-[5px]">
                <Label className={`${inter.className} text-base`}>Event start time</Label>
                <div className="flex gap-3">
                    {/* hours */}
                    <div className="flex flex-col items-left gap-[5px]">
                        <Controller
                            control={control}
                            name="hours"
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    type="number"
                                    placeholder='Hours'
                                    min={0}
                                    max={12}
                                    className="bg-white-1 text-black-1 w-[80px]"
                                />
                            )}
                        />
                        {errors.hours && errors.hours.message && (
                            <p className={`pl-2 text-red-300 font-bold ${inter.className} text-sm`}>{errors.hours.message}</p>
                        )}
                    </div>

                    <div className="flex justify-center items-center">:</div>

                    {/* minutes */}
                    <div className="flex flex-col items-left gap-[5px]">
                        <Controller
                            control={control}
                            name="minutes"
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    type="number"
                                    placeholder='Minutes'
                                    min={0}
                                    max={59}
                                    className="bg-white-1 text-black-1 w-[80px]"
                                />
                            )}
                        />
                        {errors.minutes && errors.minutes.message && (
                            <p className={`pl-2 text-red-300 font-bold ${inter.className} text-sm`}>{errors.minutes.message}</p>
                        )}
                    </div>

                    {/* am-pm */}
                    <div className="flex flex-col items-left gap-[5px]">
                        <Controller
                            name="amPm"
                            control={control}
                            render={({ field }) => (
                                <Select>
                                    <SelectTrigger className={`w-[80px] text-black-1 ${inter.className}`}>
                                        <SelectValue placeholder="am" />
                                    </SelectTrigger>
                                    <SelectContent className="text-black-1 bg-white-1">
                                        <SelectGroup>
                                            <SelectItem value="am">am</SelectItem>
                                            <SelectItem value="pm">pm</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.amPm && errors.amPm.message && (
                            <p className={`pl-2 text-red-300 font-bold ${inter.className} text-sm`}>{errors.amPm.message}</p>
                        )}
                    </div>
                </div>
            </div>

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
            <div className='flex flex-col gap-[5px]'>
                <Label className={`${inter.className} text-base`}>Frequency</Label>
                <Controller
                    name="frequency"
                    control={control}
                    render={({ field }) => (
                        <RadioGroup {...field} onValueChange={field.onChange} className='flex'>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="daily" id="r1" />
                                <Label className={inter.className}>Daily</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="weekly" id="r1" />
                                <Label className={inter.className}>Weekly</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="monthly" id="r2" />
                                <Label className={inter.className}>Monthly</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="anually" id="r1" />
                                <Label className={inter.className}>Annually</Label>
                            </div>
                        </RadioGroup>
                    )}
                />
                {errors.frequency && <span className="text-red-500">{errors.frequency.message}</span>}
            </div>

            {/* repeat group */}
            <div className="flex flex-col gap-3">
                <Label className={`${inter.className} text-base`}>Start time</Label>
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
                                    placeholder='Repeat number'
                                    className="bg-white-1 text-black-1 w-[100px]"
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
                                <Select>
                                    <SelectTrigger className={`w-[180px] text-black-1 ${inter.className}`}>
                                        <SelectValue placeholder="Daily" />
                                    </SelectTrigger>
                                    <SelectContent className="text-black-1 bg-white-1">
                                        <SelectGroup>
                                            <SelectItem value="daily">Daily</SelectItem>
                                            <SelectItem value="weekly">Weekly</SelectItem>
                                            <SelectItem value="monthly">Monthly</SelectItem>
                                            <SelectItem value="annually">Annually</SelectItem>
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

            {/* repeatOn */}
            <div className='flex flex-col gap-[5px]'>
                <Label className={`${inter.className} text-base`}>Repeat on</Label>
                <Controller
                    name="repeatOn"
                    control={control}
                    render={({ field }) => (
                        <RadioGroup {...field} onValueChange={field.onChange} className='flex'>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="sunday" id="r1" />
                                <Label className={inter.className}>S</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="monday" id="r1" />
                                <Label className={inter.className}>M</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="tuesday" id="r2" />
                                <Label className={inter.className}>T</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="wednesday" id="r1" />
                                <Label className={inter.className}>W</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="thursday" id="r1" />
                                <Label className={inter.className}>T</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="friday" id="r1" />
                                <Label className={inter.className}>F</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="saturday" id="r1" />
                                <Label className={inter.className}>S</Label>
                            </div>
                        </RadioGroup>
                    )}
                />
                {errors.repeatOn && <span className="text-red-500">{errors.repeatOn.message}</span>}
            </div>

            {/* Event ends */}
            <div className='flex flex-col gap-[5px]'>
                <Label className={`${inter.className} text-base`}>Events Ends</Label>
                <div className="flex">
                    <Controller
                        name="eventEnds"
                        control={control}
                        render={({ field }) => (
                            <RadioGroup {...field} onValueChange={field.onChange} className='flex flex-col gap-[30px]'>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="never" />
                                    <Label className={inter.className}>Never</Label>
                                </div>
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
                        <div className="flex flex-col items-left gap-[5px] mt-[34px] ml-5">
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
                            {errors.hours && errors.hours.message && (
                                <p className={`pl-2 text-red-300 font-bold ${inter.className} text-sm`}>{errors.hours.message}</p>
                            )}
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
                                        className="bg-white-1 text-black-1 w-[80px]"
                                    />
                                )}
                            />
                            {errors.hours && errors.hours.message && (
                                <p className={`pl-2 text-red-300 font-bold ${inter.className} text-sm`}>{errors.hours.message}</p>
                            )}
                        </div>
                    </div>
                </div>

                {errors.recurring && <span className="text-red-500">{errors.recurring.message}</span>}
            </div>

            <div className='w-full flex flex-row justify-between'>
                <Button variant="secondary" size="sm" className={`w-[200px] h-[36px] px-4 py-2 text-sm font-normal ${inter.className} mt-3`} onClick={handleBackClick}>
                    Back
                </Button>
                <Button type="submit" variant="primary" size="sm" className={`w-[200px] h-[36px] px-4 py-2 text-sm font-normal ${inter.className} mt-3`}>
                    Next
                </Button>
            </div>
        </form>
    );
}
