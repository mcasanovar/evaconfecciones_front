import React from 'react'
//components
import InputComponent from './input'
import ButtonComponent from './button'
import TableComponent from './table'
//var
import { HEADER_TABLE_SIZE } from '../constant/var'
//fakedata
import { fakeSizes } from '../fakedata'
import { sortItems } from '../functions'

const CollageComponent = () => {

  const { sortObjects } = sortItems;

  const handleSortSizes = (sizes) => {
    return sortObjects(sizes, "name", "desc");
  }

  return (
    <div className="bg-white mx-4 p-4 rounded-md sm:mt-2 xl:mt-0">
      <div className="w-full flex justify-center pb-4">
        <p className="font-semibold uppercase text-md">Tallas</p>
      </div>
      <div className="sm:w-full lg:flex lg:items-center">
        <div className="sm:w-full lg:w-2/3 lg:flex lg:pr-2">
          <InputComponent
            id="input_size_admin"
            placeholder="Ingrese una Talla"
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
        headers={HEADER_TABLE_SIZE}
        data={handleSortSizes(fakeSizes)}
      />
    </div>
  )
}

export default CollageComponent
