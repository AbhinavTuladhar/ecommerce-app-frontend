import { FC, InputHTMLAttributes, useState } from 'react'
import classnames from 'classnames'
import { FaEye } from 'react-icons/fa'

const Input: FC<InputHTMLAttributes<HTMLInputElement>> = ({ ...props }) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
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
  )
}

export default Input
