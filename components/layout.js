import React from 'react'
import Head from 'next/head'
//componentes
import SideBarComponent from './sidebar'

const LayoutComponent = ({children}) => {
  return (
    <>
      <Head>
        <title>evaconfecciones - Gestión de pedidos</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
        <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet"></link>
      </Head>
      <div className="bg-gray-200 min-h-screen w-screen">
        <SideBarComponent/>
        <br/>
        {children}
      </div>
    </>
  )
}

export default LayoutComponent
