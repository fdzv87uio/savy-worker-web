import React, { ReactNode } from 'react'

function MaxWidthWrapper({
    className,
    children,
    bg
}: {
    className?: string
    children?: ReactNode
    bg?: string
}): React.JSX.Element {
    return (
        <div
            style={{ backgroundImage: bg ? bg : "none", backgroundSize: "cover" }}
            className={`mt-3 mx-auto lg:mx-auto w-full max-w-screen-xl ${className}`}>
            {children}
        </div>
    )
}

export default MaxWidthWrapper
