import { ElementType, FC } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import classNames from 'classnames'
import { GoTag } from 'react-icons/go'
import { MdOutlineDashboard } from 'react-icons/md'
import { RxCube } from 'react-icons/rx'

interface MenuItemProps {
  Icon: ElementType
  label: string
  link: string
}

const menuLinks: MenuItemProps[] = [
  { Icon: MdOutlineDashboard, label: 'Dashboard', link: '/dashboard' },
  { Icon: RxCube, label: 'Products', link: '/products' },
  { Icon: GoTag, label: 'Categories', link: '/categories' },
]

const NavigationMenuItem: FC<MenuItemProps> = ({ Icon, label, link }) => {
  const path = usePathname().split('/admin')[1]

  return (
    <Link
      href={`/admin/${link}`}
      className={classNames(
        'flex items-center gap-x-4 rounded px-4 py-2 duration-300 hover:bg-blue-900',
        {
          'bg-blue-900': path === link,
        },
      )}
    >
      <Icon className="text-xl" />
      <span>{label}</span>
    </Link>
  )
}
const NavigationMenu = () => (
  <nav className="flex-1 p-2">
    <ul className="space-y-2">
      {menuLinks.map(({ Icon, label, link }, index) => (
        <li key={index}>
          <NavigationMenuItem Icon={Icon} label={label} link={link} />
        </li>
      ))}
    </ul>
  </nav>
)

export default NavigationMenu
