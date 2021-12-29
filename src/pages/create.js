import React, { useState, useEffect, useContext } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
//functions
import {
  getTotalPrice,
  getUniquesSelections,
  sortItems,
  getItemFromItems,
  formattedPrices
} from '../functions'
//constants
import { HEADER_TABLE_ORDERS, ERROR, REQUIRED } from '../constant/var'
//componentes
import LayoutComponent from '../components/layout'
import InputComponent from '../components/input'
import DropdownComponent from '../components/dropdown'
import ButtonComponent from '../components/button'
import TableComponent from '../components/table'
import AlertMessageComponent from '../components/alertMessage'
import SkeletonComponent from '../components/skeletonLoader'
import TextareaInputComponent from '../components/textareaInput'
import PreviusPaymentComponent from '../components/previusPayment'
//hooks
import {
  useQueryGraphQL,
  useMutationGraphQL,
  useErrorMessage,
  useLoading
} from '../hooks'
//contexts
import GlobalAlertContext from '../store/globalAlert/globalAlertContext'
//graphql
import {
  GET_ITEMS,
  CREATE_ORDER
} from '../graphql/index'

const CreateOrder = () => {
  const [typeAlert, setTypeAlert] = useState('red')
  const [selectedItem, setSelectedItem] = useState({
    collage: "",
    clothes: "",
    size: "",
    quantity: "1"
  })
  const [totals, setTotals] = useState({
    subtotal: 0,
    previusPayment: 0,
    pending: 0
  })
  const [previusPayment, setPreviusPayment] = useState("0")
  const [selectedOrderItems, setSelectedOrderItems] = useState([])
  const [errorMessage, cleanErrorMessage, createMessage] = useErrorMessage({ show: false, message: '' })
  const [createLoading, toggleCreateLoading] = useLoading(false)

  const { sortOptions } = sortItems;

  //----------------------------GRAPHQL
  const { data: itemsData, error: ErrorGetItems, loading } = useQueryGraphQL(GET_ITEMS)

  const [createOrder] = useMutationGraphQL(CREATE_ORDER, {
    refetchQueries: [{ query: GET_ITEMS }]
  })
  //-----------------------------

  const { showAlert, showGlobalAlert, textResult, descriptionResult, cleanGlobalAlert } = useContext(GlobalAlertContext)

  const formik = useFormik({
    initialValues: {
      clientName: '',
      phone: '',
      comments: '',
    },
    validationSchema: Yup.object({
      clientName: Yup.string()
        .required("Debe ingresar el nombre del cliente"),
      phone: Yup.string()
        .required("Debe ingresar el numero de telefono del cliente")
    }),
    onSubmit: async (values, { resetForm }) => {
      const { clientName, phone, comments } = values
      try {

        if (!selectedOrderItems.length) return

        toggleCreateLoading(true)

        await createOrder({
          variables: {
            input: {
              clientName,
              phone,
              previewPayment: totals.previusPayment,
              details: selectedOrderItems,
              comments
            }
          }
        })

        setTypeAlert("green")

        toggleCreateLoading(false)
        showGlobalAlert({ textResult: 'Action generada', descriptionResult: 'Pedido ingresado correctamente' })

        resetForm({ values: '' })

      } catch (error) {
        createMessage({ message: error.message })
        toggleCreateLoading(false)
        console.log(error)
      }
    }
  })

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
      collage,
      clothes,
      size,
      uniquePrice: price,
      quantity: Number(selectedItem.quantity),
      total: price * Number(selectedItem.quantity)
    }])

  }

  const handleDeleteSelectedItem = (id) => {
    const aux = selectedOrderItems.filter(item => item._id !== id)
    setSelectedOrderItems(aux)
  }

  const handleCalculatePrices = () => {
    const subtotal = getTotalPrice(selectedOrderItems, 'total')
    const pending = subtotal - totals.previusPayment

    setTotals({
      ...totals,
      subtotal,
      pending
    })
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

  //--------------------------------------------------- USEEFFECT
  useEffect(() => {
    handleCalculatePrices()
  }, [selectedOrderItems])

  useEffect(() => {
    if (errorMessage.show) {
      setTimeout(() => {
        cleanErrorMessage()
      }, 3000);
    }
  }, [errorMessage.show])

  useEffect(() => {
    if (!!ErrorGetItems) {
      console.log(ErrorGetItems)
      showGlobalAlert({ textResult: ERROR, descriptionResult: ErrorGetItems.message })
    }
  }, [ErrorGetItems])

  useEffect(() => {
    if (showAlert) {
      setTimeout(() => {
        cleanGlobalAlert()
      }, 2300);
    }
  }, [showAlert])

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
        {loading ?
          <SkeletonComponent /> :
          <div className="sm:w-full md:w-11/12 xl:w-11/12 2xl:w-8/12 min-h-auto bg-white rounded-md border-1 border-gray-300 shadow-md p-4">
            {/* Titulo */}
            <h1 className="font-bold text-black uppercase flex justify-center mt-4">Crear Nuevo Pedido</h1>
            <br />
            {/* Información */}
            <h1 className="font-bold text-black pl-1">Nombre cliente</h1>
            {formik.touched.clientName && formik.errors.clientName &&
              <div className="mb-2">
                <AlertMessageComponent
                  title={REQUIRED}
                  description={formik.errors.clientName}
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
                value={formik.values.clientName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <br />
            <h1 className="font-bold text-black pl-1">Telefono cliente</h1>
            {formik.touched.phone && formik.errors.phone &&
              <div className="mb-2">
                <AlertMessageComponent
                  title={REQUIRED}
                  description={formik.errors.phone}
                />
              </div>
            }
            <div className="w-full mt-2">
              <InputComponent
                id="phone"
                type="phone"
                placeholder="Teléfono del cliente"
                width="full"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
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
                value={formik.values.comments}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <br />
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
            {!selectedOrderItems.length &&
              <div className="mb-2">
                <AlertMessageComponent
                  title={REQUIRED}
                  description="Debe ingresar mínimo 1 item"
                />
              </div>
            }
            <TableComponent
              headers={HEADER_TABLE_ORDERS}
              data={selectedOrderItems}
              onDeleteClick={(id) => handleDeleteSelectedItem(id)}
            />
            <br />
            <div className="w-full flex justify-end items-center pr-4">
              <h1 className="font-bold text-black pr-4 flex justify-end uppercase">Sub-total</h1>
              <h1 className="text-black-600 pl-1 text-2xl flex justify-end uppercase">{`${formattedPrices(totals.subtotal)}`}</h1>
            </div>
            <br />
            <PreviusPaymentComponent
              previusPayment={previusPayment}
              totalPreviusPayment={totals.previusPayment}
              setPreviusPayment={(value) => setPreviusPayment(value)}
              plusMinus={(type) => handleAddPreviusPayment(type)}
            />
            <br />
            <div className="w-full flex justify-end items-center pr-4">
              <h1 className="font-bold text-black pr-4 flex justify-end uppercase">Total Pendiente</h1>
              <h1 className="font-bold text-black-900 pl-1 text-4xl flex justify-end uppercase">{`${formattedPrices(totals.pending)}`}</h1>
            </div>
            {/* Finalizar orden */}
            <br />
            <div className="grid sm:grid-cols-2 gap-4">
              <ButtonComponent
                color={createLoading ? "gray" : "green"}
                text={createLoading ? "Ingresando..." : "confirmar pedido"}
                disabled={createLoading ? true : false}
                icon={createLoading ? "loading" : ""}
                width="full"
                height="20"
                onClick={formik.handleSubmit}
              />
              <ButtonComponent
                color="indigo"
                text="Venta Directa"
                width="full"
                icon=""
                onClick={() => { }}
              />
            </div>
          </div>
        }
      </div>
    </LayoutComponent>
  )
}

export default CreateOrder
