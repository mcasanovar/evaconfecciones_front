import React from 'react'
//fake data
import {
  fakeItems,
} from '../fakedata/index'
//functions
import {
  formattedPrices,
  getUniquesSelections,
  sortItems
} from '../functions'
//constants
import { HEADER_TABLE_ORDERS } from '../constant/var'
//componentes
import LayoutComponent from '../components/layout'
import InputComponent from '../components/input'
import DropdownComponent from '../components/dropdown'
import ButtonComponent from '../components/button'
import TableComponent from '../components/table'
import AlertMessageComponent from '../components/alertMessage'

const CreateOrder = () => {

  const { sortOptions } = sortItems;

  const handleSelectCollage = (e) => {

  }

  const handleSelectClothes = (e) => {

  }

  const handleSelectSize = (e) => {

  }

  const handleFormattedPrice = (prices) => {
    const resultPrices = prices.map((price) => {
      return formattedPrices(price)
    });

    return resultPrices;
  }

  return (
    <LayoutComponent>
      <div className="w-full min-h-screen flex justify-center items-start">
        <div className="sm:w-full md:w-11/12 xl:w-11/12 2xl:w-1/2 min-h-auto bg-white rounded-md border-1 border-gray-300 shadow-md p-4">
          {/* Titulo */}
          <h1 className="font-bold text-black uppercase flex justify-center mt-4">Crear Nuevo Pedido</h1>
          <br />
          {/* Información */}
          <h1 className="font-bold text-black pl-1">Nombre cliente</h1>
          {/* <AlertMessageComponent
            title='* Requerido'
            description='Nombre del cliente requerido'
          /> */}
          <div className="w-full mt-2">
            <InputComponent
              id="name"
              type="text"
              placeholder="Nombre del cliente"
              width="full"
              onChange={() => { }}
            />
          </div>
          <br />
          <h1 className="font-bold text-black pl-1">Telefono cliente</h1>
          <div className="w-full mt-2">
            <InputComponent
              id="phone"
              type="phone"
              placeholder="Teléfono del cliente"
              width="1/2"
              onChange={() => { }}
            />
          </div>
          <br />
          <h1 className="font-bold text-black pl-1">Abono</h1>
          <div className="w-full flex mt-2">
            <InputComponent
              id="payment"
              type="number"
              placeholder="Pago de Abono"
              width="1/2"
              onChange={() => { }}
            />
            <ButtonComponent
              color="blue"
              text="Agregar Abono"
              width="18"
              height="10"
              icon=""
              onClick={() => { }}
            />
          </div>
          <br />
          <h1 className="font-bold text-black pl-1 flex justify-center">Agregar prendas</h1>
          <br />
          <div className="w-full flex justify-between items-center">
            <DropdownComponent
              options={getUniquesSelections(fakeItems, 'collage')}
              title="Colegios"
              onSelect={(e) => handleSelectCollage(e)}
            />
            <DropdownComponent
              options={getUniquesSelections(fakeItems, 'clothes')}
              title="Prenda"
              onSelect={(e) => handleSelectClothes(e)}
            />
            <DropdownComponent
              options={sortOptions(getUniquesSelections(fakeItems, 'size'), 'asc')}
              title="Talla"
              onSelect={(e) => handleSelectSize(e)}
            />
            <DropdownComponent
              options={
                handleFormattedPrice(sortOptions(getUniquesSelections(fakeItems, 'price'), 'asc'))
              }
              title="Precios"
              onSelect={(e) => handleSelectSize(e)}
            />
            <ButtonComponent
              color="blue"
              text="Agregar"
              width="40"
              height="14"
              icon=""
              onClick={() => { }}
            />
          </div>
          <br />
          <TableComponent
            headers={HEADER_TABLE_ORDERS}
            data={[]}
          />
          <br />
          <div className="w-full flex justify-end">
            <div className="w-1/5 flex justify-between items-center">
              <h1 className="font-bold text-black pr-4 flex justify-end uppercase">Sub-total</h1>
              <h1 className="font-bold text-black-900 pl-1 text-2xl flex justify-end uppercase">$0</h1>
            </div>
          </div>
          <br />
          <div className="w-full flex justify-end">
            <div className="w-1/5 flex justify-between items-center">
              <h1 className="font-bold text-black pr-4 flex justify-end uppercase">abono</h1>
              <h1 className="font-bold text-green-900 pl-1 text-2xl flex justify-end uppercase">$0</h1>
            </div>
          </div>
          <br />
          <div className="w-full flex justify-end">
            <div className="w-1/4 flex justify-between items-center">
              <h1 className="font-bold text-black pr-4 flex justify-end uppercase">Total a Pagar</h1>
              <h1 className="font-bold text-green-900 pl-1 text-3xl flex justify-end uppercase">$0</h1>
            </div>
          </div>
          {/* Finalizar orden */}
          <br />
          <ButtonComponent
            color="green"
            text="Confirmar Pedido"
            width="full"
            icon=""
            onClick={() => { }}
          />
        </div>
      </div>
    </LayoutComponent>
  )
}

export default CreateOrder
