import React, { useState, useContext, useEffect } from 'react'
//vars
import { HEADER_TABLE_ITEMS, ERROR, WARNING, SELECTIONS_FILTER_ITEMS } from '../constant/var'
//components
import LayoutComponent from '../components/layout'
import CollageComponent from '../components/collage'
import ClothesComponent from '../components/clothes'
import SizesComponent from '../components/sizes'
import TableComponent from '../components/table'
import SkeletonLoaderComponent from '../components/skeletonLoader'
import AlertMessageComponent from '../components/alertMessage'
import DropdownComponent from '../components/dropdown'
import InputComponent from '../components/input'
import ButtonComponent from '../components/button'
//functions
import { TakeofTypenameFromReturnQuery, sortItems } from '../functions'
//hooks
import { useQueryGraphQL, useMutationGraphQL, useErrorMessage, useLoading } from '../hooks'
//graphql
import { GET_ITEMS, CREATE_ITEM, DELETE_ITEM } from '../graphql/index'
//contexts
import GlobalAlertContext from '../store/globalAlert/globalAlertContext'
import ConfigDataContext from '../store/configData/configDataContext'

const config = () => {
  const [idItem, setIdItem] = useState(null)
  const [price, setPrice] = useState(0)
  const [selectedFilter, setSelectedFilter] = useState({})
  const [errorMessage, cleanErrorMessage, createMessage] = useErrorMessage({ show: false, message: '' })
  const [warningMessage, cleanWarningMessage, createWarningMessage] = useErrorMessage({ show: false, message: '' })
  const [createLoading, toggleCreateLoading] = useLoading(false)

  const { sortObjects } = sortItems;

  //----------------------------GRAPHQL
  const { data: itemsData, error: ErrorGetItems, loading } = useQueryGraphQL(GET_ITEMS)

  const [createItem] = useMutationGraphQL(CREATE_ITEM, {
    refetchQueries: [{ query: GET_ITEMS }]
  })

  const [deleteItem] = useMutationGraphQL(DELETE_ITEM, {
    refetchQueries: [{ query: GET_ITEMS }]
  })
  //----------------------------

  const { showAlert, showGlobalAlert, textResult, descriptionResult, cleanGlobalAlert } = useContext(GlobalAlertContext)
  const { collages, clothes, sizes, items, selectedCollage, selectedClothes, selectedSize, setConfigData } = useContext(ConfigDataContext)

  const handleDropdownSelection = (e, name) => {
    setConfigData(e.target.value, name)
  }

  const handleAddItem = async () => {
    if (!selectedCollage) return createMessage({ message: 'Debe seleccionar un colegio' })
    if (!selectedClothes) return createMessage({ message: 'Debe seleccionar una prenda' })
    if (!selectedSize) return createMessage({ message: 'Debe seleccionar una talla' })
    if (!price) return createMessage({ message: 'Debe ingresar el precio' })

    //verificar que no se esté agregando el mismo item 2 veces
    const isAlreadyExists = items.some(item => {
      if (item.collage === selectedCollage && item.clothes === selectedClothes && item.size === selectedSize) {
        return true
      }
      return false
    })

    if (isAlreadyExists) return createWarningMessage({ message: 'Este item que intenta agregar ya existe' })

    try {

      toggleCreateLoading(true)

      await createItem({
        variables: {
          input: {
            collage: selectedCollage,
            clothes: selectedClothes,
            size: selectedSize,
            price: Number(price)
          }
        }
      })

      setPrice(0)

      toggleCreateLoading(false)

      showGlobalAlert({ textResult: 'Action generada', descriptionResult: 'Agregado correctamente' })
    } catch (error) {
      toggleCreateLoading(false)
      createMessage({ message: `Ha ocurrido el siguiente error: ${error}` })
      console.log(error)
    }
  }

  const handleDeleteItem = async (id) => {
    try {

      setIdItem(id)

      await deleteItem({
        variables: {
          id
        }
      })

      showGlobalAlert({ textResult: 'Action generada', descriptionResult: 'Item eliminado con éxito' })

    } catch (error) {
      setIdItem(null)
      createMessage({ message: error.message })
      console.log(error)
    }
  }

  const handleSortItems = (value) => {
    const option = SELECTIONS_FILTER_ITEMS.find(item => item.name === value) || undefined
    
    if(!option) return
    
    const itemsSorted = sortObjects(items, option._id, "desc")
    
    setSelectedFilter(option.name)

    setConfigData(itemsSorted, "items")
  }

  console.log(items)

  //----------------------------------USEEFFECT
  useEffect(() => {
    if (itemsData?.getAllItems) {
      setConfigData(itemsData.getAllItems, "items")
      setIdItem(null)
      return
    }
    if (!!ErrorGetItems) {
      createMessage({ message: ErrorGetItems.message })
      return
    }
  }, [itemsData, ErrorGetItems])

  useEffect(() => {
    if (errorMessage.show) {
      setTimeout(() => {
        cleanErrorMessage()
      }, 3000);
    }

    if (warningMessage.show) {
      setTimeout(() => {
        cleanWarningMessage()
      }, 3000);
    }
  }, [errorMessage.show, warningMessage.show])

  useEffect(() => {
    if (showAlert) {
      setTimeout(() => {
        cleanGlobalAlert()
      }, 2300);
    }
  }, [showAlert])
  //----------------------------------------------

  return (
    <LayoutComponent>
      {showAlert &&
        <div className="absolute w-full flex justify-center pb-4">
          <div className="w-2/3 flex justify-center">
            <AlertMessageComponent
              title={textResult}
              description={descriptionResult}
              color="green"
              animation="animate__slideInDown animate__faster"
            />
          </div>
        </div>
      }
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
            {errorMessage.show &&
              <div className="w-full mb-4 p-0 mt-0">
                <AlertMessageComponent
                  title={ERROR}
                  description={errorMessage.message}
                  color="red"
                />
              </div>
            }
            {warningMessage.show &&
              <div className="w-full mb-4 p-0 mt-0">
                <AlertMessageComponent
                  title={WARNING}
                  description={warningMessage.message}
                  color="yellow"
                />
              </div>
            }
            <div className="grid sm:grid-cols-1 sm:w-full md:grid-cols-3 md:w-full lg:grid-cols-4 lg:w-full lg:gap-4 xl:grid-cols-5 xl:w-full 2xl:grid-cols-5 2xl:w-full items-end">
              {/* selector de colegios */}
              <DropdownComponent
                options={collages}
                title="Colegios"
                fieldValue="name"
                keyValue="_id"
                defaultValue={selectedCollage}
                onSelect={(e) => handleDropdownSelection(e, "selectedCollage")}
              />
              {/* selector de prendas */}
              <DropdownComponent
                options={clothes}
                title="Prendas"
                fieldValue="name"
                keyValue="_id"
                defaultValue={selectedClothes}
                onSelect={(e) => handleDropdownSelection(e, "selectedClothes")}
              />
              {/* selector de tallas */}
              <DropdownComponent
                options={sizes}
                title="Tallas"
                fieldValue="name"
                keyValue="_id"
                defaultValue={selectedSize}
                onSelect={(e) => handleDropdownSelection(e, "selectedSize")}
              />
              {/* input de precio */}
              <div className="grid grid-cols-1 w-full sm:mb-4 sm:w-full md:w-full md:mb-0 items-end">
                <span className="text-gray-700">Precio</span>
                <InputComponent
                  id="input_config_item_price"
                  name="price"
                  type="number"
                  placeholder="Ingrese precio"
                  width="full"
                  height="9"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="w-full h-10 lg:w-60 md:w-60 2xl:w-full">
                <ButtonComponent
                  color="green"
                  text="agregar"
                  color={createLoading ? "gray" : "green"}
                  text={createLoading ? "Ingresando..." : "Agregar"}
                  disabled={createLoading ? true : false}
                  icon={createLoading ? "loading" : ""}
                  onClick={() => handleAddItem()}
                />
              </div>
            </div>
            <div className="w-full flex justify-center pt-4">
              <p className="font-semibold uppercase text-md">Filtros</p>
            </div>
            <div className="grid sm:grid-cols-1 sm:w-full md:grid-cols-3 md:w-full lg:grid-cols-4 lg:w-full lg:gap-4 xl:grid-cols-5 xl:w-full 2xl:grid-cols-5 2xl:w-full items-end">
              {/* filtro */}
              <DropdownComponent
                options={SELECTIONS_FILTER_ITEMS}
                title="Ordenar por"
                fieldValue="name"
                keyValue="_id"
                defaultValue={selectedFilter}
                onSelect={(e) => handleSortItems(e.target.value)}
              />
            </div>
            <TableComponent
              headers={HEADER_TABLE_ITEMS}
              data={TakeofTypenameFromReturnQuery(items)}
              onDeleteClick={(id) => handleDeleteItem(id)}
              idItem={idItem}
            />
            <br/>
            <br/>
          </div>
        </div>
      }
    </LayoutComponent>
  )
}

export default config
