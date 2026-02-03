"use client"

import { useState } from "react"

interface CloudinaryImageProps {
    src: string
    alt: string
    width?: number
    height?: number
    className?: string
    removeBackground?: boolean
    priority?: boolean
}

export default function CloudinaryImage({
    src,
    alt,
    className,
}: CloudinaryImageProps) {
    const [error, setError] = useState(false)

    return (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
            src={error ? "/placeholder.svg" : (src || "/placeholder.svg")}
            alt={alt}
            className={className}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
            onError={() => setError(true)}
        />
    )
}
