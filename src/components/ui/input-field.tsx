import React, { InputHTMLAttributes } from 'react'
import { FieldErrors, FieldName, FieldValues, UseFormReturn } from 'react-hook-form'

import { ErrorMessage, FieldValuesFromFieldErrors } from '@hookform/error-message'

interface InputProps<InputValues extends FieldValues>
  extends Partial<UseFormReturn<InputValues>>,
    InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: FieldName<FieldValuesFromFieldErrors<FieldErrors<InputValues>>>
  errors?: FieldErrors<InputValues>
}

const InputField = <InputValues extends FieldValues>({
  label,
  errors,
  ...props
}: InputProps<InputValues>) => {
  return (
    <div className="flex flex-col gap-y-1">
      <label className="text-sm">{label}</label>
      <input
        {...props}
        className="block w-full rounded-lg border border-gray-500 bg-slate-700 px-2 py-1.5 duration-300 focus:border-gray-400 focus:outline-none"
      />
      <ErrorMessage
        errors={errors}
        name={props.name}
        render={({ message }) => <span className="text-sm text-red-400">{message}</span>}
      />
    </div>
  )
}

export default InputField
