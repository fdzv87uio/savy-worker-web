import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Inter } from "next/font/google";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createEventFormStore } from '@/stores/createEventFormStore'

const inter = Inter({ subsets: ["latin"] });

type Inputs = {
    eventType: string;
    title: string;
    description: string;
    recurring: string;
    frequency: string;
    date: string;
    online: string;
    location: string;
}

const defaultValues: Inputs = {
    eventType: "",
    title: "",
    description: "",
    recurring: "",
    frequency: "",
    date: "",
    online: "",
    location: ""
};

export default function StepOne() {

    const { inputs, setInputs } = createEventFormStore();


    const { control, handleSubmit, watch, formState: { errors } } = useForm<Inputs>({ defaultValues });
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const updatedData = { ...data, step: 2 };
        console.log(updatedData);
        setInputs(updatedData);
    };

    console.log(watch("eventType"));

    return (
        <form className={`absolute w-[250px] md:w-[450px] mt-12 flex flex-col gap-4`} onSubmit={handleSubmit(onSubmit)}>
            {/* type */}
            <div className='flex flex-col gap-[5px]'>
                <Label className={`${inter.className} text-base`}>Event type {inputs.eventType}</Label>
                <Controller
                    name="eventType"
                    control={control}
                    rules={{ required: "Event type is required" }}
                    render={({ field }) => (
                        <RadioGroup {...field} onValueChange={field.onChange} className='flex'>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="private" id="r1" />
                                <Label className={inter.className}>Private</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="public" id="r2" />
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

            {/* recurring */}
            <div className='flex flex-col gap-[5px]'>
                <Label className={`${inter.className} text-base`}>Is this event recurring?</Label>
                <Controller
                    name="recurring"
                    control={control}
                    rules={{ required: "Event type is required" }}
                    render={({ field }) => (
                        <RadioGroup {...field} onValueChange={field.onChange} className='flex'>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Yes" id="r1" />
                                <Label className={inter.className}>Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="No" id="r2" />
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
                    rules={{ required: "Event type is required" }}
                    render={({ field }) => (
                        <RadioGroup {...field} onValueChange={field.onChange} className='flex'>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Yes" id="r1" />
                                <Label className={inter.className}>Weekly</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="No" id="r2" />
                                <Label className={inter.className}>Monthly</Label>
                            </div>
                        </RadioGroup>
                    )}
                />
                {errors.frequency && <span className="text-red-500">{errors.frequency.message}</span>}
            </div>

            {/* date*/}
            <div className="flex flex-col items-left gap-[5px]">
                <Controller
                    control={control}
                    name="date"
                    render={({ field }) => (
                        <Input
                            {...field}
                            type="datetime-local"
                            placeholder='Event Date and Time'
                        />
                    )}
                />
                {!errors.date && (
                    <p className={`pl-2 text-[#ffffff] font-normal ${inter.className} text-sm`}>Select date and time</p>
                )}
                {errors.date && errors.date.message && (
                    <p className={`pl-2 text-red-300 font-bold ${inter.className} text-sm`}>{`${errors.date.message}`}</p>
                )}
            </div>

            {/* online */}
            <div className='flex flex-col gap-[5px]'>
                <Label className={`${inter.className} text-base`}>Event Type:</Label>
                <Controller
                    name="online"
                    control={control}
                    rules={{ required: "Event type is required" }}
                    render={({ field }) => (
                        <RadioGroup {...field} onValueChange={field.onChange} className='flex'>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Yes" id="r1" />
                                <Label className={inter.className}>In-Person</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="No" id="r2" />
                                <Label className={inter.className}>Online</Label>
                            </div>
                        </RadioGroup>
                    )}
                />
                {errors.online && <span className="text-red-500">{errors.online.message}</span>}
            </div>

            {/* location */}
            <div className="flex flex-col items-left gap-[5px]">
                <Controller
                    control={control}
                    name="location"
                    render={({ field }) => (
                        <Input
                            {...field}
                            type="text"
                            placeholder='Event Location'
                        />
                    )}
                />
                {!errors.location && (
                    <p className={`pl-2 text-[#ffffff] font-normal ${inter.className} text-sm`}>Enter event location</p>
                )}
                {errors.location && errors.location.message && (
                    <p className={`pl-2 text-red-300 font-bold ${inter.className} text-sm`}>{`${errors.location.message}`}</p>
                )}
            </div>

            <Button type="submit" variant="primary" size="sm" className={`w-[95px] h-[36px] px-4 py-2 text-sm font-normal ${inter.className} mt-3`}>
                Next
            </Button>
        </form>
    );
}
