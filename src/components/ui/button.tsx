import React, { ButtonHTMLAttributes, forwardRef } from 'react'

const Button = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ children, ...props }, ref) => {
    return (
      <button
        {...props}
        ref={ref}
        className="cursor-pointer rounded-md bg-blue-600 px-4 py-3 text-white duration-300 hover:bg-blue-500"
      >
        {children}
      </button>
    )
  },
)
Button.displayName = 'Button'

export default Button
