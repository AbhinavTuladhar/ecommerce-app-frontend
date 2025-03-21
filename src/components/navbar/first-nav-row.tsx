import React from 'react'
import {
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaReddit,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa'

interface IconInfo {
  icon: React.ElementType // React component type
  link: string
  hoverColor: string
}

// Define the icon information array with the appropriate types
const iconInformation: IconInfo[] = [
  { icon: FaTwitter, link: 'https://twitter.com', hoverColor: 'text-blue-400' },
  { icon: FaFacebook, link: 'https://facebook.com', hoverColor: 'text-blue-600' },
  { icon: FaPinterest, link: 'https://pinterest.com', hoverColor: 'text-red-500' },
  { icon: FaReddit, link: 'https://reddit.com', hoverColor: 'text-orange-500' },
  { icon: FaYoutube, link: 'https://youtube.com', hoverColor: 'text-red-600' },
  { icon: FaInstagram, link: 'https://instagram.com', hoverColor: 'text-indigo-500' },
]

// Define props for the IconLink component
interface IconLinkProps {
  Icon: React.ElementType
  link: string
  hoverColor: string
}

// Create the IconLink component
const IconLink: React.FC<IconLinkProps> = ({ Icon, link, hoverColor }) => (
  <a href={link} className={`cursor-pointer hover:${hoverColor}`}>
    <Icon className="duration-300 ease-in" />
  </a>
)

// Create the FirstNavRow component
const FirstNavRow: React.FC = () => (
  <div className="flex items-center justify-between py-3">
    <span className="text-sm">Welcome to Shopicus online ecommerce store.</span>
    <div className="flex items-center gap-x-3">
      <span> Follow us on: </span>
      {iconInformation.map((item, index) => (
        <IconLink key={index} Icon={item.icon} link={item.link} hoverColor={item.hoverColor} />
      ))}
    </div>
  </div>
)

export default FirstNavRow
