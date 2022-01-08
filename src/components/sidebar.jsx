import React from 'react'
//componentes
import ClientFilterComponent from './clientFIlter'
import LinkButtonComponent from './linkButton'

const SidebarComponent = () => {
  return (
    <aside className="w-screen bg-gray-800 h-20">
      <div className="flex justify-start items-center h-full px-10">
        {/* <ClientFilterComponent />s */}
        <div className="w-full flex justify-end">
          <div className="mr-4">
            <LinkButtonComponent
              color="gray"
              text=""
              width="20"
              page="/config"
              opacityColor="500"
              icon='menu'
            />
          </div>
          <div className="mr-4">
            <LinkButtonComponent
              color="gray"
              text="Pedidos"
              width="40"
              page="/"
              opacityColor="500"
            />
          </div>
          <LinkButtonComponent
            color="blue"
            text="Nuevo Pedido"
            width="40"
            page="/create"
          />
        </div>
      </div>
    </aside>
  )
}

export default SidebarComponent
