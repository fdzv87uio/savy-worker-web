'use client'

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import dynamic from 'next/dynamic';

const DynamicComponent = dynamic(() => import('./annotation'), { ssr: false });

function AddAnnotation() {
    const params = useParams();
    console.log(params.answerId);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setLoading(false);
        }
    }, [])

    return (
        <>
            {!loading && (
                <DynamicComponent />
            )}
            {loading && (
                <p>LOADING...</p>
            )}
        </>
    )

};

export default AddAnnotation;