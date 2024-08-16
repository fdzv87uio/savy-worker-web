import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Inter } from "next/font/google";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createEventFormStore } from '@/stores/createEventFormStore'
import { useEffect } from "react";
import LocationModal from "@/components/ui/locationModal";

const inter = Inter({ subsets: ["latin"] });

type Inputs = {
    eventType: string;
    title: string;
    description: string;
    mode: string;
    location: string;
}



export default function StepOne() {

    const { inputs, setInputs } = createEventFormStore();

    // const updatedData = { step: 1, progress: 10 };
    // setInputs(updatedData);


    const defaultValues: Inputs = {
        eventType: inputs.eventType || "private",
        title: inputs.title || "",
        description: inputs.description || "",
        mode: inputs.mode || "in-person",
        location: inputs.location || ""
    };

    const { control, handleSubmit, watch, formState: { errors } } = useForm<Inputs>({ defaultValues });
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const updatedData = { ...data, step: 2, progress: 25 };
        setInputs(updatedData);
    };


    // console.log(watch("eventType"));

    return (
        <form className={`absolute w-[250px] md:w-[450px] mt-12 flex flex-col gap-4`} onSubmit={handleSubmit(onSubmit)}>
            {/* type */}
            <div className='flex flex-col gap-[5px]'>
                <Label className={`${inter.className} text-base`}>Event type</Label>
                <Controller
                    name="eventType"
                    control={control}
                    rules={{ required: "Event type is required" }}
                    render={({ field }) => (
                        <RadioGroup {...field} onValueChange={field.onChange} className='flex'>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="private" />
                                <Label className={inter.className}>Private</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="public" />
                                <Label className={inter.className}>Public</Label>
                            </div>
                        </RadioGroup>
                    )}
                />
                {errors.eventType && <span className="text-red-500">{errors.eventType.message}</span>}
            </div>

            {/* title */}
            <div className="flex flex-col items-left gap-[5px]">
                <Controller
                    control={control}
                    name="title"
                    rules={{ required: "Title is required" }}
                    render={({ field }) => (
                        <Input
                            {...field}
                            type="text"
                            placeholder='Event title'
                        />
                    )}
                />
                {!errors.title && (
                    <p className={`pl-2 text-[#ffffff] font-normal ${inter.className} text-sm`}>Enter your event title</p>
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
                    rules={{ required: "Description is required" }}
                    render={({ field }) => (
                        <Textarea
                            {...field}
                            placeholder="Event description"
                            className={`pl-2 text-white-1 font-normal ${inter.className} text-base bg-transparent`}
                        />
                    )}
                />
                {!errors.description && (
                    <p className={`pl-2 text-[#ffffff] font-normal ${inter.className} text-sm`}>Enter your event description</p>
                )}
                {errors.description && errors.description.message && (
                    <p className={`pl-2 text-red-300 font-bold ${inter.className} text-sm`}>{errors.description.message}</p>
                )}
            </div>

            {/* event Mode */}
            <div className='flex flex-col gap-[5px]'>
                <Label className={`${inter.className} text-base`}>Event Mode:</Label>
                <Controller
                    name="mode"
                    control={control}
                    rules={{ required: "Event type is required" }}
                    render={({ field }) => (
                        <RadioGroup {...field} onValueChange={field.onChange} className='flex'>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="in-person" />
                                <Label className={inter.className}>In-Person</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="online" />
                                <Label className={inter.className}>Online</Label>
                            </div>
                        </RadioGroup>
                    )}
                />
                {errors.mode && <span className="text-red-500">{errors.mode.message}</span>}
            </div>

            {/* location */}
            <div className="flex flex-col items-left gap-[5px]">
                <Controller
                    control={control}
                    name="location"
                    render={({ field }) => (
                        <LocationModal
                            value={field.value}
                            onChange={(value: any) => {
                                field.onChange(value); // Call RHF's default onChange
                            }}
                        />
                    )}
                />
            </div>

            <Button type="submit" variant="primary" size="sm" className={`w-[95px] h-[36px] px-4 py-2 text-sm font-normal ${inter.className} mt-3`}>
                Next
            </Button>
        </form>
    );
}
