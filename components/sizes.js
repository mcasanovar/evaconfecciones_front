import React, { useEffect, useState, useContext } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
//components
import InputComponent from './input'
import ButtonComponent from './button'
import TableComponent from './table'
import SkeletonLoaderComponent from './skeletonLoader'
import AlertMessageComponent from './alertMessage'
//var
import { HEADER_TABLE_SIZE } from '../constant/var'
//functions
import { TakeofTypenameFromReturnQuery } from '../functions'
import { sortItems } from '../functions'
//hooks
import { 
  useQueryGraphQL,
  useErrorMessage,
  useLoading,
  useMutationGraphQL
} from '../hooks'
//graphql
import { GET_SIZES, ERROR, CREATE_SIZE, DELETE_SIZE } from '../graphql'
//contexts
import GlobalAlertContext from '../store/globalAlert/globalAlertContext'
import ConfigDataContext from '../store/configData/configDataContext'

const SizeComponent = () => {
  // const [sizes, setSizes] = useState([])
  const [errorMessage, cleanErrorMessage, createMessage] = useErrorMessage({ show: false, message: '' })
  const [createLoading, toggleCreateLoading] = useLoading(false)
  const [idSize, setIdSize] = useState(null)

  const { sortObjects } = sortItems;

  const handleSortSizes = (sizes) => {
    return sortObjects(sizes, "name", "asc");
  }

  const { showAlert, showGlobalAlert, cleanGlobalAlert } = useContext(GlobalAlertContext)
  const { sizes, setConfigData } = useContext(ConfigDataContext)

  //-------- GRAPHQL
  const { data: sizesData, error: ErrorGetSizes, loading } = useQueryGraphQL(GET_SIZES)

  const [createSize] = useMutationGraphQL(CREATE_SIZE, {
    refetchQueries: [{ query: GET_SIZES }]
  })

  const [deleteSize] = useMutationGraphQL(DELETE_SIZE, {
    refetchQueries: [{ query: GET_SIZES }]
  })

  //--------

  const formik = useFormik({
    initialValues: {
      name: ''
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Debe ingresar la talla")
    }),
    onSubmit: async (values, { resetForm }) => {
      const { name } = values

      try {

        toggleCreateLoading(true)

        await createSize({
          variables: {
            input: {
              name
            }
          }
        })

        toggleCreateLoading(false)
        showGlobalAlert({ textResult: 'Action generada', descriptionResult: 'Talla creada con éxito' })

        resetForm({ values: '' })

      } catch (error) {
        createMessage({ message: error.message })
        toggleCreateLoading(false)
        console.log(error)
      }
    }
  })

  const handleDeleteSize = async (id) => {
    try {

      setIdSize(id)

      await deleteSize({
        variables: {
          id
        }
      })

      showGlobalAlert({ textResult: 'Action generada', descriptionResult: 'Talla eliminada con éxito' })

    } catch (error) {
      setIdSize(null)
      createMessage({ message: error.message })
      console.log(error)
    }
  }

  //-------- USEEFFECT
  useEffect(() => {
    if (sizesData?.getAllSizes) {
      setConfigData(sizesData.getAllSizes, "sizes")
      setIdSize(null)
      return
    }
    if (!!ErrorGetSizes) {
      createMessage({ message: ErrorGetSizes.message })
      return
    }
  }, [sizesData, ErrorGetSizes])

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
      }, 1800);
    }
  }, [showAlert])

  //-----------------------------------------------

  if (loading) {
    return (
      <div className="w-full">
        <SkeletonLoaderComponent />
      </div>
    )
  }

  return (
    <div className="bg-white mx-4 p-4 rounded-md sm:mt-2 xl:mt-0">
      {errorMessage.show &&
        <div>
          <AlertMessageComponent
            title={ERROR}
            description={errorMessage.message}
          />
        </div>
      }
      <div className="w-full flex justify-center pb-4">
        <p className="font-semibold uppercase text-md">Tallas</p>
      </div>
      {formik.touched.name && formik.errors.name &&
        <div className="mb-2">
          <AlertMessageComponent
            title={ERROR}
            description={formik.errors.name}
          />
        </div>
      }
      <div className="sm:w-full lg:flex lg:items-center">
        <div className="sm:w-full lg:w-2/3 lg:flex lg:pr-2">
          <InputComponent
            id="input_size_admin"
            placeholder="Ingrese una Talla"
            width="full"
            height="9"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        <div className="sm:w-full sm:pt-4 lg:w-1/3 lg:pt-0">
          <ButtonComponent
            color={createLoading ? "gray" : "green"}
            text={createLoading ? "Ingresando..." : "Agregar"}
            disabled={createLoading ? true : false}
            icon={createLoading ? "loading" : ""}
            onClick={formik.handleSubmit}
          />
        </div>
      </div>
      <TableComponent
        headers={HEADER_TABLE_SIZE}
        data={handleSortSizes(TakeofTypenameFromReturnQuery(sizes))}
        onDeleteClick={(id) => handleDeleteSize(id)}
        idItem={idSize}
      />
    </div>
  )
}

export default SizeComponent
