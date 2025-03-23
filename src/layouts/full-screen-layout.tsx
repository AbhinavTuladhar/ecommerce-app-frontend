import React from 'react'

/**
 * Full screen layout, with contents at the centre
 */
const FullScreenLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="grid h-full flex-1 place-items-center">{children}</div>
)

export default FullScreenLayout
