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
import { createAnswerFormStore } from "@/stores/createAnswerFormStore";
import { Textarea } from "@/components/ui/textarea";
const inter = Inter({ subsets: ["latin"] });

type Inputs = {
    description: string;
};

const validationSchema: Yup.ObjectSchema<Inputs> = Yup.object({
    description: Yup.string().required('Description must be provided'),
});
export default function StepTwo() {

    const { inputs, setInputs } = createAnswerFormStore();

    const defaultValues: Inputs = {
        description: inputs.description || "n/a",
    };


    const { control, handleSubmit, register, formState: { errors } } = useForm<Inputs>({
        defaultValues,
        resolver: yupResolver(validationSchema),
        mode: 'onChange',
    });
    const [date, setDate] = React.useState<Date>()

    const onSubmit: SubmitHandler<Inputs> = (data) => {
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
            <Progress value={inputs.progress} max={100} className='z-[99]' id="progress" />
            <form className={`h-auto w-[250px] md:w-[100%] mt-12 flex flex-col gap-4`} onSubmit={handleSubmit(onSubmit)}>

                {/* description */}
                <div className="flex flex-col items-left gap-[5px]">
                    <Label className={`${inter.className} text-base`}>Description</Label>
                    <Controller
                        control={control}
                        name="description"
                        render={({ field }) => (
                            <Textarea
                                {...field}
                                placeholder="Capture description"
                                rows={12}
                                className={`${inter.className} flex h-auto w-full rounded-md border border-[2px] border-primary bg-background px-3 py-2 font-mono text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
                            />
                        )}
                    />
                    {!errors.description && (
                        <p className={`pl-2 text-[#000000]/30 font-normal ${inter.className} text-sm`}>Enter a natural language description of what is happening on the capture in English</p>
                    )}
                    {errors.description && errors.description.message && (
                        <p className={`pl-2 text-red-300 font-bold ${inter.className} text-sm`}>{errors.description.message}</p>
                    )}
                </div>

                <div className='w-full flex flex-row mb-[30px] justify-between'>
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
