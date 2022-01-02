import React, { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { Formik } from 'formik'
import * as Yup from 'yup'
//components
import {
  LayoutComponent,
  InputComponent,
  DropdownComponent,
  ButtonComponent,
  TableComponent,
  SkeletonComponent,
  AlertMessageComponent,
  TextareaInputComponent,
  PreviusPaymentComponent,
  ProgressBarComponent
} from '../../components'
//functions
import {
  formattedPrices,
  getUniquesSelections,
  sortItems,
  TakeofTypenameFromReturnQuery,
  getTotalPrice,
  getItemFromItems,
  getPercentageOrder,
  confirmMessage
} from '../../functions'
//constants
import {
  HEADER_TABLE_ORDERS,
  REQUIRED,
  ERROR,
  TERMINATED
} from '../../constant/var'
//hooks
import {
  useQueryGraphQL,
  useMutationGraphQL,
  useErrorMessage,
  useLoading
} from '../../hooks'
//graphql
import {
  GET_ORDER_BY_ID,
  GET_ITEMS,
  UPDATE_ORDER
} from '../../graphql/index'
//contexts
import GlobalAlertContext from '../../store/globalAlert/globalAlertContext'

const EditOrder = () => {
  const router = useRouter();
  const { query: { pid } } = router;

  const [typeAlert, setTypeAlert] = useState('red')
  const [selectedOrderItems, setSelectedOrderItems] = useState([])
  const [totals, setTotals] = useState({
    subtotal: 0,
    previusPayment: 0,
    pending: 0
  })
  const [selectedItem, setSelectedItem] = useState({
    collage: "",
    clothes: "",
    size: "",
    quantity: "1"
  })
  const [percentageOrder, setPercentageOrder] = useState(0)
  const [previusPayment, setPreviusPayment] = useState("0")
  const [errorMessage, cleanErrorMessage, createMessage] = useErrorMessage({ show: false, message: '' })
  const [createLoading, toggleCreateLoading] = useLoading(false)

  const { sortOptions } = sortItems;

  const { showAlert, showGlobalAlert, textResult, descriptionResult, cleanGlobalAlert } = useContext(GlobalAlertContext)

  //----------------------------GRAPHQL
  const { data: orderData, error: ErrorGetItem, loading } = useQueryGraphQL(GET_ORDER_BY_ID, { variables: { id: pid } })

  const { data: itemsData } = useQueryGraphQL(GET_ITEMS)

  const [updateOrder] = useMutationGraphQL(UPDATE_ORDER)
  //------------------------------------

  const formikValidationSchema = Yup.object({
    clientName: Yup.string()
      .required("Debe ingresar el nombre del cliente"),
    phone: Yup.string()
      .required("Debe ingresar el numero de telefono del cliente")
  })

  const handleCalculatePrices = () => {
    const subtotal = getTotalPrice(selectedOrderItems, 'total')
    const pending = subtotal - totals.previusPayment

    setTotals({
      ...totals,
      subtotal,
      pending
    })
  }

  const handleAddItem = () => {
    //verificar que existan todos los campos
    if (!selectedItem.collage) return createMessage({ message: 'Debe seleccionar un colegio' })
    if (!selectedItem.clothes) return createMessage({ message: 'Debe seleccionar una prenda' })
    if (!selectedItem.size) return createMessage({ message: 'Debe seleccionar una talla' })
    if (!selectedItem.quantity || Number(selectedItem.quantity) === 0) return createMessage({ message: 'Debe ingresar una cantidad' })

    //buscar el item con los filtros seleccionados
    const itemFinded = getItemFromItems(itemsData.getAllItems, {
      collage: (collage) => collage === selectedItem.collage,
      clothes: (clothes) => clothes === selectedItem.clothes,
      size: (size) => size === selectedItem.size
    })

    if (!itemFinded.length) return createMessage({ message: 'Este item aún no se ha agregado a la base de datos' })

    const { _id, collage, clothes, size, price } = itemFinded[0]

    //verificar si el item a ingresar, ya se encuentra en la tabla
    const alreadyExists = selectedOrderItems.find(selected => selected._id === _id)

    if (alreadyExists) {
      const selectedItemsMapped = selectedOrderItems.map(item => {
        if (item._id === _id) {
          const newQuantity = Number(item.quantity) + Number(selectedItem.quantity)
          const newTotal = item.total + price
          return {
            ...item,
            quantity: newQuantity,
            total: newTotal
          }
        }
        return item
      })
      setSelectedOrderItems(selectedItemsMapped)
      return
    }

    setSelectedOrderItems([...selectedOrderItems, {
      _id,
      completed: false,
      collage,
      clothes,
      size,
      uniquePrice: price,
      quantity: Number(selectedItem.quantity),
      total: price * Number(selectedItem.quantity),
    }])
  }

  const handleUpdateOrder = async (values) => {
    const { clientName, phone, comments } = values

    try {
      if (!selectedOrderItems.length) return

      toggleCreateLoading(true)

      await updateOrder({
        variables: {
          input: {
            id: orderData.getOrderById._id,
            clientName,
            phone,
            comments,
            previewPayment: totals.previusPayment,
            percentage: percentageOrder,
            details: selectedOrderItems,
          }
        }
      })

      setTypeAlert("green")

      toggleCreateLoading(false)

      showGlobalAlert({ textResult: 'Action generada', descriptionResult: 'Pedido actualizado correctamente' })

      setTimeout(() => {
        router.push('/')
      }, 2500);

    } catch (error) {
      createMessage({ message: error.message })
      toggleCreateLoading(false)
      console.log(error)
    }
  }

  const handleAddPreviusPayment = (type) => {
    if (!Number(previusPayment)) return

    if (Number(previusPayment) <= 0) return

    if (type === 'plus') {
      if (previusPayment > totals.pending)
        return createMessage({ message: 'No puede agregar un valor mayor al pendiente del pedido' })
    }

    if (type === 'minus') {
      if (previusPayment > totals.previusPayment) {
        return createMessage({ message: 'No puede quitar un valor mayor al ya abonado' })
      }
    }

    const newPreviusPayment = type === 'plus' ? totals.previusPayment + Number(previusPayment) : totals.previusPayment - Number(previusPayment)

    setTotals({
      ...totals,
      previusPayment: newPreviusPayment,
      pending: totals.subtotal - newPreviusPayment
    })

    setPreviusPayment("0")
  }

  const handleChaneChecked = (id) => {
    const aux = selectedOrderItems.map(item => {
      if (item._id === id) {
        return {
          ...item,
          completed: !item.completed
        }
      }
      return item
    })

    setSelectedOrderItems(aux)
  }

  const handleDeleteSelectedItem = async (id) => {

    const itemFinded = selectedOrderItems.find(item => item._id === id)

    let description = 'Sin información'

    if (!!itemFinded) {
      description = `${itemFinded.collage} - ${itemFinded.clothes} - Talla ${itemFinded.size} - Cantidad: ${itemFinded.quantity}`
    }

    const resultConfirm = await confirmMessage({
      title: '¿Seguro que desea eliminar esta prenda del pedido?',
      description,
      confirmButtonText: 'Si, Eliminalo'
    })

    if (!!resultConfirm.isConfirmed) {
      const aux = selectedOrderItems.filter(item => item._id !== id)
      setSelectedOrderItems(aux)
    }
  }

  //-------------------------------------------------USEEFFECT
  useEffect(() => {
    if (!!ErrorGetItem) {
      showGlobalAlert({ textResult: 'Action generada', descriptionResult: `No se ha podido cargar el pedido: ${ErrorGetItem.message}` })
    }
  }, [ErrorGetItem])

  useEffect(() => {
    if (errorMessage.show) {
      setTimeout(() => {
        cleanErrorMessage()
      }, 3000);
    }
  }, [errorMessage.show])

  useEffect(() => {
    if (showAlert) {
      setTimeout(() => {
        cleanGlobalAlert()
      }, 2300);
    }
  }, [showAlert])

  useEffect(() => {
    if (!!orderData?.getOrderById?.details) {
      setSelectedOrderItems(TakeofTypenameFromReturnQuery(orderData.getOrderById.details))
      setTotals({ ...totals, previusPayment: orderData.getOrderById.previewPayment })
      setPercentageOrder(orderData.getOrderById.percentage)
    }
  }, [orderData])

  useEffect(() => {
    handleCalculatePrices()
    setPercentageOrder(getPercentageOrder(selectedOrderItems))
  }, [selectedOrderItems])

  return (
    <LayoutComponent>
      <div className="w-full min-h-screen flex justify-center items-start">
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
        {loading ? <SkeletonComponent /> :
          <Formik
            validationSchema={formikValidationSchema}
            enableReinitialize
            initialValues={{
              clientName: orderData.getOrderById.clientName,
              phone: orderData.getOrderById.phone,
              comments: orderData.getOrderById.comments
            }}
            onSubmit={(values) => {
              handleUpdateOrder(values)
            }}
          >
            {props => {
              return (
                <div className="sm:w-full md:w-11/12 xl:w-11/12 2xl:w-8/12 min-h-auto bg-white rounded-md border-1 border-gray-300 shadow-md p-4">
                  {/* Titulo */}
                  <div className="flex items-center justify-between">
                    <h1 className="text-black uppercase flex justify-center mt-4 pr-2">PEDIDO DE </h1>
                    <h1 className="font-bold text-black uppercase flex justify-center mt-4 pr-2">{orderData?.getOrderById?.clientName}</h1>
                    <h1 className="text-black uppercase flex justify-center mt-4">{`#${orderData?.getOrderById?.code}`}</h1>
                  </div>
                  <br />
                  {/* Información */}
                  <h1 className="font-bold text-black pl-1">Nombre cliente</h1>
                  {props.touched.clientName && props.errors.clientName &&
                    <div className="mb-2">
                      <AlertMessageComponent
                        title={REQUIRED}
                        description={props.errors.clientName}
                      />
                    </div>
                  }
                  <div className="w-full mt-2">
                    <InputComponent
                      id="clientName"
                      name="clientName"
                      type="text"
                      placeholder="Nombre del cliente"
                      width="full"
                      value={props.values.clientName}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                  </div>
                  <br />
                  <h1 className="font-bold text-black pl-1">Telefono cliente</h1>
                  {props.touched.phone && props.errors.phone &&
                    <div className="mb-2">
                      <AlertMessageComponent
                        title={REQUIRED}
                        description={props.errors.phone}
                      />
                    </div>
                  }
                  <div className="w-full mt-2">
                    <InputComponent
                      id="phone"
                      type="phone"
                      placeholder="Teléfono del cliente"
                      width="full"
                      value={props.values.phone}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                  </div>
                  <br />
                  <h1 className="font-bold text-black pl-1">Comentarios</h1>
                  <div className="w-full mt-2">
                    <TextareaInputComponent
                      id="description_order"
                      name="comments"
                      rows={4}
                      placeholder="Escriba algun comentario del pedido..."
                      width="full"
                      value={props.values.comments}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                  </div>
                  <br />
                  <h1 className="font-bold text-black pl-1 flex justify-center mb-2">Avance</h1>
                  {/* Barra de porcentaje de avance */}
                  <ProgressBarComponent
                    color={selectedOrderItems.every(item => item.completed) ? 'green' : 'blue'}
                    value={percentageOrder}
                  />
                  <br />
                  {orderData.getOrderById.state !== TERMINATED &&
                    <>
                      <h1 className="font-bold text-black pl-1 flex justify-center">Agregar prendas</h1>
                      <br />
                      {errorMessage.show &&
                        <div className="mt-2">
                          <AlertMessageComponent
                            title={ERROR}
                            description={errorMessage.message}
                          />
                        </div>
                      }
                      <div className="flex items-end grid 2xl:grid-cols-5 2xl:grid-flow-col gap-4 mt-4">
                        <DropdownComponent
                          options={!!itemsData?.getAllItems.length ? getUniquesSelections(itemsData.getAllItems, "collage") : []}
                          title="Colegio"
                          fieldValue="collage"
                          keyValue="_id"
                          defaultValue={selectedItem.collage}
                          onSelect={(e) => setSelectedItem({ ...selectedItem, collage: e.target.value })}
                        />
                        <DropdownComponent
                          options={!!itemsData?.getAllItems.length ? getUniquesSelections(itemsData.getAllItems, "clothes") : []}
                          title="Prenda"
                          fieldValue="clothes"
                          keyValue="_id"
                          defaultValue={selectedItem.clothes}
                          onSelect={(e) => setSelectedItem({ ...selectedItem, clothes: e.target.value })}
                        />
                        <DropdownComponent
                          options={!!itemsData?.getAllItems.length ? sortOptions(getUniquesSelections(itemsData.getAllItems, "size"), "desc") : []}
                          title="Talla"
                          fieldValue="size"
                          keyValue="_id"
                          defaultValue={selectedItem.size}
                          onSelect={(e) => setSelectedItem({ ...selectedItem, size: e.target.value })}
                        />
                        <div className="block">
                          <h2 className="text-black pl-1">Cantidad</h2>
                          <InputComponent
                            id="price"
                            type="number"
                            placeholder="Cantidad"
                            height={9}
                            width="full"
                            value={selectedItem.quantity}
                            onChange={(e) => setSelectedItem({ ...selectedItem, quantity: e.target.value })}
                          />
                        </div>
                        <ButtonComponent
                          color="blue"
                          text="Agregar"
                          width="full"
                          height="10"
                          icon=""
                          onClick={() => handleAddItem()}
                        />
                      </div>
                      <br />
                    </>
                  }
                  {!selectedOrderItems.length &&
                    <div className="mb-2">
                      <AlertMessageComponent
                        title={REQUIRED}
                        description="Debe ingresar mínimo 1 item"
                      />
                    </div>
                  }
                  {/* Prendas */}
                  <TableComponent
                    headers={HEADER_TABLE_ORDERS}
                    data={selectedOrderItems}
                    onChangeChecked={(id) => handleChaneChecked(id)}
                    onDeleteClick={(id) => handleDeleteSelectedItem(id)}
                    showCheckInput={orderData.getOrderById.state !== TERMINATED ? true : false}
                    showDeleteButton={orderData.getOrderById.state !== TERMINATED ? true : false}
                  />
                  <br />
                  <div className="w-full flex justify-end items-center pr-4">
                    <h1 className="font-bold text-black pr-4 flex justify-end uppercase">Sub-total</h1>
                    <h1 className="text-black-600 pl-1 text-2xl flex justify-end uppercase">{`${formattedPrices(totals.subtotal)}`}</h1>
                  </div>
                  <br />
                  {orderData.getOrderById.state === TERMINATED
                    ? <>
                      <div className="w-full flex justify-end items-center pr-4">
                        <h1 className="font-bold text-black pr-4 flex justify-end uppercase">Abono</h1>
                        <h1 className="font-bold text-green-900 pl-1 text-2xl flex justify-end uppercase">{`${formattedPrices(totals.previusPayment)}`}</h1>
                      </div>
                    </>
                    : <PreviusPaymentComponent
                      previusPayment={previusPayment}
                      totalPreviusPayment={totals.previusPayment}
                      setPreviusPayment={(value) => setPreviusPayment(value)}
                      plusMinus={(type) => handleAddPreviusPayment(type)}
                    />
                  }
                  <br />
                  <div className="w-full flex justify-end items-center pr-4">
                    <h1 className="font-bold text-black pr-4 flex justify-end uppercase">Total</h1>
                    <h1 className="font-bold text-black-900 pl-1 text-4xl flex justify-end uppercase">{`${formattedPrices(totals.pending)}`}</h1>
                  </div>
                  <br />
                  <ButtonComponent
                    color={createLoading ? "gray" : "green"}
                    text={createLoading ? "Ingresando..." : "actualizar pedido"}
                    disabled={createLoading ? true : false}
                    icon={createLoading ? "loading" : ""}
                    width="full"
                    height="16"
                    onClick={props.handleSubmit}
                  />
                </div>
              )
            }}
          </Formik>
        }
      </div>
    </LayoutComponent>
  )
}

export default EditOrder
