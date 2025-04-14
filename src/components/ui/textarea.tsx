import { FC, TextareaHTMLAttributes } from 'react'

const TextArea: FC<TextareaHTMLAttributes<HTMLTextAreaElement>> = ({ ...props }) => (
  <div className="relative flex divide-x divide-gray-500">
    <textarea
      {...props}
      className="block min-h-30 w-full rounded-lg border border-gray-500 bg-slate-700 px-2 py-1.5 duration-300 focus:border-gray-400 focus:outline-none"
    ></textarea>
  </div>
)

export default TextArea
