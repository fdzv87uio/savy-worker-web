'use client'


import React, { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import { usePathname } from "next/navigation";

//@ts-ignore
const Annotation = dynamic(() => import('./annotation'), { ssr: false });


function AddAnnotation() {
    const pathname = usePathname();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (typeof window !== "undefined" && typeof document !== "undefined") {
            console.log("current window and document")
            console.log(window);
            console.log(document);
            setLoading(false);
        }
    }, [window, document])

    return (
        <div>
            {!loading && (
                <Annotation />
            )}
            {loading && (
                <p>Loading...</p>
            )}
        </div>
    )

};

export default AddAnnotation;