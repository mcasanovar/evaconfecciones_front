import React from 'react'
//componentes
import InputComponent from './input'
import ButtonComponent from './button'

const ClientFilterComponent = () => {
  return (
    <div className="w-full flex items-center">
      <h3 className="text-white font-bold pr-2">Buscar por nombre cliente</h3>
      <InputComponent
        id="clientName"
        type="text"
        placeholder="Buscar por cliente"
        width="80"
        onChange={() => { }}
      />
      <div className="ml-2">
        <ButtonComponent
          color="blue"
          text="Buscar"
          width="24"
          icon=""
          onClick={() => { }}
        />
      </div>
    </div>
  )
}

export default ClientFilterComponent
