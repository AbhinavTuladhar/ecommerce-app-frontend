import React, { ButtonHTMLAttributes, forwardRef } from 'react'
import { cva, VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex justify-center text-white items-center disabled:opacity-50 cursor-pointer rounded-md transition-all duration-300',
  {
    variants: {
      variant: {
        default: 'bg-blue-600 hover:bg-blue-500',
        danger: 'bg-red-600 hover:bg-red-500',
        dashed: 'bg-transparent border border-blue-500 border-dashed hover:bg-blue-500',
      },
      size: {
        default: 'px-4 py-3',
        sm: 'px-3 py-2',
        lg: 'px-6 py-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, className, children, ...props }, ref) => {
    return (
      <button {...props} ref={ref} className={cn(buttonVariants({ variant, size, className }))}>
        {children}
      </button>
    )
  },
)
Button.displayName = 'Button'

export default Button
