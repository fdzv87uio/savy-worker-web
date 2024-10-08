/* eslint-disable @next/next/no-img-element */
import { useForm, SubmitHandler, Controller } from "react-hook-form";
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
import { createEvent, createTask, updateEvent, updateTask } from '@/utils/eventsUtils'
import { eventNames, title } from "process";
import { description } from "platform";
import { getProfile } from "@/utils/profileUtils";
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import AttendeeModal from "@/components/ui/attendeeModal";
import { Progress } from "@/components/ui/progress";
import { createTaskFormStore } from "@/stores/createTaskFormStore";
import CustomFormCard from "@/components/ui/CustomFormCard";


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
    const [userEmail, setUserEmail] = useState("");
    const [eventId, setEventId] = useState("");
    const [attendees, setAttendees] = useState<string[]>([]);
    const [blacklist, setBlackList] = useState<string[]>([]);
    const [attendeeInput, setAttendeeInput] = useState<any>("");
    const [attendeeError, setAttendeeError] = useState<any>("");
    const router = useRouter();


    const token = getCookie('savy-auth-token') as string;
    const { inputs, setInputs } = createTaskFormStore();


    useEffect(() => {
        async function getUserInfo(token: string) {
            setIsGettingUserInfo(true)
            const res: any = await getProfile(token);
            if (res && res.status === "success") {
                setUserId(res.data.id);
                setUserName(res.data.name);
                setUserEmail(res.data.email);
                setIsGettingUserInfo(false)
            } else {
                toast.success("Session Ended")
                router.push("/")
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


    async function onSubmit() {
        setIsUploading(true);
        try {
            // Crear nuevo evento
            const urlsImages: string[] = [];
            const urlsVideos: string[] = [];
            // creating class array
            const classArr = inputs.classes?.split(',');
            const formattedClassArr: string[] = [];
            classArr?.forEach((x: any) => {
                const formatted = x.trim();
                formattedClassArr.push(formatted);
            })

            const taskData = {
                title: inputs.title,
                description: inputs.description,
                instructions: inputs.instructions,
                reward: inputs.reward,
                startDate: inputs.startDate?.toISOString(),
                endDate: inputs.endDate?.toISOString(),
                location: inputs.location,
                address: inputs.address,
                city: inputs.city,
                country: inputs.country,
                author: userEmail,
                authorId: userId,
                images: [],
                videos: [],
                participants: attendees,
                blacklist: blacklist,
                classes: formattedClassArr,
                status: "active",
            };
            console.log("Creating new Task:");
            console.log(taskData);

            const resCreateTask = await createTask(taskData, token);

            if (!resCreateTask.success) {
                const errorMsg = resCreateTask.error.response?.data?.message || 'Invalid Credentials';
                throw new Error(errorMsg);
            }

            const newTaskId = resCreateTask.data && resCreateTask.data._id;
            console.log("TASK Created")
            console.log(resCreateTask.data);

            if (newTaskId) {
                // Subir Fotos y obtener URLs
                const uploadImagePromises = images.map(async (image) => {
                    if (image.file) {
                        console.log("Uploading Image...");
                        const resUploadImage: any = await uploadImage(image.file, newTaskId, token);
                        console.log("Image Uploades");
                        console.log(resUploadImage);

                        if (resUploadImage.success === false) {
                            console.log("Error");
                            console.log(resUploadImage);
                            const errorMsg = 'Failed to upload image';
                            throw new Error(errorMsg);
                        }
                        if (resUploadImage.data && resUploadImage.data.data.url) {
                            urlsImages.push(resUploadImage.data.data.url);
                        }
                    }
                });

                // Subir Videos y obtener URLs
                // const uploadVideoPromises = uploadedFiles.map(async (video) => {
                //     const resUploadVideo = await uploadVideo(video, newTaskId, token);
                //     if (!resUploadVideo.success) {
                //         const errorMsg = resUploadVideo.error?.response?.data?.message || 'Failed to upload video';
                //         throw new Error(errorMsg);
                //     }
                //     if (resUploadVideo.data && resUploadVideo.data.signedurl) {
                //         urlsVideos.push(resUploadVideo.data.signedurl);
                //     }
                // });

                // await Promise.all([...uploadImagePromises, ...uploadVideoPromises]);
                await Promise.all([...uploadImagePromises]);

                // Actualizar evento con las URLs de las imágenes y videos
                const taskDataUpdated = {
                    ...taskData,
                    images: urlsImages,
                    // videos: urlsVideos,
                };

                const resUpdatedTask = await updateTask(newTaskId, taskDataUpdated, token);
                console.log("res", resUpdatedTask);

                setIsUploading(false);
                toast.success("Task Created Successfully");
                const updatedData: any = { progress: 100 };
                setInputs(updatedData);
                router.push('/control-panel');
                const updatedData2: any = { step: 1, progress: 10 };
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
        setInputs({ ...inputs, step: 3, progress: 60 });
    };


    return (
        <CustomFormCard>
            <Progress value={inputs.progress} max={100} className='z-[20]' id="progress" />
            <form className={`w-[250px] md:w-full h-auto mt-12 flex flex-col gap-4`} onSubmit={handleSubmit(onSubmit)}>
                {/* File upload for images */}
                <div className="flex flex-col items-left gap-[5px]">
                    <p className={`pl-2 text-[#000000] font-normal font-mono text-sm`}>Upload images {eventId}</p>
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
                                    className={`flex h-[80px] w-full rounded-md border border-[2px] border-primary bg-background px-3 py-2 font-mono text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-mono font-normal text-[#000000] text-sm flex items-center justify-center bg-white-1 gap-3`}
                                    onClick={onImageUpload}
                                >
                                    <Image src="/icons/round.svg" alt='icon' width={15} height={15} className='w-[48px] h-[48px]' />
                                    Share any relevant documents or media
                                </button>
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
                                    <button onClick={onImageRemoveAll} className={`pl-2 text-[#ffffff] font-normal font-mono`}>
                                        Remove all images
                                    </button>
                                )}
                            </div>
                        )}
                    </ImageUploading>
                </div>

                {/* File upload for videos */}
                {/* <div className="flex flex-col items-left gap-[5px]">
                    <p className={`pl-2 text-[#000000] font-normal font-mono text-sm`}>Upload videos</p>
                    <div {...getRootProps({ className: 'dropzone' })} className={`placeholder-[#ffffff] p-2 w-full h-full z-[90] focus:outline focus:outline-offset-2 focus:outline-2 focus:outline-[#ffffff] focus:border-[#32A852] bg-transparent border-spacing-[2px] border-[2px] border-[#C4C4C4] rounded-xl font-mono font-normal text-[#9E9E9E] text-sm flex items-center justify-center bg-white-1 gap-3 cursor-pointer`}>
                        <input {...getInputProps()} />
                        <Image src="/icons/round.svg" alt='icon' width={15} height={15} className='w-[48px] h-[48px]' />
                        Share any relevant documents or media
                    </div>
                    <p className={`pl-2 text-[#ffffff] font-normal font-mono text-sm`}>Share any relevant documents or media</p>

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
                </div> */}
                {/* Participants */}
                <div className="w-full h-auto flex flex-col items-left gap-5">
                    <p className={`pl-2 text-[#000000] font-normal font-mono text-sm`}>Participants</p>
                    <AttendeeModal token={token} onChange={setAttendees} />
                </div>

                {/* Blacklist */}
                <div className="w-full h-auto flex flex-col items-left gap-5">
                    <p className={`pl-2 text-[#000000] font-normal font-mono text-sm`}>Blacklist</p>
                    <AttendeeModal token={token} onChange={setBlackList} />
                </div>
                <div className='w-full mt-[5px] flex flex-row pb-7 justify-between'>
                    <Button disabled={isUploading || isGettingUserInfo} variant="default" size="sm" className={`w-[200px] h-[36px] px-4 py-2 text-sm font-normal font-mono`} onClick={handleBackClick}>
                        Back
                    </Button>
                    <Button disabled={isUploading || isGettingUserInfo} type="submit" variant="secondary" size="sm" className={`w-[200px] h-[36px] px-4 py-2 text-sm font-normal font-mono`}>
                        Next
                        {isUploading && <Spinner className="ml-3 w-5 h-5" />}
                    </Button>
                </div>
            </form>
        </CustomFormCard>
    );
}
