/* eslint-disable @next/next/no-img-element */
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import ImageUploading, { ImageListType } from "react-images-uploading";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { uploadFile } from "@/utils/uploadFilesUtils";
import { useDropzone } from 'react-dropzone';
import ReactPlayer from 'react-player';
import { Spinner } from '@/components/ui/spinner';
import { createEventFormStore } from "@/stores/createEventFormStore";
import { createEvent } from '@/utils/eventsUtils'
import { eventNames, title } from "process";
import { description } from "platform";
import { getProfile } from "@/utils/profileUtils";

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
    const [userId, setUserId] = useState("");
    const [eventId, setEventId] = useState("");

    const token = getCookie('curcle-auth-token') as string;
    const { inputs, setInputs } = createEventFormStore();

    useEffect(() => {
        async function getUserInfo(token: string) {
            const res: any = await getProfile(token);
            console.log(res)
            if (res && res.status === "success") {
                setUserId(res.data.id);
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

    //CREATE EVENT
    const createNewEvent = async (token: string) => {

        const starTimeField = inputs.hours || "00" + inputs.minutes || "00" + inputs.amPm

        const data = {
            title: inputs.title,
            description: inputs.description,
            eventType: inputs.mode,
            startDate: inputs.startDate?.toISOString(),
            startTime: starTimeField.toLocaleString(),
            address: inputs.location,
            userId,
            preferenceListIds: inputs.prefeIds
        }

        try {
            const res = await createEvent(data, token);
            console.log(res)
            setEventId(res.data._id)

        } catch (error) {
            return null;
        }
    };

    //UPLOAD FILE
    const uploadFileHandler = async (file: File, eventId: string, token: string) => {
        try {
            const uploadResponse = await uploadFile(file, eventId, token);
            if ('data' in uploadResponse && uploadResponse.status === 'success') {
                return {
                    name: file.name,
                    url: uploadResponse.data.url
                };
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error al subir el archivo:', error);
            return null;
        }
    };

    //UPDATED EVENT
    const updatedEvent = async (token: string) => {

        const starTimeField = inputs.hours || "00" + inputs.minutes || "00" + inputs.amPm

        const data = {
            title: inputs.title,
            description: inputs.description,
            eventType: inputs.mode,
            startDate: inputs.startDate?.toISOString(),
            startTime: starTimeField.toLocaleString(),
            address: inputs.location,
            userId,
            preferenceListIds: inputs.prefeIds
        }

        try {
            const res = await createEvent(data, token);
            console.log(res)
            setEventId(res.data._id)

        } catch (error) {
            return null;
        }
    };


    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setIsUploading(true);

        await createNewEvent(token)

        let fileUploadResponse;

        if (images.length > 0 && images[0].file) {
            fileUploadResponse = await uploadFileHandler(images[0].file, eventId, token);
        } else if (uploadedFiles.length > 0) {
            fileUploadResponse = await uploadFileHandler(uploadedFiles[0], eventId, token);
        }

        if (fileUploadResponse) {
            data.file.name = fileUploadResponse.name;
            data.file.url = fileUploadResponse.url;
            console.log('Archivo subido con éxito:', data);
        } else {
            console.error('No se subió ningún archivo.');
        }

        setIsUploading(false);
        const updatedData = { ...inputs, progress: 100 };
        setInputs(updatedData);
    };

    const handleBackClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setInputs({ ...inputs, step: 3, progress: 50 });
    };

    return (
        <form className={`absolute w-[250px] md:w-[450px] mt-12 flex flex-col gap-4`} onSubmit={handleSubmit(onSubmit)}>
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

            <div className='w-full flex flex-row justify-between'>
                <Button variant="secondary" size="sm" className={`w-[200px] h-[36px] px-4 py-2 text-sm font-normal ${inter.className} mt-3`} onClick={handleBackClick}>
                    Back
                </Button>
                <Button type="submit" variant="primary" size="sm" className={`w-[200px] h-[36px] px-4 py-2 text-sm font-normal ${inter.className} mt-3`}>
                    Next
                </Button>
            </div>
        </form>
    );
}
