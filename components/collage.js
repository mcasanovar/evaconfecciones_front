import React from 'react'
//components
import InputComponent from './input'
import ButtonComponent from './button'
import TableComponent from './table'
//var
import { HEADER_TABLE_COLLAGES } from '../constant/var'
//fakedata
import { fakeCollages } from '../fakedata'

const CollageComponent = () => {
  return (
    <div className="bg-white mx-4 p-4 rounded-md">
      <div className="w-full flex justify-center pb-4">
        <p className="font-semibold uppercase text-md">Colegios</p>
      </div>
      <div className="sm:w-full lg:flex lg:items-center">
        <div className="sm:w-full lg:w-2/3 lg:flex lg:pr-2">
          <InputComponent
            id="input_collage_admin"
            placeholder="Ingrese un colegio"
            width="full"
            height="9"
            onChange={() => { }}
          />
        </div>
        <div className="sm:w-full sm:pt-4 lg:w-1/3 lg:pt-0">
          <ButtonComponent
            color="green"
            text="Agregar"
            onClick={() => { }}
          />
        </div>
      </div>
      <TableComponent
        headers={HEADER_TABLE_COLLAGES}
        data={fakeCollages}
      />
    </div>
  )
}

export default CollageComponent
