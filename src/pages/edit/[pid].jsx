import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
//components
import {
  LayoutComponent,
  InputComponent,
  DropdownComponent,
  ButtonComponent,
  TableComponent
} from '../../components'
//fake data
import {
  fakeClothes,
  fakeOrders
} from '../../fakedata'
//functions
import {
  formattedPrices,
  getUniquesSelections,
  sortItems
} from '../../functions'
//constants
import {
  HEADER_TABLE_ORDERS,
  HEADER_TABLE_PREVIUSPAYMENTS
} from '../../constant/var'

const EditOrder = () => {
  const router = useRouter();
  const { query } = router;

  const [orderFindedState, setOrderFindedState] = useState({});

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

  //-------------------------------------------------USEEFFECT
  useEffect(() => {
    if (query?.pid) {
      const orderFinded = fakeOrders.find((order) => order._id === query.pid);
      if (orderFinded) {
        setOrderFindedState(orderFinded)
      }
    }
  }, [query])

  return (
    <LayoutComponent>
      <div className="w-full min-h-screen flex justify-center items-start">
        <div className="sm:w-full md:w-11/12 xl:w-11/12 2xl:w-1/2 min-h-auto bg-white rounded-md border-1 border-gray-300 shadow-md p-4">
          {/* Titulo */}
          <h1 className="font-bold text-black uppercase flex justify-center mt-4">PEDIDO DE MARIO CASANOVA #1</h1>
          <br />
          {/* Información */}
          <h1 className="font-bold text-black pl-1">Nombre cliente</h1>
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
          {/* Tabla de Abonos */}
          <h1 className="font-bold text-black pl-1">Abono</h1>
          <div className="w-full flex items-start mt-2">
            <div className="w-1/2 flex">
              <InputComponent
                id="payment"
                type="number"
                placeholder="Pago de Abono"
                width="3/4"
                height="10"
                onChange={() => { }}
              />
              <ButtonComponent
                color="blue"
                text="Agregar Abono"
                width="1/4"
                height="10"
                icon=""
                onClick={() => { }}
              />
            </div>
          </div>
          <div className="w-1/2">
              <TableComponent
                headers={HEADER_TABLE_PREVIUSPAYMENTS}
                data={!!orderFindedState ? orderFindedState.previusPayments : []}
              />
            </div>
          <br />
          <h1 className="font-bold text-black pl-1 flex justify-center">Agregar prendas</h1>
          <br />
          <div className="w-full flex justify-between items-center">
            <DropdownComponent
              options={getUniquesSelections(fakeClothes, 'collage')}
              title="Colegios"
              onSelect={(e) => handleSelectCollage(e)}
            />
            <DropdownComponent
              options={getUniquesSelections(fakeClothes, 'clothe')}
              title="Prenda"
              onSelect={(e) => handleSelectClothes(e)}
            />
            <DropdownComponent
              options={sortOptions(getUniquesSelections(fakeClothes, 'size'), 'asc')}
              title="Talla"
              onSelect={(e) => handleSelectSize(e)}
            />
            <DropdownComponent
              options={
                handleFormattedPrice(sortOptions(getUniquesSelections(fakeClothes, 'price'), 'asc'))
              }
              title="Precios"
              onSelect={(e) => handleSelectSize(e)}
            />
            <br />
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
            data={!!orderFindedState ? orderFindedState.details : []}
          />
          <br />
          <div className="w-full flex justify-end">
            <div className="w-1/5 flex justify-between items-center">
              <h1 className="font-bold text-black pr-4 flex justify-end uppercase">Sub-total</h1>
              <h1 className="font-bold text-black-900 pl-1 text-2xl flex justify-end uppercase">$12.500</h1>
            </div>
          </div>
          <br />
          <div className="w-full flex justify-end">
            <div className="w-1/5 flex justify-between items-center">
              <h1 className="font-bold text-black pr-4 flex justify-end uppercase">abono</h1>
              <h1 className="font-bold text-green-900 pl-1 text-2xl flex justify-end uppercase">$10.000</h1>
            </div>
          </div>
          <br />
          <div className="w-full flex justify-end">
            <div className="w-1/4 flex justify-between items-center">
              <h1 className="font-bold text-black pr-4 flex justify-end uppercase">Total a Pagar</h1>
              <h1 className="font-bold text-green-900 pl-1 text-3xl flex justify-end uppercase">$2.500</h1>
            </div>
          </div>
          {/* Finalizar orden */}
          <br />
          {/* <ButtonComponent
            color="green"
            text="Confirmar Pedido"
            width="full"
            icon=""
            onClick={() => { }}
          /> */}
        </div>
      </div>
    </LayoutComponent>
  )
}

export default EditOrder
