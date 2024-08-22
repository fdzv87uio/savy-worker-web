/* eslint-disable @next/next/no-img-element */
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import ImageUploading, { ImageListType } from "react-images-uploading";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { uploadImage, uploadVideo } from "@/utils/uploadFilesUtils";
import { useDropzone } from 'react-dropzone';
import ReactPlayer from 'react-player';
import { Spinner } from '@/components/ui/spinner';
import { createEventFormStore } from "@/stores/createEventFormStore";
import { createEvent, updateEvent } from '@/utils/eventsUtils'
import { eventNames, title } from "process";
import { description } from "platform";
import { getProfile } from "@/utils/profileUtils";
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import AttendeeModal from "@/components/ui/attendeeModal";

const inter = Inter({ subsets: ["latin"] });

type Inputs = {
    file: {
        name: string;
        url: string;
    };
};

const defaultValues: Inputs = {
    file: {
        name: "",
        url: "",
    },
};


export default function StepFour() {
    const { control, handleSubmit, watch, formState: { errors } } = useForm<Inputs>({ defaultValues });
    const [images, setImages] = React.useState<ImageListType>([]);
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [objectURLs, setObjectURLs] = useState<Map<string, string>>(new Map());
    const [isUploading, setIsUploading] = useState(false);
    const [isGettingUserInfo, setIsGettingUserInfo] = useState(false);
    const [userId, setUserId] = useState("");
    const [userName, setUserName] = useState("");
    const [eventId, setEventId] = useState("");
    const [attendees, setAttendees] = useState<string[]>([]);
    const [attendeeInput, setAttendeeInput] = useState<any>("");
    const [attendeeError, setAttendeeError] = useState<any>("");
    const router = useRouter();

    const token = getCookie('curcle-auth-token') as string;
    const { inputs, setInputs } = createEventFormStore();

    useEffect(() => {
        async function getUserInfo(token: string) {
            setIsGettingUserInfo(true)
            const res: any = await getProfile(token);
            if (res && res.status === "success") {
                setUserId(res.data.id);
                setUserName(res.data.name)
                setIsGettingUserInfo(false)
            }
        }
        getUserInfo(token);
    }, [])


    //MANAGES FILES
    const onChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        if (imageList.length > 5) {
            alert('Solo se permiten hasta 5 imágenes.');
            return;
        }
        setImages(imageList as never[]);
    };

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const videos = acceptedFiles.filter(file => file.type.startsWith('video/'));
        if (videos.length + uploadedFiles.length > 2) {
            alert('Solo se permiten hasta 2 videos.');
            return;
        }
        const newObjectURLs = new Map(objectURLs);
        videos.forEach(file => {
            newObjectURLs.set(file.name, URL.createObjectURL(file));
        });

        setObjectURLs(newObjectURLs);
        setUploadedFiles(prevFiles => [...prevFiles, ...videos]);
    }, [objectURLs, uploadedFiles]);

    const onDropRejected = () => {
        alert('Solo se permiten archivos de video.');
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        onDropRejected,
        accept: { 'video/*': [] },
        multiple: false,
        maxSize: 100000000
    });

    const handleRemove = (fileName: string) => {
        setUploadedFiles(prevFiles => {
            const newFiles = prevFiles.filter(file => file.name !== fileName);
            setObjectURLs(prevObjectURLs => {
                const newObjectURLs = new Map(prevObjectURLs);
                if (newObjectURLs.has(fileName)) {
                    URL.revokeObjectURL(newObjectURLs.get(fileName)!);
                    newObjectURLs.delete(fileName);
                }
                return newObjectURLs;
            });
            return newFiles;
        });
    };


    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setIsUploading(true);

        try {
            // Crear nuevo evento
            const startTimeField = `${inputs.startHours}-${inputs.startMinutes}-${inputs.startAmPm}`;
            const finishTimeField = `${inputs.finishHours}-${inputs.finishMinutes}-${inputs.finishAmPm}`;
            const eventEndField = inputs.eventEnds === 'never' ? false : true;
            const isFrecuencyField = inputs.recurring === 'yes' ? true : false;
            const frecuencyField = `${inputs.repeatNumber}-${inputs.repeatType}`
            const urlsImages: string[] = [];
            const urlsVideos: string[] = [];

            const eventData = {
                title: inputs.title,
                // slug: "-",
                description: inputs.description,
                // url: "-",
                eventType: inputs.eventType,
                eventMode: inputs.mode,
                startDate: inputs.startDate?.toISOString(),
                startTime: startTimeField,
                eventEnds: eventEndField,
                endDate: inputs.finishDate?.toISOString(),
                endTime: finishTimeField,
                occurrenceCount: inputs.ocurrences,
                isFrecuency: isFrecuencyField,
                frecuency: inputs.repeatType,
                frecuencyStatus: "None",//TODO review
                location: inputs.location,
                address: "TBD",
                city: "TBD",
                author: userName,
                userId,
                preferenceListIds: inputs.prefeIds,
                guestList: [],
                images: [],
                videos: []
            };

            const resCreateEvent = await createEvent(eventData, token);

            if (!resCreateEvent.success) {
                const errorMsg = resCreateEvent.error.response?.data?.message || 'Invalid Credentials';
                throw new Error(errorMsg);
            }

            const newEventId = resCreateEvent.data && resCreateEvent.data._id;

            if (newEventId) {
                // Subir Fotos y obtener URLs
                const uploadImagePromises = images.map(async (image) => {
                    if (image.file) {
                        const resUploadImage = await uploadImage(image.file, newEventId, token);

                        if (!resUploadImage.success) {
                            const errorMsg = resUploadImage.error.response?.data?.message || 'Failed to upload image';
                            throw new Error(errorMsg);
                        }
                        if (resUploadImage.data && resUploadImage.data.signedurl) {
                            urlsImages.push(resUploadImage.data.signedurl);
                        }
                    }
                });

                // Subir Videos y obtener URLs
                const uploadVideoPromises = uploadedFiles.map(async (video) => {
                    const resUploadVideo = await uploadVideo(video, newEventId, token);
                    if (!resUploadVideo.success) {
                        const errorMsg = resUploadVideo.error?.response?.data?.message || 'Failed to upload video';
                        throw new Error(errorMsg);
                    }
                    if (resUploadVideo.data && resUploadVideo.data.signedurl) {
                        urlsVideos.push(resUploadVideo.data.signedurl);
                    }
                });

                await Promise.all([...uploadImagePromises, ...uploadVideoPromises]);

                // Actualizar evento con las URLs de las imágenes y videos
                const eventDataUpdated = {
                    ...eventData,
                    images: urlsImages,
                    videos: urlsVideos,
                };

                const resUpdateEvent = await updateEvent(newEventId, eventDataUpdated, token);
                console.log("res", resUpdateEvent);

                setIsUploading(false);
                toast.success("Event Create Success");
                const updatedData = { progress: 100 };
                setInputs(updatedData);
                router.push('/events/my-events');
                const updatedData2 = { step: 1, progress: 10 };
                setInputs(updatedData2);
            }



        } catch (error) {
            if (error instanceof Error) {
                const errorMsg = error.message || 'Error uploading event';
                toast.error("Error: " + errorMsg);
            } else {
                toast.error("An unknown error occurred");
            }
            setIsUploading(false);
        }
    };

    const handleBackClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setInputs({ ...inputs, step: 3, progress: 50 });
    };

    function handleAttendeeChange(value: any, e: any) {
        e.preventDefault();
        console.log("new attendee:");
        console.log(value);
        const currentLimit: any = inputs.attendees;
        if (value && value !== "") {
            const current: any = attendees;
            if (current.includes(value)) {
                const filtered = current.filter((x: any) => x !== value);
                setAttendees(filtered);
            } else {
                current.push(value);
                setAttendees(current);
            }
        }
        if (attendees.length < currentLimit) {
            const msg = `Your event must have at least ${currentLimit} attendees`
            setAttendeeError(msg);
        } else {
            setAttendeeError("")
        }
        setAttendeeInput("");

    }

    return (
        <form className={`absolute w-[250px] md:w-[450px] max-h-[750px] mt-12 flex flex-col gap-4`} onSubmit={handleSubmit(onSubmit)}>
            {/* File upload for images */}
            <div className="flex flex-col items-left gap-[5px]">
                <p className={`pl-2 text-[#ffffff] font-normal ${inter.className} text-sm`}>Upload images {eventId}</p>
                <ImageUploading
                    multiple
                    value={images}
                    onChange={onChange}
                    maxNumber={5} // Limitar a 5 imágenes
                >
                    {({
                        imageList,
                        onImageUpload,
                        onImageRemoveAll,
                        onImageRemove,
                        isDragging,
                        dragProps
                    }) => (
                        <div className="upload__image-wrapper">
                            <button
                                style={isDragging ? { color: "black" } : undefined}
                                {...dragProps}
                                type="button"
                                className={`placeholder-[#ffffff] p-2 w-full h-full z-[90] focus:outline focus:outline-offset-2 focus:outline-2 focus:outline-[#ffffff] focus:border-[#32A852] bg-transparent border-spacing-[2px] border-[2px] border-[#C4C4C4] rounded-xl ${inter.className} font-normal text-[#9E9E9E] text-sm flex items-center justify-center bg-white-1 gap-3`}
                                onClick={onImageUpload}
                            >
                                <Image src="/icons/round.svg" alt='icon' width={15} height={15} className='w-[48px] h-[48px]' />
                                Share any relevant documents or media
                            </button>
                            <p className={`pl-2 text-[#ffffff] font-normal ${inter.className} text-sm`}>Share any relevant documents or media</p>
                            <div className="flex gap-3 mt-3">
                                {imageList.map((image, index) => (
                                    <div key={index} className="flex gap-3">
                                        <div className="relative">
                                            <img src={image.dataURL} alt="" className="w-[100px] h-[100px] object-cover" />
                                            <Image src="/icons/x.svg" alt="Remove" width={24} height={24} onClick={() => onImageRemove(index)} className="absolute top-[-10px] right-[-10px] cursor-pointer" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {imageList.length > 0 && (
                                <button onClick={onImageRemoveAll} className={`pl-2 text-[#ffffff] font-normal ${inter.className}`}>
                                    Remove all images
                                </button>
                            )}
                        </div>
                    )}
                </ImageUploading>
            </div>

            {/* File upload for videos */}
            <div className="flex flex-col items-left gap-[5px]">
                <p className={`pl-2 text-[#ffffff] font-normal ${inter.className} text-sm`}>Upload videos</p>
                <div {...getRootProps({ className: 'dropzone' })} className={`placeholder-[#ffffff] p-2 w-full h-full z-[90] focus:outline focus:outline-offset-2 focus:outline-2 focus:outline-[#ffffff] focus:border-[#32A852] bg-transparent border-spacing-[2px] border-[2px] border-[#C4C4C4] rounded-xl ${inter.className} font-normal text-[#9E9E9E] text-sm flex items-center justify-center bg-white-1 gap-3 cursor-pointer`}>
                    <input {...getInputProps()} />
                    <Image src="/icons/round.svg" alt='icon' width={15} height={15} className='w-[48px] h-[48px]' />
                    Share any relevant documents or media
                </div>
                <p className={`pl-2 text-[#ffffff] font-normal ${inter.className} text-sm`}>Share any relevant documents or media</p>

                <div className="flex  justify-start items-start gap-3">
                    {uploadedFiles.map(file => (
                        <div key={file.name}>
                            <div className="relative">
                                <ReactPlayer url={objectURLs.get(file.name)} controls width="200px" height="auto" />
                                <Image src="/icons/x.svg" alt="Remove" width={24} height={24} onClick={() => handleRemove(file.name)} className="absolute top-[-10px] right-[-10px] cursor-pointer" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Attendees */}
            <div className="w-full h-auto flex flex-col items-left gap-5">
                <p className={`pl-2 text-[#ffffff] font-normal ${inter.className} text-sm`}>Attendees:</p>
                <AttendeeModal token={token} onChange={setAttendees} />
                {/* <Input name="attendeeInput" placeholder="Insert Attendee's Email" type="text" value={attendeeInput} onChange={(e: any) => { setAttendeeInput(e.target.value) }} />
                <Button className="w-[150px]" disabled={!attendeeInput ? true : false} onClick={(e: any) => handleAttendeeChange(attendeeInput, e)} variant="secondary" size="sm">Add Attendee</Button>
                {attendees && attendees.length > 0 && (
                    <div className="w-full h-auto flex flex-col gap-5 pr-3">
                        {attendees && attendees.length > 0 && attendees.map((x: any, key: number) => {
                            return (
                                <div key={`attendee_${key}`} className="px-2 w-full flex flex-row h-[30px] items-center justify-between bg-gray-500/50 hover:bg-gray-500 text-[#ffffff] border border-[#ffffff] rounded-lg">
                                    <span>{x}</span>
                                    <img onClick={(e: any) => handleAttendeeChange(x, e)} src="/icons/x.svg" width={20} height={20} alt="" className="cursor-pointer" />
                                </div>
                            )
                        })}
                    </div>
                )} */}
            </div>

            <div className='w-full flex flex-row pb-7 justify-between'>
                <Button disabled={isUploading || isGettingUserInfo} variant="secondary" size="sm" className={`w-[200px] h-[36px] px-4 py-2 text-sm font-normal ${inter.className} mt-3`} onClick={handleBackClick}>
                    Back
                </Button>
                <Button disabled={isUploading || isGettingUserInfo} type="submit" variant="primary" size="sm" className={`w-[200px] h-[36px] px-4 py-2 text-sm font-normal ${inter.className} mt-3`}>
                    Next
                    {isUploading && <Spinner className="ml-3 w-5 h-5" />}
                </Button>
            </div>
        </form>
    );
}
