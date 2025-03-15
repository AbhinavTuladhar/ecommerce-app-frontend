import React, { InputHTMLAttributes } from 'react'
import { FieldValues, UseFormReturn } from 'react-hook-form'

interface InputProps<InputValues extends FieldValues>
  extends Partial<UseFormReturn<InputValues>>,
    InputHTMLAttributes<HTMLInputElement> {
  label: string
}

const InputField = <InputValues extends FieldValues>({
  label,
  ...props
}: InputProps<InputValues>) => {
  return (
    <div className="flex flex-col gap-y-1">
      <label className="text-sm">{label}</label>
      <input
        {...props}
        className="block w-full rounded-lg border border-gray-500 bg-slate-700 px-2 py-1.5 duration-300 focus:border-gray-400 focus:outline-none"
      />
    </div>
  )
}

export default InputField
