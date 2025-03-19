'use client'

import React, { InputHTMLAttributes, useState } from 'react'
import classnames from 'classnames'
import { FieldErrors, FieldName, FieldValues, UseFormReturn } from 'react-hook-form'
import { FaEye } from 'react-icons/fa'

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
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="flex flex-col gap-y-1">
      <label className="text-sm">{label}</label>
      <div className="relative flex divide-x divide-gray-500">
        <input
          {...props}
          type={showPassword ? 'text' : props.type}
          className={classnames(
            'block w-full rounded-lg border border-gray-500 bg-slate-700 px-2 py-1.5 duration-300 focus:border-gray-400 focus:outline-none',
            {
              'pr-10': props.type === 'password',
            },
          )}
        />
        {props.type === 'password' ? (
          <FaEye
            className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          />
        ) : null}
      </div>
      <ErrorMessage
        errors={errors}
        name={props.name}
        render={({ message }) => <span className="text-sm text-red-400">{message}</span>}
      />
    </div>
  )
}

export default InputField
