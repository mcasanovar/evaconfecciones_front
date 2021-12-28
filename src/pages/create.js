import React, { useState, useEffect, useContext } from 'react'
//functions
import {
  getTotalPrice,
  getUniquesSelections,
  sortItems,
  getItemFromItems,
  formattedPrices
} from '../functions'
//constants
import { HEADER_TABLE_ORDERS, ERROR } from '../constant/var'
//componentes
import LayoutComponent from '../components/layout'
import InputComponent from '../components/input'
import DropdownComponent from '../components/dropdown'
import ButtonComponent from '../components/button'
import TableComponent from '../components/table'
import AlertMessageComponent from '../components/alertMessage'
import SkeletonComponent from '../components/skeletonLoader'
import TextareaInputComponent from '../components/textareaInput'
//hooks
import { useQueryGraphQL, useErrorMessage } from '../hooks'
//contexts
import GlobalAlertContext from '../store/globalAlert/globalAlertContext'
//graphql
import {
  GET_ITEMS,
} from '../graphql/index'

const CreateOrder = () => {
  const [selectedItem, setSelectedItem] = useState({
    collage: "",
    clothes: "",
    size: "",
    quantity: "1"
  })
  const [totals, setTotals] = useState({
    subtotal: 0,
    abono: 0,
    pending: 0
  })
  const [selectedOrderItems, setSelectedOrderItems] = useState([])
  const [errorMessage, cleanErrorMessage, createMessage] = useErrorMessage({ show: false, message: '' })

  const { sortOptions } = sortItems;

  //----------------------------GRAPHQL
  const { data: itemsData, error: ErrorGetItems, loading } = useQueryGraphQL(GET_ITEMS)
  //-----------------------------

  const { showAlert, showGlobalAlert, textResult, descriptionResult, cleanGlobalAlert } = useContext(GlobalAlertContext)

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

    if(alreadyExists){
      const selectedItemsMapped = selectedOrderItems.map(item => {
        if(item._id === _id){
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
      quantity: selectedItem.quantity,
      total: price * selectedItem.quantity
    }])

  }

  console.log(selectedOrderItems)

  const handleDeleteSelectedItem = (id) => {
    const aux = selectedOrderItems.filter(item => item._id !== id)
    setSelectedOrderItems(aux)
  }

  const handleCalculatePrices = () => {
    const subtotal = getTotalPrice(selectedOrderItems, 'total')
    const pending = subtotal - totals.abono

    setTotals({
      ...totals,
      subtotal,
      pending
    })
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
                color="red"
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
                width="full"
                onChange={() => { }}
              />
            </div>
            <br />
            <h1 className="font-bold text-black pl-1">Abono</h1>
            <div className="grid sm:grid-cols-4 gap-4 mt-2">
              <div className="col-span-3">
                <InputComponent
                  id="payment"
                  type="number"
                  placeholder="Pago de Abono"
                  width="full"
                  onChange={() => { }}
                />
              </div>
              <div>
                <ButtonComponent
                  color="blue"
                  text="Agregar Abono"
                  width="full"
                  height="10"
                  icon=""
                  onClick={() => { }}
                />
              </div>
            </div>
            <br />
            <h1 className="font-bold text-black pl-1">Comentarios</h1>
            <div className="w-full mt-2">
              <TextareaInputComponent
                id="description"
                rows={4}
                placeholder="Escriba algun comentario del pedido..."
                width="full"
                onChange={() => { }}
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
            <TableComponent
              headers={HEADER_TABLE_ORDERS}
              data={selectedOrderItems}
              onDeleteClick={(id) => handleDeleteSelectedItem(id)}
            />
            <br />
            <div className="w-full flex justify-end items-center pr-4">
              <h1 className="font-bold text-black pr-4 flex justify-end uppercase">Sub-total</h1>
              <h1 className="font-bold text-black-900 pl-1 text-2xl flex justify-end uppercase">{`${formattedPrices(totals.subtotal)}`}</h1>
            </div>
            <br />
            <div className="w-full flex justify-end items-center pr-4">
              <h1 className="font-bold text-black pr-4 flex justify-end uppercase">abono</h1>
              <h1 className="font-bold text-green-900 pl-1 text-2xl flex justify-end uppercase">{`${formattedPrices(totals.abono)}`}</h1>
            </div>
            <br />
            <div className="w-full flex justify-end items-center pr-4">
              <h1 className="font-bold text-black pr-4 flex justify-end uppercase">Total Pendiente</h1>
              <h1 className="font-bold text-green-900 pl-1 text-3xl flex justify-end uppercase">{`${formattedPrices(totals.pending)}`}</h1>
            </div>
            {/* Finalizar orden */}
            <br />
            <div className="grid sm:grid-cols-2 gap-4">
              <ButtonComponent
                color="green"
                text="Confirmar pedido"
                width="full"
                height="20"
                icon=""
                onClick={() => { }}
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
