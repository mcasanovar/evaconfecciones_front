import React from 'react'
//components
import InputComponent from './input'
import ButtonComponent from './button'
import TableComponent from './table'
import SkeletonLoaderComponent from './skeletonLoader'
//var
import { HEADER_TABLE_SIZE } from '../constant/var'
//functions
import { TakeofTypenameFromReturnQuery } from '../functions'
import { sortItems } from '../functions'
//hooks
import { useQueryGraphQL } from '../hooks'
//graphql
import { GET_SIZES } from '../graphql'

const CollageComponent = () => {

  const { sortObjects } = sortItems;

  const handleSortSizes = (sizes) => {
    return sortObjects(sizes, "name", "asc");
  }

  const { data, error, loading } = useQueryGraphQL(GET_SIZES)

  if (loading) {
    return (
      <div className="w-full">
        <SkeletonLoaderComponent />
      </div>
    )
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
        data={handleSortSizes(TakeofTypenameFromReturnQuery(data.getAllSizes))}
      />
    </div>
  )
}

export default CollageComponent
