'use client'

import React, { ChangeEvent, FC, useRef, useState } from 'react'
import Image from 'next/image'
import { BsCloudUploadFill } from 'react-icons/bs'
import { toast } from 'react-toastify'

import Button from './button'

const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
const MAX_SIZE_MB = 5

interface ImageUploadProps {
  initialImage?: string | null
  onFileSelect: (file: File | null) => void
}

const ImageUpload: FC<ImageUploadProps> = ({ initialImage, onFileSelect }) => {
  const [image, setImage] = useState<string | null>(() =>
    initialImage ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/${initialImage}` : null,
  )
  const [file, setFile] = useState<File | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileInput = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    const error = validateImageFile(file)

    if (error) {
      toast.error(error)
      return
    }

    setFile(file)
    onFileSelect(file)
    setImage(URL.createObjectURL(file))
  }

  const validateImageFile = (file: File) => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return 'Unsupported file type. Supported types: jpeg, jpg, png, webp.'
    }

    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      return `File size is too large. Max size: ${MAX_SIZE_MB}MB.`
    }

    return null
  }

  // Using a ref to simulate a click on the hidden file upload input element.
  const handleInputClick = () => {
    inputRef?.current?.click()
  }

  const handleImageRemove = () => {
    setFile(null)
    setImage(null)
  }

  return (
    <>
      <div className="grid place-items-center gap-y-4 rounded-lg border border-dashed border-gray-300 bg-slate-700 py-6">
        {image ? (
          <ImagePreview source={image} handleRemove={handleImageRemove} />
        ) : (
          <ImagePrompt handleClick={handleInputClick} />
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        onChange={handleFileInput}
        className="hidden"
        accept=".jpeg, .jpg, .png, .webp"
      />
      {file ? JSON.stringify(file, null, 2) : null}
    </>
  )
}

interface ImagePreviewProps {
  source: string
  handleRemove: () => void
}

const ImagePreview: FC<ImagePreviewProps> = ({ source, handleRemove }) => (
  <div className="group relative">
    <Image src={source} alt="preview" width={0} height={0} className="w-full max-w-200" />
    <button
      onClick={handleRemove}
      type="button"
      className="absolute top-0 right-0 grid size-6 cursor-pointer place-items-center rounded-full bg-white text-black opacity-0 duration-400 group-hover:opacity-100 hover:text-gray-500"
    >
      x
    </button>
  </div>
)

interface ImagePromptProps {
  handleClick: () => void
}

const ImagePrompt: FC<ImagePromptProps> = ({ handleClick }) => {
  return (
    <>
      <BsCloudUploadFill className="text-6xl" />
      <Button type="button" variant="default" onClick={handleClick}>
        Upload an image
      </Button>
      <span className="text-sm font-bold text-gray-400">
        Supported types: jpeg, jpg, png, webp. Max 10MB.
      </span>
    </>
  )
}

export default ImageUpload
