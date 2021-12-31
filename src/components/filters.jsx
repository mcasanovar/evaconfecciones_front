import React from 'react'
//component
import {
  DropdownComponent,
  InputComponent
} from './'
//constant
import { STATES_FILTER, YEARS_FILTERS } from '../constant/var'

const FiltersComponents = () => {
  return (
    <div className="w-full flex-row justify-center items-center bg-white">
      <h3 className="uppercase font-bold py-2 text-center"> Filtros</h3>
      <div className="grid grid-cols-3 gap-4 place-content-center place-items-center w-full h-32 px-6">
        {/* Filtro por estado */}
        <div className="w-full">
          <DropdownComponent
            options={STATES_FILTER}
            title="Filtrar por Estado"
            fieldValue=""
            keyValue=""
            defaultValue={{}}
            onSelect={(e) => { }}
          />
        </div>
        {/* Filtro por nombre cliente */}
        <div className="w-full">
          <span className="text-gray-700">Filtrar por Cliente</span>
          <InputComponent
            id="filter_by_client"
            name="clientFilter"
            type="text"
            placeholder="Nombre del cliente"
            width="full"
            height="10"
          />
        </div>
        {/* Filtro por año */}
        <div className="w-full">
          <DropdownComponent
            options={YEARS_FILTERS}
            title="Filtrar por Estado"
            fieldValue=""
            keyValue=""
            defaultValue={Date.today().toString("yyyy")}
            onSelect={(e) => { }}
          />
        </div>
      </div>
    </div>
  )
}

export default FiltersComponents
