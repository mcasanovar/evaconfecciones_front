import React, { useState } from 'react'
//component
import {
  DropdownComponent,
  InputComponent,
  ButtonComponent
} from './'
//constant
import { STATES_FILTER, YEARS_FILTERS } from '../constant/var'

const FiltersComponents = ({
  onSelectState,
  onSelectName,
  onCleanFilters
}) => {
  const [name, setName] = useState('')
  const [stateFilter, setStateFilter] = useState('')

  return (
    <div className="w-full flex-column justify-center items-center bg-white">
      <h3 className="uppercase font-bold py-2 text-center"> Filtros</h3>
      <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4 place-content-center place-items-center w-full sm:h-50 md:h-32 px-6">
        {/* Filtro por estado */}
        <div className="w-full">
          <DropdownComponent
            options={STATES_FILTER}
            title="Filtrar por Estado"
            fieldValue=""
            keyValue=""
            defaultValue={stateFilter}
            onSelect={(e) => {
              onSelectState(e.target.value)
              setStateFilter(e.target.value)
              setName('')
            }}
          />
        </div>
        {/* Filtro por nombre cliente */}
        <div className="w-full">
          <span className="text-gray-700">Filtrar por Cliente</span>
          <div className="flex">
            <InputComponent
              id="filter_by_client"
              name="clientFilter"
              type="text"
              placeholder="Nombre del cliente"
              width="full"
              height="9"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <ButtonComponent
              color="gray"
              text="Buscar"
              width="5/12"
              onClick={() => {
                onSelectName(name)
                setStateFilter('')
                setName('')
              }}
            />
          </div>
        </div>
        {/* limpiar filtros */}
        <div className="w-full">
          <span className="text-gray-700">.</span>
          <ButtonComponent
            color="blue"
            text="Limpiar filtros"
            width="full"
            onClick={() => {
              onCleanFilters(),
              setStateFilter('')
            }}
          />
        </div>
        {/* Filtro por año -----TODO: OCULTO HASTA DESARROLLAR ----- */}
        <div className="w-full hidden">
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
