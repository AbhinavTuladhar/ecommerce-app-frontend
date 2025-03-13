import React, { FC, ReactNode } from 'react'
import { CiHeadphones } from 'react-icons/ci'
import { CiCircleInfo } from 'react-icons/ci'
import { FaPhoneVolume } from 'react-icons/fa6'
import { IoIosSwap } from 'react-icons/io'
import { IoLocationOutline } from 'react-icons/io5'

const iconsList = [
  { icon: <IoLocationOutline />, text: 'Track order' },
  { icon: <IoIosSwap />, text: 'Track order' },
  { icon: <CiHeadphones />, text: 'Customer Support' },
  { icon: <CiCircleInfo />, text: 'Need help?' },
]

const IconAndText: FC<{ icon: ReactNode; text: string }> = ({ icon, text }) => (
  <div className="flex items-center gap-x-2">
    <>{icon}</>
    <span>{text}</span>
  </div>
)

const ThirdNavRow = () => {
  return (
    <div className="flex justify-between py-4">
      <div className="flex gap-x-4">
        {iconsList.map((item, index) => (
          <IconAndText key={index} icon={item.icon} text={item.text} />
        ))}
      </div>
      <IconAndText icon={<FaPhoneVolume />} text="1-800-123-4567" />
    </div>
  )
}

export default ThirdNavRow
