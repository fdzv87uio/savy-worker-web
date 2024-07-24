'use-client'
import { Input } from '@/components/ui/input';
import React from 'react'
import { Inter } from "next/font/google";
import { Button } from '@/components/ui/button';
import { useForm, Controller } from 'react-hook-form';
const inter = Inter({ subsets: ["latin"] });
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

interface StepOneProps {
    step: number;
    setStep: any;
    setProgress: any;
    name: string;
    setName: any;
    lastname: string;
    setLastname: any;
    idNumber: string;
    setIdNumber: any;
    birthDate: string;
    setBirthDate: any;
    email: string;
    setEmail: any;
    setPassword: any;
}

export default function StepOne({ step, setStep, setProgress, name, setName, lastname, idNumber, setIdNumber, setLastname, birthDate, setBirthDate, email, setEmail, setPassword }: StepOneProps) {

    // Yup validation rules
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Name is required'),
        lastname: Yup.string()
            .required('Lastname is required'),
        idNumber: Yup.string()
            .required('Valid ID number is required'),
        birthDate: Yup.date()
            .max(new Date(), 'Future date not allowed')
            .required('Date of Birth is required')
            .test('is-adult', 'You must be at least 18 years old', (value) => {
                const currentDate = new Date();
                const eighteenYearsAgo = new Date(currentDate);
                eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
                return value <= eighteenYearsAgo;
            }),
        email: Yup.string()
            .matches(emailRegex, "Invalid email")
            .email('Email is invalid'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters long')
            .required('Password is required'),
    });

    // Form options
    const formOptions: any = {
        resolver: yupResolver(validationSchema),
        mode: 'onChange',
    };

    // Function to format date to yyyy-mm-dd
    const formatDate = (date: Date) => {
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0'); // Months start at 0
        const dd = String(date.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    };

    // onSubmit Function
    function onSubmit() {
        const formData = control._formValues;
        setName(formData.name);
        setLastname(formData.lastname);
        setIdNumber(formData.idNumber);
        setBirthDate(formData.birthDate);
        setEmail(formData.email);
        setPassword(formData.password);
        setProgress(40);
        setStep(2);
        window.scrollTo(0, 0)
    }

    // React Hook Form
    const { control, register, handleSubmit, setValue, formState: { errors } } = useForm(formOptions);

    //Submit button activator
    function isButtonDisabled() {
        const formData = control._formValues;
        if (!formData.email || !formData.password || !formData.name || !formData.lastname || !formData.birthDate || !formData.idNumber) {
            return true;
        } else if (errors.email || errors.password || errors.name || errors.lastname || errors.birthDate || errors.idNumber) {
            return true;
        } else {
            return false;
        }
    }

    return (
        <form className='absolute w-[270px] md:w-[450px] mt-12 flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
            {/* name */}
            <div className="flex flex-col items-left gap-[5px]">
                <Input
                    value={name}
                    {...register('name', {
                        onChange: (e) => {
                            setName(e.target.value);
                        },
                    })}
                    type="text"
                    placeholder='Name'
                    autoComplete='off'
                />
                {!errors.name && (
                    <p className={`pl-2 text-[#ffffff] font-normal ${inter.className} text-sm`}>Enter your name</p>
                )}
                {errors.name && errors.name.message && (
                    <p className={`pl-2 text-red-300 font-bold ${inter.className} text-sm`}>{`${errors.name.message}`}</p>
                )}
            </div>
            {/* lastname*/}
            <div className="flex flex-col items-left gap-[5px]">
                <Input
                    value={lastname}
                    {...register('lastname', {
                        onChange: (e) => {
                            setLastname(e.target.value);
                        },
                    })}
                    type="text"
                    placeholder='Last Name'
                    autoComplete='off'
                />
                {!errors.lastname && (
                    <p className={`pl-2 text-[#ffffff] font-normal ${inter.className} text-sm`}>Enter your Last Name</p>
                )}
                {errors.lastname && errors.lastname.message && (
                    <p className={`pl-2 text-red-300 font-bold ${inter.className} text-sm`}>{`${errors.lastname.message}`}</p>
                )}
            </div>
            {/* Id number*/}
            <div className="flex flex-col items-left gap-[5px]">
                <Input
                    value={idNumber}
                    {...register('idNumber', {
                        onChange: (e) => {
                            setIdNumber(e.target.value);
                        },
                    })}
                    type="text"
                    placeholder='Id number'
                    autoComplete='off'
                />
                {!errors.idNumber && (
                    <p className={`pl-2 text-[#ffffff] font-normal ${inter.className} text-sm`}>Enter your ID Number</p>
                )}
                {errors.idNumber && errors.idNumber.message && (
                    <p className={`pl-2 text-red-300 font-bold ${inter.className} text-sm`}>{`${errors.idNumber.message}`}</p>
                )}
            </div>
            {/* birthDate*/}
            <div className="flex flex-col items-left gap-[5px]">
                <Input
                    value={birthDate}
                    {...register('birthDate', {
                        onChange: (e) => {
                            setBirthDate(e.target.value);
                        },
                    })}
                    type="date"
                    placeholder='BirthDate'
                    autoComplete='off'
                />
                {!errors.birthDate && (
                    <p className={`pl-2 text-[#ffffff] font-normal ${inter.className} text-sm`}>Enter your Date of Birth</p>
                )}
                {errors.birthDate && errors.birthDate.message && (
                    <p className={`pl-2 text-red-300 font-bold ${inter.className} text-sm`}>{`${errors.birthDate.message}`}</p>
                )}
            </div>
            {/* email */}
            <div className="flex flex-col items-left gap-[5px]">
                <Input
                    value={email}
                    {...register('email', {
                        onChange: (e) => {
                            setEmail(e.target.value);
                        },
                    })}
                    type="text"
                    placeholder='Email'
                    autoComplete='off'
                />
                {!errors.email && (
                    <p className={`pl-2 text-[#ffffff] font-normal ${inter.className} text-sm`}>Enter your email address</p>
                )}
                {errors.email && errors.email.message && (
                    <p className={`pl-2 text-red-300 font-bold ${inter.className} text-sm`}>{`${errors.email.message}`}</p>
                )}
            </div>
            {/* password */}
            <div className="flex flex-col items-left gap-[5px]">
                <Controller
                    control={control}
                    name="password"
                    render={({ field }) => (
                        <Input
                            {...field}
                            type="password"
                            placeholder='Password'
                            autoComplete='new-password'
                        />
                    )}
                />
                {!errors.password && (
                    <p className={`pl-2 text-[#ffffff] font-normal ${inter.className} text-sm`}>Your password must be at least 8 characters</p>
                )}
                {errors.password && errors.password.message && (
                    <p className={`pl-2 text-red-300 font-bold ${inter.className} text-sm`}>{`${errors.password.message}`}</p>
                )}
            </div>
            <Button disabled={isButtonDisabled()} type="submit" variant="primary" size="sm" className={`w-[95px] h-[36px] px-4 py-2 text-sm font-normal ${inter.className} mt-3`}>
                Next
            </Button>
        </form>
    )
}