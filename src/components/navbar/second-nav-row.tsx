import React from 'react'
import { CiHeart, CiShoppingCart, CiUser } from 'react-icons/ci'

const elementClassName = 'size-6'

const icons = [
  <CiShoppingCart className={elementClassName} key={1} />,
  <CiHeart className={elementClassName} key={2} />,
  <CiUser className={elementClassName} key={3} />,
]

const SecondNavRow: React.FC = () => (
  <div className="content flex items-center justify-between">
    <h1 className="text-5xl font-bold"> Logo </h1>
    <input
      className="max-w-64 min-w-60 rounded-lg border border-gray-500 bg-slate-700 px-2 py-1.5"
      type="search"
      placeholder="Search"
    />
    <div className="flex gap-x-4">{icons.map(icon => icon)}</div>
  </div>
)

export default SecondNavRow
