import React from 'react'
import Link from 'next/link'
//svg
import MenuIcon from '../svg/menuIcon'

const LinkButtonComponent = ({
  color = 'gray',
  text = '',
  width = 'full',
  height = '10',
  page = '',
  opacityColor = '700',
  icon = null
}) => {
  return (
    <Link href={`${page}`}>
      <a className={`w-${width} h-${height} flex justify-center items-center bg-${color}-${opacityColor} rounded-md p-2 text-white font-bold uppercase text-sm hover:shadow-md`}>
        {text}
        {!!icon && icon === 'menu' &&
          <MenuIcon/>
        }
      </a>
    </Link>
  )
}

export default LinkButtonComponent
