import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Inter } from "next/font/google";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Progress } from "@/components/ui/progress";
import CustomFormCard from "@/components/ui/CustomFormCard";
import { createRef, useEffect } from "react";
import { createAnswerFormStore } from "@/stores/createAnswerFormStore";

const inter = Inter({ subsets: ["latin"] });

type Inputs = {
    captureDatetime?: string;
    latitude?: string;
    longitude?: string;
    location?: string;
    address?: string;
    city?: string;
    country?: string;
}

const validationSchema: Yup.ObjectSchema<Inputs> = Yup.object({
    captureDatetime: Yup.string()
        .required('Datetime is required'),
    latitude: Yup.string()
        .required('Latitude is required'),
    longitude: Yup.string()
        .required('Longitude is required'),
    location: Yup.string()
        .required('Location is required'),
    address: Yup.string()
        .required('Address is required'),
    city: Yup.string()
        .required('City is required'),
    country: Yup.string()
        .required('Country is required')
});


export default function StepOne() {

    const { inputs, setInputs } = createAnswerFormStore();


    const defaultValues: Inputs = {
        captureDatetime: inputs.captureDatetime || "",
        latitude: inputs.latitude || "",
        longitude: inputs.longitude || "",
        location: inputs.location || "",
        address: inputs.address || "",
        city: inputs.city || "",
        country: inputs.country || "",
    };

    const { control, handleSubmit, watch, formState: { errors } } = useForm<Inputs>({
        defaultValues,
        resolver: yupResolver(validationSchema),
        mode: 'onChange',
    });
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log("submit data")
        console.log(data);
        const updatedData: any = { ...data, step: 2, progress: 40 };
        setInputs(updatedData);
    };


    // console.log(watch("eventType"));
    const onInvalid = (errors: any) => console.error(errors)

    return (
        <CustomFormCard>
            <Progress value={inputs.progress} max={100} className='z-[99]' id="progress" />
            <form className={`h-auto w-[250px] md:w-full mt-12 flex flex-col gap-4`} onSubmit={handleSubmit(onSubmit, onInvalid)}>

                {/* Capture Datetime */}
                <div className="flex flex-col items-left gap-[5px]">
                    <Label className={`${inter.className} text-base`}>Capture Datetime</Label>
                    <Controller
                        control={control}
                        name="captureDatetime"
                        render={({ field }) => (
                            <Input
                                {...field}
                                type="date"
                                placeholder='Capture Date'
                            />
                        )}
                    />
                    {!errors.captureDatetime && (
                        <p className={`pl-2 text-[#000000]/30 font-normal ${inter.className} text-sm`}>Enter your task captureDatetime</p>
                    )}
                    {errors.captureDatetime && errors.captureDatetime.message && (
                        <p className={`pl-2 text-red-300 font-bold ${inter.className} text-sm`}>{errors.captureDatetime.message}</p>
                    )}
                </div>

                {/* Latitude */}
                <div className="flex flex-col items-left gap-[5px]">
                    <Label className={`${inter.className} text-base`}>Latitude</Label>
                    <Controller
                        control={control}
                        name="latitude"
                        render={({ field }) => (
                            <Input
                                {...field}
                                type="text"
                                placeholder='Capture Latitude'
                            />
                        )}
                    />
                    {!errors.latitude && (
                        <p className={`pl-2 text-[#000000]/30 font-normal ${inter.className} text-sm`}>Enter the latitude of your capture</p>
                    )}
                    {errors.latitude && errors.latitude.message && (
                        <p className={`pl-2 text-red-300 font-bold ${inter.className} text-sm`}>{errors.latitude.message}</p>
                    )}
                </div>

                {/* Longitude */}
                <div className="flex flex-col items-left gap-[5px]">
                    <Label className={`${inter.className} text-base`}>Longitude</Label>
                    <Controller
                        control={control}
                        name="longitude"
                        render={({ field }) => (
                            <Input
                                {...field}
                                type="text"
                                placeholder='Capture Longitude'
                            />
                        )}
                    />
                    {!errors.longitude && (
                        <p className={`pl-2 text-[#000000]/30 font-normal ${inter.className} text-sm`}>Enter the longitude of your capture</p>
                    )}
                    {errors.longitude && errors.longitude.message && (
                        <p className={`pl-2 text-red-300 font-bold ${inter.className} text-sm`}>{errors.longitude.message}</p>
                    )}
                </div>

                {/* location */}
                <div className="flex flex-col items-left gap-[5px]">
                    <Label className={`${inter.className} text-base`}>Location</Label>
                    <Controller
                        control={control}
                        name="location"
                        render={({ field }) => (
                            <Input
                                {...field}
                                type="text"
                                placeholder='Location'
                            />
                        )}
                    />
                    {!errors.location && (
                        <p className={`pl-2 text-[#000000]/30 font-normal ${inter.className} text-sm`}>Enter your current location</p>
                    )}
                    {errors.location && errors.location.message && (
                        <p className={`pl-2 text-red-300 font-bold ${inter.className} text-sm`}>{errors.location.message}</p>
                    )}
                </div>

                {/* address */}
                <div className="flex flex-col items-left gap-[5px]">
                    <Label className={`${inter.className} text-base`}>Address</Label>
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
                        <p className={`pl-2 text-[#000000]/30 font-normal ${inter.className} text-sm`}>Enter your current location</p>
                    )}
                    {errors.location && errors.location.message && (
                        <p className={`pl-2 text-red-300 font-bold ${inter.className} text-sm`}>{errors.location.message}</p>
                    )}
                </div>

                {/* city */}
                <div className="flex flex-col items-left gap-[5px]">
                    <Label className={`${inter.className} text-base`}>City</Label>
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
                        <p className={`pl-2 text-[#000000]/30 font-normal ${inter.className} text-sm`}>Enter your current city</p>
                    )}
                    {errors.city && errors.city.message && (
                        <p className={`pl-2 text-red-300 font-bold ${inter.className} text-sm`}>{errors.city.message}</p>
                    )}
                </div>

                {/* country */}
                <div className="flex flex-col items-left gap-[5px]">
                    <Label className={`${inter.className} text-base`}>Country</Label>
                    <Controller
                        control={control}
                        name="country"
                        render={({ field }) => (
                            <Input
                                {...field}
                                type="text"
                                placeholder='country'
                            />
                        )}
                    />
                    {!errors.country && (
                        <p className={`pl-2 text-[#000000]/30 font-normal ${inter.className} text-sm`}>Enter your current country</p>
                    )}
                    {errors.country && errors.country.message && (
                        <p className={`pl-2 text-red-300 font-bold ${inter.className} text-sm`}>{errors.country.message}</p>
                    )}
                </div>

                <Button type="submit" variant="secondary" size="sm" className={`w-[95px] h-[36px] px-4 py-2 mb-5 text-sm font-normal ${inter.className} mt-3`}>
                    Next
                </Button>
            </form>
        </CustomFormCard>
    );
}
