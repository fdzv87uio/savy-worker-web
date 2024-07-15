'use-client'
import { Input } from '@/components/ui/input';
import React, { useEffect, useState } from 'react'
import { Inter } from "next/font/google";
import { Button } from '@/components/ui/button';
import { useForm, Controller } from 'react-hook-form';
const inter = Inter({ subsets: ["latin"] });
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

interface StepTwoProps {
    step: number;
    setStep: any;
    setProgress: any;
    address: string;
    setAddress: any;
    addressDetails: string;
    setAddressDetails: any;
    postalCode: string;
    setPostalCode: any;
    city: string;
    setCity: any;
}

export default function StepTwo({ step, setStep, setProgress, address, setAddress, addressDetails, setAddressDetails, postalCode, setPostalCode, city, setCity }: StepTwoProps) {

    const [isDisabled, setIsDisbaled] = useState(false);
    useEffect(() => {
        isButtonDisabled();
    }, [step, address, postalCode, city])

    // Yup validation rules
    const validationSchema = Yup.object().shape({
        address: Yup.string()
            .min(10, "Address is too small")
            .required('Address is required'),
        postalCode: Yup.string()
            .min(6, "Postal Code is too small")
            .required('Postal Code is required'),
        city: Yup.string()
            .min(3, "City is too small")
            .required('City is required'),
    });

    // Form options
    const formOptions: any = {
        resolver: yupResolver(validationSchema),
        mode: 'onChange',
    };


    // onSubmit Function
    function onSubmit() {
        const formData = control._formValues;
        setAddress(formData.address);
        setAddressDetails(formData.addressDetails);
        setPostalCode(formData.postalCode);
        setCity(formData.city);
        setProgress(66);
        setStep(3);
    }

    // React Hook Form
    const { control, register, handleSubmit, setValue, formState: { errors } } = useForm(formOptions);

    //Submit button activator
    function isButtonDisabled() {
        if (!address || !postalCode || !city) {
            setIsDisbaled(true);
        } else {
            const formData = control._formValues;
            if (!formData.address || !formData.postalCode || !formData.city) {
                setIsDisbaled(true);
            } else if (errors.address || errors.postalCode || errors.city) {
                setIsDisbaled(true);
            } else {
                setIsDisbaled(false);
            }
        }
    }

    //backtrack function
    function backtrack() {
        setProgress(10);
        setStep(1);
    }


    return (
        <form className='absolute w-[250px] md:w-[450px] mt-12 flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
            {/* address */}
            <div className="flex flex-col items-left gap-[5px]">
                <Input
                    value={address}
                    {...register('address', {
                        onChange: (e) => {
                            setAddress(e.target.value);
                        },
                    })}
                    type="text"
                    placeholder='Enter Your Street Address'
                    autoComplete='off'
                />
                {!errors.address && (
                    <p className={`pl-2 text-[#ffffff] font-normal ${inter.className} text-sm`}>Include house number</p>
                )}
                {errors.address && errors.address.message && (
                    <p className={`pl-2 text-red-300 font-bold ${inter.className} text-sm`}>{`${errors.address.message}`}</p>
                )}
            </div>
            {/* address details*/}
            <div className="flex flex-col items-left gap-[5px]">
                <Input
                    value={addressDetails}
                    {...register('addressDetails', {
                        onChange: (e) => {
                            setAddressDetails(e.target.value);
                        },
                    })}
                    type="text"
                    placeholder='Street address, P.O. box, company name, c/o'
                    autoComplete='off'
                />
                <p className={`pl-2 text-[#ffffff] font-normal ${inter.className} text-sm`}>Optional</p>
            </div>
            {/* postalCode*/}
            <div className="flex flex-col items-left gap-[5px]">
                <Input
                    value={postalCode}
                    {...register('postalCode', {
                        onChange: (e) => {
                            setPostalCode(e.target.value);
                        },
                    })}
                    type="text"
                    placeholder='Postal Code'
                    autoComplete='off'
                />
                {!errors.postalCode && (
                    <p className={`pl-2 text-[#ffffff] font-normal ${inter.className} text-sm`}>Enter your Postal Code</p>
                )}
                {errors.postalCode && errors.postalCode.message && (
                    <p className={`pl-2 text-red-300 font-bold ${inter.className} text-sm`}>{`${errors.postalCode.message}`}</p>
                )}
            </div>
            {/* city*/}
            <div className="flex flex-col items-left gap-[5px]">
                <Input
                    value={city}
                    {...register('city', {
                        onChange: (e) => {
                            setCity(e.target.value);
                        },
                    })}
                    type="text"
                    placeholder='City'
                    autoComplete='new-password'
                />
                {!errors.city && (
                    <p className={`pl-2 text-[#ffffff] font-normal ${inter.className} text-sm`}>Enter your City</p>
                )}
                {errors.city && errors.city.message && (
                    <p className={`pl-2 text-red-300 font-bold ${inter.className} text-sm`}>{`${errors.city.message}`}</p>
                )}
            </div>
            <div className='w-full flex flex-row justify-between'>
                <Button disabled={isDisabled} type="submit" variant="primary" size="sm" className={`w-[95px] h-[36px] px-4 py-2 text-sm font-normal ${inter.className} mt-3`}>
                    Next
                </Button>
                <Button onClick={() => { backtrack() }} variant="ghost" className={`w-[95px] h-[36px] px-4 py-2 text-sm font-normal ${inter.className} mt-3`}>
                    {`< Back`}
                </Button>
            </div>
        </form>
    )
}