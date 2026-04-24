"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ImageWithFallbackProps extends ImageProps {
  fallbackSrc?: string;
  containerClassName?: string;
}

export function ImageWithFallback({
  src,
  alt,
  fallbackSrc = "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=800&q=80",
  containerClassName,
  className,
  ...props
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-cream-200 animate-pulse" />
      )}
      <Image
        src={imgSrc}
        alt={alt}
        className={cn("transition-opacity duration-500", isLoaded ? "opacity-100" : "opacity-0", className)}
        onLoad={() => setIsLoaded(true)}
        onError={() => setImgSrc(fallbackSrc)}
        {...props}
      />
    </div>
  );
}
