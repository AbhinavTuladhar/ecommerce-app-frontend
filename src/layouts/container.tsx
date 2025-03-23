import React, { FC, HTMLAttributes } from 'react'
import classnames from 'classnames'

const Container: FC<HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => (
  <div className={classnames('content-grid content-grid--content w-full', className)} {...props}>
    {children}
  </div>
)

export default Container
