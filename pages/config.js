import React from 'react'
import { HEADER_TABLE_ITEMS } from '../constant/var'
//components
import LayoutComponent from '../components/layout'
import CollageComponent from '../components/collage'
import ClothesComponent from '../components/clothes'
import SizesComponent from '../components/sizes'
import TableComponent from '../components/table'
import SkeletonLoaderComponent from '../components/skeletonLoader'
//functions
import { TakeofTypenameFromReturnQuery } from '../functions'
//hooks
import { useQueryGraphQL } from '../hooks'
//graphql
import { GET_ITEMS } from '../graphql/index'

const config = () => {

  const { data, error, loading } = useQueryGraphQL(GET_ITEMS)

  return (
    <LayoutComponent>
      <div className="w-full flex justify-center pb-4">
        <p className="font-bold uppercase text-lg"> Administración de Valores </p>
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3">
        <CollageComponent />
        <ClothesComponent />
        <SizesComponent />
      </div>
      <br />
      {loading ?
        <div className="w-full">
          <SkeletonLoaderComponent />
        </div> :
        <div className="w-full">
          <div className="bg-white mx-4 p-4 rounded-md">
            <div className="w-full flex justify-center pb-4">
              <p className="font-semibold uppercase text-md">Prendas a Vender</p>
            </div>
            <TableComponent
              headers={HEADER_TABLE_ITEMS}
              data={TakeofTypenameFromReturnQuery(data.getAllItems)}
            />
          </div>
        </div>
      }
    </LayoutComponent>
  )
}

export default config
