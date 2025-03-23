import React from 'react'
import { LuLoaderCircle } from 'react-icons/lu'

const Loader = () => (
  <div className="flex flex-col items-center gap-y-1">
    <span className="w-fit origin-center animate-spin text-5xl">
      <LuLoaderCircle />
    </span>
    <span>Loading...</span>
  </div>
)

export default Loader
