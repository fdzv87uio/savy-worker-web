import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Inter } from "next/font/google";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { createTaskFormStore } from "@/stores/createTaskFormStore";
import { Progress } from "@/components/ui/progress";
import CustomFormCard from "@/components/ui/CustomFormCard";
import { createRef, useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

type Inputs = {
    title: string;
    description: string;
    instructions: string;
    reward: number;
}

const validationSchema: Yup.ObjectSchema<Inputs> = Yup.object({
    title: Yup.string()
        .required('Title is required'),
    description: Yup.string()
        .required('Description is required'),
    instructions: Yup.string()
        .required('Description is required'),
    reward: Yup.number()
        .required('Reward is required')
});


export default function StepOne() {

    const { inputs, setInputs } = createTaskFormStore();


    const defaultValues: Inputs = {
        title: inputs.title || "",
        description: inputs.description || "",
        instructions: inputs.instructions || "",
        reward: inputs.reward || 0,
    };

    const { control, handleSubmit, watch, formState: { errors } } = useForm<Inputs>({
        defaultValues,
        resolver: yupResolver(validationSchema),
        mode: 'onChange',
    });
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const updatedData: any = { ...data, step: 2, progress: 40 };
        setInputs(updatedData);

    };


    // console.log(watch("eventType"));

    return (
        <CustomFormCard>
            <Progress value={inputs.progress} max={100} className='z-[10]' id="progress" />
            <form className={`h-auto w-[250px] md:w-full mt-12 flex flex-col gap-4`} onSubmit={handleSubmit(onSubmit)}>

                {/* title */}
                <div className="flex flex-col items-left gap-[5px]">
                    <Label className={`${inter.className} text-base`}>Title</Label>
                    <Controller
                        control={control}
                        name="title"
                        render={({ field }) => (
                            <Input
                                {...field}
                                type="text"
                                placeholder='Event title'
                            />
                        )}
                    />
                    {!errors.title && (
                        <p className={`pl-2 text-[#000000]/30 font-normal ${inter.className} text-sm`}>Enter your task title</p>
                    )}
                    {errors.title && errors.title.message && (
                        <p className={`pl-2 text-red-300 font-bold ${inter.className} text-sm`}>{errors.title.message}</p>
                    )}
                </div>

                {/* description */}
                <div className="flex flex-col items-left gap-[5px]">
                    <Label className={`${inter.className} text-base`}>Description</Label>
                    <Controller
                        control={control}
                        name="description"
                        render={({ field }) => (
                            <Textarea
                                {...field}
                                placeholder="Event description"
                                rows={7}
                                className={`${inter.className} flex h-auto w-full rounded-md border border-[2px] border-primary bg-background px-3 py-2 font-mono text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
                            />
                        )}
                    />
                    {!errors.description && (
                        <p className={`pl-2 text-[#000000]/30 font-normal ${inter.className} text-sm`}>Enter your event description</p>
                    )}
                    {errors.description && errors.description.message && (
                        <p className={`pl-2 text-red-300 font-bold ${inter.className} text-sm`}>{errors.description.message}</p>
                    )}
                </div>

                {/* instructions */}
                <div className="flex flex-col items-left gap-[5px]">
                    <Label className={`${inter.className} text-base`}>Instructions</Label>
                    <Controller
                        control={control}
                        name="instructions"
                        render={({ field }) => (
                            <Textarea
                                {...field}
                                placeholder="Event Instructions"
                                rows={7}
                                className={`${inter.className} flex h-auto w-full rounded-md border border-[2px] border-primary bg-background px-3 py-2 font-mono text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
                            />
                        )}
                    />
                    {!errors.instructions && (
                        <p className={`pl-2 text-[#000000]/30 font-normal ${inter.className} text-sm`}>Enter a list of instructions for the task</p>
                    )}
                    {errors.instructions && errors.instructions.message && (
                        <p className={`pl-2 text-red-300 font-bold ${inter.className} text-sm`}>{errors.instructions.message}</p>
                    )}
                </div>


                {/* reward */}
                <div className="flex flex-col items-left gap-[5px]">
                    <div className="flex flex-col items-left gap-[5px]">
                        <Label className={`${inter.className} text-base w-[200px]`}>Reward (USD)</Label>
                        <Controller
                            control={control}
                            name="reward"
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    type="number"
                                    placeholder='insert amount'
                                    className="w-[150px] "
                                />
                            )}
                        />
                    </div>
                    {errors.reward && errors.reward.message && (
                        <p className={`pl-2 text-red-300 font-bold ${inter.className} text-sm`}>{errors.reward.message}</p>
                    )}
                </div>

                <Button type="submit" variant="secondary" size="sm" className={`w-[95px] h-[36px] px-4 py-2 mb-5 text-sm font-normal ${inter.className} mt-3`}>
                    Next
                </Button>
            </form>
        </CustomFormCard>
    );
}
