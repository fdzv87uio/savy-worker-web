import { useForm, SubmitHandler, Controller } from "react-hook-form";
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

type Inputs = {
    location: string;
    address: string;
    city: string;
    country: string;
};

const validationSchema: Yup.ObjectSchema<Inputs> = Yup.object({
    location: Yup.string().required('Location must be provided'),
    address: Yup.string().required('Address must be provided'),
    city: Yup.string().required('City must be provided'),
    country: Yup.string().required('Country must be provided')
});
export default function StepTwo() {

    const { inputs, setInputs } = createTaskFormStore();

    const defaultValues: Inputs = {
        location: inputs.location || "n/a",
        address: inputs.address || "n/a",
        city: inputs.city || "n/a",
        country: inputs.country || "n/a"
    };


    const { control, handleSubmit, watch, formState: { errors } } = useForm<Inputs>({
        defaultValues,
        resolver: yupResolver(validationSchema),
        mode: 'onChange',
    });
    const [date, setDate] = React.useState<Date>()

    function onSubmit(data: any, event: any) {
        event.preventDefault();
        console.log('data:');
        console.log(data);
        const updatedData = { ...inputs, ...data, step: 3, progress: 60 };
        setInputs(updatedData);
        window.scrollTo(0, 0);
    };

    const handleBackClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setInputs({ ...inputs, step: 1, progress: 20 });
    };

    return (
        <CustomFormCard>
            <Progress value={inputs.progress} max={100} className='z-[20]' id="progress" />
            <form className={`h-auto w-[250px] md:w-[100%] mt-12 flex flex-col gap-4`} onSubmit={handleSubmit(onSubmit)}>



                {/* location */}
                <div className="flex flex-col items-left gap-[5px]">
                    <Label className={`font-mono text-base`}>Location</Label>
                    <Controller
                        control={control}
                        name="location"
                        render={({ field }) => (
                            <Input
                                {...field}
                                type="text"
                                placeholder='Event title'
                            />
                        )}
                    />
                    {!errors.location && (
                        <p className={`pl-2 text-[#000000]/30 font-normal font-mono text-sm`}>Enter your current location</p>
                    )}
                    {errors.location && errors.location.message && (
                        <p className={`pl-2 text-red-300 font-bold font-mono text-sm`}>{errors.location.message}</p>
                    )}
                </div>

                {/* address */}
                <div className="flex flex-col items-left gap-[5px]">
                    <Label className={`font-mono text-base`}>Address</Label>
                    <Controller
                        control={control}
                        name="address"
                        render={({ field }) => (
                            <Input
                                {...field}
                                type="text"
                                placeholder='Address'
                            />
                        )}
                    />
                    {!errors.location && (
                        <p className={`pl-2 text-[#000000]/30 font-normal font-mono text-sm`}>Enter your current location</p>
                    )}
                    {errors.location && errors.location.message && (
                        <p className={`pl-2 text-red-300 font-bold font-mono text-sm`}>{errors.location.message}</p>
                    )}
                </div>

                {/* city */}
                <div className="flex flex-col items-left gap-[5px]">
                    <Label className={`font-mono text-base`}>City</Label>
                    <Controller
                        control={control}
                        name="city"
                        render={({ field }) => (
                            <Input
                                {...field}
                                type="text"
                                placeholder='City'
                            />
                        )}
                    />
                    {!errors.city && (
                        <p className={`pl-2 text-[#000000]/30 font-normal font-mono text-sm`}>Enter your current city</p>
                    )}
                    {errors.city && errors.city.message && (
                        <p className={`pl-2 text-red-300 font-bold font-mono text-sm`}>{errors.city.message}</p>
                    )}
                </div>

                {/* country */}
                <div className="flex flex-col items-left gap-[5px]">
                    <Label className={`font-mono text-base`}>Country</Label>
                    <Controller
                        control={control}
                        name="country"
                        render={({ field }) => (
                            <Input
                                {...field}
                                type="text"
                                placeholder='Event country'
                            />
                        )}
                    />
                    {!errors.country && (
                        <p className={`pl-2 text-[#000000]/30 font-normal font-mono text-sm`}>Enter your current country</p>
                    )}
                    {errors.country && errors.country.message && (
                        <p className={`pl-2 text-red-300 font-bold font-mono text-sm`}>{errors.country.message}</p>
                    )}
                </div>

                <div className='w-full flex flex-row mb-[30px] justify-between'>
                    <Button variant="default" size="sm" className={`w-[200px] h-[36px] px-4 py-2 text-sm font-normal font-mono mt-3`} onClick={handleBackClick}>
                        Back
                    </Button>
                    <Button type="submit" variant="secondary" size="sm" className={`w-[200px] h-[36px] px-4 py-2 text-sm font-normal font-mono mt-3`}>
                        Next
                    </Button>
                </div>
            </form>
        </CustomFormCard>
    );
}
