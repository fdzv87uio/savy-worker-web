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
import { createAnswer, createEvent, createTask, updateAnswer, updateEvent, updateTask } from '@/utils/eventsUtils'
import { eventNames, title } from "process";
import { description } from "platform";
import { getProfile } from "@/utils/profileUtils";
import { toast } from 'sonner';
import { usePathname, useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import AttendeeModal from "@/components/ui/attendeeModal";
import { Progress } from "@/components/ui/progress";
import { createTaskFormStore } from "@/stores/createTaskFormStore";
import CustomFormCard from "@/components/ui/CustomFormCard";
import { createAnswerFormStore } from "@/stores/createAnswerFormStore";


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


export default function StepThree({ title, classes }: { title?: string, classes?: any[] }) {
    const params: any = usePathname();
    const pathArray: any = params?.split("/");
    console.log(pathArray);
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
    // const params = useParams<{ userId: string; taskId: string }>();
    // console.log(params)


    const token = getCookie('savy-auth-token') as string;
    const { inputs, setInputs } = createAnswerFormStore();


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


    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setIsUploading(true);

        try {
            // Create new answer
            const urlsImages: string[] = [];



            const answerData = {
                userId: userId,
                taskId: pathArray[4],
                taskTitle: title,
                captureDatetime: inputs.captureDatetime,
                longitude: inputs.longitude,
                latitude: inputs.latitude,
                location: inputs.location,
                address: inputs.address,
                city: inputs.city,
                country: inputs.country,
                description: inputs.description,
                images: [],
                status: "annotations pending",
                classes: classes,
            };
            console.log("Creating new Answer:");
            console.log(answerData);

            const resCreateAnswer = await createAnswer(answerData, token);

            if (!resCreateAnswer.success) {
                const errorMsg = resCreateAnswer.error.response?.data?.message || 'Invalid Credentials';
                throw new Error(errorMsg);
            }

            const newAnswerId = resCreateAnswer.data && resCreateAnswer.data._id;
            console.log("TASK Created")
            console.log(resCreateAnswer.data);

            if (newAnswerId) {
                // Subir Fotos y obtener URLs
                const uploadImagePromises = images.map(async (image) => {
                    if (image.file) {
                        console.log("Uploading Image...");
                        const resUploadImage: any = await uploadImage(image.file, newAnswerId, token);
                        console.log("Image Uploaded");
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

                // await Promise.all([...uploadImagePromises, ...uploadVideoPromises]);
                await Promise.all([...uploadImagePromises]);

                // Actualizar evento con las URLs de las imágenes y videos
                const answerDataUpdated = {
                    ...answerData,
                    images: urlsImages,
                    // videos: urlsVideos,
                };

                const resUpdatedAnswer = await updateAnswer(newAnswerId, answerDataUpdated, token);
                console.log("res", resUpdatedAnswer);

                setIsUploading(false);
                toast.success("Answer Created Successfully");
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
        setInputs({ ...inputs, step: 2, progress: 60 });
    };


    return (
        <CustomFormCard>
            <Progress value={inputs.progress} max={100} className='z-[99]' id="progress" />
            <form className={`w-[250px] md:w-full h-auto mt-12 flex flex-col gap-4`} onSubmit={handleSubmit(onSubmit)}>
                {/* File upload for images */}
                <div className="flex flex-col items-left gap-[5px]">
                    <p className={`pl-2 text-[#000000] font-normal font-mono text-sm`}>Upload images {eventId}</p>
                    <ImageUploading
                        multiple
                        value={images}
                        onChange={onChange}
                        maxNumber={1} // Limitar a 1 imágenes
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
