import React, { useState, useEffect, useContext } from 'react'
import Router from 'next/router'
//functions
import {
  formattedPrices,
  getActualYear,
  transformDate,
  getTotalValue,
  confirmMessage
} from '../functions'
//constants
import { STATES_COLORS_ORDERS, ERROR } from '../constant/var'
//componentes
import {
  LayoutComponent,
  CardComponent,
  ButtonComponent,
  FiltersComponent,
  SkeletonComponent,
  AlertMessageComponent,
  ProgressBarComponent
} from '../components'
//hooks
import {
  useQueryGraphQL,
  useMutationGraphQL,
  useErrorMessage,
  useLoading
} from '../hooks'
//graphql
import {
  GET_ORDERS,
  DELETE_ORDER
} from '../graphql/index'
//contexts
import GlobalAlertContext from '../store/globalAlert/globalAlertContext'

const Index = () => {
  const [ordersData, setOrdersData] = useState([])
  const [typeAlert, setTypeAlert] = useState('red')
  const { showAlert, showGlobalAlert, textResult, descriptionResult, cleanGlobalAlert } = useContext(GlobalAlertContext)
  const [errorMessage, cleanErrorMessage, createMessage] = useErrorMessage({ show: false, message: '' })

  const { transformToLocalDateString, transformToLocalDateWithoutHour } = transformDate

  //----------------------------GRAPHQL
  const { data, error: ErrorGetOrders, loading } = useQueryGraphQL(GET_ORDERS, { variables: { year: getActualYear() } })
  const [deleteOrder] = useMutationGraphQL(DELETE_ORDER, {
    update(cache, { data: { deleteOrder } }) {
      const { getOrders } = cache.readQuery({ query: GET_ORDERS, variables: { year: getActualYear() } })
      const { isDirectBuy, ...restOfData } = deleteOrder
      cache.writeQuery({
        query: GET_ORDERS,
        data: {
          getOrders: [...getOrders, restOfData]
        },
        variables: {
          year: getActualYear()
        }
      })
    }
  })
  //-----------------------------

  const handleGoToEditOrder = (id) => {
    Router.push({
      pathname: "edit/[id]",
      query: { id }
    })
  }

  const handleFilter = (arg, value) => {
    const aux = data.getOrders.filter((order) => order[arg].toLowerCase().includes(value.toLowerCase()))
    setOrdersData(aux)
  }

  const handleCleanFilters = () => {
    setOrdersData(data.getOrders)
  }

  const handleDeleteOrder = async ({ _id: id, clientName }) => {
    try {

      let description = ''

      if (!!clientName) {
        description = `Orden de ${clientName}`
      }

      const resultConfirm = await confirmMessage({
        title: '¿Seguro que desea eliminar esta orden?',
        description,
        confirmButtonText: 'Si, Eliminalo',
        finalText: {
          title: "Orden eliminada!",
          desciption: "La orden seleccionada ha sido eliminada correctamente",
        }
      })

      if (!!resultConfirm.isConfirmed) {
        await deleteOrder({
          variables: {
            id
          }
        })

        setTypeAlert("green")

        showGlobalAlert({ textResult: 'Action generada', descriptionResult: 'Orden eliminada correctamente' })
      }
    } catch (error) {
      createMessage({ message: error.message })
      console.log(error)
    }
  }

  //------------------------------USEEFFECT
  useEffect(() => {
    if (!!data && data?.getOrders && !ErrorGetOrders) {
      setOrdersData(data.getOrders)
    }
  }, [data, ErrorGetOrders])

  useEffect(() => {
    if (showAlert) {
      setTimeout(() => {
        cleanGlobalAlert()
      }, 3000);
    }
  }, [showAlert])

  useEffect(() => {
    if (!!ErrorGetOrders) {
      showGlobalAlert({ textResult: 'Error de carga', descriptionResult: ErrorGetOrders.message })
    }
  }, [ErrorGetOrders])

  useEffect(() => {
    if (errorMessage.show) {
      setTimeout(() => {
        cleanErrorMessage()
      }, 3000);
    }
  }, [errorMessage.show])

  return (
    <div>
      <LayoutComponent>
        {/* Filtros */}
        <FiltersComponent
          onSelectState={(value) => handleFilter("state", value)}
          onSelectName={(value) => handleFilter("clientName", value)}
          onCleanFilters={() => handleCleanFilters()}
        />
        <br />
        {loading ?
          <div className="grid grid-cols-3 gap-4 w-full">
            <SkeletonComponent />
            <SkeletonComponent />
            <SkeletonComponent />
          </div> :
          <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 px-10">
            {/* Lista de pedidos */}
            {showAlert &&
              <div className="absolute w-full flex justify-center pb-4">
                <div className="w-2/3 flex justify-center">
                  <AlertMessageComponent
                    title={textResult}
                    description={descriptionResult}
                    color={typeAlert}
                    animation="animate__slideInDown animate__faster"
                  />
                </div>
              </div>
            }
            {errorMessage.show &&
              <div className="mt-2">
                <AlertMessageComponent
                  title={ERROR}
                  description={errorMessage.message}
                />
              </div>
            }
            {!!ordersData.length && ordersData.map((order, index) => (
              <div key={index} className="w-11/12 py-2 cursor-pointer">
                <CardComponent
                  borderColor={STATES_COLORS_ORDERS[order.state]}
                >
                  {/* Nro de pedido y nombre del cliente */}
                  <div onClick={() => handleGoToEditOrder(order._id)} className="w-full flex justify-between">
                    <h3 className="uppercase font-normal pr-2">{`Pedido #${order.code ?? ""}`}</h3>
                    <h3 className="uppercase font-extrabold text-lg">{`${order.clientName}`}</h3>
                  </div>
                  <br />
                  <br />
                  {/* <div className="pt-4">
                    <h3 className="uppercase font-bold pr-2"> Información</h3>
                  </div> */}
                  {/* Fecha de creación y última actualizacion*/}
                  <div onClick={() => handleGoToEditOrder(order._id)} className="w-full flex justify-between">
                    {/* Fecha creación */}
                    <div className="pt-2">
                      <h3 className="uppercase font-medium"> Fecha Creación</h3>
                      <h3>{`${transformToLocalDateString(order.createAt)}`}</h3>
                    </div>
                    {/* Fecha última actualización */}
                    <div className="pt-2">
                      <h3 className="uppercase font-medium">Ultima actualización</h3>
                      <h3 className="text-right">{transformToLocalDateString(order.updatedAt)}</h3>
                    </div>
                  </div>
                  <br />
                  <div onClick={() => handleGoToEditOrder(order._id)} className="w-full flex justify-between">
                    {/* Fecha entrega */}
                    <div className="pt-2">
                      <h3 className="uppercase font-medium">Fecha de entrega</h3>
                      <h3>{transformToLocalDateWithoutHour(order.estimatedDeliveryDate)}</h3>
                    </div>
                  </div>
                  <br />
                  <br />
                  <br />
                  {/* Total de items*/}
                  <div onClick={() => handleGoToEditOrder(order._id)} className="w-full flex justify-end">
                    <h3 className="pr-2 uppercase font-bold">Cantidad de prendas:</h3>
                    <h3 className="uppercase font-bold">{getTotalValue(order.details, "quantity")}</h3>
                  </div>
                  <br />
                  {/* Subtotal */}
                  <div onClick={() => handleGoToEditOrder(order._id)} className="w-full flex justify-end pt-2">
                    <h3 className="pr-2 uppercase font-bold">Subtotal:</h3>
                    <h3 className="uppercase font-bold">{`${formattedPrices(order.subTotal)}`}</h3>
                  </div>
                  {/* Abono */}
                  <div onClick={() => handleGoToEditOrder(order._id)} className="w-full flex justify-end pt-2">
                    <h3 className="pr-2 uppercase font-bold">Abono:</h3>
                    <h3 className={`uppercase font-bold ${order.previewPayment > 0 ? 'text-green-900' : 'text-black'}`}>{`${formattedPrices(order.previewPayment)}`}</h3>
                  </div>
                  <br />
                  <br />
                  <div onClick={() => handleGoToEditOrder(order._id)} className="w-full flex justify-between items-center">
                    {/* Estado */}
                    <div className="w-full flex">
                      <h3 className="font-bold pr-2">Estado:</h3>
                      <h3 className={`font-bold text-${STATES_COLORS_ORDERS[order.state]}-500`}>{`${order.state}`}</h3>
                    </div>
                    {/* Precio total */}
                    <div className="w-full flex justify-end">
                      <h3 className="pr-2 uppercase font-bold">Total a Pagar:</h3>
                      <h3 className="uppercase font-bold">{`${formattedPrices(order.balance)}`}</h3>
                    </div>
                  </div>
                  <br />
                  {/* Barra de porcentaje de avance */}
                  <ProgressBarComponent
                    color={order.percentage === 100 ? 'green' : 'blue'}
                    value={order.percentage}
                  />
                  <br />
                  {/* Botones */}
                  <div className="w-full flex justify-between">
                    <ButtonComponent
                      color="blue"
                      text="Ver Detalle"
                      width="5/12"
                      icon="details"
                      onClick={() => handleGoToEditOrder(order._id)}
                    />
                    <ButtonComponent
                      color="red"
                      text="Eliminar"
                      width="5/12"
                      icon="delete"
                      onClick={() => handleDeleteOrder(order)}
                    />
                  </div>
                </CardComponent>
              </div>
            ))}
          </div>
        }
      </LayoutComponent>
    </div>
  )
};

export default Index;
