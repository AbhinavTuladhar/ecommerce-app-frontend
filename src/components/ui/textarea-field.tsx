'use client'

import React, { InputHTMLAttributes } from 'react'
import { FieldErrors, FieldName, FieldValues, UseFormReturn } from 'react-hook-form'

import { ErrorMessage, FieldValuesFromFieldErrors } from '@hookform/error-message'

import TextArea from './textarea'

interface InputProps<InputValues extends FieldValues>
  extends Partial<UseFormReturn<InputValues>>,
    InputHTMLAttributes<HTMLTextAreaElement> {
  name: FieldName<FieldValuesFromFieldErrors<FieldErrors<InputValues>>>
  label?: string
  errors?: FieldErrors<InputValues>
}

const TextAreaField = <InputValues extends FieldValues>({
  label,
  errors,
  ...props
}: InputProps<InputValues>) => {
  return (
    <div className="flex flex-col gap-y-1">
      {label ? <label className="text-sm">{label}</label> : null}
      <TextArea {...props} />
      <span className="h-5 min-h-5">
        <ErrorMessage
          errors={errors}
          name={props.name}
          render={({ message }) => <span className="text-sm text-red-400">{message}</span>}
        />
      </span>
    </div>
  )
}

export default TextAreaField
