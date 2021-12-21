import React from 'react'
import Router from 'next/router'
//fakedata
import { fakeOrders } from '../fakedata/'
//componentes
import LayoutComponent from '../components/layout'
import CardComponent from '../components/card'
import ButtonComponent from '../components/button'
import { formattedPrices } from '../functions'
import { STATES_COLORS_ORDERS } from '../constant/var'

const Index = () => {

  const handleGoToEditOrder = (id) => {
    Router.push({
      pathname: "edit/[id]",
      query: { id }
    })
  }

  return (
    <div>
      <LayoutComponent>
        <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 px-10">
          {/* Lista de pedidos */}
          {fakeOrders.map((order, index) => (
            <div className="w-11/12 py-2">
              <CardComponent
                borderColor={STATES_COLORS_ORDERS[order.state]}
              >
                {/* Nro de pedido y nombre del cliente */}
                <div className="w-full flex justify-between">
                  <h3 className="uppercase font-bold pr-2">{`Pedido #${order.correlativeNumber}`}</h3>
                  <h3 className="uppercase font-bold">{`${order.clientName}`}</h3>
                </div>
                <div className="pt-4">
                  <h3 className="uppercase font-bold pr-2"> Información</h3>
                </div>
                {/* Fecha de creación y última actualizacion*/}
                <div className="w-full flex justify-between">
                  {/* Fecha creación */}
                  <div className="pt-2">
                    <h3 className="uppercase"> Fecha Creación</h3>
                    <h3>{`${order.createAt}`}</h3>
                  </div>
                  {/* Fecha última actualización */}
                  <div className="pt-2">
                    <h3 className="uppercase">Ultima actualización</h3>
                    <h3 className="text-right">{`${order.updateAt}`}</h3>
                  </div>
                </div>
                <br />
                <br />
                <br />
                {/* Total de items*/}
                <div className="w-full flex justify-end">
                  <h3 className="pr-2 uppercase font-bold">Cantidad de prendas:</h3>
                  <h3 className="uppercase font-bold">{`${order.details.length}`}</h3>
                </div>
                <br />
                {/* Subtotal */}
                <div className="w-full flex justify-end pt-2">
                  <h3 className="pr-2 uppercase font-bold">Subtotal:</h3>
                  <h3 className="uppercase font-bold">{`${formattedPrices(order.subtotal)}`}</h3>
                </div>
                {/* Abono */}
                <div className="w-full flex justify-end pt-2">
                  <h3 className="pr-2 uppercase font-bold">Abono:</h3>
                  <h3 className="uppercase font-bold">{`${formattedPrices(order.previewPayment)}`}</h3>
                </div>
                <br />
                <br />
                <div className="w-full flex justify-between items-center">
                  {/* Estado */}
                  <div className="w-full flex">
                    <h3 className="font-bold pr-2">Estado:</h3>
                    <h3 className={`font-bold text-${STATES_COLORS_ORDERS[order.state]}-500`}>{`${order.state}`}</h3>
                  </div>
                  {/* Precio total */}
                  <div className="w-full flex justify-end">
                    <h3 className="pr-2 uppercase font-bold">Total a Pagar:</h3>
                    <h3 className="uppercase font-bold">{`${formattedPrices(order.total)}`}</h3>
                  </div>
                </div>
                <br />
                {/* Botones */}
                <div className="w-full flex justify-between">
                  <ButtonComponent
                    color="blue"
                    text="Ver Detalle"
                    width="5/12"
                    icon="details"
                    onClick={() => handleGoToEditOrder('asasadwxsdwxs')}
                  />
                  <ButtonComponent
                    color="red"
                    text="Eliminar"
                    width="5/12"
                    icon="delete"
                    onClick={() => { }}
                  />
                </div>
              </CardComponent>
            </div>
          ))}
        </div>
      </LayoutComponent>
    </div>
  )
};

export default Index;
