import React, { FC } from 'react'
import Image, { ImageProps } from 'next/image'

const ImageWithFallback: FC<ImageProps> = ({ src, alt, ...props }) => {
  const imageSource = src
    ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/${src}`
    : '/placeholder-image.jpg'

  return <Image src={imageSource} alt={alt} {...props} />
}

export default ImageWithFallback
